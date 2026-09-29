# Bee Thrive Cleaning Services Website

A fast, responsive marketing site for Bee Thrive Cleaning Services, a licensed Dubai cleaning
company. Plain HTML, CSS and vanilla JavaScript: no build step, no framework, no backend, no
analytics or trackers. Hosted on Vercel from GitHub (`vercel.json` sets `cleanUrls`, so
`/deep-cleaning-dubai` serves `deep-cleaning-dubai.html`).

## Files

```
bee-thrive-website/
  index.html                            Home page (full HousekeepingService JSON-LD lives here)
  about.html                            About us (company facts, licence, supervision)
  deep-cleaning-dubai.html              Service landing pages, one per service family
  move-in-move-out-cleaning-dubai.html
  home-cleaning-dubai.html
  holiday-home-cleaning-dubai.html
  post-construction-cleaning-dubai.html
  office-cleaning-dubai.html
  commercial-cleaning-dubai.html
  cleaning-services-sharjah.html        Sharjah hub
  404.html                              Branded not-found page (noindex)
  styles.css                            Shared styling (home + every page)
  pages.css                             Landing-page-only styling (page hero, prose, related cards)
  script.js                             CONFIG + behaviour (links, attribution, share, nav, finder,
                                        form, FAQ, action bar, reveal). Writes no structured data.
  robots.txt                            Crawler policy (search, AI answer engines, AI training)
  sitemap.xml                           All 10 indexable URLs, with image entries
  llms.txt                              Plain-text fact sheet for AI assistants
  site.webmanifest                      Web app manifest
  assets/                               Logo, favicons, photos, videos
  assets/og/                            1200x630 share images, one per page (versioned names)
  .vercelignore                         Keeps README, tools, scripts and screenshots out of the deploy
  tools/pages/gen.mjs                   Generator for every page except index.html (not deployed)
  tools/og/template.html                Share-image template (not deployed)
  process_images.py                     One-off asset script (kept for reference)
```

The landing pages, `/about` and `/404` are generated. Edit their copy in `tools/pages/gen.mjs`
(shared header, footer and schema helpers are in `tools/pages/lib.mjs`), then run
`node tools/pages/gen.mjs` from the repo root. Do not hand-edit the generated `.html` files,
or the next run will overwrite the change.

`assets/og-cover.jpg` is the old share image. It is kept but no longer referenced.

## Run locally

Serve the folder (opening `index.html` from disk breaks the root-relative `/assets/...` paths):

```
cd bee-thrive-website
npx vercel dev        # mirrors cleanUrls exactly
# or: python -m http.server 8000   (then open /deep-cleaning-dubai.html etc. with the .html)
```

Every page uses root-relative paths (`/assets/...`, `/styles.css`, `/script.js`) and
extensionless links (`/deep-cleaning-dubai`, `/#contact`), never `.html`.

## Editing business details

Phones, emails, WhatsApp number, social and map links live in `CONFIG` at the top of
`script.js`. Change a value there and every contact link on every page updates.

- `CONFIG.whatsapp` (`971568462872`) receives every WhatsApp chat.
- `CONFIG.defaultMessage` ("I'm interested, referred by Xerxes") is always the first line of
  every WhatsApp lead message, and the subject and first body line of every email link.
- `CONFIG.email` / `CONFIG.emailSecondary` feed `data-email` / `data-email-secondary`.
- `CONFIG.reviewLink` is empty. Until it is set, every `[data-review-link]` opens the Google
  listing (`CONFIG.maps`) with the honest label "Find us on Google to leave a review", and the
  home "Leave us a review" button (`data-review-only`) stays hidden. Paste the Google "write a
  review" link there and the links switch to their `data-review-label` text ("Leave a Google
  review") and the hidden button appears.
- `CONFIG.hoursConfirmed` is `false`. Opening hours are not published anywhere (HTML,
  JSON-LD, llms.txt). Once confirmed, add them by hand to the LocalBusiness JSON-LD in
  `index.html` (the `/about` page copies that node when it is regenerated), and to the Google
  Business Profile.
- `CONFIG.shareText`, `CONFIG.shareCampaign`, `CONFIG.sharePrefixDefault`: see "Share" below.

### Structured data is static

JSON-LD is written by hand into each page's HTML, because search crawlers and most AI bots do
not run JavaScript. Nothing in `script.js` writes structured data.

- `index.html`: one `@graph`, in `<head>` right after the preload link (so fetchers that
  only read the start of a page still get it), with WebSite, WebPage, ImageObject, the full
  business node (`@type` HousekeepingService, a LocalBusiness subtype: legal name, licence
  identifier, geo, map, sameAs, offer catalogue of services with page URLs), VideoObject and
  FAQPage (all 18 home questions).
- Landing pages: WebPage, a WebSite stub (so `isPartOf` resolves on the page), ImageObject,
  Service, an identical HousekeepingService stub with `sameAs` under the same `@id`,
  BreadcrumbList and FAQPage. `/about` uses AboutPage, the WebSite stub and the full business
  node from the home page (without the offer catalogue), and has no FAQ. 404 has none.
- Keep `@type` HousekeepingService and `@id` `https://www.beethrivecleaning.com/#business`
  identical on every page.
- **Edit the FAQ text and its JSON-LD together.** Each Question `name` and Answer `text` must
  match the visible FAQ word for word. The same goes for titles, descriptions and leads.
- Never add prices, `priceRange`, Offer, opening hours, ratings, reviews or payment methods
  until the owner supplies verified facts.

### How contact links are wired

The HTML never contains `wa.me`, `tel:` or `mailto:` links. Each button carries a data
attribute (with a `/#contact` fallback href) and `bindLinks()` fills in the real link.
Instagram, Facebook and Google Maps links carry their real URL in the static `href` too (the
Maps one as `https://www.google.com/maps?cid=14709114580816797633`), so crawlers and no-JS
visitors see the profiles; `bindLinks()` still rewrites them from `CONFIG` and opens them in a
new tab:

| Attribute | Becomes |
|---|---|
| `data-wa-link` | WhatsApp chat starting with `CONFIG.defaultMessage` |
| `data-wa-service="Deep cleaning"` | adds `Service: Deep cleaning` |
| `data-wa-area="Sharjah"` | adds `Area: Sharjah` |
| `data-call-primary` / `data-call-secondary` | click-to-call for either phone |
| `data-email` / `data-email-secondary` | email with the default subject, body and source line |
| `data-maps`, `data-review-link`, `data-instagram`, `data-facebook` | external links |

### Lead attribution (instead of analytics)

Every lead message says where it came from, after the default message:

```
I'm interested, referred by Xerxes
Service: Deep cleaning                          (if data-wa-service)
Area: Sharjah                                   (if data-wa-area)
From: website, deep cleaning page (hero)        (always)
Came via: Instagram bio                         (only if a UTM source was seen this session)
First page: /                                   (only if the visit started on another page)
```

- The page label comes from `<body data-page="...">` (missing means "home page").
- The section label comes from the closest `data-wa-from="..."` ancestor (hero, services,
  reviews, FAQ, quote form, mobile bar, footer and so on).
- `Came via` reads `utm_source` / `utm_medium` (sanitised) and keeps them in
  `sessionStorage` for the visit. If storage is blocked the lines are simply left out.
- The quote form sends the default message, a blank line, the fields that were filled in,
  then these lines. No personal data ever goes into a URL.

Owner channel links (use these so chats show their source):

- Instagram bio: `https://www.beethrivecleaning.com/?utm_source=instagram&utm_medium=bio`
- Facebook page: `https://www.beethrivecleaning.com/?utm_source=facebook&utm_medium=page`
- Google Business Profile website: `https://www.beethrivecleaning.com/?utm_source=google&utm_medium=gbp`
- GBP appointment link: a `wa.me/971568462872` chat whose text starts
  "I'm interested, referred by Xerxes", followed by a line "Source: Google Business Profile".

### Share ("Recommend Bee Thrive")

Every page has a `section.share-block[data-share]` with "Send to a friend on WhatsApp"
(an outline button, so solid green and honey buttons always mean "contact Bee Thrive"), Copy
link, and More ways to share (only shown where the browser supports `navigator.share`), plus a
Google review link. On phones the quick-contact bar hides while the share block is on screen.

- Shared URLs are the page's canonical URL plus
  `utm_source=whatsapp|copy|native&utm_medium=share&utm_campaign=recommend`. A friend who
  later gets in touch arrives with `Came via: a link shared by a friend`.
- The WhatsApp share (`wa.me/?text=`, no number) is a message from the visitor to a friend,
  so by default it does not start with the referral line. Set
  `CONFIG.sharePrefixDefault = true` if the owner wants it there too.
- `data-share-text` on the block sets the message; without it `CONFIG.shareText` is used.
- If the clipboard is blocked (common in Instagram and Facebook in-app browsers), the URL box
  switches to the tracked copy link and selects it, so a manual copy keeps the UTMs.
- There are no share counts, and nothing records who shared with whom.

### Other script hooks

- `[data-bar-trigger]`: the phone action bar stays hidden while this (the hero CTAs) is on
  screen. `[data-bar-hide]`: the bar and the desktop pill hide while it is on screen (the
  final CTA). Both also hide over `#contact`.
- `/?service=Deep%20cleaning#contact` preselects that service in the quote form (exact option
  text only). Landing pages use it for their "Use the quote form" button.
- `/?area=Sharjah#contact` fills the Area field, only when the value exactly matches an area
  chip (`data-area`). The Sharjah page uses it.
- The desktop WhatsApp pill is hidden while the hero CTAs are on screen, like the phone bar,
  and shrinks to an icon once the hero has scrolled away.
- Every `init*` function returns early when its elements are missing, so `script.js` runs on
  every page with no console errors.
- `?allvisible` shows every section immediately (handy for full-page screenshots).

### Home page sections

Header, bento hero, trust strip, trusted-by names, `#services` (lanes, finder and 20 cards,
18 of them linking to a landing page), `#reviews`, `#recommend` (share), `#moments`, `#why`,
`#showreel`, `#areas`, `#clients`, `#how` (with `#quote`), `#contact` (form), `#at-a-glance`
(company facts), `#faq`, final call to action, footer, and the phone bar / desktop pill.

To add a service card, copy an `article.svc-card`, give it a unique `id`, `data-cat` and a
`data-service` that exactly matches an `<option>` in the booking form, then add it to the
offer catalogue in the home JSON-LD by hand.

## Crawlers and AI assistants

- `robots.txt` allows every crawler. Search engines and AI answer engines (OAI-SearchBot,
  ChatGPT-User, PerplexityBot, Claude-SearchBot and others) have their own group, and AI
  training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot,
  meta-externalagent) another. **Default (owner to confirm):** training is allowed. To opt out of
  training only, change that group's `Allow: /` to `Disallow: /`. A named group replaces `*`
  for that bot, so any future Disallow line must be repeated in every group.
- `llms.txt` is a short, factual summary for AI assistants. Keep it in step with the
  at-a-glance block on the home page and `/about`.
- `sitemap.xml`: update `lastmod` on every page whose content changes.
- In the Vercel dashboard, keep the AI Bots firewall ruleset off (or log only) so these
  crawlers are not blocked, and redirect the `.vercel.app` domain to www.

## Share images (`assets/og/`)

One 1200x630 JPEG per page (under 300 KB), built from real Bee Thrive photos with the logo,
headline and licence chip. Names are versioned (`og-deep-cleaning-v1.jpg`) because WhatsApp
and iMessage cannot be told to forget a cached image: a changed image always needs a new
file name (`-v2`) and updated `og:image` / `twitter:image` tags.

To re-render: open `tools/og/template.html?page=<key>` (it loads photos from `../../assets/`)
and render it at 1200x630, deviceScaleFactor 1, with headless
Chrome after `document.fonts.ready`, then convert with Pillow:
`Image.open(png).convert("RGB").save(out, "JPEG", quality=82, optimize=True, progressive=True)`
(drop to 76 if a file goes over 300 KB). Keep key text inside the centre 60% and off
the bottom band; never put phone numbers, prices, ratings or emoji on a card, and never use
`showreel-home-poster.jpg` or `showreel-main-poster.jpg` (they have baked-in text), and keep
the restroom photos off share cards (at preview size the toilet is the most recognisable
object). The deep, move, holiday-home, home-cleaning and commercial cards are `-v2` for that
reason; the `-v1` files are kept but no longer referenced.

After every deploy that changes share tags or images, re-scrape each URL in the Facebook
Sharing Debugger, LinkedIn Post Inspector and Telegram @WebpageBot.

## Owner to supply

These are left out on purpose until the owner confirms them (nothing is invented):

1. Whether shared messages should also start with the referral line (`sharePrefixDefault`).
2. Whether to keep allowing AI training crawlers (robots.txt).
3. Opening days, hours and rest day (then `hoursConfirmed` and the JSON-LD, and GBP).
4. The Google "write a review" link (`CONFIG.reviewLink`) and the Place ID.
5. Confirmation that the GBP pin (25.27064, 55.32216) is on the Al Qasimi Building, plus
   the exact GBP address, categories and service area.
6. The Google rating and review count (only if wanted as visible text), and confirmation
   that the four quoted reviews are 5-star. The star glyphs and the "Five-star reviews" trust
   label come from the live site; if they cannot be confirmed, remove the `.stars` elements
   and change the label to "Google reviews, quoted word for word".
7. Accepted payment methods (removed from structured data until confirmed).
8. Room-by-room scope checklists for deep, move-out, post-construction, holiday-home
   turnover, office and window cleaning.
9. Sharjah neighbourhoods served, any Dubai-only services, and whether Sharjah jobs cost
   the same as Dubai. If there is no surcharge, the Sharjah page can answer "Is there an
   extra charge for cleaning in Sharjah?" with a direct "No." (it currently explains how a
   Sharjah quote is worked out instead).
10. Typical visit length and team size, booking lead time, same-cleaner policy, whether the
    client must be home.
11. Languages spoken (for `contactPoint.availableLanguage`).
12. Insurance, certifications, vetting specifics, VAT/TRN, product claims: only if documented.
13. Whether nanny/babysitter and office support staff are provided by the licensed entity.
14. Client permission to name clients on landing pages and /about, and the proper name for
    "Car Show". Also confirm whether the CF Helmet Warehouse work was a warehouse clean (it is
    listed as an office client and is not used as warehouse proof).
15. The official Arabic trade name and a DET licence verification link or certificate image.
16. More real, consented landscape photos (home deep clean, move-out, villa post-construction,
    holiday-home turnover, team and supervisor) and a vector logo.
17. All official social profiles for `sameAs` (and an X handle for `twitter:site`).
18. Search Console and Bing Webmaster verification, sitemap submission, indexing requests,
    and matching NAP listings on Bing Places, Apple Business Connect and UAE directories.

## Accessibility and performance

- Semantic landmarks, skip link, keyboard-operable nav, finder, share, form and FAQ, visible
  focus rings, AA contrast from the design tokens, 44px+ tap targets (footer links included).
- The home H1 and lead are painted immediately (they slide in but never start invisible), so
  they do not delay LCP. The hero photo is preloaded on wide screens only.
- Videos download nothing until played. Fonts load without blocking render.
- `prefers-reduced-motion` switches off the hero entrance, reveals, count-up, hover lifts,
  orbits, the action-bar slide and smooth scrolling.
- Layout works down to 360px with no horizontal scroll.
