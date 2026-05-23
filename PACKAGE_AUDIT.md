<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#050d1a" />
  <meta name="application-name" content="Personal Codex" />
  <meta name="apple-mobile-web-app-title" content="Personal Codex" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="color-scheme" content="dark" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self' https://www.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.gstatic.com https://*.firebaseio.com https://*.firebasedatabase.app wss://*.firebaseio.com wss://*.firebasedatabase.app; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none';" />
  <title>Personal Codex</title>
  <link rel="manifest" id="pwa-manifest-link" href="manifest.webmanifest" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="app.css" />
</head>

<body>
  <div class="bg-container boot-hidden" aria-hidden="true">
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>
  </div>
  <div class="grain" aria-hidden="true"></div>

  <header class="hud-header boot-hidden">
    <div class="hud-title-block">
      <span class="hud-kicker">Private Codex</span>
      <span class="hud-title">PERSONAL CODEX</span>
    </div>
    <span class="hud-date" id="hud-date" aria-hidden="true">—</span>
    <div class="hud-actions">
      <span class="sync-dot" id="sync-dot" aria-label="Sync status: local" title="Sync status: local" role="status"></span>
      <button class="btn-hud mobile-actions-toggle" id="btn-mobile-actions" type="button" aria-haspopup="dialog" aria-expanded="false">MENU</button>
      <button class="btn-hud" id="btn-export" type="button">EXPORT</button>
      <button class="btn-hud" id="btn-copy" type="button">COPY</button>
      <button class="btn-hud" id="btn-paste" type="button">PASTE</button>
      <label class="btn-hud import-label" for="import-file">IMPORT</label>
      <button class="btn-hud" id="btn-history" type="button">HISTORY</button>
      <button class="btn-hud" id="btn-sync" type="button" title="Automatic Firebase sync status">SYNC: LOCAL</button>
      <button class="btn-hud pwa-install-btn" id="btn-pwa-install" type="button" hidden>INSTALL</button>
      <button class="btn-hud subtle health-glyph" id="btn-health" type="button" aria-label="Open Codex Health" title="Codex Health">◌</button>
      <input id="import-file" type="file" accept="application/json,.json,.txt,.md,text/plain,text/markdown" hidden />
    </div>
  </header>

  <div class="mobile-actions-overlay" id="mobile-actions-overlay" hidden>
    <div class="mobile-actions-backdrop" data-close-mobile-actions></div>
    <section class="mobile-actions-panel" role="dialog" aria-modal="true" aria-labelledby="mobile-actions-title">
      <div class="mobile-sheet-handle" aria-hidden="true"></div>
      <div class="micro-label">Codex Actions</div>
      <h2 class="mobile-actions-title" id="mobile-actions-title">Archive</h2>
      <div class="mobile-actions-grid">
        <button type="button" data-mobile-action="export">Export JSON</button>
        <button type="button" data-mobile-action="copy">Copy JSON</button>
        <button type="button" data-mobile-action="paste">Paste JSON</button>
        <button type="button" data-mobile-action="import">Import File</button>
        <button type="button" data-mobile-action="history">History</button>
        <button type="button" data-mobile-action="health">Codex Health</button>
        <button type="button" data-mobile-action="sync">Sync Status</button>
        <button type="button" data-mobile-action="install">Install</button>
      </div>
      <button class="mobile-actions-close" id="mobile-actions-close" type="button" data-close-mobile-actions>Close</button>
    </section>
  </div>

  <section class="import-review-overlay" id="sync-overlay" aria-label="Firebase sync" hidden>
    <div class="import-review-backdrop" data-sync-action="close"></div>
    <div class="import-review-panel sync-panel" role="dialog" aria-modal="true" aria-labelledby="sync-title">
      <div class="import-review-header">
        <div>
          <div class="panel-kicker">Realtime Archive</div>
          <h2 class="import-review-title" id="sync-title">Automatic Firebase Sync</h2>
          <p class="import-review-subtitle" id="sync-subtitle">Once signed in, the Codex syncs silently across desktop and mobile. Manual controls are kept only for recovery.</p>
        </div>
        <button class="panel-close" type="button" data-sync-action="close" aria-label="Close sync panel">×</button>
      </div>

      <div class="sync-status-card" id="sync-status-card">
        <strong id="sync-status-label">LOCAL</strong>
        <span id="sync-status-note">Local storage is active. Cloud sync is not connected.</span>
      </div>

      <div class="sync-form" id="sync-form">
        <label class="sync-field">
          <span>Email</span>
          <input class="sync-input" id="sync-email" type="email" autocomplete="username" placeholder="your@email.com" />
        </label>
        <label class="sync-field">
          <span>Password</span>
          <input class="sync-input" id="sync-password" type="password" autocomplete="current-password" placeholder="Firebase password" />
        </label>
      </div>

      <div class="import-review-actions sync-actions">
        <button class="composer-action" type="button" data-sync-action="pull">Recovery: Pull Cloud</button>
        <button class="composer-action" type="button" data-sync-action="upload">Recovery: Upload Local</button>
        <button class="composer-action" type="button" data-sync-action="signout">Sign Out</button>
        <button class="composer-action primary" type="button" data-sync-action="signin">Sign In</button>
      </div>

      <p class="import-review-note">Normal use is automatic: open the app, let the saved login reconnect, and the newest cloud state will apply silently. Use recovery buttons only if a device has clearly fallen out of sync.</p>
    </div>
  </section>


  <main class="stage" aria-label="Personal Codex dashboard">
    <section class="today-view" id="today-view" aria-label="Today dashboard" hidden>
      <div class="today-hero-card">
        <div>
          <div class="panel-kicker">Today</div>
          <h2 class="today-title">Daily Command</h2>
          <p class="today-subtitle" id="today-mobile-subtitle">Open, understand the day, record evidence, leave.</p>
        </div>
        <button class="today-primary-add" id="today-primary-add" type="button" aria-label="Add entry from Today dashboard">+</button>
      </div>

      <div class="today-rings-row" id="today-rings-row" aria-label="Today zone status"></div>

      <section class="today-quick-section" aria-label="Quick log">
        <div class="today-section-head">
          <span class="micro-label">Quick Log</span>
          <button class="today-section-link" id="today-open-quick" type="button">All</button>
        </div>
        <div class="today-quick-row" id="today-quick-row"></div>
        <div class="today-inline-entry" id="today-inline-entry" aria-label="Fast mobile entry">
          <div class="today-inline-zones" id="today-inline-zones" aria-label="Quick entry zone">
            <button type="button" data-today-zone="head">Mind</button>
            <button type="button" data-today-zone="torso">Rituals</button>
            <button type="button" data-today-zone="arms">Craft</button>
            <button type="button" data-today-zone="legs">Body</button>
          </div>
          <div class="today-inline-control">
            <input class="today-quick-input" id="today-quick-input" type="text" autocomplete="off" inputmode="text" placeholder="Quick entry…" />
            <button class="today-quick-send" id="today-quick-send" type="button" aria-label="Record quick entry">→</button>
          </div>
        </div>
      </section>

      <section class="today-log-section" aria-label="Today's log">
        <div class="today-section-head">
          <span class="micro-label">Today's Log</span>
          <button class="today-section-link" id="today-open-history" type="button">History</button>
        </div>
        <div class="today-entry-log" id="today-entry-log"></div>
      </section>

      <section class="today-gpt-card" aria-label="Current situation summary">
        <div class="micro-label">Current Situation</div>
        <p id="today-current-situation">Awaiting GPT-generated current situation.</p>
      </section>
    </section>
    <section class="left-readout" aria-label="Codex rating summary">
      <div class="verdict-label">Current Assessment</div>
      <div class="verdict-value" id="overall-verdict">UNRATED</div>
      <p class="verdict-copy" id="overall-copy">Add rituals, goals, skills, or physical standards to begin the record.</p>
      <div class="rating-meter" aria-label="Overall completion meter">
        <div class="rating-track">
          <div class="rating-fill" id="overall-meter-fill"></div>
        </div>
        <div class="rating-axis"><span>POOR</span><span>GOOD</span><span>EXCELLENT</span></div>
      </div>
      <div class="zone-summary-list" id="zone-summary-list" aria-label="Zone rating summaries"></div>
      <div class="score-grid">
        <div class="score-tile">
          <div class="micro-label">Today</div>
          <strong id="today-score">—</strong>
          <span>Overall completion</span>
        </div>
        <div class="score-tile">
          <div class="micro-label">7-Day</div>
          <strong id="rolling-score">—</strong>
          <span>Registered average</span>
        </div>
        <div class="score-tile">
          <div class="micro-label">Entries</div>
          <strong id="total-entries">0</strong>
          <span>Codex records</span>
        </div>
        <div class="score-tile">
          <div class="micro-label">Last Export</div>
          <strong id="last-export-date">—</strong>
          <span>Backup date</span>
          <strong id="json-status" hidden>AUTO</strong>
        </div>
      </div>
    </section>

    <section class="silhouette-wrap" aria-label="Interactive body map">
      <div class="figure-aura" aria-hidden="true"></div>
      <svg id="body-svg" class="boot-hidden" viewBox="0 0 300 580" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="body-title body-desc" shape-rendering="geometricPrecision">
        <title id="body-title">Interactive anatomical silhouette</title>
        <desc id="body-desc">Click the head for mental goals, torso for daily rituals, arms for skills, and legs for physical standards.</desc>

        <g id="hud-lines"></g>

        <!-- Subtle whole-body outline to make the figure read as one connected silhouette. -->
        <path class="body-outline" d="M150 18 C132 18 120 32 119 51 C118 70 128 86 139 93 L139 108 C129 109 119 112 109 119 C90 130 70 151 53 176 C39 197 25 225 15 251 C11 262 16 273 27 277 C39 282 50 276 56 265 C68 242 80 219 97 198 C101 231 108 263 121 306 C112 346 109 390 110 438 L108 525 C108 552 123 568 142 559 C150 555 153 545 153 530 L154 366 L160 366 L162 530 C162 545 166 555 174 559 C193 568 208 552 208 525 L206 438 C207 390 204 346 195 306 C208 263 215 231 219 198 C236 219 248 242 260 265 C266 276 277 282 289 277 C300 273 305 262 300 251 C290 225 276 197 247 176 C230 151 210 130 191 119 C181 112 171 109 161 108 L161 93 C172 86 182 70 181 51 C180 32 168 18 150 18 Z" />

        <ellipse class="zone" role="button" data-zone="head" tabindex="0" cx="150" cy="57" rx="32" ry="39" aria-label="Head, mental goals" />

        <path class="body-connector" d="M137 94 C141 99 145 101 150 101 C155 101 159 99 163 94 L163 114 C154 119 146 119 137 114 Z" />

        <path class="zone" role="button" data-zone="torso" tabindex="0" aria-label="Torso, habits and daily rituals" d="M108 121 C121 112 135 108 150 109 C165 108 179 112 192 121 C204 143 206 179 202 214 C198 252 190 284 179 313 L121 313 C110 284 102 252 98 214 C94 179 96 143 108 121 Z" />

        <path class="zone" role="button" data-zone="arms" tabindex="0" aria-label="Left arm, skills and craft" d="M106 124 C91 131 76 146 62 165 C47 185 32 214 20 244 C15 257 20 269 31 273 C42 277 51 270 57 258 C69 234 81 212 96 193 C108 177 115 157 116 139 C116 130 113 126 106 124 Z" />

        <path class="zone" role="button" data-zone="arms" tabindex="0" aria-label="Right arm, skills and craft" d="M194 124 C209 131 224 146 238 165 C253 185 268 214 280 244 C285 257 280 269 269 273 C258 277 249 270 243 258 C231 234 219 212 204 193 C192 177 185 157 184 139 C184 130 187 126 194 124 Z" />

        <path class="zone" role="button" data-zone="legs" tabindex="0" aria-label="Left leg, body and physical standards" d="M121 313 L148 313 C151 334 151 363 149 392 L147 528 C147 543 142 552 132 554 C119 557 112 547 112 528 L113 438 C112 391 114 349 121 313 Z" />

        <path class="zone" role="button" data-zone="legs" tabindex="0" aria-label="Right leg, body and physical standards" d="M152 313 L179 313 C186 349 188 391 187 438 L188 528 C188 547 181 557 168 554 C158 552 153 543 153 528 L151 392 C149 363 149 334 152 313 Z" />
      </svg>
      <div class="zone-tooltip" id="zone-tooltip" aria-hidden="true"></div>
    </section>

    <aside class="home-panel" id="home-panel" aria-label="Current situation command panel">
      <div class="home-panel-header">
        <div>
          <div class="panel-kicker">Personal Dossier</div>
          <h2 class="panel-title">Current Situation</h2>
        </div>
        <button class="dossier-summary-toggle" id="dossier-summary-toggle" type="button" aria-expanded="false" aria-controls="dossier-summary-panel">Summary</button>
      </div>

      <section class="dossier-summary-panel" id="dossier-summary-panel" hidden>
        <div class="micro-label">Summary</div>
        <div id="dossier-summary-readout" class="codex-summary-readout empty">Awaiting GPT bulletpoint summary.</div>
      </section>

      <section class="codex-field-block gpt-dossier-block" aria-live="polite">
        <div class="micro-label">Current Situation</div>
        <div id="current-situation-readout" class="codex-readout empty">Awaiting GPT-generated current situation.</div>
        <div class="gpt-reflection-embedded">
          <div class="micro-label">Reflection</div>
          <div id="gpt-reflection-readout" class="codex-reflection-readout empty">Awaiting GPT-written reflection.</div>
        </div>
        <p class="codex-field-note">Persistent until the next GPT import.</p>
      </section>

      <details class="zone-summary-editor">
        <summary>GPT Zone Summaries</summary>
        <div class="zone-summary-editor-grid">
          <label><span>Mind</span><textarea id="summary-mind" class="codex-textarea compact" placeholder="Awaiting GPT summary for mindset and mental clarity." readonly></textarea></label>
          <label><span>Rituals</span><textarea id="summary-rituals" class="codex-textarea compact" placeholder="Awaiting GPT summary for habits and daily discipline." readonly></textarea></label>
          <label><span>Craft</span><textarea id="summary-craft" class="codex-textarea compact" placeholder="Awaiting GPT summary for skills and capability." readonly></textarea></label>
          <label><span>Body</span><textarea id="summary-body" class="codex-textarea compact" placeholder="Awaiting GPT summary for physical standards." readonly></textarea></label>
        </div>
      </details>
    </aside>

    <aside class="side-panel" id="side-panel" aria-live="polite" aria-label="Codex entry panel" hidden>
      <div class="panel-handle" id="panel-handle" aria-hidden="true"></div>
      <div class="panel-header">
        <div class="panel-icon" id="panel-icon">◈</div>
        <div>
          <div class="panel-kicker" id="panel-kicker">Zone</div>
          <h2 class="panel-title" id="panel-title">Mind</h2>
          <p class="panel-subtitle" id="panel-subtitle">Mental clarity and mindset goals.</p>
        </div>
        <button class="panel-close" id="panel-close" type="button" aria-label="Close panel">×</button>
      </div>

      <div class="panel-metric-row">
        <div class="progress-ring" id="progress-ring"></div>
        <div class="metric-copy">
          <div class="micro-label" id="metric-label">Completion</div>
          <strong id="metric-title">0%</strong>
          <p id="metric-copy">No records yet.</p>
        </div>
      </div>

      <div class="history-strip" id="history-strip" hidden></div>
      <ul class="item-list" id="item-list"></ul>

    </aside>
  </main>

  <section class="history-overlay" id="history-overlay" aria-label="Codex history" hidden>
    <div class="history-backdrop" data-close-history></div>
    <div class="history-panel" role="dialog" aria-modal="true" aria-labelledby="history-title">
      <div class="history-header">
        <div>
          <div class="panel-kicker">Recorded Archive</div>
          <h2 class="history-title" id="history-title">History</h2>
          <p class="history-subtitle">Fourteen-day archive. Select a day to inspect its evidence.</p>
        </div>
        <button class="panel-close" id="history-close" type="button" data-close-history aria-label="Close history">×</button>
      </div>
      <div class="history-shell"><div class="history-list" id="history-list" aria-label="History days"></div><article class="history-detail-panel" id="history-detail" aria-label="Selected day detail"></article></div>
    </div>
  </section>

  <section class="codex-health-overlay" id="codex-health-overlay" aria-label="Codex health" hidden>
    <div class="health-backdrop" data-close-health></div>
    <div class="health-panel" role="dialog" aria-modal="true" aria-labelledby="health-title">
      <div class="health-header">
        <div>
          <div class="panel-kicker">Private Diagnostics</div>
          <h2 class="health-title" id="health-title">Codex Health</h2>
          <p class="health-subtitle">Schema, exchange history, and GPT field integrity.</p>
        </div>
        <button class="panel-close" id="health-close" type="button" aria-label="Close Codex health">×</button>
      </div>
      <div class="health-grid" id="health-grid"></div>
      <section class="health-section">
        <div class="micro-label">GPT Fields</div>
        <div class="health-status-list" id="health-gpt-fields"></div>
      </section>
      <section class="health-section">
        <div class="micro-label">Import Notes</div>
        <div class="health-note" id="health-import-note">No import recorded yet.</div>
      </section>
      <section class="health-section">
        <div class="micro-label">PWA Readiness</div>
        <div class="pwa-status-grid" id="pwa-status-grid" aria-live="polite"></div>
        <p class="health-note pwa-note">PWA package is active. Static shell caching is handled by sw.js after the first successful GitHub Pages load.</p>
      </section>

      <section class="health-section">
        <div class="micro-label">Diagnostics</div>
        <div class="diagnostic-actions">
          <button class="health-diagnostic-btn" id="health-diagnostic-run" type="button">Run Checks</button>
        </div>
        <div class="diagnostic-list" id="health-diagnostic-list" aria-live="polite">
          <p class="diagnostic-empty">Diagnostics not yet run.</p>
        </div>
      </section>
    </div>
  </section>

  <section class="import-review-overlay" id="import-review-overlay" aria-label="Review Codex import" hidden>
    <div class="import-review-backdrop" data-import-action="cancel"></div>
    <div class="import-review-panel" role="dialog" aria-modal="true" aria-labelledby="import-review-title">
      <div class="import-review-header">
        <div>
          <div class="panel-kicker">GPT Exchange</div>
          <h2 class="import-review-title" id="import-review-title">Review Import</h2>
          <p class="import-review-subtitle">A backup of the current Codex will be downloaded before anything is applied.</p>
        </div>
        <button class="panel-close" type="button" data-import-action="cancel" aria-label="Cancel import">×</button>
      </div>
      <div class="import-review-grid" id="import-review-grid"></div>
      <section class="import-review-section">
        <div class="micro-label">Discrepancies</div>
        <div class="import-issues" id="import-issues"></div>
      </section>
      <section class="import-review-section">
        <div class="micro-label">Action</div>
        <p class="import-review-note">Use merge when the GPT response is incomplete. Use override only when you deliberately want the imported file to become the new authority.</p>
      </section>
      <div class="import-review-actions">
        <button class="composer-action" type="button" data-import-action="cancel">Do Not Apply</button>
        <button class="composer-action" type="button" data-import-action="override">Apply with Override</button>
        <button class="composer-action primary" type="button" data-import-action="merge">Acknowledge & Apply with Merge</button>
      </div>
    </div>
  </section>


  <section class="entry-composer" id="entry-composer" aria-label="Add Codex entry" hidden>
    <div class="composer-backdrop" data-close-composer></div>
    <div class="composer-panel" role="dialog" aria-modal="true" aria-labelledby="composer-title">
      <div class="composer-header">
        <div>
          <div class="panel-kicker">Codex Intake</div>
          <h2 class="composer-title" id="composer-title">Add Entry</h2>
        </div>
        <button class="composer-close" id="composer-close" type="button" aria-label="Close composer">×</button>
      </div>

      <div class="entry-type-grid" id="entry-type-grid" aria-label="Entry type">
        <button class="entry-type-card" type="button" data-composer-zone="head"><strong>Mind</strong><span>Clarity, mindset, emotional discipline, decisions.</span></button>
        <button class="entry-type-card" type="button" data-composer-zone="torso"><strong>Rituals</strong><span>Daily habits, streaks, standards, repeated actions.</span></button>
        <button class="entry-type-card" type="button" data-composer-zone="arms"><strong>Craft</strong><span>Skills, study, practice, technical improvement.</span></button>
        <button class="entry-type-card" type="button" data-composer-zone="legs"><strong>Body</strong><span>Training, recovery, sleep, physical standards.</span></button>
        <button class="entry-type-card random-thought-card" type="button" data-composer-zone="random" aria-label="Random Thoughts, private non-zone material for GPT interpretation"><strong>Random Thoughts</strong><span>Loose thoughts for GPT interpretation, outside the four zones.</span></button>
      </div>

      <div class="micro-label">Subsection</div>
      <div class="subsection-row" id="composer-subsections"></div>

      <div class="composer-fields">
        <label class="composer-field">
          <span>Entry</span>
          <input class="composer-input" id="composer-entry-title" type="text" autocomplete="off" placeholder="Write the entry title…" />
        </label>
        <label class="composer-field">
          <span>Optional Note — stored inside this entry</span>
          <textarea class="composer-note" id="composer-entry-note" placeholder="Optional context…"></textarea>
        </label>
      </div>

      <div class="composer-actions">
        <button class="composer-action" id="composer-cancel" type="button">Cancel</button>
        <button class="composer-action primary" id="composer-save" type="button">Record Entry</button>
      </div>
    </div>
  </section>



  <section class="entry-detail" id="entry-detail" aria-label="Codex entry detail" hidden>
    <div class="detail-backdrop" data-close-detail></div>
    <aside class="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <div class="detail-header">
        <div>
          <div class="panel-kicker">Codex Record</div>
          <h2 class="detail-title" id="detail-title">Entry Detail</h2>
        </div>
        <button class="detail-close" id="detail-close" type="button" aria-label="Close entry detail">×</button>
      </div>

      <div class="detail-context" id="detail-context" aria-label="Entry context"></div>

      <div class="detail-form">
        <label class="detail-field">
          <span>Entry</span>
          <input class="detail-input" id="detail-entry-title" type="text" autocomplete="off" />
        </label>

        <div class="detail-meta-grid">
          <label class="detail-field">
            <span>Type</span>
            <select class="detail-select" id="detail-entry-zone">
              <option value="head">Mind</option>
              <option value="torso">Rituals</option>
              <option value="arms">Craft</option>
              <option value="legs">Body</option>
            </select>
          </label>
          <label class="detail-field">
            <span>Subsection</span>
            <select class="detail-select" id="detail-entry-subsection"></select>
          </label>
          <label class="detail-field detail-date-field">
            <span>Codex Day</span>
            <input class="detail-input" id="detail-entry-date" type="date" />
          </label>
        </div>

        <section class="detail-notes-block">
          <div class="detail-notes-title">Timestamped Notes</div>
          <div id="detail-notes-list"></div>
          <textarea class="detail-new-note" id="detail-new-note" placeholder="Add a new timestamped note inside this entry…"></textarea>
          <div class="detail-note-actions">
            <button class="detail-action" id="detail-add-note" type="button">Add Note</button>
          </div>
        </section>
      </div>

      <div class="detail-actions">
        <button class="detail-action danger" id="detail-delete-entry" type="button">Delete Entry</button>
        <div class="detail-save-state" id="detail-save-state">Saved automatically</div>
        <button class="detail-action" id="detail-done" type="button">Done</button>
      </div>
    </aside>
  </section>

  <button class="floating-add" id="floating-add" type="button" aria-label="Add entry">+</button>
  <button class="floating-quick" id="floating-quick" type="button" aria-label="Open Quick Actions">⚡</button>

  
  <section class="quick-actions-overlay" id="quick-actions-overlay" aria-label="Quick Actions" hidden>
    <div class="quick-actions-backdrop" data-close-quick-actions></div>
    <div class="quick-actions-panel" role="dialog" aria-modal="true" aria-labelledby="quick-actions-title">
      <div class="quick-actions-header">
        <div>
          <div class="panel-kicker">Batch Evidence</div>
          <h2 class="quick-actions-title" id="quick-actions-title">Quick Actions</h2>
          <p class="quick-actions-subtitle">Select the actions you completed today. They will be added as individual Codex entries after confirmation.</p>
        </div>
        <button class="panel-close" id="quick-actions-close" type="button" aria-label="Close Quick Actions">×</button>
      </div>

      <div class="quick-actions-count" id="quick-actions-count">0 selected</div>
      <div class="quick-actions-list" id="quick-actions-list" aria-label="Quick action options"></div>

      <div class="quick-actions-footer">
        <button class="composer-action" id="quick-actions-cancel" type="button">Cancel</button>
        <button class="composer-action primary" id="quick-actions-apply" type="button" disabled>Apply Selected</button>
      </div>
    </div>
  </section>

  <section class="quick-confirm-overlay" id="quick-confirm-overlay" aria-label="Confirm Quick Actions" hidden>
    <div class="quick-confirm-backdrop" data-close-quick-confirm></div>
    <div class="quick-confirm-panel" role="dialog" aria-modal="true" aria-labelledby="quick-confirm-title">
      <div class="quick-confirm-header">
        <div>
          <div class="panel-kicker">Confirm Evidence</div>
          <h2 class="quick-confirm-title" id="quick-confirm-title">Apply Entries?</h2>
        </div>
        <button class="panel-close" id="quick-confirm-close" type="button" aria-label="Close confirmation">×</button>
      </div>
      <p class="quick-confirm-copy">These entries will be recorded separately in today’s Codex.</p>
      <div class="quick-confirm-list" id="quick-confirm-list"></div>
      <div class="quick-confirm-actions">
        <button class="composer-action" id="quick-confirm-cancel" type="button">Cancel</button>
        <button class="composer-action primary" id="quick-confirm-accept" type="button">Accept</button>
      </div>
    </div>
  </section>

  <footer class="hud-footer boot-hidden" aria-label="Codex statistics">
    <div class="stat-chip" data-open-zone="head" role="button" tabindex="0">
      <span class="stat-label">MIND</span>
      <span class="stat-value" id="stat-head" aria-hidden="true"></span>
    </div>
    <div class="stat-chip" data-open-zone="torso" role="button" tabindex="0">
      <span class="stat-label">RITUALS</span>
      <span class="stat-value" id="stat-torso" aria-hidden="true"></span>
    </div>
    <div class="stat-chip" data-open-zone="arms" role="button" tabindex="0">
      <span class="stat-label">CRAFT</span>
      <span class="stat-value" id="stat-arms" aria-hidden="true"></span>
    </div>
    <div class="stat-chip" data-open-zone="legs" role="button" tabindex="0">
      <span class="stat-label">BODY</span>
      <span class="stat-value" id="stat-legs" aria-hidden="true"></span>
    </div>
    <div class="stat-chip history-chip" data-open-history role="button" tabindex="0">
      <span class="stat-label">HISTORY</span>
      <span class="stat-value" id="stat-history">14D</span>
    </div>
  </footer>

  <nav class="mobile-bottom-nav boot-hidden" id="mobile-bottom-nav" aria-label="Mobile Codex navigation">
    <button class="mnav-tab active" type="button" data-mobile-tab="today" aria-current="page">
      <span class="mnav-icon" aria-hidden="true">◌</span>
      <span>Today</span>
    </button>
    <button class="mnav-tab" type="button" data-mobile-tab="head">
      <span class="mnav-icon" aria-hidden="true">◈</span>
      <span>Mind</span>
    </button>
    <button class="mnav-tab" type="button" data-mobile-tab="torso">
      <span class="mnav-icon" aria-hidden="true">◉</span>
      <span>Rituals</span>
    </button>
    <button class="mnav-tab mnav-tab--fab" type="button" data-mobile-action="compose" aria-label="Add entry">
      <span class="mnav-fab-inner">+</span>
    </button>
    <button class="mnav-tab" type="button" data-mobile-tab="arms">
      <span class="mnav-icon" aria-hidden="true">◇</span>
      <span>Craft</span>
    </button>
    <button class="mnav-tab" type="button" data-mobile-tab="legs">
      <span class="mnav-icon" aria-hidden="true">◫</span>
      <span>Body</span>
    </button>
  </nav>

  <script>
    (() => {
      'use strict';

      const STORAGE_KEY = 'personalCodex_v1';
      const DEVICE_ID_KEY = 'personalCodex_device_id';
      const FIREBASE_SDK_VERSION = '10.12.5';
      const FIREBASE_CONFIG = Object.freeze({
        apiKey: 'AIzaSyDy6eYdO6dinq7V6kXy1jvDM2JthtqeBTw',
        authDomain: 'personal-codex-cd9d4.firebaseapp.com',
        databaseURL: 'https://personal-codex-cd9d4-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'personal-codex-cd9d4',
        storageBucket: 'personal-codex-cd9d4.firebasestorage.app',
        messagingSenderId: '448458863563',
        appId: '1:448458863563:web:725b104ee25e0d4a9f3c4e'
      });
      const CLOUD_STATE_PATH_SUFFIX = 'personalCodex/state';
      const RATING_THRESHOLDS = { poorBelow: 50, excellentAt: 80 };
      const DAY_BOUNDARY_HOUR = 2;
      const GPT_PROTOCOL = Object.freeze({
        on_every_json_update: "After perfecting, updating, or returning any version of this Codex JSON, you MUST produce a fresh 'Current Situation' reflection immediately after the JSON. This reflection must not read like a scientific report, productivity dashboard, medical chart, or mechanical habit summary. It must read like a psychologically literate private assessment from an experienced psychologist and personal strategist who has been observing Gianluca over time. Interpret the available evidence through behaviour, emotional tone, discipline, avoidance, fatigue, momentum, self-respect, domestic grounding, and alignment with his longer-term identity. Use the entries as evidence, but do not simply list them. Explain what the current pattern suggests about Gianluca's internal state, what is strengthening, what may be quietly slipping, and what should be watched, strengthened, or corrected going forward. Do not assume that a missing task means failure, avoidance, or negligence; distinguish between absence of evidence and evidence of a problem. Do not diagnose, pathologise, exaggerate, or use clinical labels. Be human, precise, warm, direct, and quietly firm.",
        summary_label: 'CURRENT SITUATION',
        format: 'Plain prose, 180–280 words, no bullet points. Tone: expert psychologist meets private consigliere: direct, humane, observant, elegant, and practical.'
      });

      const ANALYSIS_PRIORITY = Object.freeze({
        instruction: 'When producing the Current Situation reflection, primarily analyse currentDay and recentFocus.recentHistory. Treat recentFocus as the most relevant behavioural evidence because it reflects Gianluca’s present rhythm. Use longTermPatterns and monthlyArchives only to understand continuity. Consult olderDailyArchive, older dailyLog records, or older zone entries only if the recent evidence is ambiguous, if a pattern appears to be recurring, or if Gianluca explicitly asks for historical comparison. Do not search older material by default. Do not treat absence of a task in the recent window as failure unless there is repeated evidence of neglect.',
        primary_focus: ['currentDay', 'recentFocus.recentHistory'],
        recent_window_days: 30,
        older_material_rule: 'Older material is context, not the default basis for judgement. Use it only when it clarifies a present pattern.',
        missing_task_rule: 'Distinguish absence of evidence from evidence of avoidance or failure.'
      });

      const RETENTION_PROTOCOL = Object.freeze({
        active_recent_window_days: 30,
        recommended_full_detail_window_days: 60,
        archive_policy: 'Recent days preserve evidence. Older periods preserve meaning. Keep full detail in the main Codex while the project is young; once the file becomes heavy, compress older periods into monthlyArchives and preserve only identity-forming or historically important records in expanded form.',
        never_delete: ['major life events', 'health-relevant patterns', 'identity commitments', 'marriage/family milestones', 'Moscatelli-relevant discipline patterns', 'major psychological breakthroughs', 'important administrative/legal milestones'],
        compression_rule: 'Preserve meaning, pattern, and consequence. Do not preserve repetitive routine evidence forever unless it proves a broader pattern.'
      });

      const DEFAULT_DATA = {
        schemaVersion: 35,
        _gpt_protocol: GPT_PROTOCOL,
        _analysis_priority: ANALYSIS_PRIORITY,
        _retention_protocol: RETENTION_PROTOCOL,
        version: 35,
        app: 'Personal Codex',
        schemaName: 'personal-codex-dossier',
        metadata: {
          purpose: 'Private progress dashboard and structured personal dossier.',
          dayBoundary: 'A Codex day closes at 02:00 local time, so late-night entries before 02:00 remain assigned to the previous date.',
          ratingSystem: {
            pending: 'Evidence exists but has not yet been judged by GPT.',
            red: 'GPT judges evidence absent, negligible, or structurally weak.',
            amber: 'GPT judges evidence partial, weak, questionable, or insufficiently substantive.',
            green: 'GPT judges evidence meaningful and substantive.',
            unregistered: 'No recorded evidence, random thought, or reflection for that Codex date.'
          },
          exportPreference: 'human-readable structured JSON for future personal GPT analysis',
          entryCreation: 'Global floating composer; category entries are treated as raw daily evidence; Random Thoughts are recorded separately for GPT interpretation and do not contribute directly to zone completion.',
          notesModel: 'Entries contain an array of timestamped notes. The interface remains simple, but the JSON keeps the richer detail.',
          sectionDisplayStatus: 'User entries record raw evidence and counts only. GPT imports control zone colour through dailyLog[YYYY-MM-DD].gptAssessment.zoneDisplayStatus = { head|torso|arms|legs: red|green|amber }. Legacy dailyLog[date].zoneDisplayStatus is still accepted and normalised.',
          currentSituationControl: 'Current Situation, the visible Reflection, and the bulletpoint Summary are persistent top-level GPT-authored dossier fields. They remain visible across Codex-day resets and may be changed only by importing updated Codex JSON.',
          dossierSummaryModel: 'codexSummary.bulletSummary is a GPT-authored bulletpoint synthesis of Current Situation and GPT Reflection, designed for quick reading without replacing the full dossier text.',
          randomThoughtModel: 'Random Thoughts entered through the composer are recorded privately in dailyLog[date].randomThoughts. They do not contribute directly to Mind/Rituals/Craft/Body colour states, but they inform GPT-authored Current Situation, Reflection, Summary, and overall judgement. Health, History, and Import Review expose them as separate counts rather than zone evidence.',
          looseReflectionModel: 'Legacy manual reflections may exist in dailyLog[date].looseReflections and are preserved for backward compatibility, but new reflection-style material should be recorded through Random Thoughts.',
          lastExportedAt: null,
          lastImportedAt: null,
          lastImportMode: null,
          lastImportWarnings: [],
          autoBackupBeforeImportAt: null,
          lastImportedSchemaVersion: null,
          schemaNotes: {
          patch41DataIntegrity: 'Patch 41 preserves currentDay, recentFocus, longTermPatterns, monthlyArchives, and olderDailyArchive through normalize/import/cloud flows, hardens Firebase SDK loading, and makes reconnection status less overconfident.',
          patch36AutomaticFirebaseSync: 'Patch 36 makes Firebase Realtime Database the automatic cloud authority after first sign-in, keeps localStorage as an offline cache, debounces cloud writes, receives live remote updates on open, and reserves manual upload/pull for recovery only.',
          patch33RecentFocus: 'Patch 33 adds recentFocus, currentDay, _analysis_priority, and _retention_protocol so GPT primarily interprets the last 30 days and consults older material only when necessary.',
          patch30GptProtocol: 'Patch 30 adds the root-level _gpt_protocol contract so every exported or imported Codex JSON instructs GPT to return a fresh Current Situation after each update.',
          patch29QuickActions: 'Patch 29 added a lightning Quick Actions batch logger: selectable recurring evidence presets, non-repeatable daily lockout, confirmation before apply, and quickActionId metadata on generated entries.',
          patch28MobileVisualRefinement: 'Patch 28 reduced mobile header density with a Codex action sheet, quieted dashboard-style visual elements, and softened the left assessment panel without changing the GPT authority/data model.',
          patch273VisualShellRecovery: 'Patch 27.3 prevents header, footer, and body silhouette from remaining hidden if the boot sequence is interrupted by runtime errors, CSP behaviour, browser caching, or PWA setup issues.',
          patch272SafeAuthorityHardening: 'Patch 27.2 safely reapplies GPT/data authority hardening from Patch 27 without broad visual replacements: full GPT assessment merge, raw evidence protection in merge, import warnings, safer JSON extraction, CSP, and SVG rendering precision.',
          patch27PwaPreparation: 'Patch 27 added single-file PWA preparation: manifest metadata, install prompt handling, standalone detection, and PWA readiness status. Full offline caching is reserved for the final split/ZIP package with manifest.json and sw.js.',
          patch26Diagnostics: 'Patch 27 added Codex diagnostics for GPT roundtrip safety, including duplicate IDs, malformed dates, missing GPT fields, stale GPT assessment, empty-history risk, and local JSON parse/export checks.',
          patch25MobilePolish: 'Patch 27 refined mobile interaction hierarchy: Random Thoughts separated visually from the four body zones, bottom sheets made more consistent, and mobile primary action/footer spacing improved.',
          patch24Accessibility: 'Patch 27 added modal focus trapping, focus restoration, app chrome inerting behind overlays, better SVG zone semantics, and more deliberate reduced-motion behaviour.',
          patch23Hygiene: 'Patch 27 removed legacy tactical HUD remnants and stale completion-era code while preserving the evidence-recording and GPT-assessment authority model.',
            temporalAuthority: 'For temporal interpretation, prefer entry.codexDate over entry.createdAt because entries may be reassigned to the correct Codex day later.',
            gptOwnedFields: 'codexSummary.currentSituation, codexSummary.reflection, and codexSummary mind/rituals/craft/body summaries are GPT-authored dossier fields. The interface treats them as read-only.',
            privateReflections: 'dailyLog[date].randomThoughts and legacy looseReflections are user-authored private material. They inform GPT analysis but do not directly mark any category complete.',
            mergeSafety: 'Merge imports must preserve local historical records and may not delete local entries simply because they are absent from the imported JSON.'
          }
        },
        createdAt: null,
        updatedAt: null,
        _sync: {
          provider: 'firebase-realtime-database',
          status: 'local',
          uid: null,
          email: null,
          deviceId: null,
          lastWriterDeviceId: null,
          revision: 0,
          updatedAt: null,
          lastSyncedAt: null,
          lastPulledAt: null,
          path: null
        },
        zones: {
          head: { label: 'MIND', subtitle: 'Mindset, mental clarity, and inner discipline.', icon: '◈', mode: 'daily-evidence', addPlaceholder: 'Record mental evidence…', items: [] },
          torso: { label: 'RITUALS', subtitle: 'Daily habits, streak discipline, and recorded consistency.', icon: '◉', mode: 'daily-evidence', addPlaceholder: 'Record a daily ritual…', items: [] },
          arms: { label: 'CRAFT', subtitle: 'Skills, competence, and deliberate capability.', icon: '◇', mode: 'daily-evidence', addPlaceholder: 'Record craft evidence…', items: [] },
          legs: { label: 'BODY', subtitle: 'Physical standards, movement, and future training goals.', icon: '◫', mode: 'daily-evidence', addPlaceholder: 'Record body evidence…', items: [] }
        },
        dailyLog: {},
        currentDay: null,
        recentFocus: { generatedAt: null, windowDays: 30, basis: 'currentDay + last 30 Codex days', recentHistory: [] },
        longTermPatterns: [],
        monthlyArchives: [],
        olderDailyArchive: [],
        gptRefinements: { lastAnalysedAt: null, summary: '', insights: [], questionsForTomorrow: [] },
        codexSummary: { currentSituation: '', reflection: '', bulletSummary: '', mind: '', rituals: '', craft: '', body: '', generatedBy: '', generatedAt: null }
      };

      const zoneMeta = {
        head: { tooltip: 'MINDSET', scoreLabel: 'Today', empty: 'No mental evidence recorded for this Codex day.' },
        torso: { tooltip: 'DAILY RITUALS', scoreLabel: 'Today', empty: 'No ritual evidence recorded for this Codex day.' },
        arms: { tooltip: 'SKILLS', scoreLabel: 'Today', empty: 'No craft evidence recorded for this Codex day.' },
        legs: { tooltip: 'BODY', scoreLabel: 'Today', empty: 'No body evidence recorded for this Codex day.' }
      };

      const ENTRY_CATALOG = {
        head: { label: 'Mind', subsections: ['General', 'Mindset', 'Obstacle', 'Decision'] },
        torso: { label: 'Rituals', subsections: ['General', 'Daily Ritual', 'Discipline', 'Streak', 'Reset'] },
        arms: { label: 'Craft', subsections: ['General', 'Skill', 'Study', 'Practice', 'Project'] },
        legs: { label: 'Body', subsections: ['General', 'Training', 'Recovery', 'Sleep', 'Nutrition'] },
        random: { label: 'Random Thoughts', subsections: [] }
      };


      const QUICK_ACTIONS = [
        { id: 'qa_water_glass', title: 'Drank a glass of water', zone: 'legs', subsection: 'Hydration', repeatable: true },
        { id: 'qa_breakfast', title: 'Had breakfast', zone: 'legs', subsection: 'Nutrition', repeatable: false },
        { id: 'qa_proper_meal', title: 'Had a proper meal', zone: 'legs', subsection: 'Nutrition', repeatable: true },
        { id: 'qa_teeth_am', title: 'Brushed teeth AM', zone: 'torso', subsection: 'Grooming', repeatable: false },
        { id: 'qa_teeth_pm', title: 'Brushed teeth PM', zone: 'torso', subsection: 'Grooming', repeatable: false },
        { id: 'qa_washed_face_am', title: 'Washed face AM', zone: 'torso', subsection: 'Grooming', repeatable: false },
        { id: 'qa_skincare_pm', title: 'Skincare PM', zone: 'torso', subsection: 'Grooming', repeatable: false },
        { id: 'qa_showered', title: 'Showered', zone: 'torso', subsection: 'Grooming', repeatable: false },
        { id: 'qa_dressed_properly', title: 'Dressed properly', zone: 'torso', subsection: 'Presentation', repeatable: false },
        { id: 'qa_cleaned_space', title: 'Cleaned or organised space', zone: 'torso', subsection: 'Environment', repeatable: false },
        { id: 'qa_prepared_environment', title: 'Prepared work environment', zone: 'torso', subsection: 'Environment', repeatable: false },
        { id: 'qa_admin_documents', title: 'Took care of admin/documents', zone: 'arms', subsection: 'Administration', repeatable: false },
        { id: 'qa_read_researched', title: 'Read or researched', zone: 'head', subsection: 'Research', repeatable: true },
        { id: 'qa_financial_study', title: 'Financial study', zone: 'head', subsection: 'Financial Study', repeatable: false },
        { id: 'qa_moscatelli_work', title: 'Worked on Moscatelli', zone: 'arms', subsection: 'Moscatelli', repeatable: true },
        { id: 'qa_coding_app', title: 'Coding / app work', zone: 'arms', subsection: 'Technical', repeatable: true },
        { id: 'qa_design_visual', title: 'Design / visual work', zone: 'arms', subsection: 'Design', repeatable: true },
        { id: 'qa_writing_doctrine', title: 'Writing / doctrine work', zone: 'arms', subsection: 'Writing', repeatable: true },
        { id: 'qa_product_supplier', title: 'Product / supplier research', zone: 'arms', subsection: 'Product Research', repeatable: true },
        { id: 'qa_photography_image', title: 'Photography / image work', zone: 'arms', subsection: 'Photography', repeatable: true },
        { id: 'qa_walked', title: 'Walked', zone: 'legs', subsection: 'Movement', repeatable: true },
        { id: 'qa_trained', title: 'Trained', zone: 'legs', subsection: 'Training', repeatable: false },
        { id: 'qa_mobility', title: 'Stretching / mobility', zone: 'legs', subsection: 'Mobility', repeatable: false },
        { id: 'qa_rested', title: 'Rested intentionally', zone: 'legs', subsection: 'Recovery', repeatable: true },
        { id: 'qa_bed_early', title: 'Went to bed early', zone: 'legs', subsection: 'Sleep', repeatable: false }
      ];

      const deviceId = getOrCreateDeviceId();
      let state = loadData();
      let activeZone = null;
      let activeMobileTab = 'today';
      let selectedTodayQuickZone = 'head';
      let selectedComposerZone = 'head';
      let selectedDetail = null;
      let selectedHistoryDate = null;
      let selectedQuickActionIds = new Set();
      let saveTimer = null;
      let syncSaveTimer = null;
      let pendingCloudSave = false;
      let firebaseModules = null;
      let firebaseLoadPromise = null;
      let firebaseApp = null;
      let firebaseAuth = null;
      let firebaseDb = null;
      let firebaseReady = false;
      let syncUser = null;
      let syncUnsubscribe = null;
      let isApplyingRemoteState = false;
      let lastRemoteRevision = 0;
      let localChangeCounter = 0;
      let cloudUploadInFlight = false;
      let cloudUploadRevision = 0;
      let cloudUploadChangeCounter = 0;
      let authStateResolved = false;

      const $ = (selector, root = document) => root.querySelector(selector);
      const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

      const bodySvg = $('#body-svg');
      const hudLines = $('#hud-lines');
      const tooltip = $('#zone-tooltip');
      const panel = $('#side-panel');
      const panelHandle = $('#panel-handle');
      const panelIcon = $('#panel-icon');
      const panelKicker = $('#panel-kicker');
      const panelTitle = $('#panel-title');
      const panelSubtitle = $('#panel-subtitle');
      const panelClose = $('#panel-close');
      const progressRing = $('#progress-ring');
      const metricLabel = $('#metric-label');
      const metricTitle = $('#metric-title');
      const metricCopy = $('#metric-copy');
      const historyStrip = $('#history-strip');
      const historyOverlay = $('#history-overlay');
      const historyList = $('#history-list');
      const historyDetail = $('#history-detail');
      const historyClose = $('#history-close');
      const healthOverlay = $('#codex-health-overlay');
      const healthClose = $('#health-close');
      const healthGrid = $('#health-grid');
      const healthGptFields = $('#health-gpt-fields');
      const healthImportNote = $('#health-import-note');
      const healthDiagnosticRun = $('#health-diagnostic-run');
      const healthDiagnosticList = $('#health-diagnostic-list');
      const importReviewOverlay = $('#import-review-overlay');
      const importReviewGrid = $('#import-review-grid');
      const importIssues = $('#import-issues');
      const itemList = $('#item-list');
      const floatingAdd = $('#floating-add');
      const floatingQuick = $('#floating-quick');
      const todayView = $('#today-view');
      const todayRingsRow = $('#today-rings-row');
      const todayQuickRow = $('#today-quick-row');
      const todayEntryLog = $('#today-entry-log');
      const todayCurrentSituation = $('#today-current-situation');
      const todayPrimaryAdd = $('#today-primary-add');
      const todayOpenQuick = $('#today-open-quick');
      const todayOpenHistory = $('#today-open-history');
      const todayInlineZones = $('#today-inline-zones');
      const todayQuickInput = $('#today-quick-input');
      const todayQuickSend = $('#today-quick-send');
      const mobileBottomNav = $('#mobile-bottom-nav');
      const btnMobileActions = $('#btn-mobile-actions');
      const mobileActionsOverlay = $('#mobile-actions-overlay');
      const mobileActionsClose = $('#mobile-actions-close');
      const quickActionsOverlay = $('#quick-actions-overlay');
      const quickActionsList = $('#quick-actions-list');
      const quickActionsClose = $('#quick-actions-close');
      const quickActionsCancel = $('#quick-actions-cancel');
      const quickActionsApply = $('#quick-actions-apply');
      const quickActionsCount = $('#quick-actions-count');
      const quickConfirmOverlay = $('#quick-confirm-overlay');
      const quickConfirmClose = $('#quick-confirm-close');
      const quickConfirmCancel = $('#quick-confirm-cancel');
      const quickConfirmAccept = $('#quick-confirm-accept');
      const quickConfirmList = $('#quick-confirm-list');
      const entryComposer = $('#entry-composer');
      const composerClose = $('#composer-close');
      const composerCancel = $('#composer-cancel');
      const composerSave = $('#composer-save');
      const composerTitleInput = $('#composer-entry-title');
      const composerNoteInput = $('#composer-entry-note');
      const composerSubsections = $('#composer-subsections');
      const homePanel = $('#home-panel');
      const currentSituationReadout = $('#current-situation-readout');
      const gptReflectionReadout = $('#gpt-reflection-readout');
      const dossierSummaryToggle = $('#dossier-summary-toggle');
      const dossierSummaryPanel = $('#dossier-summary-panel');
      const dossierSummaryReadout = $('#dossier-summary-readout');
      const detailOverlay = $('#entry-detail');
      const detailClose = $('#detail-close');
      const detailDone = $('#detail-done');
      const detailDelete = $('#detail-delete-entry');
      const detailContext = $('#detail-context');
      const detailSaveState = $('#detail-save-state');
      const detailTitleInput = $('#detail-entry-title');
      const detailZoneSelect = $('#detail-entry-zone');
      const detailSubsectionSelect = $('#detail-entry-subsection');
      const detailDateInput = $('#detail-entry-date');
      const detailNotesList = $('#detail-notes-list');
      const detailNewNote = $('#detail-new-note');
      const detailAddNote = $('#detail-add-note');
      const zoneSummaryFields = {
        mind: $('#summary-mind'),
        rituals: $('#summary-rituals'),
        craft: $('#summary-craft'),
        body: $('#summary-body')
      };
      const btnSync = $('#btn-sync');
      const syncOverlay = $('#sync-overlay');
      const syncEmailInput = $('#sync-email');
      const syncPasswordInput = $('#sync-password');
      const syncStatusCard = $('#sync-status-card');
      const syncStatusLabel = $('#sync-status-label');
      const syncStatusNote = $('#sync-status-note');
      const syncDot = $('#sync-dot');

      const modalStack = [];
      const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(',');

      function isVisibleElement(element) {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        return style.visibility !== 'hidden' && style.display !== 'none' && element.offsetParent !== null;
      }

      function focusableElements(root) {
        return $$(focusableSelector, root).filter(el => isVisibleElement(el) && !el.closest('[hidden]'));
      }

      function setAppChromeInert(isInert) {
        [$('.hud-header'), $('.hud-footer'), mobileBottomNav, $('.stage'), floatingAdd, floatingQuick].filter(Boolean).forEach(el => {
          if (isInert) {
            el.inert = true;
            el.setAttribute('aria-hidden', 'true');
          } else {
            el.inert = false;
            el.removeAttribute('aria-hidden');
          }
        });
      }

      function topModal() {
        return modalStack.length ? modalStack[modalStack.length - 1] : null;
      }

      function openModalLayer(overlay, panelSelector, preferredFocus = null) {
        if (!overlay) return;
        const panelElement = panelSelector ? $(panelSelector, overlay) : overlay;
        if (!panelElement) return;
        if (!panelElement.hasAttribute('tabindex')) panelElement.setAttribute('tabindex', '-1');
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        modalStack.push({ overlay, panel: panelElement, previousFocus });
        overlay.dataset.modalOpen = 'true';
        setAppChromeInert(true);
        requestAnimationFrame(() => {
          const target = preferredFocus && isVisibleElement(preferredFocus)
            ? preferredFocus
            : (focusableElements(panelElement)[0] || panelElement);
          target?.focus?.({ preventScroll: true });
        });
      }

      function closeModalLayer(overlay) {
        if (!overlay) return;
        const index = modalStack.findLastIndex(record => record.overlay === overlay);
        const record = index >= 0 ? modalStack.splice(index, 1)[0] : null;
        overlay.dataset.modalOpen = 'false';
        if (!modalStack.length) setAppChromeInert(false);
        const restore = record?.previousFocus;
        if (restore && document.contains(restore) && isVisibleElement(restore) && !restore.closest('[hidden]')) {
          requestAnimationFrame(() => restore.focus({ preventScroll: true }));
        }
      }

      function trapModalFocus(event) {
        const active = topModal();
        if (!active || active.overlay.hidden) return false;
        const focusables = focusableElements(active.panel);
        if (!focusables.length) {
          event.preventDefault();
          active.panel.focus({ preventScroll: true });
          return true;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus({ preventScroll: true });
          return true;
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
          return true;
        }
        if (!active.panel.contains(document.activeElement)) {
          event.preventDefault();
          first.focus({ preventScroll: true });
          return true;
        }
        return false;
      }

      function clone(value) { return JSON.parse(JSON.stringify(value)); }

      function enforceGptProtocol(target) {
        if (target && typeof target === 'object' && !Array.isArray(target)) {
          target._gpt_protocol = clone(GPT_PROTOCOL);
        }
        return target;
      }

      function hasExactGptProtocol(payload) {
        try { return JSON.stringify(payload?._gpt_protocol || null) === JSON.stringify(GPT_PROTOCOL); }
        catch { return false; }
      }

      function getOrCreateDeviceId() {
        try {
          const existing = localStorage.getItem(DEVICE_ID_KEY);
          if (existing) return existing;
          const created = (window.crypto?.randomUUID?.() || uid());
          localStorage.setItem(DEVICE_ID_KEY, created);
          return created;
        } catch {
          return `device_${uid()}`;
        }
      }

      function normalizeSync(input = {}) {
        const source = input && typeof input === 'object' ? input : {};
        return {
          provider: 'firebase-realtime-database',
          status: typeof source.status === 'string' ? source.status : 'local',
          uid: source.uid || null,
          email: source.email || null,
          deviceId: source.deviceId || deviceId || null,
          lastWriterDeviceId: source.lastWriterDeviceId || null,
          revision: Number.isFinite(Number(source.revision)) ? Number(source.revision) : 0,
          updatedAt: source.updatedAt || null,
          lastSyncedAt: source.lastSyncedAt || null,
          lastPulledAt: source.lastPulledAt || null,
          path: source.path || null
        };
      }


      function dateKeyFromDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      }

      function codexDateFromDate(date = new Date()) {
        const shifted = new Date(date.getTime());
        shifted.setHours(shifted.getHours() - DAY_BOUNDARY_HOUR);
        return dateKeyFromDate(shifted);
      }

      function todayKey(offset = 0) {
        const d = new Date();
        d.setHours(d.getHours() - DAY_BOUNDARY_HOUR);
        d.setDate(d.getDate() + offset);
        return dateKeyFromDate(d);
      }

      function dateFromKey(dateKey) {
        const [y, m, d] = String(dateKey).split('-').map(Number);
        return new Date(y, m - 1, d, 12, 0, 0);
      }

      function addDaysToKey(dateKey, amount) {
        const d = dateFromKey(dateKey);
        d.setDate(d.getDate() + amount);
        return dateKeyFromDate(d);
      }

      function compareDateKeys(a, b) { return String(a).localeCompare(String(b)); }

      function dayLabel(dateKey) {
        return dateFromKey(dateKey).toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 3).toUpperCase();
      }

      function uid() { return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`; }

      function isoToCodexDate(iso) {
        const d = iso ? new Date(iso) : new Date();
        return Number.isNaN(d.getTime()) ? todayKey() : codexDateFromDate(d);
      }

      function noteObject(text, timestamp = new Date().toISOString()) {
        return { id: uid(), text: String(text || '').trim(), createdAt: timestamp, updatedAt: timestamp, source: 'manual' };
      }

      function loadData() {
        const base = clone(DEFAULT_DATA);
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) {
            base.createdAt = new Date().toISOString();
            base.updatedAt = base.createdAt;
            return enforceGptProtocol(base);
          }
          return normalizeData(JSON.parse(raw));
        } catch (err) {
          console.warn('Personal Codex: failed to load local data.', err);
          base.createdAt = new Date().toISOString();
          base.updatedAt = base.createdAt;
          return enforceGptProtocol(base);
        }
      }

      function normalizeData(input = {}) {
        const base = clone(DEFAULT_DATA);
        const now = new Date().toISOString();
        base.schemaVersion = DEFAULT_DATA.schemaVersion;
        base._gpt_protocol = clone(GPT_PROTOCOL);
        base._analysis_priority = clone(input._analysis_priority || ANALYSIS_PRIORITY);
        base._retention_protocol = clone(input._retention_protocol || RETENTION_PROTOCOL);
        base.version = DEFAULT_DATA.version;
        base.createdAt = input.createdAt || now;
        base.updatedAt = input.updatedAt || now;
        base._sync = normalizeSync(input._sync || input.sync || {});
        base.schemaName = input.schemaName || base.schemaName;
        base.metadata = input.metadata && typeof input.metadata === 'object' ? { ...base.metadata, ...DEFAULT_DATA.metadata, ...input.metadata } : base.metadata;
        base.codexSummary = normalizeCodexSummary(input.codexSummary || input.summary || {});
        base.gptRefinements = normalizeGptRefinements(input.gptRefinements || input.aiRefinements || {});
        base.dailyLog = typeof input.dailyLog === 'object' && input.dailyLog ? normalizeDailyLog(input.dailyLog) : {};
        preserveRecentFocusFields(base, input);

        const sourceZones = input.zones || { head: input.head, torso: input.torso, arms: input.arms, legs: input.legs };
        Object.keys(base.zones).forEach(zone => {
          const incoming = sourceZones?.[zone];
          if (!incoming) return;
          base.zones[zone] = { ...base.zones[zone], ...pickZoneSafe(incoming) };
          if (Array.isArray(incoming.items)) {
            base.zones[zone].items = incoming.items.map(item => normalizeItem(item, zone));
          }
        });
        return base;
      }

      function cloneOrFallback(value, fallback) {
        if (value === undefined) return clone(fallback);
        try { return JSON.parse(JSON.stringify(value)); }
        catch { return clone(fallback); }
      }

      function normalizeRecentFocus(input) {
        const base = clone(DEFAULT_DATA.recentFocus);
        if (!input || typeof input !== 'object' || Array.isArray(input)) return base;
        const raw = cloneOrFallback(input, {});
        return {
          ...base,
          ...raw,
          generatedAt: raw.generatedAt || null,
          windowDays: Number.isFinite(Number(raw.windowDays)) && Number(raw.windowDays) > 0 ? Number(raw.windowDays) : base.windowDays,
          basis: typeof raw.basis === 'string' && raw.basis.trim() ? raw.basis : base.basis,
          recentHistory: Array.isArray(raw.recentHistory) ? raw.recentHistory : []
        };
      }

      function preserveRecentFocusFields(base, input = {}) {
        base.currentDay = Object.prototype.hasOwnProperty.call(input, 'currentDay') ? cloneOrFallback(input.currentDay, null) : clone(DEFAULT_DATA.currentDay);
        base.recentFocus = normalizeRecentFocus(input.recentFocus);
        base.longTermPatterns = Array.isArray(input.longTermPatterns) ? cloneOrFallback(input.longTermPatterns, []) : clone(DEFAULT_DATA.longTermPatterns);
        base.monthlyArchives = Array.isArray(input.monthlyArchives) ? cloneOrFallback(input.monthlyArchives, []) : clone(DEFAULT_DATA.monthlyArchives);
        base.olderDailyArchive = Array.isArray(input.olderDailyArchive) ? cloneOrFallback(input.olderDailyArchive, []) : clone(DEFAULT_DATA.olderDailyArchive);
      }

      function pickZoneSafe(zone) {
        return {
          label: typeof zone.label === 'string' ? zone.label : undefined,
          subtitle: typeof zone.subtitle === 'string' ? zone.subtitle : undefined,
          icon: typeof zone.icon === 'string' ? zone.icon : undefined,
          mode: 'daily-evidence'
        };
      }

      function normalizeCodexSummary(input) {
        const base = clone(DEFAULT_DATA.codexSummary);
        if (!input || typeof input !== 'object') return base;
        return {
          currentSituation: typeof input.currentSituation === 'string' ? input.currentSituation : (typeof input.text === 'string' ? input.text : ''),
          reflection: typeof input.reflection === 'string' ? input.reflection : (typeof input.currentReflection === 'string' ? input.currentReflection : ''),
          bulletSummary: typeof input.bulletSummary === 'string' ? input.bulletSummary : (typeof input.summary === 'string' ? input.summary : (typeof input.dossierSummary === 'string' ? input.dossierSummary : '')),
          mind: typeof input.mind === 'string' ? input.mind : '',
          rituals: typeof input.rituals === 'string' ? input.rituals : '',
          craft: typeof input.craft === 'string' ? input.craft : '',
          body: typeof input.body === 'string' ? input.body : '',
          generatedBy: typeof input.generatedBy === 'string' ? input.generatedBy : '',
          generatedAt: input.generatedAt || null
        };
      }

      function normalizeGptRefinements(input) {
        const base = clone(DEFAULT_DATA.gptRefinements);
        if (!input || typeof input !== 'object') return base;
        return {
          lastAnalysedAt: input.lastAnalysedAt || input.generatedAt || null,
          summary: typeof input.summary === 'string' ? input.summary : '',
          insights: Array.isArray(input.insights) ? input.insights : [],
          questionsForTomorrow: Array.isArray(input.questionsForTomorrow) ? input.questionsForTomorrow : []
        };
      }

      function normalizeZoneDisplayStatus(input) {
        const output = {};
        if (!input || typeof input !== 'object') return output;
        ['head', 'torso', 'arms', 'legs'].forEach(zone => {
          const value = String(input[zone] || '').trim().toLowerCase();
          if (['green', 'done', 'complete', 'completed'].includes(value)) output[zone] = 'green';
          else if (['amber', 'partial', 'warning', 'insufficient', 'review'].includes(value)) output[zone] = 'amber';
          else if (['red', 'missing', 'not-done', 'not_done', 'empty'].includes(value)) output[zone] = 'red';
        });
        return output;
      }


      function normalizeAssessmentState(value) {
        const v = String(value || '').trim().toLowerCase();
        if (['green', 'done', 'complete', 'completed', 'strong', 'excellent'].includes(v)) return 'green';
        if (['amber', 'partial', 'warning', 'insufficient', 'review', 'weak'].includes(v)) return 'amber';
        if (['red', 'missing', 'not-done', 'not_done', 'empty', 'poor', 'absent'].includes(v)) return 'red';
        if (['pending', 'unassessed', 'awaiting', 'neutral'].includes(v)) return 'pending';
        return '';
      }

      function assessmentLabel(stateValue) {
        if (stateValue === 'green') return 'GREEN';
        if (stateValue === 'amber') return 'AMBER';
        if (stateValue === 'red') return 'RED';
        if (stateValue === 'pending') return 'PENDING';
        return 'PENDING';
      }

      function assessmentRingPct(stateValue) {
        if (stateValue === 'green') return 100;
        if (stateValue === 'amber') return 50;
        if (stateValue === 'red') return 0;
        return 0;
      }

      function normalizeGptAssessment(input) {
        const source = input && typeof input === 'object' ? input : {};
        const reasonsSource = source.reasons && typeof source.reasons === 'object' ? source.reasons : {};
        const reasons = {};
        ['head', 'torso', 'arms', 'legs'].forEach(zone => {
          if (typeof reasonsSource[zone] === 'string') reasons[zone] = reasonsSource[zone];
        });
        const overallState = normalizeAssessmentState(source.overallState || source.overall || source.rating || source.status);
        return {
          generatedAt: source.generatedAt || source.lastAnalysedAt || null,
          generatedBy: typeof source.generatedBy === 'string' ? source.generatedBy : '',
          overallState,
          overallLabel: typeof source.overallLabel === 'string' ? source.overallLabel : (overallState ? assessmentLabel(overallState) : ''),
          overallReason: typeof source.overallReason === 'string' ? source.overallReason : (typeof source.reason === 'string' ? source.reason : ''),
          zoneDisplayStatus: normalizeZoneDisplayStatus(source.zoneDisplayStatus || source.sectionDisplayStatus || {}),
          reasons
        };
      }

      function normalizeDailyLog(input) {
        const output = {};
        Object.entries(input || {}).forEach(([key, entry]) => {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || !entry || typeof entry !== 'object') return;
          const legacyZoneStatus = entry.zoneDisplayStatus || entry.sectionDisplayStatus || {};
          const assessment = normalizeGptAssessment(entry.gptAssessment || { zoneDisplayStatus: legacyZoneStatus, reasons: entry.zoneDisplayReasons || {} });
          if (entry.status === 'UNREGISTERED') {
            output[key] = makeUnregisteredDay(key, entry.createdAt || entry.updatedAt || null);
            output[key].gptAssessment = assessment;
            return;
          }
          output[key] = {
            date: key,
            status: entry.status || 'REGISTERED',
            zones: entry.zones && typeof entry.zones === 'object' ? entry.zones : null,
            overallPct: typeof entry.overallPct === 'number' ? entry.overallPct : null,
            rating: entry.rating || ratingFromScore(typeof entry.overallPct === 'number' ? entry.overallPct : null),
            gptReflection: typeof entry.gptReflection === 'string' ? entry.gptReflection : '',
            dailyReflection: typeof entry.dailyReflection === 'string' ? entry.dailyReflection : (typeof entry.manualSummary === 'string' ? entry.manualSummary : ''),
            manualSummary: typeof entry.manualSummary === 'string' ? entry.manualSummary : '',
            looseReflections: normalizeLooseReflections(entry.looseReflections || entry.reflections || []),
            randomThoughts: normalizeRandomThoughts(entry.randomThoughts || entry.randomThoughtsLog || []),
            gptAssessment: assessment,
            updatedAt: entry.updatedAt || null
          };
        });
        return output;
      }

      function makeUnregisteredDay(dateKey, timestamp = null) {
        return { date: dateKey, status: 'UNREGISTERED', zones: null, overallPct: null, rating: 'UNREGISTERED', gptReflection: '', dailyReflection: '', manualSummary: '', looseReflections: [], randomThoughts: [], gptAssessment: normalizeGptAssessment({}), updatedAt: timestamp || new Date().toISOString() };
      }

      function normalizeLooseReflections(input) {
        if (!Array.isArray(input)) return [];
        return input
          .filter(item => item && typeof item === 'object')
          .map(item => ({
            id: item.id || uid(),
            title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Loose reflection',
            text: typeof item.text === 'string' ? item.text : (typeof item.note === 'string' ? item.note : ''),
            codexDate: item.codexDate || item.date || todayKey(),
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
            source: item.source || 'manual-composer',
            visibility: 'hidden-ui',
            gpt: item.gpt && typeof item.gpt === 'object' ? item.gpt : {}
          }));
      }

      function looseReflectionsForDate(dateKey = todayKey()) {
        return normalizeLooseReflections(state.dailyLog?.[dateKey]?.looseReflections || []).filter(item => item.codexDate === dateKey);
      }

      function looseReflectionCount(dateKey = todayKey()) {
        return looseReflectionsForDate(dateKey).length;
      }

      function normalizeRandomThoughts(input) {
        if (!Array.isArray(input)) return [];
        return input
          .filter(item => item && typeof item === 'object')
          .map(item => ({
            id: item.id || uid(),
            title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Random thought',
            text: typeof item.text === 'string' ? item.text : (typeof item.note === 'string' ? item.note : ''),
            codexDate: item.codexDate || item.date || todayKey(),
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
            source: item.source || 'random-thought-composer',
            visibility: 'hidden-ui',
            contributesToZone: false,
            gpt: item.gpt && typeof item.gpt === 'object' ? item.gpt : {}
          }));
      }

      function randomThoughtsForDate(dateKey = todayKey()) {
        return normalizeRandomThoughts(state.dailyLog?.[dateKey]?.randomThoughts || []).filter(item => item.codexDate === dateKey);
      }

      function randomThoughtCount(dateKey = todayKey()) {
        return randomThoughtsForDate(dateKey).length;
      }

      function normalizeNotes(item) {
        if (Array.isArray(item.notes)) {
          return item.notes
            .filter(note => note && typeof note === 'object' && typeof note.text === 'string')
            .map(note => ({ id: note.id || uid(), text: note.text, createdAt: note.createdAt || item.createdAt || new Date().toISOString(), updatedAt: note.updatedAt || note.createdAt || item.updatedAt || new Date().toISOString(), source: note.source || 'manual' }));
        }
        if (typeof item.note === 'string' && item.note.trim()) return [noteObject(item.note, item.createdAt || new Date().toISOString())];
        return [];
      }

      function normalizeItemGptFields(input) {
        const source = input && typeof input === 'object' ? input : {};
        return {
          durationMinutes: typeof source.durationMinutes === 'number' ? source.durationMinutes : null,
          energyCost: typeof source.energyCost === 'number' ? source.energyCost : null,
          confidence: typeof source.confidence === 'number' ? source.confidence : null,
          tags: Array.isArray(source.tags) ? source.tags : [],
          linkedEntryIds: Array.isArray(source.linkedEntryIds) ? source.linkedEntryIds : [],
          refinedTitle: typeof source.refinedTitle === 'string' ? source.refinedTitle : null,
          refinedNotes: Array.isArray(source.refinedNotes) ? source.refinedNotes : [],
          insights: Array.isArray(source.insights) ? source.insights : []
        };
      }

      function normalizeItem(item = {}, zone) {
        const createdAt = item.createdAt || new Date().toISOString();
        const codexDate = item.codexDate || item.date || isoToCodexDate(createdAt);
        return {
          id: item.id || uid(),
          title: item.title || item.text || 'Untitled record',
          entryType: typeof item.entryType === 'string' && item.entryType ? item.entryType : (ENTRY_CATALOG[zone]?.label || zone),
          zone,
          subsection: typeof item.subsection === 'string' ? item.subsection : (typeof item.subSection === 'string' ? item.subSection : (typeof item.category === 'string' ? item.category : 'General')),
          codexDate,
          createdVia: typeof item.createdVia === 'string' ? item.createdVia : 'legacy',
          createdAt,
          updatedAt: item.updatedAt || createdAt,
          notes: normalizeNotes(item),
          gpt: normalizeItemGptFields(item.gpt || item.ai || {}),
          legacy: item.history ? { formerHabitHistory: item.history } : undefined
        };
      }

      function saveData(options = {}) {
        const { markDirty = true, queueCloud = true } = options || {};
        try {
          enforceGptProtocol(state);
          state.updatedAt = new Date().toISOString();
          if (markDirty && !isApplyingRemoteState) {
            localChangeCounter += 1;
            state._sync = {
              ...normalizeSync(state._sync || {}),
              status: 'pending',
              deviceId,
              lastWriterDeviceId: deviceId,
              updatedAt: state.updatedAt,
              path: syncUser ? cloudPathForUser(syncUser) : (state._sync?.path || null)
            };
            pendingCloudSave = true;
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          $('#json-status').textContent = 'AUTO';
          if (queueCloud) queueCloudSave();
        } catch (err) {
          console.warn('Personal Codex: failed to save local data.', err);
          $('#json-status').textContent = 'FAIL';
          showToast('LOCAL SAVE FAILED');
        }
      }

      function debouncedSave(render = true) {
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => {
          updateTodayLog();
          saveData();
          if (render) renderAllStats(false);
        }, 260);
      }

      function cloudPathForUser(user = syncUser) {
        return user?.uid ? `users/${user.uid}/${CLOUD_STATE_PATH_SUFFIX}` : '';
      }

      function renderSyncStatus(label = 'LOCAL', note = '') {
        const clean = String(label || 'LOCAL').toUpperCase();
        const stateClasses = ['sync-state-synced', 'sync-state-live', 'sync-state-syncing', 'sync-state-error', 'sync-state-offline', 'sync-state-conflict'];
        if (btnSync) {
          btnSync.textContent = `SYNC: ${clean}`;
          btnSync.classList.remove(...stateClasses);
          if (clean === 'SYNCED' || clean === 'LIVE') btnSync.classList.add('sync-state-synced');
          if (clean === 'SYNCING') btnSync.classList.add('sync-state-syncing');
          if (clean === 'ERROR') btnSync.classList.add('sync-state-error');
          if (clean === 'OFFLINE') btnSync.classList.add('sync-state-offline');
          if (clean === 'CONFLICT') btnSync.classList.add('sync-state-conflict');
        }
        if (syncDot) {
          syncDot.classList.remove(...stateClasses);
          if (clean === 'SYNCED' || clean === 'LIVE') syncDot.classList.add('sync-state-synced');
          if (clean === 'SYNCING') syncDot.classList.add('sync-state-syncing');
          if (clean === 'ERROR') syncDot.classList.add('sync-state-error');
          if (clean === 'OFFLINE') syncDot.classList.add('sync-state-offline');
          if (clean === 'CONFLICT') syncDot.classList.add('sync-state-conflict');
          const resolvedNote = note || defaultSyncNote(clean);
          syncDot.title = `Sync: ${clean}. ${resolvedNote}`;
          syncDot.setAttribute('aria-label', `Sync status: ${clean}`);
        }
        if (syncStatusLabel) syncStatusLabel.textContent = clean;
        if (syncStatusNote) syncStatusNote.textContent = note || defaultSyncNote(clean);
      }

      function defaultSyncNote(label) {
        if (label === 'SYNCED') return syncUser?.email ? `Connected as ${syncUser.email}. Cloud and local copies are aligned automatically.` : 'Cloud and local copies are aligned automatically.';
        if (label === 'SYNCING') return 'Contacting Firebase and reconciling local cache with cloud authority.';
        if (label === 'OFFLINE') return 'Offline. The Codex remains usable locally and will save pending changes when the connection returns.';
        if (label === 'CONFLICT') return 'Two devices appear to have changed the Codex before syncing. Use recovery controls before overwriting either copy.';
        if (label === 'ERROR') return 'Sync encountered an error. Local storage remains active.';
        return 'Local storage is active. Sign in once on this device to enable automatic sync.';
      }


      function withTimeout(promise, timeoutMs, message) {
        let timer = null;
        const timeout = new Promise((_, reject) => {
          timer = window.setTimeout(() => reject(new Error(message || 'Operation timed out.')), timeoutMs);
        });
        return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timer));
      }

      async function loadFirebaseSdk() {
        if (firebaseReady && firebaseModules) return firebaseModules;
        if (firebaseLoadPromise) return firebaseLoadPromise;
        firebaseLoadPromise = (async () => {
          const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
          const [appMod, authMod, dbMod] = await Promise.all([
            import(`${base}/firebase-app.js`),
            import(`${base}/firebase-auth.js`),
            import(`${base}/firebase-database.js`)
          ]);
          firebaseApp = appMod.getApps?.().length ? appMod.getApp() : appMod.initializeApp(FIREBASE_CONFIG);
          firebaseAuth = authMod.getAuth(firebaseApp);
          try { await authMod.setPersistence(firebaseAuth, authMod.browserLocalPersistence); }
          catch (error) { console.warn('Personal Codex: could not set Firebase auth persistence.', error); }
          firebaseDb = dbMod.getDatabase(firebaseApp);
          firebaseModules = { appMod, authMod, dbMod };
          firebaseReady = true;
          return firebaseModules;
        })();
        try { return await firebaseLoadPromise; }
        catch (error) { firebaseLoadPromise = null; throw error; }
      }

      async function setupFirebaseSync() {
        renderSyncStatus(navigator.onLine ? 'SYNCING' : 'OFFLINE', navigator.onLine ? 'Preparing automatic Firebase sync…' : 'Offline. Local cache is available; cloud sync will resume when connected.');
        try {
          const modules = await loadFirebaseSdk();
          authStateResolved = false;
          const authWatchdog = window.setTimeout(() => {
            if (!authStateResolved) {
              renderSyncStatus('ERROR', 'Firebase sign-in did not respond. Refresh once; local mode remains available.');
            }
          }, 18000);
          modules.authMod.onAuthStateChanged(firebaseAuth, user => {
            authStateResolved = true;
            window.clearTimeout(authWatchdog);
            handleAuthStateChanged(user).catch(error => {
              console.warn('Personal Codex: Firebase auth state failed.', error);
              renderSyncStatus('ERROR', error?.message || 'Could not initialise Firebase sync.');
            });
          });
        } catch (error) {
          console.warn('Personal Codex: Firebase SDK unavailable.', error);
          renderSyncStatus(navigator.onLine ? 'ERROR' : 'OFFLINE', navigator.onLine ? 'Firebase SDK could not be loaded. Local mode remains active.' : 'Offline. Local mode remains active.');
        }
      }

      async function handleAuthStateChanged(user) {
        syncUser = user || null;
        if (!syncUser) {
          detachCloudListener();
          renderSyncStatus('LOCAL', 'Signed out. Local storage is active.');
          return;
        }
        renderSyncStatus('SYNCING', `Connected as ${syncUser.email || 'Firebase user'}. Reconciling cloud state…`);
        await startCloudSession(syncUser);
        if (hasPendingLocalChanges()) {
          window.setTimeout(() => {
            if (syncUser && hasPendingLocalChanges()) queueCloudSave();
          }, 1400);
        }
      }

      function detachCloudListener() {
        if (typeof syncUnsubscribe === 'function') {
          try { syncUnsubscribe(); } catch {}
        }
        syncUnsubscribe = null;
      }

      async function startCloudSession(user) {
        if (!firebaseReady || !firebaseDb || !firebaseModules) await loadFirebaseSdk();
        attachCloudListener(user);
      }

      function attachCloudListener(user) {
        detachCloudListener();
        const path = cloudPathForUser(user);
        const stateRef = firebaseModules.dbMod.ref(firebaseDb, path);
        let receivedInitialSnapshot = false;
        const firstSnapshotWatchdog = window.setTimeout(() => {
          if (!receivedInitialSnapshot) {
            renderSyncStatus('ERROR', 'Firebase connected, but the cloud listener has not answered yet. Local cache remains available.');
          }
        }, 18000);
        syncUnsubscribe = firebaseModules.dbMod.onValue(stateRef, snapshot => {
          const isInitialSnapshot = !receivedInitialSnapshot;
          receivedInitialSnapshot = true;
          window.clearTimeout(firstSnapshotWatchdog);

          if (!snapshot.exists()) {
            if (hasMeaningfulLocalData()) {
              forceUploadLocal('Initial cloud Codex created automatically from this device.').catch(error => {
                console.warn('Personal Codex: initial cloud upload failed.', error);
                renderSyncStatus('ERROR', error?.message || 'Initial cloud upload failed.');
              });
            } else {
              renderSyncStatus('SYNCED', 'Signed in. Cloud is empty and ready for the first Codex entry.');
            }
            return;
          }

          const incomingRaw = snapshot.val();
          const incoming = normalizeData(incomingRaw || {});
          incoming._sync = normalizeSync(incomingRaw?._sync || {});
          reconcileCloudSnapshot(incoming, isInitialSnapshot);
        }, error => {
          window.clearTimeout(firstSnapshotWatchdog);
          console.warn('Personal Codex: cloud listener failed.', error);
          renderSyncStatus('ERROR', error?.message || 'Realtime listener failed.');
        });
      }

      function hasPendingLocalChanges() {
        return pendingCloudSave || state?._sync?.status === 'pending';
      }

      function cloudRevisions(candidate = state) {
        return {
          remote: Number(candidate?._sync?.revision || 0),
          local: Number(state?._sync?.revision || 0),
          remoteTime: Date.parse(candidate?._sync?.updatedAt || candidate?.updatedAt || '') || 0,
          localTime: Date.parse(state?._sync?.updatedAt || state?.updatedAt || '') || 0
        };
      }

      function reconcileCloudSnapshot(incoming, isInitialSnapshot = false) {
        const incomingRevision = Number(incoming._sync?.revision || 0);
        const localRevision = Number(state._sync?.revision || 0);
        const incomingFromThisDevice = incoming._sync?.lastWriterDeviceId === deviceId;
        const isOwnUploadAck = incomingFromThisDevice && cloudUploadInFlight && cloudUploadRevision > 0 && incomingRevision >= cloudUploadRevision;

        if (isOwnUploadAck) {
          lastRemoteRevision = Math.max(lastRemoteRevision, incomingRevision);
          cloudUploadInFlight = false;
          cloudUploadRevision = 0;
          const uploadCoveredAllLocalChanges = cloudUploadChangeCounter === localChangeCounter;
          if (uploadCoveredAllLocalChanges) {
            pendingCloudSave = false;
            window.clearTimeout(syncSaveTimer);
            state._sync = {
              ...normalizeSync(state._sync || {}),
              ...normalizeSync(incoming._sync || {}),
              status: 'synced',
              deviceId,
              path: cloudPathForUser(syncUser)
            };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
            renderSyncStatus('SYNCED', 'Cloud save acknowledged from this device.');
          } else {
            pendingCloudSave = true;
            state._sync = {
              ...normalizeSync(state._sync || {}),
              status: 'pending',
              deviceId,
              lastWriterDeviceId: deviceId,
              updatedAt: new Date().toISOString(),
              path: cloudPathForUser(syncUser)
            };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
            renderSyncStatus('SYNCING', 'Previous cloud save acknowledged. Saving newer local changes…');
            queueCloudSave();
          }
          return;
        }

        if (incomingFromThisDevice && incomingRevision >= localRevision && !hasPendingLocalChanges()) {
          lastRemoteRevision = Math.max(lastRemoteRevision, incomingRevision);
          renderSyncStatus('SYNCED');
          return;
        }

        if (hasPendingLocalChanges()) {
          if (cloudUploadInFlight) {
            renderSyncStatus('SYNCING', 'Cloud save already in progress…');
            return;
          }
          if (incomingRevision <= localRevision || incomingFromThisDevice) {
            forceUploadLocal('Pending local changes saved to cloud.').catch(error => {
              console.warn('Personal Codex: pending cloud upload failed.', error);
              renderSyncStatus(navigator.onLine ? 'ERROR' : 'OFFLINE', navigator.onLine ? (error?.message || 'Pending cloud save failed.') : 'Offline. Pending changes remain local.');
            });
            return;
          }
          renderSyncStatus('CONFLICT', 'Cloud changed while this device also has unsaved local changes. Use recovery controls before overwriting either copy.');
          showToast('SYNC CONFLICT');
          return;
        }

        if (isInitialSnapshot || shouldPreferRemote(incoming)) {
          applyRemoteState(incoming, isInitialSnapshot ? 'Latest cloud Codex loaded automatically.' : 'Cloud update received automatically.');
          return;
        }

        renderSyncStatus('SYNCED');
      }

      function hasMeaningfulLocalData(candidate = state) {
        try {
          const zones = candidate?.zones || {};
          const entryCount = ['head', 'torso', 'arms', 'legs'].reduce((sum, zone) => sum + (Array.isArray(zones?.[zone]?.items) ? zones[zone].items.length : 0), 0);
          const meaningfulDays = Object.values(candidate?.dailyLog || {}).filter(day => {
            if (!day || day.status === 'UNREGISTERED') return false;
            return Boolean(
              String(day.dailyReflection || day.manualSummary || day.gptReflection || '').trim() ||
              (Array.isArray(day.randomThoughts) && day.randomThoughts.length) ||
              (Array.isArray(day.looseReflections) && day.looseReflections.length)
            );
          }).length;
          const summaryText = candidate?.codexSummary ? Object.values(candidate.codexSummary).join(' ').trim() : '';
          return entryCount > 0 || meaningfulDays > 0 || summaryText.length > 0;
        } catch { return true; }
      }

      function shouldPreferRemote(remoteState) {
        if (!hasMeaningfulLocalData(state)) return true;
        if (hasPendingLocalChanges()) return false;
        const { remote: remoteRevision, local: localRevision, remoteTime, localTime } = cloudRevisions(remoteState);
        if (remoteRevision >= localRevision) return true;
        return remoteTime > localTime + 1500;
      }

      function applyRemoteState(remoteState, note = 'Cloud state received.') {
        isApplyingRemoteState = true;
        try {
          state = normalizeData(remoteState || {});
          state._sync = normalizeSync(remoteState?._sync || {});
          state._sync.status = 'synced';
          state._sync.deviceId = deviceId;
          state._sync.lastPulledAt = new Date().toISOString();
          lastRemoteRevision = Number(state._sync.revision || 0);
          pendingCloudSave = false;
          window.clearTimeout(syncSaveTimer);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAllStats(false);
          renderHomePanel();
          if (activeZone) renderPanel();
          if (!historyOverlay.hidden) renderHistorySection();
          if (!healthOverlay.hidden) renderCodexHealth();
          renderSyncStatus('SYNCED', note);
          showToast('CLOUD UPDATED ✓');
        } catch (error) {
          console.warn('Personal Codex: failed to apply remote state.', error);
          renderSyncStatus('ERROR', 'Cloud data could not be applied. Local copy was preserved.');
        } finally {
          window.setTimeout(() => { isApplyingRemoteState = false; }, 0);
        }
      }

      function queueCloudSave() {
        if (isApplyingRemoteState) return;
        if (!pendingCloudSave && state?._sync?.status !== 'pending') return;
        if (!syncUser || !firebaseReady || !firebaseDb || !firebaseModules) return;
        if (cloudUploadInFlight) {
          renderSyncStatus('SYNCING', 'Cloud save already in progress…');
          return;
        }
        if (!navigator.onLine) {
          renderSyncStatus('OFFLINE', 'Offline. Changes are cached locally and will sync automatically when connection returns.');
          return;
        }
        window.clearTimeout(syncSaveTimer);
        syncSaveTimer = window.setTimeout(() => {
          forceUploadLocal('Cloud save completed automatically.').catch(error => {
            console.warn('Personal Codex: cloud save failed.', error);
            renderSyncStatus(navigator.onLine ? 'ERROR' : 'OFFLINE', navigator.onLine ? (error?.message || 'Cloud save failed.') : 'Offline. Changes remain local and will be saved later.');
          });
        }, 900);
      }

      async function forceUploadLocal(note = 'Cloud save completed.') {
        if (!syncUser) { renderSyncStatus('LOCAL', 'Sign in before uploading.'); return; }
        if (cloudUploadInFlight) { renderSyncStatus('SYNCING', 'Cloud save already in progress…'); return; }
        if (!firebaseReady || !firebaseDb || !firebaseModules) await loadFirebaseSdk();
        renderSyncStatus('SYNCING', 'Uploading local Codex to Firebase…');
        const now = new Date().toISOString();
        updateTodayLog();
        const payload = clone(state);
        enforceGptProtocol(payload);
        const nextRevision = Math.max(Number(state._sync?.revision || 0), Number(lastRemoteRevision || 0)) + 1;
        payload.updatedAt = now;
        payload._sync = {
          ...normalizeSync(state._sync || {}),
          provider: 'firebase-realtime-database',
          status: 'synced',
          uid: syncUser.uid,
          email: syncUser.email || null,
          deviceId,
          lastWriterDeviceId: deviceId,
          revision: nextRevision,
          updatedAt: now,
          lastSyncedAt: now,
          path: cloudPathForUser(syncUser)
        };
        cloudUploadInFlight = true;
        cloudUploadRevision = nextRevision;
        cloudUploadChangeCounter = localChangeCounter;
        try {
          await firebaseModules.dbMod.set(firebaseModules.dbMod.ref(firebaseDb, cloudPathForUser(syncUser)), payload);
          lastRemoteRevision = nextRevision;
          cloudUploadInFlight = false;
          cloudUploadRevision = 0;
          const uploadCoveredAllLocalChanges = cloudUploadChangeCounter === localChangeCounter;
          if (uploadCoveredAllLocalChanges) {
            state._sync = payload._sync;
            state.updatedAt = now;
            pendingCloudSave = false;
            window.clearTimeout(syncSaveTimer);
            renderSyncStatus('SYNCED', note);
          } else {
            state._sync = {
              ...normalizeSync(state._sync || {}),
              status: 'pending',
              deviceId,
              lastWriterDeviceId: deviceId,
              updatedAt: new Date().toISOString(),
              path: cloudPathForUser(syncUser)
            };
            pendingCloudSave = true;
            renderSyncStatus('SYNCING', 'Cloud save completed. Saving newer local changes…');
            window.setTimeout(queueCloudSave, 0);
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
          cloudUploadInFlight = false;
          cloudUploadRevision = 0;
          pendingCloudSave = true;
          state._sync = {
            ...normalizeSync(state._sync || {}),
            status: 'pending',
            deviceId,
            lastWriterDeviceId: deviceId,
            updatedAt: now,
            path: cloudPathForUser(syncUser)
          };
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
          throw error;
        }
      }

      async function pullCloudNow() {
        if (!syncUser) { renderSyncStatus('LOCAL', 'Sign in before pulling from cloud.'); return; }
        if (!firebaseReady || !firebaseDb || !firebaseModules) await loadFirebaseSdk();
        renderSyncStatus('SYNCING', 'Pulling cloud Codex…');
        const snapshot = await firebaseModules.dbMod.get(firebaseModules.dbMod.ref(firebaseDb, cloudPathForUser(syncUser)));
        if (!snapshot.exists()) { renderSyncStatus('SYNCED', 'No cloud copy exists yet.'); return; }
        const remoteRaw = snapshot.val();
        const remoteState = normalizeData(remoteRaw || {});
        remoteState._sync = normalizeSync(remoteRaw?._sync || {});
        applyRemoteState(remoteState, 'Cloud copy pulled manually.');
      }

      function handleOnlineStateChange() {
        if (navigator.onLine) {
          if (syncUser) {
            renderSyncStatus('SYNCING', hasPendingLocalChanges() ? 'Connection restored. Saving pending local changes…' : 'Connection restored. Waiting for Firebase confirmation…');
            if (hasPendingLocalChanges()) queueCloudSave();
          } else {
            renderSyncStatus('LOCAL');
          }
          return;
        }
        renderSyncStatus('OFFLINE');
      }

      function openSyncOverlay() {
        if (!syncOverlay) return;
        if (syncEmailInput && syncUser?.email) syncEmailInput.value = syncUser.email;
        if (syncPasswordInput) syncPasswordInput.value = '';
        syncOverlay.hidden = false;
        openModalLayer(syncOverlay, '.sync-panel', syncUser ? syncOverlay.querySelector('[data-sync-action="upload"]') : syncEmailInput);
      }

      function closeSyncOverlay() {
        if (!syncOverlay || syncOverlay.hidden) return;
        closeModalLayer(syncOverlay);
        syncOverlay.hidden = true;
      }

      async function signInFromSyncPanel() {
        try {
          const email = syncEmailInput?.value?.trim();
          const password = syncPasswordInput?.value || '';
          if (!email || !password) { renderSyncStatus('LOCAL', 'Enter your Firebase email and password.'); return; }
          const modules = await loadFirebaseSdk();
          renderSyncStatus('SYNCING', 'Signing in…');
          await withTimeout(
            modules.authMod.signInWithEmailAndPassword(firebaseAuth, email, password),
            20000,
            'Firebase sign-in timed out. Refresh once and try again; the password should never be stored in the app.'
          );
          if (syncPasswordInput) syncPasswordInput.value = '';
          closeSyncOverlay();
        } catch (error) {
          console.warn('Personal Codex: sign-in failed.', error);
          renderSyncStatus('ERROR', error?.message || 'Sign-in failed.');
        }
      }

      async function signOutFromSyncPanel() {
        try {
          if (!firebaseReady || !firebaseAuth || !firebaseModules) return;
          await firebaseModules.authMod.signOut(firebaseAuth);
          renderSyncStatus('LOCAL', 'Signed out. Local storage remains available.');
        } catch (error) {
          renderSyncStatus('ERROR', error?.message || 'Sign-out failed.');
        }
      }

      async function handleSyncAction(action) {
        if (action === 'close') { closeSyncOverlay(); return; }
        if (action === 'signin') { await signInFromSyncPanel(); return; }
        if (action === 'signout') { await signOutFromSyncPanel(); return; }
        if (action === 'upload') { await forceUploadLocal('Manual upload completed.'); return; }
        if (action === 'pull') { await pullCloudNow(); return; }
      }


      function getZone(zone) { return state.zones[zone]; }

      function entriesForZoneDate(zone, dateKey = todayKey()) {
        return (getZone(zone)?.items || []).filter(item => item.codexDate === dateKey);
      }

      function allEntriesForDate(dateKey = todayKey()) {
        return Object.keys(state.zones).flatMap(zone => entriesForZoneDate(zone, dateKey).map(item => ({ zone, item })));
      }

      function hasDayEvidence(dateKey = todayKey()) {
        const reflection = state.dailyLog?.[dateKey]?.dailyReflection || state.dailyLog?.[dateKey]?.manualSummary || '';
        return allEntriesForDate(dateKey).length > 0 || randomThoughtCount(dateKey) > 0 || looseReflectionCount(dateKey) > 0 || Boolean(reflection.trim());
      }

      function completionForZone(zone, dateKey = todayKey()) {
        const visibleCount = entriesForZoneDate(zone, dateKey).length;
        const count = visibleCount;
        return { done: count, total: 1, count, visibleCount, hiddenReflectionCount: 0, randomThoughtCount: randomThoughtCount(dateKey), pct: count > 0 ? 100 : 0 };
      }

      function zoneSnapshot(zone, dateKey = todayKey()) {
        const c = completionForZone(zone, dateKey);
        const entries = entriesForZoneDate(zone, dateKey).map(item => ({
          id: item.id,
          title: item.title,
          subsection: item.subsection,
          entryType: item.entryType,
          codexDate: item.codexDate,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          notes: clone(item.notes || [])
        }));
        return { label: getZone(zone).label, entriesCount: c.count, visibleEntriesCount: entries.length, hiddenEvidenceCount: c.hiddenReflectionCount || 0, done: c.done, total: c.total, pct: c.pct, rating: ratingFromScore(c.pct), entries };
      }

      function rawCoverageAverage(dateKey = todayKey()) {
        if (!hasDayEvidence(dateKey)) return null;
        const parts = Object.keys(state.zones).map(zone => completionForZone(zone, dateKey).pct);
        return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
      }


      function totalRecordsForDay(dateKey = todayKey()) {
        const zoneRecords = allEntriesForDate(dateKey).length;
        return zoneRecords + randomThoughtCount(dateKey) + looseReflectionCount(dateKey);
      }

      function overallAssessmentForDay(dateKey = todayKey()) {
        const day = state.dailyLog?.[dateKey];
        const assessment = normalizeGptAssessment(day?.gptAssessment || {});
        const hasEvidence = hasDayEvidence(dateKey);
        if (!hasEvidence) return { state: 'unregistered', label: 'UNREGISTERED', reason: 'No Codex evidence recorded for this day.' };
        if (!assessment.overallState) return { state: 'pending', label: 'PENDING', reason: 'Evidence recorded. Awaiting GPT assessment.' };
        return {
          state: assessment.overallState,
          label: assessment.overallLabel || assessmentLabel(assessment.overallState),
          reason: assessment.overallReason || 'GPT assessment recorded for this Codex day.'
        };
      }

      function rollingOverallAverage(days = 7) {
        const values = [];
        for (let i = days - 1; i >= 0; i--) {
          const stateValue = overallAssessmentForDay(todayKey(-i)).state;
          if (stateValue === 'green') values.push(100);
          else if (stateValue === 'amber') values.push(50);
          else if (stateValue === 'red') values.push(0);
        }
        if (!values.length) return null;
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      }

      function registerMissedDays() {
        const today = todayKey();
        const keys = Object.keys(state.dailyLog || {}).filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort(compareDateKeys);
        if (!keys.length) return;
        const lastKeyBeforeToday = keys.filter(key => compareDateKeys(key, today) < 0).at(-1);
        if (!lastKeyBeforeToday) return;
        let cursor = addDaysToKey(lastKeyBeforeToday, 1);
        while (compareDateKeys(cursor, today) < 0) {
          if (!state.dailyLog[cursor]) state.dailyLog[cursor] = makeUnregisteredDay(cursor);
          cursor = addDaysToKey(cursor, 1);
        }
      }

      function buildRegisteredDay(dateKey = todayKey()) {
        const zones = {};
        Object.keys(state.zones).forEach(zone => zones[zone] = zoneSnapshot(zone, dateKey));
        const rawCoveragePct = rawCoverageAverage(dateKey);
        const previous = state.dailyLog[dateKey] || {};
        const previousAssessment = normalizeGptAssessment(previous.gptAssessment || { zoneDisplayStatus: previous.zoneDisplayStatus || {}, reasons: previous.zoneDisplayReasons || {} });
        return {
          date: dateKey,
          status: 'REGISTERED',
          zones,
          rawCoveragePct,
          overallPct: null,
          rating: previousAssessment.overallLabel || assessmentLabel(previousAssessment.overallState || 'pending'),
          gptReflection: previous.gptReflection || '',
          dailyReflection: previous.dailyReflection || previous.manualSummary || '',
          manualSummary: previous.manualSummary || previous.dailyReflection || '',
          looseReflections: normalizeLooseReflections(previous.looseReflections || []),
          randomThoughts: normalizeRandomThoughts(previous.randomThoughts || []),
          gptAssessment: previousAssessment,
          updatedAt: new Date().toISOString()
        };
      }

      function updateTodayLog() {
        if (!state.dailyLog || typeof state.dailyLog !== 'object') state.dailyLog = {};
        registerMissedDays();
        const key = todayKey();
        if (hasDayEvidence(key)) state.dailyLog[key] = buildRegisteredDay(key);
        else if (state.dailyLog[key]?.status === 'REGISTERED') delete state.dailyLog[key];
      }

      function snapshotAnyDate(dateKey) {
        if (hasDayEvidence(dateKey)) {
          const existing = state.dailyLog?.[dateKey] || {};
          const snap = buildRegisteredDay(dateKey);
          snap.gptReflection = existing.gptReflection || '';
          snap.dailyReflection = existing.dailyReflection || existing.manualSummary || '';
          snap.manualSummary = existing.manualSummary || existing.dailyReflection || '';
          snap.looseReflections = normalizeLooseReflections(existing.looseReflections || []);
          snap.randomThoughts = normalizeRandomThoughts(existing.randomThoughts || []);
          snap.gptAssessment = normalizeGptAssessment(existing.gptAssessment || { zoneDisplayStatus: existing.zoneDisplayStatus || {}, reasons: existing.zoneDisplayReasons || {} });
          return snap;
        }
        return state.dailyLog?.[dateKey] || makeUnregisteredDay(dateKey);
      }


      function ratingFromScore(score) {
        if (typeof score !== 'number') return 'UNREGISTERED';
        if (score < RATING_THRESHOLDS.poorBelow) return 'POOR';
        if (score >= RATING_THRESHOLDS.excellentAt) return 'EXCELLENT';
        return 'GOOD';
      }

      function ratingCopy(rating, score) {
        if (rating === 'UNREGISTERED') return 'No Codex evidence recorded for this day.';
        if (rating === 'PENDING') return 'Raw evidence recorded. Awaiting GPT assessment.';
        if (rating === 'RED') return 'GPT assessment: evidence is absent, negligible, or structurally weak.';
        if (rating === 'AMBER') return 'GPT assessment: evidence is partial, weak, or requires review.';
        if (rating === 'GREEN') return 'GPT assessment: meaningful evidence recorded.';
        if (rating === 'POOR') return `Legacy daily coverage: ${score}%.`;
        if (rating === 'GOOD') return `Legacy daily coverage: ${score}%.`;
        if (rating === 'EXCELLENT') return `Legacy daily coverage: ${score}%.`;
        return 'Awaiting GPT assessment.';
      }

      function ratingColour(rating) {
        if (rating === 'RED' || rating === 'POOR') return 'var(--rating-poor)';
        if (rating === 'AMBER' || rating === 'GOOD') return 'var(--rating-good)';
        if (rating === 'GREEN' || rating === 'EXCELLENT') return 'var(--rating-excellent)';
        if (rating === 'UNREGISTERED') return 'var(--rating-unregistered)';
        return 'rgba(245,240,232,.22)';
      }

      function renderZoneSummaries() {
        const container = $('#zone-summary-list');
        container.innerHTML = '';
        Object.keys(state.zones).forEach(zone => {
          const c = completionForZone(zone);
          const displayState = zoneDisplayState(zone);
          const fillPct = displayState === 'done' ? 100 : displayState === 'amber' ? 50 : displayState === 'missing' ? 0 : 0;
          const colour = displayState === 'done' ? 'var(--status-done)' : displayState === 'amber' ? 'var(--rating-good)' : displayState === 'missing' ? 'var(--status-missing)' : 'rgba(245,240,232,.18)';
          const stateLabel = displayState === 'done' ? 'GREEN' : displayState === 'amber' ? 'AMBER' : displayState === 'missing' ? 'RED' : 'PENDING';
          const row = document.createElement('div');
          row.className = 'zone-summary-row';
          row.innerHTML = `<span>${escapeHTML(state.zones[zone].label)}</span><span class="mini-track"><span class="mini-fill" style="width:${fillPct}%; background:${colour}"></span></span><span class="zone-rating">${c.count} ${c.count === 1 ? 'ENTRY' : 'ENTRIES'} · ${stateLabel}</span>`;
          container.appendChild(row);
        });
      }

      function setFieldValueWithoutStealingCursor(field, value) {
        if (!field) return;
        if (document.activeElement !== field && field.value !== value) field.value = value;
      }

      function markDetailSavedState(label = 'Saved automatically', temporary = false) {
        if (!detailSaveState) return;
        detailSaveState.textContent = label;
        detailSaveState.classList.toggle('is-saving', temporary);
        if (temporary) {
          window.clearTimeout(markDetailSavedState._timer);
          markDetailSavedState._timer = window.setTimeout(() => markDetailSavedState('Saved automatically', false), 850);
        }
      }

      function refreshDayLog(dateKey) {
        if (!dateKey) return;
        if (!state.dailyLog || typeof state.dailyLog !== 'object') state.dailyLog = {};
        if (hasDayEvidence(dateKey)) state.dailyLog[dateKey] = buildRegisteredDay(dateKey);
        else if (state.dailyLog[dateKey]?.status === 'REGISTERED') delete state.dailyLog[dateKey];
      }


      function setDossierSummaryOpen(open) {
        if (!dossierSummaryPanel || !dossierSummaryToggle) return;
        dossierSummaryPanel.hidden = !open;
        dossierSummaryToggle.setAttribute('aria-expanded', String(open));
        dossierSummaryToggle.classList.toggle('is-active', open);
      }

      function toggleDossierSummary() {
        if (!dossierSummaryPanel) return;
        setDossierSummaryOpen(dossierSummaryPanel.hidden);
      }

      function isMobileViewport() {
        return window.matchMedia('(max-width: 700px)').matches;
      }

      function haptic(pattern = 22) {
        if (!('vibrate' in navigator) || !isMobileViewport()) return;
        try { navigator.vibrate(pattern); } catch (error) {}
      }

      function mobileTabForZone(zone) {
        return ['head', 'torso', 'arms', 'legs'].includes(zone) ? zone : 'today';
      }

      function labelForDisplayState(displayState) {
        if (displayState === 'done') return 'GREEN';
        if (displayState === 'amber') return 'AMBER';
        if (displayState === 'missing') return 'RED';
        return 'PENDING';
      }

      function allTodayZoneEntries() {
        const key = todayKey();
        return ['head', 'torso', 'arms', 'legs'].flatMap(zone => {
          const z = getZone(zone);
          return (z.items || [])
            .filter(item => (item.codexDate || isoToCodexDate(item.createdAt)) === key)
            .map(item => ({ ...item, zone, zoneLabel: z.label }));
        }).sort((a, b) => compareDateKeys(b.createdAt, a.createdAt));
      }

      function preferredTodayQuickActions() {
        const priority = [
          'qa_water_glass', 'qa_teeth_am', 'qa_washed_face_am', 'qa_dressed_properly',
          'qa_teeth_pm', 'qa_skincare_pm', 'qa_moscatelli_work', 'qa_coding_app',
          'qa_financial_study', 'qa_walked', 'qa_proper_meal', 'qa_admin_documents'
        ];
        const ranked = priority.map(id => quickActionById(id)).filter(Boolean);
        const extras = QUICK_ACTIONS.filter(action => !priority.includes(action.id));
        return [...ranked, ...extras].slice(0, 12);
      }

      function renderMobileToday() {
        if (!todayView) return;
        const isMobile = isMobileViewport();
        todayView.hidden = !isMobile || activeMobileTab !== 'today';
        if (!isMobile) return;

        document.body.dataset.mobileTab = activeMobileTab;
        const todayRecords = totalRecordsForDay(todayKey());
        const subtitle = $('#today-mobile-subtitle');
        if (subtitle) subtitle.textContent = todayRecords ? `${todayRecords} ${todayRecords === 1 ? 'record' : 'records'} registered today.` : 'No evidence recorded yet today.';

        if (todayRingsRow) {
          todayRingsRow.innerHTML = ['head', 'torso', 'arms', 'legs'].map(zone => {
            const c = completionForZone(zone);
            const displayState = zoneDisplayState(zone);
            const pct = assessmentRingPct(displayState === 'done' ? 'green' : displayState === 'amber' ? 'amber' : displayState === 'missing' ? 'red' : 'pending');
            return `<button class="today-ring ${displayState}" type="button" data-mobile-zone="${zone}" aria-label="Open ${escapeHTML(state.zones[zone].label)}: ${labelForDisplayState(displayState)}, ${c.count || 0} records"><span class="today-ring-meter" style="--ring-pct:${pct}%"><b>${c.count || 0}</b></span><span class="ring-label">${escapeHTML(state.zones[zone].label)}</span><small>${labelForDisplayState(displayState)}</small></button>`;
          }).join('');
        }

        if (todayQuickRow) {
          todayQuickRow.innerHTML = preferredTodayQuickActions().map(action => {
            const recorded = quickActionRecordedToday(action);
            const disabled = recorded && !action.repeatable;
            const count = quickActionEntryCountToday(action);
            const stateText = recorded ? (action.repeatable ? `×${count}` : 'DONE') : state.zones[action.zone]?.label || '';
            return `<button class="today-quick-pill ${recorded ? 'is-done' : ''}" type="button" data-quick-action-id="${escapeHTML(action.id)}" ${disabled ? 'disabled aria-disabled="true"' : ''}><span>${escapeHTML(action.title)}</span><small>${escapeHTML(stateText)}</small></button>`;
          }).join('');
        }

        if (todayEntryLog) {
          const entries = allTodayZoneEntries();
          todayEntryLog.innerHTML = entries.length ? entries.map(entry => {
            const note = latestNoteText(entry);
            return `<button class="today-entry-card" type="button" data-entry-zone="${escapeHTML(entry.zone)}" data-entry-id="${escapeHTML(entry.id)}"><span class="today-entry-zone">${escapeHTML(entry.zoneLabel)}</span><strong>${escapeHTML(entry.title)}</strong><small>${escapeHTML(entry.subsection || 'General')} · ${formatEntryTime(entry.createdAt)}</small>${note ? `<em>${escapeHTML(note)}</em>` : ''}</button>`;
          }).join('') : '<div class="today-empty-state">No visible zone entries yet. Use Quick Log or the central + to record the first piece of evidence.</div>';
        }

        if (todayCurrentSituation) {
          const situation = state.codexSummary?.bulletSummary || state.codexSummary?.currentSituation || '';
          todayCurrentSituation.textContent = situation || 'Awaiting GPT-generated current situation.';
          todayCurrentSituation.classList.toggle('empty', !situation.trim());
        }
        setTodayQuickZone(selectedTodayQuickZone || 'head');
      }

      function setMobileTab(tab, { open = true } = {}) {
        if (!isMobileViewport()) return false;
        activeMobileTab = tab || 'today';
        document.body.dataset.mobileTab = activeMobileTab;
        $$('.mnav-tab', mobileBottomNav || document).forEach(btn => {
          const active = btn.dataset.mobileTab === activeMobileTab;
          btn.classList.toggle('active', active);
          if (btn.dataset.mobileTab) btn.setAttribute('aria-current', active ? 'page' : 'false');
        });
        if (activeMobileTab === 'today') {
          if (activeZone) closePanel();
          renderMobileToday();
          return true;
        }
        const zone = mobileTabForZone(activeMobileTab);
        if (state.zones[zone]) setTodayQuickZone(zone);
        renderMobileToday();
        if (open && state.zones[zone]) openPanel(zone);
        return true;
      }

      function recordTodayQuickAction(actionId) {
        const action = quickActionById(actionId);
        if (!action || (quickActionRecordedToday(action) && !action.repeatable)) return false;
        if (!addQuickActionEntry(action)) return false;
        updateTodayLog();
        saveData();
        renderAllStats(false);
        if (activeZone === action.zone) renderPanel();
        haptic(24);
        showToast(`${action.title.toUpperCase()} RECORDED`, {
          actionLabel: action.repeatable ? '' : 'UNDO',
          onAction: action.repeatable ? null : () => undoLastQuickAction(action)
        });
        return true;
      }

      function undoLastQuickAction(action) {
        if (!action || !state.zones[action.zone]) return false;
        const items = getZone(action.zone).items || [];
        const index = [...items].reverse().findIndex(item => item.quickActionId === action.id && (item.codexDate || isoToCodexDate(item.createdAt)) === todayKey());
        if (index < 0) return false;
        const realIndex = items.length - 1 - index;
        const [removed] = items.splice(realIndex, 1);
        if (!removed) return false;
        refreshDayLog(removed.codexDate || todayKey());
        saveData();
        renderAllStats(false);
        if (activeZone === action.zone) renderPanel();
        haptic([10, 20, 10]);
        showToast('QUICK ACTION UNDONE');
        return true;
      }

      function setTodayQuickZone(zone) {
        selectedTodayQuickZone = state.zones[zone] ? zone : 'head';
        $$('#today-inline-zones [data-today-zone]').forEach(btn => {
          const active = btn.dataset.todayZone === selectedTodayQuickZone;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        if (todayQuickInput) todayQuickInput.placeholder = `Quick ${state.zones[selectedTodayQuickZone]?.label || 'entry'} entry…`;
      }

      function submitTodayQuickEntry() {
        if (!isMobileViewport() || !todayQuickInput) return false;
        const title = todayQuickInput.value.trim();
        if (!title) { haptic(8); todayQuickInput.focus({ preventScroll: true }); return false; }
        const zone = selectedTodayQuickZone || 'head';
        const created = addEntry(zone, title, '', 'General');
        if (!created) { showToast('ENTRY FAILED'); return false; }
        todayQuickInput.value = '';
        haptic(24);
        showToast('ENTRY RECORDED');
        return true;
      }

      function renderHomePanel() {
        const summary = state.codexSummary || {};
        const situation = summary.currentSituation || '';
        const reflection = summary.reflection || '';
        if (currentSituationReadout) {
          currentSituationReadout.textContent = situation || 'Awaiting GPT-generated current situation.';
          currentSituationReadout.classList.toggle('empty', !situation.trim());
        }
        if (gptReflectionReadout) {
          gptReflectionReadout.textContent = reflection || 'Awaiting GPT-written reflection.';
          gptReflectionReadout.classList.toggle('empty', !reflection.trim());
        }
        if (dossierSummaryReadout) {
          const bulletSummary = summary.bulletSummary || '';
          dossierSummaryReadout.textContent = bulletSummary || 'Awaiting GPT bulletpoint summary.';
          dossierSummaryReadout.classList.toggle('empty', !bulletSummary.trim());
        }
        setFieldValueWithoutStealingCursor(zoneSummaryFields.mind, summary.mind || '');
        setFieldValueWithoutStealingCursor(zoneSummaryFields.rituals, summary.rituals || '');
        setFieldValueWithoutStealingCursor(zoneSummaryFields.craft, summary.craft || '');
        setFieldValueWithoutStealingCursor(zoneSummaryFields.body, summary.body || '');
      }

      function formatExportDate(iso) {
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase();
      }

      function getZoneDisplayOverride(dateKey, zone) {
        const day = state.dailyLog?.[dateKey];
        const source = day?.gptAssessment?.zoneDisplayStatus || day?.zoneDisplayStatus || {};
        const normalised = normalizeZoneDisplayStatus(source);
        return normalised[zone] || '';
      }

      function zoneDisplayState(zone, dateKey = todayKey()) {
        const override = getZoneDisplayOverride(dateKey, zone);
        if (override === 'green') return 'done';
        if (override === 'amber') return 'amber';
        if (override === 'red') return 'missing';
        return 'pending';
      }

      function fitVerdictValue() {
        const el = $('#overall-verdict');
        if (!el) return;
        const text = (el.textContent || '').trim();
        el.classList.toggle('is-long', text.length >= 10);
        el.classList.toggle('is-extra-long', text.length >= 13);
        el.classList.toggle('is-unregistered', text === 'UNREGISTERED');
        el.style.fontSize = '';

        requestAnimationFrame(() => {
          const available = el.parentElement ? el.parentElement.clientWidth : el.clientWidth;
          if (!available) return;
          let size = parseFloat(window.getComputedStyle(el).fontSize);
          let guard = 0;
          const minimumSize = text === 'UNREGISTERED' ? 13 : 18;
          while (el.scrollWidth > available && size > minimumSize && guard < 30) {
            size *= 0.94;
            el.style.fontSize = `${size}px`;
            guard += 1;
          }
        });
      }

      function renderAllStats(shouldUpdate = true) {
        if (shouldUpdate) updateTodayLog();
        ['head', 'torso', 'arms', 'legs'].forEach(zone => {
          const c = completionForZone(zone);
          const stat = $(`#stat-${zone}`);
          const chip = stat?.closest('.stat-chip');
          const displayState = zoneDisplayState(zone);
          if (stat) stat.textContent = String(c.count || 0);
          if (chip) {
            chip.classList.toggle('is-done', displayState === 'done');
            chip.classList.toggle('is-missing', displayState === 'missing');
            chip.classList.toggle('is-amber', displayState === 'amber');
            chip.classList.toggle('is-pending', displayState === 'pending');
            const statusText = displayState === 'done' ? 'GPT assessed green' : displayState === 'amber' ? 'GPT assessed amber' : displayState === 'missing' ? 'GPT assessed red' : 'awaiting GPT assessment';
            chip.setAttribute('aria-label', `${state.zones[zone].label}: ${c.count || 0} ${c.count === 1 ? 'entry' : 'entries'} today, ${statusText}`);
          }
        });
        const todayAssessment = overallAssessmentForDay();
        const todayRecords = totalRecordsForDay(todayKey());
        $('#today-score').textContent = String(todayRecords || 0);
        const rolling = rollingOverallAverage(7);
        $('#rolling-score').textContent = typeof rolling === 'number' ? `${rolling}% GPT` : '—';
        const totalEntries = Object.values(state.zones).reduce((acc, zone) => acc + zone.items.length, 0) + Object.values(state.dailyLog || {}).reduce((acc, day) => acc + ((day.randomThoughts || []).length), 0);
        $('#total-entries').textContent = String(totalEntries);
        const rating = todayAssessment.label;
        $('#overall-verdict').textContent = rating;
        fitVerdictValue();
        $('#overall-copy').textContent = todayAssessment.reason || ratingCopy(rating, null);
        const exportDate = state.metadata?.lastExportedAt ? formatExportDate(state.metadata.lastExportedAt) : '—';
        const lastExport = $('#last-export-date');
        if (lastExport) lastExport.textContent = exportDate;
        const meter = $('#overall-meter-fill');
        meter.style.width = `${assessmentRingPct(todayAssessment.state)}%`;
        meter.style.filter = todayAssessment.state === 'green' ? 'drop-shadow(0 0 10px rgba(200,184,154,.36))' : '';
        renderZoneSummaries();
        renderHomePanel();
        renderMobileToday();
      }

      function renderProgressRing(pct) {
        const value = typeof pct === 'number' ? pct : 0;
        const r = 43;
        const circ = 2 * Math.PI * r;
        const dash = circ * (value / 100);
        progressRing.innerHTML = `<svg viewBox="0 0 112 112" width="112" height="112" aria-hidden="true"><circle cx="56" cy="56" r="${r}" fill="none" stroke="rgba(245,240,232,.12)" stroke-width="6" /><circle id="ring-active" cx="56" cy="56" r="${r}" fill="none" stroke="var(--accent-active)" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 ${circ}" transform="rotate(-90 56 56)" style="transition: stroke-dasharray .68s var(--ease-smooth); filter: drop-shadow(0 0 5px rgba(200,184,154,.55));" /><text x="56" y="57" text-anchor="middle" dominant-baseline="central" font-family="Cinzel, serif" font-size="17" letter-spacing="1" fill="var(--ivory)">${value}%</text></svg>`;
        requestAnimationFrame(() => {
          const active = $('#ring-active', progressRing);
          if (active) active.setAttribute('stroke-dasharray', `${dash} ${circ}`);
        });
      }

      function renderHistoryStrip() {
        historyStrip.hidden = false;
        historyStrip.innerHTML = '';
        for (let i = -6; i <= 0; i++) {
          const key = todayKey(i);
          const entry = snapshotAnyDate(key);
          const assessment = overallAssessmentForDay(key);
          const label = entry.status === 'UNREGISTERED' ? 'UNR' : assessment.label.slice(0, 4);
          const chip = document.createElement('div');
          chip.className = `day-chip ${entry.status === 'UNREGISTERED' ? 'unregistered' : ''}`;
          chip.innerHTML = `<b>${dayLabel(key)}</b><span>${label}</span>`;
          chip.setAttribute('aria-label', `${formatHistoryDate(key)}: ${entry.status === 'UNREGISTERED' ? 'unregistered' : assessment.label}`);
          historyStrip.appendChild(chip);
        }
      }

      function formatHistoryDate(dateKey) {
        return dateFromKey(dateKey).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '').toUpperCase();
      }

      function latestNoteText(item) {
        const notes = item.notes || [];
        return notes.length ? notes[notes.length - 1].text : '';
      }

      function formatEntryTime(iso) {
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return 'TIME UNKNOWN';
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      }

      function historyZoneState(zone, dateKey, zoneSnapshot) {
        const override = getZoneDisplayOverride(dateKey, zone);
        if (override === 'green') return 'done';
        if (override === 'amber') return 'amber';
        if (override === 'red') return 'missing';
        return 'pending';
      }

      function renderHistorySection() {
        updateTodayLog();
        if (!selectedHistoryDate) selectedHistoryDate = todayKey();
        historyList.innerHTML = '';
        const keys = [];
        for (let i = 0; i < 14; i++) keys.push(todayKey(-i));
        if (!keys.includes(selectedHistoryDate)) selectedHistoryDate = keys[0];

        keys.forEach(key => {
          const entry = snapshotAnyDate(key);
          const button = document.createElement('button');
          button.type = 'button';
          button.className = `history-day-button ${entry.status === 'UNREGISTERED' ? 'unregistered' : ''} ${key === selectedHistoryDate ? 'is-selected' : ''}`;
          const dayAssessment = overallAssessmentForDay(key);
          const counts = recordCountsForDaySnapshot(entry);
          const fragments = recordCountFragments(counts);
          const detail = entry.status === 'REGISTERED'
            ? `${fragments.length ? fragments.join(' · ') : 'No records'} · ${dayAssessment.label}`
            : 'UNREGISTERED';
          button.innerHTML = `<strong>${formatHistoryDate(key)}</strong><span>${escapeHTML(detail)}</span>`;
          button.addEventListener('click', () => {
            selectedHistoryDate = key;
            renderHistorySection();
          });
          historyList.appendChild(button);
        });

        renderHistoryDetail(selectedHistoryDate);
      }

      function renderHistoryDetail(dateKey) {
        const entry = snapshotAnyDate(dateKey);
        const statusClass = entry.status === 'UNREGISTERED' ? 'unregistered' : '';
        const dayAssessment = overallAssessmentForDay(dateKey);
        const counts = recordCountsForDaySnapshot(entry);
        const zones = entry.zones || {};
        const zoneHtml = ['head', 'torso', 'arms', 'legs'].map(zone => {
          const z = zones[zone] || { entries: [], rating: 'UNREGISTERED' };
          const entries = z.entries || [];
          const visualState = historyZoneState(zone, dateKey, z);
          const entriesHtml = entries.length ? entries.map(record => {
            const notes = record.notes || [];
            const latest = notes.length ? notes[notes.length - 1] : null;
            return `<div class="history-entry-mini"><strong>${escapeHTML(record.title || 'Untitled entry')}</strong><small>${escapeHTML(record.subsection || 'General')} · ${formatEntryTime(record.createdAt)}</small>${latest?.text ? `<em>${escapeHTML(latest.text)}</em>` : ''}</div>`;
          }).join('') : (z.hiddenEvidenceCount ? `<div class="history-entry-mini"><small>${z.hiddenEvidenceCount} private reflection ${z.hiddenEvidenceCount === 1 ? 'recorded' : 'records'} hidden in JSON.</small></div>` : `<div class="history-entry-mini"><small>No zone evidence recorded.</small></div>`);
          return `<section class="history-zone-card ${visualState}"><h3>${escapeHTML(state.zones[zone].label)}</h3>${entriesHtml}</section>`;
        }).join('');
        const reflection = entry.gptReflection || '';
        const legacyReflectionCount = (entry.looseReflections || []).length;
        const randomCount = (entry.randomThoughts || []).length;
        const privateNotes = [
          randomCount ? `${randomCount} random ${randomCount === 1 ? 'thought' : 'thoughts'} recorded in JSON.` : '',
          legacyReflectionCount ? `${legacyReflectionCount} legacy private ${legacyReflectionCount === 1 ? 'reflection' : 'reflections'} preserved in JSON.` : ''
        ].filter(Boolean).map(text => `<p class="history-private-note">${text}</p>`).join('');
        const countHtml = `
          <div class="history-record-counts" aria-label="Daily record counts">
            <span><b>${counts.zoneEntries}</b> zone ${counts.zoneEntries === 1 ? 'entry' : 'entries'}</span>
            <span><b>${counts.randomThoughts}</b> random ${counts.randomThoughts === 1 ? 'thought' : 'thoughts'}</span>
            <span><b>${counts.privateReflections}</b> private ${counts.privateReflections === 1 ? 'reflection' : 'reflections'}</span>
          </div>`;
        historyDetail.innerHTML = `<div class="history-detail-head"><div><div class="history-detail-date">${formatHistoryDate(dateKey)}</div>${countHtml}</div><div class="history-detail-status ${statusClass}">${entry.status === 'REGISTERED' ? dayAssessment.label : 'UNREGISTERED'}</div></div><div class="history-zone-list">${zoneHtml}</div><div class="history-reflection-block"><div class="micro-label">GPT Reflection</div><p>${reflection ? escapeHTML(reflection) : 'No GPT reflection recorded for this day.'}</p>${privateNotes}</div>`;
      }

      function openHistorySection() {
        selectedHistoryDate = todayKey();
        renderHistorySection();
        historyOverlay.hidden = false;
        document.body.classList.add('history-open');
        updateEffectsPaused();
        openModalLayer(historyOverlay, '.history-panel', historyClose);
      }

      function closeHistorySection() {
        if (!historyOverlay || historyOverlay.hidden) return;
        closeModalLayer(historyOverlay);
        historyOverlay.hidden = true;
        historyOverlay.dataset.modalOpen = 'false';
        document.body.classList.remove('history-open');
        updateEffectsPaused();
      }

      function renderPanel() {
        if (!activeZone) return;
        const data = getZone(activeZone);
        const meta = zoneMeta[activeZone];
        const c = completionForZone(activeZone);
        const displayState = zoneDisplayState(activeZone);
        panelIcon.textContent = data.icon;
        panelKicker.textContent = 'Daily Evidence';
        panelTitle.textContent = data.label;
        panelSubtitle.textContent = data.subtitle;
        metricLabel.textContent = meta.scoreLabel;
        metricTitle.textContent = displayState === 'done' ? 'GREEN' : displayState === 'amber' ? 'AMBER' : displayState === 'missing' ? 'RED' : 'PENDING';
        metricCopy.textContent = c.count ? `${c.count} raw ${c.count === 1 ? 'entry' : 'entries'} recorded. Awaiting or preserving GPT judgement for colour state.` : meta.empty;
        renderProgressRing(assessmentRingPct(displayState === 'done' ? 'green' : displayState === 'amber' ? 'amber' : displayState === 'missing' ? 'red' : 'pending'));
        renderHistoryStrip();
        renderItems();
      }

      function renderItems() {
        if (!activeZone) return;
        const data = getZone(activeZone);
        const todaysItems = entriesForZoneDate(activeZone);
        itemList.innerHTML = '';
        if (!todaysItems.length) {
          const empty = document.createElement('li');
          empty.className = 'empty-state';
          const privateReflection = activeZone === 'head' && looseReflectionCount() > 0;
          empty.textContent = privateReflection ? 'Private reflection recorded for this Codex day. Visible entries remain empty.' : zoneMeta[activeZone].empty + ' Use the floating + button to record today’s evidence.';
          itemList.appendChild(empty);
          return;
        }
        todaysItems
          .slice()
          .sort((a, b) => compareDateKeys(a.createdAt, b.createdAt))
          .forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'item-row evidence-card';
            li.dataset.id = item.id;
            li.tabIndex = 0;
            li.style.animationDelay = `${index * 45}ms`;
            const note = latestNoteText(item);
            li.innerHTML = `<div class="entry-card-top"><div><h3 class="entry-card-title">${escapeHTML(item.title)}</h3><div class="item-meta">${escapeHTML(item.entryType || data.label)} / ${escapeHTML(item.subsection || 'General')}</div></div><span class="entry-card-status">Recorded</span></div>${note ? `<p class="entry-card-note-preview">${escapeHTML(note)}</p>` : ''}<div class="entry-card-foot"><span>${formatEntryTime(item.createdAt)}</span><span>${(item.notes || []).length} ${(item.notes || []).length === 1 ? 'note' : 'notes'}</span></div>`;
            li.addEventListener('click', () => openEntryDetail(activeZone, item.id));
            li.addEventListener('keydown', event => {
              if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEntryDetail(activeZone, item.id); }
            });
            itemList.appendChild(li);
          });
      }

      function addRandomThought(title, note = '') {
        const now = new Date().toISOString();
        const key = todayKey();
        if (!state.dailyLog || typeof state.dailyLog !== 'object') state.dailyLog = {};
        const titleValue = title.trim() || 'Random thought';
        const textValue = note.trim() || titleValue;
        const existing = state.dailyLog[key] || makeUnregisteredDay(key, now);
        const randomThoughts = normalizeRandomThoughts(existing.randomThoughts || []);
        randomThoughts.push({
          id: uid(),
          title: titleValue,
          text: textValue,
          codexDate: key,
          createdAt: now,
          updatedAt: now,
          source: 'random-thought-composer',
          visibility: 'hidden-ui',
          contributesToZone: false,
          gpt: {}
        });
        state.dailyLog[key] = { ...existing, status: 'REGISTERED', randomThoughts, updatedAt: now };
        updateTodayLog();
        saveData();
        renderAllStats(false);
        return true;
      }

      function addLooseReflection(title, note = '') {
        const now = new Date().toISOString();
        const key = todayKey();
        if (!state.dailyLog || typeof state.dailyLog !== 'object') state.dailyLog = {};
        const titleValue = title.trim() || 'Loose reflection';
        const textValue = note.trim() || titleValue;
        const existing = state.dailyLog[key] || makeUnregisteredDay(key, now);
        const looseReflections = normalizeLooseReflections(existing.looseReflections || []);
        looseReflections.push({
          id: uid(),
          title: titleValue,
          text: textValue,
          codexDate: key,
          createdAt: now,
          updatedAt: now,
          source: 'manual-composer',
          visibility: 'hidden-ui',
          gpt: {}
        });
        state.dailyLog[key] = { ...existing, status: 'REGISTERED', looseReflections, updatedAt: now };
        updateTodayLog();
        saveData();
        renderAllStats(false);
        if (activeZone === 'head') renderPanel();
        return true;
      }

      function addEntry(zone, title, note = '', subsection = 'General') {
        if (zone === 'random') return addRandomThought(title, note);
        const value = title.trim();
        if (!value || !state.zones[zone]) return false;
        const now = new Date().toISOString();
        const item = {
          id: uid(),
          title: value,
          entryType: ENTRY_CATALOG[zone]?.label || getZone(zone).label,
          zone,
          subsection: subsection || 'General',
          codexDate: todayKey(),
          createdVia: 'floating-composer',
          createdAt: now,
          updatedAt: now,
          notes: note.trim() ? [noteObject(note, now)] : [],
          gpt: normalizeItemGptFields({})
        };
        getZone(zone).items.push(item);
        updateTodayLog();
        saveData();
        if (activeZone === zone) renderPanel();
        renderAllStats(false);
        return true;
      }

      function findEntry(zone, id) {
        const z = getZone(zone);
        const item = z?.items.find(entry => entry.id === id);
        return item ? { zone, item } : null;
      }

      function findEntryEverywhere(id) {
        for (const zone of Object.keys(state.zones)) {
          const found = findEntry(zone, id);
          if (found) return found;
        }
        return null;
      }

      function openEntryDetail(zone, id) {
        const found = findEntry(zone, id) || findEntryEverywhere(id);
        if (!found) return;
        selectedDetail = { zone: found.zone, id: found.item.id };
        renderEntryDetail();
        detailOverlay.hidden = false;
        updateEffectsPaused();
        requestAnimationFrame(() => detailOverlay.classList.add('open'));
        panel.classList.add('replaced-by-detail');
        openModalLayer(detailOverlay, '.detail-panel', detailTitleInput);
      }

      function closeEntryDetail() {
        closeModalLayer(detailOverlay);
        detailOverlay.classList.remove('open');
        window.setTimeout(() => { detailOverlay.hidden = true; selectedDetail = null; panel.classList.remove('replaced-by-detail'); updateEffectsPaused(); }, 260);
      }

      function currentDetailEntry() {
        if (!selectedDetail) return null;
        return findEntry(selectedDetail.zone, selectedDetail.id) || findEntryEverywhere(selectedDetail.id);
      }

      function populateSubsectionSelect(select, zone, current = 'General') {
        const subs = ENTRY_CATALOG[zone]?.subsections || ['General'];
        select.innerHTML = subs.map(sub => `<option value="${escapeHTML(sub)}">${escapeHTML(sub)}</option>`).join('');
        select.value = subs.includes(current) ? current : 'General';
      }

      function renderEntryDetail() {
        const found = currentDetailEntry();
        if (!found) return;
        selectedDetail = { zone: found.zone, id: found.item.id };
        const { zone, item } = found;
        $('#detail-title').textContent = item.entryType || ENTRY_CATALOG[zone].label;
        const codexDate = item.codexDate || isoToCodexDate(item.createdAt);
        if (detailContext) {
          detailContext.innerHTML = `
            <div class="detail-context-card"><span>Codex Day</span><strong>${escapeHTML(formatHistoryDate(codexDate))}</strong></div>
            <div class="detail-context-card"><span>Recorded</span><strong>${escapeHTML(formatEntryTime(item.createdAt))}</strong></div>
            <div class="detail-context-card"><span>Updated</span><strong>${escapeHTML(formatEntryTime(item.updatedAt || item.createdAt))}</strong></div>
            <div class="detail-context-card"><span>Notes</span><strong>${(item.notes || []).length}</strong></div>
          `;
        }
        setFieldValueWithoutStealingCursor(detailTitleInput, item.title || '');
        if (document.activeElement !== detailZoneSelect) detailZoneSelect.value = zone;
        populateSubsectionSelect(detailSubsectionSelect, zone, item.subsection || 'General');
        setFieldValueWithoutStealingCursor(detailDateInput, codexDate);
        renderDetailNotes(item);
        markDetailSavedState('Saved automatically', false);
      }

      function renderDetailNotes(item) {
        detailNotesList.innerHTML = '';
        if (!item.notes || !item.notes.length) {
          const empty = document.createElement('div');
          empty.className = 'empty-state';
          empty.textContent = 'No notes inside this entry yet.';
          detailNotesList.appendChild(empty);
          return;
        }
        item.notes.forEach(note => {
          const card = document.createElement('div');
          card.className = 'detail-note-card';
          card.dataset.noteId = note.id;
          card.innerHTML = `<div class="detail-note-meta"><span>${formatHistoryDate(isoToCodexDate(note.createdAt))} · ${formatEntryTime(note.createdAt)}</span><button class="detail-note-remove" type="button" aria-label="Remove note">×</button></div><textarea class="detail-note-textarea" data-note-id="${escapeHTML(note.id)}">${escapeHTML(note.text)}</textarea>`;
          $('.detail-note-textarea', card).addEventListener('input', event => updateDetailNote(note.id, event.target.value));
          $('.detail-note-remove', card).addEventListener('click', () => removeDetailNote(note.id));
          detailNotesList.appendChild(card);
        });
      }

      function updateDetailTitle(value) {
        const found = currentDetailEntry();
        if (!found) return;
        found.item.title = value.trim() || 'Untitled record';
        found.item.updatedAt = new Date().toISOString();
        refreshDayLog(found.item.codexDate);
        markDetailSavedState('Saving…', true);
        debouncedSave();
        if (activeZone) renderPanel();
        renderAllStats(false);
      }

      function updateDetailSubsection(value) {
        const found = currentDetailEntry();
        if (!found) return;
        found.item.subsection = value || 'General';
        found.item.updatedAt = new Date().toISOString();
        refreshDayLog(found.item.codexDate);
        markDetailSavedState('Saving…', true);
        debouncedSave();
        if (activeZone) renderPanel();
        renderAllStats(false);
      }

      function updateDetailDate(value) {
        const found = currentDetailEntry();
        if (!found || !/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return;
        const oldDate = found.item.codexDate || isoToCodexDate(found.item.createdAt);
        if (oldDate === value) return;
        found.item.codexDate = value;
        found.item.updatedAt = new Date().toISOString();
        refreshDayLog(oldDate);
        refreshDayLog(value);
        markDetailSavedState('Saving…', true);
        saveData();
        if (activeZone) renderPanel();
        renderAllStats(false);
        if (!historyOverlay.hidden) renderHistorySection();
        renderEntryDetail();
      }

      function moveDetailZone(newZone) {
        const found = currentDetailEntry();
        if (!found || !state.zones[newZone]) return;
        if (found.zone === newZone) return;
        const oldZone = found.zone;
        const item = found.item;
        state.zones[oldZone].items = state.zones[oldZone].items.filter(entry => entry.id !== item.id);
        item.zone = newZone;
        item.entryType = ENTRY_CATALOG[newZone]?.label || state.zones[newZone].label;
        const subs = ENTRY_CATALOG[newZone]?.subsections || ['General'];
        if (!subs.includes(item.subsection)) item.subsection = 'General';
        item.updatedAt = new Date().toISOString();
        state.zones[newZone].items.push(item);
        selectedDetail = { zone: newZone, id: item.id };
        refreshDayLog(item.codexDate);
        markDetailSavedState('Saving…', true);
        saveData();
        if (activeZone) {
          if (activeZone === oldZone || activeZone === newZone) renderPanel();
          renderAllStats(false);
        } else renderAllStats(false);
        renderEntryDetail();
      }

      function updateDetailNote(noteId, text) {
        const found = currentDetailEntry();
        if (!found) return;
        const note = (found.item.notes || []).find(n => n.id === noteId);
        if (!note) return;
        note.text = text;
        note.updatedAt = new Date().toISOString();
        found.item.updatedAt = note.updatedAt;
        refreshDayLog(found.item.codexDate);
        markDetailSavedState('Saving…', true);
        debouncedSave();
        if (activeZone) renderPanel();
        renderAllStats(false);
      }

      function removeDetailNote(noteId) {
        const found = currentDetailEntry();
        if (!found) return;
        found.item.notes = (found.item.notes || []).filter(note => note.id !== noteId);
        found.item.updatedAt = new Date().toISOString();
        refreshDayLog(found.item.codexDate);
        markDetailSavedState('Saving…', true);
        saveData();
        renderEntryDetail();
        if (activeZone) renderPanel();
        renderAllStats(false);
      }

      function addDetailNote() {
        const text = detailNewNote.value.trim();
        const found = currentDetailEntry();
        if (!text || !found) return;
        if (!Array.isArray(found.item.notes)) found.item.notes = [];
        const now = new Date().toISOString();
        found.item.notes.push(noteObject(text, now));
        found.item.updatedAt = now;
        detailNewNote.value = '';
        refreshDayLog(found.item.codexDate);
        markDetailSavedState('Saving…', true);
        saveData();
        renderEntryDetail();
        if (activeZone) renderPanel();
        renderAllStats(false);
        haptic(18);
      }

      function deleteDetailEntry() {
        const found = currentDetailEntry();
        if (!found) return;
        const deletedZone = found.zone;
        const affectedDate = found.item.codexDate || isoToCodexDate(found.item.createdAt);
        const zoneItems = state.zones[deletedZone].items || [];
        const deletedIndex = zoneItems.findIndex(entry => entry.id === found.item.id);
        const deletedItem = clone(found.item);
        if (deletedIndex < 0) return;
        zoneItems.splice(deletedIndex, 1);
        refreshDayLog(affectedDate);
        saveData();
        closeEntryDetail();
        if (activeZone) renderPanel();
        renderAllStats(false);
        haptic([18, 30, 18]);
        showToast('ENTRY DELETED', {
          actionLabel: 'UNDO',
          duration: 5600,
          onAction: () => {
            if (!state.zones[deletedZone]) return;
            const list = state.zones[deletedZone].items || [];
            if (list.some(entry => entry.id === deletedItem.id)) return;
            list.splice(Math.min(deletedIndex, list.length), 0, deletedItem);
            state.zones[deletedZone].items = list;
            refreshDayLog(affectedDate);
            saveData();
            renderAllStats(false);
            if (activeZone === deletedZone) renderPanel();
            haptic([10, 20, 10]);
            showToast('ENTRY RESTORED');
          }
        });
      }

      function updateCodexSummaryField(field, value) {
        if (!state.codexSummary || typeof state.codexSummary !== 'object') state.codexSummary = clone(DEFAULT_DATA.codexSummary);
        state.codexSummary[field] = value;
        debouncedSave(false);
      }


      function openPanel(zone) {
        activeZone = zone;
        if (isMobileViewport()) {
          activeMobileTab = mobileTabForZone(zone);
          document.body.dataset.mobileTab = activeMobileTab;
          $$('.mnav-tab', mobileBottomNav || document).forEach(btn => {
            const active = btn.dataset.mobileTab === activeMobileTab;
            btn.classList.toggle('active', active);
            if (btn.dataset.mobileTab) btn.setAttribute('aria-current', active ? 'page' : 'false');
          });
        }
        homePanel.classList.add('hidden-by-panel');
        panel.hidden = false;
        bodySvg.classList.add('body-focused');
        $$('.zone').forEach(el => el.classList.toggle('active', el.dataset.zone === zone));
        renderPanel();
        requestAnimationFrame(() => panel.classList.add('open'));
      }

      function closePanel() {
        panel.classList.remove('open');
        bodySvg.classList.remove('body-focused');
        $$('.zone').forEach(el => el.classList.remove('active'));
        clearHudLine();
        const closingZone = activeZone;
        activeZone = null;
        window.setTimeout(() => {
          if (!activeZone && closingZone) {
            panel.hidden = true;
            homePanel.classList.remove('hidden-by-panel');
            renderHomePanel();
          }
        }, 370);
      }


      function clearHudLine() { hudLines.innerHTML = ''; }


      function openComposer(preselectedZone = activeZone || 'head') {
        setComposerZone(preselectedZone || 'head');
        composerTitleInput.value = '';
        composerNoteInput.value = '';
        entryComposer.hidden = false;
        updateEffectsPaused();
        openModalLayer(entryComposer, '.composer-panel', composerTitleInput);
      }

      function closeComposer(clear = false) {
        closeModalLayer(entryComposer);
        entryComposer.hidden = true;
        updateEffectsPaused();
        if (clear) { composerTitleInput.value = ''; composerNoteInput.value = ''; }
      }

      function setComposerZone(zone) {
        selectedComposerZone = (state.zones[zone] || zone === 'random') ? zone : 'head';
        $$('.entry-type-card').forEach(card => card.classList.toggle('active', card.dataset.composerZone === selectedComposerZone));
        composerSubsections.innerHTML = '';
        const subsectionLabel = composerSubsections.previousElementSibling;
        const subsections = ENTRY_CATALOG[selectedComposerZone]?.subsections || ['General'];
        const isRandomThought = selectedComposerZone === 'random';
        if (subsectionLabel) subsectionLabel.hidden = isRandomThought;
        composerSubsections.hidden = isRandomThought;
        if (!isRandomThought) {
          subsections.forEach((sub, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `subsection-pill ${index === 0 ? 'active' : ''}`;
            button.dataset.subsection = sub;
            button.textContent = sub;
            button.addEventListener('click', () => {
              $$('.subsection-pill', composerSubsections).forEach(pill => pill.classList.remove('active'));
              button.classList.add('active');
              updateComposerPlaceholders();
            });
            composerSubsections.appendChild(button);
          });
        }
        updateComposerPlaceholders();
      }

      function updateComposerPlaceholders() {
        const activeSubsection = $('.subsection-pill.active', composerSubsections);
        const subsection = activeSubsection?.dataset.subsection || 'General';
        const isRandomThought = selectedComposerZone === 'random';
        composerTitleInput.placeholder = isRandomThought ? 'Random thought title — optional if note is written…' : 'Write the entry title…';
        composerNoteInput.placeholder = isRandomThought ? 'Write the thought. It will be preserved in the JSON and considered by GPT, without marking any zone complete…' : 'Optional context…';
        composerSave.textContent = isRandomThought ? 'Record Thought' : 'Record Entry';
      }

      function submitComposer() {
        const activeSubsection = $('.subsection-pill.active', composerSubsections);
        const subsection = selectedComposerZone === 'random' ? 'Random Thought' : (activeSubsection?.dataset.subsection || 'General');
        const isRandomThought = selectedComposerZone === 'random';
        const title = composerTitleInput.value.trim();
        const note = composerNoteInput.value.trim();
        if (!title && !(isRandomThought && note)) { showToast(isRandomThought ? 'THOUGHT REQUIRED' : 'ENTRY REQUIRED'); composerTitleInput.focus({ preventScroll: true }); return; }
        const created = addEntry(selectedComposerZone, title || 'Random thought', composerNoteInput.value, subsection);
        if (!created) { showToast('ENTRY FAILED'); return; }
        haptic(26);
        showToast(isRandomThought ? 'THOUGHT RECORDED' : 'ENTRY RECORDED');
        if (!isRandomThought && isMobileViewport()) setTodayQuickZone(selectedComposerZone);
        closeComposer(true);
      }

      function timestampForFilename(date = new Date()) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${y}-${m}-${d}_${hh}${mm}`;
      }

      function formalExportFilename(prefix = 'Gianluca_Moscatelli_Personal_Codex') {
        return `${prefix}_${timestampForFilename()}.json`;
      }

      function downloadJsonSnapshot(data, filename) {
        const snapshot = enforceGptProtocol(clone(data || {}));
        const json = JSON.stringify(snapshot, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }

      function exportData() {
        updateTodayLog();
        if (!state.metadata || typeof state.metadata !== 'object') state.metadata = clone(DEFAULT_DATA.metadata);
        state.metadata.lastExportedAt = new Date().toISOString();
        saveData();
        renderAllStats(false);
        downloadJsonSnapshot(state, formalExportFilename());
        showToast('EXPORTED ✓');
      }

      async function copyData() {
        updateTodayLog();
        if (!state.metadata || typeof state.metadata !== 'object') state.metadata = clone(DEFAULT_DATA.metadata);
        state.metadata.lastExportedAt = new Date().toISOString();
        saveData();
        enforceGptProtocol(state);
        try {
          await navigator.clipboard.writeText(JSON.stringify(state, null, 2));
          showToast('COPIED ✓');
        } catch (err) {
          showToast('COPY FAILED');
        }
      }

      async function pasteData() {
        try {
          const text = await navigator.clipboard.readText();
          if (!text || !text.trim()) { showToast('CLIPBOARD EMPTY'); return; }
          const imported = parseImportedCodex(text);
          const issues = validateImportedPayload(imported);
          const normalisedImport = normalizeData(imported);
          const action = await showImportReview(imported, normalisedImport, issues);
          if (action === 'cancel') { showToast('IMPORT CANCELLED'); return; }
          applyImportedState(imported, normalisedImport, action === 'override' ? 'override' : 'merge', issues);
        } catch (err) {
          console.warn('Personal Codex: paste import failed.', err);
          showToast('INVALID JSON');
        }
      }

      function extractJsonFromText(text) {
        const raw = String(text || '').trim();
        if (!raw) throw new Error('Empty import file.');
        const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (fenced && fenced[1]) {
          const candidate = fenced[1].trim();
          if (candidate.startsWith('{') && candidate.endsWith('}')) return candidate;
        }
        const first = raw.indexOf('{');
        const last = raw.lastIndexOf('}');
        if (first === -1 || last === -1 || last <= first) throw new Error('No JSON object found.');
        return raw.slice(first, last + 1);
      }

      function parseImportedCodex(text) {
        return JSON.parse(extractJsonFromText(text));
      }

      function preservePersistentDossierFields(importedSummary, normalisedSummary, previousSummary) {
        const next = normalizeCodexSummary(normalisedSummary || {});
        const previous = normalizeCodexSummary(previousSummary || {});
        const source = importedSummary && typeof importedSummary === 'object' ? importedSummary : null;
        if (!source) {
          return {
            ...next,
            currentSituation: previous.currentSituation || next.currentSituation || '',
            reflection: previous.reflection || next.reflection || '',
            bulletSummary: previous.bulletSummary || next.bulletSummary || '',
            generatedAt: previous.generatedAt || next.generatedAt || null,
            generatedBy: previous.generatedBy || next.generatedBy || ''
          };
        }
        const hasSituation = typeof source.currentSituation === 'string' || typeof source.text === 'string';
        const hasReflection = typeof source.reflection === 'string' || typeof source.currentReflection === 'string';
        const hasBulletSummary = typeof source.bulletSummary === 'string' || typeof source.summary === 'string' || typeof source.dossierSummary === 'string';
        if (!hasSituation) next.currentSituation = previous.currentSituation || next.currentSituation || '';
        if (!hasReflection) next.reflection = previous.reflection || next.reflection || '';
        if (!hasBulletSummary) next.bulletSummary = previous.bulletSummary || next.bulletSummary || '';
        if ((!next.generatedAt && (next.currentSituation || next.reflection || next.bulletSummary)) && previous.generatedAt) next.generatedAt = previous.generatedAt;
        if ((!next.generatedBy && (next.currentSituation || next.reflection || next.bulletSummary)) && previous.generatedBy) next.generatedBy = previous.generatedBy;
        return next;
      }


      function payloadZoneSource(payload) {
        return payload?.zones || { head: payload?.head, torso: payload?.torso, arms: payload?.arms, legs: payload?.legs };
      }

      function payloadEntriesById(payload) {
        const entries = new Map();
        const zones = payloadZoneSource(payload);
        ['head', 'torso', 'arms', 'legs'].forEach(zone => {
          (Array.isArray(zones?.[zone]?.items) ? zones[zone].items : []).forEach(item => {
            if (item?.id) entries.set(item.id, { zone, item });
          });
        });
        return entries;
      }

      function localEntriesById() {
        const entries = new Map();
        ['head', 'torso', 'arms', 'legs'].forEach(zone => {
          (state.zones?.[zone]?.items || []).forEach(item => {
            if (item?.id) entries.set(item.id, { zone, item });
          });
        });
        return entries;
      }

      function payloadHasGptOverallAssessment(payload) {
        const days = payload?.dailyLog && typeof payload.dailyLog === 'object' ? Object.values(payload.dailyLog) : [];
        return days.some(day => {
          const assessment = normalizeGptAssessment(day?.gptAssessment || {});
          return !!assessment.overallState;
        });
      }

      function payloadHasAnyGptAssessment(payload) {
        const days = payload?.dailyLog && typeof payload.dailyLog === 'object' ? Object.values(payload.dailyLog) : [];
        return days.some(day => {
          const assessment = normalizeGptAssessment(day?.gptAssessment || { zoneDisplayStatus: day?.zoneDisplayStatus || {} });
          return !!(assessment.overallState || Object.keys(assessment.zoneDisplayStatus || {}).length);
        });
      }

      function validateImportedPayload(payload) {
        const issues = [];
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
          return ['The imported file does not contain a JSON object.'];
        }
        if (payload.schemaName && payload.schemaName !== DEFAULT_DATA.schemaName) issues.push(`Schema name is "${payload.schemaName}" rather than "${DEFAULT_DATA.schemaName}".`);
        if (!payload.schemaVersion && !payload.version) issues.push('Missing schemaVersion/version number.');
        const importedVersion = Number(payload.schemaVersion || payload.version || 0);
        if (importedVersion && importedVersion > DEFAULT_DATA.version) issues.push(`Imported schema version ${importedVersion} is newer than this app version ${DEFAULT_DATA.version}.`);
        if (!hasExactGptProtocol(payload)) issues.push('GPT protocol is missing or modified. Import will restore the canonical _gpt_protocol contract.');
        if (!payload.metadata || typeof payload.metadata !== 'object') issues.push('Missing metadata section.');
        const hasModernZones = payload.zones && typeof payload.zones === 'object';
        const hasLegacyZones = payload.head || payload.torso || payload.arms || payload.legs;
        if (!hasModernZones && !hasLegacyZones) issues.push('Missing zones/head/torso/arms/legs section.');
        if (hasModernZones) {
          ['head', 'torso', 'arms', 'legs'].forEach(zone => {
            if (!payload.zones[zone]) issues.push(`Missing zone: ${zone}.`);
          });
        }
        if (!payload.dailyLog || typeof payload.dailyLog !== 'object') issues.push('Missing dailyLog section.');
        if (payload.dailyLog && typeof payload.dailyLog === 'object' && Object.keys(payload.dailyLog).length < Object.keys(state.dailyLog || {}).length) {
          issues.push('Imported file contains fewer dailyLog records than the current Codex. Override may reduce visible history.');
        }

        const incomingZoneEntries = countPayloadZoneEntries(payload);
        const localZoneEntries = Object.values(state.zones || {}).reduce((total, zone) => total + (Array.isArray(zone.items) ? zone.items.length : 0), 0);
        if (incomingZoneEntries < localZoneEntries) issues.push(`Imported file contains fewer zone entries (${incomingZoneEntries}) than the current Codex (${localZoneEntries}). Merge is safer than override.`);

        const incomingRandom = countPayloadRandomThoughts(payload);
        const localRandom = Object.values(state.dailyLog || {}).reduce((total, day) => total + (Array.isArray(day?.randomThoughts) ? day.randomThoughts.length : 0), 0);
        if (incomingRandom < localRandom) issues.push(`Imported file contains fewer Random Thoughts (${incomingRandom}) than the current Codex (${localRandom}).`);

        const incomingPrivate = countPayloadPrivateReflections(payload);
        const localPrivate = Object.values(state.dailyLog || {}).reduce((total, day) => total + (Array.isArray(day?.looseReflections) ? day.looseReflections.length : 0), 0);
        if (incomingPrivate < localPrivate) issues.push(`Imported file contains fewer private reflections (${incomingPrivate}) than the current Codex (${localPrivate}).`);

        if (!payload.codexSummary && !payload.summary) issues.push('Missing codexSummary section. Existing Current Situation, Reflection, and Summary can be preserved by choosing merge.');
        else {
          const fields = describeGptFields(payload);
          if (!fields.bulletSummary) issues.push('Missing GPT Summary field. Existing bullet Summary can be preserved by choosing merge.');
        }

        if (payload.dailyLog && typeof payload.dailyLog === 'object') {
          if (!payloadHasAnyGptAssessment(payload)) issues.push('Imported dailyLog contains no GPT assessment. Existing GPT judgement can be preserved by choosing merge.');
          else if (!payloadHasGptOverallAssessment(payload)) issues.push('Imported GPT assessment lacks overallState. Existing overall judgement can be preserved by choosing merge.');
        }

        const incomingById = payloadEntriesById(payload);
        const localById = localEntriesById();
        const changedDates = [];
        incomingById.forEach(({ item }, id) => {
          const local = localById.get(id)?.item;
          if (!local) return;
          const incomingDate = item.codexDate || item.date || isoToCodexDate(item.createdAt);
          const localDate = local.codexDate || isoToCodexDate(local.createdAt);
          if (incomingDate && localDate && incomingDate !== localDate) changedDates.push(id);
        });
        if (changedDates.length) issues.push(`${changedDates.length} imported entr${changedDates.length === 1 ? 'y has' : 'ies have'} changed codexDate values. Merge mode preserves local dates; override will replace them.`);

        return issues;
      }


      function countPayloadZoneEntries(payload) {
        const zones = payload?.zones || { head: payload?.head, torso: payload?.torso, arms: payload?.arms, legs: payload?.legs };
        return ['head', 'torso', 'arms', 'legs'].reduce((total, zone) => total + (Array.isArray(zones?.[zone]?.items) ? zones[zone].items.length : 0), 0);
      }

      function countPayloadRandomThoughts(payload) {
        return payload?.dailyLog && typeof payload.dailyLog === 'object'
          ? Object.values(payload.dailyLog).reduce((total, day) => total + (Array.isArray(day?.randomThoughts) ? day.randomThoughts.length : 0), 0)
          : 0;
      }

      function countPayloadPrivateReflections(payload) {
        return payload?.dailyLog && typeof payload.dailyLog === 'object'
          ? Object.values(payload.dailyLog).reduce((total, day) => total + (Array.isArray(day?.looseReflections) ? day.looseReflections.length : 0), 0)
          : 0;
      }

      function recordCountsForDaySnapshot(entry) {
        if (!entry || entry.status !== 'REGISTERED') return { zoneEntries: 0, randomThoughts: 0, privateReflections: 0, total: 0 };
        const zoneEntries = Object.values(entry.zones || {}).reduce((acc, zone) => acc + ((zone.entries || []).length), 0);
        const privateReflections = Object.values(entry.zones || {}).reduce((acc, zone) => acc + (zone.hiddenEvidenceCount || 0), 0) + ((entry.looseReflections || []).length);
        const randomThoughts = (entry.randomThoughts || []).length;
        return { zoneEntries, randomThoughts, privateReflections, total: zoneEntries + randomThoughts + privateReflections };
      }

      function recordCountFragments(counts) {
        const fragments = [];
        if (counts.zoneEntries) fragments.push(`${counts.zoneEntries} zone ${counts.zoneEntries === 1 ? 'entry' : 'entries'}`);
        if (counts.randomThoughts) fragments.push(`${counts.randomThoughts} random ${counts.randomThoughts === 1 ? 'thought' : 'thoughts'}`);
        if (counts.privateReflections) fragments.push(`${counts.privateReflections} private ${counts.privateReflections === 1 ? 'reflection' : 'reflections'}`);
        return fragments;
      }

      function countPayloadEntries(payload) {
        return countPayloadZoneEntries(payload) + countPayloadRandomThoughts(payload) + countPayloadPrivateReflections(payload);
      }

      function describeGptFields(payload) {
        const summary = payload?.codexSummary || payload?.summary || {};
        return {
          currentSituation: !!String(summary.currentSituation || summary.text || '').trim(),
          reflection: !!String(summary.reflection || summary.currentReflection || '').trim(),
          bulletSummary: !!String(summary.bulletSummary || summary.dossierSummary || '').trim(),
          zoneSummaries: ['mind', 'rituals', 'craft', 'body'].filter(key => !!String(summary[key] || '').trim()).length,
          refinements: !!payload?.gptRefinements
        };
      }

      function importPreviewCards(payload, normalised, issues) {
        const fields = describeGptFields(payload);
        const days = payload?.dailyLog && typeof payload.dailyLog === 'object' ? Object.keys(payload.dailyLog).length : 0;
        const zoneEntries = countPayloadZoneEntries(payload);
        const randomThoughts = countPayloadRandomThoughts(payload);
        const privateReflections = countPayloadPrivateReflections(payload);
        const totalRecords = zoneEntries + randomThoughts + privateReflections;
        const generatedAt = payload?.codexSummary?.generatedAt || payload?.summary?.generatedAt || payload?.gptRefinements?.lastAnalysedAt || null;
        return [
          ['Schema', payload?.schemaVersion || payload?.version || 'Missing', payload?.schemaName || 'No schema name'],
          ['Recorded Days', String(days), 'Daily log records detected'],
          ['Zone Entries', String(zoneEntries), 'Mind, Rituals, Craft, Body evidence'],
          ['Random Thoughts', String(randomThoughts), 'Private non-zone interpretive material'],
          ['Private Reflections', String(privateReflections), 'Hidden reflective material'],
          ['Total Records', String(totalRecords), 'All preserved daily records'],
          ['GPT Situation', fields.currentSituation ? 'Present' : 'Missing', 'Current Situation field'],
          ['GPT Reflection', fields.reflection ? 'Present' : 'Missing', 'Visible Reflection field'],
          ['GPT Summary', fields.bulletSummary ? 'Present' : 'Missing', 'Bulletpoint Summary field'],
          ['Zone Summaries', `${fields.zoneSummaries}/4`, 'Mind, Rituals, Craft, Body'],
          ['GPT Update', generatedAt ? formatFullDateTime(generatedAt) : '—', 'Source timestamp'],
          ['Import Result', issues.length ? 'Review Needed' : 'Clean', issues.length ? `${issues.length} discrepancy${issues.length === 1 ? '' : 'ies'}` : 'No discrepancies detected'],
          ['Normalised To', `v${normalised.version}`, 'App-compatible structure']
        ];
      }

      function showImportReview(payload, normalised, issues) {
        return new Promise(resolve => {
          importReviewGrid.innerHTML = importPreviewCards(payload, normalised, issues).map(([label, value, note]) => `
            <div class="import-review-card"><div class="micro-label">${escapeHTML(label)}</div><strong>${escapeHTML(String(value))}</strong><span>${escapeHTML(note)}</span></div>
          `).join('');
          importIssues.innerHTML = issues.length
            ? issues.map(issue => `<div class="import-issue">${escapeHTML(issue)}</div>`).join('')
            : '<div class="import-issue clean">No structural discrepancies detected. Acknowledge to apply the imported Codex.</div>';
          importReviewOverlay.hidden = false;
          updateEffectsPaused();
          openModalLayer(importReviewOverlay, '.import-review-panel', importReviewOverlay.querySelector('[data-import-action="merge"]'));
          const cleanup = action => {
            closeModalLayer(importReviewOverlay);
            importReviewOverlay.hidden = true;
            updateEffectsPaused();
            importReviewOverlay.removeEventListener('click', onClick);
            resolve(action);
          };
          const onClick = event => {
            const action = event.target?.dataset?.importAction;
            if (!action) return;
            cleanup(action);
          };
          importReviewOverlay.addEventListener('click', onClick);
        });
      }

      function mergeCodexSummary(existingSummary, importedSummary, normalisedSummary) {
        const existing = normalizeCodexSummary(existingSummary || {});
        const source = importedSummary && typeof importedSummary === 'object' ? importedSummary : {};
        const next = normalizeCodexSummary(normalisedSummary || {});
        const fields = ['currentSituation', 'reflection', 'bulletSummary', 'mind', 'rituals', 'craft', 'body', 'generatedBy', 'generatedAt'];
        fields.forEach(field => {
          const supplied = field === 'currentSituation'
            ? (typeof source.currentSituation === 'string' || typeof source.text === 'string')
            : field === 'reflection'
              ? (typeof source.reflection === 'string' || typeof source.currentReflection === 'string')
              : Object.prototype.hasOwnProperty.call(source, field);
          if (!supplied || (typeof next[field] === 'string' && !next[field].trim())) next[field] = existing[field] || next[field] || '';
        });
        return next;
      }

      function mergeByIdPreserveLocal(localItems = [], importedItems = []) {
        const map = new Map();
        (Array.isArray(localItems) ? localItems : []).forEach(item => { if (item?.id) map.set(item.id, clone(item)); });
        (Array.isArray(importedItems) ? importedItems : []).forEach(item => {
          if (!item?.id) return;
          const incoming = clone(item);
          const existing = map.get(item.id);
          if (!existing) {
            map.set(item.id, incoming);
            return;
          }

          const merged = clone(existing);
          merged.gpt = normalizeItemGptFields({ ...(existing.gpt || {}), ...(incoming.gpt || {}) });

          // In merge mode, local raw evidence is authoritative.
          // GPT imports may annotate, assess, and score; they should not silently rewrite raw entries.
          if (incoming.legacy && !merged.legacy) merged.legacy = clone(incoming.legacy);
          ['gptAssessment', 'entryScoring', 'scoring', 'analysis'].forEach(key => {
            if (incoming[key] !== undefined) merged[key] = clone(incoming[key]);
          });

          map.set(item.id, merged);
        });
        return Array.from(map.values()).sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
      }

      function mergeLooseReflectionsPreserveLocal(localItems = [], importedItems = []) {
        const map = new Map();
        normalizeLooseReflections(localItems).forEach(item => map.set(item.id, clone(item)));
        normalizeLooseReflections(importedItems).forEach(item => {
          const existing = map.get(item.id);
          map.set(item.id, existing ? { ...existing, ...clone(item), gpt: { ...(existing.gpt || {}), ...(item.gpt || {}) } } : clone(item));
        });
        return Array.from(map.values()).sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
      }

      function mergeRandomThoughtsPreserveLocal(localItems = [], importedItems = []) {
        const map = new Map();
        normalizeRandomThoughts(localItems).forEach(item => map.set(item.id, clone(item)));
        normalizeRandomThoughts(importedItems).forEach(item => {
          const existing = map.get(item.id);
          map.set(item.id, existing ? { ...existing, ...clone(item), gpt: { ...(existing.gpt || {}), ...(item.gpt || {}) } } : clone(item));
        });
        return Array.from(map.values()).sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
      }

      function mergeGptAssessmentPreserveLocal(localAssessment, importedAssessment) {
        const local = normalizeGptAssessment(localAssessment || {});
        const incoming = normalizeGptAssessment(importedAssessment || {});
        return {
          generatedAt: incoming.generatedAt || local.generatedAt || null,
          generatedBy: incoming.generatedBy || local.generatedBy || '',
          overallState: incoming.overallState || local.overallState || '',
          overallLabel: incoming.overallLabel || local.overallLabel || (incoming.overallState ? assessmentLabel(incoming.overallState) : (local.overallState ? assessmentLabel(local.overallState) : '')),
          overallReason: incoming.overallReason || local.overallReason || '',
          zoneDisplayStatus: { ...local.zoneDisplayStatus, ...incoming.zoneDisplayStatus },
          reasons: { ...local.reasons, ...incoming.reasons }
        };
      }

      function mergeDailyLogPreserveLocal(localLog = {}, importedLog = {}) {
        const merged = clone(localLog || {});
        Object.entries(importedLog || {}).forEach(([date, incomingDay]) => {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !incomingDay || typeof incomingDay !== 'object') return;
          const existing = merged[date];
          if (!existing) {
            merged[date] = clone(incomingDay);
            return;
          }
          const incomingAssessment = incomingDay.gptAssessment || { zoneDisplayStatus: incomingDay.zoneDisplayStatus || {}, reasons: incomingDay.zoneDisplayReasons || {} };
          const existingAssessment = existing.gptAssessment || { zoneDisplayStatus: existing.zoneDisplayStatus || {}, reasons: existing.zoneDisplayReasons || {} };
          if (incomingDay.status === 'UNREGISTERED' && existing.status === 'REGISTERED') {
            merged[date] = {
              ...clone(existing),
              gptAssessment: mergeGptAssessmentPreserveLocal(existingAssessment, incomingAssessment),
              gptReflection: incomingDay.gptReflection || existing.gptReflection || ''
            };
            return;
          }
          merged[date] = {
            ...clone(existing),
            status: existing.status || incomingDay.status || 'REGISTERED',
            zones: existing.zones || incomingDay.zones || null,
            rawCoveragePct: existing.rawCoveragePct ?? incomingDay.rawCoveragePct ?? null,
            overallPct: null,
            rating: incomingDay.rating || existing.rating || '',
            gptReflection: incomingDay.gptReflection || existing.gptReflection || '',
            dailyReflection: existing.dailyReflection || incomingDay.dailyReflection || incomingDay.manualSummary || '',
            manualSummary: existing.manualSummary || incomingDay.manualSummary || incomingDay.dailyReflection || '',
            looseReflections: mergeLooseReflectionsPreserveLocal(existing.looseReflections || [], incomingDay.looseReflections || []),
            randomThoughts: mergeRandomThoughtsPreserveLocal(existing.randomThoughts || [], incomingDay.randomThoughts || []),
            gptAssessment: mergeGptAssessmentPreserveLocal(existingAssessment, incomingAssessment),
            updatedAt: incomingDay.updatedAt || existing.updatedAt || new Date().toISOString()
          };
        });
        return merged;
      }

      function buildMergedImportState(imported, normalised) {
        const merged = clone(state || DEFAULT_DATA);
        merged.version = DEFAULT_DATA.version;
        merged.schemaName = DEFAULT_DATA.schemaName;
        merged.createdAt = state.createdAt || normalised.createdAt || new Date().toISOString();
        merged.updatedAt = new Date().toISOString();

        const hasModernZones = imported.zones && typeof imported.zones === 'object';
        const hasLegacyZones = imported.head || imported.torso || imported.arms || imported.legs;
        const importedZoneSource = hasModernZones ? imported.zones : { head: imported.head, torso: imported.torso, arms: imported.arms, legs: imported.legs };
        if (hasModernZones || hasLegacyZones) {
          ['head', 'torso', 'arms', 'legs'].forEach(zone => {
            const supplied = importedZoneSource?.[zone];
            if (!supplied) return;
            const localZone = state.zones?.[zone] || DEFAULT_DATA.zones[zone];
            const importedZone = normalised.zones?.[zone] || DEFAULT_DATA.zones[zone];
            merged.zones[zone] = {
              ...clone(DEFAULT_DATA.zones[zone]),
              ...pickZoneSafe(localZone),
              ...pickZoneSafe(importedZone),
              items: mergeByIdPreserveLocal(localZone.items || [], importedZone.items || [])
            };
          });
        }

        if (imported.dailyLog && typeof imported.dailyLog === 'object') merged.dailyLog = mergeDailyLogPreserveLocal(state.dailyLog || {}, normalised.dailyLog || {});
        else merged.dailyLog = clone(state.dailyLog || {});

        if (imported.gptRefinements && typeof imported.gptRefinements === 'object') {
          merged.gptRefinements = { ...clone(state.gptRefinements || DEFAULT_DATA.gptRefinements), ...clone(normalised.gptRefinements || {}) };
        } else merged.gptRefinements = clone(state.gptRefinements || DEFAULT_DATA.gptRefinements);

        merged.codexSummary = mergeCodexSummary(state.codexSummary || DEFAULT_DATA.codexSummary, imported.codexSummary || imported.summary, normalised.codexSummary);
        ['currentDay', 'recentFocus', 'longTermPatterns', 'monthlyArchives', 'olderDailyArchive'].forEach(field => {
          if (Object.prototype.hasOwnProperty.call(imported, field)) merged[field] = cloneOrFallback(normalised[field], DEFAULT_DATA[field]);
        });
        merged.metadata = { ...clone(DEFAULT_DATA.metadata), ...clone(state.metadata || {}), ...clone(normalised.metadata || {}) };
        return normalizeData(merged);
      }

      function overrideWouldReduceHistory(normalised) {
        const currentDays = Object.keys(state.dailyLog || {}).length;
        const incomingDays = Object.keys(normalised?.dailyLog || {}).length;
        const currentRecords = Object.values(state.zones || {}).reduce((total, zone) => total + (Array.isArray(zone.items) ? zone.items.length : 0), 0)
          + Object.values(state.dailyLog || {}).reduce((total, day) => total + (Array.isArray(day?.randomThoughts) ? day.randomThoughts.length : 0) + (Array.isArray(day?.looseReflections) ? day.looseReflections.length : 0), 0);
        const incomingRecords = Object.values(normalised?.zones || {}).reduce((total, zone) => total + (Array.isArray(zone.items) ? zone.items.length : 0), 0)
          + Object.values(normalised?.dailyLog || {}).reduce((total, day) => total + (Array.isArray(day?.randomThoughts) ? day.randomThoughts.length : 0) + (Array.isArray(day?.looseReflections) ? day.looseReflections.length : 0), 0);
        return (currentDays > 0 && incomingDays < currentDays) || (currentRecords > 0 && incomingRecords < currentRecords);
      }

      function applyImportedState(imported, normalised, mode, issues) {
        if (mode === 'override' && overrideWouldReduceHistory(normalised)) {
          const currentDays = Object.keys(state.dailyLog || {}).length;
          const incomingDays = Object.keys(normalised?.dailyLog || {}).length;
          const confirmed = window.confirm(`Override will replace ${currentDays} local recorded day${currentDays === 1 ? '' : 's'} with ${incomingDays} imported day${incomingDays === 1 ? '' : 's'}. Continue only if this is intentional.`);
          if (!confirmed) { showToast('OVERRIDE CANCELLED'); return; }
        }
        updateTodayLog();
        if (!state.metadata || typeof state.metadata !== 'object') state.metadata = clone(DEFAULT_DATA.metadata);
        const backup = clone(state);
        backup.metadata = { ...clone(backup.metadata || {}), autoBackupBeforeImportAt: new Date().toISOString() };
        downloadJsonSnapshot(backup, formalExportFilename('Gianluca_Moscatelli_Personal_Codex_PreImportBackup'));
        const nextState = enforceGptProtocol(mode === 'merge' ? buildMergedImportState(imported, normalised) : normalised);
        nextState.metadata = { ...clone(DEFAULT_DATA.metadata), ...clone(nextState.metadata || {}) };
        nextState.metadata.lastImportedAt = new Date().toISOString();
        nextState.metadata.lastImportMode = mode;
        nextState.metadata.lastImportedSchemaVersion = imported?.schemaVersion || imported?.version || null;
        nextState.metadata.lastImportWarnings = issues.slice();
        state = nextState;
        updateTodayLog();
        saveData();
        renderAllStats(false);
        if (activeZone) renderPanel();
        if (!historyOverlay.hidden) renderHistorySection();
        flashFigure();
        showToast(mode === 'merge' ? 'IMPORTED · MERGED' : 'IMPORTED · OVERRIDE');
      }

      async function importData(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async event => {
          try {
            const imported = parseImportedCodex(event.target.result);
            const issues = validateImportedPayload(imported);
            const normalisedImport = normalizeData(imported);
            const action = await showImportReview(imported, normalisedImport, issues);
            if (action === 'cancel') { showToast('IMPORT CANCELLED'); return; }
            applyImportedState(imported, normalisedImport, action === 'override' ? 'override' : 'merge', issues);
          } catch (err) {
            console.warn('Personal Codex: failed import.', err);
            showToast('INVALID BACKUP');
          }
        };
        reader.readAsText(file);
      }

      function flashFigure() {
        bodySvg.style.filter = 'drop-shadow(0 0 38px rgba(245, 240, 232, .42))';
        window.setTimeout(() => bodySvg.style.filter = '', 420);
      }


      function formatFullDateTime(iso) {
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '').toUpperCase();
      }

      function estimateStorageKb() {
        try { return Math.round((new Blob([localStorage.getItem(STORAGE_KEY) || '']).size / 1024) * 10) / 10; }
        catch { return null; }
      }



      let deferredInstallPrompt = null;

      function createPwaManifestLink() {
        const link = document.getElementById('pwa-manifest-link');
        if (link && (!link.getAttribute('href') || link.getAttribute('href') === '#')) link.href = 'manifest.webmanifest';
      }

      async function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) return false;
        try {
          await navigator.serviceWorker.register('./sw.js');
          return true;
        } catch (error) {
          console.warn('Personal Codex: service worker registration failed.', error);
          return false;
        }
      }

      function isStandaloneMode() {
        return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
      }

      function pwaReadinessSnapshot() {
        const manifestLink = document.getElementById('pwa-manifest-link');
        return [
          ['Manifest', !!manifestLink?.href && !manifestLink.href.endsWith('#'), 'manifest.webmanifest linked'],
          ['Install Prompt', !!deferredInstallPrompt, deferredInstallPrompt ? 'Browser install prompt available' : (isStandaloneMode() ? 'Already installed / standalone' : 'Unavailable until browser grants prompt')],
          ['Standalone Mode', isStandaloneMode(), isStandaloneMode() ? 'Running as app' : 'Running in browser'],
          ['Service Worker', 'serviceWorker' in navigator, 'sw.js registration supported by browser'],
          ['Offline Cache', 'serviceWorker' in navigator, 'Static shell cached by sw.js after first successful load'],
          ['Secure Context', window.isSecureContext, window.isSecureContext ? 'HTTPS / localhost ready' : 'Needs HTTPS for full PWA']
        ];
      }

      function renderPwaStatus() {
        if (!pwaStatusGrid) return;
        pwaStatusGrid.innerHTML = pwaReadinessSnapshot().map(([label, ok, note]) => `
          <div class="pwa-status-card ${ok ? 'ready' : 'pending'}">
            <strong>${escapeHTML(label)}</strong>
            <span>${ok ? 'READY' : 'PENDING'}</span>
            <em>${escapeHTML(note)}</em>
          </div>
        `).join('');
      }

      async function promptInstallPwa() {
        if (!deferredInstallPrompt) {
          showToast(isStandaloneMode() ? 'ALREADY INSTALLED' : 'INSTALL NOT AVAILABLE');
          return;
        }
        deferredInstallPrompt.prompt();
        try { await deferredInstallPrompt.userChoice; } catch {}
        deferredInstallPrompt = null;
        if (btnPwaInstall) btnPwaInstall.hidden = true;
        renderPwaStatus();
      }

      function setupPwaPreparation() {
        createPwaManifestLink();
        registerServiceWorker().then(renderPwaStatus);
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          deferredInstallPrompt = event;
          if (btnPwaInstall && !isStandaloneMode()) btnPwaInstall.hidden = false;
          renderPwaStatus();
        });
        window.addEventListener('appinstalled', () => {
          deferredInstallPrompt = null;
          if (btnPwaInstall) btnPwaInstall.hidden = true;
          showToast('INSTALLED');
          renderPwaStatus();
        });
        if (btnPwaInstall) {
          btnPwaInstall.hidden = true;
          btnPwaInstall.addEventListener('click', promptInstallPwa);
        }
      }

      function isValidISODate(value) {
        if (typeof value !== 'string' || !value.trim()) return false;
        const time = Date.parse(value);
        return Number.isFinite(time);
      }

      function collectAllEntries() {
        const entries = [];
        ['head', 'torso', 'arms', 'legs'].forEach(zone => {
          (state.zones?.[zone]?.items || []).forEach(item => entries.push({ zone, item }));
        });
        return entries;
      }

      function runCodexDiagnostics() {
        const findings = [];
        const entries = collectAllEntries();
        const ids = new Map();

        entries.forEach(({ zone, item }) => {
          if (!item.id) findings.push({ level: 'warning', title: 'Missing entry ID', detail: `${state.zones?.[zone]?.label || zone} contains an entry without a stable ID.` });
          else ids.set(item.id, (ids.get(item.id) || 0) + 1);

          if (!item.codexDate || !/^\d{4}-\d{2}-\d{2}$/.test(item.codexDate)) {
            findings.push({ level: 'warning', title: 'Malformed codexDate', detail: `${item.title || item.id || 'Untitled entry'} has no valid YYYY-MM-DD codexDate.` });
          }

          if (item.createdAt && !isValidISODate(item.createdAt)) {
            findings.push({ level: 'warning', title: 'Malformed createdAt', detail: `${item.title || item.id || 'Untitled entry'} has an invalid creation timestamp.` });
          }
        });

        ids.forEach((count, id) => {
          if (count > 1) findings.push({ level: 'critical', title: 'Duplicate entry ID', detail: `${id} appears ${count} times. GPT merge safety may be affected.` });
        });

        const days = Object.keys(state.dailyLog || {});
        const totalZoneEntries = entries.length;
        const randomThoughts = Object.values(state.dailyLog || {}).reduce((sum, day) => sum + (Array.isArray(day?.randomThoughts) ? day.randomThoughts.length : 0), 0);
        const privateReflections = Object.values(state.dailyLog || {}).reduce((sum, day) => sum + (Array.isArray(day?.looseReflections) ? day.looseReflections.length : 0), 0);

        if (!state.schemaVersion || !state.version) findings.push({ level: 'critical', title: 'Schema version incomplete', detail: 'Both schemaVersion and version should exist for GPT/app compatibility.' });
        else if (Number(state.schemaVersion) !== Number(state.version)) findings.push({ level: 'warning', title: 'Schema version mismatch', detail: `schemaVersion is ${state.schemaVersion}, version is ${state.version}.` });

        if (!hasExactGptProtocol(state)) findings.push({ level: 'critical', title: 'GPT protocol missing', detail: 'The root _gpt_protocol field must be present and canonical before export/import roundtrip.' });
        if (!state.metadata) findings.push({ level: 'critical', title: 'Missing metadata', detail: 'metadata is required for import/export context.' });
        if (!state.codexSummary) findings.push({ level: 'critical', title: 'Missing codexSummary', detail: 'GPT-owned dossier fields cannot be read.' });
        else {
          const summary = state.codexSummary;
          if (!String(summary.currentSituation || '').trim()) findings.push({ level: 'warning', title: 'Missing Current Situation', detail: 'GPT dossier is awaiting currentSituation.' });
          if (!String(summary.reflection || '').trim()) findings.push({ level: 'warning', title: 'Missing GPT Reflection', detail: 'GPT dossier is awaiting reflection.' });
          if (!String(summary.bulletSummary || '').trim()) findings.push({ level: 'warning', title: 'Missing Bullet Summary', detail: 'Summary toggle will show awaiting GPT summary.' });
        }

        const today = todayKey();
        const todayAssessment = overallAssessmentForDay(today);
        const hasTodayEvidence = totalRecordsForDay(today) > 0;
        if (hasTodayEvidence && todayAssessment.state === 'pending') {
          findings.push({ level: 'info', title: 'Awaiting GPT judgement', detail: 'Today has records, but no GPT overall assessment yet. This is expected before a GPT roundtrip.' });
        }

        const hasAssessment = days.some(day => {
          const assessment = state.dailyLog?.[day]?.gptAssessment || {};
          return assessment.overallState || assessment.zoneDisplayStatus || state.dailyLog?.[day]?.zoneDisplayStatus;
        });
        if ((totalZoneEntries || randomThoughts || privateReflections) && !hasAssessment) {
          findings.push({ level: 'info', title: 'No GPT assessment detected', detail: 'Records exist, but no GPT red/amber/green authority is present yet.' });
        }

        if (!days.length && (totalZoneEntries || randomThoughts || privateReflections)) {
          findings.push({ level: 'warning', title: 'Daily log not rebuilt', detail: 'Records exist but dailyLog is empty. Export/import interpretation may be incomplete.' });
        }

        try {
          const exported = JSON.stringify(state);
          JSON.parse(exported);
        } catch (error) {
          findings.push({ level: 'critical', title: 'Local JSON roundtrip failed', detail: 'The current in-memory state could not be safely stringified and parsed.' });
        }

        const kb = estimateStorageKb();
        if (kb !== null && kb > 4200) findings.push({ level: 'warning', title: 'Storage nearing localStorage limit', detail: `Estimated size is ${kb} KB. Consider future IndexedDB migration.` });
        else if (kb !== null && kb > 3000) findings.push({ level: 'info', title: 'Storage watch', detail: `Estimated size is ${kb} KB. Still usable, but monitor growth.` });

        if (!findings.length) findings.push({ level: 'clean', title: 'No issues detected', detail: 'Codex structure appears ready for GPT export/import roundtrip.' });

        return findings;
      }

      function renderCodexDiagnostics(findings = runCodexDiagnostics()) {
        if (!healthDiagnosticList) return;
        healthDiagnosticList.innerHTML = findings.map(item => `
          <div class="diagnostic-item ${item.level}">
            <strong>${escapeHTML(item.title)}</strong>
            <span>${escapeHTML(item.detail)}</span>
          </div>
        `).join('');
      }

      function codexHealthSnapshot() {
        const days = Object.keys(state.dailyLog || {}).length;
        const zoneEntries = Object.values(state.zones || {}).reduce((sum, zone) => sum + (Array.isArray(zone.items) ? zone.items.length : 0), 0);
        const randomThoughts = Object.values(state.dailyLog || {}).reduce((sum, day) => sum + (Array.isArray(day?.randomThoughts) ? day.randomThoughts.length : 0), 0);
        const privateReflections = Object.values(state.dailyLog || {}).reduce((sum, day) => sum + (Array.isArray(day?.looseReflections) ? day.looseReflections.length : 0), 0);
        const totalRecords = zoneEntries + randomThoughts + privateReflections;
        const summary = state.codexSummary || {};
        const gptFields = [
          ['Current Situation', !!String(summary.currentSituation || '').trim()],
          ['GPT Reflection', !!String(summary.reflection || '').trim()],
          ['Bullet Summary', !!String(summary.bulletSummary || '').trim()],
          ['Mind Summary', !!String(summary.mind || '').trim()],
          ['Rituals Summary', !!String(summary.rituals || '').trim()],
          ['Craft Summary', !!String(summary.craft || '').trim()],
          ['Body Summary', !!String(summary.body || '').trim()]
        ];
        const kb = estimateStorageKb();
        return { days, entries: totalRecords, zoneEntries, randomThoughts, privateReflections, totalRecords, summary, gptFields, kb };
      }

      function renderCodexHealth() {
        const health = codexHealthSnapshot();
        const meta = state.metadata || {};
        const cards = [
          ['Schema', `v${state.version || '—'}`, state.schemaName || DEFAULT_DATA.schemaName],
          ['Imported Schema', meta.lastImportedSchemaVersion ? `v${meta.lastImportedSchemaVersion}` : '—', 'Most recent source file'],
          ['Last Export', meta.lastExportedAt ? formatFullDateTime(meta.lastExportedAt) : '—', 'Formal archival download'],
          ['Last Import', meta.lastImportedAt ? formatFullDateTime(meta.lastImportedAt) : '—', meta.lastImportMode ? `Mode: ${meta.lastImportMode}` : 'No import recorded'],
          ['Last GPT Update', state.codexSummary?.generatedAt ? formatFullDateTime(state.codexSummary.generatedAt) : '—', state.codexSummary?.generatedBy || 'Generated field not present'],
          ['Recorded Days', String(health.days), 'Daily log records'],
          ['Zone Entries', String(health.zoneEntries), 'Mind, Rituals, Craft, Body evidence'],
          ['Random Thoughts', String(health.randomThoughts), 'Private non-zone records'],
          ['Private Reflections', String(health.privateReflections), 'Hidden reflective records'],
          ['Total Records', String(health.totalRecords), 'All preserved records'],
          ['Storage', health.kb === null ? '—' : `${health.kb} KB`, 'localStorage estimate'],
          ['Import Warnings', String(Array.isArray(meta.lastImportWarnings) ? meta.lastImportWarnings.length : 0), 'Most recent import'],
          ['Boundary', '02:00', 'Codex day reset']
        ];
        healthGrid.innerHTML = cards.map(([label, value, note]) => `
          <div class="health-card"><div class="micro-label">${escapeHTML(label)}</div><strong>${escapeHTML(String(value))}</strong><span>${escapeHTML(String(note))}</span></div>
        `).join('');
        healthGptFields.innerHTML = health.gptFields.map(([label, present]) => `
          <div class="health-field ${present ? 'present' : ''}" data-state="${present ? 'Present' : 'Missing'}"><span>${escapeHTML(label)}</span></div>
        `).join('');
        const warnings = Array.isArray(meta.lastImportWarnings) ? meta.lastImportWarnings : [];
        healthImportNote.textContent = warnings.length ? warnings.join(' • ') : 'No import discrepancies recorded.';
        if (healthDiagnosticList && !healthDiagnosticList.dataset.userRan) {
          healthDiagnosticList.innerHTML = '<p class="diagnostic-empty">Diagnostics not yet run.</p>';
        }
      }

      function openCodexHealth() {
        renderCodexHealth();
        renderPwaStatus();
        healthOverlay.hidden = false;
        updateEffectsPaused();
        openModalLayer(healthOverlay, '.health-panel', healthClose);
      }

      function closeCodexHealth() {
        closeModalLayer(healthOverlay);
        healthOverlay.hidden = true;
        updateEffectsPaused();
      }

      function updateEffectsPaused() {
        const paused = !entryComposer.hidden || !quickActionsOverlay.hidden || !quickConfirmOverlay.hidden || !historyOverlay.hidden || !detailOverlay.hidden || !healthOverlay.hidden || !syncOverlay.hidden || !importReviewOverlay.hidden || (mobileActionsOverlay && !mobileActionsOverlay.hidden);
        document.body.classList.toggle('effects-paused', paused);
      }

      function setMobileViewportVars() {
        const height = Math.round(window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 0);
        if (height) document.documentElement.style.setProperty('--vvh', `${height}px`);
        const layoutHeight = Math.round(window.innerHeight || document.documentElement.clientHeight || height);
        const keyboardOffset = Math.max(0, layoutHeight - height);
        document.documentElement.style.setProperty('--keyboard-offset', `${keyboardOffset}px`);
        const isCompact = window.matchMedia('(max-width: 760px)').matches;
        const hasTouchIntent = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
        const active = document.activeElement;
        const editingField = Boolean(active && active.matches?.('input, textarea, select, [contenteditable="true"]'));
        document.body.classList.toggle('is-mobile-layout', isCompact);
        document.body.classList.toggle('keyboard-open', isCompact && hasTouchIntent && editingField && keyboardOffset > 90);
      }

      function updateHUDDate() {
        const now = new Date();
        const isCompact = window.matchMedia('(max-width: 760px)').matches;
        const date = now.toLocaleDateString('en-GB', isCompact
          ? { weekday: 'short', day: '2-digit', month: 'short' }
          : { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }
        ).replace(/,/g, '').toUpperCase();
        const time = now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: isCompact ? undefined : '2-digit',
          hour12: false
        });
        $('#hud-date').textContent = `${date}  |  ${time}`;
      }

      function showToast(message, options = {}) {
        const { actionLabel = '', onAction = null, duration = actionLabel ? 5200 : 1800 } = options || {};
        const toast = document.createElement('div');
        toast.className = `toast${actionLabel ? ' toast-actionable' : ''}`;
        const label = document.createElement('span');
        label.textContent = message;
        toast.appendChild(label);
        let actionTaken = false;
        if (actionLabel && typeof onAction === 'function') {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'toast-action';
          button.textContent = actionLabel;
          button.addEventListener('click', () => {
            actionTaken = true;
            try { onAction(); } finally { dismiss(); }
          });
          toast.appendChild(button);
        }
        document.body.appendChild(toast);
        const dismiss = () => {
          toast.classList.remove('toast-visible');
          toast.addEventListener('transitionend', () => toast.remove(), { once: true });
          window.setTimeout(() => toast.remove(), 360);
        };
        requestAnimationFrame(() => toast.classList.add('toast-visible'));
        window.setTimeout(() => { if (!actionTaken) dismiss(); }, duration);
      }

      function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str == null ? '' : String(str);
        return div.innerHTML;
      }

      function initialiseBootSequence() {
        document.documentElement.classList.add('booting');
        document.body.classList.add('is-booting');

        const bg = $('.bg-container');
        const header = $('.hud-header');
        const footer = $('.hud-footer');
        const mobileNav = $('#mobile-bottom-nav');
        const svg = $('#body-svg');

        try {
          [bg, header, footer, mobileNav, svg].filter(Boolean).forEach(el => el.classList.add('boot-hidden'));

          window.setTimeout(() => bg?.classList.remove('boot-hidden'), 80);
          window.setTimeout(() => {
            header?.classList.remove('boot-hidden');
            footer?.classList.remove('boot-hidden');
            mobileNav?.classList.remove('boot-hidden');
          }, 260);
          window.setTimeout(() => {
            svg?.classList.remove('boot-hidden');
            drawSilhouetteOnce();
          }, 520);
        } finally {
          window.setTimeout(() => {
            [bg, header, footer, mobileNav, svg].filter(Boolean).forEach(el => el.classList.remove('boot-hidden'));
            document.documentElement.classList.remove('booting');
            document.body.classList.remove('is-booting');
          }, 1400);
        }
      }


      function openMobileActions() {
        if (!mobileActionsOverlay) return;
        mobileActionsOverlay.hidden = false;
        btnMobileActions?.setAttribute('aria-expanded', 'true');
        updateEffectsPaused();
        openModalLayer(mobileActionsOverlay, '.mobile-actions-panel', mobileActionsOverlay.querySelector('[data-mobile-action="export"]'));
      }

      function closeMobileActions() {
        if (!mobileActionsOverlay || mobileActionsOverlay.hidden) return;
        closeModalLayer(mobileActionsOverlay);
        mobileActionsOverlay.hidden = true;
        btnMobileActions?.setAttribute('aria-expanded', 'false');
        updateEffectsPaused();
      }

      function runMobileAction(action) {
        closeMobileActions();
        window.setTimeout(() => {
          if (action === 'export') exportData();
          else if (action === 'copy') copyData();
          else if (action === 'paste') pasteData();
          else if (action === 'import') $('#import-file')?.click();
          else if (action === 'history') openHistorySection();
          else if (action === 'health') openCodexHealth();
          else if (action === 'sync') openSyncOverlay();
          else if (action === 'install') promptInstallPwa();
        }, 90);
      }


      function quickActionById(id) {
        return QUICK_ACTIONS.find(action => action.id === id) || null;
      }

      function quickActionRecordedToday(action) {
        if (!action) return false;
        return (state.zones?.[action.zone]?.items || []).some(item => {
          const sameDay = (item.codexDate || isoToCodexDate(item.createdAt)) === todayKey();
          return sameDay && item.quickActionId === action.id;
        });
      }

      function quickActionEntryCountToday(action) {
        if (!action) return 0;
        return (state.zones?.[action.zone]?.items || []).filter(item => {
          const sameDay = (item.codexDate || isoToCodexDate(item.createdAt)) === todayKey();
          return sameDay && item.quickActionId === action.id;
        }).length;
      }

      function renderQuickActions() {
        if (!quickActionsList) return;
        const count = selectedQuickActionIds.size;
        quickActionsCount.textContent = `${count} selected`;
        quickActionsApply.disabled = count === 0;
        quickActionsList.innerHTML = QUICK_ACTIONS.map(action => {
          const recorded = quickActionRecordedToday(action);
          const disabled = recorded && !action.repeatable;
          const selected = selectedQuickActionIds.has(action.id);
          const zoneLabel = ENTRY_CATALOG[action.zone]?.label || action.zone;
          const repeatText = action.repeatable ? 'Repeatable' : 'Once per Codex day';
          const recordedText = recorded ? (action.repeatable ? `Recorded today ×${quickActionEntryCountToday(action)}` : 'Recorded today') : repeatText;
          return `
            <button class="quick-action-option ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}" type="button" data-quick-action-id="${escapeHTML(action.id)}" ${disabled ? 'disabled aria-disabled="true"' : ''}>
              <span class="quick-action-check" aria-hidden="true">${selected ? '✓' : ''}</span>
              <span class="quick-action-main">
                <strong>${escapeHTML(action.title)}</strong>
                <em>${escapeHTML(zoneLabel)} · ${escapeHTML(action.subsection)}</em>
              </span>
              <span class="quick-action-state">${escapeHTML(recordedText)}</span>
            </button>
          `;
        }).join('');
      }

      function openQuickActions() {
        if (!quickActionsOverlay) return;
        selectedQuickActionIds = new Set([...selectedQuickActionIds].filter(id => {
          const action = quickActionById(id);
          return action && !(quickActionRecordedToday(action) && !action.repeatable);
        }));
        renderQuickActions();
        quickActionsOverlay.hidden = false;
        updateEffectsPaused();
        openModalLayer(quickActionsOverlay, '.quick-actions-panel', quickActionsList?.querySelector('.quick-action-option:not([disabled])') || quickActionsClose);
      }

      function closeQuickActions(clear = false) {
        if (!quickActionsOverlay || quickActionsOverlay.hidden) return;
        closeModalLayer(quickActionsOverlay);
        quickActionsOverlay.hidden = true;
        if (clear) selectedQuickActionIds.clear();
        updateEffectsPaused();
      }

      function toggleQuickAction(id) {
        const action = quickActionById(id);
        if (!action || (quickActionRecordedToday(action) && !action.repeatable)) return;
        if (selectedQuickActionIds.has(id)) selectedQuickActionIds.delete(id);
        else selectedQuickActionIds.add(id);
        renderQuickActions();
      }

      function selectedQuickActions() {
        return [...selectedQuickActionIds].map(quickActionById).filter(Boolean);
      }

      function openQuickConfirm() {
        const selected = selectedQuickActions();
        if (!selected.length) { showToast('NO ACTIONS SELECTED'); return; }
        quickConfirmList.innerHTML = selected.map(action => {
          const zoneLabel = ENTRY_CATALOG[action.zone]?.label || action.zone;
          const already = quickActionRecordedToday(action);
          return `
            <div class="quick-confirm-item">
              <strong>${escapeHTML(action.title)}</strong>
              <span>${escapeHTML(zoneLabel)} · ${escapeHTML(action.subsection)}${already ? ' · already recorded today' : ''}</span>
            </div>
          `;
        }).join('');
        quickConfirmOverlay.hidden = false;
        updateEffectsPaused();
        openModalLayer(quickConfirmOverlay, '.quick-confirm-panel', quickConfirmAccept);
      }

      function closeQuickConfirm() {
        if (!quickConfirmOverlay || quickConfirmOverlay.hidden) return;
        closeModalLayer(quickConfirmOverlay);
        quickConfirmOverlay.hidden = true;
        updateEffectsPaused();
      }

      function addQuickActionEntry(action) {
        if (!action || !state.zones[action.zone]) return false;
        if (quickActionRecordedToday(action) && !action.repeatable) return false;
        const now = new Date().toISOString();
        const item = {
          id: uid(),
          title: action.title,
          entryType: ENTRY_CATALOG[action.zone]?.label || getZone(action.zone).label,
          zone: action.zone,
          subsection: action.subsection || 'General',
          codexDate: todayKey(),
          createdVia: 'quickAction',
          quickActionId: action.id,
          quickActionRepeatable: !!action.repeatable,
          createdAt: now,
          updatedAt: now,
          notes: [],
          gpt: normalizeItemGptFields({})
        };
        getZone(action.zone).items.push(item);
        return true;
      }

      function applyQuickActions() {
        const selected = selectedQuickActions();
        let created = 0;
        selected.forEach(action => {
          if (addQuickActionEntry(action)) created += 1;
        });
        if (!created) {
          showToast('NO ENTRIES ADDED');
          closeQuickConfirm();
          renderQuickActions();
          return;
        }
        updateTodayLog();
        saveData();
        selectedQuickActionIds.clear();
        closeQuickConfirm();
        closeQuickActions(true);
        renderAllStats(false);
        if (activeZone) renderPanel();
        haptic(26);
        showToast(`${created} ${created === 1 ? 'ENTRY' : 'ENTRIES'} RECORDED`);
      }

      function bindEvents() {
        $$('.zone', bodySvg).forEach(zone => {
          const zoneName = zone.dataset.zone;
          zone.addEventListener('mouseenter', () => { tooltip.textContent = zoneMeta[zoneName]?.tooltip || zoneName; tooltip.classList.add('visible'); zone.classList.add('zone-hovered'); });
          zone.addEventListener('mousemove', event => {
            const wrap = $('.silhouette-wrap').getBoundingClientRect();
            tooltip.style.left = `${event.clientX - wrap.left + 12}px`;
            tooltip.style.top = `${event.clientY - wrap.top - 18}px`;
          });
          zone.addEventListener('mouseleave', () => { tooltip.classList.remove('visible'); zone.classList.remove('zone-hovered'); });
          zone.addEventListener('click', () => { zone.classList.remove('zone-tapped'); void zone.getBoundingClientRect(); zone.classList.add('zone-tapped'); window.setTimeout(() => zone.classList.remove('zone-tapped'), 520); if (isMobileViewport()) { setMobileTab(zoneName); } else { activeZone === zoneName ? closePanel() : openPanel(zoneName); } });
          zone.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (isMobileViewport()) setMobileTab(zoneName); else activeZone === zoneName ? closePanel() : openPanel(zoneName); }
          });
        });

        $$('.stat-chip').forEach(chip => {
          const open = () => {
            if (chip.matches('[data-open-history]')) { openHistorySection(); return; }
            if (chip.dataset.openZone) openPanel(chip.dataset.openZone);
          };
          chip.addEventListener('click', open);
          chip.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
        });

        panelClose.addEventListener('click', closePanel);
        dossierSummaryToggle?.addEventListener('click', toggleDossierSummary);
        floatingAdd.addEventListener('click', () => openComposer(activeZone));
        floatingQuick?.addEventListener('click', openQuickActions);
        todayPrimaryAdd?.addEventListener('click', () => { haptic(18); openComposer(activeZone || 'head'); });
        todayOpenQuick?.addEventListener('click', openQuickActions);
        todayOpenHistory?.addEventListener('click', openHistorySection);
        mobileBottomNav?.addEventListener('click', event => {
          const actionBtn = event.target.closest('[data-mobile-action]');
          if (actionBtn?.dataset.mobileAction === 'compose') { haptic(18); openComposer(activeZone || (activeMobileTab !== 'today' ? activeMobileTab : selectedTodayQuickZone || 'head')); return; }
          const tabBtn = event.target.closest('[data-mobile-tab]');
          if (tabBtn) { haptic(12); setMobileTab(tabBtn.dataset.mobileTab); }
        });
        todayRingsRow?.addEventListener('click', event => {
          const zoneButton = event.target.closest('[data-mobile-zone]');
          if (zoneButton) setMobileTab(zoneButton.dataset.mobileZone);
        });
        todayQuickRow?.addEventListener('click', event => {
          const pill = event.target.closest('[data-quick-action-id]');
          if (pill) recordTodayQuickAction(pill.dataset.quickActionId);
        });
        todayInlineZones?.addEventListener('click', event => {
          const btn = event.target.closest('[data-today-zone]');
          if (!btn) return;
          setTodayQuickZone(btn.dataset.todayZone);
          haptic(10);
        });
        todayQuickSend?.addEventListener('click', submitTodayQuickEntry);
        todayQuickInput?.addEventListener('keydown', event => {
          if (event.key === 'Enter') { event.preventDefault(); submitTodayQuickEntry(); }
        });
        todayEntryLog?.addEventListener('click', event => {
          const card = event.target.closest('[data-entry-id]');
          if (card) openEntryDetail(card.dataset.entryZone, card.dataset.entryId);
        });
        quickActionsClose?.addEventListener('click', () => closeQuickActions(false));
        quickActionsCancel?.addEventListener('click', () => closeQuickActions(false));
        quickActionsApply?.addEventListener('click', openQuickConfirm);
        quickActionsOverlay?.addEventListener('click', event => {
          if (event.target.matches('[data-close-quick-actions]')) closeQuickActions(false);
          const id = event.target.closest('[data-quick-action-id]')?.dataset.quickActionId;
          if (id) toggleQuickAction(id);
        });
        quickConfirmClose?.addEventListener('click', closeQuickConfirm);
        quickConfirmCancel?.addEventListener('click', closeQuickConfirm);
        quickConfirmAccept?.addEventListener('click', applyQuickActions);
        quickConfirmOverlay?.addEventListener('click', event => { if (event.target.matches('[data-close-quick-confirm]')) closeQuickConfirm(); });

        composerClose.addEventListener('click', () => closeComposer(false));
        composerCancel.addEventListener('click', () => closeComposer(false));
        entryComposer.addEventListener('click', event => { if (event.target.matches('[data-close-composer]')) closeComposer(false); });
        $$('.entry-type-card').forEach(card => card.addEventListener('click', () => setComposerZone(card.dataset.composerZone)));
        composerSave.addEventListener('click', submitComposer);
        composerTitleInput.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); submitComposer(); } });

        detailClose.addEventListener('click', closeEntryDetail);
        detailDone.addEventListener('click', closeEntryDetail);
        detailOverlay.addEventListener('click', event => { if (event.target.matches('[data-close-detail]')) closeEntryDetail(); });
        detailTitleInput.addEventListener('input', event => updateDetailTitle(event.target.value));
        detailZoneSelect.addEventListener('change', event => moveDetailZone(event.target.value));
        detailSubsectionSelect.addEventListener('change', event => updateDetailSubsection(event.target.value));
        detailDateInput.addEventListener('change', event => updateDetailDate(event.target.value));
        detailAddNote.addEventListener('click', addDetailNote);
        detailNewNote.addEventListener('keydown', event => { if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) addDetailNote(); });
        detailDelete.addEventListener('click', deleteDetailEntry);

        // Zone summaries are GPT-owned and read-only in the UI. They update only through imported JSON.
        $('#btn-export').addEventListener('click', exportData);
        $('#btn-copy').addEventListener('click', copyData);
        $('#btn-paste').addEventListener('click', pasteData);
        $('#btn-history').addEventListener('click', openHistorySection);
        btnSync?.addEventListener('click', openSyncOverlay);
        window.addEventListener('online', handleOnlineStateChange);
        window.addEventListener('offline', handleOnlineStateChange);
        window.addEventListener('resize', () => {
          if (isMobileViewport()) setMobileTab(activeMobileTab || 'today', { open: !!activeZone });
          else { delete document.body.dataset.mobileTab; if (todayView) todayView.hidden = true; }
        });
        syncOverlay?.addEventListener('click', event => {
          const action = event.target?.dataset?.syncAction;
          if (action) handleSyncAction(action);
        });
        syncPasswordInput?.addEventListener('keydown', event => { if (event.key === 'Enter') signInFromSyncPanel(); });
        $('#btn-health').addEventListener('click', openCodexHealth);
        btnMobileActions?.addEventListener('click', openMobileActions);
        mobileActionsClose?.addEventListener('click', closeMobileActions);
        mobileActionsOverlay?.addEventListener('click', event => {
          if (event.target.matches('[data-close-mobile-actions]')) closeMobileActions();
          const action = event.target?.dataset?.mobileAction;
          if (action) runMobileAction(action);
        });
        healthClose.addEventListener('click', closeCodexHealth);
        healthDiagnosticRun?.addEventListener('click', () => { healthDiagnosticList.dataset.userRan = 'true'; renderCodexDiagnostics(); });
        healthOverlay.addEventListener('click', event => { if (event.target.matches('[data-close-health]')) closeCodexHealth(); });
        historyClose?.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          closeHistorySection();
        });
        historyOverlay?.addEventListener('click', event => {
          const closeTarget = event.target instanceof Element
            ? event.target.closest('[data-close-history], #history-close')
            : null;
          if (event.target === historyOverlay || closeTarget) {
            event.preventDefault();
            event.stopPropagation();
            closeHistorySection();
          }
        });
        $('#import-file').addEventListener('change', event => { importData(event.target.files[0]); event.target.value = ''; });

        document.addEventListener('keydown', event => {
          if (event.key === 'Tab' && trapModalFocus(event)) return;
          if (event.key === 'Escape') {
            if (!quickConfirmOverlay.hidden) closeQuickConfirm();
            else if (!quickActionsOverlay.hidden) closeQuickActions(false);
            else if (mobileActionsOverlay && !mobileActionsOverlay.hidden) closeMobileActions();
            else if (syncOverlay && !syncOverlay.hidden) closeSyncOverlay();
            else if (!importReviewOverlay.hidden) importReviewOverlay.querySelector('[data-import-action="cancel"]')?.click();
            else if (!healthOverlay.hidden) closeCodexHealth();
            else if (!detailOverlay.hidden) closeEntryDetail();
            else if (!entryComposer.hidden) closeComposer(false);
            else if (!historyOverlay.hidden) closeHistorySection();
            else if (activeZone) closePanel();
          }
        });

        bindDragToDismiss();
      }

      function bindDragToDismiss() {
        let startY = 0;
        let currentY = 0;
        let startTime = 0;
        let dragging = false;
        const beginDrag = event => {
          if (!panel.classList.contains('open')) return;
          const rect = panel.getBoundingClientRect();
          const touchY = event.touches[0].clientY;
          if (touchY - rect.top > 64) return;
          dragging = true;
          startY = touchY;
          currentY = startY;
          startTime = performance.now();
          panel.style.transition = 'none';
        };
        const moveDrag = event => {
          if (!dragging) return;
          currentY = event.touches[0].clientY;
          const delta = Math.max(0, currentY - startY);
          panel.style.transform = `translateY(${delta}px)`;
        };
        const endDrag = () => {
          if (!dragging) return;
          dragging = false;
          const delta = Math.max(0, currentY - startY);
          const elapsed = Math.max(1, performance.now() - startTime);
          const velocity = delta / elapsed;
          panel.style.transition = '';
          panel.style.transform = '';
          if (delta > 78 || (delta > 34 && velocity > 0.55)) closePanel();
        };
        panel.addEventListener('touchstart', beginDrag, { passive: true });
        panel.addEventListener('touchmove', moveDrag, { passive: true });
        panel.addEventListener('touchend', endDrag);
        panel.addEventListener('touchcancel', endDrag);
      }


      function recoverVisualShell() {
        document.querySelectorAll('.boot-hidden').forEach(el => el.classList.remove('boot-hidden'));
        document.documentElement.classList.remove('booting');
        document.body.classList.remove('is-booting');
      }

      window.addEventListener('pageshow', () => {
        window.setTimeout(recoverVisualShell, 120);
      });

      function handleLaunchAction() {
        const params = new URLSearchParams(window.location.search || '');
        const action = params.get('action');
        if (!action) return;
        const cleanUrl = `${window.location.pathname}${window.location.hash || ''}`;
        window.setTimeout(() => {
          if (action === 'compose') {
            openComposer(activeZone || 'head');
            showToast('ADD ENTRY');
          } else if (action === 'quick') {
            openQuickActions();
            showToast('QUICK ACTIONS');
          }
          try { window.history.replaceState({}, document.title, cleanUrl); } catch {}
        }, 650);
      }

      function init() {
        setMobileViewportVars();
        window.addEventListener('resize', () => { setMobileViewportVars(); updateHUDDate(); fitVerdictValue(); }, { passive: true });
        window.visualViewport?.addEventListener('resize', setMobileViewportVars, { passive: true });
        window.visualViewport?.addEventListener('scroll', setMobileViewportVars, { passive: true });
        updateTodayLog();
        saveData({ markDirty: false, queueCloud: false });
        renderAllStats(false);
        renderHomePanel();
        if (isMobileViewport()) setMobileTab('today', { open: false });
        setComposerZone('head');
        updateHUDDate();
        setInterval(updateHUDDate, 1000);
        bindEvents();
        try { setupPwaPreparation(); } catch (error) { console.warn('PWA preparation skipped:', error); }
        setupFirebaseSync();
        handleLaunchAction();
        initialiseBootSequence();
      }

      init();
    })();
</script>
</body>
</html>
