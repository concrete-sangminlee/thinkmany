#!/usr/bin/env node
/**
 * Validates the book and writes content/index.json.
 *
 *   node scripts/build-index.mjs           # validate + write index
 *   node scripts/build-index.mjs --check   # validate only, fail if index is stale
 *
 * index.json gives the reader each chapter's lead line, reading time and
 * outline without downloading the chapters, so the home page, sidebar and
 * heading search work instantly. It is regenerated on every deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeChapter, CHARS_PER_MINUTE } from '../js/lib/markdown.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const OUT = path.join(CONTENT, 'index.json');
const CHECK_ONLY = process.argv.includes('--check');

const errors = [];
const warnings = [];

const config = JSON.parse(fs.readFileSync(path.join(CONTENT, 'config.json'), 'utf8'));

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
    if (files.has(ch.file)) errors.push(`같은 파일을 두 챕터가 사용: ${ch.file}`);
    files.add(ch.file);
    if (!fs.existsSync(path.join(CONTENT, ch.file))) errors.push(`${ch.id}: 파일 없음 content/${ch.file}`);
  }
}

for (const p of config.paths ?? []) {
  for (const id of p.chapters) {
    if (!chapterIds.has(id)) warnings.push(`읽기 경로 "${p.title}"에 없는 챕터: ${id} (표시하지 않음)`);
  }
}

for (const f of fs.readdirSync(CONTENT)) {
  if (f.endsWith('.md') && !files.has(f)) warnings.push(`목차에 없는 파일: content/${f}`);
}

/* ---------- chapters ---------- */
const chapters = {};
let totalChars = 0;
let totalSections = 0;

function countTags(md, re) {
  // Ignore fenced code so examples like "<div>" in code blocks don't count.
  const prose = md.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '');
  return (prose.match(re) ?? []).length;
}

for (const part of config.sections) {
  for (const ch of part.subsections) {
    const file = path.join(CONTENT, ch.file);
    if (!fs.existsSync(file)) continue;
    const md = fs.readFileSync(file, 'utf8');
    const info = analyzeChapter(md);

    if (!md.trim()) warnings.push(`${ch.id}: 내용이 비어 있음`);

    const opens = countTags(md, /<div\b/gi);
    const closes = countTags(md, /<\/div>/gi);
    if (opens !== closes) warnings.push(`${ch.id}: <div> ${opens}개 / </div> ${closes}개 — 짝이 맞지 않음`);

    const ids = [...md.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupIds.length) warnings.push(`${ch.id}: 중복 HTML id ${[...new Set(dupIds)].join(', ')}`);

    chapters[ch.id] = {
      lead: info.lead && info.lead !== ch.title ? info.lead : '',
      chars: info.chars,
      minutes: info.minutes,
      toc: info.headings.map((h) => [h.depth, h.text, h.id]),
    };
    totalChars += info.chars;
    totalSections += info.headings.filter((h) => h.depth === 2).length;
  }
}

const index = {
  charsPerMinute: CHARS_PER_MINUTE,
  totals: {
    parts: config.sections.length,
    chapters: Object.keys(chapters).length,
    sections: totalSections,
    chars: totalChars,
    minutes: Math.round(totalChars / CHARS_PER_MINUTE),
  },
  chapters,
};

/* ---------- report ---------- */
for (const w of warnings) console.warn(`경고  ${w}`);
for (const e of errors) console.error(`오류  ${e}`);

const json = JSON.stringify(index) + '\n';
const t = index.totals;
console.log(
  `${t.parts}개 파트 · ${t.chapters}개 챕터 · H2 섹션 ${t.sections}개 · ` +
    `${(t.chars / 10000).toFixed(1)}만 자 · 약 ${Math.round(t.minutes / 60)}시간 분량`,
);

if (errors.length) process.exit(1);

if (CHECK_ONLY) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (current !== json) {
    console.error('content/index.json이 최신이 아닙니다. `node scripts/build-index.mjs`를 실행하세요.');
    process.exit(1);
  }
  console.log('content/index.json 최신 상태');
} else {
  fs.writeFileSync(OUT, json);
  console.log(`content/index.json 작성 (${(Buffer.byteLength(json) / 1024).toFixed(0)} KB)`);
}
