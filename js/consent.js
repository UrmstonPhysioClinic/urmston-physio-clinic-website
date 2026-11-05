// ── CONSENT, ANALYTICS AND MEASUREMENT ──
// Google Consent Mode v2, basic mode: no Google tag loads and no Google
// cookies are set until the visitor clicks Accept. On Accept we send a
// "granted" consent signal, then load GA4. Google Maps embeds also wait
// for consent, or for the visitor to choose to load a map.

(function () {
  var KEY = 'upc_cookie_consent';
  var GA_ID = 'G-DQG3MYNNQ5';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }
  function accepted() { return getChoice() === 'accepted'; }

  // ── GA4 ──
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, {
      linker: { domains: ['urmstonphysioclinic.com', 'eu.halaxy.com'] }
    });
  }

  function revokeGA() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
    // Remove any Google Analytics cookies already set on this domain.
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid') {
        ['', '; domain=.urmstonphysioclinic.com', '; domain=' + location.hostname].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  // Events are only sent for visitors who have accepted, so nothing
  // recorded before consent is sent later.
  window.upcTrack = function (name, params) {
    if (!accepted()) return;
    gtag('event', name, params || {});
  };

  // ── GOOGLE MAPS EMBEDS ──
  function loadMap(wrap) {
    var frame = wrap.querySelector('iframe[data-src]');
    if (!frame) return;
    frame.src = frame.getAttribute('data-src');
    frame.removeAttribute('data-src');
    wrap.classList.add('map-loaded');
  }
  function loadAllMaps() {
    document.querySelectorAll('.map-wrap').forEach(loadMap);
  }

  // ── BANNER ──
  function banner() { return document.getElementById('cookie-banner'); }
  function showBanner() { var b = banner(); if (b) b.classList.add('visible'); }
  function hideBanner() { var b = banner(); if (b) b.classList.remove('visible'); }

  function onAccept() {
    setChoice('accepted');
    hideBanner();
    loadGA();
    loadAllMaps();
  }
  function onDecline() {
    var wasAccepted = accepted();
    setChoice('declined');
    hideBanner();
    if (wasAccepted) revokeGA();
  }

  if (accepted()) loadGA();

  document.addEventListener('DOMContentLoaded', function () {
    if (accepted()) loadAllMaps();
    if (!getChoice()) setTimeout(showBanner, 900);

    var acc = document.getElementById('cookie-accept');
    var dec = document.getElementById('cookie-decline');
    if (acc) acc.addEventListener('click', onAccept);
    if (dec) dec.addEventListener('click', onDecline);

    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
    });
    document.querySelectorAll('.map-load-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { loadMap(btn.closest('.map-wrap')); });
    });
  });

  // ── CLICK TRACKING: phone, email and booking buttons ──
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var where = a.closest('nav, .mobile-menu') ? 'header'
      : a.closest('footer') ? 'footer'
      : a.closest('.hero, .page-hero, .condition-hero') ? 'hero'
      : 'body';
    if (href.indexOf('tel:') === 0) {
      upcTrack('phone_click', { link_location: where });
    } else if (href.indexOf('mailto:') === 0) {
      upcTrack('email_click', { link_location: where });
    } else if (href.indexOf('halaxy.com/book') !== -1 || href === '/book') {
      upcTrack('booking_click', { link_location: where, link_text: (a.textContent || '').trim().slice(0, 40) });
    }
  }, true);
})();
