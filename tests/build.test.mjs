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
    const prose = page.slice(page.indexOf('id="prose"'), page.indexOf('class="pager"'));
    const ids = [...prose.matchAll(/<h[23] id="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids, index.chapters[ch.id].toc.map((t) => t[2]), ch.id);
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

test('no long dashes anywhere in the output pages', () => {
  for (const f of ['index.html', 'app.html', '404.html', ...book.chapters.map((c) => `${c.id}/index.html`)]) {
    assert.doesNotMatch(read(f), /[\u2013\u2014]/, f);
  }
});
