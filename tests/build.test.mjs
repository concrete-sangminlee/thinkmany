import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { build } from '../scripts/build.mjs';

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

test('prerendered heading ids match content/index.json', () => {
  const index = JSON.parse(read('content/index.json'));
  for (const ch of book.chapters) {
    const page = read(`${ch.id}/index.html`);
    const start = page.indexOf('id="prose"');
    const end = page.indexOf('<section class="connected"') > 0 ? page.indexOf('<section class="connected"') : page.indexOf('class="pager"');
    const prose = page.slice(start, end);
    const ids = [...prose.matchAll(/<h[23] id="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids, index.chapters[ch.id].toc.map((t) => t[2]), ch.id);
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

test('no long dashes anywhere in the output pages', () => {
  for (const f of ['index.html', 'app.html', '404.html', 'feed.xml', ...book.chapters.map((c) => `${c.id}/index.html`)]) {
    assert.doesNotMatch(read(f), /[\u2013\u2014]/, f);
  }
});
