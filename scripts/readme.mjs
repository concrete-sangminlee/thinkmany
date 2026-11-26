#!/usr/bin/env node
/**
 * Keeps the book's numbers, reading paths and table of contents in README.md
 * in step with content/: the parts of README.md between
 * `<!-- generated:NAME -->` and `<!-- /generated:NAME -->` are written from
 * the same data the build uses. Everything else in README.md is prose.
 *
 *   npm run readme          rewrite README.md
 *
 * The build warns when README.md has fallen behind (a chapter grew, a title
 * changed), so a "보강" commit is a reminder to run this.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBookData } from './lib/book-data.mjs';
import { createBook } from '../js/lib/book-model.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const README = path.join(ROOT, 'README.md');

const hours = (minutes) => Math.round(minutes / 60);

/** The generated blocks, keyed by name. */
export function readmeBlocks(book, site) {
  const t = book.totals;
  const link = (c) => `${site}${c.id}/`;
  const stats = `${book.parts.length}개 파트 · ${book.chapters.length}개 장 · ${t.sections.toLocaleString('en-US')}개 섹션 · 약 ${Math.round(t.chars / 10000)}만 자 (읽는 데 약 ${hours(t.minutes)}시간)`;

  const paths = book.paths
    .map((p) => `- **${p.title}**: ${p.chapters.map((c) => `[${c.num} ${c.title}](${link(c)})`).join(', ')}`)
    .join('\n');

  const toc = book.parts
    .map((p) => {
      const minutes = p.chapters.reduce((n, c) => n + (c.minutes ?? 0), 0);
      return [
        '<details>',
        `<summary><b>Part ${p.number}. ${p.title}</b> (${p.chapters.length}장 · 약 ${hours(minutes)}시간)</summary>`,
        '',
        ...(p.desc ? [p.desc, ''] : []),
        '| 장 | 제목 | 분량 |',
        '|---:|---|---:|',
        ...p.chapters.map((c) => `| ${c.num} | [${c.title}](${link(c)}) | ${c.minutes ?? ''}분 |`),
        '',
        '</details>',
      ].join('\n');
    })
    .join('\n\n');

  return { stats, paths, toc };
}

/** README text with every generated block replaced; throws if a marker is missing. */
export function fillReadme(text, blocks) {
  let out = text;
  for (const [name, body] of Object.entries(blocks)) {
    const re = new RegExp(`(<!-- generated:${name} -->\\n)[\\s\\S]*?(\\n<!-- /generated:${name} -->)`);
    if (!re.test(out)) throw new Error(`README.md에 <!-- generated:${name} --> 표시가 없습니다`);
    out = out.replace(re, (_, open, close) => `${open}${body}${close}`);
  }
  return out;
}

/** The README as it should be, from the book on disk. */
export function expectedReadme(root = ROOT, data = loadBookData(root)) {
  const book = createBook(data.config, data.index);
  const site = data.config.siteUrl;
  const current = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  return { current, expected: fillReadme(current, readmeBlocks(book, site)) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { current, expected } = expectedReadme();
  if (current === expected) console.log('README.md는 이미 최신입니다');
  else {
    fs.writeFileSync(README, expected);
    console.log('README.md의 숫자, 읽기 경로, 차례를 갱신했습니다');
  }
}
