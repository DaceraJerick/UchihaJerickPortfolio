// AI Overlay - main process
// Window is excluded from screen capture via setContentProtection(true):
//   Windows 10 (2004+) / 11 -> SetWindowDisplayAffinity(WDA_EXCLUDEFROMCAPTURE)
//   macOS                  -> NSWindowSharingNone
// Linux has no equivalent, so the window WILL be visible when sharing there.

const { app, BrowserWindow, ipcMain, globalShortcut, session, desktopCapturer } = require('electron');
const path = require('path');
const fs = require('fs');
const providers = require('./providers');

let win;
const configPath = () => path.join(app.getPath('userData'), 'config.json');

const DEFAULT_CONFIG = {
  keys: { openai: '', claude: '', deepseek: '', gemini: '' },
  models: {
    openai: 'gpt-4o-mini',
    claude: 'claude-haiku-5-5',
    deepseek: 'deepseek-chat',
    gemini: 'gemini-2.5-flash'
  },
  provider: 'openai',
  transcriber: 'auto', // auto | openai | gemini
  language: '',        // e.g. "en", "tl" - blank = auto detect
  systemPrompt:
    'You help me answer questions asked out loud in a class or meeting. ' +
    'Give a short, clear answer I can read quickly and say in my own words. ' +
    'Lead with the direct answer in 1-3 sentences, then up to 3 short bullet points if useful.',
  opacity: 0.92
};

function loadConfig() {
  try {
    const saved = JSON.parse(fs.readFileSync(configPath(), 'utf8'));
    return {
      ...DEFAULT_CONFIG,
      ...saved,
      keys: { ...DEFAULT_CONFIG.keys, ...(saved.keys || {}) },
      models: { ...DEFAULT_CONFIG.models, ...(saved.models || {}) }
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function saveConfig(cfg) {
  fs.mkdirSync(path.dirname(configPath()), { recursive: true });
  fs.writeFileSync(configPath(), JSON.stringify(cfg, null, 2));
}

function createWindow() {
  const cfg = loadConfig();
  win = new BrowserWindow({
    width: 440,
    height: 620,
    x: 40,
    y: 60,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,          // no taskbar button (taskbar can show up in full-screen shares)
    resizable: true,
    hasShadow: false,
    title: 'Notes',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setContentProtection(true);          // <-- hides window from screen share / recording
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setOpacity(cfg.opacity || 0.92);
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  // Lets the renderer capture SYSTEM audio (what you hear: teacher's voice from Zoom/Meet/Teams).
  session.defaultSession.setDisplayMediaRequestHandler(async (_req, callback) => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    callback({ video: sources[0], audio: 'loopback' });
  });
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, cb) => cb(true));

  createWindow();

  // Global hotkeys
  globalShortcut.register('CommandOrControl+Shift+H', () => {
    if (!win) return;
    win.isVisible() ? win.hide() : win.showInactive();
  });
  globalShortcut.register('CommandOrControl+Shift+Space', () => win && win.webContents.send('hotkey', 'toggle-listen'));
  globalShortcut.register('CommandOrControl+Shift+Enter', () => win && win.webContents.send('hotkey', 'ask'));
  globalShortcut.register('CommandOrControl+Shift+Up', () => moveBy(0, -40));
  globalShortcut.register('CommandOrControl+Shift+Down', () => moveBy(0, 40));
  globalShortcut.register('CommandOrControl+Shift+Left', () => moveBy(-40, 0));
  globalShortcut.register('CommandOrControl+Shift+Right', () => moveBy(40, 0));
});

function moveBy(dx, dy) {
  if (!win) return;
  const [x, y] = win.getPosition();
  win.setPosition(x + dx, y + dy);
}

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => app.quit());

// ---------- IPC ----------
ipcMain.handle('config:get', () => loadConfig());
ipcMain.handle('config:set', (_e, cfg) => {
  saveConfig(cfg);
  if (win) win.setOpacity(cfg.opacity || 0.92);
  return true;
});
ipcMain.on('win:hide', () => win && win.hide());
ipcMain.on('win:quit', () => app.quit());
ipcMain.on('win:opacity', (_e, v) => win && win.setOpacity(v));

// Streaming chat: renderer sends {id, provider, messages}; main streams chunks back.
ipcMain.on('ai:ask', async (e, { id, provider, messages }) => {
  const cfg = loadConfig();
  const send = (type, data) => !e.sender.isDestroyed() && e.sender.send('ai:event', { id, provider, type, data });
  try {
    await providers.streamChat({
      provider,
      apiKey: cfg.keys[provider],
      model: cfg.models[provider],
      system: cfg.systemPrompt,
      messages,
      onText: (t) => send('chunk', t)
    });
    send('done');
  } catch (err) {
    send('error', String(err.message || err));
  }
});

ipcMain.handle('ai:transcribe', async (_e, { audio, mimeType }) => {
  const cfg = loadConfig();
  return providers.transcribe({ cfg, audio: Buffer.from(audio), mimeType });
});
