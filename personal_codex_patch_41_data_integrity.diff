diff -ruN personal_codex_patch_40_mobile_input_polish/app.css personal_codex_patch_41_data_integrity/app.css
--- personal_codex_patch_40_mobile_input_polish/app.css	2026-05-23 22:02:30.682781465 +0000
+++ personal_codex_patch_41_data_integrity/app.css	2026-05-23 22:15:06.844082886 +0000
@@ -5715,14 +5715,14 @@
 
   .today-inline-zones button {
     appearance: none;
-    min-height: 34px;
+    min-height: 42px;
     border: 1px solid rgba(245, 240, 232, .10);
     border-radius: 999px;
     background: rgba(245, 240, 232, .035);
     color: rgba(245, 240, 232, .54);
     font-family: var(--font-ui);
-    font-size: .64rem;
-    letter-spacing: .07em;
+    font-size: .66rem;
+    letter-spacing: .065em;
     text-transform: uppercase;
     cursor: pointer;
     touch-action: manipulation;
diff -ruN personal_codex_patch_40_mobile_input_polish/index.html personal_codex_patch_41_data_integrity/index.html
--- personal_codex_patch_40_mobile_input_polish/index.html	2026-05-23 22:02:30.681217232 +0000
+++ personal_codex_patch_41_data_integrity/index.html	2026-05-23 22:15:06.842554034 +0000
@@ -631,6 +631,7 @@
           autoBackupBeforeImportAt: null,
           lastImportedSchemaVersion: null,
           schemaNotes: {
+          patch41DataIntegrity: 'Patch 41 preserves currentDay, recentFocus, longTermPatterns, monthlyArchives, and olderDailyArchive through normalize/import/cloud flows, hardens Firebase SDK loading, and makes reconnection status less overconfident.',
           patch36AutomaticFirebaseSync: 'Patch 36 makes Firebase Realtime Database the automatic cloud authority after first sign-in, keeps localStorage as an offline cache, debounces cloud writes, receives live remote updates on open, and reserves manual upload/pull for recovery only.',
           patch33RecentFocus: 'Patch 33 adds recentFocus, currentDay, _analysis_priority, and _retention_protocol so GPT primarily interprets the last 30 days and consults older material only when necessary.',
           patch30GptProtocol: 'Patch 30 adds the root-level _gpt_protocol contract so every exported or imported Codex JSON instructs GPT to return a fresh Current Situation after each update.',
@@ -737,6 +738,7 @@
       let syncSaveTimer = null;
       let pendingCloudSave = false;
       let firebaseModules = null;
+      let firebaseLoadPromise = null;
       let firebaseApp = null;
       let firebaseAuth = null;
       let firebaseDb = null;
@@ -1057,6 +1059,8 @@
         const now = new Date().toISOString();
         base.schemaVersion = DEFAULT_DATA.schemaVersion;
         base._gpt_protocol = clone(GPT_PROTOCOL);
+        base._analysis_priority = clone(input._analysis_priority || ANALYSIS_PRIORITY);
+        base._retention_protocol = clone(input._retention_protocol || RETENTION_PROTOCOL);
         base.version = DEFAULT_DATA.version;
         base.createdAt = input.createdAt || now;
         base.updatedAt = input.updatedAt || now;
@@ -1066,6 +1070,7 @@
         base.codexSummary = normalizeCodexSummary(input.codexSummary || input.summary || {});
         base.gptRefinements = normalizeGptRefinements(input.gptRefinements || input.aiRefinements || {});
         base.dailyLog = typeof input.dailyLog === 'object' && input.dailyLog ? normalizeDailyLog(input.dailyLog) : {};
+        preserveRecentFocusFields(base, input);
 
         const sourceZones = input.zones || { head: input.head, torso: input.torso, arms: input.arms, legs: input.legs };
         Object.keys(base.zones).forEach(zone => {
@@ -1079,6 +1084,34 @@
         return base;
       }
 
+      function cloneOrFallback(value, fallback) {
+        if (value === undefined) return clone(fallback);
+        try { return JSON.parse(JSON.stringify(value)); }
+        catch { return clone(fallback); }
+      }
+
+      function normalizeRecentFocus(input) {
+        const base = clone(DEFAULT_DATA.recentFocus);
+        if (!input || typeof input !== 'object' || Array.isArray(input)) return base;
+        const raw = cloneOrFallback(input, {});
+        return {
+          ...base,
+          ...raw,
+          generatedAt: raw.generatedAt || null,
+          windowDays: Number.isFinite(Number(raw.windowDays)) && Number(raw.windowDays) > 0 ? Number(raw.windowDays) : base.windowDays,
+          basis: typeof raw.basis === 'string' && raw.basis.trim() ? raw.basis : base.basis,
+          recentHistory: Array.isArray(raw.recentHistory) ? raw.recentHistory : []
+        };
+      }
+
+      function preserveRecentFocusFields(base, input = {}) {
+        base.currentDay = Object.prototype.hasOwnProperty.call(input, 'currentDay') ? cloneOrFallback(input.currentDay, null) : clone(DEFAULT_DATA.currentDay);
+        base.recentFocus = normalizeRecentFocus(input.recentFocus);
+        base.longTermPatterns = Array.isArray(input.longTermPatterns) ? cloneOrFallback(input.longTermPatterns, []) : clone(DEFAULT_DATA.longTermPatterns);
+        base.monthlyArchives = Array.isArray(input.monthlyArchives) ? cloneOrFallback(input.monthlyArchives, []) : clone(DEFAULT_DATA.monthlyArchives);
+        base.olderDailyArchive = Array.isArray(input.olderDailyArchive) ? cloneOrFallback(input.olderDailyArchive, []) : clone(DEFAULT_DATA.olderDailyArchive);
+      }
+
       function pickZoneSafe(zone) {
         return {
           label: typeof zone.label === 'string' ? zone.label : undefined,
@@ -1375,20 +1408,25 @@
 
       async function loadFirebaseSdk() {
         if (firebaseReady && firebaseModules) return firebaseModules;
-        const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
-        const [appMod, authMod, dbMod] = await Promise.all([
-          import(`${base}/firebase-app.js`),
-          import(`${base}/firebase-auth.js`),
-          import(`${base}/firebase-database.js`)
-        ]);
-        firebaseApp = appMod.initializeApp(FIREBASE_CONFIG);
-        firebaseAuth = authMod.getAuth(firebaseApp);
-        try { await authMod.setPersistence(firebaseAuth, authMod.browserLocalPersistence); }
-        catch (error) { console.warn('Personal Codex: could not set Firebase auth persistence.', error); }
-        firebaseDb = dbMod.getDatabase(firebaseApp);
-        firebaseModules = { appMod, authMod, dbMod };
-        firebaseReady = true;
-        return firebaseModules;
+        if (firebaseLoadPromise) return firebaseLoadPromise;
+        firebaseLoadPromise = (async () => {
+          const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
+          const [appMod, authMod, dbMod] = await Promise.all([
+            import(`${base}/firebase-app.js`),
+            import(`${base}/firebase-auth.js`),
+            import(`${base}/firebase-database.js`)
+          ]);
+          firebaseApp = appMod.getApps?.().length ? appMod.getApp() : appMod.initializeApp(FIREBASE_CONFIG);
+          firebaseAuth = authMod.getAuth(firebaseApp);
+          try { await authMod.setPersistence(firebaseAuth, authMod.browserLocalPersistence); }
+          catch (error) { console.warn('Personal Codex: could not set Firebase auth persistence.', error); }
+          firebaseDb = dbMod.getDatabase(firebaseApp);
+          firebaseModules = { appMod, authMod, dbMod };
+          firebaseReady = true;
+          return firebaseModules;
+        })();
+        try { return await firebaseLoadPromise; }
+        catch (error) { firebaseLoadPromise = null; throw error; }
       }
 
       async function setupFirebaseSync() {
@@ -1628,8 +1666,12 @@
 
       function handleOnlineStateChange() {
         if (navigator.onLine) {
-          if (syncUser && hasPendingLocalChanges()) queueCloudSave();
-          else if (syncUser) renderSyncStatus('SYNCED');
+          if (syncUser) {
+            renderSyncStatus('SYNCING', hasPendingLocalChanges() ? 'Connection restored. Saving pending local changes…' : 'Connection restored. Waiting for Firebase confirmation…');
+            if (hasPendingLocalChanges()) queueCloudSave();
+          } else {
+            renderSyncStatus('LOCAL');
+          }
           return;
         }
         renderSyncStatus('OFFLINE');
@@ -1900,7 +1942,8 @@
       }
 
       function haptic(pattern = 22) {
-        try { navigator.vibrate?.(pattern); } catch (error) {}
+        if (!('vibrate' in navigator) || !isMobileViewport()) return;
+        try { navigator.vibrate(pattern); } catch (error) {}
       }
 
       function mobileTabForZone(zone) {
@@ -3234,6 +3277,9 @@
         } else merged.gptRefinements = clone(state.gptRefinements || DEFAULT_DATA.gptRefinements);
 
         merged.codexSummary = mergeCodexSummary(state.codexSummary || DEFAULT_DATA.codexSummary, imported.codexSummary || imported.summary, normalised.codexSummary);
+        ['currentDay', 'recentFocus', 'longTermPatterns', 'monthlyArchives', 'olderDailyArchive'].forEach(field => {
+          if (Object.prototype.hasOwnProperty.call(imported, field)) merged[field] = cloneOrFallback(normalised[field], DEFAULT_DATA[field]);
+        });
         merged.metadata = { ...clone(DEFAULT_DATA.metadata), ...clone(state.metadata || {}), ...clone(normalised.metadata || {}) };
         return normalizeData(merged);
       }
@@ -3557,7 +3603,7 @@
       }
 
       function updateEffectsPaused() {
-        const paused = !entryComposer.hidden || !quickActionsOverlay.hidden || !quickConfirmOverlay.hidden || !historyOverlay.hidden || !detailOverlay.hidden || !healthOverlay.hidden || !importReviewOverlay.hidden || (mobileActionsOverlay && !mobileActionsOverlay.hidden);
+        const paused = !entryComposer.hidden || !quickActionsOverlay.hidden || !quickConfirmOverlay.hidden || !historyOverlay.hidden || !detailOverlay.hidden || !healthOverlay.hidden || !syncOverlay.hidden || !importReviewOverlay.hidden || (mobileActionsOverlay && !mobileActionsOverlay.hidden);
         document.body.classList.toggle('effects-paused', paused);
       }
 
@@ -3568,8 +3614,11 @@
         const keyboardOffset = Math.max(0, layoutHeight - height);
         document.documentElement.style.setProperty('--keyboard-offset', `${keyboardOffset}px`);
         const isCompact = window.matchMedia('(max-width: 760px)').matches;
+        const hasTouchIntent = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
+        const active = document.activeElement;
+        const editingField = Boolean(active && active.matches?.('input, textarea, select, [contenteditable="true"]'));
         document.body.classList.toggle('is-mobile-layout', isCompact);
-        document.body.classList.toggle('keyboard-open', isCompact && keyboardOffset > 90);
+        document.body.classList.toggle('keyboard-open', isCompact && hasTouchIntent && editingField && keyboardOffset > 90);
       }
 
       function updateHUDDate() {
diff -ruN personal_codex_patch_40_mobile_input_polish/personal_codex_patch_41_data_integrity.diff personal_codex_patch_41_data_integrity/personal_codex_patch_41_data_integrity.diff
--- personal_codex_patch_40_mobile_input_polish/personal_codex_patch_41_data_integrity.diff	1970-01-01 00:00:00.000000000 +0000
+++ personal_codex_patch_41_data_integrity/personal_codex_patch_41_data_integrity.diff	2026-05-23 22:15:33.764805301 +0000
@@ -0,0 +1,189 @@
+diff -ruN personal_codex_patch_40_mobile_input_polish/app.css personal_codex_patch_41_data_integrity/app.css
+--- personal_codex_patch_40_mobile_input_polish/app.css	2026-05-23 22:02:30.682781465 +0000
++++ personal_codex_patch_41_data_integrity/app.css	2026-05-23 22:15:06.844082886 +0000
+@@ -5715,14 +5715,14 @@
+ 
+   .today-inline-zones button {
+     appearance: none;
+-    min-height: 34px;
++    min-height: 42px;
+     border: 1px solid rgba(245, 240, 232, .10);
+     border-radius: 999px;
+     background: rgba(245, 240, 232, .035);
+     color: rgba(245, 240, 232, .54);
+     font-family: var(--font-ui);
+-    font-size: .64rem;
+-    letter-spacing: .07em;
++    font-size: .66rem;
++    letter-spacing: .065em;
+     text-transform: uppercase;
+     cursor: pointer;
+     touch-action: manipulation;
+diff -ruN personal_codex_patch_40_mobile_input_polish/index.html personal_codex_patch_41_data_integrity/index.html
+--- personal_codex_patch_40_mobile_input_polish/index.html	2026-05-23 22:02:30.681217232 +0000
++++ personal_codex_patch_41_data_integrity/index.html	2026-05-23 22:15:06.842554034 +0000
+@@ -631,6 +631,7 @@
+           autoBackupBeforeImportAt: null,
+           lastImportedSchemaVersion: null,
+           schemaNotes: {
++          patch41DataIntegrity: 'Patch 41 preserves currentDay, recentFocus, longTermPatterns, monthlyArchives, and olderDailyArchive through normalize/import/cloud flows, hardens Firebase SDK loading, and makes reconnection status less overconfident.',
+           patch36AutomaticFirebaseSync: 'Patch 36 makes Firebase Realtime Database the automatic cloud authority after first sign-in, keeps localStorage as an offline cache, debounces cloud writes, receives live remote updates on open, and reserves manual upload/pull for recovery only.',
+           patch33RecentFocus: 'Patch 33 adds recentFocus, currentDay, _analysis_priority, and _retention_protocol so GPT primarily interprets the last 30 days and consults older material only when necessary.',
+           patch30GptProtocol: 'Patch 30 adds the root-level _gpt_protocol contract so every exported or imported Codex JSON instructs GPT to return a fresh Current Situation after each update.',
+@@ -737,6 +738,7 @@
+       let syncSaveTimer = null;
+       let pendingCloudSave = false;
+       let firebaseModules = null;
++      let firebaseLoadPromise = null;
+       let firebaseApp = null;
+       let firebaseAuth = null;
+       let firebaseDb = null;
+@@ -1057,6 +1059,8 @@
+         const now = new Date().toISOString();
+         base.schemaVersion = DEFAULT_DATA.schemaVersion;
+         base._gpt_protocol = clone(GPT_PROTOCOL);
++        base._analysis_priority = clone(input._analysis_priority || ANALYSIS_PRIORITY);
++        base._retention_protocol = clone(input._retention_protocol || RETENTION_PROTOCOL);
+         base.version = DEFAULT_DATA.version;
+         base.createdAt = input.createdAt || now;
+         base.updatedAt = input.updatedAt || now;
+@@ -1066,6 +1070,7 @@
+         base.codexSummary = normalizeCodexSummary(input.codexSummary || input.summary || {});
+         base.gptRefinements = normalizeGptRefinements(input.gptRefinements || input.aiRefinements || {});
+         base.dailyLog = typeof input.dailyLog === 'object' && input.dailyLog ? normalizeDailyLog(input.dailyLog) : {};
++        preserveRecentFocusFields(base, input);
+ 
+         const sourceZones = input.zones || { head: input.head, torso: input.torso, arms: input.arms, legs: input.legs };
+         Object.keys(base.zones).forEach(zone => {
+@@ -1079,6 +1084,34 @@
+         return base;
+       }
+ 
++      function cloneOrFallback(value, fallback) {
++        if (value === undefined) return clone(fallback);
++        try { return JSON.parse(JSON.stringify(value)); }
++        catch { return clone(fallback); }
++      }
++
++      function normalizeRecentFocus(input) {
++        const base = clone(DEFAULT_DATA.recentFocus);
++        if (!input || typeof input !== 'object' || Array.isArray(input)) return base;
++        const raw = cloneOrFallback(input, {});
++        return {
++          ...base,
++          ...raw,
++          generatedAt: raw.generatedAt || null,
++          windowDays: Number.isFinite(Number(raw.windowDays)) && Number(raw.windowDays) > 0 ? Number(raw.windowDays) : base.windowDays,
++          basis: typeof raw.basis === 'string' && raw.basis.trim() ? raw.basis : base.basis,
++          recentHistory: Array.isArray(raw.recentHistory) ? raw.recentHistory : []
++        };
++      }
++
++      function preserveRecentFocusFields(base, input = {}) {
++        base.currentDay = Object.prototype.hasOwnProperty.call(input, 'currentDay') ? cloneOrFallback(input.currentDay, null) : clone(DEFAULT_DATA.currentDay);
++        base.recentFocus = normalizeRecentFocus(input.recentFocus);
++        base.longTermPatterns = Array.isArray(input.longTermPatterns) ? cloneOrFallback(input.longTermPatterns, []) : clone(DEFAULT_DATA.longTermPatterns);
++        base.monthlyArchives = Array.isArray(input.monthlyArchives) ? cloneOrFallback(input.monthlyArchives, []) : clone(DEFAULT_DATA.monthlyArchives);
++        base.olderDailyArchive = Array.isArray(input.olderDailyArchive) ? cloneOrFallback(input.olderDailyArchive, []) : clone(DEFAULT_DATA.olderDailyArchive);
++      }
++
+       function pickZoneSafe(zone) {
+         return {
+           label: typeof zone.label === 'string' ? zone.label : undefined,
+@@ -1375,20 +1408,25 @@
+ 
+       async function loadFirebaseSdk() {
+         if (firebaseReady && firebaseModules) return firebaseModules;
+-        const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
+-        const [appMod, authMod, dbMod] = await Promise.all([
+-          import(`${base}/firebase-app.js`),
+-          import(`${base}/firebase-auth.js`),
+-          import(`${base}/firebase-database.js`)
+-        ]);
+-        firebaseApp = appMod.initializeApp(FIREBASE_CONFIG);
+-        firebaseAuth = authMod.getAuth(firebaseApp);
+-        try { await authMod.setPersistence(firebaseAuth, authMod.browserLocalPersistence); }
+-        catch (error) { console.warn('Personal Codex: could not set Firebase auth persistence.', error); }
+-        firebaseDb = dbMod.getDatabase(firebaseApp);
+-        firebaseModules = { appMod, authMod, dbMod };
+-        firebaseReady = true;
+-        return firebaseModules;
++        if (firebaseLoadPromise) return firebaseLoadPromise;
++        firebaseLoadPromise = (async () => {
++          const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
++          const [appMod, authMod, dbMod] = await Promise.all([
++            import(`${base}/firebase-app.js`),
++            import(`${base}/firebase-auth.js`),
++            import(`${base}/firebase-database.js`)
++          ]);
++          firebaseApp = appMod.getApps?.().length ? appMod.getApp() : appMod.initializeApp(FIREBASE_CONFIG);
++          firebaseAuth = authMod.getAuth(firebaseApp);
++          try { await authMod.setPersistence(firebaseAuth, authMod.browserLocalPersistence); }
++          catch (error) { console.warn('Personal Codex: could not set Firebase auth persistence.', error); }
++          firebaseDb = dbMod.getDatabase(firebaseApp);
++          firebaseModules = { appMod, authMod, dbMod };
++          firebaseReady = true;
++          return firebaseModules;
++        })();
++        try { return await firebaseLoadPromise; }
++        catch (error) { firebaseLoadPromise = null; throw error; }
+       }
+ 
+       async function setupFirebaseSync() {
+@@ -1628,8 +1666,12 @@
+ 
+       function handleOnlineStateChange() {
+         if (navigator.onLine) {
+-          if (syncUser && hasPendingLocalChanges()) queueCloudSave();
+-          else if (syncUser) renderSyncStatus('SYNCED');
++          if (syncUser) {
++            renderSyncStatus('SYNCING', hasPendingLocalChanges() ? 'Connection restored. Saving pending local changes…' : 'Connection restored. Waiting for Firebase confirmation…');
++            if (hasPendingLocalChanges()) queueCloudSave();
++          } else {
++            renderSyncStatus('LOCAL');
++          }
+           return;
+         }
+         renderSyncStatus('OFFLINE');
+@@ -1900,7 +1942,8 @@
+       }
+ 
+       function haptic(pattern = 22) {
+-        try { navigator.vibrate?.(pattern); } catch (error) {}
++        if (!('vibrate' in navigator) || !isMobileViewport()) return;
++        try { navigator.vibrate(pattern); } catch (error) {}
+       }
+ 
+       function mobileTabForZone(zone) {
+@@ -3234,6 +3277,9 @@
+         } else merged.gptRefinements = clone(state.gptRefinements || DEFAULT_DATA.gptRefinements);
+ 
+         merged.codexSummary = mergeCodexSummary(state.codexSummary || DEFAULT_DATA.codexSummary, imported.codexSummary || imported.summary, normalised.codexSummary);
++        ['currentDay', 'recentFocus', 'longTermPatterns', 'monthlyArchives', 'olderDailyArchive'].forEach(field => {
++          if (Object.prototype.hasOwnProperty.call(imported, field)) merged[field] = cloneOrFallback(normalised[field], DEFAULT_DATA[field]);
++        });
+         merged.metadata = { ...clone(DEFAULT_DATA.metadata), ...clone(state.metadata || {}), ...clone(normalised.metadata || {}) };
+         return normalizeData(merged);
+       }
+@@ -3557,7 +3603,7 @@
+       }
+ 
+       function updateEffectsPaused() {
+-        const paused = !entryComposer.hidden || !quickActionsOverlay.hidden || !quickConfirmOverlay.hidden || !historyOverlay.hidden || !detailOverlay.hidden || !healthOverlay.hidden || !importReviewOverlay.hidden || (mobileActionsOverlay && !mobileActionsOverlay.hidden);
++        const paused = !entryComposer.hidden || !quickActionsOverlay.hidden || !quickConfirmOverlay.hidden || !historyOverlay.hidden || !detailOverlay.hidden || !healthOverlay.hidden || !syncOverlay.hidden || !importReviewOverlay.hidden || (mobileActionsOverlay && !mobileActionsOverlay.hidden);
+         document.body.classList.toggle('effects-paused', paused);
+       }
+ 
+@@ -3568,8 +3614,11 @@
+         const keyboardOffset = Math.max(0, layoutHeight - height);
+         document.documentElement.style.setProperty('--keyboard-offset', `${keyboardOffset}px`);
+         const isCompact = window.matchMedia('(max-width: 760px)').matches;
++        const hasTouchIntent = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
++        const active = document.activeElement;
++        const editingField = Boolean(active && active.matches?.('input, textarea, select, [contenteditable="true"]'));
+         document.body.classList.toggle('is-mobile-layout', isCompact);
+-        document.body.classList.toggle('keyboard-open', isCompact && keyboardOffset > 90);
++        document.body.classList.toggle('keyboard-open', isCompact && hasTouchIntent && editingField && keyboardOffset > 90);
+       }
+ 
+       function updateHUDDate() {
diff -ruN personal_codex_patch_40_mobile_input_polish/sw.js personal_codex_patch_41_data_integrity/sw.js
--- personal_codex_patch_40_mobile_input_polish/sw.js	2026-05-23 22:02:30.683401972 +0000
+++ personal_codex_patch_41_data_integrity/sw.js	2026-05-23 22:15:06.844455586 +0000
@@ -1,4 +1,4 @@
-const CACHE_NAME = 'personal-codex-pwa-v40';
+const CACHE_NAME = 'personal-codex-pwa-v41';
 const APP_SHELL = [
   './',
   './index.html',
