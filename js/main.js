// ── FROSTED GLASS NAV ON SCROLL ──
const nav = document.querySelector('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled
}

// ── MOBILE MENU ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    const [s0, s1, s2] = hamburger.querySelectorAll('span');
    s0.style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    s1.style.opacity   = isOpen ? '0' : '1';
    s2.style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });
}

// ── CONDITIONS DROPDOWN (click-toggled) ──
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  const menu   = dropdown.querySelector('.nav-dropdown-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking a link inside
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// Close dropdowns and mobile menu when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown-menu.open').forEach(m => {
    m.classList.remove('open');
    const t = m.closest('.nav-dropdown')?.querySelector('.nav-dropdown-toggle');
    if (t) t.setAttribute('aria-expanded', 'false');
  });
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  }
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close siblings in same list
    item.closest('.faq-list, .condition-faq-list')
      ?.querySelectorAll('.faq-item.open')
      .forEach(o => { if (o !== item) o.classList.remove('open'); });
    item.classList.toggle('open', !isOpen);
  });
});

// ── COOKIE BANNER ──
(function() {
  const COOKIE_KEY = 'upc_cookie_consent';
  if (localStorage.getItem(COOKIE_KEY)) return; // already decided

  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Show after short delay
  setTimeout(() => banner.classList.remove('hidden'), 800);

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('hidden');
  });
})();
