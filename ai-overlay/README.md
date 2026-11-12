# AI Overlay

A small always-on-top window with **ChatGPT, Claude, DeepSeek and Gemini**. Other people can't see it when you share your screen. It can listen to a question (from the call audio or your mic) and show the answer **as text only**. It never speaks.

## How it stays hidden
The window uses Electron's `setContentProtection(true)`:
- **Windows 10 (version 2004 or newer) and Windows 11:** the window is left out of Zoom, Google Meet, Teams, Discord and OBS screen shares and recordings. People watching your share see whatever is behind it.
- **macOS:** works for most apps. Some newer capture methods on macOS 15+ can still show it, so test first.
- **Linux:** not supported. The window *will* show in a share.

It also doesn't get a taskbar button. **Always test before you rely on it:** share your screen in a test call (or record it with OBS) and check that the window doesn't appear.

## Setup (Windows)
1. Install **Node.js LTS** from https://nodejs.org
2. Get this folder onto your laptop:
   ```bash
   git clone -b claude/brave-bell-08juyr https://github.com/DaceraJerick/UchihaJerickPortfolio.git
   ```
   ```bash
   cd UchihaJerickPortfolio/ai-overlay
   ```
3. Install and run:
   ```bash
   npm install
   ```
   ```bash
   npm start
   ```
4. Click **⚙**, paste your API keys, then click **Save**. You only need keys for the AIs you'll use.
   - ChatGPT: https://platform.openai.com/api-keys
   - Claude: https://console.anthropic.com/settings/keys
   - DeepSeek: https://platform.deepseek.com/api_keys
   - Gemini: https://aistudio.google.com/apikey

Optional, to build one `.exe` file you can double-click: `npm run build:win`. The file appears in `dist/`.

## How to use
| Action | How |
|---|---|
| Listen to the question | Pick **🔊 Teacher / call audio** (what comes out of your speakers) or **🎤 My microphone**, then press **● Listen** or **Ctrl+Shift+Space** |
| Get the answer | Press **■ Stop & answer** or **Ctrl+Shift+Space** again. The app transcribes the audio and the answer streams in as text |
| Type a question | Type in the box and press Enter |
| Compare all AIs | Pick **All 4 (compare)** in the dropdown |
| Hide / show the window | **Ctrl+Shift+H** |
| Move the window | Drag the top bar, or use **Ctrl+Shift+Arrow keys** |
| Make it see-through | ⚙ → Window opacity |

**Voice needs an OpenAI or Gemini key**, because one of them turns speech into text. A Gemini key alone is enough.

Your keys are saved only on your computer, in Electron's user-data folder (`config.json`). They are never put in this repo.

If an AI shows an error about the model name, open ⚙ → Models and enter a current model name from that provider's website.
