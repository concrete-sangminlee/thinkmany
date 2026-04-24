// Service Worker for 연구 많이 된다 (thinkmany)
// Strategy: network-first for markdown content, cache-first for core assets, offline fallback

const CACHE_NAME = 'thinkmany-v2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/content/config.json',
  '/assets/favicon.svg',
  '/assets/og-image.svg',
  '/404.html'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: strategy by resource type
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Markdown content files: network first, cache on success, fallback to cache
  if (url.pathname.startsWith('/content/') && url.pathname.endsWith('.md')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // config.json: network first (fresh TOC) with cache fallback
  if (url.pathname === '/content/config.json' || url.pathname.endsWith('/content/config.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Navigation requests (HTML pages): network first with 404 fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() =>
          caches.match(event.request)
            .then(cached => cached || caches.match('/404.html') || caches.match('/index.html'))
        )
    );
    return;
  }

  // Core assets and everything else: cache first with network fallback
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Opportunistically cache successful responses
          if (response && response.ok && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
  );
});

// Message handler: allow manual cache clear from client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0] && event.ports[0].postMessage({ cleared: true });
    });
  }
});
