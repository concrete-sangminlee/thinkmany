/**
 * Saving the whole book for offline reading.
 *
 * The service worker keeps every page and markdown file it serves in its
 * pages cache, so a chapter opened once opens again without a network. This
 * fills that cache with every chapter's markdown up front: offline, any
 * chapter then opens in the reader (app.html renders a chapter from its
 * markdown), and full-text search works too.
 */
import { chapterUrl } from './book.js';

/** The service worker's cache for pages and markdown (see sw.js). */
const PAGES = 'thinkmany-pages';
const PARALLEL = 4;

export function initOffline({ book, toast }) {
  const panel = document.querySelector('[data-offline-panel]');
  if (!panel || !('caches' in window) || !('serviceWorker' in navigator)) return { refresh() {} };

  const note = panel.querySelector('[data-offline-summary]');
  const button = panel.querySelector('[data-offline="save"]');
  const meter = panel.querySelector('[data-offline-meter]');
  const urls = book.chapters.map(chapterUrl);
  const mb = book.totals?.bytes ? Math.max(1, Math.round(book.totals.bytes / 1e6)) : 0;
  let saving = false;

  async function savedCount() {
    const cache = await caches.open(PAGES);
    const have = new Set((await cache.keys()).map((r) => r.url));
    return urls.filter((u) => have.has(u)).length;
  }

  /** Show the panel only where the service worker runs, with what is saved. */
  async function refresh() {
    if (saving) return;
    const reg = await navigator.serviceWorker.getRegistration().catch(() => null);
    panel.hidden = !reg;
    if (!reg) return;
    const n = await savedCount().catch(() => 0);
    const all = n === urls.length;
    note.textContent = all
      ? `책 전체(${urls.length}개 장)가 이 기기에 있어 인터넷 없이도 읽을 수 있습니다.`
      : n
        ? `${urls.length}개 장 중 ${n}개가 이 기기에 있습니다. 한 번 연 장은 인터넷 없이도 열립니다.`
        : '한 번 연 장은 인터넷 없이도 열립니다.';
    button.textContent = all ? '새 내용으로 다시 저장' : `책 전체 저장${mb ? ` (약 ${mb}MB)` : ''}`;
  }

  function setMeter(done) {
    meter.setAttribute('aria-valuenow', String(done));
    meter.firstElementChild.style.transform = `scaleX(${done / urls.length})`;
  }

  async function save() {
    saving = true;
    button.disabled = true;
    meter.setAttribute('aria-valuemax', String(urls.length));
    setMeter(0);
    meter.hidden = false;
    note.textContent = `${urls.length}개 장을 저장하는 중입니다.`;
    // Ask the browser not to evict the saved book under storage pressure.
    navigator.storage?.persist?.().catch(() => {});

    let failed = 0;
    try {
      const cache = await caches.open(PAGES);
      let next = 0;
      let done = 0;
      const worker = async () => {
        while (next < urls.length) {
          const url = urls[next++];
          try {
            const r = await fetch(url, { cache: 'no-cache' });
            if (!r.ok) throw new Error(String(r.status));
            await cache.put(url, r);
          } catch {
            failed++;
          }
          setMeter(++done);
        }
      };
      await Promise.all(Array.from({ length: PARALLEL }, worker));
    } catch {
      failed = urls.length;
    }

    saving = false;
    button.disabled = false;
    meter.hidden = true;
    await refresh();
    toast(
      failed
        ? `${failed}개 장을 저장하지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요`
        : '책 전체를 저장했습니다. 인터넷 없이도 읽을 수 있습니다',
    );
  }

  button.addEventListener('click', () => saving || save());
  return { refresh };
}
