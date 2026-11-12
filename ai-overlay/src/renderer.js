const $ = (id) => document.getElementById(id);
let cfg;
let PROVIDERS = {};             // id -> { name, model, keyUrl }
const history = {};             // chat mode -> recent messages (short memory)
const pending = {};             // request id -> { el, tag, text, mode, question }

const hasKey = (id) => (cfg.keys[id] || '').split(/[\s,;]+/).some(Boolean);
const isOn = (id) => hasKey(id) && cfg.enabled?.[id] !== false;
const ordered = () => {
  const o = (cfg.order || []).filter((id) => PROVIDERS[id]);
  Object.keys(PROVIDERS).forEach((id) => !o.includes(id) && o.push(id));
  return o;
};

// ---------------- Config / settings ----------------
async function init() {
  ({ providers: PROVIDERS } = await window.api.listProviders());
  cfg = await window.api.getConfig();
  cfg.enabled = cfg.enabled || {};
  cfg.order = ordered();
  buildProviderSelect();
}

function buildProviderSelect() {
  const sel = $('provider');
  const ready = ordered().filter(isOn).length;
  sel.innerHTML = '';
  sel.add(new Option(`⚡ Auto - never stops (${ready} AI${ready === 1 ? '' : 's'})`, 'auto'));
  sel.add(new Option('🔀 All - compare answers', 'all'));
  for (const id of ordered()) {
    sel.add(new Option(PROVIDERS[id].name + (hasKey(id) ? '' : '  (no key)'), id));
  }
  sel.value = PROVIDERS[cfg.provider] || cfg.provider === 'all' ? cfg.provider : 'auto';
}

function buildProviderList() {
  const box = $('providerList');
  box.innerHTML = '';
  ordered().forEach((id, i, arr) => {
    const p = PROVIDERS[id];
    const div = document.createElement('div');
    div.className = 'prov' + (cfg.enabled[id] === false ? ' off' : '');
    div.innerHTML = `
      <div class="prov-head">
        <input type="checkbox" title="Use in Auto / All" ${cfg.enabled[id] === false ? '' : 'checked'} />
        <b></b>
        <a href="${p.keyUrl}" target="_blank">get key ↗</a>
        <button type="button" data-mv="-1" ${i === 0 ? 'disabled' : ''}>▲</button>
        <button type="button" data-mv="1" ${i === arr.length - 1 ? 'disabled' : ''}>▼</button>
      </div>
      <input type="password" class="key" placeholder="API key(s), comma separated" />
      <input type="text" class="model" placeholder="model" />`;
    div.querySelector('b').textContent = `${i + 1}. ${p.name}`;
    div.querySelector('.key').value = cfg.keys[id] || '';
    div.querySelector('.model').value = cfg.models[id] || p.model;
    div.querySelector('.key').oninput = (e) => (cfg.keys[id] = e.target.value.trim());
    div.querySelector('.model').oninput = (e) => (cfg.models[id] = e.target.value.trim());
    div.querySelector('input[type=checkbox]').onchange = (e) => {
      cfg.enabled[id] = e.target.checked;
      div.classList.toggle('off', !e.target.checked);
    };
    div.querySelectorAll('[data-mv]').forEach((btn) => (btn.onclick = () => {
      const o = ordered();
      const j = i + Number(btn.dataset.mv);
      [o[i], o[j]] = [o[j], o[i]];
      cfg.order = o;
      buildProviderList();
    }));
    box.appendChild(div);
  });
}

async function openSettings() {
  cfg = await window.api.getConfig(); // fresh copy, so "Back" discards edits
  cfg.enabled = cfg.enabled || {};
  cfg.order = ordered();
  buildProviderList();
  $('transcriber').value = cfg.transcriber;
  $('language').value = cfg.language;
  $('systemPrompt').value = cfg.systemPrompt;
  $('opacity').value = cfg.opacity;
  $('main').hidden = true;
  $('settings').hidden = false;
}

async function closeSettings() {
  cfg = await window.api.getConfig();
  cfg.enabled = cfg.enabled || {};
  window.api.setOpacity(cfg.opacity);
  buildProviderSelect();
  $('settings').hidden = true;
  $('main').hidden = false;
}

$('settingsBtn').onclick = openSettings;
$('backBtn').onclick = closeSettings;
$('opacity').oninput = (e) => window.api.setOpacity(parseFloat(e.target.value));
$('saveBtn').onclick = async () => {
  cfg.transcriber = $('transcriber').value;
  cfg.language = $('language').value.trim();
  cfg.systemPrompt = $('systemPrompt').value;
  cfg.opacity = parseFloat($('opacity').value);
  await window.api.setConfig(cfg);
  closeSettings();
};
$('provider').onchange = async (e) => { cfg.provider = e.target.value; await window.api.setConfig(cfg); };
$('hideBtn').onclick = () => window.api.hide();
$('quitBtn').onclick = () => window.api.quit();
$('clearBtn').onclick = () => { $('answers').innerHTML = ''; Object.keys(history).forEach((k) => delete history[k]); };

// ---------------- Asking ----------------
function setStatus(s) { $('statusDot').className = 'dot ' + (s || ''); }

function ask(question) {
  question = (question || '').trim();
  if (!question) return;
  const modes = cfg.provider === 'all' ? ordered().filter(isOn) : [cfg.provider];

  const card = document.createElement('div');
  card.className = 'qa';
  const q = document.createElement('div');
  q.className = 'q';
  q.textContent = 'Q: ' + question;
  card.appendChild(q);
  if (!modes.length) {
    const a = document.createElement('div');
    a.className = 'a err';
    a.textContent = '⚠ No AI has a key yet. Open ⚙ and add one.';
    card.appendChild(a);
  }

  for (const mode of modes) {
    const a = document.createElement('div');
    a.className = 'a';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = PROVIDERS[mode]?.name || '';
    const body = document.createElement('span');
    body.textContent = '…';
    a.append(tag, body);
    card.appendChild(a);

    const id = Math.random().toString(36).slice(2);
    pending[id] = { el: body, tag, text: '', mode, question };
    const messages = [...(history[mode] || []).slice(-6), { role: 'user', content: question }];
    window.api.ask({ id, provider: mode, messages });
  }
  $('answers').appendChild(card);
  $('answers').scrollTop = $('answers').scrollHeight;
  if (modes.length) setStatus('busy');
}

window.api.onAI(({ id, type, data }) => {
  const p = pending[id];
  if (!p) return;
  if (type === 'provider') {
    p.tag.textContent = PROVIDERS[data]?.name || data; // shows which AI is answering (Auto may switch)
  } else if (type === 'chunk') {
    p.text += data;
    p.el.textContent = p.text;
    $('answers').scrollTop = $('answers').scrollHeight;
  } else if (type === 'error') {
    p.el.textContent = (p.text ? p.text + '\n\n' : '') + '⚠ ' + data;
    p.el.classList.add('err');
    delete pending[id];
  } else if (type === 'done') {
    (history[p.mode] = history[p.mode] || []).push({ role: 'user', content: p.question }, { role: 'assistant', content: p.text });
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
