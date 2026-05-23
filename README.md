# Personal Codex — Patch 41 Data Integrity

Private Personal Codex PWA package for GitHub Pages.

Upload the contents of this folder to the repository root:

- index.html
- app.css
- manifest.webmanifest
- sw.js
- assets/icons/icon-192.png
- assets/icons/icon-512.png
- assets/icons/maskable-512.png

Patch 41 focuses on data-integrity and safe polish after the Patch 40 audit cycle. It preserves GPT/recent-history fields through normalisation, cloud pull, import merge, and reload flows; hardens Firebase SDK loading against duplicate initialisation; avoids overconfident online reconnection states; makes mobile keyboard detection more conservative; raises Today quick-entry zone tap targets; and bumps the service-worker cache to v41.

After uploading, open the live GitHub Pages URL and refresh once so the new service worker takes control.
