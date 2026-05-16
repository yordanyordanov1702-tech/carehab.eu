// ── Navigation ──────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobile-nav').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-nav').classList.remove('open');
}

// Active nav link
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Cookie banner ────────────────────────────────────────────
if (localStorage.getItem('carehab_cookieConsent')) {
  const b = document.getElementById('cookie-banner');
  if (b) b.style.display = 'none';
}
function cookieAccept() {
  localStorage.setItem('carehab_cookieConsent', 'accepted');
  document.getElementById('cookie-banner').style.display = 'none';
}
function cookieDecline() {
  localStorage.setItem('carehab_cookieConsent', 'declined');
  document.getElementById('cookie-banner').style.display = 'none';
}

// ── Contact form ─────────────────────────────────────────────
(function() {
  const form = document.querySelector('form[id="contact-form"]');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = 'Изпращане...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('form-error').style.display = 'none';
        form.reset();
        btn.textContent = 'Изпратено ✓';
      } else {
        throw new Error();
      }
    } catch {
      document.getElementById('form-error').style.display = 'block';
      document.getElementById('form-success').style.display = 'none';
      btn.disabled = false;
      btn.textContent = 'Изпрати запитване →';
    }
  });
})();

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
