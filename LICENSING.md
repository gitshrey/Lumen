# Licensing & Distribution Compliance Guide

Vela uses established open-source multimedia libraries so all local playback runs 100% offline with zero external codec packs. Before distributing installers commercially or under a proprietary license, verify the exact build configuration of every bundled DLL.

## Bundled Multimedia Stack

| Component | Official Project | Primary License | Proprietary Distribution Notes |
| --- | --- | --- | --- |
| **mpv / libmpv** | [mpv.io](https://mpv.io/) / [GitHub](https://github.com/mpv-player/mpv) / [Releases](https://github.com/mpv-player/mpv/releases) | LGPL v2.1+ (when built with `-Dgpl=false`) or GPL v2/v3 (default builds) | Prefer an **LGPL v2.1+ shared DLL (`libmpv-2.dll`)** build if distributing Vela under a proprietary license. If a GPL build is bundled, the combined work must comply with GPL source-disclosure terms. |
| **FFmpeg** | [ffmpeg.org](https://ffmpeg.org/) / [Legal](https://www.ffmpeg.org/legal.html) / [GitHub](https://github.com/FFmpeg/FFmpeg) | LGPL v2.1+ (without `--enable-gpl` / `--enable-nonfree`) | Per [FFmpeg Legal](https://www.ffmpeg.org/legal.html), compile without `--enable-gpl` and `--enable-nonfree`, dynamically link shared libraries, include the LGPL text, and provide corresponding FFmpeg source code on request. |
| **libass** | [GitHub](https://github.com/libass/libass) | ISC License | Permissive license; retain copyright and permission notice in bundled notices. |
| **libplacebo** | [GitHub](https://github.com/haasn/libplacebo) | LGPL v2.1+ | Dynamic linking or relinking instructions + LGPL v2.1+ notice required. Powers `vo=gpu-next` HDR and high-quality GPU scaling. |

## Important Patent & Commercial Codec Notice

Open-source software licenses (LGPL, GPL, ISC) do **not** automatically grant patent licenses for patent-encumbered audio or video formats (such as H.264/AVC, H.265/HEVC, AAC, AC-3, E-AC-3, or DTS).
- Do not assume every codec can be commercially distributed worldwide without patent obligations.
- Review patent pool requirements in your target distribution jurisdictions, or leverage OS-provided hardware decoders (Windows Media Foundation / D3D11VA) where appropriate.
