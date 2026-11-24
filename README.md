# Vela — Premium Windows 11 Media Player

A minimal, cinematic desktop media player for Windows 11 built with an Electron frontend decoupled from a `libmpv` + `FFmpeg` + `libass` + `libplacebo` playback engine.

## Architecture

- **`src/index.html`** — Complete Dark/Light UI (Sidebar, Home, Library, Immersive Video Player with auto-hiding HUD, Mini Player, Playlists, Favourites, and 9-category Settings).
- **`electron/main.js` & `electron/preload.js`** — Native Windows 11 frameless window controls, high-DPI support, native file/folder dialogs, and secure `contextBridge` IPC.
- **`electron/engine/mpvEngine.js`** — Independent `libmpv` / `mpv` JSON IPC engine supporting `vo=gpu-next` (`libplacebo`), `hwdec=auto-safe` (D3D11VA / DXVA2 / NVDEC with software fallback), `libass` subtitle rendering, HDR tone mapping, and live media property inspection.
- **`electron/engine/mediaProbe.js`** — Stream/container probing via `ffprobe` so playback never relies solely on file extensions.

## Setup & Packaging on Windows

1. Download an **LGPL-compatible Windows x64 build** of `libmpv-2.dll`, `mpv.exe`, and `ffprobe.exe` (see [mpv Releases](https://github.com/mpv-player/mpv/releases) and `LICENSING.md`).
2. Copy those binaries into `resources/mpv/`.
3. Install dependencies and launch:
   ```bash
   npm install
   npm start
   ```
4. Build a standalone offline Windows installer (`.exe`) and portable build:
   ```bash
   npm run build:win
   ```

See `LICENSING.md` for LGPL/GPL and codec patent considerations, and `PLAYBACK_TESTING_CHECKLIST.md` for QA verification.
