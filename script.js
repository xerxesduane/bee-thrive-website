/* ============================================================
   Bee Thrive Cleaning Services
   All editable business details live in CONFIG below.
   Change a value here and it updates every link on the page.
   ============================================================ */
const CONFIG = {
  name: "Bee Thrive Cleaning Services",
  legalEntity: "Digital Thrive Cleaning Services Co LLC",
  licence: "1416022",
  established: "2024-10",

  // Contact
  phonePrimary: "+971 56 509 1801",
  phoneSecondary: "+971 56 509 1795",
  whatsapp: "971565091801",            // digits only, used in wa.me links
  email: "digitalthrivefm@gmail.com",
  address: "Office #201, Al Qasimi Building, Salahuddin Street, Deira, Dubai, UAE",

  // Social + map
  instagram: "https://www.instagram.com/beethrivecleaning",
  facebook: "https://www.facebook.com/profile.php?id=61576092291203",
  maps: "https://maps.app.goo.gl/FFoZoKx1cviyXeTg7",

  // Site
  domain: "https://bee-thrive-website.vercel.app",
  priceRange: "AED 35 to AED 75 per hour",
  // Days the business is open. Update closedDay if a different rest day applies.
  openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
  opens: "08:00",
  closes: "20:00",

  defaultMessage: "Hello Bee Thrive, I would like a free quote for cleaning services."
};

/* ---------- Helpers ---------- */
const tel = (n) => "tel:" + n.replace(/[^\d+]/g, "");
const waLink = (msg) =>
  "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg || CONFIG.defaultMessage);

/* ---------- Wire up all data-driven links ---------- */
function bindLinks() {
  const external = (el) => { el.target = "_blank"; el.rel = "noopener"; };

  // Every WhatsApp trigger opens a prefilled chat (header, hero, pricing, FAB, contact card).
  document.querySelectorAll("[data-wa-link]").forEach((el) => { el.href = waLink(); external(el); });

  // Click-to-call and email use native tel:/mailto: links.
  document.querySelectorAll("[data-call-primary]").forEach((el) => (el.href = tel(CONFIG.phonePrimary)));
  document.querySelectorAll("[data-call-secondary]").forEach((el) => (el.href = tel(CONFIG.phoneSecondary)));
  document.querySelectorAll("[data-email]").forEach((el) => (el.href = "mailto:" + CONFIG.email));

  document.querySelectorAll("[data-maps]").forEach((el) => { el.href = CONFIG.maps; external(el); });
  document.querySelectorAll("[data-instagram]").forEach((el) => { el.href = CONFIG.instagram; external(el); });
  document.querySelectorAll("[data-facebook]").forEach((el) => { el.href = CONFIG.facebook; external(el); });
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  const close = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ---------- Floating pill nav: frosted on scroll ---------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Preloader: count-up curtain, once per session ---------- */
function initPreloader() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || location.search.indexOf("allvisible") !== -1) return;
  try {
    if (sessionStorage.getItem("bt-intro-seen") === "1") return;
    sessionStorage.setItem("bt-intro-seen", "1");
  } catch (e) { return; }

  const el = document.createElement("div");
  el.className = "preloader";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML =
    '<div class="orbit"><div class="o1"><svg viewBox="0 0 600 600" fill="none"><ellipse cx="300" cy="300" rx="290" ry="170" stroke="rgba(27,26,23,0.25)" stroke-width="1.2" stroke-dasharray="2 9"/></svg></div>' +
    '<div class="o2"><svg viewBox="0 0 600 600" fill="none"><ellipse cx="300" cy="300" rx="175" ry="285" stroke="rgba(27,26,23,0.25)" stroke-width="1.2" stroke-dasharray="2 9"/></svg></div></div>' +
    '<div class="preloader-inner"><img src="assets/logo-mark@400.png" alt="" width="72" height="74" /><span class="pre-num">0%</span></div>';
  document.body.appendChild(el);

  const num = el.querySelector(".pre-num");
  const COUNT_MS = 700;
  const start = performance.now();
  const finish = () => {
    el.classList.add("done");
    setTimeout(() => el.remove(), 600);
  };
  const tick = (t) => {
    const p = Math.min(1, (t - start) / COUNT_MS);
    num.textContent = Math.round(p * 100) + "%";
    if (p < 1) requestAnimationFrame(tick); else finish();
  };
  requestAnimationFrame(tick);
  // Fail-safe: never trap the page behind the curtain.
  setTimeout(() => { if (el.parentNode) finish(); }, 2500);
}

/* ---------- Booking form builds a WhatsApp message ---------- */
function initForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const lines = [
      "Hello Bee Thrive, I would like a free quote for cleaning.",
      "",
      "Name: " + (d.get("name") || "").trim(),
      "Phone: " + (d.get("phone") || "").trim(),
      "Service: " + (d.get("service") || "").trim(),
    ];
    if ((d.get("area") || "").trim()) lines.push("Area: " + d.get("area").trim());
    if ((d.get("message") || "").trim()) lines.push("Details: " + d.get("message").trim());
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  const open = [];
  document.querySelectorAll(".faq-q").forEach((btn) => {
    const panel = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
      if (isOpen) { const i = open.indexOf(panel); if (i > -1) open.splice(i, 1); }
      else if (open.indexOf(panel) === -1) open.push(panel);
    });
  });
  // Re-measure any open answer on resize so it never clips after reflow.
  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(() => open.forEach((p) => { p.style.maxHeight = p.scrollHeight + "px"; }), 120);
  }, { passive: true });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll(
    ".section-head, .empathy, .svc-group-head, .svc-card, .value-card, .why-list li, .why-gallery, .step, .price-table-wrap, .promise, .review-card, .clients-subhead, .client-card, .area-chips, .booking-form, .contact-info-col, .faq-item, .trust-item, .final-cta-inner"
  );
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ?allvisible shows every section immediately (used for full-page screenshots and
  // for users who prefer reduced motion); no effect on normal visits.
  const forceVisible = location.search.indexOf("allvisible") !== -1;
  if (reduce || forceVisible || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in"));
    document.querySelector(".hero")?.classList.add("hero-shown");
    return;
  }
  // Add the reveal class and a stagger delay based on position among reveal siblings,
  // so cards in the same grid cascade in nicely.
  const isReveal = (n) => n.classList && n.classList.contains("reveal");
  targets.forEach((t) => {
    t.classList.add("reveal");
    const idx = t.parentElement ? [...t.parentElement.children].filter(isReveal).indexOf(t) : 0;
    t.style.transitionDelay = Math.min(Math.max(idx, 0) * 80, 320) + "ms";
  });
  const clearDelay = (el) => setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        // Drop the inline stagger delay once revealed so it never lags hover transitions.
        clearDelay(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((t) => io.observe(t));

  // Safety net: if the observer never fires for some element, reveal everything anyway.
  setTimeout(() => targets.forEach((t) => { t.classList.add("in"); t.style.transitionDelay = ""; }), 2500);
}

/* ---------- Hero load safety: lock content visible after the entrance ---------- */
function initHeroLoad() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  // After the orchestrated entrance would have finished, force the final visible
  // state. If the keyframes ran, this is a harmless no-op; if they did not, it
  // guarantees the hero is never left hidden.
  setTimeout(() => hero.classList.add("hero-shown"), 1400);
}

/* ---------- Count-up stats ---------- */
function initCountUp() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nums = [...document.querySelectorAll(".trust-num")].filter((el) => {
    const v = el.textContent.trim();
    return /^\d+$/.test(v) && Number(v) <= 100; // animate 10 and 6; leave the year and text static
  });
  if (!nums.length || reduce || !("IntersectionObserver" in window)) return;
  const run = (el) => {
    const target = Number(el.textContent.trim());
    const dur = 1100;
    let start = null;
    const tick = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
}

/* ---------- Active section highlight in the nav ---------- */
function initScrollSpy() {
  const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const map = new Map();
  links.forEach((l) => {
    const sec = document.getElementById(l.getAttribute("href").slice(1));
    if (sec) map.set(sec, l);
  });
  if (!map.size || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
        const link = map.get(e.target);
        if (link) { link.classList.add("active"); link.setAttribute("aria-current", "true"); }
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  map.forEach((_, sec) => io.observe(sec));
}

/* ---------- JSON-LD structured data ---------- */
// Verbatim Google reviews, reused for on-page display intent and Review schema.
const REVIEWS = [
  { author: "Attaullah UT", body: "The team was professional, thorough, and left my place spotless. They paid attention to every detail and went above and beyond my expectations." },
  { author: "Huda Mawaleed", body: "The team arrived right on time, fully equipped, and got to work immediately. They were extremely professional and respectful of my space." },
  { author: "Russel Inocencio", body: "Very professional and friendly staff. Fast and efficient. Even every nook and cranny of my apartment was cleaned. Will highly recommend." },
  { author: "Nikki Zaballerro", body: "The best cleaning company so far I have experienced in UAE." }
];

const OFFERS = [
  { name: "Normal cleaning without materials", price: "35", unit: "HUR" },
  { name: "Normal cleaning with materials", price: "45", unit: "HUR" },
  { name: "Deep cleaning with materials", price: "75", unit: "HUR" }
];

// Services listed in structured data for topical coverage (no fixed price).
const SERVICE_TYPES = [
  "Home cleaning", "Office and commercial cleaning", "Deep cleaning",
  "Move-in and move-out cleaning", "Post-construction turnover for villas and commercial buildings",
  "Airbnb and holiday home cleaning", "Carpet cleaning", "Laundry and ironing"
];

function injectJsonLd() {
  const el = document.getElementById("ld-json");
  if (!el) return;
  const id = CONFIG.domain + "/#business";

  const business = {
    "@type": "LocalBusiness",
    "additionalType": "https://www.productontology.org/id/Cleaner",
    "@id": id,
    "name": CONFIG.name,
    "description": "Licensed cleaning company in Dubai and Sharjah offering home, office, deep, move-in and move-out, Airbnb turnover, and post-construction cleaning, with free on-site supervision on every job.",
    "image": CONFIG.domain + "/assets/og-cover.jpg",
    "logo": CONFIG.domain + "/assets/icon-512.png",
    "url": CONFIG.domain + "/",
    "telephone": CONFIG.phonePrimary,
    "email": CONFIG.email,
    "knowsAbout": [
      "House cleaning", "Office cleaning", "Deep cleaning", "Move-in and move-out cleaning",
      "Post-construction cleaning", "Villa cleaning", "Airbnb and holiday home cleaning",
      "Carpet cleaning", "Commercial cleaning"
    ],
    "priceRange": CONFIG.priceRange,
    "paymentAccepted": "Cash, Bank transfer",
    "currenciesAccepted": "AED",
    "foundingDate": CONFIG.established,
    "parentOrganization": { "@type": "Organization", "name": CONFIG.legalEntity },
    "identifier": { "@type": "PropertyValue", "name": "Dubai DET Trade Licence", "value": CONFIG.licence },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office #201, Al Qasimi Building, Salahuddin Street, Deira",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 25.2697, "longitude": 55.3095 },
    "hasMap": CONFIG.maps,
    "areaServed": [
      { "@type": "City", "name": "Dubai" },
      { "@type": "City", "name": "Sharjah" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "makesOffer": SERVICE_TYPES.map((s) => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": s, "areaServed": "Dubai and Sharjah, UAE" }
    })),
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": CONFIG.openDays.map((d) => "https://schema.org/" + d),
      "opens": CONFIG.opens,
      "closes": CONFIG.closes
    }],
    "sameAs": [CONFIG.instagram, CONFIG.facebook],
    "slogan": "Cleaning beyond expectations, delivered to your doorstep.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning services",
      "itemListElement": OFFERS.map((o) => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": o.name },
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": o.price,
          "priceCurrency": "AED",
          "unitCode": o.unit
        }
      }))
    }
    // Note: on-page Google reviews are shown to visitors but intentionally not
    // emitted as Review/aggregateRating markup. Google's review-snippet policy
    // disallows self-serving ratings sourced from third-party sites.
  };

  // FAQPage generated from the rendered FAQ so the two never drift apart.
  const faqEntities = [...document.querySelectorAll(".faq-item")].map((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    const question = q ? q.textContent.trim() : "";
    const answer = a ? a.textContent.trim() : "";
    return {
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer }
    };
  }).filter((e) => e.name && e.acceptedAnswer.text);

  const graph = { "@context": "https://schema.org", "@graph": [business] };
  if (faqEntities.length) {
    graph["@graph"].push({ "@type": "FAQPage", "@id": CONFIG.domain + "/#faq", "mainEntity": faqEntities });
  }
  el.textContent = JSON.stringify(graph);
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  bindLinks();
  initNav();
  initHeaderScroll();
  initForm();
  initFaq();
  initHeroLoad();
  initReveal();
  initCountUp();
  initScrollSpy();
  injectJsonLd();
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
});
