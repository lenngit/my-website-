/* =========================================================
   TAC | tac-animations.js — v2
   Premium motion layer for theacquisitionco.com.
   Cosmetic only. Fully additive. Graceful degradation.
   ========================================================= */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────
     CONSTANTS
  ───────────────────────────────────────────────────── */
  var EASE       = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var EASE_MICRO = 'cubic-bezier(0.16, 1, 0.3, 1)';
  var REDUCED    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hide hero immediately so we can animate it in on load.
     Must run before DOMContentLoaded to prevent flash. */
  document.documentElement.classList.add('tac-init');

  /* ─────────────────────────────────────────────────────
     CSS INJECTION
  ───────────────────────────────────────────────────── */
  function injectCSS() {
    var s = document.createElement('style');
    s.id = 'tac-anim-v2';
    s.textContent = [

      /* ---------- REDUCED MOTION OVERRIDE ---------- */
      '@media (prefers-reduced-motion: reduce) {',
      '  *, *::before, *::after {',
      '    animation-duration: 0.01ms !important;',
      '    animation-iteration-count: 1 !important;',
      '    transition-duration: 0.01ms !important;',
      '    transition-delay: 0ms !important;',
      '  }',
      '}',

      /* ---------- HERO PRE-HIDE (before sequence starts) ---------- */
      '.tac-init .hero-eyebrow,',
      '.tac-init .hero h1,',
      '.tac-init .hero-sub,',
      '.tac-init .hero-buttons {',
      '  opacity: 0;',
      '}',

      /* ---------- LAYER 1 — Section labels: blur + fade up ---------- */
      '.tac-l1 {',
      '  opacity: 0;',
      '  transform: translateY(8px) translateZ(0);',
      '  filter: blur(4px);',
      '  will-change: transform, opacity, filter;',
      '  transition:',
      '    opacity 900ms ' + EASE + ',',
      '    transform 900ms ' + EASE + ',',
      '    filter 900ms ' + EASE + ';',
      '}',
      '.tac-l1.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '  filter: blur(0px);',
      '}',

      /* ---------- LAYER 2 — Headings and body copy ---------- */
      '.tac-l2 {',
      '  opacity: 0;',
      '  transform: translateY(40px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 800ms ' + EASE + ',',
      '    transform 800ms ' + EASE + ';',
      '}',
      '.tac-l2.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* ---------- LAYER 3 — Cards, CTAs, foreground elements ---------- */
      '.tac-l3 {',
      '  opacity: 0;',
      '  transform: translateY(32px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 700ms ' + EASE + ',',
      '    transform 700ms ' + EASE + ';',
      '}',
      '.tac-l3.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* ---------- CARD — deeper offset, longer duration ---------- */
      '.tac-card {',
      '  opacity: 0;',
      '  transform: translateY(32px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 800ms ' + EASE + ',',
      '    transform 800ms ' + EASE + ';',
      '}',
      '.tac-card.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* ---------- SCALE ENTRY — about photo ---------- */
      '.tac-scale {',
      '  opacity: 0;',
      '  transform: scale(0.97) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 900ms ' + EASE + ',',
      '    transform 900ms ' + EASE + ';',
      '}',
      '.tac-scale.tac-revealed {',
      '  opacity: 1;',
      '  transform: scale(1) translateZ(0);',
      '}',

      /* ---------- SLIDE FROM LEFT — banner heading ---------- */
      '.tac-slide-l {',
      '  opacity: 0;',
      '  transform: translateX(-32px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 800ms ' + EASE + ',',
      '    transform 800ms ' + EASE + ';',
      '}',
      '.tac-slide-l.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateX(0) translateZ(0);',
      '}',

      /* ---------- SLIDE FROM RIGHT — banner body copy ---------- */
      '.tac-slide-r {',
      '  opacity: 0;',
      '  transform: translateX(32px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 800ms ' + EASE + ',',
      '    transform 800ms ' + EASE + ';',
      '}',
      '.tac-slide-r.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateX(0) translateZ(0);',
      '}',

      /* ---------- QUOTE SETTLE — letter-spacing breath ---------- */
      '.tac-quote {',
      '  opacity: 0;',
      '  letter-spacing: 0.06em;',
      '  will-change: opacity;',
      '  transition:',
      '    opacity 900ms ' + EASE + ',',
      '    letter-spacing 900ms ' + EASE + ';',
      '}',
      '.tac-quote.tac-revealed {',
      '  opacity: 1;',
      '  letter-spacing: 0.01em;',
      '}',

      /* ---------- HERO H1 WRAPPERS ---------- */
      '.tac-hero-line {',
      '  display: block;',
      '}',
      '.tac-hero-inner {',
      '  display: block;',
      '  opacity: 0;',
      '  transform: translateY(48px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition:',
      '    opacity 850ms ' + EASE + ',',
      '    transform 850ms ' + EASE + ';',
      '}',
      '.tac-hero-inner.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* ---------- EMPATHY PULSE ---------- */
      '@keyframes tac-empathy {',
      '  0%   { opacity: 1; }',
      '  45%  { opacity: 0.75; }',
      '  100% { opacity: 1; }',
      '}',
      '.tac-empathy-pulse {',
      '  animation: tac-empathy 700ms ease-in-out 1;',
      '}',

      /* ---------- HERO DIVIDER — width draw ---------- */
      '.hero-divider {',
      '  width: 0 !important;',
      '  transition: width 600ms ' + EASE + ';',
      '}',
      '.hero-divider.tac-revealed {',
      '  width: 48px !important;',
      '}',

      /* ---------- PULL QUOTE RULE — width draw ---------- */
      '.pull-quote-rule {',
      '  width: 0 !important;',
      '  transition: width 700ms ' + EASE + ';',
      '}',
      '.pull-quote-rule.tac-revealed {',
      '  width: 60px !important;',
      '}',

      /* ---------- NAV — enhanced scroll transition ---------- */
      'nav {',
      '  transition:',
      '    background 400ms ' + EASE + ',',
      '    border-color 400ms ' + EASE + ' !important;',
      '}',
      'nav.scrolled {',
      '  background: rgba(13, 34, 18, 0.96) !important;',
      '  backdrop-filter: blur(14px) !important;',
      '  -webkit-backdrop-filter: blur(14px) !important;',
      '}',

      /* Nav link gold underline sweep */
      '.nav-links a:not(.nav-cta) {',
      '  position: relative;',
      '}',
      '.nav-links a:not(.nav-cta)::after {',
      '  content: "";',
      '  position: absolute;',
      '  bottom: -2px; left: 0;',
      '  width: 100%; height: 1px;',
      '  background: #C9A84C;',
      '  transform: scaleX(0);',
      '  transform-origin: left center;',
      '  transition: transform 220ms ' + EASE_MICRO + ';',
      '}',
      '.nav-links a:not(.nav-cta):hover::after {',
      '  transform: scaleX(1);',
      '}',

      /* Nav CTA gold sweep */
      '.nav-cta {',
      '  position: relative;',
      '  overflow: hidden;',
      '}',
      '.nav-cta::before {',
      '  content: "";',
      '  position: absolute;',
      '  inset: 0;',
      '  background: rgba(255,255,255,0.14);',
      '  transform: scaleX(0);',
      '  transform-origin: left center;',
      '  transition: transform 280ms ' + EASE_MICRO + ';',
      '  pointer-events: none;',
      '}',
      '.nav-cta:hover::before { transform: scaleX(1); }',
      '.nav-cta:hover { opacity: 1 !important; }',

      /* Nav load stagger */
      '.tac-nav-item {',
      '  opacity: 0;',
      '  transform: translateY(-8px) translateZ(0);',
      '  transition:',
      '    opacity 400ms ' + EASE + ',',
      '    transform 400ms ' + EASE + ';',
      '}',
      '.tac-nav-item.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* ---------- BUTTONS ---------- */
      '.btn-primary {',
      '  transition: opacity 0.2s, box-shadow 250ms ' + EASE_MICRO + ' !important;',
      '}',
      '.btn-primary:hover {',
      '  box-shadow: inset 0 0 0 1px rgba(201,168,76,0.55) !important;',
      '  opacity: 1 !important;',
      '}',
      '.btn-primary:focus-visible {',
      '  outline: 2px solid #C9A84C;',
      '  outline-offset: 3px;',
      '}',

      /* Ghost button — gold fill sweep */
      '.btn-ghost {',
      '  position: relative;',
      '  overflow: hidden;',
      '}',
      '.btn-ghost::before {',
      '  content: "";',
      '  position: absolute;',
      '  inset: 0;',
      '  background: rgba(201,168,76,0.1);',
      '  transform: scaleX(0);',
      '  transform-origin: left center;',
      '  transition: transform 250ms ' + EASE_MICRO + ';',
      '  pointer-events: none;',
      '}',
      '.btn-ghost:hover::before { transform: scaleX(1); }',

      /* Dark button — dark fill sweep, text turns gold */
      '.btn-dark {',
      '  position: relative;',
      '  overflow: hidden;',
      '  transition: color 250ms ' + EASE_MICRO + ', opacity 0.2s !important;',
      '}',
      '.btn-dark::before {',
      '  content: "";',
      '  position: absolute;',
      '  inset: 0;',
      '  background: var(--green-deep, #002112);',
      '  transform: scaleX(0);',
      '  transform-origin: left center;',
      '  transition: transform 250ms ' + EASE_MICRO + ';',
      '  pointer-events: none;',
      '  z-index: 0;',
      '}',
      '.btn-dark > * { position: relative; z-index: 1; }',
      '.btn-dark:hover::before { transform: scaleX(1); }',
      '.btn-dark:hover { color: #C9A84C !important; opacity: 1 !important; }',

      /* ---------- STAT CARDS — flat hover brighten ---------- */
      '.stat-card {',
      '  transition: border-color 0.2s, filter 200ms ' + EASE_MICRO + ' !important;',
      '}',
      '.stat-card:hover { filter: brightness(1.07); }',

      /* ---------- COMPARISON TABLE — full-column gold border draw ---------- */
      '.comparison-grid { position: relative; }',
      '.comparison-grid::after {',
      '  content: "";',
      '  position: absolute;',
      '  top: 0;',
      '  left: 50%;',
      '  transform: translateX(-50%);',
      '  width: 3px;',
      '  height: 0;',
      '  background: #C9A84C;',
      '  pointer-events: none;',
      '  z-index: 2;',
      '  transition: height 900ms ' + EASE + ';',
      '}',
      '.comparison-grid.tac-revealed::after { height: 100%; }',

      /* Comparison rows */
      '.tac-comp-row {',
      '  opacity: 0;',
      '  transform: translateY(16px) translateZ(0);',
      '  transition: opacity 400ms ' + EASE + ', transform 400ms ' + EASE + ';',
      '}',
      '.tac-comp-row.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* Legacy column: muted until revealed */
      '.tac-comp-row .cell-legacy {',
      '  opacity: 0.5;',
      '  transition: opacity 600ms ' + EASE + ';',
      '}',
      '.tac-comp-row.tac-revealed .cell-legacy { opacity: 0.7; }',

      /* Comparison header */
      '.tac-comp-header {',
      '  opacity: 0;',
      '  transform: translateY(16px) translateZ(0);',
      '  transition: opacity 500ms ' + EASE + ', transform 500ms ' + EASE + ';',
      '}',
      '.tac-comp-header.tac-revealed { opacity: 1; transform: translateY(0) translateZ(0); }',

      /* ---------- FRAMEWORK STEPS ---------- */
      '.tac-framework-step {',
      '  opacity: 0;',
      '  transform: translateY(24px) translateZ(0);',
      '  will-change: transform, opacity;',
      '  transition: opacity 800ms ' + EASE + ', transform 800ms ' + EASE + ';',
      '  border-bottom: 1px solid transparent !important;',
      '}',
      '.tac-framework-step.tac-revealed {',
      '  opacity: 1;',
      '  transform: translateY(0) translateZ(0);',
      '}',

      /* Step number fades in slightly before the row */
      '.tac-framework-step .step-number {',
      '  opacity: 0;',
      '  transition: opacity 500ms ' + EASE + ';',
      '}',
      '.tac-framework-step.tac-revealed .step-number { opacity: 1; }',

      /* Divider draws in via pseudo-element (scaleX) */
      '.tac-framework-step::after {',
      '  content: "";',
      '  position: absolute;',
      '  bottom: -1px; left: 0; right: 0;',
      '  height: 1px;',
      '  background: rgba(201,168,76,0.1);',
      '  transform: scaleX(0) translateZ(0);',
      '  transform-origin: left center;',
      '  transition: transform 500ms ' + EASE + ';',
      '}',
      '.tac-framework-step.tac-revealed::after { transform: scaleX(1) translateZ(0); }',

      /* Row hover: thin gold left accent */
      '.framework-step {',
      '  border-left: 2px solid transparent;',
      '  transition: border-left-color 150ms ' + EASE_MICRO + ';',
      '}',
      '.framework-step:hover { border-left-color: rgba(201,168,76,0.5); }',

      /* ---------- SCORECARD DOTS ---------- */
      '.q-dot {',
      '  cursor: pointer;',
      '  user-select: none;',
      '  transition:',
      '    background 150ms ' + EASE_MICRO + ',',
      '    border-color 150ms ' + EASE_MICRO + ',',
      '    color 150ms ' + EASE_MICRO + ';',
      '}',
      '.q-dot:hover {',
      '  border-color: rgba(201,168,76,0.5) !important;',
      '  color: rgba(201,168,76,0.9) !important;',
      '}',
      '.q-dot.tac-selected {',
      '  background: #C9A84C !important;',
      '  border-color: #C9A84C !important;',
      '  color: #002112 !important;',
      '}',
      '.q-dot.tac-deselected {',
      '  background: transparent !important;',
      '  border-color: rgba(210,212,217,0.12) !important;',
      '  color: rgba(210,212,217,0.25) !important;',
      '  transition: background 200ms, border-color 200ms, color 200ms;',
      '}',

      /* ---------- BLOG CARDS — 1px gold border on hover ---------- */
      '.blog-card {',
      '  border: 1px solid transparent;',
      '  transition: background 0.2s, border-color 200ms ' + EASE_MICRO + ' !important;',
      '}',
      '.blog-card:hover { border-color: rgba(201,168,76,0.35) !important; }',

      /* ---------- CALCULATOR — slider glow ---------- */
      'input[type="range"].tac-slider-active::-webkit-slider-thumb {',
      '  box-shadow: 0 0 0 4px rgba(201,168,76,0.2), 0 0 14px rgba(201,168,76,0.25);',
      '}',
      'input[type="range"].tac-slider-active::-moz-range-thumb {',
      '  box-shadow: 0 0 0 4px rgba(201,168,76,0.2), 0 0 14px rgba(201,168,76,0.25);',
      '}',

      /* Output value crossfade wrapper */
      '.tac-val-inner {',
      '  display: inline;',
      '  transition: opacity 120ms linear;',
      '}',

      /* TAC-Optimised scenario label underline draw */
      '.scenario--tac .scenario-label {',
      '  position: relative;',
      '  display: inline-block;',
      '}',
      '.scenario--tac .scenario-label::after {',
      '  content: "";',
      '  position: absolute;',
      '  bottom: -2px; left: 0;',
      '  width: 0;',
      '  height: 1px;',
      '  background: #C9A84C;',
      '  transition: width 500ms ' + EASE + ';',
      '}',
      '.scenario--tac .scenario-label.tac-revealed::after { width: 100%; }',

      /* ---------- CTA BANNER — brightness warmup + entry ---------- */
      '.cta-banner.tac-warm { filter: brightness(0.92); }',
      '.cta-banner { transition: filter 1000ms ' + EASE + '; }',
      '.cta-banner.tac-revealed { filter: brightness(1.0); }',

      /* ---------- MODAL ANIMATION OVERRIDE ---------- */
      '.audit-modal-overlay {',
      '  transition: opacity 0.5s ' + EASE + ' !important;',
      '}',
      '.audit-modal {',
      '  transform: translateY(40px) scale(0.97) !important;',
      '  opacity: 0 !important;',
      '  transition:',
      '    transform 0.55s ' + EASE + ',',
      '    opacity 0.55s ' + EASE + ' !important;',
      '}',
      '.audit-modal-overlay.open .audit-modal {',
      '  transform: translateY(0) scale(1) !important;',
      '  opacity: 1 !important;',
      '}',
      /* Close animation state */
      '.audit-modal-overlay.tac-closing {',
      '  opacity: 0 !important;',
      '  pointer-events: none !important;',
      '  transition: opacity 0.3s ' + EASE + ' !important;',
      '}',
      '.audit-modal-overlay.tac-closing .audit-modal {',
      '  transform: translateY(24px) scale(0.98) !important;',
      '  opacity: 0 !important;',
      '  transition:',
      '    transform 0.3s ' + EASE + ',',
      '    opacity 0.3s ' + EASE + ' !important;',
      '}',

    ].join('\n');

    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────────────────
     SINGLE SHARED INTERSECTION OBSERVER
  ───────────────────────────────────────────────────── */
  var _obs = null;

  function getObserver() {
    if (!_obs) {
      _obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          dispatch(entry.target);
          _obs.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
    }
    return _obs;
  }

  /* Reveal a single element, honouring an optional delay */
  function reveal(el, delay) {
    if (REDUCED) { el.classList.add('tac-revealed'); return; }
    if (delay) {
      setTimeout(function () { el.classList.add('tac-revealed'); }, delay);
    } else {
      el.classList.add('tac-revealed');
    }
  }

  /* Dispatch: route each observed element to the right handler */
  function dispatch(el) {
    var type = el.dataset.tacType;

    if (type === 'card-group')    { handleCardGroup(el); }
    else if (type === 'comp-table')    { handleCompTable(el); }
    else if (type === 'framework')     { handleFramework(el); }
    else if (type === 'pull-quote')    { handlePullQuote(el); }
    else if (type === 'stat-row')      { handleStatRow(el); }
    else if (type === 'blog-cards')    { handleBlogCards(el); }
    else if (type === 'scorecard-qs')  { handleScorecardQs(el); }
    else if (type === 'cta-banner')    { handleCtaBanner(el); }
    else {
      /* Generic: just reveal, honouring data-tac-delay */
      reveal(el, parseInt(el.dataset.tacDelay || '0', 10));
    }
  }

  /* ─────────────────────────────────────────────────────
     GROUP HANDLERS
  ───────────────────────────────────────────────────── */

  function handleCardGroup(container) {
    var stagger = parseInt(container.dataset.tacStagger || '180', 10);
    Array.prototype.slice.call(container.querySelectorAll('.stat-card')).forEach(function (card, i) {
      card.classList.add('tac-card');
      reveal(card, i * stagger);
    });
  }

  function handleCompTable(grid) {
    /* Gold border draws down the TAC column */
    reveal(grid, 0);

    /* Header */
    var header = grid.querySelector('.comparison-header');
    if (header) {
      header.classList.add('tac-comp-header');
      reveal(header, 100);
    }

    /* Rows stagger top-to-bottom */
    Array.prototype.slice.call(grid.querySelectorAll('.comparison-row')).forEach(function (row, i) {
      row.classList.add('tac-comp-row');
      reveal(row, 200 + i * 70);
    });
  }

  function handleFramework(grid) {
    Array.prototype.slice.call(grid.querySelectorAll('.framework-step')).forEach(function (step, i) {
      step.classList.add('tac-framework-step');
      /* Number fades in 120ms before the row */
      var num = step.querySelector('.step-number');
      if (num && !REDUCED) {
        setTimeout(function () { num.style.opacity = '0'; }, 0);
      }
      reveal(step, i * 160);
    });
  }

  function handlePullQuote(section) {
    var quote = section.querySelector('.pull-quote');
    var rule  = section.querySelector('.pull-quote-rule');
    if (quote) { quote.classList.add('tac-quote'); reveal(quote, 0); }
    if (rule)  { reveal(rule, 200); }
  }

  function handleStatRow(row) {
    /* Stagger the three stat columns */
    Array.prototype.slice.call(row.querySelectorAll('.hero-stat')).forEach(function (stat, i) {
      stat.classList.add('tac-l3');
      reveal(stat, i * 160);
    });
    /* Trigger countup */
    initHeroCountup(row);
  }

  function handleBlogCards(grid) {
    Array.prototype.slice.call(grid.querySelectorAll('.blog-card')).forEach(function (card, i) {
      card.classList.add('tac-card');
      reveal(card, i * 160);
    });
  }

  function handleScorecardQs(list) {
    Array.prototype.slice.call(list.querySelectorAll('.scorecard-q')).forEach(function (q, i) {
      q.classList.add('tac-l3');
      reveal(q, i * 160);
    });
  }

  function handleCtaBanner(banner) {
    banner.classList.remove('tac-warm');
    banner.classList.add('tac-revealed'); /* triggers brightness warmup */

    var h2   = banner.querySelector('h2');
    var body = banner.querySelector('p');
    var btn  = banner.querySelector('.btn-dark');

    if (h2)   { h2.classList.add('tac-slide-l');  reveal(h2, 0); }
    if (body) { body.classList.add('tac-slide-r'); reveal(body, 200); }
    if (btn)  { btn.classList.add('tac-l3');       reveal(btn, 350); }
  }

  /* ─────────────────────────────────────────────────────
     TEXT REPLACEMENT
  ───────────────────────────────────────────────────── */
  function applyTextReplacements() {
    document.querySelectorAll('h2').forEach(function (h) {
      if (h.textContent.indexOf('2004') !== -1) {
        h.innerHTML = h.innerHTML.replace(/\b2004\b/, 'dated');
      }
    });
  }

  /* ─────────────────────────────────────────────────────
     PREPARE SCROLL ELEMENTS
     Adds initial animation classes + registers observer.
  ───────────────────────────────────────────────────── */
  function prepareScrollElements() {
    var obs = getObserver();

    function watch(selector, cls, delay, type) {
      document.querySelectorAll(selector).forEach(function (el) {
        if (cls)   el.classList.add(cls);
        if (delay) el.dataset.tacDelay = String(delay);
        if (type)  el.dataset.tacType  = type;
        obs.observe(el);
      });
    }

    /* ── Layer 1: section labels ── */
    watch(
      '.audit-offer .section-label, .proof-section .section-label, ' +
      '.comparison-section .section-label, .calculator-section .section-label, ' +
      '.framework-section .section-label, .scorecard-teaser .section-label, ' +
      '.blog-section .section-label, .about-strip .section-label',
      'tac-l1'
    );

    /* ── Layer 2: section headings ── */
    watch(
      '.audit-offer h2, .proof-section h2, .comparison-section h2, ' +
      '.calculator-section h2, .framework-section h2, .scorecard-teaser h2, ' +
      '.blog-section h2, .about-strip h2',
      'tac-l2', 80
    );

    /* ── Layer 2: body copy ── */
    watch(
      '.audit-offer p:not(.audit-note), ' +
      '.proof-intro, .proof-outro, ' +
      '.comparison-section .section-body, ' +
      '.calc-body, ' +
      '.framework-section .section-body, ' +
      '.scorecard-teaser .section-body, ' +
      '.about-body, .about-quote',
      'tac-l2', 160
    );

    /* ── Layer 3: CTAs below body copy ── */
    watch('.audit-offer .btn-primary', 'tac-l3', 240);
    watch('.proof-section .btn-ghost', 'tac-l3', 200);
    watch('.framework-section .btn-ghost', 'tac-l3', 200);

    /* ── Pull quote (handled as group) ── */
    var pullSection = document.querySelector('.pull-quote-section');
    if (pullSection) {
      pullSection.dataset.tacType = 'pull-quote';
      obs.observe(pullSection);
    }

    /* ── Proof stat cards ── */
    var statGrid = document.querySelector('.stat-grid');
    if (statGrid) {
      statGrid.dataset.tacType    = 'card-group';
      statGrid.dataset.tacStagger = '180';
      obs.observe(statGrid);
    }

    /* ── Proof outro paragraphs with stagger ── */
    document.querySelectorAll('.proof-outro').forEach(function (el, i) {
      el.classList.add('tac-l2');
      el.dataset.tacDelay = String(120 * i);
      obs.observe(el);
    });

    /* ── Comparison table ── */
    var compGrid = document.querySelector('.comparison-grid');
    if (compGrid) {
      compGrid.dataset.tacType = 'comp-table';
      obs.observe(compGrid);
    }

    /* ── Calculator scenario TAC label underline ── */
    var tacLabel = document.querySelector('.scenario--tac .scenario-label');
    if (tacLabel) obs.observe(tacLabel);

    /* ── Framework steps ── */
    var fwGrid = document.querySelector('.framework-grid');
    if (fwGrid) {
      fwGrid.dataset.tacType = 'framework';
      obs.observe(fwGrid);
    }

    /* ── Hero stat row ── */
    var statRow = document.querySelector('.hero-stat-row');
    if (statRow) {
      statRow.dataset.tacType = 'stat-row';
      obs.observe(statRow);
    }

    /* ── Scorecard questions ── */
    var qList = document.querySelector('.scorecard-questions');
    if (qList) {
      qList.dataset.tacType = 'scorecard-qs';
      obs.observe(qList);
    }

    /* ── Scorecard result panels ── */
    document.querySelectorAll('.scorecard-result-preview .result-band').forEach(function (el, i) {
      el.classList.add('tac-l3');
      el.dataset.tacDelay = String(160 + i * 160);
      obs.observe(el);
    });

    /* ── Blog cards ── */
    var blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
      blogGrid.dataset.tacType = 'blog-cards';
      obs.observe(blogGrid);
    }

    /* ── About section ── */
    var aboutPhoto   = document.querySelector('.about-photo');
    var aboutContent = document.querySelector('.about-content');
    if (aboutPhoto)   { aboutPhoto.classList.add('tac-scale'); obs.observe(aboutPhoto); }
    if (aboutContent) {
      aboutContent.classList.add('tac-l2');
      aboutContent.dataset.tacDelay = '150';
      obs.observe(aboutContent);
    }

    /* ── CTA banner (gold bg section) ── */
    var ctaBanner = document.querySelector('.cta-banner');
    if (ctaBanner) {
      ctaBanner.classList.add('tac-warm');
      ctaBanner.dataset.tacType = 'cta-banner';
      obs.observe(ctaBanner);
    }
  }

  /* ─────────────────────────────────────────────────────
     HERO SEQUENCE
     Runs on window.load to ensure fonts are ready.
  ───────────────────────────────────────────────────── */
  function initHeroSequence() {
    function run() {
      document.documentElement.classList.remove('tac-init');

      var eyebrow = document.querySelector('.hero-eyebrow');
      var h1      = document.querySelector('.hero h1');
      var divider = document.querySelector('.hero-divider');
      var sub     = document.querySelector('.hero-sub');
      var buttons = document.querySelector('.hero-buttons');

      if (!h1) return;

      /* Immediately apply initial state — elements hidden by .tac-init
         until this point; now we hand off to the transition system */
      if (eyebrow) eyebrow.classList.add('tac-l1');
      if (sub)     sub.classList.add('tac-l2');
      if (buttons) buttons.classList.add('tac-l3');

      /* Split H1 into three animated lines */
      var inners = splitH1(h1);

      if (REDUCED) {
        /* Show everything instantly */
        if (eyebrow) eyebrow.classList.add('tac-revealed');
        inners.forEach(function (i) { i.classList.add('tac-revealed'); });
        if (divider) divider.classList.add('tac-revealed');
        if (sub)     sub.classList.add('tac-revealed');
        if (buttons) buttons.classList.add('tac-revealed');
        return;
      }

      /* ── Timeline ──
         t=100  eyebrow  (L1, 900ms)
         t=200  line 1   (850ms)
         t=300  line 2   (850ms)  ← contains "empathy"
         t=400  line 3   (850ms)
         t=500  subtitle (L2, 800ms)
         t=700  buttons  (L3, 700ms)
         t=1000 divider  (600ms)
         line2 settles → +300ms → empathy pulse (700ms)
      */

      setTimeout(function () {
        if (eyebrow) eyebrow.classList.add('tac-revealed');
      }, 100);

      inners.forEach(function (inner, i) {
        setTimeout(function () { inner.classList.add('tac-revealed'); }, 200 + i * 100);
      });

      /* Empathy pulse — fires after line 2 (index 1) transition completes */
      var line2 = inners[1] || inners[0];
      if (line2) {
        var pulsed = false;
        line2.addEventListener('transitionend', function onEnd(e) {
          if (e.propertyName !== 'transform' || pulsed) return;
          pulsed = true;
          line2.removeEventListener('transitionend', onEnd);
          setTimeout(function () {
            var em = h1.querySelector('em');
            if (!em) return;
            em.classList.add('tac-empathy-pulse');
            em.addEventListener('animationend', function () {
              em.classList.remove('tac-empathy-pulse');
            }, { once: true });
          }, 300);
        });
      }

      setTimeout(function () { if (sub)     sub.classList.add('tac-revealed'); }, 500);
      setTimeout(function () { if (buttons) buttons.classList.add('tac-revealed'); }, 700);
      setTimeout(function () { if (divider) divider.classList.add('tac-revealed'); }, 1000);
    }

    if (REDUCED) { run(); return; }

    if (document.readyState === 'complete') {
      setTimeout(run, 80);
    } else {
      window.addEventListener('load', function () { setTimeout(run, 80); });
    }
  }

  /* Split H1 into three wrapper spans preserving the em element.
     Line 1: text before em  |  Line 2: em  |  Line 3: text after em */
  function splitH1(h1) {
    var nodes    = Array.prototype.slice.call(h1.childNodes);
    var before   = [];
    var emNode   = null;
    var after    = [];
    var pastEm   = false;

    nodes.forEach(function (node) {
      if (node.nodeName === 'EM') {
        emNode = node.cloneNode(true);
        pastEm = true;
      } else if (!pastEm) {
        before.push(node.cloneNode(true));
      } else {
        after.push(node.cloneNode(true));
      }
    });

    /* No em found — treat entire h1 as one line */
    if (!emNode) {
      h1.classList.add('tac-hero-inner');
      return [h1];
    }

    h1.innerHTML = '';

    function makeLine(contents) {
      var line  = document.createElement('span');
      var inner = document.createElement('span');
      line.className  = 'tac-hero-line';
      inner.className = 'tac-hero-inner';
      contents.forEach(function (n) { inner.appendChild(n); });
      line.appendChild(inner);
      h1.appendChild(line);
      return inner;
    }

    var inners = [];
    if (before.length) inners.push(makeLine(before));
    inners.push(makeLine([emNode]));
    if (after.length)  inners.push(makeLine(after));

    return inners;
  }

  /* ─────────────────────────────────────────────────────
     HERO STATS COUNTUP
  ───────────────────────────────────────────────────── */
  function initHeroCountup(statRow) {
    if (REDUCED) return;

    statRow.querySelectorAll('.hero-stat-number').forEach(function (el) {
      var raw    = el.textContent.trim();
      var suffix = raw.replace(/[\d,]/g, '');
      var target = parseInt(raw.replace(/\D/g, ''), 10);
      if (isNaN(target) || target === 0) return;

      var start    = null;
      var duration = 1400;
      var raf      = null;

      function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(easeOut(progress) * target) + suffix;
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          el.textContent = raw;
          raf = null;
        }
      }

      el.textContent = '0' + suffix;
      raf = requestAnimationFrame(step);
    });
  }

  /* ─────────────────────────────────────────────────────
     NAV LOAD ANIMATION
  ───────────────────────────────────────────────────── */
  function initNavLoadAnimation() {
    if (REDUCED) return;
    var items = Array.prototype.slice.call(document.querySelectorAll('.nav-links li'));
    items.forEach(function (li) { li.classList.add('tac-nav-item'); });
    items.forEach(function (li, i) {
      setTimeout(function () { li.classList.add('tac-revealed'); }, 200 + i * 40);
    });
  }

  /* ─────────────────────────────────────────────────────
     CALCULATOR — slider glow + output opacity crossfade
  ───────────────────────────────────────────────────── */
  function initCalculator() {
    /* ── Slider glow ── */
    var slider = document.getElementById('bookingRate');
    if (slider) {
      slider.addEventListener('mousedown',  function () { slider.classList.add('tac-slider-active'); });
      slider.addEventListener('touchstart', function () { slider.classList.add('tac-slider-active'); }, { passive: true });
      document.addEventListener('mouseup',  function () { slider.classList.remove('tac-slider-active'); });
      document.addEventListener('touchend', function () { slider.classList.remove('tac-slider-active'); });
    }

    if (REDUCED) return;

    /* ── Output crossfade ──
       The inline calc script sets el.textContent = value directly.
       We use MutationObserver to catch those writes, re-wrap the
       content in .tac-val-inner, and fade the new value in.
       A re-entry flag prevents infinite mutation loops. */
    var outputIds = [
      'currentConsults', 'currentRetained', 'currentRevenue',
      'tacConsults',     'tacRetained',     'tacRevenue',
      'monthlyLeak',     'annualLeak'
    ];

    outputIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;

      var updating = false;

      /* Wrap initial value */
      setTimeout(function () {
        if (!el.querySelector('.tac-val-inner')) {
          var inner = document.createElement('span');
          inner.className   = 'tac-val-inner';
          inner.textContent = el.textContent;
          el.textContent    = '';
          el.appendChild(inner);
        }
      }, 0);

      var mo = new MutationObserver(function () {
        if (updating) return;
        updating = true;

        /* Calc has already set plain textContent — grab new value */
        var newVal = el.textContent;

        /* Re-wrap: start hidden */
        var inner = document.createElement('span');
        inner.className   = 'tac-val-inner';
        inner.textContent = newVal;
        inner.style.opacity = '0';
        el.textContent = '';
        el.appendChild(inner);

        updating = false;

        /* Fade in over two rAFs (ensures CSS transition triggers) */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            inner.style.opacity = '1';
          });
        });
      });

      mo.observe(el, { childList: true, subtree: true, characterData: true });
    });

    /* Trigger TAC column label underline after calc section enters view */
  }

  /* ─────────────────────────────────────────────────────
     SCORECARD DOTS (Y / P / N)
  ───────────────────────────────────────────────────── */
  function initScorecardDots() {
    document.querySelectorAll('.q-dots').forEach(function (group) {
      var dots = Array.prototype.slice.call(group.querySelectorAll('.q-dot'));
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var alreadySelected = dot.classList.contains('tac-selected');
          dots.forEach(function (d) {
            d.classList.remove('tac-selected', 'tac-deselected');
            if (d !== dot) d.classList.add('tac-deselected');
          });
          if (!alreadySelected) {
            dot.classList.add('tac-selected');
            dot.classList.remove('tac-deselected');
          } else {
            /* Toggle off — clear all states */
            dots.forEach(function (d) { d.classList.remove('tac-selected', 'tac-deselected'); });
          }
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     MODAL CLOSE ANIMATION PATCH
     Intercepts close events (capture phase) to play a
     300ms exit animation before main.js removes .open.
  ───────────────────────────────────────────────────── */
  function patchModalClose() {
    /* The modal HTML is injected by main.js on DOMContentLoaded.
       We wait a tick to ensure it exists. */
    setTimeout(function () {
      var overlay  = document.getElementById('auditModal');
      var closeBtn = document.getElementById('auditModalClose');
      if (!overlay) return;

      var isClosing = false;

      function animateClose() {
        if (isClosing || !overlay.classList.contains('open')) return;
        isClosing = true;

        overlay.classList.add('tac-closing');
        document.body.style.overflow = '';

        setTimeout(function () {
          overlay.classList.remove('open', 'tac-closing');
          isClosing = false;
        }, 320);
      }

      /* Intercept close button — capture phase fires before main.js bubble handler */
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          if (!overlay.classList.contains('open')) return;
          e.stopImmediatePropagation();
          animateClose();
        }, true);
      }

      /* Intercept backdrop click */
      overlay.addEventListener('click', function (e) {
        if (e.target !== overlay) return;
        if (!overlay.classList.contains('open')) return;
        e.stopImmediatePropagation();
        animateClose();
      }, true);

      /* Intercept Escape key */
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (!overlay.classList.contains('open')) return;
        e.stopImmediatePropagation();
        animateClose();
      }, true);

    }, 0);
  }

  /* ─────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────── */
  function init() {
    injectCSS();
    applyTextReplacements();
    prepareScrollElements();
    initNavLoadAnimation();
    initCalculator();
    initScorecardDots();
    patchModalClose();
    /* Hero sequence registered separately — fires on window.load */
    initHeroSequence();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
