/* ==========================================================================
   TASK 3 INTERACTIVE LOGIC (OPTION A: DETAIL MODAL POPUP & SEARCH)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM ELEM SELECTORS
  const navToggleBtn = document.querySelector('.js-nav-toggle');
  const navMenu = document.querySelector('.js-nav-menu');
  
  const themeToggleBtn = document.querySelector('.js-theme-toggle');
  const themeIcon = document.querySelector('.js-theme-icon');
  
  const searchBtn = document.querySelector('.js-search-btn');
  const searchModal = document.querySelector('.js-search-modal');
  const searchCloseBtn = document.querySelector('.js-search-close');
  const searchInput = document.querySelector('.js-search-input');
  const searchResults = document.querySelector('.js-search-results');

  const detailModal = document.querySelector('.js-detail-modal');
  const detailCloseBtns = document.querySelectorAll('.js-detail-close');
  const openModuleBtns = document.querySelectorAll('.js-open-module');

  // MODAL TARGET NODES
  const modalImg = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpec1 = document.getElementById('modal-spec1');
  const modalSpec2 = document.getElementById('modal-spec2');
  const modalSpec3 = document.getElementById('modal-spec3');

  // THEME MANAGEMENT
  let currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('is-light-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('is-light-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
  }

  // EVENT LISTENERS

  // Mobile Navigation Toggle
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
    });
  }

  // Theme Switcher Trigger
  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
      if (document.body.classList.contains('is-light-mode')) {
        document.body.classList.remove('is-light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('is-light-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // OPTION A: MODULE DETAIL MODAL OPEN TRIGGER
  openModuleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const tag = btn.getAttribute('data-tag');
      const img = btn.getAttribute('data-img');
      const desc = btn.getAttribute('data-desc');
      const spec1 = btn.getAttribute('data-spec1');
      const spec2 = btn.getAttribute('data-spec2');
      const spec3 = btn.getAttribute('data-spec3');

      if (modalTitle) modalTitle.textContent = title;
      if (modalTag) modalTag.textContent = tag;
      if (modalImg) modalImg.src = img;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalSpec1) modalSpec1.textContent = spec1;
      if (modalSpec2) modalSpec2.textContent = spec2;
      if (modalSpec3) modalSpec3.textContent = spec3;

      detailModal.classList.add('is-visible');
    });
  });

  // Close Detail Modal Triggers
  detailCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      detailModal.classList.remove('is-visible');
    });
  });

  // Live Search Implementation
  if (searchBtn && searchModal && searchCloseBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('is-visible');
      searchInput.value = '';
      searchResults.innerHTML = '<p class="search-hint">Type above to filter modules live...</p>';
      setTimeout(() => searchInput.focus(), 100);
    });

    searchCloseBtn.addEventListener('click', () => {
      searchModal.classList.remove('is-visible');
    });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.js-card');
      
      if (query === '') {
        searchResults.innerHTML = '<p class="search-hint">Type above to filter modules live...</p>';
        return;
      }

      let matches = [];
      cards.forEach((card) => {
        const title = card.querySelector('.js-card-title')?.textContent || '';
        const text = card.querySelector('.card-text')?.textContent || '';
        if (title.toLowerCase().includes(query) || text.toLowerCase().includes(query)) {
          matches.push({ id: card.id, title: title });
        }
      });

      if (matches.length > 0) {
        searchResults.innerHTML = matches.map(item => `
          <div class="search-result-item" data-target="${item.id}">
            <strong>${item.title}</strong>
          </div>
        `).join('');

        document.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              searchModal.classList.remove('is-visible');
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      } else {
        searchResults.innerHTML = '<p class="search-hint">No matching modules found.</p>';
      }
    });
  }

  // Backdrop Overlay Clicks to Close
  window.addEventListener('click', (event) => {
    if (event.target === searchModal) {
      searchModal.classList.remove('is-visible');
    }
    if (event.target === detailModal) {
      detailModal.classList.remove('is-visible');
    }
  });
});