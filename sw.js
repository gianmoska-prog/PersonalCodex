const CACHE_NAME = 'personal-codex-pwa-v69';
const APP_SHELL = [
  './',
  './index.html',
  './app.css',
  './manifest.webmanifest',
  './assets/icons/favicon.svg',
  './assets/icons/favicon-32.png',
  './assets/icons/favicon.ico',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        const oldKeys = keys.filter(key => key !== CACHE_NAME);
        return Promise.all(oldKeys.map(key => caches.delete(key))).then(() => oldKeys.length);
      })
      .then(deletedCount => self.clients.claim().then(() => deletedCount))
      .then(deletedCount => {
        if (!deletedCount) return null;
        return self.clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(clients => clients.forEach(client => {
            client.postMessage({ type: 'SW_UPDATED', cacheName: CACHE_NAME });
          }));
      })
  );
});

function cacheFirstWithNetworkFill(request, fallbackResponse = null) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => fallbackResponse || new Response('', { status: 408, statusText: 'Offline cache miss' }));
  });
}

function networkFirstWithCacheFallback(request, fallbackResponse = null) {
  return fetch(request).then(response => {
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  }).catch(() => caches.match(request).then(cached => {
    if (cached) return cached;
    return fallbackResponse || new Response('', { status: 408, statusText: 'Offline cache miss' });
  }));
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithNetworkFill(request));
    return;
  }

  if (url.hostname === 'www.gstatic.com' && url.pathname.includes('/firebasejs/')) {
    event.respondWith(networkFirstWithCacheFallback(request));
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirstWithNetworkFill(request));
  }
});
