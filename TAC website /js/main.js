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
    '  <div class="audit-modal">',
    '    <button class="audit-modal-close" id="auditModalClose" aria-label="Close">&times;</button>',
    '    <div class="audit-modal-label">No Obligation</div>',
    '    <h2 class="audit-modal-title" id="auditModalTitle">Request your free intake audit.</h2>',
    '    <p class="audit-modal-sub">We will review your contact flow, scheduling process, and after-hours availability. You receive a written summary of every gap we find, ranked by revenue impact.</p>',
    '    <form class="audit-modal-form" id="auditModalForm" novalidate>',
    '      <div class="audit-field">',
    '        <label for="auditName">Your Name</label>',
    '        <input type="text" id="auditName" name="name" placeholder="Jane Smith" required>',
    '      </div>',
    '      <div class="audit-field">',
    '        <label for="auditFirm">Firm Name</label>',
    '        <input type="text" id="auditFirm" name="firm" placeholder="Smith Elder Law" required>',
    '      </div>',
    '      <div class="audit-field">',
    '        <label for="auditEmail">Email Address</label>',
    '        <input type="email" id="auditEmail" name="email" placeholder="jane@smithelderlaw.com" required>',
    '      </div>',
    '      <button type="submit" class="btn-primary audit-modal-submit">Send Audit Request</button>',
    '      <p class="audit-modal-note">Qualifying firms: estate planning or elder law practices with 2 to 10 attorneys and an active marketing spend.</p>',
    '    </form>',
    '    <div class="audit-modal-success" id="auditModalSuccess" style="display:none;">',
    '      <div class="audit-success-icon">&#10003;</div>',
    '      <h3>Request received.</h3>',
    '      <p>We will be in touch within one business day to confirm your audit and arrange a time.</p>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var auditModal = document.getElementById('auditModal');
  var auditModalClose = document.getElementById('auditModalClose');
  var auditModalForm = document.getElementById('auditModalForm');
  var auditModalSuccess = document.getElementById('auditModalSuccess');

  function openAuditModal() {
    auditModal.classList.add('open');
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

    var name  = document.getElementById('auditName').value.trim();
    var firm  = document.getElementById('auditFirm').value.trim();
    var email = document.getElementById('auditEmail').value.trim();

    // Basic validation
    if (!name || !firm || !email) {
      var missing = auditModalForm.querySelector('.audit-error');
      if (!missing) {
        var err = document.createElement('p');
        err.className = 'audit-error';
        err.textContent = 'Please fill in all three fields.';
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
        name: name,
        firm: firm,
        email: email,
        _subject: 'Free Audit Request — ' + firm
      })
    })
    .then(function (response) {
      if (response.ok) {
        auditModalForm.style.display = 'none';
        auditModalSuccess.style.display = 'block';
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
