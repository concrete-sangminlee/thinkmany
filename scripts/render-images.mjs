#!/usr/bin/env node
/**
 * Regenerates the raster images from their sources (dev-only, needs Playwright):
 *   assets/favicon.svg     -> assets/icon-180.png, icon-192.png, icon-512.png
 *   templates/og-image.html -> assets/og-image.png (1200x630 social card)
 *   templates/og-chapter.html -> assets/og/chNN.jpg (one card per chapter)
 *
 * The build uses a chapter's card for its og:image when the file exists and
 * falls back to og-image.png otherwise, so a new chapter works before its
 * card is rendered.
 *
 *   node scripts/render-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadBookData } from './lib/book-data.mjs';
import { escapeHtml } from '../js/lib/markdown.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const data = loadBookData(ROOT);
const { totals } = data.index;

/* Part colours as used by the dark theme in css/styles.css. */
const PART_COLORS = { purple: '#b197fc', blue: '#8f96ff', cyan: '#3fd0e8', green: '#4ade9b', orange: '#fb9a5b', pink: '#f582b6' };

const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ proxy });

try {
  const svg = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(ASSETS, 'favicon.svg')).toString('base64');
  for (const size of [180, 192, 512]) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(`<style>*{margin:0}img{display:block}</style><img src="${svg}" width="${size}" height="${size}">`);
    await page.waitForFunction(() => document.images[0].complete && document.images[0].naturalWidth > 0);
    await page.screenshot({ path: path.join(ASSETS, `icon-${size}.png`), omitBackground: true });
    await page.close();
  }

  const fill = {
    chapters: totals.chapters,
    parts: totals.parts,
    sections: totals.sections.toLocaleString('ko-KR'),
    hours: Math.round(totals.minutes / 60),
  };
  const tpl = path.join(ROOT, 'templates/og-image.html');
  const htmlSrc = fs.readFileSync(tpl, 'utf8').replace(/\{\{(\w+)\}\}/g, (_, k) => fill[k]);
  const tmp = path.join(ROOT, 'templates/.og-render.html');
  fs.writeFileSync(tmp, htmlSrc);
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(ASSETS, 'og-image.png') });
  fs.unlinkSync(tmp);
  await page.close();

  /* ---------- one card per chapter ---------- */
  const chapterTpl = fs.readFileSync(path.join(ROOT, 'templates/og-chapter.html'), 'utf8');
  const outDir = path.join(ASSETS, 'og');
  fs.mkdirSync(outDir, { recursive: true });
  const card = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  let n = 0;
  for (const part of data.config.sections) {
    for (const sub of part.subsections) {
      const c = data.chapters.find((x) => x.id === sub.id);
      if (!c) continue;
      const meta = data.index.chapters[c.id];
      const sections = meta.toc.filter((t) => t[0] === 2).length;
      const lead = c.lead || c.summary.split(/(?<=다\.)\s/)[0];
      const vars = {
        color: PART_COLORS[part.color] ?? PART_COLORS.purple,
        mark: svg,
        part: escapeHtml(part.number),
        partTitle: escapeHtml(part.title),
        title: escapeHtml(c.title),
        size: c.title.length > 16 ? 64 : 76,
        lead: escapeHtml(lead),
        meta: escapeHtml(`약 ${meta.minutes}분 · ${sections}개 섹션 · concrete-sangminlee.github.io/thinkmany`),
        num: escapeHtml(/^ch(\d+)$/.exec(c.id)?.[1] ?? ''),
      };
      await card.setContent(chapterTpl.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? '')), { waitUntil: 'networkidle' });
      await card.evaluate(() => document.fonts.ready);
      await card.screenshot({ path: path.join(outDir, `${c.id}.jpg`), type: 'jpeg', quality: 82 });
      n++;
    }
  }
  console.log(`assets/icon-{180,192,512}.png, assets/og-image.png, assets/og/*.jpg ${n}개 생성`);
} finally {
  await browser.close();
}
