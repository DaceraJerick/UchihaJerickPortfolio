// API calls for ChatGPT (OpenAI), Claude (Anthropic), DeepSeek and Gemini.
// Runs in the main process so API keys never touch the web page.

async function readSSE(res, onData) {
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 400)}`);
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
      try { onData(JSON.parse(payload)); } catch { /* ignore partial/keepalive */ }
    }
  }
}

async function openAICompatible(url, { apiKey, model, system, messages, onText }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: 'system', content: system }, ...messages]
    })
  });
  await readSSE(res, (d) => {
    const t = d.choices?.[0]?.delta?.content;
    if (t) onText(t);
  });
}

async function claude({ apiKey, model, system, messages, onText }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
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
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
    })
  });
  await readSSE(res, (d) => {
    const parts = d.candidates?.[0]?.content?.parts || [];
    for (const p of parts) if (p.text) onText(p.text);
  });
}

async function streamChat(opts) {
  if (!opts.apiKey) throw new Error(`No API key set for ${opts.provider}. Open Settings (⚙).`);
  switch (opts.provider) {
    case 'openai':   return openAICompatible('https://api.openai.com/v1/chat/completions', opts);
    case 'deepseek': return openAICompatible('https://api.deepseek.com/chat/completions', opts);
    case 'claude':   return claude(opts);
    case 'gemini':   return gemini(opts);
    default: throw new Error('Unknown provider ' + opts.provider);
  }
}

// ---------- Speech to text ----------
async function transcribeOpenAI(apiKey, audio, mimeType, language) {
  const form = new FormData();
  const ext = mimeType.includes('ogg') ? 'ogg' : 'webm';
  form.append('file', new Blob([audio], { type: mimeType }), `audio.${ext}`);
  form.append('model', 'whisper-1');
  if (language) form.append('language', language);
  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  });
  if (!res.ok) throw new Error(`Transcribe HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).text || '';
}

async function transcribeGemini(apiKey, model, audio, mimeType, language) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType: mimeType.split(';')[0], data: audio.toString('base64') } },
          { text: `Transcribe this audio exactly${language ? ` (language: ${language})` : ''}. Output only the transcript text, nothing else.` }
        ]
      }]
    })
  });
  if (!res.ok) throw new Error(`Transcribe HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const d = await res.json();
  return (d.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
}

async function transcribe({ cfg, audio, mimeType }) {
  const pick = cfg.transcriber === 'auto'
    ? (cfg.keys.openai ? 'openai' : cfg.keys.gemini ? 'gemini' : null)
    : cfg.transcriber;
  if (pick === 'openai' && cfg.keys.openai) return transcribeOpenAI(cfg.keys.openai, audio, mimeType, cfg.language);
  if (pick === 'gemini' && cfg.keys.gemini) return transcribeGemini(cfg.keys.gemini, cfg.models.gemini, audio, mimeType, cfg.language);
  throw new Error('Voice needs an OpenAI or Gemini API key (used for speech-to-text).');
}

module.exports = { streamChat, transcribe };
