/* ── Indus Impressions — script.js ── */

document.addEventListener('DOMContentLoaded', () => {

  /* PAGE TRANSITION CURTAIN */
  const curtain = document.getElementById('curtain');
  if (curtain) {
    requestAnimationFrame(() => setTimeout(() => curtain.classList.add('up'), 60));

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.endsWith('.html') && !href.startsWith('http') && !href.includes('#')) {
        link.addEventListener('click', e => {
          e.preventDefault();
          curtain.classList.remove('up');
          setTimeout(() => { window.location.href = href; }, 860);
        });
      }
    });
  }

  /* NAVBAR SCROLL */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* MOBILE NAV TOGGLE */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ACTIVE NAV LINK */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* SCROLL REVEAL */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* PRODUCT FILTER */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.prod-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      productCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.transition = 'opacity 0.35s, transform 0.35s';
        if (show) {
          card.style.display = '';
          requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
        } else {
          card.style.opacity  = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { if (card.style.opacity === '0') card.style.display = 'none'; }, 360);
        }
      });
    });
  });

  /* TEAM CARD EXPAND */
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.team-card');
      const exp  = card.classList.toggle('expanded');
      btn.textContent = exp ? 'Read Less' : 'Read More';
    });
  });

  /* LIGHTBOX */
  const lightbox  = document.getElementById('lightbox');
  const lbTitle   = document.getElementById('lb-title');
  const lbMedium  = document.getElementById('lb-medium');
  const lbDesc    = document.getElementById('lb-desc');
  const lbArt     = document.getElementById('lb-art');
  const lbClose   = document.getElementById('lb-close');

  const closeLb = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lightbox) {
    document.querySelectorAll('.exh-item').forEach(item => {
      item.addEventListener('click', () => {
        if (lbTitle)  lbTitle.textContent  = item.dataset.title  || '';
        if (lbMedium) lbMedium.textContent = item.dataset.medium || '';
        if (lbDesc)   lbDesc.textContent   = item.dataset.desc   || '';
        if (lbArt) {
          lbArt.innerHTML = item.querySelector('.exh-img-inner')?.innerHTML || '';
        }
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    if (lbClose) lbClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

});
