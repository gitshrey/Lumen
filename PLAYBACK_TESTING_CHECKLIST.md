# Vela — Media Compatibility & Playback Testing Checklist

Verify each test case on a target Windows 11 machine using the bundled `libmpv` + `FFmpeg` + `libass` + `libplacebo` build. Do not claim universal compatibility without executing these tests.

## 1. Format & Codec Matrix

| # | Test Asset | Container / Codec | Startup | Seeking | A/V Sync | Subtitles | HW Accel (`hwdec-current`) | 30+ Min Stability | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Standard HD Film | MP4 + H.264 / AAC | [ ] | [ ] | [ ] | [ ] | [ ] D3D11VA / NVDEC | [ ] | Pending |
| 2 | Modern HEVC Film | MKV + H.265 (HEVC 10-bit) | [ ] | [ ] | [ ] | [ ] | [ ] D3D11VA / NVDEC | [ ] | Pending |
| 3 | Multi-Audio MKV | MKV + 2+ Audio Tracks (switch live) | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | Pending |
| 4 | Embedded + External Subs | MKV + embedded ASS/PGS + external `.srt`/`.vtt` | [ ] | [ ] | [ ] | [ ] libass | [ ] | [ ] | Pending |
| 5 | Next-Gen AV1 | WebM / MKV + AV1 | [ ] | [ ] | [ ] | [ ] | [ ] D3D11VA or SW fallback | [ ] | Pending |
| 6 | VP9 Video | WebM + VP9 / Opus | [ ] | [ ] | [ ] | [ ] | [ ] D3D11VA / DXVA2 | [ ] | Pending |
| 7 | Lossless Audio | FLAC (24-bit / 96 kHz) | [ ] | [ ] | [ ] | N/A | N/A | [ ] | Pending |
| 8 | Surround Audio | MKV + DTS / AC3 / TrueHD | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | Pending |
| 9 | 4K UHD Video | MP4/MKV 3840x2160 60fps | [ ] | [ ] | [ ] | [ ] | [ ] Zero dropped frames | [ ] | Pending |
| 10 | HDR10 Video | MKV 4K HEVC 10-bit PQ (`libplacebo`) | [ ] | [ ] | [ ] | [ ] | [ ] Tone-map / HDR out | [ ] | Pending |
| 11 | High-Bitrate Master | 80+ Mbps 4K ProRes / H.264 | [ ] | [ ] | [ ] | [ ] | [ ] Low CPU usage | [ ] | Pending |

## 2. Resilience & Edge-Case Verification

- [ ] **Extension-independent detection**: Rename a valid `.mkv` file to `.mp4` and confirm `mediaProbe.js` + `libmpv` detect the actual Matroska container and play it cleanly.
- [ ] **Corrupted / partially downloaded file**: Open a truncated `.mp4` or `.mkv` and confirm Vela recovers gracefully without crashing the Electron shell.
- [ ] **Unsupported codec fallback**: Open an unsupported file and verify a clear, non-crashing error toast appears.
- [ ] **Hardware-to-software fallback**: Force `--hwdec=auto-safe` on a GPU without AV1 hardware decode and confirm seamless fallback to software decoding.
- [ ] **Subtitle & audio sync**: Adjust subtitle delay (`±0.5s`) and audio delay live during playback and confirm immediate effect.
- [ ] **High-DPI & Windows 11 UX**: Test at 100%, 125%, 150%, and 200% Windows scaling across 1080p, 1440p, and 4K displays, verifying frameless window snap, fullscreen exit (`Esc`/`F`), and Picture-in-Picture.
