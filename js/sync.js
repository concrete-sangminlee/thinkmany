/**
 * Moving reading history (progress, bookmarks, checklist ticks) between
 * devices: as a link (…/thinkmany/#import=…) or as a JSON file. Importing
 * always merges into this device's history after the reader confirms.
 */
import * as store from './lib/store.js';
import { pack, unpack } from './lib/sync-codec.js';
import { html, mount, icon } from './lib/html.js';

const HASH = '#import=';

export function initSync({ root, toast, onImported }) {
  const panel = document.querySelector('[data-sync-panel]');
  const fileInput = panel?.querySelector('[data-sync-file]');

  function describe(s) {
    const parts = [s.done && `완독 ${s.done}장`, s.reading && `읽는 중 ${s.reading}장`, s.bookmarks && `북마크 ${s.bookmarks}개`, s.checks && `체크 ${s.checks}개`].filter(Boolean);
    return parts.length ? parts.join(' · ') : '';
  }

  function refresh() {
    if (!panel) return;
    const text = describe(store.summarize());
    panel.querySelector('[data-sync-summary]').textContent = text || '아직 이 기기에 읽기 기록이 없습니다.';
    for (const b of panel.querySelectorAll('[data-sync="link"], [data-sync="save"]')) b.disabled = !text;
  }

  async function shareLink() {
    const url = `${new URL(root.pathname, location.origin).href}${HASH}${await pack(store.exportData())}`;
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({ title: '연구 많이 된다 읽기 기록', url });
        return;
      } catch {
        /* cancelled: fall back to copying */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast('기록 링크를 복사했습니다. 다른 기기에서 열면 기록을 합칩니다');
    } catch {
      prompt('이 링크를 다른 기기에서 여세요', url);
    }
  }

  function saveFile() {
    const blob = new Blob([JSON.stringify(store.exportData(), null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `thinkmany-reading-history-${new Date().toISOString().slice(0, 10)}.json`; // ASCII: some browsers drop non-ASCII names
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /** Show what would be imported and merge on confirmation. */
  function confirmImport(data) {
    let summary;
    try {
      if (!data || data.app !== 'thinkmany') throw new Error();
      summary = describe(store.summarize(data));
    } catch {
      toast('읽기 기록을 읽지 못했습니다');
      return;
    }
    const dialog = document.createElement('dialog');
    dialog.className = 'help-dialog';
    dialog.setAttribute('aria-labelledby', 'import-title');
    mount(
      dialog,
      html`<div class="help-head">
        <h2 id="import-title">읽기 기록 가져오기</h2>
        <button class="icon-btn" type="button" data-cancel aria-label="닫기">${icon('x')}</button>
      </div>
      <p class="dialog-text">다른 기기의 기록: <strong>${summary || '비어 있음'}</strong></p>
      <p class="help-note">이 기기의 기록과 합칩니다. 지워지는 기록은 없습니다.</p>
      <div class="dialog-actions">
        <button class="btn btn-ghost btn-small" type="button" data-cancel>취소</button>
        <button class="btn btn-primary btn-small" type="button" data-merge>합치기</button>
      </div>`,
    );
    document.body.append(dialog);
    dialog.addEventListener('close', () => dialog.remove());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target.closest('[data-cancel]')) dialog.close();
      if (e.target.closest('[data-merge]')) {
        try {
          const after = store.importData(data);
          toast(`기록을 합쳤습니다. 이제 ${describe(after)}`);
          onImported();
          refresh();
        } catch {
          toast('읽기 기록을 합치지 못했습니다');
        }
        dialog.close();
      }
    });
    dialog.showModal();
    dialog.querySelector('[data-merge]').focus();
  }

  panel?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sync]');
    if (!b) return;
    if (b.dataset.sync === 'link') shareLink();
    else if (b.dataset.sync === 'save') saveFile();
    else if (b.dataset.sync === 'load') fileInput.click();
  });
  fileInput?.addEventListener('change', async () => {
    const file = fileInput.files[0];
    fileInput.value = '';
    if (!file) return;
    try {
      confirmImport(JSON.parse(await file.text()));
    } catch {
      toast('읽기 기록 파일을 읽지 못했습니다');
    }
  });

  refresh();
  return {
    refresh,
    /** Handle an #import=… link on page load. Returns true if the URL had one. */
    async takeFromUrl() {
      if (!location.hash.startsWith(HASH)) return false;
      const payload = location.hash.slice(HASH.length);
      history.replaceState(history.state, '', location.pathname + location.search);
      try {
        confirmImport(await unpack(payload));
      } catch {
        toast('기록 링크가 손상되었습니다');
      }
      return true;
    },
  };
}
