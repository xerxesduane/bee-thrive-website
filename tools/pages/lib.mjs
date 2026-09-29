// Shared page-building helpers for the Bee Thrive landing pages (build tool, not deployed).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(HERE, f), "utf8").replace(/\r\n/g, "\n").replace(/\s+$/, "");

export const SITE = "https://www.beethrivecleaning.com";
export const BIZ = SITE + "/#business";
export const DATE = "2026-09-29";
// Real profile URLs in the static href (crawlers and no-JS visitors see them); bindLinks() still
// rewrites them from CONFIG and adds target/rel. The Maps URL is the listing's CID form.
export const MAPS = "https://www.google.com/maps?cid=14709114580816797633";
export const SAME_AS = ["https://www.instagram.com/beethrivecleaning", "https://www.facebook.com/profile.php?id=61576092291203", MAPS];

const SPRITE = read("sprite.txt");
const ORBIT = read("orbit.txt");
const SOCIAL = read("social.txt");
const FONTS = read("fonts.txt");

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const attr = (s) => esc(s).replace(/"/g, "&quot;");
export const strip = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export const WA_ICO = '<svg class="wa-ico" aria-hidden="true" focusable="false"><use href="#i-wa"/></svg>';
export const PH_ICO = '<svg class="ph-ico" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>';

/* Primary CTA label. With p.ctaShort, phones get the short form so the button stays on one line:
   "Get my deep cleaning quote on WhatsApp" / "Deep cleaning quote on WhatsApp". */
export function ctaInner(p) {
  if (!p.ctaShort) return `<span>${esc(p.ctaLabel)}</span>`;
  const long = p.ctaLabel.replace(/ on WhatsApp$/, "");
  return `<span><span class="label-long">${esc(long)}</span><span class="label-short">${esc(p.ctaShort)}</span> on WhatsApp</span>`;
}

/* data-wa-service / data-wa-area for the page's primary CTAs */
export function waAttrs(p) {
  if (p.service) return ` data-wa-service="${attr(p.service)}"`;
  if (p.area) return ` data-wa-area="${attr(p.area)}"`;
  return "";
}

/* Small in-section WhatsApp button for a specific service */
export function smallWa(service, label, hidden) {
  return `<p class="page-btn"><a class="btn btn-sm btn-wa-soft" data-wa-link data-wa-service="${attr(service)}" href="/#contact">${WA_ICO} ${label}${hidden ? `<span class="visually-hidden"> ${hidden}</span>` : ""}</a></p>`;
}

export const RELATED = {
  deep: ["/deep-cleaning-dubai", "Deep cleaning in Dubai", "Top-to-bottom resets for apartments and villas."],
  move: ["/move-in-move-out-cleaning-dubai", "Move-in and move-out cleaning", "Handover-standard cleaning before you return or collect the keys."],
  home: ["/home-cleaning-dubai", "Home cleaning and maid services", "One-off or regular visits, from a 2-hour minimum."],
  holiday: ["/holiday-home-cleaning-dubai", "Airbnb and holiday home cleaning", "Guest-ready turnovers with optional linen and towels."],
  post: ["/post-construction-cleaning-dubai", "Post-construction cleaning", "Villas and commercial buildings, planned around your handover."],
  office: ["/office-cleaning-dubai", "Office cleaning", "Before or after your working hours, on flexible plans."],
  commercial: ["/commercial-cleaning-dubai", "Commercial cleaning", "Shops, clinics, cafes, restaurants and warehouses."],
  sharjah: ["/cleaning-services-sharjah", "Cleaning services in Sharjah", "The same supervised standard for Sharjah homes and businesses."],
  about: ["/about", "About Bee Thrive", "Licence, company facts and how supervision works."],
};

export function relatedList(keys, names = {}) {
  return `<ul class="related-grid">\n${keys
    .map((k) => {
      const [u, n0, l] = RELATED[k];
      const n = names[k] || n0;
      return `          <li><a class="related-card" href="${u}"><strong>${esc(n)}</strong><span>${esc(l)}</span></a></li>`;
    })
    .join("\n")}\n        </ul>`;
}

export const REVIEWS = {
  nikki: ["Nikki Zaballerro", "The best cleaning company so far I have experienced in UAE."],
  atta: ["Attaullah UT", "The team was professional, thorough, and left my place spotless. They paid attention to every detail and went above and beyond my expectations."],
  huda: ["Huda Mawaleed", "The team arrived right on time, fully equipped, and got to work immediately. They were extremely professional and respectful of my space."],
  russel: ["Russel Inocencio", "Very professional and friendly staff. Fast and efficient. Even every nook and cranny of my apartment was cleaned. Will highly recommend."],
};

export function reviewFig(key) {
  const [n, q] = REVIEWS[key];
  return `<figure class="hero-quote page-review">
            <div class="stars" role="img" aria-label="Rated 5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>${esc(q)}</blockquote>
            <figcaption>${esc(n)} · Google review</figcaption>
          </figure>`;
}
export function review(key) {
  return `<div class="page-review-wrap" data-wa-from="review">
          ${reviewFig(key)}
          <p class="page-note"><a data-maps href="${MAPS}">Read our reviews on Google</a></p>
        </div>`;
}

export const CLIENTS = {
  holiday: [["FS", "Fixem Solutions"], ["MSH", "MSH Holiday Homes"], ["CH", "Crescent Holiday Homes"], ["NH", "Nalada Holiday Homes"], ["LK", "Loft and Keys Holiday Homes"]],
  office: [["CF", "Cerafiltech"], ["LC", "Landcom Real Estate"], ["MS", "Mindstream"], ["#", "Hashtag #10"], ["TK", "TK Airport Solutions"], ["Y", "YUSR"], ["CF", "CF Helmet Warehouse"], ["SS", "Star Shine Media Technology"]],
  events: [["AM", 'Al Mutarid Community Center<span class="client-loc">Al Ain, UAE</span>', true], ["CS", "Car Show"], ["IE", "Identity Events LLC"]],
};
export function clientGrid(key) {
  return `<div class="client-grid">\n${CLIENTS[key]
    .map(([m, n, raw]) => `            <article class="client-card"><span class="client-mono" aria-hidden="true">${esc(m)}</span><span class="client-name">${raw ? n : esc(n)}</span></article>`)
    .join("\n")}\n          </div>`;
}

export const ticks = (items) => `<ul class="tick-list tick-list-lg">\n${items.map((i) => `            <li>${i}</li>`).join("\n")}\n          </ul>`;
export const prep = (items) => `<ol class="prep-list">\n${items.map(([a, b]) => `            <li><strong>${a}</strong> ${b}</li>`).join("\n")}\n          </ol>`;
export const paras = (...ps) => ps.map((x) => `<p>${x}</p>`).join("\n          ");

/* ---------- blocks and shells ---------- */
// block: { id, from, h2, html }            prose block
//        { id, from, h2, steps, mid }       wide steps block with mid-page CTA
export function renderBlock(b, p) {
  if (b.steps) {
    const lis = b.steps
      .map(([t, d], i) => `            <li class="step"><span class="hex-num" aria-hidden="true">${i + 1}</span><h3>${esc(t)}</h3><p>${d}</p></li>`)
      .join("\n");
    return `<div class="page-wide" id="${b.id}" data-wa-from="${attr(b.from)}">
          <header class="section-head"><h2 id="${b.id}-title">${b.h2}</h2></header>
          <ol class="steps">
${lis}
          </ol>
          <div class="cta-pair" data-wa-from="mid-page call to action"><p class="cta-line">${esc(b.mid)}</p><div class="cta-buttons">
            <a class="btn btn-primary" data-wa-link${waAttrs(p)} href="/#contact">${WA_ICO} ${ctaInner(p)}</a>
            <a class="btn btn-ghost" data-call-primary href="/#contact">${PH_ICO} Call +971 56 846 2872</a>
          </div></div>
        </div>`;
  }
  const head = b.head || `<h2 id="${b.id}-title">${b.h2}</h2>`;
  return `<div class="prose" id="${b.id}" data-wa-from="${attr(b.from)}">
          ${head}
          ${b.html}
        </div>`;
}

export function renderShells(p) {
  return p.shells
    .map((blocks, i) => {
      const bg = i % 2 === 0 ? "panel" : "on-canvas";
      const first = blocks[0];
      const body = blocks.map((b) => (typeof b === "string" ? b : renderBlock(b, p))).join("\n        ");
      return `
    <section class="section ${bg}" aria-labelledby="${first.id}-title">
      <div class="container">
        ${body}
      </div>
    </section>`;
    })
    .join("\n");
}

/* ---------- head ---------- */
export function head(p) {
  const is404 = p.is404;
  const canon = is404 ? "" : `\n  <link rel="canonical" href="${SITE}/${p.slug}" />`;
  const robots = is404 ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  const ogUrl = is404 ? "" : `\n  <meta property="og:url" content="${SITE}/${p.slug}" />`;
  const ogAlt = `Bee Thrive Cleaning Services share card: "${p.ogHeadline}", with photos of real Bee Thrive work`;
  const preload = p.heroImg ? `\n  <link rel="preload" as="image" href="/assets/${p.heroImg}" fetchpriority="high" media="(min-width: 941px)" />` : "";
  const ld = p.graph
    ? `\n\n  <script type="application/ld+json">\n${JSON.stringify(p.graph, null, 2).replace(/</g, "\\u003c")}\n  </script>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(p.title)}</title>
  <meta name="description" content="${attr(p.meta)}" />${canon}
  <meta name="robots" content="${robots}" />
  <meta name="theme-color" content="#F4A300" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Bee Thrive Cleaning Services" />
  <meta property="og:locale" content="en_AE" />${ogUrl}
  <meta property="og:title" content="${attr(p.ogTitle)}" />
  <meta property="og:description" content="${attr(p.ogDesc)}" />
  <meta property="og:image" content="${SITE}/assets/og/${p.ogImg}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${attr(ogAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(p.ogTitle)}" />
  <meta name="twitter:description" content="${attr(p.ogDesc)}" />
  <meta name="twitter:image" content="${SITE}/assets/og/${p.ogImg}" />
  <meta name="twitter:image:alt" content="${attr(ogAlt)}" />

  <link rel="icon" href="/assets/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="/assets/favicon-32.png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/assets/apple-touch.png" />
  <link rel="manifest" href="/site.webmanifest" />${preload}

  <!-- Fonts: loaded without blocking render, with a no-JS fallback -->
${FONTS}

  <link rel="stylesheet" href="/styles.css" />
  <link rel="stylesheet" href="/pages.css" />${ld}
</head>`;
}

/* ---------- header ---------- */
export function header(p) {
  const wa = waAttrs(p);
  const cur = p.key === "about" ? ' aria-current="page"' : "";
  return `
<body data-page="${attr(p.page)}">
  <a class="skip-link" href="#main">Skip to content</a>

  <!-- Icon sprite: each icon is drawn once and reused with <use href="#i-..."> -->
  <svg class="svg-sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
${SPRITE}
    <symbol id="i-share" viewBox="0 0 24 24"><path d="M18 2a3 3 0 00-2.96 3.5L8.5 9.1a3 3 0 100 5.8l6.54 3.6A3 3 0 1018 16a3 3 0 00-1.98.75l-6.1-3.37a3 3 0 000-.76l6.1-3.37A3 3 0 1018 2z"/></symbol>
    <symbol id="i-link" viewBox="0 0 24 24"><path d="M10.6 13.4a1 1 0 010-1.4l3.4-3.4a1 1 0 111.4 1.4L12 13.4a1 1 0 01-1.4 0zM8.5 19.5a3.5 3.5 0 01-2.5-6l2.1-2.1 1.4 1.4-2.1 2.1a1.5 1.5 0 002.1 2.1l2.1-2.1 1.4 1.4-2.1 2.1a3.5 3.5 0 01-2.4 1.1zm7.4-6.9l-1.4-1.4 2.1-2.1a1.5 1.5 0 00-2.1-2.1l-2.1 2.1-1.4-1.4 2.1-2.1a3.5 3.5 0 015 5z"/></symbol>
  </svg>

  <!-- ============ HEADER ============ -->
  <header class="site-header" id="top" data-wa-from="header">
    <div class="topbar">
      <div class="topbar-inner">
        <p>Trade Licence 1416022 · Six days a week · Dubai and Sharjah</p>
        <p class="topbar-links">
          <a data-call-primary href="/#contact">+971 56 846 2872</a>
          <a data-email href="/#contact">sales.operations@<wbr>beethrivecleaning.com</a>
        </p>
      </div>
    </div>
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="Bee Thrive Cleaning Services home">
        <img src="/assets/logo-mark-128.png" alt="Bee Thrive Cleaning Services logo" width="56" height="58" decoding="async" />
        <span class="brand-text"><span class="brand-name">Bee Thrive</span><span class="brand-sub">Cleaning Services</span></span>
      </a>
      <nav class="main-nav" id="main-nav" aria-label="Primary">
        <a href="/#services">Services</a>
        <a href="/#why">Why Bee Thrive</a>
        <a href="/#reviews">Reviews</a>
        <a href="/#areas">Areas</a>
        <a href="/#faq">FAQ</a>
        <a href="/about"${cur}>About</a>
        <div class="nav-cta">
          <a class="btn btn-whatsapp btn-block" data-wa-link${wa} href="/#contact">
            ${WA_ICO}
            <span><span class="label-long">Get my free</span><span class="label-short">Free</span> quote on WhatsApp</span>
          </a>
          <a class="btn btn-ghost btn-block" data-call-primary href="/#contact">Call +971 56 846 2872</a>
        </div>
      </nav>
      <div class="header-actions">
        <a class="icon-btn" data-call-primary href="/#contact" aria-label="Call Bee Thrive on +971 56 846 2872">
          <svg class="ph-ico" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>
        </a>
        <a class="btn btn-whatsapp" data-wa-link${wa} href="/#contact">
          ${WA_ICO} Free quote
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
`;
}

/* ---------- hero ---------- */
export function hero(p) {
  const wa = waAttrs(p);
  if (p.is404) {
    return `
  <main id="main">
    <section class="page-hero page-hero-solo" data-wa-from="hero" aria-labelledby="page-title">
      <div class="container page-hero-inner">
        <div class="page-hero-copy">
          <p class="eyebrow"><span class="hex-dot" aria-hidden="true"></span> ${esc(p.eyebrow)}</p>
          <h1 id="page-title">${esc(p.h1)}</h1>
          <p class="page-lead">${p.lead}</p>
          <div class="hero-cta" data-bar-trigger>
            <a class="btn btn-primary" data-wa-link href="/#contact">
              ${WA_ICO} ${ctaInner(p)}</a>
            <a class="btn btn-ghost" data-call-primary href="/#contact">
              ${PH_ICO} Call +971 56 846 2872</a>
          </div>
          <p class="cta-micro">Free quote · Agreed before we start · No hidden fees</p>
        </div>
      </div>
    </section>
`;
  }
  return `
  <main id="main">
    <section class="page-hero" data-wa-from="hero" aria-labelledby="page-title">
      <div class="container page-hero-inner">
        <div class="page-hero-copy">
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <ol><li><a href="/">Home</a></li><li><span aria-current="page">${esc(p.crumb)}</span></li></ol>
          </nav>
          <p class="eyebrow"><span class="hex-dot" aria-hidden="true"></span> ${esc(p.eyebrow)}</p>
          <h1 id="page-title">${esc(p.h1)}</h1>
          <p class="page-lead">${p.lead}</p>
          <div class="hero-cta" data-bar-trigger>
            <a class="btn btn-primary" data-wa-link${wa} href="/#contact">
              ${WA_ICO} ${ctaInner(p)}</a>
            <a class="btn btn-ghost" data-call-primary href="/#contact">
              ${PH_ICO} Call +971 56 846 2872</a>
          </div>
          <p class="cta-micro">Free quote · Agreed before we start · No hidden fees</p>
          <ul class="hero-trust">
            <li><span class="hex-check" aria-hidden="true"></span> Trade Licence 1416022</li>
            <li><span class="hex-check" aria-hidden="true"></span> Free supervisor on every job</li>
            <li><span class="hex-check" aria-hidden="true"></span> 24-hour re-clean promise</li>
          </ul>
          <p class="page-updated">Updated <time datetime="${DATE}">September 2026</time></p>
        </div>
        <figure class="page-hero-photo">
          <img src="/assets/${p.heroImg}" alt="${attr(p.heroAlt)}" width="${p.w}" height="${p.h}" fetchpriority="high" decoding="async" />
        </figure>
      </div>
    </section>
`;
}

/* ---------- FAQ ---------- */
export function faq(p) {
  if (!p.faqs) return "";
  const items = p.faqs
    .map(
      ([q, a]) => `        <div class="faq-item">
          <h3 class="faq-h"><button type="button" class="faq-q">${esc(q)}<span class="faq-icon" aria-hidden="true"></span></button></h3>
          <div class="faq-a"><p>${esc(a)}</p></div>
        </div>`
    )
    .join("\n");
  return `
    <section class="section on-canvas" id="faq" data-wa-from="FAQ" aria-labelledby="faq-title">
      <div class="container container-narrow">
        <header class="section-head"><p class="kicker">Good to know</p><h2 id="faq-title">${esc(p.faqH2)}</h2></header>
        <div class="faq">
${items}
        </div>
      </div>
    </section>
`;
}

export function related(p) {
  if (!p.related) return "";
  return `
    <section class="section panel" data-wa-from="related services" aria-labelledby="related-title">
      <div class="container">
        <h2 id="related-title" class="related-title">Related services</h2>
        ${relatedList(p.related)}
      </div>
    </section>
`;
}

export function share(p) {
  if (!p.shareH2) return "";
  const txt = p.shareText ? ` data-share-text="${attr(p.shareText)}"` : "";
  return `
    <section class="share-block" id="recommend" data-share${txt} data-wa-from="recommend" aria-labelledby="share-title">
      <div class="container share-inner">
        <div class="share-copy">
          <p class="kicker">Recommend Bee Thrive</p>
          <h2 id="share-title">${esc(p.shareH2)}</h2>
          <p>${esc(p.shareP)}</p>
        </div>
        <div class="share-actions">
          <a class="btn btn-ghost" data-share-wa href="#recommend">${WA_ICO} Send to a friend on WhatsApp</a>
          <button type="button" class="btn btn-ghost" data-share-copy><svg class="ph-ico" aria-hidden="true" focusable="false"><use href="#i-link"/></svg> Copy link</button>
          <button type="button" class="btn btn-ghost" data-share-native hidden><svg class="ph-ico" aria-hidden="true" focusable="false"><use href="#i-share"/></svg> More ways to share</button>
          <label class="visually-hidden" for="share-url">Link to this page</label>
          <input class="share-url" id="share-url" type="text" readonly value="${SITE}/${p.slug}" />
          <p class="share-status" role="status" aria-live="polite"></p>
        </div>
        <p class="share-review">Had a clean with us? <a data-review-link data-review-label="Leave a Google review" href="${MAPS}">Find us on Google to leave a review</a></p>
      </div>
    </section>
`;
}

export function finalCta(p) {
  if (!p.finalH2) return "\n  </main>\n";
  const wa = waAttrs(p);
  return `
    <section class="panel-ink final-cta" data-wa-from="final call to action" data-bar-hide aria-labelledby="final-title">
${ORBIT}
      <div class="container final-cta-inner">
        <h2 id="final-title">${esc(p.finalH2)}</h2>
        <p>${esc(p.finalP)}</p>
        <div class="final-cta-actions">
          <a class="btn btn-primary" data-wa-link${wa} href="/#contact">${WA_ICO} <span><span class="label-long">Get my free</span><span class="label-short">Free</span> quote on WhatsApp</span></a>
          <a class="btn btn-ghost-light" data-call-primary href="/#contact">Call +971 56 846 2872</a>
          <a class="btn btn-ghost-light" href="${p.formHref}">Use the quote form</a>
        </div>
        <ul class="final-ticks">
          <li><span class="hex-check" aria-hidden="true"></span> Free quote</li>
          <li><span class="hex-check" aria-hidden="true"></span> Supervisor on every job</li>
          <li><span class="hex-check" aria-hidden="true"></span> 24-hour re-clean promise</li>
        </ul>
      </div>
    </section>
  </main>
`;
}

export function footer(p) {
  const wa = waAttrs(p);
  return `
  <!-- ============ FOOTER ============ -->
  <footer class="site-footer" data-wa-from="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <h2 class="visually-hidden">Bee Thrive Cleaning Services</h2>
        <a class="brand brand-footer" href="/" aria-label="Bee Thrive Cleaning Services home">
          <img src="/assets/logo-mark-128.png" srcset="/assets/logo-mark-128.png 1x, /assets/logo-mark@400.png 3x" alt="Bee Thrive Cleaning Services logo" width="64" height="66" loading="lazy" decoding="async" />
        </a>
        <p>Cleaning beyond expectations, delivered to your doorstep. A licensed cleaning company serving homes and businesses across Dubai and Sharjah.</p>
        <div class="footer-social">
${SOCIAL}
        </div>
      </div>
      <div class="footer-col">
        <h3>Services</h3>
        <ul>
          <li><a href="/home-cleaning-dubai">Home cleaning and maid services</a></li>
          <li><a href="/deep-cleaning-dubai">Deep cleaning</a></li>
          <li><a href="/move-in-move-out-cleaning-dubai">Move-in and move-out cleaning</a></li>
          <li><a href="/post-construction-cleaning-dubai">Post-construction cleaning</a></li>
          <li><a href="/office-cleaning-dubai">Office cleaning</a></li>
          <li><a href="/holiday-home-cleaning-dubai">Airbnb and holiday homes</a></li>
          <li><a href="/commercial-cleaning-dubai">Commercial cleaning</a></li>
          <li><a href="/cleaning-services-sharjah">Cleaning in Sharjah</a></li>
          <li><a href="/#services">All 20 services</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Company</h3>
        <ul>
          <li><a href="/about">About Bee Thrive</a></li>
          <li><a href="/#reviews">Reviews</a></li>
          <li><a href="/#areas">Areas we cover</a></li>
          <li><a href="/#quote">How quotes work</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/#contact">Get a quote</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Contact</h3>
        <ul>
          <li><a data-call-primary href="/#contact">+971 56 846 2872</a></li>
          <li><a data-call-secondary href="/#contact">+971 56 509 1801</a></li>
          <li><a data-email href="/#contact">sales.operations@<wbr>beethrivecleaning.com</a></li>
          <li><a data-email-secondary href="/#contact">digitalthrivefm@<wbr>gmail.com</a></li>
          <li><a data-maps href="${MAPS}">Office #201, Al Qasimi Building, Salahuddin Street, Deira, Dubai</a></li>
          <li class="footer-note">Six days a week, flexible scheduling</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom"><div class="container footer-bottom-inner">
      <p>Bee Thrive Cleaning Services, a brand of Digital Thrive Cleaning Services Co LLC. Trade Licence No. 1416022, Dubai Department of Economy and Tourism. Established October 2024. Serving homes and businesses from Dubai to Sharjah.</p>
      <p>&copy; <span id="year"></span> Bee Thrive Cleaning Services. All rights reserved.</p>
    </div></div>
  </footer>

  <div class="action-bar" id="action-bar" role="region" aria-label="Quick contact" data-wa-from="mobile bar">
    <a class="btn btn-whatsapp" data-wa-link${wa} href="/#contact">${WA_ICO} WhatsApp quote</a>
    <a class="btn btn-ghost bar-call" data-call-primary href="/#contact">${PH_ICO} Call</a>
  </div>
  <a class="fab-whatsapp" data-wa-link${wa} data-wa-from="WhatsApp button" href="/#contact" aria-label="WhatsApp quote. Chat with Bee Thrive on WhatsApp">
    <svg aria-hidden="true" focusable="false"><use href="#i-wa"/></svg><span>WhatsApp quote</span></a>

  <script src="/script.js"></script>
</body>
</html>
`;
}

/* ---------- JSON-LD ---------- */
const CITY = {
  dubai: { "@type": "City", name: "Dubai", sameAs: "https://www.wikidata.org/wiki/Q612" },
  sharjah: { "@type": "City", name: "Sharjah", sameAs: "https://www.wikidata.org/wiki/Q289693" },
};
export const BIZ_STUB = {
  "@type": "HousekeepingService",
  "@id": BIZ,
  name: "Bee Thrive Cleaning Services",
  alternateName: "Bee Thrive",
  url: SITE + "/",
  telephone: "+971 56 846 2872",
  email: "sales.operations@beethrivecleaning.com",
  image: SITE + "/assets/og/og-home-v1.jpg",
  logo: SITE + "/assets/icon-512.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office #201, Al Qasimi Building, Salahuddin Street, Deira",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  sameAs: SAME_AS,
};
export const WEBSITE = {
  "@type": "WebSite",
  "@id": SITE + "/#website",
  url: SITE + "/",
  name: "Bee Thrive Cleaning Services",
  alternateName: "Bee Thrive",
  inLanguage: "en-AE",
  publisher: { "@id": BIZ },
};
/* /about is the entity page, so it carries the full #business node from the home page JSON-LD
   (read from index.html at build time, so the two never drift), without the offer catalogue. */
function fullBusiness() {
  const html = fs.readFileSync(path.join(process.env.REPO_SRC || path.resolve(HERE, "../.."), "index.html"), "utf8");
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const node = JSON.parse(m[1])["@graph"].find((n) => n["@id"] === BIZ);
  if (!node) throw new Error("no #business node in index.html");
  const copy = { ...node };
  delete copy.hasOfferCatalog;
  return copy;
}

export function graph(p) {
  const url = `${SITE}/${p.slug}`;
  const img = {
    "@type": "ImageObject",
    "@id": url + "#primaryimage",
    url: `${SITE}/assets/${p.heroImg}`,
    contentUrl: `${SITE}/assets/${p.heroImg}`,
    width: p.w,
    height: p.h,
    caption: p.heroAlt,
  };
  const crumbs = {
    "@type": "BreadcrumbList",
    "@id": url + "#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: p.crumb, item: url },
    ],
  };
  if (p.key === "about") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": url + "#webpage",
          url,
          name: p.title,
          description: p.meta,
          isPartOf: { "@id": SITE + "/#website" },
          about: { "@id": BIZ },
          mainEntity: { "@id": BIZ },
          primaryImageOfPage: { "@id": url + "#primaryimage" },
          breadcrumb: { "@id": url + "#breadcrumb" },
          inLanguage: "en-AE",
          dateModified: DATE,
        },
        WEBSITE,
        img,
        fullBusiness(),
        crumbs,
      ],
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url + "#webpage",
        url,
        name: p.title,
        description: p.meta,
        isPartOf: { "@id": SITE + "/#website" },
        about: { "@id": url + "#service" },
        primaryImageOfPage: { "@id": url + "#primaryimage" },
        breadcrumb: { "@id": url + "#breadcrumb" },
        inLanguage: "en-AE",
        dateModified: DATE,
      },
      WEBSITE,
      img,
      {
        "@type": "Service",
        "@id": url + "#service",
        name: p.serviceName,
        serviceType: p.serviceType,
        description: strip(p.lead),
        provider: { "@id": BIZ },
        areaServed: p.key === "sharjah" ? [CITY.sharjah] : [CITY.dubai, CITY.sharjah],
        url,
        image: { "@id": url + "#primaryimage" },
      },
      BIZ_STUB,
      crumbs,
      {
        "@type": "FAQPage",
        "@id": url + "#faq",
        mainEntity: p.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
}

export function build(p) {
  if (!p.is404) p.graph = graph(p);
  return head(p) + header(p) + hero(p) + (p.shells ? renderShells(p) + "\n" : "") + (p.extra || "") + faq(p) + related(p) + share(p) + finalCta(p) + footer(p);
}
