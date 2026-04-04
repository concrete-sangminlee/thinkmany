/* ========================================
   승원이 연구 가이드 - JavaScript
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

  // --- 2. Generate TOC from Sections/Subsections ---
  // IDs are on .section and .subsection divs, not on headings directly
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

    // Section-level TOC item
    const sectionLink = document.createElement('a');
    sectionLink.className = 'toc-item';
    sectionLink.href = '#' + section.id;
    sectionLink.textContent = h2.textContent;
    sectionLink.setAttribute('data-target', section.id);
    tocContainer.appendChild(sectionLink);
    tocItems.push({ element: sectionLink, target: section, group: currentGroup });

    // Subsection TOC items
    const subsections = section.querySelectorAll('.subsection[id]');
    subsections.forEach(sub => {
      const h3 = sub.querySelector('h3');
      if (!h3) return;
      const link = document.createElement('a');
      link.className = 'toc-item toc-h3';
      link.href = '#' + sub.id;
      link.textContent = h3.textContent;
      link.setAttribute('data-target', sub.id);
      tocContainer.appendChild(link);
      tocItems.push({ element: link, target: sub, group: currentGroup });
    });
  });

  // --- 3. Active TOC Tracking ---
  let activeItem = null;

  const observerOptions = {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const item = tocItems.find(t => t.target.id === id);
        if (item) {
          if (activeItem) activeItem.element.classList.remove('active');
          item.element.classList.add('active');
          activeItem = item;
          // Scroll TOC item into view
          item.element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    });
  }, observerOptions);

  tocItems.forEach(item => observer.observe(item.target));

  // --- 4. TOC Search Filter ---
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;
    const groupVisibility = new Map();

    tocItems.forEach(item => {
      const match = !term || item.element.textContent.toLowerCase().includes(term);
      item.element.classList.toggle('toc-hidden', !match);
      if (match) visibleCount++;

      if (item.group) {
        if (!groupVisibility.has(item.group)) groupVisibility.set(item.group, false);
        if (match) groupVisibility.set(item.group, true);
      }
    });

    // Toggle group label visibility
    groupVisibility.forEach((visible, group) => {
      group.classList.toggle('toc-hidden', !visible);
    });

    // No results message
    let noResults = tocContainer.querySelector('.toc-no-results');
    if (visibleCount === 0 && term) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.className = 'toc-no-results';
        noResults.textContent = '검색 결과 없음';
        tocContainer.appendChild(noResults);
      }
      noResults.style.display = 'block';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  });

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

  // Close sidebar when clicking TOC item on mobile
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
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // --- 7. Scroll Reveal Animations ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- 8. Tab System ---
  document.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    const container = btn.closest('.tab-container');
    if (!container) return;

    const tabId = btn.getAttribute('data-tab');

    // Deactivate all in this container
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    const content = container.querySelector('#' + tabId);
    if (content) content.classList.add('active');
  });

  // --- 9. Handle resize ---
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeSidebar();
    }
  });
});
