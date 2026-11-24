/**
 * Content-based container and codec inspection via bundled ffprobe.
 * Does NOT rely exclusively on file extensions: a .mkv file renamed to .mp4
 * is identified accurately from its binary container and stream headers.
 */
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

function probeMediaFile(filePath, mpvDir) {
  return new Promise((resolve) => {
    const ffprobeBin = path.join(mpvDir, 'ffprobe.exe');
    if (!fs.existsSync(ffprobeBin)) {
      return resolve({ ok: false, reason: 'ffprobe-not-bundled', filePath });
    }
    execFile(
      ffprobeBin,
      ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', filePath],
      { timeout: 8000, windowsHide: true },
      (err, stdout) => {
        if (err) return resolve({ ok: false, reason: err.message, filePath });
        try {
          const parsed = JSON.parse(stdout);
          const vStream = (parsed.streams || []).find((s) => s.codec_type === 'video');
          const aStreams = (parsed.streams || []).filter((s) => s.codec_type === 'audio');
          const sStreams = (parsed.streams || []).filter((s) => s.codec_type === 'subtitle');
          resolve({
            ok: true,
            container: parsed.format ? parsed.format.format_name : 'unknown',
            duration: parsed.format ? Number(parsed.format.duration || 0) : 0,
            bitrate: parsed.format ? Number(parsed.format.bit_rate || 0) : 0,
            videoCodec: vStream ? vStream.codec_name : null,
            width: vStream ? vStream.width : 0,
            height: vStream ? vStream.height : 0,
            fps: vStream ? vStream.r_frame_rate : null,
            hdr: vStream ? (vStream.color_transfer || 'sdr') : 'none',
            audioTracks: aStreams.map((a) => ({ codec: a.codec_name, channels: a.channels, lang: (a.tags && a.tags.language) || 'und' })),
            subtitleTracks: sStreams.map((s) => ({ codec: s.codec_name, lang: (s.tags && s.tags.language) || 'und' }))
          });
        } catch (parseErr) {
          resolve({ ok: false, reason: parseErr.message, filePath });
        }
      }
    );
  });
}

module.exports = { probeMediaFile };
