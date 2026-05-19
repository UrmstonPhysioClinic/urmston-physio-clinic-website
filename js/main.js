// ── HERO VIDEO ──
const heroVideo = document.querySelector('.hero-video-wrap video');
if (heroVideo) {
  heroVideo.playbackRate = 0.75;
  const FADE = 1.8;
  let looping = false;

  heroVideo.addEventListener('timeupdate', () => {
    if (looping || !heroVideo.duration) return;
    const remaining = heroVideo.duration - heroVideo.currentTime;
    if (remaining < FADE) {
      heroVideo.style.opacity = Math.max(0, remaining / FADE);
    }
  });

  heroVideo.addEventListener('ended', () => {
    looping = true;
    heroVideo.currentTime = 0;
    heroVideo.play();
    heroVideo.style.transition = `opacity ${FADE}s linear`;
    heroVideo.style.opacity = '1';
    setTimeout(() => {
      heroVideo.style.transition = '';
      looping = false;
    }, FADE * 1000);
  });
}

// ── FACILITIES VIDEO ──
const facilitiesVideo = document.querySelector('.facilities-video-wrap video');
if (facilitiesVideo) {
  facilitiesVideo.playbackRate = 0.9;
  const overlay = facilitiesVideo.nextElementSibling;
  const FADE = 0.8;
  let looping = false;

  facilitiesVideo.addEventListener('timeupdate', () => {
    if (looping || !facilitiesVideo.duration) return;
    const remaining = facilitiesVideo.duration - facilitiesVideo.currentTime;
    if (remaining < FADE) {
      overlay.style.opacity = String(1 - (remaining / FADE));
    }
  });

  facilitiesVideo.addEventListener('ended', () => {
    looping = true;
    facilitiesVideo.currentTime = 0;
    facilitiesVideo.play();
    overlay.style.transition = `opacity ${FADE}s ease`;
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.transition = '';
      looping = false;
    }, FADE * 1000);
  });
}

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

// ── MOBILE CONDITIONS SUBMENU ──
const mobileSubToggle = document.querySelector('.mobile-submenu-toggle');
const mobileSubItems  = document.querySelector('.mobile-submenu-items');
if (mobileSubToggle && mobileSubItems) {
  mobileSubToggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = mobileSubItems.classList.toggle('open');
    mobileSubToggle.setAttribute('aria-expanded', open);
  });
  mobileSubItems.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileSubItems.classList.remove('open');
    mobileSubToggle.setAttribute('aria-expanded', 'false');
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
