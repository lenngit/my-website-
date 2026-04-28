/* =========================================================
   TAC | The Acquisition Company — Main JS
   ========================================================= */

(function () {
  'use strict';

  /* ── Logo: hide text wordmark once image loads ──────── */
  var logoImg = document.querySelector('.nav-logo-icon img');
  var wordmark = document.querySelector('.nav-logo-wordmark');
  if (logoImg && wordmark) {
    function hideWordmark() {
      if (logoImg.naturalWidth > 0) wordmark.style.display = 'none';
    }
    if (logoImg.complete) { hideWordmark(); }
    else { logoImg.addEventListener('load', hideWordmark); }
  }

  /* ── Sticky Nav ──────────────────────────────────────── */
  var nav = document.querySelector('nav');
  if (nav) {
    var hasHero = !!document.querySelector('.hero');

    function updateNav() {
      // Pages without a hero start solid immediately.
      // Pages with a hero go transparent at top, solid on scroll.
      if (!hasHero || window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile Menu ─────────────────────────────────────── */
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Audit Form Modal ────────────────────────────────── */

  // Inject modal HTML once
  var modalHTML = [
    '<div class="audit-modal-overlay" id="auditModal" role="dialog" aria-modal="true" aria-labelledby="auditModalTitle">',
    '  <div class="audit-modal" id="auditModalBox">',
    '    <button class="audit-modal-close" id="auditModalClose" aria-label="Close">&times;</button>',
    '    <div class="audit-modal-label">No Obligation</div>',
    '    <h2 class="audit-modal-title" id="auditModalTitle">Request your free intake audit.</h2>',
    '    <p class="audit-modal-sub">Tell us your firm and website. We will run the audit before the call — you just pick a time on the next step.</p>',
    '    <form class="audit-modal-form" id="auditModalForm" novalidate>',
    '      <div class="audit-field">',
    '        <label for="auditFirm">Firm Name</label>',
    '        <input type="text" id="auditFirm" name="firm" placeholder="Smith Elder Law" required>',
    '      </div>',
    '      <div class="audit-field">',
    '        <label for="auditWebsite">Firm Website</label>',
    '        <input type="url" id="auditWebsite" name="website" placeholder="https://smithelderlaw.com" required>',
    '      </div>',
    '      <button type="submit" class="btn-primary audit-modal-submit">Next — Pick a Time</button>',
    '      <p class="audit-modal-note">Qualifying firms: estate planning or elder law practices with 2 to 10 attorneys and an active marketing spend.</p>',
    '    </form>',
    '    <div class="audit-modal-success" id="auditModalSuccess" style="display:none;">',
    '      <div class="audit-success-icon">&#10003;</div>',
    '      <p class="audit-success-label">Details received.</p>',
    '      <h3>Now pick a time for your audit walkthrough.</h3>',
    '      <p class="audit-success-sub">Choose a 20-minute slot below. We will run the audit before the call and walk you through every finding live.</p>',
    '      <div class="calendly-widget-wrap"><div class="calendly-inline-widget" id="auditCalendlyEmbed" data-url="https://calendly.com/leonard-tac/audit-walkthrough?hide_event_type_details=1&hide_gdpr_banner=1"></div><div class="calendly-badge-mask"></div></div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var auditModal = document.getElementById('auditModal');
  var auditModalClose = document.getElementById('auditModalClose');
  var auditModalForm = document.getElementById('auditModalForm');
  var auditModalSuccess = document.getElementById('auditModalSuccess');

  var auditModalBox = document.getElementById('auditModalBox');
  var calendlyLoaded = false;

  function loadCalendlyScript() {
    if (calendlyLoaded) return;
    var script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    calendlyLoaded = true;
  }

  function openAuditModal() {
    auditModal.classList.add('open');
    auditModalBox.classList.remove('audit-modal--wide');
    document.body.style.overflow = 'hidden';
    // Reset form state each open
    auditModalForm.style.display = '';
    auditModalSuccess.style.display = 'none';
    auditModalForm.reset();
    setTimeout(function () {
      var first = auditModalForm.querySelector('input');
      if (first) first.focus();
    }, 120);
  }

  function closeAuditModal() {
    auditModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close on backdrop click
  auditModal.addEventListener('click', function (e) {
    if (e.target === auditModal) closeAuditModal();
  });

  // Close button
  auditModalClose.addEventListener('click', closeAuditModal);

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && auditModal.classList.contains('open')) closeAuditModal();
  });

  // Intercept all "audit" CTA clicks sitewide
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href');
    var text = el.textContent.trim().toLowerCase();
    if (href === '#' && (text.includes('audit') || text.includes('request'))) {
      e.preventDefault();
      openAuditModal();
    }
  });

  // Form submit → Formspree
  auditModalForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var firm    = document.getElementById('auditFirm').value.trim();
    var website = document.getElementById('auditWebsite').value.trim();

    // Basic validation
    if (!firm || !website) {
      var missing = auditModalForm.querySelector('.audit-error');
      if (!missing) {
        var err = document.createElement('p');
        err.className = 'audit-error';
        err.textContent = 'Please fill in both fields.';
        auditModalForm.insertBefore(err, auditModalForm.querySelector('.audit-modal-submit'));
      }
      return;
    }

    // Remove any prior error
    var priorErr = auditModalForm.querySelector('.audit-error');
    if (priorErr) priorErr.remove();

    // Disable button during submission
    var submitBtn = auditModalForm.querySelector('.audit-modal-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // POST to Formspree
    fetch('https://formspree.io/f/xaqlzgpb', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firm: firm,
        website: website,
        _subject: 'Intake Audit Request — ' + firm
      })
    })
    .then(function (response) {
      if (response.ok) {
        auditModalForm.style.display = 'none';
        auditModalSuccess.style.display = 'block';
        // Expand modal to fit Calendly embed
        auditModalBox.classList.add('audit-modal--wide');
        // Load Calendly widget script (loads once, initialises the embed div)
        loadCalendlyScript();
        // Scroll modal to top so calendar is visible
        auditModalBox.scrollTop = 0;
      } else {
        return response.json().then(function (data) { throw new Error(data.error || 'failed'); });
      }
    })
    .catch(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Audit Request';
      var errEl = document.createElement('p');
      errEl.className = 'audit-error';
      errEl.textContent = 'Something went wrong. Please try again.';
      auditModalForm.insertBefore(errEl, submitBtn);
    });
  });

})();
