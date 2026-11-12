const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getConfig: () => ipcRenderer.invoke('config:get'),
  setConfig: (cfg) => ipcRenderer.invoke('config:set', cfg),
  ask: (payload) => ipcRenderer.send('ai:ask', payload),
  onAI: (cb) => ipcRenderer.on('ai:event', (_e, ev) => cb(ev)),
  transcribe: (audio, mimeType) => ipcRenderer.invoke('ai:transcribe', { audio, mimeType }),
  onHotkey: (cb) => ipcRenderer.on('hotkey', (_e, name) => cb(name)),
  hide: () => ipcRenderer.send('win:hide'),
  quit: () => ipcRenderer.send('win:quit'),
  setOpacity: (v) => ipcRenderer.send('win:opacity', v)
});
