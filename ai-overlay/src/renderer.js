const $ = (id) => document.getElementById(id);
const NAMES = { openai: 'ChatGPT', claude: 'Claude', deepseek: 'DeepSeek', gemini: 'Gemini' };
let cfg;
const history = { openai: [], claude: [], deepseek: [], gemini: [] }; // short memory per AI
const pending = {}; // id -> { el, text, provider, question }

// ---------------- Config / settings ----------------
async function init() {
  cfg = await window.api.getConfig();
  $('provider').value = cfg.provider;
  fillSettings();
}

function fillSettings() {
  document.querySelectorAll('[data-key]').forEach((el) => (el.value = cfg.keys[el.dataset.key] || ''));
  document.querySelectorAll('[data-model]').forEach((el) => (el.value = cfg.models[el.dataset.model] || ''));
  $('transcriber').value = cfg.transcriber;
  $('language').value = cfg.language;
  $('systemPrompt').value = cfg.systemPrompt;
  $('opacity').value = cfg.opacity;
}

$('settingsBtn').onclick = () => { $('main').hidden = true; $('settings').hidden = false; fillSettings(); };
$('backBtn').onclick = () => { $('settings').hidden = true; $('main').hidden = false; window.api.setOpacity(cfg.opacity); };
$('opacity').oninput = (e) => window.api.setOpacity(parseFloat(e.target.value));
$('saveBtn').onclick = async () => {
  document.querySelectorAll('[data-key]').forEach((el) => (cfg.keys[el.dataset.key] = el.value.trim()));
  document.querySelectorAll('[data-model]').forEach((el) => (cfg.models[el.dataset.model] = el.value.trim()));
  cfg.transcriber = $('transcriber').value;
  cfg.language = $('language').value.trim();
  cfg.systemPrompt = $('systemPrompt').value;
  cfg.opacity = parseFloat($('opacity').value);
  await window.api.setConfig(cfg);
  $('backBtn').click();
};
$('provider').onchange = async (e) => { cfg.provider = e.target.value; await window.api.setConfig(cfg); };
$('hideBtn').onclick = () => window.api.hide();
$('quitBtn').onclick = () => window.api.quit();
$('clearBtn').onclick = () => { $('answers').innerHTML = ''; Object.keys(history).forEach((k) => (history[k] = [])); };

// ---------------- Asking ----------------
function setStatus(s) { $('statusDot').className = 'dot ' + (s || ''); }

function ask(question) {
  question = (question || '').trim();
  if (!question) return;
  const list = cfg.provider === 'all' ? Object.keys(NAMES) : [cfg.provider];

  const card = document.createElement('div');
  card.className = 'qa';
  const q = document.createElement('div');
  q.className = 'q';
  q.textContent = 'Q: ' + question;
  card.appendChild(q);

  for (const provider of list) {
    const a = document.createElement('div');
    a.className = 'a';
    if (list.length > 1) a.innerHTML = `<span class="tag">${NAMES[provider]}</span>`;
    const body = document.createElement('span');
    body.textContent = '…';
    a.appendChild(body);
    card.appendChild(a);

    const id = Math.random().toString(36).slice(2);
    pending[id] = { el: body, text: '', provider, question };
    const messages = [...history[provider].slice(-6), { role: 'user', content: question }];
    window.api.ask({ id, provider, messages });
  }
  $('answers').appendChild(card);
  $('answers').scrollTop = $('answers').scrollHeight;
  setStatus('busy');
}

window.api.onAI(({ id, type, data }) => {
  const p = pending[id];
  if (!p) return;
  if (type === 'chunk') {
    p.text += data;
    p.el.textContent = p.text;
    $('answers').scrollTop = $('answers').scrollHeight;
  } else if (type === 'error') {
    p.el.textContent = '⚠ ' + data;
    p.el.classList.add('err');
    delete pending[id];
  } else if (type === 'done') {
    history[p.provider].push({ role: 'user', content: p.question }, { role: 'assistant', content: p.text });
    delete pending[id];
  }
  if (!Object.keys(pending).length) setStatus(recorder ? 'rec' : '');
});

$('askForm').onsubmit = (e) => { e.preventDefault(); ask($('question').value); $('question').value = ''; };
$('question').onkeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('askForm').requestSubmit(); }
};

// ---------------- Voice ----------------
let recorder = null;
let streams = [];
let audioCtx = null;

async function getAudioStream(source) {
  const parts = [];
  if (source === 'mic' || source === 'both') {
    parts.push(await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }));
  }
  if (source === 'system' || source === 'both') {
    // main.js answers this with system "loopback" audio (what comes out of your speakers)
    const d = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    d.getVideoTracks().forEach((t) => t.stop());
    if (!d.getAudioTracks().length) throw new Error('System audio not available on this OS - use My microphone.');
    parts.push(d);
  }
  streams = parts;
  if (parts.length === 1) return new MediaStream(parts[0].getAudioTracks());
  audioCtx = new AudioContext();
  const dest = audioCtx.createMediaStreamDestination();
  parts.forEach((s) => audioCtx.createMediaStreamSource(new MediaStream(s.getAudioTracks())).connect(dest));
  return dest.stream;
}

function stopStreams() {
  streams.forEach((s) => s.getTracks().forEach((t) => t.stop()));
  streams = [];
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
}

async function startListening() {
  try {
    const stream = await getAudioStream($('audioSource').value);
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
    const chunks = [];
    recorder = new MediaRecorder(stream, { mimeType });
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    recorder.onstop = async () => {
      stopStreams();
      const blob = new Blob(chunks, { type: mimeType });
      if (blob.size < 2000) { $('hint').textContent = 'Too short - nothing heard.'; setStatus(''); return; }
      $('hint').textContent = 'Transcribing…';
      setStatus('busy');
      try {
        const text = await window.api.transcribe(await blob.arrayBuffer(), mimeType);
        $('hint').textContent = 'Heard: ' + (text || '(nothing)');
        if (text) ask(text); else setStatus('');
      } catch (err) {
        $('hint').textContent = '⚠ ' + (err.message || err).replace(/^Error invoking remote method '[^']+': (Error: )?/, '');
        setStatus('');
      }
    };
    recorder.start(1000);
    $('listenBtn').textContent = '■ Stop & answer';
    $('listenBtn').classList.add('recording');
    $('hint').textContent = 'Listening… press Stop when the question is finished.';
    setStatus('rec');
  } catch (err) {
    recorder = null;
    stopStreams();
    $('hint').textContent = '⚠ ' + (err.message || err);
  }
}

function stopListening() {
  if (!recorder) return;
  const r = recorder;
  recorder = null;
  $('listenBtn').textContent = '● Listen';
  $('listenBtn').classList.remove('recording');
  r.stop();
}

$('listenBtn').onclick = () => (recorder ? stopListening() : startListening());

window.api.onHotkey((name) => {
  if (name === 'toggle-listen') recorder ? stopListening() : startListening();
  if (name === 'ask') { ask($('question').value); $('question').value = ''; }
});

init();
