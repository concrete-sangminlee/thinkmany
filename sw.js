/**
 * Service worker: offline reading for 연구 많이 된다.
 *
 * Every path is resolved against the registration scope, so it works both at
 * https://concrete-sangminlee.github.io/thinkmany/ and on a local server.
 *
 * - App shell (HTML/CSS/JS, config, index): precached, network-first.
 * - Chapters (content/*.md): network-first, cached as they are read, so any
 *   chapter opened once stays readable offline.
 * - Cross-origin (fonts, KaTeX): left to the browser's HTTP cache.
 */
const VERSION = 'v3';
const SHELL = `thinkmany-shell-${VERSION}`;
const CONTENT = 'thinkmany-content';
const scope = new URL(self.registration.scope);

const SHELL_FILES = [
  './',
  'index.html',
  '404.html',
  'manifest.webmanifest',
  'css/styles.css',
  'js/app.js',
  'js/book.js',
  'js/render.js',
  'js/search.js',
  'js/search-worker.js',
  'js/lib/html.js',
  'js/lib/markdown.js',
  'js/lib/store.js',
  'js/vendor/marked.esm.js',
  'js/vendor/purify.es.mjs',
  'content/config.json',
  'content/index.json',
  'assets/favicon.svg',
].map((p) => new URL(p, scope).href);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== CONTENT).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = (await cache.match(request, { ignoreSearch: true })) ?? (await caches.match(request, { ignoreSearch: true }));
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await caches.match(new URL('./', scope).href);
      if (shell) return shell;
    }
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  const isChapter = url.pathname.startsWith(new URL('content/', scope).pathname) && url.pathname.endsWith('.md');
  event.respondWith(networkFirst(request, isChapter ? CONTENT : SHELL));
});
