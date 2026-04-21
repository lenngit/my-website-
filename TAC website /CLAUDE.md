# TAC Website — Claude Code Handover

## Where the code lives

- **Local folder:** `/Users/leonardtembo/my-website-/TAC website ` (note the trailing space in the folder name)
- **GitHub repo:** https://github.com/lenngit/my-website-.git (branch: `main`)
- **Live site:** https://theacquisitionco.com
- **Hosting:** Vercel — auto-deploys on every push to `main` on GitHub. No manual deploy step needed.

## How to deploy changes

```bash
cd "/Users/leonardtembo/my-website-/TAC website "
git add -A
git commit -m "your message here"
git push
```

When prompted: username is `lenngit`, password is your GitHub Personal Access Token (not your GitHub password).

## Site structure

Static HTML/CSS/JS — no build step, no framework.

```
TAC website /
├── index.html              # Homepage
├── framework/index.html    # TAC Framework page
├── scorecard/index.html    # Intake Scorecard (interactive)
├── about/index.html        # About Leonard / TAC
├── free-audit/index.html   # LinkedIn landing page (no nav, logo only)
├── privacy/index.html      # Privacy Policy
├── blog/
│   ├── index.html
│   ├── the-312000-question/index.html
│   ├── why-professional-intake-is-killing-your-consult-bookings/index.html
│   └── you-are-not-losing-clients-to-better-lawyers/index.html
├── solutions/
│   ├── medicaid-planning/index.html
│   ├── crisis-asset-protection/index.html
│   └── probate-estate/index.html
├── css/styles.css          # Shared stylesheet for all pages
├── js/main.js              # Shared JS — handles nav, audit modal, Formspree + Calendly
├── assets/                 # Images, logo
├── sitemap.xml
└── llms.txt                # AI site documentation
```

## Key technical details

- **Shared CSS:** `/css/styles.css` — applies to all pages. The `nav` element selector sets `position: fixed`. Do not use a `<nav>` tag inside footers or page body on any page (use `<div>` instead) as it will inherit fixed positioning.
- **Shared JS:** `/js/main.js` — injected on every page. Handles: sticky nav, mobile hamburger menu, audit modal (Formspree + Calendly).
- **Audit modal trigger:** Any `<a>` or `<button>` where `href="#"` AND text contains "audit" or "request" opens the modal automatically. No other wiring needed.
- **Formspree endpoint:** `https://formspree.io/f/xaqlzgpb` — captures firm name and website URL only.
- **Calendly booking URL:** `https://calendly.com/leonard-tac/audit-walkthrough`
- **LinkedIn Insight Tag:** Present on all pages as a placeholder (`YOUR_PARTNER_ID`). Replace with real Partner ID from LinkedIn Campaign Manager > Account Assets > Insight Tag when running paid ads.
- **Headshot image:** `/assets/headshot3.png` — referenced on free-audit page and homepage. Falls back gracefully if missing.

## Things NOT to change unless asked

- The two-step modal flow (Formspree form → Calendly embed). This is intentional.
- The `lp-footer` on the free-audit page uses a `<div class="lp-footer-links">` (not `<nav>`) — keep it as a div.
- The Home link on the free-audit page is an inline `<a>` tag inside the `<nav>` header, not in the footer.
- The `llms.txt` file in the root — update it if new pages are added.

