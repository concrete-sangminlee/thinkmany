import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { build, finishProse } from '../scripts/build.mjs';
import { missingChars } from '../scripts/lib/font-chars.mjs';

const SITE = 'https://example.test/book/';
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'thinkmany-build-'));
const { data, book } = await build({ out, siteUrl: SITE, quiet: true });
const read = (rel) => fs.readFileSync(path.join(out, rel), 'utf8');

test.after(() => fs.rmSync(out, { recursive: true, force: true }));

test('content validates without errors', () => {
  assert.deepEqual(data.errors, []);
  assert.equal(data.chapters.length, book.chapters.length);
});

test('every chapter gets a prerendered page with its own head', () => {
  for (const ch of book.chapters) {
    const page = read(`${ch.id}/index.html`);
    assert.ok(page.includes(`<link rel="canonical" href="${SITE}${ch.id}/">`), `${ch.id} canonical`);
    assert.ok(page.includes(`<title>${ch.title.replace(/&/g, '&amp;')} · 연구 많이 된다</title>`), `${ch.id} title`);
    assert.ok(page.includes(`data-prerendered="${ch.id}"`), `${ch.id} hydration marker`);
    assert.ok(page.includes('"@type":"Chapter"'), `${ch.id} JSON-LD`);
    assert.doesNotMatch(page, /\{\{\w+(:\w+)?\}\}/, `${ch.id} has no unfilled placeholders`);
  }
});

test('deployed modules are versioned and the first load skips the markdown parser', () => {
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  for (const f of walk(path.join(out, 'js')).filter((f) => /\.m?js$/.test(f))) {
    const unversioned = [...fs.readFileSync(f, 'utf8').matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bnew URL\(\s*)['"](\.{1,2}\/[^'"]+?\.m?js)['"]/g)];
    assert.deepEqual(unversioned.map((m) => m[1]), [], path.relative(out, f));
  }
  const preloads = [...read('ch05/index.html').matchAll(/rel="modulepreload" href="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(preloads.some((h) => h.includes('/js/app.js?v=')));
  assert.ok(!preloads.some((h) => /marked|purify|markdown\.js|render\.js/.test(h)), 'parser and sanitizer load only when needed');
});

test('index.json stays small; outlines live in toc.json', () => {
  assert.ok(fs.statSync(path.join(out, 'content/index.json')).size < 30 * 1024);
  assert.ok(!read('content/index.json').includes('"toc"'));
});

test('prerendered heading ids match content/toc.json', () => {
  const toc = JSON.parse(read('content/toc.json'));
  for (const ch of book.chapters) {
    const page = read(`${ch.id}/index.html`);
    const start = page.indexOf('id="prose"');
    const end = page.indexOf('<section class="connected"') > 0 ? page.indexOf('<section class="connected"') : page.indexOf('class="pager"');
    const prose = page.slice(start, end);
    const ids = [...prose.matchAll(/<h[23] id="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids, toc[ch.id].map((t) => t[2]), ch.id);
  }
});

test('chapter pages never skip a heading level (h1 title, then h2, h3, ...)', () => {
  for (const ch of book.chapters) {
    const page = read(`${ch.id}/index.html`);
    const start = page.indexOf('<h1 class="chapter-title"');
    const end = page.indexOf('<section class="connected"') > 0 ? page.indexOf('<section class="connected"') : page.indexOf('class="pager"');
    let prev = 0;
    for (const m of page.slice(start, end).matchAll(/<h([1-6])[\s>]/g)) {
      const level = Number(m[1]);
      assert.ok(level <= prev + 1, `${ch.id}: h${prev} followed by h${level}`);
      prev = level;
    }
  }
});

test('chapter pages carry Chapter and BreadcrumbList structured data', () => {
  for (const ch of book.chapters) {
    const page = read(`${ch.id}/index.html`);
    const ld = JSON.parse(/<script type="application\/ld\+json">(.*?)<\/script>/s.exec(page)[1]);
    const byType = Object.fromEntries(ld['@graph'].map((n) => [n['@type'], n]));
    assert.equal(byType.Chapter.url, `${SITE}${ch.id}/`, ch.id);
    const crumbs = byType.BreadcrumbList.itemListElement;
    assert.deepEqual(crumbs.map((c) => c.position), [1, 2, 3]);
    assert.deepEqual(crumbs.map((c) => c.item), [SITE, `${SITE}#${ch.part.id}`, `${SITE}${ch.id}/`]);
    assert.equal(crumbs[2].name, ch.title);
  }
});

test('pages load the book font from this site, and a CDN only while the font has gaps', () => {
  const gaps = missingChars(new URL('..', import.meta.url).pathname);
  assert.match(read('css/styles.css'), /@font-face\s*\{[^}]*'Thinkmany Sans'[^}]*url\('\.\.\/assets\/fonts\/thinkmany-sans\.woff2'\)/);
  assert.ok(fs.existsSync(path.join(out, 'assets/fonts/thinkmany-sans.woff2')));
  assert.match(read('sw.js'), /"assets\/fonts\/thinkmany-sans\.woff2"/, 'the font is precached for offline reading');
  for (const f of ['index.html', 'app.html', '404.html', 'ch01/index.html']) {
    const page = read(f);
    assert.equal((page.match(/rel="preload"[^>]*thinkmany-sans\.woff2/g) ?? []).length, 1, f);
    assert.equal(page.includes('cdn.jsdelivr.net'), gaps.length > 0, `${f}: CDN fallback only when the font lacks characters (${gaps.join(' ')})`);
  }
});

test('math is rendered by the build: no script needed, stylesheet only where there is math', () => {
  let withMath = 0;
  for (const ch of book.chapters) {
    const page = read(`${ch.id}/index.html`);
    const formulas = (page.match(/class="math[^"]*" data-rendered=""/g) ?? []).length;
    assert.ok(!/class="math[^"]*">/.test(page), `${ch.id}: TeX left for the browser`);
    assert.ok(!page.includes('katex-error'), `${ch.id}: a formula failed to render`);
    assert.equal(page.includes('js/vendor/katex/katex.min.css'), formulas > 0, `${ch.id}: KaTeX stylesheet`);
    assert.ok(!page.includes('cdn.jsdelivr.net/npm/katex'), ch.id);
    if (formulas) withMath++;
  }
  assert.ok(withMath >= 5, `${withMath} chapters with math`);
  assert.ok(fs.existsSync(path.join(out, 'js/vendor/katex/fonts/KaTeX_Main-Regular.woff2')));
  assert.ok(!read('sw.js').includes('vendor/katex'), 'KaTeX is not precached: most readers never need its script');
  assert.ok(!read('js/enhance.js').includes('cdn.jsdelivr.net/npm/katex'));
});

test('finishProse strips event handlers from tags and leaves the same words in text alone', () => {
  const html = '<p onclick="x()" class="a">once = true, online = "yes"</p><pre><code>only = 3</code></pre><img src="a.png" onerror=alert(1)>';
  assert.equal(finishProse(html), '<p class="a">once = true, online = "yes"</p><pre><code>only = 3</code></pre><img src="a.png">');
  assert.equal(finishProse('<h2 data-slug="가-나">가 나</h2><script>x</script><a href="javascript:x">y</a>'), '<h2 id="가-나">가 나</h2><a href="#">y</a>');
});

test('assets and links use the configured base path', () => {
  const home = read('index.html');
  assert.ok(home.includes('href="/book/css/styles.css?v='));
  assert.ok(home.includes('href="/book/ch01/"'));
  assert.ok(read('404.html').includes("var base = '/book/'"));
});

test('sitemap, robots and service worker are generated', () => {
  const sitemap = read('sitemap.xml');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, book.chapters.length + 1);
  assert.ok(read('robots.txt').includes(`Sitemap: ${SITE}sitemap.xml`));
  const sw = read('sw.js');
  assert.doesNotMatch(sw, /__VERSION__|__PRECACHE__/);
  assert.match(sw, /"app\.html"/);
  assert.match(sw, /"js\/app\.js"/);
  assert.match(sw, /"content\/toc\.json"/, 'heading search works offline');
  assert.match(sw, /"js\/offline\.js"/);
});

test('the offline save panel knows the book size and the cache it fills', () => {
  const { totals } = JSON.parse(read('content/index.json'));
  assert.ok(totals.bytes > 1e6, 'markdown size for the estimate');
  assert.ok(read('ch01/index.html').includes('data-offline-panel'));
  const cacheName = (file) => /'(thinkmany-pages)'/.exec(fs.readFileSync(new URL(file, import.meta.url), 'utf8'))?.[1];
  assert.equal(cacheName('../js/offline.js'), cacheName('../sw.js'), 'offline.js and sw.js share the pages cache');
});

test('reference graph is symmetric and rendered as connected chapters', () => {
  for (const ch of book.chapters) {
    for (const r of ch.refs) assert.ok(r.backrefs.includes(ch), `${ch.id} -> ${r.id} has a backref`);
    assert.ok(!ch.refs.includes(ch), `${ch.id} does not reference itself`);
    if (ch.refs.length || ch.backrefs.length) assert.ok(read(`${ch.id}/index.html`).includes('class="connected"'), `${ch.id} connected block`);
  }
});

test('chapter pages use their own share card when it exists', () => {
  for (const ch of book.chapters) {
    const card = fs.existsSync(new URL(`../assets/og/${ch.id}.jpg`, import.meta.url));
    const expected = card ? `${SITE}assets/og/${ch.id}.jpg` : `${SITE}assets/og-image.png`;
    assert.ok(read(`${ch.id}/index.html`).includes(`<meta property="og:image" content="${expected}">`), ch.id);
  }
});

test('feed.xml is a well-formed Atom feed linked from every page', () => {
  const feed = read('feed.xml');
  assert.match(feed, /^<\?xml version="1.0" encoding="utf-8"\?>\n<feed xmlns="http:\/\/www.w3.org\/2005\/Atom"/);
  assert.equal((feed.match(/<entry>/g) ?? []).length, (feed.match(/<\/entry>/g) ?? []).length);
  for (const m of feed.matchAll(/<link href="([^"]+)"\/>/g)) assert.ok(m[1].startsWith(SITE), m[1]);
  assert.ok(read('index.html').includes(`href="${SITE}feed.xml"`));
});

test('reformatting commits in .git-blame-ignore-revs never count as an update', (t) => {
  const revs = fs.readFileSync(new URL('../.git-blame-ignore-revs', import.meta.url), 'utf8')
    .split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean);
  assert.ok(revs.length > 0);
  const index = JSON.parse(read('content/index.json'));
  const feed = read('feed.xml');
  for (const rev of revs) {
    let date;
    try {
      date = execFileSync('git', ['show', '-s', '--format=%cI', rev], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    } catch {
      t.skip(`${rev} is not in this checkout`);
      continue;
    }
    for (const [id, c] of Object.entries(index.chapters)) assert.notEqual(c.updated, date, `${id} dated by ${rev}`);
    assert.ok(!feed.includes(rev.slice(0, 7)), `feed lists ${rev}`);
  }
});

test('no long dashes anywhere in the output pages', () => {
  for (const f of ['index.html', 'app.html', '404.html', 'feed.xml', ...book.chapters.map((c) => `${c.id}/index.html`)]) {
    assert.doesNotMatch(read(f), /[\u2013\u2014]/, f);
  }
});
