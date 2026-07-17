# Bee Thrive Cleaning Services Website

A fast, responsive, single-page marketing site for Bee Thrive Cleaning Services, a licensed
Dubai cleaning company. Built with plain HTML, CSS, and vanilla JavaScript. No build step,
no framework, no backend. Upload the folder and it runs.

## Files

```
bee-thrive-website/
  index.html        Page markup and meta tags
  styles.css        All styling (brand colours, layout, responsive, motion)
  script.js         Config object + behaviour (links, nav, form, FAQ, reveal, JSON-LD)
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
  400px version), plus `favicon.ico`, `favicon-32.png`, and `apple-touch.png`.
- `cover photo.jpg` -> `assets/og-cover.jpg` (1200x630 social preview) and `assets/cover.jpg`.
- `photo 1.jpg`, `photo 2.jpg` -> hero and gallery (real staff cleaning office glass in Deira).
- `photo 3.jpg` -> gallery (a freshly cleaned office).
- `photo 5.jpg` -> gallery (restroom with cleaning supplies).
- `photo 4.jpg` -> processed and available (`assets/work-restroom-2.jpg`), not currently placed.

The `promotional*.jpg` flyers were intentionally left out of the main design. They have
baked-in text, mixed fonts, and a couple of phone-number typos, so using them would have
worked against the clean, premium look. They remain in your source folder if you want them.

The two videos (`video.mp4`, `video 2.mp4`) were not used yet. If you would like a short
muted background video in the hero, say the word and I will wire it in.

## Checklist: a few things to confirm

These details were not pinned down in the brief. The site ships with sensible defaults that
are easy to change.

- [ ] **Main WhatsApp line.** Assumed `+971 56 509 1801` (`CONFIG.whatsapp` = `971565091801`).
      If the other number should receive chats, update `CONFIG.whatsapp` in `script.js`.
- [ ] **Weekly rest day.** You operate six days a week. The default open days in `script.js`
      (`CONFIG.openDays`) currently list every day except **Friday**. If your closed day is
      different, edit that array and the opening hours in the JSON-LD update automatically.
- [ ] **Domain.** Placeholder is `https://www.beethrivecleaning.com`. Once the real domain is
      set, update it in three spots: `CONFIG.domain` in `script.js`, the `<link rel="canonical">`
      and Open Graph URLs in `index.html`, and the `loc`/`Sitemap` lines in `sitemap.xml` and
      `robots.txt`.
- [ ] **Office hours.** Defaulted to 08:00 to 20:00. Adjust `CONFIG.opens` / `CONFIG.closes`
      if needed.
- [x] **Satisfaction guarantee is live.** The site promises a free re-clean if any area is
      flagged within 24 hours (see the "Love the result, guaranteed" section and the matching
      FAQ answer). This was confirmed for inclusion. To change or remove it later, edit those
      two spots in `index.html`.

## Accessibility and SEO notes

- Semantic landmarks, skip link, keyboard-operable nav, form, and FAQ.
- Alt text on every image, visible focus rings, AA-level colour contrast.
- Meta title and description target "cleaning services Dubai" and "Deira cleaning company".
- Open Graph and Twitter cards use the branded cover image, with image dimensions and `en_AE` locale.
- Local SEO meta: `geo.region`, `geo.position`, `ICBM`, and `robots: max-image-preview:large`.
- Structured data (`@graph` in the page) for richer Google results:
  - `CleaningService` with licence number, address, geo coordinates, both phones, hours,
    area served, social profiles, logo, service coverage, and contact details,
    an `aggregateRating`, and the four Google reviews as `Review` objects (these are what
    make star ratings eligible to appear in search).
  - `FAQPage` generated automatically from the on-page FAQ, so the two never drift apart.
- Web app manifest (`site.webmanifest`) with 192, 512, and maskable icons.
- Performance: the hero image is preloaded as the likely LCP element, and the Google Fonts
  stylesheet loads without blocking render (with a `<noscript>` fallback).
- `prefers-reduced-motion` is respected: the hero entrance, scroll reveals, count-up stats,
  hover lifts, and smooth scroll all switch off.

### New asset and config files

- `assets/icon-192.png`, `assets/icon-512.png`, `assets/icon-maskable-512.png` for the manifest.
- `site.webmanifest`. If you change the domain, no edit is needed here (paths are relative),
  but update `start_url`/`scope` only if the site is served from a sub-path.

### Motion and interaction additions

- Orchestrated hero load (staggered rise), count-up trust stats, staggered service-card
  reveals, active-section highlighting in the nav, a primary-button light sweep, button icon
  nudge, and a gentle hero image zoom-in. All are guarded for reduced-motion and have a
  visibility safety net so content is never left hidden if a browser skips the animation.
