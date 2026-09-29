/* ============================================================
   Bee Thrive Cleaning Services
   All editable business details live in CONFIG below.
   Change a value here and it updates every contact link on every page.
   ============================================================ */
const CONFIG = {
  name: "Bee Thrive Cleaning Services",
  legalEntity: "Digital Thrive Cleaning Services Co LLC",
  licence: "1416022",
  established: "2024-10",

  // Contact
  phonePrimary: "+971 56 846 2872",    // main line: WhatsApp + inquiry calls
  phoneSecondary: "+971 56 509 1801",
  whatsapp: "971568462872",            // digits only, used in wa.me links
  email: "sales.operations@beethrivecleaning.com",
  emailSecondary: "digitalthrivefm@gmail.com",
  // Postal address, for reference (the visible address and the JSON-LD are static HTML).
  addressStreet: "Office #201, Al Qasimi Building, Salahuddin Street, Deira",
  addressLocality: "Dubai",

  // Social + map
  instagram: "https://www.instagram.com/beethrivecleaning",
  facebook: "https://www.facebook.com/profile.php?id=61576092291203",
  maps: "https://maps.app.goo.gl/FFoZoKx1cviyXeTg7",
  // Owner to supply the Google "write a review" link. Until then [data-review-link] opens the
  // listing (CONFIG.maps) with honest static text, and [data-review-only] buttons stay hidden.
  reviewLink: "",

  // Site
  domain: "https://www.beethrivecleaning.com",
  // Opening hours are NOT published anywhere (HTML, JSON-LD or llms.txt) until the owner
  // confirms them. Structured data is static HTML, so publishing hours later means adding
  // them to the LocalBusiness JSON-LD in index.html by hand.
  hoursConfirmed: false,

  // "Recommend Bee Thrive" share block (see README). A share is a message from a visitor
  // to a friend, so by default it does not start with defaultMessage. Set
  // sharePrefixDefault to true if the owner wants the referral line on shares too.
  shareText: "Thought this might help: Bee Thrive Cleaning Services is a licensed Dubai cleaning company that sends a free supervisor to check every job.",
  shareCampaign: "recommend",
  sharePrefixDefault: false,

  defaultMessage: "I'm interested, referred by Xerxes"
};

// Lets CSS tell a scripted page from a no-JS one (e.g. FAQ answers stay open without JS).
document.documentElement.classList.add("js");

/* ---------- Helpers ---------- */
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tel = (n) => "tel:" + n.replace(/[^\d+]/g, "");
// First line is ALWAYS CONFIG.defaultMessage; extra lines follow.
const waMessage = (extra) => [CONFIG.defaultMessage].concat((extra || []).filter(Boolean)).join("\n");
const waLink = (msg) => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg || CONFIG.defaultMessage);
const mailLink = (addr, body) =>
  "mailto:" + addr + "?subject=" + encodeURIComponent(CONFIG.defaultMessage) +
  "&body=" + encodeURIComponent(body || CONFIG.defaultMessage);

/* ---------- Lead attribution (no analytics, no personal data) ---------- */
// Every lead message says which page and section it came from. A UTM source seen this
// session (Instagram bio, Google Business Profile, a shared link) and the first page of the
// visit are added when known. Kept in sessionStorage only; nothing leaves the browser
// except inside the message the visitor chooses to send.
let VIA = "", ENTRY = "";
const clean = (v) => (v || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
function viaLabel(v) {
  if (v.m === "share") return "a link shared by a friend" + (v.s === "whatsapp" ? " on WhatsApp" : "");
  if (v.s === "google" && v.m === "gbp") return "Google Business Profile";
  if (v.s === "instagram") return v.m === "bio" ? "Instagram bio" : "Instagram";
  if (v.s === "facebook") return "Facebook page";
  return v.s + (v.m ? " / " + v.m : "");
}
function initAttribution() {
  try {
    const p = new URLSearchParams(location.search);
    const s = clean(p.get("utm_source")), m = clean(p.get("utm_medium")), c = clean(p.get("utm_campaign"));
    if (s) sessionStorage.setItem("bt_via", JSON.stringify({ s, m, c }));
    if (!sessionStorage.getItem("bt_entry")) sessionStorage.setItem("bt_entry", location.pathname);
    const v = JSON.parse(sessionStorage.getItem("bt_via") || "null");
    VIA = v && v.s ? viaLabel(v) : "";
    ENTRY = sessionStorage.getItem("bt_entry") || "";
  } catch (e) { /* storage blocked: the extra lines are simply left out */ }
}
// "From: website, deep cleaning page (hero)", plus the optional Came via / First page lines.
function contextLines(el) {
  const page = (document.body && document.body.dataset.page) || "home page";
  const holder = el && el.closest ? el.closest("[data-wa-from]") : null;
  const lines = ["From: website, " + page + (holder ? " (" + holder.dataset.waFrom + ")" : "")];
  if (VIA) lines.push("Came via: " + VIA);
  if (ENTRY && ENTRY !== location.pathname) lines.push("First page: " + ENTRY);
  return lines;
}

/* ---------- Wire up all data-driven links ---------- */
// Takes a scope so it can be re-run on nodes injected later (finder banner, empty state).
function bindLinks(scope = document) {
  const external = (el) => { el.target = "_blank"; el.rel = "noopener"; };

  // Every WhatsApp trigger opens a prefilled chat. Service, area and source lines
  // are only ever added after the default message. [data-share-wa] (a visitor sharing
  // with a friend) is handled by initShare, never here.
  scope.querySelectorAll("[data-wa-link]").forEach((el) => {
    const extra = [
      el.dataset.waService ? "Service: " + el.dataset.waService : "",
      el.dataset.waArea ? "Area: " + el.dataset.waArea : "",
      ...contextLines(el)
    ];
    el.href = waLink(waMessage(extra));
    external(el);
  });

  // Click-to-call and email use native tel:/mailto: links.
  scope.querySelectorAll("[data-call-primary]").forEach((el) => (el.href = tel(CONFIG.phonePrimary)));
  scope.querySelectorAll("[data-call-secondary]").forEach((el) => (el.href = tel(CONFIG.phoneSecondary)));
  scope.querySelectorAll("[data-email]").forEach((el) => (el.href = mailLink(CONFIG.email, waMessage(contextLines(el)))));
  scope.querySelectorAll("[data-email-secondary]").forEach((el) => (el.href = mailLink(CONFIG.emailSecondary, waMessage(contextLines(el)))));

  scope.querySelectorAll("[data-maps]").forEach((el) => { el.href = CONFIG.maps; external(el); });
  scope.querySelectorAll("[data-review-link]").forEach((el) => {
    el.href = CONFIG.reviewLink || CONFIG.maps;
    external(el);
    if (!CONFIG.reviewLink) return;
    if (el.dataset.reviewLabel) el.textContent = el.dataset.reviewLabel;
    if (el.hasAttribute("data-review-only")) el.hidden = false;
  });
  scope.querySelectorAll("[data-instagram]").forEach((el) => { el.href = CONFIG.instagram; external(el); });
  scope.querySelectorAll("[data-facebook]").forEach((el) => { el.href = CONFIG.facebook; external(el); });

  // Area chips keep a short visible label; the accessible name starts with that
  // visible text (WCAG 2.5.3) and then says what the chip does.
  scope.querySelectorAll(".area-chip[data-area]").forEach((el) => {
    const label = el.textContent.replace(/\s+/g, " ").trim();
    const what = el.dataset.emirate === "UAE" ? "a project or event" : "a clean here";
    el.setAttribute("aria-label", label + ", ask about " + what + " on WhatsApp");
  });
}

/* ---------- Recommend Bee Thrive: WhatsApp share, copy link, native share ---------- */
// Shared links carry utm_source=<channel>&utm_medium=share&utm_campaign=recommend, so a
// friend who later gets in touch arrives with "Came via: a link shared by a friend".
// The visible .share-url box shows the clean canonical URL until a clipboard write fails;
// then it switches to the tracked copy link and selects it, so a manual copy keeps the UTMs.
function shareUrl(source) {
  const c = document.querySelector('link[rel="canonical"]');
  const u = new URL(c ? c.href : location.origin + location.pathname);
  u.search = ""; u.hash = "";
  u.searchParams.set("utm_source", source);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", CONFIG.shareCampaign);
  return u.toString();
}
function initShare() {
  document.querySelectorAll("[data-share]").forEach((box) => {
    let text = box.dataset.shareText || CONFIG.shareText;
    if (CONFIG.sharePrefixDefault) text = CONFIG.defaultMessage + "\n" + text;
    const status = box.querySelector(".share-status");
    // Clear, then set, so screen readers announce a repeat of the same message.
    const say = (t) => { if (!status) return; status.textContent = ""; setTimeout(() => { status.textContent = t; }, 60); };
    const wa = box.querySelector("[data-share-wa]");
    if (wa) {
      wa.href = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + shareUrl("whatsapp"));
      wa.target = "_blank"; wa.rel = "noopener";
    }
    const field = box.querySelector(".share-url");
    const copy = box.querySelector("[data-share-copy]");
    if (copy) copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(shareUrl("copy"));
        say("Link copied. Paste it into any chat.");
      } catch (e) {
        if (field) {
          field.value = shareUrl("copy");
          field.focus();
          try { field.setSelectionRange(0, field.value.length); } catch (err) { field.select(); }
        }
        say("Copy the link from the box below.");
      }
    });
    const nat = box.querySelector("[data-share-native]");
    if (nat && typeof navigator.share === "function") {
      nat.hidden = false;
      nat.addEventListener("click", () => {
        navigator.share({ title: document.title, text, url: shareUrl("native") }).catch(() => {});
      });
    }
  });
}

/* ---------- Mobile nav ---------- */
// The action bar hides while the menu is open; initActionBar replaces this hook.
let refreshActionBar = () => {};

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  const set = (open) => {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    refreshActionBar();
  };
  const isOpen = () => nav.classList.contains("open");
  // The menu sits before the toggle in the DOM, so opening it moves focus into it.
  toggle.addEventListener("click", () => {
    const open = !isOpen();
    set(open);
    if (open) (nav.querySelector("a") || nav).focus({ preventScroll: true });
  });
  // Close the menu once keyboard focus leaves it (but not when it moves to the toggle).
  nav.addEventListener("focusout", (e) => {
    const to = e.relatedTarget;
    if (isOpen() && to && !nav.contains(to) && to !== toggle) set(false);
  });
  // Covers the section links and the .nav-cta buttons.
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
  document.addEventListener("click", (e) => {
    if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) set(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) { set(false); toggle.focus(); }
  });
}

/* ---------- Floating pill nav: frosted on scroll (top bar collapses in CSS) ---------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Service finder: search, category chips, lane cards ---------- */
// Words that appear in many area names and say nothing about where someone is.
const GENERIC_AREA_WORDS = new Set(["al", "city", "hills", "bay", "heights", "gardens", "village", "circle", "oasis",
  "dubai", "park", "towers", "lakes", "district", "island", "beach", "residence", "walk", "creek"]);
// Emirates we only serve for projects and events. Matched as whole words; the
// single words "uae" and "emirates" only match when typed on their own.
const PROJECT_EMIRATES = [
  ["abu dhabi", "Abu Dhabi"], ["al ain", "Al Ain"], ["ajman", "Ajman"], ["ras al khaimah", "Ras Al Khaimah"],
  ["rak", "Ras Al Khaimah"], ["fujairah", "Fujairah"], ["umm al quwain", "Umm Al Quwain"], ["uaq", "Umm Al Quwain"]
];
const WHOLE_UAE = ["uae", "emirates", "all emirates", "united arab emirates", "the uae"];
// Words that make a query read as a different place ("palm jumeirah", "barsha heights").
const PLACE_WORDS = new Set([...GENERIC_AREA_WORDS, "palm", "springs", "meadows", "ranches", "greens", "views",
  "road", "sports", "motor", "media", "festival", "academic", "marsa", "sheikh", "zayed"]);

function initServiceFinder() {
  const finder = document.getElementById("svc-finder");
  const input = document.getElementById("svc-search");
  const chips = [...document.querySelectorAll(".chip[data-filter]")];
  const cards = [...document.querySelectorAll(".svc-card")];
  const count = document.getElementById("svc-count");
  const banner = document.getElementById("svc-area-match");
  const grid = document.getElementById("svc-grid") || (cards[0] && cards[0].parentElement);
  if (!finder || !input || !chips.length || !cards.length || !count || !banner || !grid) return;

  finder.hidden = false;
  const total = cards.length;
  const signature = cards.filter((c) => c.classList.contains("is-signature"));

  // Empty state lives after the grid; hidden until a search finds nothing.
  const empty = document.createElement("div");
  empty.className = "finder-empty";
  empty.hidden = true;
  grid.insertAdjacentElement("afterend", empty);

  // On phones the grid starts with the signature cards only (CSS, <=620px).
  // Any search, chip, lane card or deep link opens the full list.
  const small = window.matchMedia("(max-width: 620px)");
  const moreWrap = document.createElement("div");
  moreWrap.className = "svc-toggle-wrap";
  const moreBtn = document.createElement("button");
  moreBtn.type = "button";
  moreBtn.className = "btn btn-ghost svc-toggle";
  moreBtn.setAttribute("aria-controls", grid.id || "svc-grid");
  moreWrap.appendChild(moreBtn);
  empty.insertAdjacentElement("afterend", moreWrap);
  let collapsed = signature.length > 0 && signature.length < total;
  const syncToggle = () => {
    grid.classList.toggle("is-collapsed", collapsed);
    moreBtn.setAttribute("aria-expanded", String(!collapsed));
    moreBtn.textContent = collapsed ? "Show all " + total + " services" : "Show fewer services";
  };
  const expand = () => { if (collapsed) { collapsed = false; syncToggle(); } };
  if (signature.length && signature.length < total) syncToggle(); else moreWrap.hidden = true;

  const norm = (s) => (s || "").toLowerCase().normalize("NFKD").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const hay = new Map(cards.map((c) => {
    const text = [
      c.querySelector("h3")?.textContent, c.querySelector(":scope > p")?.textContent,
      c.dataset.service, c.dataset.keywords,
      ...[...c.querySelectorAll(".tag")].map((t) => t.textContent)
    ].join(" ");
    return [c, norm(text)];
  }));
  // Light stemming so plurals and agent nouns still match: windows, carpets, cleaners.
  const stem = (t) => (t.length > 4 ? t.replace(/(ing|ers|er|es|s)$/, "") : t);
  const hasTok = (c, t) => { const h = hay.get(c); return h.includes(t) || h.includes(stem(t)); };
  const hasWords = (q, phrase) => (" " + q + " ").includes(" " + phrase + " ");

  // Areas come from the chips so the finder never drifts from the #areas list.
  const areas = [];
  document.querySelectorAll("[data-area]").forEach((el) => {
    const { area, emirate } = el.dataset;
    if (area && !areas.some((a) => a.area === area)) areas.push({ area, emirate, n: norm(area) });
  });
  if (!areas.some((a) => a.area === "Dubai")) areas.push({ area: "Dubai", emirate: "Dubai", n: "dubai" });
  const byLength = areas.slice().sort((x, y) => y.n.length - x.n.length);
  const areaWords = new Set(areas.flatMap((a) => a.n.split(" ")).filter((w) => w !== "al" && w !== "dubai"));
  const placey = (t) => PLACE_WORDS.has(t) || areaWords.has(t);

  // Work out what an area-like query means. Only an exact area, a clear prefix of
  // one, or an area named next to service words counts as "yes, we clean there".
  // Anything else that names a listed area is "not sure, ask us to confirm".
  const resolve = (q, tokens, textHits, matches) => {
    if (q.length < 3) return null;
    const without = (words) => tokens.filter((t) => !words.includes(t));

    const exact = areas.find((a) => a.n === q);
    if (exact) {
      return exact.emirate === "UAE"
        ? { kind: "emirate", label: "", rest: [] }
        : { kind: "yes", area: exact.area, rest: [] };
    }
    if (WHOLE_UAE.includes(q)) return { kind: "emirate", label: "", rest: [] };
    const em = PROJECT_EMIRATES.find(([k]) => hasWords(q, k));
    if (em) return { kind: "emirate", label: em[1], rest: without(em[0].split(" ")) };

    const inside = byLength.find((a) => a.emirate !== "UAE" && hasWords(q, a.n));
    if (inside) {
      let rest = without(inside.n.split(" "));
      // "al barsha dubai" is still Al Barsha; "al nahda sharjah" is somewhere else.
      if (inside.emirate === "Dubai") rest = rest.filter((t) => t !== "dubai");
      const elsewhere = rest.some((t) => placey(t) || t === "dubai");
      if (!elsewhere && (!rest.length || matches(rest).length)) return { kind: "yes", area: inside.area, rest };
      return { kind: "unsure", rest };
    }

    // Half-typed names ("shar", "marina") only when the text finds no service.
    if (!textHits.length && q.length >= 4) {
      const start = areas.find((a) => a.emirate !== "UAE" && a.n.startsWith(q))
        || (tokens.length === 1 && areas.find((a) => a.emirate !== "UAE" &&
          a.n.split(" ").some((w) => w.length >= 4 && !GENERIC_AREA_WORDS.has(w) && w.startsWith(q))));
      if (start) return { kind: "yes", area: start.area, rest: [] };
      const emStart = PROJECT_EMIRATES.find(([k]) => k.length >= 4 && k.startsWith(q));
      if (emStart) return { kind: "emirate", label: emStart[1], rest: [] };
    }
    return null;
  };

  const activeCat = () => (chips.find((c) => c.getAttribute("aria-pressed") === "true") || chips[0]).dataset.filter;

  // The count is a polite live region: update it at most every 300ms.
  let countTimer;
  const announce = (text, now) => {
    clearTimeout(countTimer);
    if (now) { count.textContent = text; return; }
    countTimer = setTimeout(() => { count.textContent = text; }, 300);
  };

  const waButton = (label, area) => {
    const a = document.createElement("a");
    a.className = "btn btn-sm btn-wa-soft";
    a.href = "#contact";
    a.setAttribute("data-wa-link", "");
    if (area) a.dataset.waArea = area;
    a.textContent = label;
    return a;
  };

  const renderBanner = (match, raw) => {
    banner.textContent = "";
    if (!match) { banner.hidden = true; return; }
    const p = document.createElement("p");
    let a;
    if (match.kind === "yes") {
      p.textContent = "Yes, we clean in " + match.area + ".";
      a = waButton("Ask about " + match.area, match.area);
    } else if (match.kind === "emirate") {
      p.textContent = match.label
        ? "We take on projects and events in " + match.label + " and across all Emirates."
        : "Yes, we take on projects and events across all Emirates.";
      a = waButton("Ask about a project or event", (match.label || "All Emirates") + ", project or event");
    } else {
      const place = raw.length > 60 ? raw.slice(0, 60).trim() : raw;
      p.textContent = "Not sure we cover " + place + "?";
      a = waButton("Ask us to confirm", place + ", please confirm");
    }
    banner.append(p, a);
    bindLinks(banner);
    banner.hidden = false;
  };

  const renderEmpty = (raw) => {
    empty.textContent = "";
    const p = document.createElement("p");
    p.textContent = "Nothing matches \"" + raw + "\" yet. Tell us what you need on WhatsApp and we will confirm whether we can help.";
    empty.append(p, waButton("Ask on WhatsApp"));
    bindLinks(empty);
  };

  let last = { shown: cards, raw: "" };
  const setCount = (now) => {
    const { shown, raw } = last;
    // While collapsed on a phone only the signature cards are on screen.
    const onScreen = collapsed && small.matches ? shown.filter((c) => signature.includes(c)) : shown;
    const n = onScreen.length;
    if (shown.length === 0) announce("No services match \"" + raw + "\"", now);
    else if (n === total) announce("Showing all " + total + " services", now);
    else announce("Showing " + n + " of " + total + " services", now);
  };

  const apply = () => {
    const cat = activeCat();
    const raw = input.value.trim();
    const q = norm(raw);
    const tokens = q ? q.split(" ") : [];
    const inCat = cards.filter((c) => cat === "all" || (c.dataset.cat || "").split(" ").includes(cat));
    const matches = (toks) => inCat.filter((c) => toks.every((t) => hasTok(c, t)));
    if (q || cat !== "all") expand();

    const textHits = matches(tokens);
    const match = resolve(q, tokens, textHits, matches);
    renderBanner(match, raw);

    let shown = textHits;
    if (match && match.kind === "yes") {
      shown = match.rest.length ? matches(match.rest) : inCat;
    } else if (match && match.kind === "emirate") {
      const rest = match.rest.length ? matches(match.rest) : [];
      // Outside Dubai and Sharjah we take on projects and events.
      shown = rest.length ? rest : inCat.filter((c) => hay.get(c).includes("emirates"));
    } else if (match && match.kind === "unsure") {
      // Keep the words that describe a service ("deep cleaning palm jumeirah").
      const kept = match.rest.filter((t) => !placey(t) && t !== "dubai" && inCat.some((c) => hasTok(c, t)));
      shown = kept.length && matches(kept).length ? matches(kept) : inCat;
    }

    const shownSet = new Set(shown);
    cards.forEach((c) => {
      const on = shownSet.has(c);
      c.hidden = !on;
      // Filtering should feel instant, so skip the scroll-reveal delay.
      if (on) { c.classList.add("in"); c.style.transitionDelay = ""; }
    });

    empty.hidden = shown.length !== 0;
    if (!shown.length) renderEmpty(raw);
    // The "show all" toggle only makes sense for the unfiltered list.
    moreWrap.hidden = Boolean(q || cat !== "all") || !(signature.length && signature.length < total);
    last = { shown, raw };
    setCount();
  };

  moreBtn.addEventListener("click", () => {
    collapsed = !collapsed;
    syncToggle();
    setCount(true);
    if (collapsed) moreBtn.scrollIntoView({ block: "nearest" });
  });
  if (small.addEventListener) small.addEventListener("change", () => setCount(true));
  setCount(true);

  const press = (chip) => chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));

  input.addEventListener("input", apply);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && input.value) { e.preventDefault(); input.value = ""; apply(); }
    if (e.key === "Enter") e.preventDefault();
  });
  chips.forEach((chip) => chip.addEventListener("click", () => { press(chip); apply(); }));

  // Lane cards pick the matching chip and bring the finder into view.
  document.querySelectorAll("[data-lane]").forEach((lane) => {
    lane.addEventListener("click", (e) => {
      const chip = chips.find((c) => c.dataset.filter === lane.dataset.lane);
      if (!chip) return;
      e.preventDefault();
      press(chip);
      input.value = "";
      apply();
      finder.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      chip.focus({ preventScroll: true });
    });
  });

  // Deep link to a card (#svc-deep-cleaning): show everything and open its details.
  const openFromHash = () => {
    if (!location.hash.startsWith("#svc-")) return;
    const card = document.getElementById(location.hash.slice(1));
    if (!card || !card.classList.contains("svc-card")) return;
    press(chips.find((c) => c.dataset.filter === "all") || chips[0]);
    input.value = "";
    expand();
    apply();
    const more = card.querySelector("details");
    if (more) more.open = true;
    card.scrollIntoView({ block: "start" });
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
}

/* ---------- Quote form prefill: service cards, the quote block, ?service= and ?area= ---------- */
function initPrefill() {
  const select = document.getElementById("bf-service");
  const name = document.getElementById("bf-name");
  const area = document.getElementById("bf-area");
  const choose = (value) => {
    if (!select || !value || ![...select.options].some((o) => o.value === value)) return false;
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };
  // Landing pages link to /?service=Deep%20cleaning#contact. Exact option text only;
  // the native #contact jump does the scrolling and nothing is focused.
  try { choose(new URLSearchParams(location.search).get("service")); } catch (e) { /* ignore */ }
  // /?area=Sharjah#contact fills Area only when the value exactly matches an area chip.
  try {
    const want = (new URLSearchParams(location.search).get("area") || "").trim().slice(0, 40);
    if (area && want && !area.value &&
        [...document.querySelectorAll("[data-area]")].some((el) => el.dataset.area === want)) area.value = want;
  } catch (e) { /* ignore */ }

  if (!name) return;
  // Let the native #contact jump happen, then focus a field once it has landed: Name when
  // the service is already chosen, otherwise the Service select (the only required field).
  const focusLater = (el) => setTimeout(() => el && el.focus({ preventScroll: true }), reduceMotion() ? 0 : 450);
  document.querySelectorAll("[data-prefill-service]").forEach((el) => {
    el.addEventListener("click", () => focusLater(choose(el.dataset.prefillService) ? name : select || name));
  });
  document.querySelectorAll("[data-focus-form]").forEach((el) => el.addEventListener("click", () => focusLater(select && !select.value ? select : name)));
}

/* ---------- Book by moment: prev/next on the mobile scroller ---------- */
function initMoments() {
  const track = document.getElementById("moments-track");
  const prev = document.querySelector('.moments-btn[data-dir="-1"]');
  const next = document.querySelector('.moments-btn[data-dir="1"]');
  if (!track || !prev || !next) return;

  const update = () => {
    const overflowing = track.scrollWidth > track.clientWidth + 4;
    prev.disabled = !overflowing || track.scrollLeft <= 4;
    next.disabled = !overflowing || track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  [prev, next].forEach((btn) => btn.addEventListener("click", () => {
    track.scrollBy({ left: Number(btn.dataset.dir) * track.clientWidth * 0.85, behavior: reduceMotion() ? "auto" : "smooth" });
  }));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };
  track.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/* ---------- Booking form builds a WhatsApp message (or an email) ---------- */
function normalisePhone(raw) {
  const s = raw.replace(/[^\d+]/g, "");
  if (s.startsWith("+")) return raw.trim();
  if (s.startsWith("00971")) return "+971 " + s.slice(5);
  if (s.startsWith("971")) return "+971 " + s.slice(3);
  if (/^0\d{8,9}$/.test(s)) return "+971 " + s.slice(1);
  return raw.trim();
}

function formatDate(v) {   // "2026-10-10" -> "Sat 10 Oct 2026"
  // Browsers without a date picker accept free text: pass it through untouched.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const [y, m, d] = v.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  // Built from parts so no browser adds a comma after the weekday.
  const part = (opts) => date.toLocaleDateString("en-GB", opts);
  return [part({ weekday: "short" }), date.getDate(), part({ month: "short" }), date.getFullYear()].join(" ");
}

// The fields the visitor filled in; empty ones are always skipped.
function bookingFields(form) {
  const d = new FormData(form);
  const v = (k) => (d.get(k) || "").toString().trim();
  const lines = [];
  if (v("name")) lines.push("Name: " + v("name"));
  if (v("phone")) lines.push("Phone: " + normalisePhone(v("phone")));
  if (v("service")) lines.push("Service: " + v("service"));
  if (v("area")) lines.push("Area: " + v("area"));
  if (v("property")) lines.push("Property type: " + v("property"));
  if (v("size")) lines.push("Property size: " + v("size"));
  if (v("date")) lines.push("Preferred date: " + formatDate(v("date")));
  if (v("message")) lines.push("Details: " + v("message"));
  return lines;
}
// Default message, a blank line, the filled fields, then the From / Came via / First page lines.
function bookingLines(form) {
  return [CONFIG.defaultMessage, ""].concat(bookingFields(form), contextLines(form));
}

function initForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;
  const status = document.getElementById("bf-status");

  // Earliest date is today in the visitor's own timezone (not UTC).
  const date = document.getElementById("bf-date");
  if (date) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    date.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  }

  // Area suggestions from the #areas chips.
  const list = document.getElementById("area-list");
  if (list) {
    const seen = new Set();
    document.querySelectorAll("[data-area]").forEach((el) => {
      const { area, emirate } = el.dataset;
      const label = !emirate || emirate === "UAE" || emirate === area ? area : area + ", " + emirate;
      if (!label || seen.has(label)) return;
      seen.add(label);
      const opt = document.createElement("option");
      opt.value = label;
      list.appendChild(opt);
    });
  }

  // Inline validation: each field's error is linked with aria-describedby.
  // Only Service is required. Phone is optional (WhatsApp already shows the number),
  // but a typed number needs at least 9 digits. Name is never validated.
  const fields = {
    phone: { el: form.elements.phone, ok: (v) => v.trim() === "" || v.replace(/\D/g, "").length >= 9 },
    service: { el: form.elements.service, ok: (v) => v !== "" }
  };
  const describe = (el, id, on) => {
    const ids = (el.getAttribute("aria-describedby") || "").split(" ").filter((x) => x && x !== id);
    if (on) ids.push(id);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
  };
  const setError = (key, on) => {
    const { el } = fields[key];
    const err = document.getElementById("bf-" + key + "-err");
    if (on) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    if (err) { err.hidden = !on; describe(el, err.id, on); }
    if (key === "phone") el.setCustomValidity(on ? "Please check the phone number, or leave it blank." : "");
  };
  Object.keys(fields).forEach((key) => {
    const { el } = fields[key];
    if (!el) return;
    const clear = () => { if (el.getAttribute("aria-invalid") === "true") setError(key, false); };
    el.addEventListener("input", clear);
    el.addEventListener("change", clear);
  });
  const validate = () => {
    let first = null;
    Object.keys(fields).forEach((key) => {
      const { el, ok } = fields[key];
      if (!el) return;
      const bad = !ok(el.value || "");
      setError(key, bad);
      if (bad && !first) first = el;
    });
    if (first) { first.focus(); return false; }
    return true;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = waLink(bookingLines(form).join("\n"));
    // Instagram and Facebook in-app browsers can block window.open.
    if (/Instagram|FBAN|FBAV/i.test(navigator.userAgent)) location.href = url;
    else window.open(url, "_blank", "noopener");
    if (status) {
      // Built with DOM methods so no user text is ever parsed as HTML.
      const a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "open WhatsApp here";
      status.textContent = "WhatsApp is opening with your details. If nothing happened, ";
      status.append(a, ".");
    }
  });

  // "Prefer email?" never blocks an email lead. With an empty form the link's own
  // mailto (referral subject, body and source line from bindLinks) opens as is;
  // otherwise whatever the visitor has filled in is added below the referral line.
  form.querySelectorAll("[data-form-email]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (!bookingFields(form).length) return;
      const lines = bookingLines(form);
      e.preventDefault();
      const addr = el.hasAttribute("data-email-secondary") ? CONFIG.emailSecondary : CONFIG.email;
      location.href = mailLink(addr, lines.join("\r\n"));
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  const open = [];
  document.querySelectorAll(".faq-q").forEach((btn, i) => {
    const item = btn.closest(".faq-item");
    const panel = item && item.querySelector(".faq-a");
    if (!panel) return;
    // Answers are open without JS; the script collapses them and wires up ARIA.
    if (!panel.id) panel.id = "faq-a-" + (i + 1);
    btn.setAttribute("aria-controls", panel.id);
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.classList.toggle("is-open", !isOpen);
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

/* ---------- Hero reel tile: nothing downloads until play is pressed ---------- */
function initHeroReel() {
  document.querySelectorAll(".bento-play").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tile = btn.parentElement;
      const video = document.createElement("video");
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.preload = "metadata";
      if (btn.dataset.reelPoster) video.poster = btn.dataset.reelPoster;
      video.setAttribute("aria-label", "Bee Thrive office cleaning, filmed on a real job");
      const source = document.createElement("source");
      source.src = btn.dataset.reelSrc;
      source.type = "video/mp4";
      video.appendChild(source);

      // The caption chip would sit over the player controls, so it goes too.
      tile.querySelectorAll(":scope > img, .bento-chip").forEach((n) => n.remove());
      btn.replaceWith(video);
      // Under reduced motion the visitor presses play themselves.
      if (!reduceMotion()) video.play().catch(() => {});
      video.focus();
      if (document.activeElement !== video) { video.tabIndex = -1; video.focus(); }
    });
  });
}

/* ---------- Mobile action bar + desktop WhatsApp pill ---------- */
// The phone bar and the desktop pill both stay hidden while the hero CTAs ([data-bar-trigger],
// else .hero-cta) are on screen, so the first viewport never shows the same action twice. Both
// hide over #contact and every [data-bar-hide] (the final CTA). The pill also hides over the
// footer; the bar over the share block, while the menu is open or while the form has focus.
function initActionBar() {
  const bar = document.getElementById("action-bar");
  const fab = document.querySelector(".fab-whatsapp");
  const contact = document.getElementById("contact");
  const footer = document.querySelector(".site-footer");
  const form = document.getElementById("booking-form");
  if ((!bar && !fab) || !("IntersectionObserver" in window)) return;

  const trigger = document.querySelector("[data-bar-trigger]") || document.querySelector(".hero-cta");
  const hiders = [contact, ...document.querySelectorAll("[data-bar-hide]")].filter(Boolean);
  // A friend-share button next to the bar's "WhatsApp quote" is easy to mix up on a phone.
  const barHiders = [...document.querySelectorAll("[data-share]")];
  const inView = new Set();
  let triggerVisible = Boolean(trigger);   // start hidden when there is a trigger, so no flash
  let formFocused = false;
  const update = () => {
    const overHider = hiders.some((h) => inView.has(h));
    const overShare = barHiders.some((h) => inView.has(h));
    if (bar) bar.classList.toggle("is-hidden", Boolean(triggerVisible || overHider || overShare || formFocused || document.body.classList.contains("nav-open")));
    if (fab) fab.classList.toggle("is-hidden", Boolean(triggerVisible || overHider || (footer && inView.has(footer))));
  };
  refreshActionBar = update;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) inView.add(e.target); else inView.delete(e.target); });
    update();
  }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
  hiders.concat(barHiders, footer ? [footer] : []).forEach((t) => io.observe(t));

  if (trigger) {
    new IntersectionObserver(([e]) => { triggerVisible = e.isIntersecting; update(); }, { threshold: 0 }).observe(trigger);
  }

  // Past the hero the desktop pill shrinks to an icon so it covers less content;
  // CSS brings the label back on hover and keyboard focus.
  const hero = document.querySelector(".hero, .page-hero");
  if (fab && hero) {
    new IntersectionObserver(([e]) => fab.classList.toggle("is-compact", !e.isIntersecting), { threshold: 0 }).observe(hero);
  }

  if (form) {
    form.addEventListener("focusin", () => { formFocused = true; update(); });
    form.addEventListener("focusout", (e) => { formFocused = Boolean(e.relatedTarget && form.contains(e.relatedTarget)); update(); });
  }
  update();
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll(
    ".section-head, .trust-item, .trusted-list, .lane-card, .finder, .svc-card, .moment-card, " +
    ".prep-card, .why-card, .standard-loop, .promise-card, .reel-copy, .reel-card, .reel-mini, .area-group, .band, " +
    ".review-feature, .review-card, .clients-subhead, .client-card, .step, .quote-factors, .booking-form, " +
    ".contact-info-col, .faq-item, .final-cta-inner"
  );
  // ?allvisible shows every section immediately (used for full-page screenshots and
  // for users who prefer reduced motion); no effect on normal visits.
  const forceVisible = location.search.indexOf("allvisible") !== -1;
  if (reduceMotion() || forceVisible || !("IntersectionObserver" in window)) {
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
  let ioFired = false;
  const io = new IntersectionObserver((entries) => {
    ioFired = true;
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

  // Safety net: if the observer never runs at all, reveal everything anyway. When it
  // does run, content below the fold keeps its reveal for when it is scrolled to.
  setTimeout(() => {
    if (ioFired) return;
    targets.forEach((t) => { t.classList.add("in"); t.style.transitionDelay = ""; });
  }, 2500);
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

/* ---------- Count-up stats (only elements with data-count) ---------- */
function initCountUp() {
  const nums = [...document.querySelectorAll("[data-count]")];
  // The final value is already in the HTML, so doing nothing is always safe.
  if (!nums.length || reduceMotion() || !("IntersectionObserver" in window)) return;
  const run = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
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
  // Every section is watched, so one without a nav link clears the highlight.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
        const link = map.get(e.target);
        if (link) { link.classList.add("active"); link.setAttribute("aria-current", "true"); }
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  document.querySelectorAll("main > section").forEach((sec) => io.observe(sec));
}

/* ---------- Structured data ---------- */
// JSON-LD is written by hand into each page's static HTML, because crawlers and most AI
// bots do not run JavaScript. Nothing in this file writes structured data. When you edit a
// FAQ answer or a business fact, edit the matching JSON-LD text on that page too.

/* ---------- Init ---------- */
// Every init returns early when its elements are missing, so this runs cleanly on the
// landing pages, /about and the 404 page as well as the home page.
document.addEventListener("DOMContentLoaded", () => {
  initAttribution();
  bindLinks();
  initShare();
  initNav();
  initHeaderScroll();
  initServiceFinder();
  initPrefill();
  initMoments();
  initForm();
  initFaq();
  initHeroReel();
  initActionBar();
  initHeroLoad();
  initReveal();
  initCountUp();
  initScrollSpy();
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
});
