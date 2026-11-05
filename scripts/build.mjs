#!/usr/bin/env node
/**
 * Builds the site into _site/.
 *
 *   node scripts/build.mjs            validate content, then write _site/
 *   node scripts/build.mjs --check    validate only
 *   node scripts/build.mjs --out dir  write somewhere else
 *
 * SITE_URL overrides config.siteUrl (the dev server uses it).
 *
 * Output: a prerendered page per chapter (/chNN/index.html) with its own
 * title, description, canonical URL, Open Graph tags and JSON-LD, so search
 * engines and link previews see every chapter; the home page; app.html (the
 * empty reader shell, the service worker's offline fallback); 404.html;
 * content/index.json; sitemap.xml; robots.txt; and the static assets.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadBookData } from './lib/book-data.mjs';
import { createBook } from '../js/lib/book-model.js';
import { setBase } from '../js/lib/paths.js';
import { configureChapterRefs, lexChapter, renderTokens, escapeHtml } from '../js/lib/markdown.js';
import { icon } from '../js/lib/html.js';
import { sidebarView, homeView, chapterView } from '../js/views.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const OUT = path.resolve(ROOT, args.includes('--out') ? args[args.indexOf('--out') + 1] : '_site');

/** Files and folders copied to the site as they are. */
const STATIC = ['css', 'js', 'assets', 'content', 'admin', 'sw.js', 'manifest.webmanifest', '.nojekyll'];

export async function build({ out = OUT, check = CHECK_ONLY, siteUrl = process.env.SITE_URL, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const t0 = Date.now();
  const data = loadBookData(ROOT);
  for (const w of data.warnings) console.warn(`경고  ${w}`);
  for (const e of data.errors) console.error(`오류  ${e}`);

  const t = data.index.totals;
  log(`${t.parts}개 파트 · ${t.chapters}개 장 · H2 섹션 ${t.sections}개 · ${(t.chars / 10000).toFixed(1)}만 자 · 약 ${Math.round(t.minutes / 60)}시간 분량`);
  if (data.errors.length) throw new Error(`검증 오류 ${data.errors.length}건`);
  if (check) return { data };

  const site = siteUrl ?? data.config.siteUrl;
  if (!site) throw new Error('content/config.json에 siteUrl이 없습니다');
  const base = new URL(site).pathname;
  setBase(base);
  const book = createBook(data.config, data.index);

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  for (const item of STATIC) {
    const src = path.join(ROOT, item);
    if (fs.existsSync(src)) fs.cpSync(src, path.join(out, item), { recursive: true });
  }
  writeFile(out, 'content/index.json', JSON.stringify(data.index));

  const version = hashFiles(['css', 'js', 'templates', 'sw.js'].map((p) => path.join(ROOT, p))).slice(0, 10);
  const page = fillIcons(fs.readFileSync(path.join(ROOT, 'templates/page.html'), 'utf8'));
  const render = (vars) => fill(page, { base, version, ...vars });

  /* ---------- home ---------- */
  writeFile(
    out,
    'index.html',
    render({
      head: headTags({ site, title: '연구 많이 된다 · 대학원생 연구 가이드', url: site, type: 'website', description: bookDescription(book), jsonLd: bookJsonLd(book, site) }),
      viewName: 'home',
      prerendered: 'home',
      sidebar: String(sidebarView(book)),
      view: String(homeView(book)),
    }),
  );

  /* ---------- reader shell (offline fallback) ---------- */
  writeFile(
    out,
    'app.html',
    render({
      head: `<title>연구 많이 된다</title>\n  <meta name="robots" content="noindex">`,
      viewName: 'loading',
      prerendered: '',
      sidebar: '',
      view: '<div class="boot" aria-label="불러오는 중"><span></span><span></span><span></span></div>',
    }),
  );

  /* ---------- chapters ---------- */
  for (const c of data.chapters) {
    const ch = book.chapter(c.id);
    configureChapterRefs({ titles: book.titles, current: ch.id });
    const { tokens } = lexChapter(c.md);
    const prose = finishProse(renderTokens(tokens));
    const url = `${site}${ch.id}/`;
    const title = `${ch.title} · 연구 많이 된다`;
    writeFile(
      out,
      `${ch.id}/index.html`,
      render({
        head: headTags({ site, title, url, type: 'article', description: describe(c), jsonLd: chapterJsonLd(book, ch, site, url, c.summary) }),
        viewName: 'chapter',
        prerendered: ch.id,
        sidebar: String(sidebarView(book, { currentId: ch.id })),
        view: String(chapterView(book, ch, { prose })),
      }),
    );
  }
  configureChapterRefs();

  /* ---------- 404, sitemap, robots, service worker ---------- */
  writeFile(out, '404.html', fill(fs.readFileSync(path.join(ROOT, 'templates/404.html'), 'utf8'), { base }));
  writeFile(out, 'sitemap.xml', sitemap(book, site));
  writeFile(out, 'robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`);
  writeFile(out, 'sw.js', serviceWorker(out, version));

  log(`${path.relative(ROOT, out) || out}/ 작성: 장 ${data.chapters.length}개 페이지 (${((Date.now() - t0) / 1000).toFixed(1)}초)`);
  return { data, book, out };
}

/* ------------------------------------------------------------------ */

function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

function fillIcons(tpl) {
  return tpl.replace(/\{\{icon:(\w+)\}\}/g, (_, name) => String(icon(name, name === 'moon' || name === 'sun' ? `theme-${name}` : '')));
}

function writeFile(out, rel, body) {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body);
}

function hashFiles(paths) {
  const h = crypto.createHash('sha256');
  const walk = (p) => {
    if (fs.statSync(p).isDirectory()) for (const f of fs.readdirSync(p).sort()) walk(path.join(p, f));
    else h.update(fs.readFileSync(p));
  };
  for (const p of paths) if (fs.existsSync(p)) walk(p);
  return h.digest('hex');
}

/**
 * Prerendered chapter HTML: content/*.md is first-party, but strip anything
 * executable anyway, and turn heading data-slug into ids so #anchors work
 * before the script loads.
 */
function finishProse(htmlText) {
  return htmlText
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?(iframe|object|embed)\b[^>]*>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"')
    .replace(/<(h[1-6]) data-slug="([^"]+)">/g, '<$1 id="$2">');
}

function headTags({ site, title, url, type, description, jsonLd }) {
  const d = escapeHtml(description.slice(0, 200));
  const t = escapeHtml(title);
  const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}">`,
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="연구 많이 된다">`,
    `<meta property="og:locale" content="ko_KR">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:image" content="${site}assets/og-image.png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="연구 많이 된다, 잘 때도 생각날 거야. 대학원생 연구 가이드">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n  ');
}

function describe(c) {
  if (!c.lead) return c.summary;
  return `${c.lead}${/[.?!"'”’]$/.test(c.lead) ? '' : '.'} ${c.summary}`;
}

function bookDescription(book) {
  return `박사 과정의 시행착오를 줄이기 위한 ${book.chapters.length}개의 장. 논문, 실험, AI, 멘탈, 커리어를 한국 공학 대학원 현실에 맞춰 정리한 실전 가이드.`;
}

const AUTHOR = { '@type': 'Person', name: 'Sang Min Lee', url: 'https://github.com/concrete-sangminlee' };

function bookJsonLd(book, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: '연구 많이 된다. 잘 때도 생각날 거야',
    alternateName: '대학원생 연구 가이드',
    author: AUTHOR,
    description: bookDescription(book),
    url: site,
    inLanguage: 'ko',
    isAccessibleForFree: true,
    hasPart: book.chapters.map((c) => ({ '@type': 'Chapter', name: c.title, url: `${site}${c.id}/`, position: c.order + 1 })),
  };
}

function chapterJsonLd(book, ch, site, url, summary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    name: ch.title,
    description: summary,
    url,
    position: ch.order + 1,
    inLanguage: 'ko',
    author: AUTHOR,
    ...(ch.updated ? { dateModified: ch.updated } : {}),
    isPartOf: { '@type': 'Book', name: '연구 많이 된다. 잘 때도 생각날 거야', url: site },
  };
}

function sitemap(book, site) {
  const newest = book.recent[0]?.updated;
  const url = (loc, lastmod) => `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    url(site, newest),
    ...book.chapters.map((c) => url(`${site}${c.id}/`, c.updated)),
    '</urlset>',
    '',
  ].join('\n');
}

/** sw.js with its version and the reader shell to precache. */
function serviceWorker(out, version) {
  const files = ['app.html', 'manifest.webmanifest', 'assets/favicon.svg', 'content/config.json', 'content/index.json', 'css/styles.css'];
  const walk = (dir) => {
    for (const f of fs.readdirSync(path.join(out, dir)).sort()) {
      const rel = `${dir}/${f}`;
      if (fs.statSync(path.join(out, rel)).isDirectory()) walk(rel);
      else if (/\.(m?js)$/.test(f)) files.push(rel);
    }
  };
  walk('js');
  return fs
    .readFileSync(path.join(ROOT, 'sw.js'), 'utf8')
    .replace('__VERSION__', version)
    .replace('/*__PRECACHE__*/', files.map((f) => JSON.stringify(f)).join(', '));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
