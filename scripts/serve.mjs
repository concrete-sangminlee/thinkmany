#!/usr/bin/env node
/**
 * Local preview: builds _site/ and serves it at http://localhost:8000/thinkmany/,
 * the same path layout as GitHub Pages. Rebuilds when sources change.
 *
 *   node scripts/serve.mjs [--port 8000]
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '_site');
const args = process.argv.slice(2);
const PORT = Number(args.includes('--port') ? args[args.indexOf('--port') + 1] : process.env.PORT || 8000);
const BASE = '/thinkmany/';
const SITE_URL = `http://localhost:${PORT}${BASE}`;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

/**
 * Each build runs in a fresh process, so edits to the build scripts and to
 * the modules the build shares with the browser (js/views.js, js/lib/) show
 * up too, not only content. Changes during a build queue one more build.
 */
let building = null;
let again = false;
function rebuild() {
  if (building) {
    again = true;
    return building;
  }
  building = new Promise((resolve) => {
    execFile(process.execPath, [path.join(ROOT, 'scripts', 'build.mjs')], { cwd: ROOT, env: { ...process.env, SITE_URL } }, (err, _stdout, stderr) => {
      if (err) console.error(`빌드 실패\n${stderr.trim() || err.message}`);
      else {
        if (stderr.trim()) console.warn(stderr.trim());
        console.log(`[${new Date().toLocaleTimeString('ko-KR')}] 빌드 완료`);
      }
      resolve();
    });
  }).then(() => {
    building = null;
    if (again) {
      again = false;
      return rebuild();
    }
  });
  return building;
}

await rebuild();

let timer = null;
const schedule = () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 150);
};
for (const dir of ['content', 'css', 'js', 'templates', 'assets', 'admin', 'scripts']) {
  fs.watch(path.join(ROOT, dir), { recursive: true }, schedule);
}
fs.watch(path.join(ROOT, 'sw.js'), schedule);

http
  .createServer((req, res) => {
    const url = new URL(req.url, SITE_URL);
    if (!url.pathname.startsWith(BASE)) {
      res.writeHead(302, { location: BASE });
      return res.end();
    }
    let file = path.join(OUT, decodeURIComponent(url.pathname.slice(BASE.length)));
    if (!file.startsWith(OUT)) {
      res.writeHead(403);
      return res.end();
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        res.writeHead(301, { location: `${url.pathname}/${url.search}` });
        return res.end();
      }
      file = path.join(file, 'index.html');
    }
    const found = fs.existsSync(file);
    if (!found) file = path.join(OUT, '404.html');
    const body = fs.readFileSync(file);
    res.writeHead(found ? 200 : 404, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(body);
  })
  .listen(PORT, () => console.log(`${SITE_URL} 에서 보는 중 (Ctrl+C로 종료)`));
