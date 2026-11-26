/**
 * Service worker: offline reading for 연구 많이 된다.
 *
 * scripts/build.mjs fills in VERSION and PRECACHE. Every path is resolved
 * against the registration scope, so the same file works at
 * https://concrete-sangminlee.github.io/thinkmany/ and on the dev server.
 *
 * - Files whose URL carries this deploy's "?v=" never change: the cache
 *   answers them first (the install step stores exactly those URLs).
 * - Everything else same-origin is network-first, so a deploy is visible on
 *   the next load; responses are cached as they arrive.
 * - Pages, chapter markdown and the search data go to a cache that outlives
 *   deploys (a book saved for offline reading), keyed without query strings
 *   so links with ?utm=... do not pile up copies.
 * - Offline, a chapter page or markdown file opened before is served from
 *   the cache. Any other page falls back to app.html, the empty reader shell.
 * - Fonts and KaTeX are served from this site, so they follow the same rules.
 *   Cross-origin requests are left alone.
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

/** Files a saved book needs (math, search data): kept with the pages, across deploys. */
const KEPT = /\/js\/vendor\/katex\/|\/content\/(search|toc)\.json$/;

async function networkFirst(request) {
  const url = new URL(request.url);
  if (url.searchParams.get('v') === VERSION) {
    const hit = await caches.match(request);
    if (hit) return hit;
  }
  const keep = request.mode === 'navigate' || /\.md$/.test(url.pathname) || KEPT.test(url.pathname);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(keep ? PAGES : SHELL);
      // Long-lived entries are stored without their query string.
      cache.put(keep ? url.origin + url.pathname : request, response.clone());
    }
    return response;
  } catch (err) {
    // Offline: the exact file first, then any version of it.
    const cached = (await caches.match(request)) ?? (await caches.match(request, { ignoreSearch: true }));
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
