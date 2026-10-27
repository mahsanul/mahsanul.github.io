/* ==========================================================================
   Small helper scripts for the whole site. No libraries are needed.
   1. Theme toggle (light and dark)
   2. Mobile menu
   3. Email address (hidden from simple spam robots)
   4. Publication panels (abstract, BibTeX) and copy button
   5. Publication filter
   6. Print button
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* 1. Theme toggle ------------------------------------------------------- */
  var themeBtn = qs('#theme-toggle');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function updateThemeLabel() {
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  if (themeBtn) {
    updateThemeLabel();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage can be blocked */ }
      updateThemeLabel();
    });
  }

  /* 2. Mobile menu -------------------------------------------------------- */
  var navBtn = qs('#nav-toggle');
  var nav = qs('#site-nav');
  function setNav(open) {
    if (!navBtn || !nav) return;
    nav.classList.toggle('is-open', open);
    navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (navBtn && nav) {
    navBtn.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 860) setNav(false); });
  }

  /* 3. Email -------------------------------------------------------------- */
  qsa('.js-email').forEach(function (a) {
    var addr = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.setAttribute('href', 'mailto:' + addr);
    if (a.getAttribute('data-show') === 'address') a.textContent = addr;
  });

  /* 4. Publication panels and copy button --------------------------------- */
  qsa('[data-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('data-toggle'));
    if (!panel) return;
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  qsa('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('data-copy'));
      var pre = panel && qs('pre', panel);
      if (!pre) return;
      var text = pre.textContent.trim();
      var label = qs('span', btn);
      function done(ok) {
        if (!label) return;
        var old = label.textContent;
        label.textContent = ok ? 'Copied' : 'Press Ctrl+C';
        setTimeout(function () { label.textContent = old === 'Copied' ? 'Copy' : old; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        var range = document.createRange();
        range.selectNodeContents(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done(false);
      }
    });
  });

  /* 5. Publication filter ------------------------------------------------- */
  var filter = qs('#pub-filter');
  if (filter) {
    var buttons = qsa('.filter__btn', filter);
    var groups = qsa('.year-group');
    var empty = qs('#pub-empty');
    var apply = function (type) {
      var shown = 0;
      groups.forEach(function (g) {
        var n = 0;
        qsa('.pub', g).forEach(function (p) {
          var match = type === 'all' || p.getAttribute('data-type') === type;
          p.hidden = !match;
          if (match) n++;
        });
        g.hidden = n === 0;
        shown += n;
      });
      if (empty) empty.hidden = shown !== 0;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === type ? 'true' : 'false'); });
    };
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
    });
  }

  /* 6. Print button ------------------------------------------------------- */
  qsa('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
})();
