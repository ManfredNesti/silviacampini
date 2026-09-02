# silviacampini.it

Website of Dott.ssa Silvia Campini, ENT specialist (otorhinolaryngology) in
Domodossola. Static — plain HTML, CSS and a small JavaScript file. No build step,
no dependencies, no framework.

**Live:** https://www.silviacampini.it

## Structure

```
silviacampini/
├── index.html          # Home (hero, bio, services, location, map)
├── prestazioni.html    # Full list of services
├── cv.html             # Education, experience, publications
├── privacy.html        # Privacy policy (GDPR)
├── cookie-policy.html  # Cookie policy
├── css/style.css       # All styling — theme in the "DESIGN TOKENS" block
├── js/main.js          # Mobile menu
├── js/cookie-consent.js # Cookie banner; loads Google Maps only after consent
├── assets/             # logo, monogram, hospital map, favicon
├── robots.txt
├── sitemap.xml
├── CNAME               # Custom domain for GitHub Pages
└── .nojekyll           # Serve files as-is (no Jekyll processing)
```

## Notes

- **Bookings** go through Calendly (`calendly.com/silvia-campini`) — just a link,
  no embed, no cookies until the visitor leaves the site.
- **Google Maps** is loaded only after cookie consent, to stay GDPR-compliant.
- **SEO:** per-page canonical/Open Graph tags, plus `Physician` JSON-LD on the home.

## Editing

- **Copy:** directly in the `.html` files.
- **Theme:** `DESIGN TOKENS` block at the top of `css/style.css`
  (`--c-primary` teal, `--c-primary-light` accent).

## Hosting

GitHub Pages, served from `main` (root). Primary domain `www.silviacampini.it`
(`.it` for local Italian SEO); `silviacampini.com` redirects to it. DNS at TopHost.
