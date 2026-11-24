<div align="center">
<h1>Lumen Video Player</h1>
<p><strong>A Liquid Glass cinema & lossless audio player for Windows 11 and Android (Phones & Tablets).</strong></p>
<p>
<a href="https://www.google.com/search?q=https://github.com/gitshrey/Lumen/releases">
<img src="https://img.shields.io/badge/Download-Windows%20(.exe)-0EA5E9?style=for-the-badge&logo=windows11&logoColor=white" alt="Download for Windows" />
</a>
&nbsp;
<a href="https://www.google.com/search?q=https://github.com/gitshrey/Lumen/releases">
<img src="https://img.shields.io/badge/Download-Android%20(.apk)-34D399?style=for-the-badge&logo=android&logoColor=white" alt="Download for Android" />
</a>
</p>
<p>
<a href="https://www.google.com/search?q=https://github.com/gitshrey/Lumen/releases"><img src="https://img.shields.io/github/v/release/gitshrey/Lumen?include_prereleases&style=flat-square&label=Latest%20Release&color=8FA8FF" alt="Latest Release" /></a>
<a href="https://www.google.com/search?q=https://github.com/gitshrey/Lumen/actions"><img src="https://img.shields.io/github/actions/workflow/status/gitshrey/Lumen/build-windows.yml?style=flat-square&label=Windows%20Build" alt="Windows Build" /></a>
<a href="https://www.google.com/search?q=https://github.com/gitshrey/Lumen/actions"><img src="https://img.shields.io/github/actions/workflow/status/gitshrey/Lumen/build-android.yml?style=flat-square&label=Android%20Build" alt="Android Build" /></a>
<img src="https://www.google.com/search?q=https://img.shields.io/badge/UI-Liquid%2520Glass%25203.0-A5B8FF%3Fstyle%3Dflat-square" alt="Liquid Glass 3.0" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Privacy-100%2525%2520Offline-6EE7B7%3Fstyle%3Dflat-square" alt="100% Offline" />
</p>
<p>
<a href="#-download">Download</a> •
<a href="#-screenshots">Screenshots</a> •
<a href="#-flagship-features">Features</a> •
<a href="#-subtitle-animations">Subtitle Styles</a> •
<a href="#-controls--shortcuts">Controls</a> •
<a href="#-architecture--builds">Architecture</a>
</p>
</div>
---
✨ Overview
Lumen Video Player 3.0 combines an eye-comfort Warm Obsidian & Soft Periwinkle-Rose Liquid Glass aesthetic with cinema-grade playback across Windows 11 and Android smartphones, foldables, and tablets. Built for speed, zero clutter, and offline privacy, Lumen remembers your library, playlists, favourites, and exact resume timestamps across updates.
---
⬇️ Download
Choose your platform from the GitHub Releases page:
Platform	Package	Requirements	Download
Windows 11 / 10 (64-bit)	`Lumen-Setup-3.0.x-x64.exe`	Windows 10 / 11 (x64)	Download Windows
Android (Phones & Tablets)	`Lumen-Android-3.0.x.apk`	Android 7.0+ (Phones, Foldables, Tablets)	Download Android
> **Verification:** Every Windows and Android release includes a `SHA256SUMS.txt` / `SHA256SUMS-android.txt` checksum file so you can verify file integrity before installing.
---
📸 Screenshots
> *Tip: Upload your screenshots into `docs/screenshots/` in this repository using the filenames below to display them automatically.*
Windows 11 Desktop
Home — Liquid Glass Sidebar & Eye-Comfort UI	Cinema Player — Kinetic Subtitles & Floating HUD
	
Android (Phones & Tablets)
Home — Twilight Cinema & Bento Library	Folder-Style Settings & Mobile Player
<img src="docs/screenshots/android-home.png" width="290" alt="Lumen Android Home" />	<img src="docs/screenshots/android-player.png" width="290" alt="Lumen Android Player" />
---
🚀 Flagship Features
Shared Across Windows & Android
Refractive Liquid Glass UI: Eye-pleasing Warm Obsidian & Soft Periwinkle-Rose dark theme and Warm Pearl Alabaster light theme, with a dedicated Low-End Mode and Reduce Animations toggle in Settings for older hardware.
12 Mind-Blowing Subtitle Animations: Zero-jump, word-synced kinetic captions with a live interactive preview stage, smooth size slider (`16px–56px`), custom text & active-word highlight color pickers, vertical offset (`48px–260px`), and Dual Subtitles (two languages simultaneously).
5-Band Audio Equalizer & 200% Volume Boost: Built-in Web Audio EQ presets (`Flat`, `Cinema`, `Dialogue`, `Bass`, `Late Night`) plus gain boost up to 200% for quiet movie tracks.
Smart Library & Continuity: Organize videos with Playlists (accessible from the `⋮` / `•••` menu on every card), Favourites, Recently Played, Continue Watching resume memory, Network Streams (HTTP / HLS / RTSP), and a smart Up Next auto-play card in the final 15 seconds.
In-App GitHub Updater: Check for new Windows `.exe` or Android `.apk` releases directly inside Settings → About / Updates.
Windows 11 Desktop Exclusives
Cinema Playback Engine: Powered by mpv / libmpv, FFmpeg, libass, and libplacebo for broad format, HDR tone-mapping, and styled ASS/SSA subtitle support.
Multi-Language Audio & Embedded Chapters: Instant `ffprobe` audio language switching, fast cached embedded subtitle extraction, MKV/MP4 chapter ticks along the timeline, and `PageUp`/`PageDown` chapter skipping.
Timeline Hover Previews: Live `160×90` frame preview card while scrubbing the seekbar.
True Native Integration: Windows File Explorer "Open with → Lumen Video Player", native OS fullscreen covering the taskbar (`F` / `F11`), uncongested floating Picture-in-Picture with Back-to-App restore, Windows Taskbar & hardware media keys (SMTC), and update-proof disk persistence (`%APPDATA%\Lumen\lumen-activity.json`).
Android (Phones, Foldables & Tablets) Exclusives
All-Screen-Size Adaptive Layout: Twilight hero Continue Watching card, 2×2 Bento Library on smartphones expanding seamlessly to 4-column rows on tablets, and a floating Liquid Glass Pill Bottom Dock.
VLC-Style Mobile Player: Centered `↺ 10s` / `▶` / `↻ 10s` transport controls, screen Touch Lock, Portrait / Landscape Rotate toggle, and aligned bottom tiles in both vertical and horizontal orientations.
Native Android Polish: True edge-to-edge transparent phone status bar merged with the header, fluid app opening launch animation, folder-style Bento Settings, full-bleed Adaptive Icons (zero white border on circles, squircles, or teardrops), Android PiP, "Open with → Lumen Video Player" intent, and a consistent signing keystore for seamless in-place APK updates.
---
🎬 Subtitle Animations
Switch between 12 zero-jump word-synced styles live inside the player or test them in Settings → Subtitles:
Style	Aesthetic	Style	Aesthetic
Hormozi Pop	Bold uppercase Shorts-style active word pop	Cinema Serif	Luxury film-festival editorial serif
Liquid Glass Pill	Frosted translucent glass capsule per spoken word	Box Spotlight	High-contrast Reels active color pill
Aurora Sweep	Animated iridescent liquid gradient sweep	Karaoke Fill	Smooth progressive word-by-word highlight
Kinetic Blur Focus	Soft-blurred upcoming words snapping into sharp focus	Neon Glow	Radiant luminous bloom on spoken words
Wave Bounce	Spring-lift word bounce with glowing underline beam	Typewriter	Crisp timestamped word reveal
Cyber Glitch	RGB chromatic-split neon pulse	Classic Cinema	Clean understated bar with custom backdrop opacity
---
⌨️ Controls & Shortcuts
Windows Keyboard Shortcuts
Shortcut	Action	Shortcut	Action
`Space` / `K`	Play / Pause	`F` / `F11`	Toggle OS Fullscreen
`←` / `→` or `J` / `L`	Seek ±10s (`Shift` for ±30s)	`Esc`	Exit Fullscreen / Close Overlay / Back
`↑` / `↓`	Volume ±5% (up to 200%)	`M`	Mute / Unmute
`0` – `9`	Jump to 0% – 90%	`[` / `]` / `Backspace`	Speed −0.25× / +0.25× / Reset 1×
`Hold Mouse`	Temporary `2×` speed boost	`PageUp` / `PageDown`	Previous / Next Chapter
`C` / `V`	Subtitles menu	`A`	Cycle Aspect Ratio
`P`	Picture-in-Picture	`I` / `S`	Media Info / Capture Screenshot
`N` / `Shift + P`	Next / Previous track	`Ctrl + O` / `Ctrl + K`	Open File / Focus Search
Android Touch Gestures
Gesture	Action
Double-tap Left / Right	Seek `-10s` / `+10s`
Press & Hold Video	Temporary `2×` speed boost (releases back to normal)
Swipe Up / Down (Left Half)	Adjust screen brightness
Swipe Up / Down (Right Half)	Adjust volume (`0%–200%`)
Tap Lock (`🔒`) / Rotate (`↻`)	Lock touch screen / Switch Portrait & Landscape
---
📦 Installation & Updating
Windows 11
Download the latest `Lumen-Setup-3.0.x-x64.exe` from Releases.
Run the installer. (If Windows SmartScreen shows an "Unknown publisher" notice on unsigned open-source builds, click More info → Run anyway.)
Future updates can be checked and installed directly via Settings → About → Check for Updates.
Android
Download the latest `Lumen-Android-3.0.x.apk` from Releases.
Open the `.apk` file and allow "Install unknown apps" if prompted by Android.
Check for future Android builds anytime via Settings → Updates & About → Check for Updates—all APKs are signed with a consistent release key so updates install cleanly in-place.
---
🛠️ Architecture & Builds
Both platforms are built automatically via strictly isolated GitHub Actions workflows so updating Windows never triggers Android releases and vice versa:
Platform	Stack	Workflow File	Release Tag Pattern
Windows	Electron 45.4.1 • electron-builder 26.18.0 • Node 24 LTS • mpv & FFmpeg	`.github/workflows/build-windows.yml`	`v3.0.<run>`
Android	Capacitor 6.2.0 • Java 17 (Temurin) • Android Adaptive Icons & Edge-to-Edge `WindowCompat`	`.github/workflows/build-android.yml`	`android-v3.0.<run>`
---
🔒 Privacy & Security
100% Offline Local Playback: Your videos, library history, playlists, and resume timestamps stay strictly on your device—no telemetry, no accounts, and no cloud tracking.
Hardened Desktop Runtime: Electron `contextIsolation`, OS sandboxing, strict Content Security Policy (CSP), external navigation blocking, and allowlisted IPC channels.
---
<div align="center">
<p>Built with ❤️ by <a href="https://github.com/gitshrey">gitshrey</a></p>
</div>
