(function () {
  'use strict';

  /* Header shadow */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu */
  var toggle = document.getElementById('mobileToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    var menuIcon = document.getElementById('menuIcon');
    var closeIcon = document.getElementById('closeIcon');
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
      if (menuIcon) menuIcon.style.display = open ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = open ? 'block' : 'none';
    };
    toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* Certificate images: show placeholder when the file is not available yet */
  Array.prototype.forEach.call(document.querySelectorAll('.cert-frame img'), function (img) {
    var fallback = img.parentNode.querySelector('.cert-missing');
    var fail = function () {
      img.style.display = 'none';
      if (fallback) fallback.hidden = false;
      img.parentNode.setAttribute('data-unavailable', 'true');
    };
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* Lightbox for certificates */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var lastFocus = null;
    var close = function () {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    var open = function (src, caption, trigger) {
      lastFocus = trigger || null;
      lbImg.src = src;
      lbImg.alt = caption;
      lbCap.textContent = caption;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    };
    Array.prototype.forEach.call(document.querySelectorAll('.cert-frame'), function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('data-unavailable') === 'true') return;
        open(btn.getAttribute('data-full'), btn.getAttribute('data-caption') || '', btn);
      });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lb-close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }

  /* Enrolment form — static site: composes an e-mail to the team */
  var form = document.getElementById('enrollForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };
      var course = get('curs');
      var lines = [
        'Nume: ' + get('nume'),
        'E-mail: ' + get('email'),
        'Telefon: ' + get('telefon'),
        'Curs: ' + course,
        'Experiență scufundări: ' + get('experienta'),
        '',
        'Mesaj:',
        get('mesaj')
      ];
      var href = 'mailto:jenoszabo68@gmail.com'
        + '?subject=' + encodeURIComponent('Înscriere curs: ' + course)
        + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      if (status) {
        status.textContent = 'Se deschide aplicația de e-mail cu cererea ta completată. Dacă nu se deschide, scrie-ne direct la jenoszabo68@gmail.com.';
      }
    });
  }
})();
