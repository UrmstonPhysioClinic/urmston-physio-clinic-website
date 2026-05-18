// ── NAV ──
const nav = document.querySelector('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── MOBILE MENU ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const [s0,s1,s2] = hamburger.querySelectorAll('span');
    s0.style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    s1.style.opacity   = open ? '0' : '1';
    s2.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  }));
}

// ── CONDITIONS DROPDOWN ──
document.querySelectorAll('.nav-dropdown').forEach(dd => {
  const toggle = dd.querySelector('.nav-dropdown-toggle');
  const menu   = dd.querySelector('.nav-dropdown-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
});

// Close on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown-menu.open').forEach(m => {
    m.classList.remove('open');
    m.closest('.nav-dropdown')?.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded','false');
  });
  if (mobileMenu?.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger?.setAttribute('aria-expanded','false');
    hamburger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  }
});

// ── SCROLL REVEAL ──
new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
.observe
? (() => {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); o.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  })()
: document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.contains('open');
    item.closest('.faq-list, .cond-faq-list')?.querySelectorAll('.faq-item.open').forEach(o => { if (o !== item) o.classList.remove('open'); });
    item.classList.toggle('open', !open);
  });
});

// ── COOKIE BANNER ──
(function() {
  const KEY = 'upc_cookie_consent';
  if (localStorage.getItem(KEY)) return;
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  setTimeout(() => banner.classList.add('visible'), 900);
  document.getElementById('cookie-accept')?.addEventListener('click', () => { localStorage.setItem(KEY,'accepted'); banner.classList.remove('visible'); });
  document.getElementById('cookie-decline')?.addEventListener('click', () => { localStorage.setItem(KEY,'declined'); banner.classList.remove('visible'); });
})();
