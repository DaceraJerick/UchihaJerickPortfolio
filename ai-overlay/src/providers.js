// API calls for all supported AIs. Runs in the main process so API keys never touch the web page.
//
// Limits: each provider can hold several keys (comma separated). When a key hits a limit
// (or fails), the next key is tried, then - in Auto mode - the next provider.

// type: 'openai' = OpenAI-compatible chat completions API
const PROVIDERS = {
  groq:       { name: 'Groq (Llama, free)',     type: 'openai', url: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.3-70b-versatile', keyUrl: 'https://console.groq.com/keys' },
  gemini:     { name: 'Gemini (free tier)',     type: 'gemini', model: 'gemini-2.5-flash', keyUrl: 'https://aistudio.google.com/apikey' },
  cerebras:   { name: 'Cerebras (free)',        type: 'openai', url: 'https://api.cerebras.ai/v1/chat/completions', model: 'llama-3.3-70b', keyUrl: 'https://cloud.cerebras.ai' },
  openrouter: { name: 'OpenRouter (free models)', type: 'openai', url: 'https://openrouter.ai/api/v1/chat/completions', model: 'meta-llama/llama-3.3-70b-instruct:free', keyUrl: 'https://openrouter.ai/keys' },
  mistral:    { name: 'Mistral (free tier)',    type: 'openai', url: 'https://api.mistral.ai/v1/chat/completions', model: 'mistral-small-latest', keyUrl: 'https://console.mistral.ai/api-keys' },
  github:     { name: 'GitHub Models (free)',   type: 'openai', url: 'https://models.github.ai/inference/chat/completions', model: 'openai/gpt-4.1-mini', keyUrl: 'https://github.com/settings/tokens' },
  deepseek:   { name: 'DeepSeek',               type: 'openai', url: 'https://api.deepseek.com/chat/completions', model: 'deepseek-chat', keyUrl: 'https://platform.deepseek.com/api_keys' },
  openai:     { name: 'ChatGPT',                type: 'openai', url: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini', keyUrl: 'https://platform.openai.com/api-keys' },
  claude:     { name: 'Claude',                 type: 'claude', model: 'claude-haiku-5-5', keyUrl: 'https://console.anthropic.com/settings/keys' },
  xai:        { name: 'Grok (xAI)',             type: 'openai', url: 'https://api.x.ai/v1/chat/completions', model: 'grok-3-mini', keyUrl: 'https://console.x.ai' },
  together:   { name: 'Together AI',            type: 'openai', url: 'https://api.together.xyz/v1/chat/completions', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', keyUrl: 'https://api.together.ai/settings/api-keys' }
};

// Speech-to-text options, tried in this order in "auto"
const TRANSCRIBERS = {
  groq:   { name: 'Groq Whisper (free)', url: 'https://api.groq.com/openai/v1/audio/transcriptions', model: 'whisper-large-v3-turbo' },
  openai: { name: 'OpenAI Whisper',      url: 'https://api.openai.com/v1/audio/transcriptions', model: 'whisper-1' },
  gemini: { name: 'Gemini' }
};

const splitKeys = (s) => (s || '').split(/[\s,;]+/).map((k) => k.trim()).filter(Boolean);
const keyCursor = {}; // provider -> index of the key to try first (rotates after failures)

async function readSSE(res, onData) {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  const decoder = new TextDecoder();
  let buf = '';
  for await (const chunk of res.body) {
    buf += decoder.decode(chunk, { stream: true });
    let idx;
    while ((idx = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      let d;
      try { d = JSON.parse(payload); } catch { continue; }
      onData(d);
    }
  }
}

async function openAICompatible({ url, apiKey, model, system, messages, onText }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, stream: true, messages: [{ role: 'system', content: system }, ...messages] })
  });
  await readSSE(res, (d) => {
    if (d.error) throw new Error(d.error.message || JSON.stringify(d.error));
    const t = d.choices?.[0]?.delta?.content;
    if (t) onText(t);
  });
}

async function claude({ apiKey, model, system, messages, onText }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: 1024, stream: true, system, messages })
  });
  await readSSE(res, (d) => {
    if (d.type === 'content_block_delta' && d.delta?.type === 'text_delta') onText(d.delta.text);
    if (d.type === 'error') throw new Error(d.error?.message || 'Claude error');
  });
}

async function gemini({ apiKey, model, system, messages, onText }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }))
    })
  });
  await readSSE(res, (d) => {
    if (d.error) throw new Error(d.error.message || 'Gemini error');
    for (const p of d.candidates?.[0]?.content?.parts || []) if (p.text) onText(p.text);
  });
}

function callOnce(provider, opts) {
  const p = PROVIDERS[provider];
  if (!p) throw new Error('Unknown provider ' + provider);
  if (p.type === 'openai') return openAICompatible({ ...opts, url: p.url });
  if (p.type === 'claude') return claude(opts);
  if (p.type === 'gemini') return gemini(opts);
}

// Try every key of one provider. Gives up only if no text was produced yet.
async function streamProvider(provider, cfg, { system, messages, onText }) {
  const keys = splitKeys(cfg.keys[provider]);
  if (!keys.length) throw new Error(`No API key for ${PROVIDERS[provider].name}`);
  const model = cfg.models[provider] || PROVIDERS[provider].model;
  const start = keyCursor[provider] || 0;
  let lastErr;
  for (let i = 0; i < keys.length; i++) {
    const k = (start + i) % keys.length;
    let produced = false;
    try {
      await callOnce(provider, { apiKey: keys[k], model, system, messages, onText: (t) => { produced = true; onText(t); } });
      keyCursor[provider] = k;
      return;
    } catch (err) {
      lastErr = err;
      if (produced) throw err; // answer already half-shown - don't restart with another key
      keyCursor[provider] = (k + 1) % keys.length; // rotate away from the limited key
    }
  }
  throw lastErr;
}

// provider = a provider id, or 'auto' (first working one, in the user's order)
async function streamChat({ provider, cfg, messages, onText, onProvider }) {
  const system = cfg.systemPrompt;
  const chain = provider === 'auto' ? autoChain(cfg) : [provider];
  if (!chain.length) throw new Error('No API keys yet. Open Settings (⚙) and add at least one.');
  const errors = [];
  for (const id of chain) {
    let produced = false;
    try {
      onProvider && onProvider(id);
      await streamProvider(id, cfg, { system, messages, onText: (t) => { produced = true; onText(t); } });
      return id;
    } catch (err) {
      if (produced) throw err;
      errors.push(`${PROVIDERS[id].name}: ${err.message}`);
    }
  }
  throw new Error(errors.join('\n'));
}

function autoChain(cfg) {
  const order = (cfg.order && cfg.order.length ? cfg.order : Object.keys(PROVIDERS)).filter((id) => PROVIDERS[id]);
  for (const id of Object.keys(PROVIDERS)) if (!order.includes(id)) order.push(id);
  return order.filter((id) => splitKeys(cfg.keys[id]).length && cfg.enabled?.[id] !== false);
}

// ---------- Speech to text ----------
async function transcribeWhisper(t, apiKey, audio, mimeType, language) {
  const form = new FormData();
  form.append('file', new Blob([audio], { type: mimeType }), mimeType.includes('ogg') ? 'audio.ogg' : 'audio.webm');
  form.append('model', t.model);
  if (language) form.append('language', language);
  const res = await fetch(t.url, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}` }, body: form });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).text || '';
}

async function transcribeGemini(apiKey, model, audio, mimeType, language) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [
        { inlineData: { mimeType: mimeType.split(';')[0], data: audio.toString('base64') } },
        { text: `Transcribe this audio exactly${language ? ` (language: ${language})` : ''}. Output only the transcript text, nothing else.` }
      ] }]
    })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const d = await res.json();
  return (d.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
}

async function transcribe({ cfg, audio, mimeType }) {
  const chain = cfg.transcriber === 'auto' ? Object.keys(TRANSCRIBERS) : [cfg.transcriber];
  const errors = [];
  for (const id of chain) {
    for (const key of splitKeys(cfg.keys[id])) {
      try {
        if (id === 'gemini') return await transcribeGemini(key, cfg.models.gemini || PROVIDERS.gemini.model, audio, mimeType, cfg.language);
        return await transcribeWhisper(TRANSCRIBERS[id], key, audio, mimeType, cfg.language);
      } catch (err) {
        errors.push(`${TRANSCRIBERS[id].name}: ${err.message}`);
      }
    }
  }
  if (!errors.length) throw new Error('Voice needs a Groq, OpenAI or Gemini API key (for speech-to-text).');
  throw new Error(errors.join('\n'));
}

module.exports = { PROVIDERS, TRANSCRIBERS, streamChat, transcribe, splitKeys };
