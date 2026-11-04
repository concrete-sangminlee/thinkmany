#!/usr/bin/env node
/**
 * Regenerates the raster images from their sources (dev-only, needs Playwright):
 *   assets/favicon.svg     -> assets/icon-180.png, icon-192.png, icon-512.png
 *   scripts/og-image.html  -> assets/og-image.png (1200x630 social card)
 *
 *   node scripts/build-index.mjs && node scripts/render-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const { totals } = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/index.json'), 'utf8'));

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
  const tpl = path.join(ROOT, 'scripts/og-image.html');
  const htmlSrc = fs.readFileSync(tpl, 'utf8').replace(/\{\{(\w+)\}\}/g, (_, k) => fill[k]);
  const tmp = path.join(ROOT, 'scripts/.og-render.html');
  fs.writeFileSync(tmp, htmlSrc);
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(ASSETS, 'og-image.png') });
  fs.unlinkSync(tmp);
  console.log('assets/icon-{180,192,512}.png, assets/og-image.png 생성');
} finally {
  await browser.close();
}
