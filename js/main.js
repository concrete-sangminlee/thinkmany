/* ========================================
   연구 가이드 - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Elements ---
  const progressBar = document.getElementById('progress-bar');
  const topbar = document.getElementById('topbar');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuToggle = document.querySelector('.menu-toggle');
  const searchInput = document.getElementById('search-input');
  const tocContainer = document.getElementById('toc-container');
  const searchResults = document.getElementById('search-results');
  const backToTop = document.getElementById('back-to-top');
  const bookmarkFilter = document.getElementById('bookmark-filter');
  const readProgressLabel = document.getElementById('read-progress-label');
  const shortcutsOverlay = document.getElementById('shortcuts-overlay');

  // --- State ---
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const readProgress = JSON.parse(localStorage.getItem('readProgress') || '[]');
  let bookmarkFilterActive = false;

  // --- 1. Progress Bar & Topbar Scroll Effect ---
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
    topbar.classList.toggle('scrolled', scrollTop > 50);

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollTop > 500);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Back to Top ---
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 5. Mobile Sidebar Toggle ---
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    searchInput.focus();
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  tocContainer.addEventListener('click', e => {
    if (e.target.classList.contains('toc-item') && window.innerWidth <= 900) {
      closeSidebar();
    }
  });

  // --- 6. Smooth Scroll for Anchor Links ---
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // --- 8. Tab System ---
  document.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const container = btn.closest('.tab-container');
    if (!container) return;
    const tabId = btn.getAttribute('data-tab');
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = container.querySelector('#' + tabId);
    if (content) content.classList.add('active');
  });

  // --- 9. Handle resize ---
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeSidebar();
  });

  // --- 10. Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  function setTheme(mode) {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '🌙';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.textContent = '☀️';
    }
    localStorage.setItem('theme', mode);
  }

  setTheme(savedTheme || 'light');

  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // --- Print / PDF ---
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', async () => {
      // Load all content before printing
      if (window._loadAllContent) await window._loadAllContent();
      window.print();
    });
  }

  // --- Full-text Search ---
  let searchDebounce = null;

  searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounce);
    const term = searchInput.value.trim();

    // Always filter TOC
    filterTOC(term);

    // Full-text search with debounce
    if (term.length >= 2) {
      searchDebounce = setTimeout(() => fullTextSearch(term), 300);
    } else {
      if (searchResults) searchResults.hidden = true;
    }
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.blur();
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', e => {
    if (searchResults && !searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.hidden = true;
    }
  });

  async function fullTextSearch(term) {
    if (!searchResults) return;

    // Load all content if not yet loaded
    if (window._searchIndex && window._searchIndex.size === 0 && window._loadAllContent) {
      searchResults.innerHTML = '<div class="search-loading">콘텐츠 로딩 중...</div>';
      searchResults.hidden = false;
      await window._loadAllContent();
    }

    const results = [];
    const lowerTerm = term.toLowerCase();

    if (window._searchIndex) {
      window._searchIndex.forEach((text, id) => {
        const lowerText = text.toLowerCase();
        const idx = lowerText.indexOf(lowerTerm);
        if (idx !== -1) {
          const start = Math.max(0, idx - 30);
          const end = Math.min(text.length, idx + term.length + 30);
          let snippet = (start > 0 ? '...' : '') +
            text.slice(start, idx) +
            '<mark>' + text.slice(idx, idx + term.length) + '</mark>' +
            text.slice(idx + term.length, end) +
            (end < text.length ? '...' : '');

          const el = document.getElementById(id);
          const title = el ? (el.querySelector('h3')?.textContent || id) : id;
          results.push({ id, title, snippet });
        }
      });
    }

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-loading">검색 결과 없음</div>';
    } else {
      searchResults.innerHTML = results.slice(0, 10).map(r =>
        `<a class="search-result-item" href="#${r.id}">
          <div class="search-result-title">${r.title}</div>
          <div class="search-result-snippet">${r.snippet}</div>
        </a>`
      ).join('');
    }
    searchResults.hidden = false;
  }

  // --- Bookmark Filter ---
  if (bookmarkFilter) {
    bookmarkFilter.addEventListener('click', () => {
      bookmarkFilterActive = !bookmarkFilterActive;
      bookmarkFilter.classList.toggle('active', bookmarkFilterActive);
      applyBookmarkFilter();
    });
  }

  function applyBookmarkFilter() {
    if (!window._tocItems) return;
    window._tocItems.forEach(item => {
      if (bookmarkFilterActive) {
        const isBookmarked = bookmarks.includes(item.target.id);
        item.element.classList.toggle('toc-hidden', !isBookmarked);
      } else {
        item.element.classList.remove('toc-hidden');
      }
    });
    // Hide/show group labels
    if (window._tocGroups) {
      window._tocGroups.forEach((items, group) => {
        const hasVisible = items.some(item => !item.element.classList.contains('toc-hidden'));
        group.classList.toggle('toc-hidden', !hasVisible);
      });
    }
  }

  // --- Bookmark Click Handler ---
  document.addEventListener('click', e => {
    const btn = e.target.closest('.bookmark-btn');
    if (!btn) return;
    const subId = btn.dataset.subsection;
    if (!subId) return;
    const idx = bookmarks.indexOf(subId);
    if (idx === -1) {
      bookmarks.push(subId);
      btn.classList.add('bookmarked');
      btn.textContent = '★';
    } else {
      bookmarks.splice(idx, 1);
      btn.classList.remove('bookmarked');
      btn.textContent = '☆';
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  });

  // --- Reading Progress Tracking ---
  function initReadingProgress() {
    const subsections = document.querySelectorAll('.subsection[id]');
    if (!subsections.length) return;

    const readObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          const id = entry.target.id;
          if (!readProgress.includes(id)) {
            readProgress.push(id);
            localStorage.setItem('readProgress', JSON.stringify(readProgress));
            updateReadProgressUI();
          }
        }
      });
    }, { threshold: 0.7 });

    subsections.forEach(sub => readObserver.observe(sub));
    updateReadProgressUI();
  }

  function updateReadProgressUI() {
    // Update TOC read indicators
    if (window._tocItems) {
      window._tocItems.forEach(item => {
        item.element.classList.toggle('read', readProgress.includes(item.target.id));
      });
    }
    // Update label
    const total = document.querySelectorAll('.subsection[id]').length;
    if (readProgressLabel) {
      readProgressLabel.textContent = `${readProgress.length}/${total} 읽음`;
    }
  }

  // Expose for use after dynamic content loads
  window._initReadingProgress = initReadingProgress;

  // --- Touch Gestures for Sidebar ---
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);

    if (dy > 30) return; // vertical gesture, ignore

    if (touchStartX < 30 && dx > 50 && !sidebar.classList.contains('open')) {
      openSidebar();
    } else if (sidebar.classList.contains('open') && dx < -50) {
      closeSidebar();
    }
  }, { passive: true });

  // --- Keyboard Navigation ---
  document.addEventListener('keydown', e => {
    // Skip if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      if (e.key === 'Escape') {
        e.target.blur();
        closeSidebar();
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        closeSidebar();
        if (shortcutsOverlay) shortcutsOverlay.hidden = true;
        break;
      case '/':
        e.preventDefault();
        searchInput.focus();
        if (window.innerWidth <= 900) openSidebar();
        break;
      case 'j':
        navigateSection(1);
        break;
      case 'k':
        navigateSection(-1);
        break;
      case 't':
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
        break;
      case 'd':
        themeToggle.click();
        break;
      case '?':
        if (shortcutsOverlay) shortcutsOverlay.hidden = !shortcutsOverlay.hidden;
        break;
    }

    // Ctrl+K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      if (window.innerWidth <= 900) openSidebar();
    }
  });

  // Shortcuts overlay close
  if (shortcutsOverlay) {
    shortcutsOverlay.querySelector('.shortcuts-close')?.addEventListener('click', () => {
      shortcutsOverlay.hidden = true;
    });
    shortcutsOverlay.addEventListener('click', e => {
      if (e.target === shortcutsOverlay) shortcutsOverlay.hidden = true;
    });
  }

  function navigateSection(direction) {
    const sections = Array.from(document.querySelectorAll('.section[id], .subsection[id]'));
    if (!sections.length) return;

    const scrollY = window.scrollY + 100;
    let currentIdx = -1;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) {
        currentIdx = i;
        break;
      }
    }

    const nextIdx = Math.max(0, Math.min(sections.length - 1, currentIdx + direction));
    sections[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// --- Global functions called after dynamic content loads ---

let _tocObserver = null;

function initTOC() {
  if (_tocObserver) _tocObserver.disconnect();

  const tocContainer = document.getElementById('toc-container');
  const searchInput = document.getElementById('search-input');
  tocContainer.innerHTML = '';

  const sections = document.querySelectorAll('#content .section[id]');
  const tocItems = [];
  const tocGroups = new Map();
  let currentGroup = null;

  sections.forEach(section => {
    const h2 = section.querySelector('.section-header h2');
    if (!h2) return;

    const groupLabel = document.createElement('div');
    groupLabel.className = 'toc-group-label';
    groupLabel.textContent = h2.textContent;
    tocContainer.appendChild(groupLabel);
    currentGroup = groupLabel;

    const sectionLink = document.createElement('a');
    sectionLink.className = 'toc-item';
    sectionLink.href = '#' + section.id;
    sectionLink.textContent = h2.textContent;
    tocContainer.appendChild(sectionLink);
    const itemData = { element: sectionLink, target: section, group: currentGroup };
    tocItems.push(itemData);
    if (!tocGroups.has(currentGroup)) tocGroups.set(currentGroup, []);
    tocGroups.get(currentGroup).push(itemData);

    section.querySelectorAll('.subsection[id]').forEach(sub => {
      const h3 = sub.querySelector('h3');
      if (!h3) return;

      // Add bookmark button
      if (!h3.querySelector('.bookmark-btn')) {
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.dataset.subsection = sub.id;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const isBookmarked = bookmarks.includes(sub.id);
        bookmarkBtn.textContent = isBookmarked ? '★' : '☆';
        if (isBookmarked) bookmarkBtn.classList.add('bookmarked');
        h3.appendChild(bookmarkBtn);
      }

      // Add reading time
      if (!h3.querySelector('.reading-time')) {
        const mdContent = sub.querySelector('.md-content');
        if (mdContent && mdContent.textContent.trim()) {
          const charCount = mdContent.textContent.replace(/\s/g, '').length;
          const minutes = Math.max(1, Math.round(charCount / 500));
          const timeSpan = document.createElement('span');
          timeSpan.className = 'reading-time';
          timeSpan.textContent = `약 ${minutes}분`;
          h3.appendChild(timeSpan);
        }
      }

      const link = document.createElement('a');
      link.className = 'toc-item toc-h3';
      link.href = '#' + sub.id;
      link.textContent = h3.childNodes[0]?.textContent || h3.textContent;
      tocContainer.appendChild(link);
      const subData = { element: link, target: sub, group: currentGroup };
      tocItems.push(subData);
      if (!tocGroups.has(currentGroup)) tocGroups.set(currentGroup, []);
      tocGroups.get(currentGroup).push(subData);
    });
  });

  // Expose for bookmark filter and reading progress
  window._tocItems = tocItems;
  window._tocGroups = tocGroups;

  // Active tracking
  let activeItem = null;
  _tocObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = tocItems.find(t => t.target.id === entry.target.id);
        if (item) {
          if (activeItem) activeItem.element.classList.remove('active');
          item.element.classList.add('active');
          activeItem = item;
          item.element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

  tocItems.forEach(item => _tocObserver.observe(item.target));

  // Apply read progress
  const readProgress = JSON.parse(localStorage.getItem('readProgress') || '[]');
  tocItems.forEach(item => {
    item.element.classList.toggle('read', readProgress.includes(item.target.id));
  });

  // Update read progress label
  const total = document.querySelectorAll('.subsection[id]').length;
  const label = document.getElementById('read-progress-label');
  if (label) label.textContent = `${readProgress.length}/${total} 읽음`;

  // Init reading progress observer
  if (window._initReadingProgress) window._initReadingProgress();
}

// TOC filter (exposed for search)
function filterTOC(term) {
  if (!window._tocItems) return;
  const lower = term.toLowerCase().trim();
  let visibleCount = 0;

  window._tocItems.forEach(item => {
    const match = !lower || item.element.textContent.toLowerCase().includes(lower);
    item.element.classList.toggle('toc-hidden', !match);
    if (match) visibleCount++;
  });

  if (window._tocGroups) {
    window._tocGroups.forEach((items, group) => {
      const hasVisible = items.some(item => !item.element.classList.contains('toc-hidden'));
      group.classList.toggle('toc-hidden', !hasVisible);
    });
  }

  const tocContainer = document.getElementById('toc-container');
  let noRes = tocContainer.querySelector('.toc-no-results');
  if (visibleCount === 0 && lower) {
    if (!noRes) {
      noRes = document.createElement('div');
      noRes.className = 'toc-no-results';
      noRes.setAttribute('aria-live', 'polite');
      noRes.textContent = '검색 결과 없음';
      tocContainer.appendChild(noRes);
    }
    noRes.style.display = 'block';
  } else if (noRes) {
    noRes.style.display = 'none';
  }
}

function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal:not(.animated)').forEach(el => revealObserver.observe(el));
}

// --- Post-render enhancements (code copy, table wrap, cross-refs) ---
function initPostRender() {
  // Code block copy buttons
  document.querySelectorAll('.md-content pre:not([data-enhanced])').forEach(pre => {
    pre.dataset.enhanced = 'true';
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.textContent = '복사';
    copyBtn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = '복사됨!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = '복사';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
    wrapper.appendChild(copyBtn);
  });

  // Table responsive wrapper
  document.querySelectorAll('.md-content table:not([data-enhanced])').forEach(table => {
    table.dataset.enhanced = 'true';
    if (table.parentElement.classList.contains('table-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Mermaid diagram rendering
  if (typeof mermaid !== 'undefined') {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default';
    mermaid.initialize({ startOnLoad: false, theme });
    document.querySelectorAll('.md-content pre code.language-mermaid:not([data-enhanced])').forEach(code => {
      code.dataset.enhanced = 'true';
      const pre = code.parentElement;
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = code.textContent;
      pre.parentNode.replaceChild(div, pre);
    });
    mermaid.run();
  }

  // Cross-reference enhancement
  document.querySelectorAll('.md-content a[href^="#"]:not([data-enhanced])').forEach(link => {
    link.dataset.enhanced = 'true';
    const targetId = link.getAttribute('href').slice(1);
    if (!targetId || !targetId.match(/^ch\d+|^[a-z]+-/)) return;

    link.classList.add('cross-ref');
    link.addEventListener('mouseenter', () => {
      // Show tooltip with target content preview
      if (window._searchIndex && window._searchIndex.has(targetId)) {
        const text = window._searchIndex.get(targetId);
        const preview = text.slice(0, 100) + (text.length > 100 ? '...' : '');
        const tooltip = document.createElement('div');
        tooltip.className = 'cross-ref-tooltip';
        tooltip.textContent = preview;
        link.appendChild(tooltip);
      }
    });
    link.addEventListener('mouseleave', () => {
      const tooltip = link.querySelector('.cross-ref-tooltip');
      if (tooltip) tooltip.remove();
    });
  });
}

// Call after each content load
const _origLoadMd = window._postRenderInit;
window._postRenderInit = function() {
  initPostRender();
  if (_origLoadMd) _origLoadMd();
};
