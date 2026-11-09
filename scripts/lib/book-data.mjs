/**
 * Reads content/ and validates it. Shared by scripts/build.mjs and the tests.
 *
 * Returns the parsed config, each chapter's markdown and analysis, the
 * content/index.json payload, and lists of errors (fail the build) and
 * warnings (printed only).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { analyzeChapter, configureChapterRefs, CHARS_PER_MINUTE } from '../../js/lib/markdown.js';

/** Directories at the site root; a chapter id may not shadow them. */
export const RESERVED_IDS = new Set(['admin', 'assets', 'content', 'css', 'js', 'templates', 'scripts', 'tests', 'app.html', '404.html']);

const DASH = /[\u2013\u2014]/;
const TEXT_FILE = /\.(md|json|html|js|mjs|css|webmanifest|xml|txt|yml)$/;
const SKIP_DIRS = new Set(['.git', 'node_modules', 'vendor', '_site']);

export function loadBookData(root) {
  const contentDir = path.join(root, 'content');
  const errors = [];
  const warnings = [];
  const config = JSON.parse(fs.readFileSync(path.join(contentDir, 'config.json'), 'utf8'));

  /* ---------- config shape ---------- */
  const sectionIds = new Set();
  const chapterIds = new Set();
  const files = new Set();
  for (const part of config.sections) {
    if (sectionIds.has(part.id)) errors.push(`중복된 파트 id: ${part.id}`);
    sectionIds.add(part.id);
    for (const ch of part.subsections) {
      if (chapterIds.has(ch.id)) errors.push(`중복된 챕터 id: ${ch.id}`);
      chapterIds.add(ch.id);
      if (!/^[a-z0-9][a-z0-9-]*$/.test(ch.id)) errors.push(`챕터 id 형식 오류 (영소문자·숫자·-): ${ch.id}`);
      if (RESERVED_IDS.has(ch.id)) errors.push(`챕터 id가 사이트 폴더 이름과 겹침: ${ch.id}`);
      if (files.has(ch.file)) errors.push(`같은 파일을 두 챕터가 사용: ${ch.file}`);
      files.add(ch.file);
      if (!fs.existsSync(path.join(contentDir, ch.file))) errors.push(`${ch.id}: 파일 없음 content/${ch.file}`);
    }
  }
  for (const p of config.paths ?? []) {
    for (const id of p.chapters) {
      if (!chapterIds.has(id)) warnings.push(`읽기 경로 "${p.title}"에 없는 챕터: ${id} (표시하지 않음)`);
    }
  }
  for (const f of fs.readdirSync(contentDir)) {
    if (f.endsWith('.md') && !files.has(f)) warnings.push(`목차에 없는 파일: content/${f}`);
  }
  if (config.siteUrl && !/^https?:\/\/.+\/$/.test(config.siteUrl)) errors.push(`siteUrl은 /로 끝나는 절대 URL이어야 함: ${config.siteUrl}`);

  /* ---------- house style: no em dash (U+2014) or en dash (U+2013) ---------- */
  (function checkDashes(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) checkDashes(p);
        continue;
      }
      if (!TEXT_FILE.test(entry.name)) continue;
      fs.readFileSync(p, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (DASH.test(line)) errors.push(`긴 줄표(U+2014, U+2013) 사용 금지, 쉼표·콜론·괄호로 바꾸세요: ${path.relative(root, p)}:${i + 1}`);
        });
    }
  })(root);

  /* ---------- chapters ---------- */
  const updated = lastContentEdits(root);
  const titles = new Map(config.sections.flatMap((s) => s.subsections.map((c) => [c.id, c.title])));
  const chapters = [];
  const indexChapters = {};
  let totalChars = 0;
  let totalSections = 0;

  for (const part of config.sections) {
    for (const ch of part.subsections) {
      const file = path.join(contentDir, ch.file);
      if (!fs.existsSync(file)) continue;
      const md = fs.readFileSync(file, 'utf8');
      configureChapterRefs({ titles, current: ch.id });
      const info = analyzeChapter(md);
      if (!md.trim()) warnings.push(`${ch.id}: 내용이 비어 있음`);

      const opens = countOutsideCode(md, /<div\b/gi);
      const closes = countOutsideCode(md, /<\/div>/gi);
      if (opens !== closes) warnings.push(`${ch.id}: <div> ${opens}개 / </div> ${closes}개, 짝이 맞지 않음`);

      // Headings: the page title is the h1, sections go ## then ###, never skipping a level.
      // Card, Do/Don't and tab titles are labels (class="card-title" etc.), not headings.
      let prev = 1;
      for (const h of info.outline) {
        if (h.depth === 1) errors.push(`${ch.id}: 본문 중간의 # 제목 "${h.text}" (장 제목이 h1이므로 ##부터 쓰세요)`);
        else if (h.depth > prev + 1) errors.push(`${ch.id}: 제목 단계를 건너뜀 (${'#'.repeat(prev)} 다음 ${'#'.repeat(h.depth)}) "${h.text}"`);
        prev = h.depth;
      }
      for (const { line, tag } of rawHeadings(md)) {
        errors.push(`content/${ch.file}:${line}: HTML <${tag}> 제목 대신 class="card-title", "do-dont-title", "tab-title" 같은 이름표를 쓰세요`);
      }

      const ids = [...md.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
      const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
      if (dupIds.length) warnings.push(`${ch.id}: 중복 HTML id ${[...new Set(dupIds)].join(', ')}`);

      const lead = info.lead && info.lead !== ch.title ? info.lead : '';
      chapters.push({ id: ch.id, file: ch.file, title: ch.title, md, info, lead, summary: summarize(info) });
      indexChapters[ch.id] = {
        lead,
        chars: info.chars,
        minutes: info.minutes,
        updated: updated.get(`content/${ch.file}`) ?? '',
        toc: info.headings.map((h) => [h.depth, h.text, h.id]),
        refs: info.refs,
      };
      totalChars += info.chars;
      totalSections += info.headings.filter((h) => h.depth === 2).length;
    }
  }

  configureChapterRefs();

  const index = {
    charsPerMinute: CHARS_PER_MINUTE,
    totals: {
      parts: config.sections.length,
      chapters: chapters.length,
      sections: totalSections,
      chars: totalChars,
      minutes: Math.round(totalChars / CHARS_PER_MINUTE),
    },
    chapters: indexChapters,
  };

  return { config, chapters, index, errors, warnings };
}

/** Raw HTML heading tags outside fenced code: [{ line, tag }]. */
function rawHeadings(md) {
  const out = [];
  let fence = false;
  md.split('\n').forEach((l, i) => {
    if (/^\s*(```|~~~)/.test(l)) fence = !fence;
    else if (!fence) for (const m of l.matchAll(/<(h[1-6])[\s>]/gi)) out.push({ line: i + 1, tag: m[1].toLowerCase() });
  });
  return out;
}

function countOutsideCode(md, re) {
  const prose = md.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '');
  return (prose.match(re) ?? []).length;
}

/** First ~150 characters of the chapter's opening text, for meta descriptions. */
function summarize(info) {
  const text = (info.sections[0]?.text ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= 150) return text;
  const cut = text.slice(0, 150);
  const end = Math.max(cut.lastIndexOf('다. '), cut.lastIndexOf('. '));
  return end > 60 ? cut.slice(0, end + 2).trim() : `${cut.trim()}…`;
}

/**
 * The most recent content commits ("docs: ..."), newest first:
 * [{ hash, date, subject, body, files }]. Empty outside a git checkout.
 */
export function contentLog(root, limit = 30) {
  try {
    const raw = execFileSync('git', ['log', `-${limit}`, '--format=%x1e%h%x1f%cI%x1f%s%x1f%b%x1f', '--name-only', '--grep=^docs', '--', 'content/'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 32 * 1024 * 1024,
    });
    return raw
      .split('\x1e')
      .filter((r) => r.trim())
      .map((r) => {
        const [hash, date, subject, body, files] = r.split('\x1f');
        return { hash, date, subject: subject.trim(), body: body.trim(), files: files.trim().split('\n').filter(Boolean) };
      });
  } catch {
    return [];
  }
}

/**
 * Commit time (ISO 8601) of the last content commit ("docs: …") per file.
 * Formatting sweeps such as "style:" commits don't count as an update.
 * Returns an empty map outside a git checkout.
 */
function lastContentEdits(root) {
  const out = new Map();
  try {
    const log = execFileSync('git', ['log', '--format=@%cI', '--name-only', '--grep=^docs', '--', 'content/'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 32 * 1024 * 1024,
    });
    let date = '';
    for (const line of log.split('\n')) {
      if (line.startsWith('@')) date = line.slice(1);
      else if (line && !out.has(line)) out.set(line, date);
    }
  } catch {
    /* not a git checkout: no dates */
  }
  return out;
}
