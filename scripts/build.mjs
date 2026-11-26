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
 * content/index.json and content/toc.json; feed.xml; sitemap.xml; robots.txt;
 * and the static assets.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadBookData, contentLog } from './lib/book-data.mjs';
import { missingChars } from './lib/font-chars.mjs';
import { expectedReadme } from './readme.mjs';
import { createBook } from '../js/lib/book-model.js';
import { setBase } from '../js/lib/paths.js';
import { configureChapterRefs, configureMath, lexChapter, renderTokens, escapeHtml } from '../js/lib/markdown.js';
import katex from '../js/vendor/katex/katex.mjs';
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
  for (const w of data.warnings) warn(w);
  for (const e of data.errors) report('error', e);

  const t = data.index.totals;
  log(`${t.parts}개 파트 · ${t.chapters}개 장 · H2 섹션 ${t.sections}개 · ${(t.chars / 10000).toFixed(1)}만 자 · 약 ${Math.round(t.minutes / 60)}시간 분량`);
  if (data.errors.length) throw new Error(`검증 오류 ${data.errors.length}건`);

  // The reader's font holds only the characters the site used when it was cut.
  const fontGaps = missingChars(ROOT);
  if (fontGaps === null) warn('assets/fonts/thinkmany-sans.woff2가 없습니다. CDN의 Pretendard를 씁니다 (npm run fonts).');
  else if (fontGaps.length) warn(`본문 글꼴에 없는 글자 ${fontGaps.length}개 (${fontGaps.slice(0, 20).join(' ')}): \`npm run fonts\`로 글꼴을 다시 만드세요. 그때까지 이 글자는 CDN의 Pretendard로 채웁니다.`);
  // README.md's numbers and table of contents are generated (scripts/readme.mjs).
  try {
    const readme = expectedReadme(ROOT, data);
    if (readme.current !== readme.expected) warn('README.md: 숫자나 차례가 본문과 다릅니다. `npm run readme`로 갱신하세요.');
  } catch (err) {
    warn(err.message);
  }
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
  // index.json stays tiny (it loads on every page); the per-chapter outlines
  // only matter to search, so they live in toc.json, fetched when search opens.
  const { chapters: withToc, ...indexRest } = data.index;
  const toc = Object.fromEntries(Object.entries(withToc).map(([id, c]) => [id, c.toc]));
  const slim = { ...indexRest, chapters: Object.fromEntries(Object.entries(withToc).map(([id, { toc: _t, ...c }]) => [id, c])) };
  writeFile(out, 'content/index.json', JSON.stringify(slim));
  writeFile(out, 'content/toc.json', JSON.stringify(toc));
  // Full-text search data, split into sections at build time: the search
  // worker fetches this one file instead of all chapters and parsing each.
  writeFile(out, 'content/search.json', JSON.stringify(searchData(data)));

  const version = hashFiles(['css', 'js', 'templates', 'sw.js', 'assets/fonts'].map((p) => path.join(ROOT, p))).slice(0, 10);
  const graph = moduleGraph(path.join(out, 'js'), 'app.js');
  versionModules(path.join(out, 'js'), version);
  const modulepreload = graph.map((m) => `<link rel="modulepreload" href="${base}js/${m}?v=${version}">`).join('\n  ');
  const page = fillIcons(fs.readFileSync(path.join(ROOT, 'templates/page.html'), 'utf8'));
  const fonts = fontTags(base, fontGaps);
  const render = (vars) => fill(page, { base, version, modulepreload, fonts, ...vars });

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
  // Math is rendered here, so a reader sees it at once and without KaTeX's script.
  configureMath((tex, display) => katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'htmlAndMathml' }));
  const katexCss = `<link rel="stylesheet" href="${base}js/vendor/katex/katex.min.css" data-katex>`;
  for (const c of data.chapters) {
    const ch = book.chapter(c.id);
    configureChapterRefs({ titles: book.titles, current: ch.id });
    const { tokens } = lexChapter(c.md);
    const prose = finishProse(renderTokens(tokens));
    const hasMath = prose.includes('class="katex"');
    const url = `${site}${ch.id}/`;
    const title = `${ch.title} · 연구 많이 된다`;
    writeFile(
      out,
      `${ch.id}/index.html`,
      render({
        head: headTags({
          site,
          title,
          url,
          type: 'article',
          description: describe(c),
          jsonLd: chapterJsonLd(book, ch, site, url, c.summary),
          ...(fs.existsSync(path.join(ROOT, `assets/og/${ch.id}.jpg`)) ? { image: `assets/og/${ch.id}.jpg`, imageAlt: `${ch.title}: 연구 많이 된다 ${ch.num}장` } : {}),
        }),
        viewName: 'chapter',
        prerendered: ch.id,
        fonts: hasMath ? `${fonts}\n  ${katexCss}` : fonts,
        sidebar: String(sidebarView(book, { currentId: ch.id })),
        view: String(chapterView(book, ch, { prose })),
      }),
    );
  }
  configureChapterRefs();
  configureMath();

  /* ---------- 404, sitemap, robots, service worker ---------- */
  writeFile(out, '404.html', fill(fs.readFileSync(path.join(ROOT, 'templates/404.html'), 'utf8'), { base, fonts }));
  writeFile(out, 'sitemap.xml', sitemap(book, site));
  writeFile(out, 'feed.xml', atomFeed(book, site, contentLog(ROOT)));
  writeFile(out, 'robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`);
  writeFile(out, 'sw.js', serviceWorker(out, version));

  log(`${path.relative(ROOT, out) || out}/ 작성: 장 ${data.chapters.length}개 페이지 (${((Date.now() - t0) / 1000).toFixed(1)}초)`);
  // Last: a Content-Security-Policy in every reader page (admin/ keeps its own rules).
  for (const rel of ['index.html', 'app.html', '404.html', ...book.chapters.map((c) => `${c.id}/index.html`)]) {
    const p = path.join(out, rel);
    fs.writeFileSync(p, withCsp(fs.readFileSync(p, 'utf8')));
  }

  return { data, book, out };
}

/**
 * Only this site's own scripts run: inline scripts are allowed by hash (the
 * theme script that runs before first paint, the 404 redirect), never by
 * 'unsafe-inline', so an injected <script> or onerror= does nothing. Styles
 * allow inline (KaTeX positions with style attributes). The CDN appears only
 * where a page loads the Pretendard fallback, and for the pinned mermaid
 * build that renders diagrams. A meta CSP cannot set frame-ancestors.
 */
export function withCsp(html) {
  const hashes = [];
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    hashes.push(`'sha256-${crypto.createHash('sha256').update(m[1]).digest('base64')}'`);
  }
  const cdn = html.includes('https://cdn.jsdelivr.net/gh/orioncactus/pretendard') ? ' https://cdn.jsdelivr.net' : '';
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')} https://cdn.jsdelivr.net/npm/mermaid@11.12.0/`.replace(/\s+/g, ' '),
    `style-src 'self' 'unsafe-inline'${cdn}`,
    `font-src 'self'${cdn}`,
    "img-src 'self' data:",
    "connect-src 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ].join('; ');
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}">`;
  return html.replace(/(<meta charset="UTF-8">)/i, `$1\n  ${meta}`);
}

/* ------------------------------------------------------------------ */

/**
 * Print a build message. In GitHub Actions it becomes an annotation, shown on
 * the pull request next to the file (and line) it names when the message
 * starts with "path:line: " or "path: ".
 */
export function report(level, msg, env = process.env) {
  if (!env.GITHUB_ACTIONS) {
    (level === 'error' ? console.error : console.warn)(`${level === 'error' ? '오류' : '경고'}  ${msg}`);
    return;
  }
  const at = /^([\w./-]+\.(?:md|json|html|js|mjs|css)):(?:(\d+):)?\s*/.exec(msg);
  const props = at ? ` file=${at[1]}${at[2] ? `,line=${at[2]}` : ''}` : '';
  // Annotation text is one line; %, CR and LF must be escaped.
  const text = msg.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  console.log(`::${level}${props}::${text}`);
}
const warn = (msg) => report('warning', msg);

/** { chapters: [{ id, sections: [[id, title, text], ...] }] } in book order. */
export function searchData(data) {
  return { v: 1, chapters: data.chapters.map((c) => ({ id: c.id, sections: c.info.sections.map((s) => [s.id, s.title, s.text]) })) };
}

const PRETENDARD_CDN = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';

/**
 * Font tags for the head. Normally one preload of the book's own font file
 * (css/styles.css declares it). While that file lacks characters the site
 * now uses (gaps), or is missing altogether (null), Pretendard from the CDN
 * is loaded as well and fills in: it is next in the font stack.
 */
export function fontTags(base, gaps) {
  const own = `<link rel="preload" href="${base}assets/fonts/thinkmany-sans.woff2" as="font" type="font/woff2" crossorigin>`;
  const cdn = `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>\n  <link rel="stylesheet" href="${PRETENDARD_CDN}">`;
  if (gaps === null) return cdn;
  return gaps.length ? `${own}\n  ${cdn}` : own;
}

function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

const RELATIVE_SPECIFIER = /(\bfrom\s*|\bimport\s*\(\s*|\bnew URL\(\s*)(['"])(\.{1,2}\/[^'"]+?\.m?js)\2/g;
const STATIC_IMPORT = /^\s*(?:import|export)\b[^'";]*?\bfrom\s*['"](\.{1,2}\/[^'"]+)['"]|^\s*import\s*['"](\.{1,2}\/[^'"]+)['"]/gm;

/** Modules `entry` loads statically (dynamic import() is left lazy), entry first. */
function moduleGraph(jsDir, entry) {
  const seen = [];
  const visit = (rel) => {
    if (seen.includes(rel)) return;
    seen.push(rel);
    const src = fs.readFileSync(path.join(jsDir, rel), 'utf8');
    for (const m of src.matchAll(STATIC_IMPORT)) visit(path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1] ?? m[2])));
  };
  visit(entry);
  return seen;
}

/**
 * Append ?v=<version> to every relative module URL in the deployed scripts, so
 * a deploy never mixes a new module with an old one still in a browser cache.
 */
function versionModules(jsDir, version) {
  const walk = (dir) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (/\.m?js$/.test(f)) fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(RELATIVE_SPECIFIER, `$1$2$3?v=${version}$2`));
    }
  };
  walk(jsDir);
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
export function finishProse(htmlText) {
  return htmlText
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?(iframe|object|embed)\b[^>]*>/gi, '')
    // Event handler attributes, inside tags only: prose and code may well say "once = true".
    .replace(/<[a-zA-Z][^>]*>/g, (tag) => tag.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, ''))
    .replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"')
    .replace(/<(h[1-6]) data-slug="([^"]+)">/g, '<$1 id="$2">');
}

function headTags({ site, title, url, type, description, jsonLd, image = 'assets/og-image.png', imageAlt = '연구 많이 된다, 잘 때도 생각날 거야. 대학원생 연구 가이드' }) {
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
    `<meta property="og:image" content="${site}${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<link rel="alternate" type="application/atom+xml" title="연구 많이 된다: 보강 소식" href="${site}feed.xml">`,
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

const BOOK_NAME = '연구 많이 된다. 잘 때도 생각날 거야';
const AUTHOR = { '@type': 'Person', name: 'Sang Min Lee', url: 'https://github.com/concrete-sangminlee' };

function bookJsonLd(book, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: BOOK_NAME,
    alternateName: '대학원생 연구 가이드',
    author: AUTHOR,
    description: bookDescription(book),
    url: site,
    inLanguage: 'ko',
    isAccessibleForFree: true,
    hasPart: book.chapters.map((c) => ({ '@type': 'Chapter', name: c.title, url: `${site}${c.id}/`, position: c.order + 1 })),
  };
}

/** The chapter itself, plus the breadcrumb trail search results show (book > part > chapter). */
function chapterJsonLd(book, ch, site, url, summary) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Chapter',
        name: ch.title,
        description: summary,
        url,
        position: ch.order + 1,
        inLanguage: 'ko',
        author: AUTHOR,
        ...(ch.updated ? { dateModified: ch.updated } : {}),
        isPartOf: { '@type': 'Book', name: BOOK_NAME, url: site },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: '연구 많이 된다', item: site },
          { name: `Part ${ch.part.number} · ${ch.part.title}`, item: `${site}#${ch.part.id}` },
          { name: ch.title, item: url },
        ].map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })),
      },
    ],
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

/* Commit messages are the author's prose: keep the house style in the feed. */
const dedash = (s) => s.replace(/\s*\u2014\s*/g, ': ').replace(/\u2013/g, '-');
const xml = (s) => escapeHtml(dedash(s));

/** Atom feed of content updates, one entry per "docs:" commit. */
function atomFeed(book, site, log) {
  const entries = [];
  for (const c of log) {
    const file = c.files.find((f) => /^content\/.+\.md$/.test(f));
    const ch = file && book.chapters.find((x) => `content/${x.file}` === file);
    if (!ch) continue;
    const detail = /보강\s*[\u2014\u2013-]+\s*(.+)$/.exec(c.subject)?.[1] ?? c.subject.replace(/^docs:\s*/, '');
    const bullets = c.body
      .split('\n')
      .filter((l) => /^\s*-\s+/.test(l))
      .slice(0, 12)
      .map((l) => `<li>${xml(l.replace(/^\s*-\s+/, ''))}</li>`)
      .join('');
    const url = `${site}${ch.id}/`;
    entries.push(`  <entry>
    <title>${xml(`${ch.num ? `${ch.num}. ` : ''}${ch.title}: ${detail}`)}</title>
    <link href="${url}"/>
    <id>${url}#${c.hash}</id>
    <updated>${c.date}</updated>
    <summary type="html">${escapeHtml(bullets ? `<ul>${bullets}</ul>` : xml(c.subject))}</summary>
  </entry>`);
  }
  const updated = log[0]?.date ?? new Date().toISOString();
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ko">
  <title>연구 많이 된다: 보강 소식</title>
  <subtitle>계속 자라는 대학원생 연구 가이드의 최근 보강</subtitle>
  <link href="${site}feed.xml" rel="self"/>
  <link href="${site}"/>
  <id>${site}</id>
  <updated>${updated}</updated>
  <author><name>Sang Min Lee</name></author>
${entries.join('\n')}
</feed>
`;
}

/**
 * sw.js with its version and the reader shell to precache. Stylesheet and
 * modules are listed with "?v=", exactly as pages request them, so the
 * install reuses what the page just downloaded instead of fetching it again.
 */
function serviceWorker(out, version) {
  const files = ['app.html', 'manifest.webmanifest', 'assets/favicon.svg', 'content/config.json', 'content/index.json', 'assets/fonts/thinkmany-sans.woff2']
    .filter((f) => fs.existsSync(path.join(out, f)));
  files.push(`css/styles.css?v=${version}`);
  const walk = (dir) => {
    for (const f of fs.readdirSync(path.join(out, dir)).sort()) {
      const rel = `${dir}/${f}`;
      if (fs.statSync(path.join(out, rel)).isDirectory()) walk(rel);
      // KaTeX is cached when a reader needs it (or saves the book).
      else if (/\.(m?js)$/.test(f) && !rel.startsWith('js/vendor/katex/')) files.push(`${rel}?v=${version}`);
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
