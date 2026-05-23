# Personal Codex — Patch 35 Firebase PWA Package

Upload the contents of this folder to the root of the GitHub Pages repository.

Required Firebase setup already completed:
- Firebase project: personal-codex-cd9d4
- Realtime Database: europe-west1
- Authentication: Email/Password
- Database rules: authenticated user can read/write only /users/{uid}

Files:
- index.html — app shell with Firebase sync patch
- manifest.webmanifest — install metadata
- sw.js — offline static-shell cache
- assets/icons/*.png — PWA icons

After upload:
1. Open the GitHub Pages URL over HTTPS.
2. Click SYNC: LOCAL in the header.
3. Sign in with the Firebase user you created.
4. On the first device with your real local Codex data, use Upload Local if the cloud is empty.
5. On additional devices, sign in and Pull Cloud if required.
