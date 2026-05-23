# Personal Codex — Patch 36 Automatic Firebase PWA Package

Upload the contents of this folder to the root of the GitHub Pages repository.

Required Firebase setup already completed:
- Firebase project: personal-codex-cd9d4
- Realtime Database: europe-west1
- Authentication: Email/Password
- Database rules: authenticated user can read/write only /users/{uid}

Files:
- index.html — app shell with automatic Firebase Realtime Database sync
- manifest.webmanifest — install metadata
- sw.js — offline static-shell cache
- assets/icons/*.png — PWA icons
- personal_codex_patch_36_auto_sync.diff — code-level diff from Patch 35
- PACKAGE_AUDIT.md — runtime-file and syntax audit

Daily behaviour after upload:
1. Open the GitHub Pages URL over HTTPS.
2. Sign in once on each device using the SYNC button if the saved Firebase session is not already active.
3. After that, the app reconnects automatically on open.
4. Local data appears instantly from localStorage, then the newest cloud Codex replaces it silently when Firebase responds.
5. Normal edits auto-save to Firebase after a short debounce; manual Upload/Pull controls are recovery-only.

First cloud authority:
- If the cloud database is empty, the first device with meaningful local Codex data will create the cloud copy automatically.
- If the cloud already contains data, cloud becomes the normal authority on app open.
