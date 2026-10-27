/* ==========================================================================
   Figure 1 on the home page: an illustration of concept drift.

   Two groups of points (benign software and malware) rotate slowly as time
   passes. A "static" model keeps the decision line it learned at the start,
   so it makes more mistakes. An "adaptive" model re-learns the line from the
   current data, so it stays accurate. All data are made up (random, but with
   a fixed seed, so the picture is the same every time).

   How to change the picture: edit the numbers in the "Settings" block below.
   ========================================================================== */
(function () {
  'use strict';

  var figure = document.getElementById('drift');
  if (!figure) return;

  /* ---- Settings ---------------------------------------------------------- */
  var W = 800, H = 440;             // size of the drawing (SVG units)
  var CX = W / 2, CY = H / 2;       // center of the drawing
  var PER_CLASS = 70;               // number of points for each group
  var DIST = 106;                   // distance of each group from the center
  var SPREAD = 44;                  // how wide each group is
  var MAX_ANGLE = 80 * Math.PI / 180; // how far the data rotates in total
  var DURATION = 8000;              // length of the "Play" animation (ms)
  var SEED = 20260;                 // change this number to get a different random picture

  var NS = 'http://www.w3.org/2000/svg';
  var plot = document.getElementById('drift-plot');
  var chart = document.getElementById('drift-chart');
  var slider = document.getElementById('drift-time');
  var sliderOut = document.getElementById('drift-time-out');
  var accEl = document.getElementById('drift-acc');
  var errEl = document.getElementById('drift-err');
  var playBtn = document.getElementById('drift-play');
  var resetBtn = document.getElementById('drift-reset');
  var modeBtns = Array.prototype.slice.call(figure.querySelectorAll('.seg__btn'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Data: fixed random points ----------------------------------------- */
  function rng(seed) {                       // small seeded random number generator
    var s = seed | 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rand = rng(SEED);
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function limited() {                       // a Gaussian number, but not too far from 0
    var g;
    do { g = gauss(); } while (Math.abs(g) > 2.3);
    return g * SPREAD;
  }

  var points = [];                           // cls: 0 = benign, 1 = malware
  for (var c = 0; c < 2; c++) {
    for (var i = 0; i < PER_CLASS; i++) points.push({ cls: c, dx: limited(), dy: limited() });
  }
  var COUNT = points.length;

  function angleAt(t) { return MAX_ANGLE * (t * t * (3 - 2 * t)); }  // smooth start and end

  function place(t) {                        // x and y of every point at time t
    var a = angleAt(t), cosA = Math.cos(a), sinA = Math.sin(a);
    var xs = new Array(COUNT), ys = new Array(COUNT);
    for (var k = 0; k < COUNT; k++) {
      var s = points[k].cls === 1 ? 1 : -1;
      xs[k] = CX + s * DIST * cosA + points[k].dx;
      ys[k] = CY + s * DIST * sinA + points[k].dy;
    }
    return { xs: xs, ys: ys };
  }

  /* A model is a line: a middle point and a direction ("normal") that points toward malware. */
  function fit(pos) {
    var bx = 0, by = 0, mx = 0, my = 0;
    for (var k = 0; k < COUNT; k++) {
      if (points[k].cls === 1) { mx += pos.xs[k]; my += pos.ys[k]; } else { bx += pos.xs[k]; by += pos.ys[k]; }
    }
    bx /= PER_CLASS; by /= PER_CLASS; mx /= PER_CLASS; my /= PER_CLASS;
    var nx = mx - bx, ny = my - by, len = Math.sqrt(nx * nx + ny * ny) || 1;
    return { px: (bx + mx) / 2, py: (by + my) / 2, nx: nx / len, ny: ny / len };
  }

  function score(model, pos) {               // returns accuracy and the list of wrong points
    var wrong = [], bad = 0;
    for (var k = 0; k < COUNT; k++) {
      var side = (pos.xs[k] - model.px) * model.nx + (pos.ys[k] - model.py) * model.ny > 0 ? 1 : 0;
      var isWrong = side !== points[k].cls;
      wrong[k] = isWrong;
      if (isWrong) bad++;
    }
    return { acc: 1 - bad / COUNT, bad: bad, wrong: wrong };
  }

  var staticModel = fit(place(0));           // learned once, at time 0

  /* Accuracy curves for the small chart */
  var STEPS = 40, curve = [];
  for (var s = 0; s <= STEPS; s++) {
    var tt = s / STEPS, pp = place(tt);
    curve.push({ t: tt, st: score(staticModel, pp).acc, ad: score(fit(pp), pp).acc });
  }

  /* ---- Drawing the plot -------------------------------------------------- */
  function el(name, attrs, parent) {
    var node = document.createElementNS(NS, name);
    for (var key in attrs) if (Object.prototype.hasOwnProperty.call(attrs, key)) node.setAttribute(key, attrs[key]);
    if (parent) parent.appendChild(node);
    return node;
  }

  var gridG = el('g', {}, plot);
  for (var gx = 40; gx < W; gx += 40) el('line', { 'class': 'grid-line', x1: gx, y1: 0, x2: gx, y2: H }, gridG);
  for (var gy = 40; gy < H; gy += 40) el('line', { 'class': 'grid-line', x1: 0, y1: gy, x2: W, y2: gy }, gridG);

  var lineG = el('g', {}, plot);             // shaded regions and the decision line
  el('rect', { 'class': 'region region--benign', x: -3000, y: -3000, width: 3000, height: 6000 }, lineG);
  el('rect', { 'class': 'region region--malware', x: 0, y: -3000, width: 3000, height: 6000 }, lineG);
  el('line', { 'class': 'boundary', x1: 0, y1: -3000, x2: 0, y2: 3000 }, lineG);

  var ghostA = el('circle', { 'class': 'ghost ghost--benign', cx: CX - DIST, cy: CY, r: SPREAD * 2.1 }, plot);
  var ghostB = el('circle', { 'class': 'ghost ghost--malware', cx: CX + DIST, cy: CY, r: SPREAD * 2.1 }, plot);
  void ghostA; void ghostB;

  var dots = points.map(function (p) {
    return el('circle', { 'class': 'pt ' + (p.cls === 1 ? 'pt--malware' : 'pt--benign'), r: 5.2, cx: CX, cy: CY }, plot);
  });

  var labelText = el('text', { 'class': 'boundary-label', 'text-anchor': 'middle' }, plot);
  el('text', { 'class': 'axis-label', x: 16, y: H - 14 }, plot).textContent = 'Feature 1';
  el('text', { 'class': 'axis-label', x: W - 16, y: 26, 'text-anchor': 'end' }, plot).textContent = 'Feature 2';

  /* ---- Drawing the chart ------------------------------------------------- */
  var CL = 36, CR = 10, CT = 12, CB = 28, CW = 300, CH = 170;
  var YMIN = 0.5, YMAX = 1;
  function cx(t) { return CL + t * (CW - CL - CR); }
  function cy(a) { return CT + (1 - (a - YMIN) / (YMAX - YMIN)) * (CH - CT - CB); }

  [0.5, 0.75, 1].forEach(function (v) {
    el('line', { 'class': 'chart-grid', x1: CL, y1: cy(v), x2: CW - CR, y2: cy(v) }, chart);
    el('text', { 'class': 'chart-text', x: CL - 6, y: cy(v) + 3, 'text-anchor': 'end' }, chart).textContent = Math.round(v * 100) + '%';
  });
  el('line', { 'class': 'chart-axis', x1: CL, y1: CH - CB, x2: CW - CR, y2: CH - CB }, chart);
  el('text', { 'class': 'chart-text', x: CL, y: CH - 8 }, chart).textContent = 'Start';
  el('text', { 'class': 'chart-text', x: CW - CR, y: CH - 8, 'text-anchor': 'end' }, chart).textContent = 'Later';

  function path(key) {
    return curve.map(function (d, n) { return (n ? 'L' : 'M') + cx(d.t).toFixed(1) + ' ' + cy(d[key]).toFixed(1); }).join('');
  }
  var lineStatic = el('path', { 'class': 'chart-line chart-line--static', d: path('st') }, chart);
  var lineAdaptive = el('path', { 'class': 'chart-line chart-line--adaptive', d: path('ad') }, chart);
  var endSt = curve[STEPS].st, endAd = curve[STEPS].ad;
  el('text', { 'class': 'chart-text', x: CW - CR, y: cy(endSt) + 14, 'text-anchor': 'end' }, chart).textContent = 'static';
  el('text', { 'class': 'chart-text', x: CW - CR, y: cy(endAd) + 14, 'text-anchor': 'end' }, chart).textContent = 'adaptive';
  var cursor = el('line', { 'class': 'chart-cursor', x1: CL, y1: CT, x2: CL, y2: CH - CB }, chart);
  var dotSt = el('circle', { 'class': 'chart-dot', r: 4 }, chart);
  var dotAd = el('circle', { 'class': 'chart-dot', r: 4 }, chart);

  /* ---- State and update -------------------------------------------------- */
  var mode = 'static';
  var t = 0;

  function update() {
    var pos = place(t);
    var model = mode === 'static' ? staticModel : fit(pos);
    var res = score(model, pos);

    for (var k = 0; k < COUNT; k++) {
      dots[k].setAttribute('cx', pos.xs[k].toFixed(1));
      dots[k].setAttribute('cy', pos.ys[k].toFixed(1));
      dots[k].classList.toggle('pt--err', res.wrong[k]);
    }

    var deg = Math.atan2(model.ny, model.nx) * 180 / Math.PI;
    lineG.setAttribute('transform', 'translate(' + model.px.toFixed(1) + ' ' + model.py.toFixed(1) + ') rotate(' + deg.toFixed(2) + ')');

    var dx = -model.ny, dy = model.nx;       // direction along the line
    if (dy > 0) { dx = -dx; dy = -dy; }      // use the upper end of the line for the label
    labelText.setAttribute('x', Math.max(90, Math.min(W - 90, model.px + dx * 185)).toFixed(1));
    labelText.setAttribute('y', Math.max(24, Math.min(H - 40, model.py + dy * 185)).toFixed(1));
    labelText.textContent = mode === 'static' ? 'Old decision line' : 'Updated decision line';

    var pct = Math.round(res.acc * 100);
    accEl.textContent = pct;
    accEl.parentNode.classList.toggle('is-low', pct < 90);
    errEl.textContent = res.bad + ' of ' + COUNT + ' points predicted wrongly';

    var idx = Math.min(STEPS, Math.max(0, t * STEPS));
    var lo = Math.floor(idx), hi = Math.min(STEPS, lo + 1), f = idx - lo;
    var accSt = curve[lo].st + (curve[hi].st - curve[lo].st) * f;
    var accAd = curve[lo].ad + (curve[hi].ad - curve[lo].ad) * f;
    cursor.setAttribute('x1', cx(t).toFixed(1)); cursor.setAttribute('x2', cx(t).toFixed(1));
    dotSt.setAttribute('cx', cx(t).toFixed(1)); dotSt.setAttribute('cy', cy(accSt).toFixed(1));
    dotAd.setAttribute('cx', cx(t).toFixed(1)); dotAd.setAttribute('cy', cy(accAd).toFixed(1));
    lineStatic.classList.toggle('is-dim', mode !== 'static');
    lineAdaptive.classList.toggle('is-dim', mode !== 'adaptive');

    var tp = Math.round(t * 100);
    slider.value = tp;
    sliderOut.textContent = tp + '%';
    slider.setAttribute('aria-valuetext', 'Time ' + tp + ' percent. ' + (mode === 'static' ? 'Static' : 'Adaptive') + ' model accuracy ' + pct + ' percent.');
  }

  /* ---- Play and controls ------------------------------------------------- */
  var raf = null, last = 0;
  function setPlayLabel(playing) {
    var span = playBtn.querySelector('span');
    var use = playBtn.querySelector('use');
    if (span) span.textContent = playing ? 'Pause' : 'Play';
    if (use) use.setAttribute('href', playing ? '#i-pause' : '#i-play');
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    setPlayLabel(false);
  }
  function tick(now) {
    t = Math.min(1, t + (now - last) / DURATION);
    last = now;
    update();
    if (t >= 1) { stop(); return; }
    raf = requestAnimationFrame(tick);
  }
  function play() {
    if (t >= 1) t = 0;
    last = performance.now();
    setPlayLabel(true);
    raf = requestAnimationFrame(tick);
  }

  slider.addEventListener('input', function () { stop(); t = slider.value / 100; update(); });
  playBtn.addEventListener('click', function () { if (raf) stop(); else play(); });
  resetBtn.addEventListener('click', function () { stop(); t = 0; update(); });
  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.getAttribute('data-mode');
      modeBtns.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      update();
    });
  });

  figure.hidden = false;
  update();

  /* Play once when the figure becomes visible (not when the visitor prefers less motion) */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !started && t === 0 && !raf) { started = true; play(); io.disconnect(); }
      });
    }, { threshold: 0.55 });
    io.observe(figure);
    slider.addEventListener('pointerdown', function () { started = true; io.disconnect(); });
  }
})();
