/**
 * Service worker: offline reading for 연구 많이 된다.
 *
 * scripts/build.mjs fills in VERSION and PRECACHE. Every path is resolved
 * against the registration scope, so the same file works at
 * https://concrete-sangminlee.github.io/thinkmany/ and on the dev server.
 *
 * - Everything same-origin is network-first, so a deploy is visible on the
 *   next load; responses are cached as they arrive.
 * - Offline, a chapter page or markdown file opened before is served from
 *   the cache. Any other page falls back to app.html, the empty reader shell.
 * - Cross-origin requests (fonts, KaTeX) are left to the HTTP cache.
 */
const VERSION = '__VERSION__';
const PRECACHE = [/*__PRECACHE__*/];

const SHELL = `thinkmany-shell-${VERSION}`;
const PAGES = 'thinkmany-pages';
const scope = new URL(self.registration.scope);
const shellUrl = new URL('app.html', scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE.map((p) => new URL(p, scope).href)))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== PAGES).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const isPage = request.mode === 'navigate' || /\.md$/.test(new URL(request.url).pathname);
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(isPage ? PAGES : SHELL)).put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await caches.match(shellUrl);
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
  if (url.pathname.startsWith(new URL('admin/', scope).pathname)) return;
  event.respondWith(networkFirst(request));
});
