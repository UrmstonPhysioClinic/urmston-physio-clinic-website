// Shared nav builder — call with isRoot=true from index, isRoot=false from /pages/
function buildNav(isRoot) {
  const base = isRoot ? '' : '../';
  const bookUrl = 'https://eu.halaxy.com/book/urmston-physio-clinic/location/313854';
  return `
<nav>
  <div class="nav-inner">
    <a href="${base}index.html" class="nav-logo">
      <img src="${base}images/logo.png" alt="Urmston Physio Clinic" />
    </a>
    <ul class="nav-links">
      <li><a href="${base}pages/services.html">Services</a></li>
      <li><a href="${base}pages/team.html">Our Team</a></li>
      <li><a href="${base}pages/about.html">About</a></li>
      <li><a href="${base}pages/contact.html">Contact</a></li>
      <li><a href="${bookUrl}" target="_blank" rel="noopener" class="nav-cta">Book Now</a></li>
    </ul>
    <div class="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </div>
  </div>
  <div class="mobile-menu">
    <a href="${base}pages/services.html">Services</a>
    <a href="${base}pages/team.html">Our Team</a>
    <a href="${base}pages/about.html">About</a>
    <a href="${base}pages/contact.html">Contact</a>
    <a href="${bookUrl}" target="_blank" rel="noopener" class="nav-cta">Book Now</a>
  </div>
</nav>`;
}

function buildFooter(isRoot) {
  const base = isRoot ? '' : '../';
  const bookUrl = 'https://eu.halaxy.com/book/urmston-physio-clinic/location/313854';
  return `
<footer>
  <div class="container">
    <div class="footer-top">
      <div class="footer-logo">
        <img src="${base}images/logo.png" alt="Urmston Physio Clinic" />
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="${base}pages/services.html">Services</a>
        <a href="${base}pages/team.html">Our Team</a>
        <a href="${base}pages/about.html">About</a>
        <a href="${base}pages/contact.html">Contact</a>
        <a href="${bookUrl}" target="_blank" rel="noopener">Book Now</a>
      </nav>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© ${new Date().getFullYear()} Urmston Physio Clinic. All rights reserved. 220 Higher Road, Urmston, Manchester, M41 9BH.</p>
      <div class="footer-badges">
        <span class="footer-badge">HCPC Registered</span>
        <span class="footer-badge">CSP Member</span>
      </div>
    </div>
  </div>
</footer>`;
}
