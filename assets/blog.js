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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); toggle.focus(); } });
  }

  /* Copy article link */
  var copyBtn = document.getElementById('copyLink');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var status = document.getElementById('copyStatus');
      var done = function (msg) { if (status) { status.textContent = msg; setTimeout(function () { status.textContent = ''; }, 3000); } };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function () { done('Link copiat.'); }, function () { done('Nu am putut copia linkul.'); });
      } else { done('Copiere indisponibilă în acest browser.'); }
    });
  }

  /* Blog listing: search + category filter + load more */
  var search = document.getElementById('blogSearch');
  var staticContent = document.getElementById('staticContent');
  var dynamic = document.getElementById('dynamicContent');
  var loadMore = document.getElementById('loadMore');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.cat-chip[data-cat]'));
  if (!search || !staticContent || !dynamic) return;

  var PER = 9, posts = null, filtered = [], shown = 0, cat = 'toate', term = '';

  var fold = function (s) {
    return (s || '').toLowerCase()
      .replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };

  var card = function (p) {
    return '<article class="post-card">' +
      '<a class="thumb" href="' + p.u + '" tabindex="-1" aria-hidden="true"><img src="' + esc(p.i) + '" alt="" loading="lazy" decoding="async" width="800" height="500" /></a>' +
      '<div class="body">' +
        '<p class="tag-cat"><a href="/blog/categorie/' + p.c + '/">' + esc(p.cn) + '</a></p>' +
        '<h3><a href="' + p.u + '">' + esc(p.t) + '</a></h3>' +
        '<p class="meta"><time datetime="' + p.d + '">' + esc(p.dr) + '</time><span class="dot"></span><span>' + p.r + ' min citire</span></p>' +
        '<p>' + esc(p.e) + '</p>' +
        '<a class="read-more" href="' + p.u + '">Citește articolul</a>' +
      '</div></article>';
  };

  function render(reset) {
    if (reset) { dynamic.innerHTML = ''; shown = 0; }
    var slice = filtered.slice(shown, shown + PER);
    var grid = dynamic.querySelector('.card-grid');
    if (!grid) {
      dynamic.innerHTML = '<p class="section-label" role="status">' + filtered.length + (filtered.length === 1 ? ' articol găsit' : ' articole găsite') + '</p><div class="card-grid"></div>';
      grid = dynamic.querySelector('.card-grid');
    } else {
      dynamic.querySelector('.section-label').textContent = filtered.length + (filtered.length === 1 ? ' articol găsit' : ' articole găsite');
    }
    grid.insertAdjacentHTML('beforeend', slice.map(card).join(''));
    shown += slice.length;
    if (!filtered.length) {
      dynamic.innerHTML = '<div class="notice"><strong>Niciun articol găsit.</strong>Încearcă alt termen de căutare sau altă categorie.</div>';
    }
    if (loadMore) loadMore.hidden = shown >= filtered.length;
  }

  function apply() {
    var active = term.length > 0 || cat !== 'toate';
    if (!active) {
      dynamic.hidden = true; dynamic.innerHTML = '';
      staticContent.hidden = false;
      if (loadMore) loadMore.hidden = true;
      return;
    }
    var q = fold(term);
    filtered = posts.filter(function (p) {
      var okCat = cat === 'toate' || p.c === cat;
      var okTerm = !q || fold(p.k).indexOf(q) !== -1;
      return okCat && okTerm;
    });
    staticContent.hidden = true;
    dynamic.hidden = false;
    render(true);
  }

  function ensure(cb) {
    if (posts) return cb();
    fetch('/blog/search-index.json').then(function (r) { return r.json(); }).then(function (data) { posts = data; cb(); })
      .catch(function () { posts = []; cb(); });
  }

  var timer;
  search.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () { term = search.value.trim(); ensure(apply); }, 200);
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      cat = chip.dataset.cat;
      ensure(apply);
    });
  });

  if (loadMore) loadMore.addEventListener('click', function () { render(false); });
})();
