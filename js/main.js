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

  // --- 1. Progress Bar & Topbar Scroll Effect ---
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
    topbar.classList.toggle('scrolled', scrollTop > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- 5. Mobile Sidebar Toggle ---
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });

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
    tocItems.push({ element: sectionLink, target: section, group: currentGroup });

    section.querySelectorAll('.subsection[id]').forEach(sub => {
      const h3 = sub.querySelector('h3');
      if (!h3) return;
      const link = document.createElement('a');
      link.className = 'toc-item toc-h3';
      link.href = '#' + sub.id;
      link.textContent = h3.textContent;
      tocContainer.appendChild(link);
      tocItems.push({ element: link, target: sub, group: currentGroup });
    });
  });

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

  // Search
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;
    const groupVis = new Map();

    tocItems.forEach(item => {
      const match = !term || item.element.textContent.toLowerCase().includes(term);
      item.element.classList.toggle('toc-hidden', !match);
      if (match) visibleCount++;
      if (item.group) {
        if (!groupVis.has(item.group)) groupVis.set(item.group, false);
        if (match) groupVis.set(item.group, true);
      }
    });

    groupVis.forEach((vis, g) => g.classList.toggle('toc-hidden', !vis));

    let noRes = tocContainer.querySelector('.toc-no-results');
    if (visibleCount === 0 && term) {
      if (!noRes) {
        noRes = document.createElement('div');
        noRes.className = 'toc-no-results';
        noRes.textContent = '검색 결과 없음';
        tocContainer.appendChild(noRes);
      }
      noRes.style.display = 'block';
    } else if (noRes) {
      noRes.style.display = 'none';
    }
  });
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
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
