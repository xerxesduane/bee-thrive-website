# Bee Thrive Cleaning Services Website

A fast, responsive, single-page marketing site for Bee Thrive Cleaning Services, a licensed
Dubai cleaning company. Built with plain HTML, CSS, and vanilla JavaScript. No build step,
no framework, no backend. Upload the folder and it runs.

## Files

```
bee-thrive-website/
  index.html        Page markup and meta tags
  styles.css        All styling (brand colours, layout, responsive, motion)
  script.js         Config object + behaviour (links, nav, service finder, moments, form,
                    FAQ, hero reel, action bar, reveal, JSON-LD)
  robots.txt        Search crawler rules
  sitemap.xml       Single-page sitemap
  assets/           Optimised logo, favicons, photos, social preview
  process_images.py One-off script used to generate the assets (kept for reference)
  README.md         This file
```

## Run locally

Open `index.html` directly in a browser for a quick look, or serve it (recommended, so the
map iframe and relative paths behave exactly like production):

```
cd bee-thrive-website
python -m http.server 8000
```

Then visit http://localhost:8000

Both methods have been confirmed to work.

## Editing business details

Every phone number, email, address, social link, and the WhatsApp number live in one place:
the `CONFIG` object at the top of `script.js`. Change a value there and every link on the
page updates automatically (click-to-call, WhatsApp, email, map, social, and the JSON-LD
structured data).

- `CONFIG.whatsapp` (`971568462872`) receives every WhatsApp chat.
- `CONFIG.defaultMessage` ("I'm interested, referred by Xerxes") is always the first line of
  every WhatsApp message and the subject and first body line of every email link.
- `CONFIG.email` is the primary address (`data-email`), `CONFIG.emailSecondary` the second
  one (`data-email-secondary`). Both show in the contact card, footer and booking form.
- `CONFIG.addressStreet` and `CONFIG.addressLocality` feed the JSON-LD postal address (the
  visible address in the contact card is plain text in `index.html`).
- `CONFIG.reviewLink` is empty for now. Paste the Google "write a review" link there and the
  "Leave us a review" button uses it (until then it opens `CONFIG.maps`).

### How contact links are wired

The HTML never contains `wa.me`, `tel:` or `mailto:` links. Each button carries a data
attribute and `bindLinks()` in `script.js` fills in the real link on load:

| Attribute | Becomes |
|---|---|
| `data-wa-link` | WhatsApp chat with `CONFIG.defaultMessage` |
| `data-wa-service="Deep cleaning"` | adds a second line `Service: Deep cleaning` |
| `data-wa-area="Deira"` | adds a line `Area: Deira` |
| `data-call-primary` / `data-call-secondary` | click-to-call for either phone |
| `data-email` / `data-email-secondary` | email with the default subject and body |
| `data-maps`, `data-review-link`, `data-instagram`, `data-facebook` | external links |

The booking form sends its details as extra lines after the default message, on WhatsApp
or (via "Prefer email?") to either address.

### Page sections

Header (top bar on desktop), bento hero, trust strip, trusted-by names, `#services` (lane
cards, service finder and 20 service cards), `#moments` (book by moment and a prep
checklist), `#why`, `#showreel`, `#areas`, `#reviews`, `#clients`, `#how` (steps plus
"How your quote is worked out" at `#quote`; the old `#pricing` anchor still lands there),
`#contact`, `#faq`, final call to action, footer, and a mobile action bar or desktop
WhatsApp pill.

To add a service, copy an `article.svc-card`, give it a unique `id`, `data-cat` (`home`,
`business`, `holiday` or `moves`), and a `data-service` that exactly matches an `<option>`
in the booking form. The finder, counts and structured data pick it up automatically. To
add an area, add an `a.area-chip` with `data-area` and `data-emirate`; the finder, the form's
area suggestions and the structured data follow it.

## Deploy

This is a static site, so any static host works.

- **Netlify**: drag the `bee-thrive-website` folder onto the Netlify dashboard, or connect a
  repo and set the publish directory to the project root with no build command.
- **Vercel**: import the folder as a project, framework preset "Other", no build command,
  output directory is the root.
- **GitHub Pages**: push the files to a repo and enable Pages on the branch root.

After deploying to the real domain, update the domain references (see checklist).

## What was used from your assets

From `Documents\bee thrive cleaning services`:

- `logo.jpg` -> processed into a transparent-background logo (`assets/logo-mark.png` and a
  400px version, and `assets/logo-mark-128.png`, a light 128px-tall copy used in the header
  and footer), plus `favicon.ico`, `favicon-32.png`, and `apple-touch.png`.
- `cover photo.jpg` -> `assets/og-cover.jpg` (1200x630 social preview) and `assets/cover.jpg`.
- `photo 1.jpg`, `photo 2.jpg` -> hero and gallery (real staff cleaning office glass in Deira).
- `photo 3.jpg` -> gallery (a freshly cleaned office).
- `photo 5.jpg` -> gallery (restroom with cleaning supplies).
- `photo 4.jpg` -> processed and available (`assets/work-restroom-2.jpg`), not currently placed.

The `promotional*.jpg` flyers were intentionally left out of the main design. They have
baked-in text, mixed fonts, and a couple of phone-number typos, so using them would have
worked against the clean, premium look. They remain in your source folder if you want them.

The showreel videos are live in `#showreel` and in the hero reel tile (which only
downloads its video when the play button is pressed).

## Checklist: a few things to confirm

These details were not pinned down in the brief. The site ships with sensible defaults that
are easy to change.

- [x] **Main WhatsApp line.** `+971 56 846 2872` (`CONFIG.whatsapp` = `971568462872`).
- [ ] **Google review link.** Add it to `CONFIG.reviewLink`.
- [ ] **Weekly rest day.** You operate six days a week. The default open days in `script.js`
      (`CONFIG.openDays`) currently list every day except **Friday**. If your closed day is
      different, edit that array. Opening hours are left out of the JSON-LD until you set
      `CONFIG.hoursConfirmed` to `true`, so unconfirmed hours are never published.
- [ ] **Domain.** Placeholder is `https://www.beethrivecleaning.com`. Once the real domain is
      set, update it in three spots: `CONFIG.domain` in `script.js`, the `<link rel="canonical">`
      and Open Graph URLs in `index.html`, and the `loc`/`Sitemap` lines in `sitemap.xml` and
      `robots.txt`.
- [ ] **Office hours.** Defaulted to 08:00 to 20:00. Adjust `CONFIG.opens` / `CONFIG.closes`
      if needed, then set `CONFIG.hoursConfirmed: true` to publish them.
- [x] **Satisfaction guarantee is live.** The site promises a free re-clean if any area is
      flagged within 24 hours. The wording is always "tell us within 24 hours and we return to
      re-clean it". It appears in the hero promise tile, the trust strip, the `#why` standard
      and promise card, the steps, the contact aside, the final call to action and the FAQ.

## Accessibility and SEO notes

- Semantic landmarks, skip link, keyboard-operable nav, form, and FAQ.
- Alt text on every image, visible focus rings, AA-level colour contrast.
- Positioning line: "Dubai's best-supervised cleaning company". Meta title and description
  target "cleaning company in Dubai" and "cleaning services Dubai and Sharjah".
- Open Graph and Twitter cards use the branded cover image, with image dimensions and `en_AE` locale.
- Local SEO meta: `geo.region`, `geo.position`, `ICBM`, and `robots: max-image-preview:large`.
- Structured data (`@graph` in the page) for richer Google results:
  - `LocalBusiness` (additional type Cleaner) with licence number, address, geo coordinates,
    hours, social profiles, logo and contact details. `areaServed` is generated from the
    area chips and `hasOfferCatalog` from the service cards, so neither drifts from the page.
    No prices, and no `Review` or `aggregateRating` markup (Google's policy disallows
    self-serving ratings taken from third-party sites).
  - `VideoObject` for the showreel.
  - `FAQPage` generated automatically from the on-page FAQ, so the two never drift apart.
- Web app manifest (`site.webmanifest`) with 192, 512, and maskable icons.
- Performance: the hero photo is preloaded on wide screens only (measured LCP is the H1 text;
  on phones the photo sits below the hero card), the main showreel video downloads nothing
  until played, and the Google Fonts
  stylesheet loads without blocking render (with a `<noscript>` fallback).
- `prefers-reduced-motion` is respected: the hero entrance, scroll reveals, count-up stats,
  hover lifts, the button sweep, orbits, the action-bar slide and all smooth scrolling
  (including the lane cards and moments buttons) switch off.
- `?allvisible` on the URL shows every section immediately (handy for full-page screenshots).

### New asset and config files

- `assets/icon-192.png`, `assets/icon-512.png`, `assets/icon-maskable-512.png` for the manifest.
- `site.webmanifest`. If you change the domain, no edit is needed here (paths are relative),
  but update `start_url`/`scope` only if the site is served from a sub-path.

### Motion and interaction additions

- Orchestrated hero load (staggered rise), count-up on the "6 days" stat, staggered card
  reveals, active-section highlighting in the nav, a primary-button light sweep, button icon
  nudge, and a gentle hero image zoom-in. There is no preloader, carousel or autoplay video. All are guarded for reduced-motion and have a
  visibility safety net so content is never left hidden if a browser skips the animation.
