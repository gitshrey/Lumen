/**
 * Decoupled mpv / libmpv Playback Engine for Windows 11.
 * Communicates over a named pipe JSON IPC socket with a bundled LGPL-compatible
 * mpv/libmpv runtime (FFmpeg + libass + libplacebo).
 */
const { spawn } = require('child_process');
const net = require('net');
const path = require('path');
const fs = require('fs');

class MpvEngine {
  constructor({ mpvDir, onEvent }) {
    this.mpvDir = mpvDir;
    this.onEvent = onEvent || (() => {});
    this.pipePath = `\\\\.\\pipe\\vela-mpv-${process.pid}`;
    this.proc = null;
    this.socket = null;
    this.reqId = 1;
    this.pending = new Map();
    this.buffer = '';
  }

  start({ hwdec = 'auto-safe', renderer = 'gpu-next', hdr = true } = {}) {
    if (this.proc) return;
    const mpvBin = path.join(this.mpvDir, 'mpv.exe');
    if (!fs.existsSync(mpvBin)) {
      this.onEvent({ event: 'engine-missing', message: 'Place LGPL mpv.exe / libmpv-2.dll inside resources/mpv/.' });
      return;
    }

    const args = [
      '--idle=yes',
      '--no-terminal',
      '--force-window=no',
      `--input-ipc-server=${this.pipePath}`,
      `--vo=${renderer}`,                 // libplacebo (gpu-next) default
      `--hwdec=${hwdec}`,                 // auto-safe -> D3D11VA / DXVA2 / NVDEC -> software fallback
      '--sub-ass=yes',                    // libass subtitle rendering
      '--keep-open=yes',
      '--demuxer-lavf-o=fflags=+genpts',  // resilient handling of partial/corrupted files
      '--ytdl=no'
    ];
    if (hdr) {
      args.push('--target-colorspace-hint=yes', '--tone-mapping=auto');
    }

    this.proc = spawn(mpvBin, args, { windowsHide: true });
    this.proc.on('exit', () => {
      this.proc = null;
      this.socket = null;
      this.onEvent({ event: 'engine-exit' });
    });

    this._connectIpc(12);
  }

  _connectIpc(retries) {
    if (retries <= 0) return;
    const sock = net.createConnection(this.pipePath, () => {
      this.socket = sock;
      this.onEvent({ event: 'engine-ready' });
    });
    sock.on('data', (chunk) => {
      this.buffer += chunk.toString('utf8');
      const lines = this.buffer.split('\n');
      this.buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line);
          if (msg.request_id && this.pending.has(msg.request_id)) {
            const { resolve } = this.pending.get(msg.request_id);
            this.pending.delete(msg.request_id);
            resolve(msg);
          } else if (msg.event) {
            this.onEvent(msg);
          }
        } catch (_err) { /* ignore partial JSON */ }
      }
    });
    sock.on('error', () => {
      setTimeout(() => this._connectIpc(retries - 1), 150);
    });
  }

  command(args) {
    return new Promise((resolve) => {
      if (!this.socket) return resolve({ error: 'not-connected' });
      const id = this.reqId++;
      this.pending.set(id, { resolve });
      this.socket.write(JSON.stringify({ command: args, request_id: id }) + '\n');
    });
  }

  setProperty(name, value) {
    return this.command(['set_property', name, value]);
  }

  async getProperty(name) {
    const res = await this.command(['get_property', name]);
    return res && res.error === 'success' ? res.data : null;
  }

  async getMediaInfo() {
    const props = [
      'file-format', 'video-codec', 'audio-codec', 'width', 'height',
      'container-fps', 'video-bitrate', 'audio-params/channel-count',
      'video-params/primaries', 'video-params/gamma', 'hwdec-current', 'track-list'
    ];
    const info = {};
    for (const p of props) {
      info[p] = await this.getProperty(p);
    }
    return info;
  }

  dispose() {
    try { if (this.socket) this.socket.destroy(); } catch (_e) {}
    try { if (this.proc) this.proc.kill(); } catch (_e) {}
    this.socket = null;
    this.proc = null;
  }
}

module.exports = { MpvEngine };
