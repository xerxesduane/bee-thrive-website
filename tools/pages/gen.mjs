// Generates the landing pages (every page except index.html) into the repo root. Run: node tools/pages/gen.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build, ticks, prep, paras, smallWa, clientGrid, review, reviewFig, relatedList, esc, WA_ICO, MAPS } from "./lib.mjs";

const REPO = process.env.OUT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SHARE_P = "Send them this page in one tap. No sign-up, and we never see who you share with.";

const pages = [];

/* ================= 9.1 Deep cleaning ================= */
pages.push({
  key: "deep", file: "deep-cleaning-dubai.html", slug: "deep-cleaning-dubai",
  title: "Deep Cleaning in Dubai & Sharjah, Supervised | Bee Thrive",
  meta: "Top-to-bottom deep cleaning for apartments and villas in Dubai and Sharjah, checked by a free on-site supervisor, with a 24-hour re-clean promise.",
  ogTitle: "Deep cleaning in Dubai, checked by a supervisor",
  ogDesc: "Free supervisor on every deep clean in Dubai and Sharjah. Quote agreed before we start.",
  ogImg: "og-deep-cleaning-v2.jpg", ogHeadline: "Deep cleaning in Dubai, checked by a supervisor",
  h1: "Deep cleaning for apartments and villas in Dubai", crumb: "Deep cleaning in Dubai", page: "deep cleaning page",
  service: "Deep cleaning", formHref: "/?service=Deep%20cleaning#contact",
  heroImg: "work-windows-1.jpg", w: 958, h: 1280,
  heroAlt: "A Bee Thrive cleaner detailing the corner of a window, the kind of spot everyday cleaning misses",
  eyebrow: "Deep cleaning · Dubai and Sharjah",
  lead: "A Bee Thrive deep clean is a top-to-bottom clean of your apartment or villa that reaches the corners everyday cleaning tends to miss. A vetted team brings professional-grade equipment and materials, a free on-site supervisor checks the finished work, and if any area needs another pass, tell us within 24 hours and we come back free.",
  ctaLabel: "Get my deep cleaning quote on WhatsApp", ctaShort: "Deep clean quote",
  serviceName: "Deep cleaning", serviceType: "Deep cleaning for apartments and villas",
  shells: [
    [{ id: "included", from: "what is included", h2: "What is included in a Bee Thrive deep clean?", html: [
      paras("Every deep clean is planned around your home, so the exact scope is agreed in your quote before anyone arrives. These parts are the same on every job:"),
      ticks([
        "Top to bottom, room by room, including the corners, edges and high spots that routine cleaning skips",
        "A vetted, trained team that arrives with professional-grade equipment and materials",
        "Your own products used instead, if you prefer, with the quote adjusted to match",
        "A supervisor on site who checks the work before the job is signed off, at no extra cost",
        "A 24-hour window to tell us if any area needs another pass, and a free return visit if it does",
      ]),
      paras("Want particular attention on the kitchen, bathrooms, balcony or inside wardrobes? Send a short list or a few photos on WhatsApp and we will confirm what can be covered and include it in your quote, so you know exactly what is covered before the day."),
      "<!-- OWNER: add the verified room-by-room checklist here when supplied -->",
    ].join("\n          ") }],
    [{ id: "difference", from: "deep clean vs regular cleaning", h2: "What is the difference between a deep clean and regular cleaning?", html:
      paras('Regular cleaning keeps a home in good shape from one visit to the next: the surfaces, floors and rooms you use every day. A deep clean is the reset underneath that. It takes longer, goes into the places where dust and grime build up over months, and is booked once in a while rather than every week. A good pattern is a deep clean first, then a regular plan to keep it that way. See <a href="/home-cleaning-dubai">home cleaning and maid services</a> for regular visits.') }],
    [{ id: "how", from: "how it works", h2: "How does a supervised deep clean work?", mid: "Tell us your home size and area, and we will send a clear quote.", steps: [
      ["Tell us about your home", "Share the size, the condition and anything you want extra focus on, on WhatsApp, by phone or through the quote form."],
      ["Agree your quote", "We confirm the scope and the quote before anything starts. No hidden fees, and supervision is included."],
      ["The team cleans, the supervisor checks", "A vetted team works through the home, then a supervisor checks the result against what was agreed."],
      ["You approve the result", "Walk through it yourself. Not right? Tell us within 24 hours and we return to re-clean it, free."],
    ] }],
    [
      { id: "when", from: "when to book", h2: "When is the best time to book a deep clean?", html: [
        ticks([
          "Before guests arrive, or before Ramadan, Eid or a family visit fills the house",
          "After a busy season, when everyday cleaning is no longer keeping up",
          'When you move into a new home, or before you hand one back (see <a href="/move-in-move-out-cleaning-dubai">move-in and move-out cleaning</a>)',
          "Between guests in a holiday home that needs more than a quick turnover",
          "Any time the whole home simply needs a reset",
        ]),
        paras("We work six days a week with flexible scheduling. Tell us your preferred date and we will confirm the soonest slot we have."),
      ].join("\n          ") },
      { id: "cost", from: "cost", h2: "How much does deep cleaning cost in Dubai?", html:
        paras("Bee Thrive does not publish a fixed price for deep cleaning, because two homes of the same size can need very different amounts of work. Your quote is based on three things: the size of the property, its condition, and the cleaning scope you want. You agree the quote before we start, supervision is included free, and nothing is added on the day.") },
    ],
    [
      { id: "prepare", from: "how to prepare", h2: "How should I prepare for a deep clean?", html: prep([
        ["Pick your priorities.", "If time matters, rank the rooms or spots you care about most so the team starts there."],
        ["Put valuables and paperwork away.", "It keeps them safe and leaves surfaces clear to clean."],
        ["Book building access in advance.", "Some buildings need a lift booking, a gate pass or visitor parking arranged ahead of time."],
        ["Mention pets and delicate surfaces.", "Marble, wood or anything that needs gentle handling is worth flagging when you book."],
        ["Plan your final check.", "Walk through the home when the team finishes, or when you get back. You still have 24 hours to tell us about anything."],
      ]) },
      review("russel"),
    ],
  ],
  faqH2: "Deep cleaning questions, answered",
  faqs: [
    ["How long does a deep clean take?", "It depends on the size and condition of your home and the scope you choose, so Bee Thrive confirms the timing with your quote before the day. A larger villa, or a home that has not had a deep clean for a while, naturally takes longer than a small, well-kept apartment."],
    ["Do the cleaners bring their own equipment and products?", "Yes. Bee Thrive deep cleaning teams arrive with professional-grade equipment and materials. If you would rather the team used your own products, for example on a particular surface, tell us when you book and we will use them and adjust your quote to match."],
    ["Do you deep clean villas as well as apartments?", "Yes. Bee Thrive deep cleans both apartments and villas across Dubai and Sharjah. A villa quote reflects its size and condition, and the free supervisor check and 24-hour re-clean promise are included whatever the size of the home."],
    ["Can I add carpet cleaning to my deep clean?", "Yes. Carpet cleaning is a separate Bee Thrive service that lifts stains, dust and allergens, and you can ask for it alongside your deep clean. Mention your carpets and rugs when you request a quote so the team plans for them and the quote covers everything."],
    ["What if I am not happy with part of the deep clean?", "Tell Bee Thrive within 24 hours and the team comes back to re-clean that area free. A supervisor has already checked the work before the team leaves, and the return visit is there for anything that was missed or that you want looked at again."],
    ["Do you offer deep cleaning in Sharjah?", "Yes. Bee Thrive offers deep cleaning for homes in Sharjah as well as Dubai, with the same free supervisor and 24-hour re-clean promise. Send your area on WhatsApp when you ask for a quote and we will confirm."],
  ],
  related: ["move", "home", "holiday", "sharjah"],
  shareH2: "Know someone whose home needs a reset?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive does deep cleaning for apartments and villas in Dubai, with a free supervisor checking every job.",
  finalH2: "Ready for a deep clean that is checked before we leave?",
  finalP: "Send your home size and area on WhatsApp for a free, no-obligation quote.",
});

/* ================= 9.2 Move-in / move-out ================= */
const moveTable = `<div class="price-table-wrap page-table">
            <table class="price-table">
              <caption class="visually-hidden">Move-in and move-out cleaning compared</caption>
              <thead>
                <tr><td></td><th scope="col">Move-out clean</th><th scope="col">Move-in clean</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">When</th><td data-label="Move-out clean">In the days before you hand back the keys</td><td data-label="Move-in clean">Between getting the keys and your furniture arriving</td></tr>
                <tr><th scope="row">The aim</th><td data-label="Move-out clean">Leave the property ready for the handover inspection</td><td data-label="Move-in clean">Start in a home that is clean from the first day</td></tr>
                <tr><th scope="row">Good to know</th><td data-label="Move-out clean">Book once your belongings are packed, so the team can reach everything</td><td data-label="Move-in clean">Empty rooms are easier to clean thoroughly, so book before delivery day</td></tr>
              </tbody>
            </table>
          </div>`;
pages.push({
  key: "move", file: "move-in-move-out-cleaning-dubai.html", slug: "move-in-move-out-cleaning-dubai",
  title: "Move-In & Move-Out Cleaning Dubai & Sharjah | Bee Thrive",
  meta: "Move-in and move-out cleaning for apartments and villas in Dubai and Sharjah, done to handover standard and checked by a free supervisor. Free quote.",
  ogTitle: "Move-in and move-out cleaning in Dubai, to handover standard",
  ogDesc: "A free supervisor checks every move-out clean. Dubai and Sharjah. Free quote on WhatsApp.",
  ogImg: "og-move-in-move-out-v2.jpg", ogHeadline: "Move-in and move-out cleaning to handover standard",
  h1: "Move-in and move-out cleaning in Dubai, done to handover standard", crumb: "Move-in and move-out cleaning", page: "move-in and move-out page",
  service: "Move-in and move-out cleaning", formHref: "/?service=Move-in%20and%20move-out%20cleaning#contact",
  heroImg: "work-restroom.jpg", w: 958, h: 1280,
  heroAlt: "A freshly cleaned washroom with Bee Thrive cleaning supplies on the counter",
  eyebrow: "Move-in and move-out cleaning · Dubai and Sharjah",
  lead: "Bee Thrive move-in and move-out cleaning is a thorough reset of an apartment or villa, done to handover standard before you return the keys or before your things arrive. The team comes fully equipped, a free on-site supervisor checks the result, and you have 24 hours to ask for a free re-clean of any area.",
  ctaLabel: "Get my move-out quote on WhatsApp", ctaShort: "Move-out quote",
  serviceName: "Move-in and move-out cleaning", serviceType: "End of tenancy and move-in cleaning to handover standard",
  shells: [
    [
      { id: "what-is", from: "what is move-out cleaning", h2: "What is move-out cleaning in Dubai?", html:
        paras("Move-out cleaning, often called end of tenancy cleaning, is the deep clean of a property when a tenant leaves, so it is ready to hand back to the landlord or agent. Move-in cleaning is the same thorough reset done before a new tenant or owner moves in, ideally while the rooms are still empty. Both need a finish that stands up to a close look, which is where a supervisor check helps.") },
      { id: "compare", from: "move-in vs move-out", h2: "Move-in or move-out: what is the difference?", html: [
        paras("A move-out clean happens in the days before you hand back the keys, so the property is ready for the handover inspection. A move-in clean happens between collecting the keys and your furniture arriving, so you start in a clean home. Both are the same thorough reset, checked by a free supervisor."),
        moveTable,
      ].join("\n          ") },
    ],
    [{ id: "included", from: "what is included", h2: "What does a Bee Thrive move-out clean include?", html: [
      ticks([
        "A thorough reset of the whole property, done to handover standard",
        "A fully equipped team, so you do not need to leave any products behind",
        "A supervisor check before the team leaves, included free",
        "A quote based on the property's size and your handover requirements",
        "Tell us within 24 hours if any area needs another pass, and we return free",
      ]),
      paras("If your landlord, agent or building has a handover checklist, send it with your enquiry. We will confirm what the quote covers against it before we start."),
      '<p class="page-note">We clean to handover standard, but the decision on any security deposit rests with your landlord or agent, so we never promise a deposit outcome.</p>',
    ].join("\n          ") }],
    [{ id: "when", from: "when to book", h2: "When should I book move-out cleaning?", html:
      paras("Book as soon as you know your handover date. The best slot is in the days before you return the keys, once your belongings are packed or moved, so the team can reach every room. For a move-in clean, book for the gap between collecting the keys and your furniture arriving. We work six days a week and will confirm the soonest slot we have.") }],
    [{ id: "how", from: "how it works", h2: "How does a move-in or move-out clean work?", mid: "Know your handover date? Send it with your property size for a clear quote.", steps: [
      ["Send your dates and property", "Tell us the property size, the area and your handover or move-in date on WhatsApp, by phone or through the form."],
      ["Share any checklist", "Forward the landlord or agent requirements so the scope matches them. Your quote is agreed before we start."],
      ["Supervised clean", "A fully equipped team does the reset and a supervisor checks it before they leave."],
      ["Hand over with confidence", "Check the result. If anything needs another pass, tell us within 24 hours and we come back free."],
    ] }],
    [
      { id: "quote", from: "how quotes work", h2: "How is a move-in or move-out quote worked out?", html:
        paras("Two things set the quote: the size of the property and the handover requirements you need to meet. A larger villa, or a landlord checklist with specific items, means more work than a small empty apartment. You agree the quote before we start, with no hidden fees and supervision included.") },
      { id: "checklist", from: "moving checklist", h2: "Moving checklist: getting ready for the clean", html: [
        prep([
          ["Pack and clear first.", "The clean works best once cupboards, wardrobes and rooms are empty."],
          ["Keep the handover paperwork handy.", "Your tenancy terms or the agent's checklist tell us what matters most at inspection."],
          ["Arrange building access.", "Some buildings need a move permit, lift booking or gate pass, so book them for the cleaning day too."],
          ["Keep water and electricity connected.", "The team needs both on the day to clean properly."],
          ["Leave a little time before the inspection.", "Booking the clean ahead of your handover leaves room for a re-clean visit if anything needs another pass."],
        ]),
        '<div class="page-sub" id="packing" data-wa-from="packing and unpacking">',
        '  <h3>Need help with packing too?</h3>',
        "  " + paras("Bee Thrive also offers packing and unpacking for home and office moves, quoted on volume, access and scope. Ask about both in one message."),
        "  " + smallWa("Packing and unpacking", "Ask about packing on WhatsApp"),
        "</div>",
      ].join("\n          ") },
      review("atta"),
    ],
  ],
  faqH2: "Move-in and move-out questions, answered",
  faqs: [
    ["Will a move-out clean help me get my deposit back?", "A Bee Thrive move-out clean is done to handover standard and checked by a supervisor, which puts the property in good shape for the inspection. The deposit decision always rests with your landlord or agent, so we do not promise an outcome. If anything is flagged within 24 hours of the clean, we return to re-clean it free."],
    ["Is move-in cleaning worth it for a new or empty apartment?", "Empty homes still collect dust, marks and leftovers from the previous occupant or from recent works. A move-in clean before your furniture arrives lets the team reach every surface easily, so you start in a home that is clean from the first day, with the same free supervisor check."],
    ["Can the team bring everything they need?", "Yes. The team arrives fully equipped with professional-grade equipment and materials, so you can pack your own products away before the clean. If you would like the team to use products you are leaving behind, say so when you book and we will adjust the quote to match."],
    ["Can you help with packing and unpacking as well?", "Yes. Bee Thrive offers packing and unpacking for home and office moves as a separate service, quoted on volume, access and scope. You can ask for it together with your move-out or move-in clean in the same WhatsApp message, and both are agreed before we start."],
    ["Do you do move-in and move-out cleaning in Sharjah?", "Yes. Bee Thrive handles move-in and move-out cleaning for homes in Sharjah as well as Dubai, with the same supervisor check and 24-hour re-clean promise. Send your area, property size and handover date on WhatsApp and we will confirm."],
  ],
  related: ["deep", "post", "home", "sharjah"],
  shareH2: "Know someone who is moving?", shareP: SHARE_P,
  shareText: "Moving soon? Bee Thrive does move-in and move-out cleaning in Dubai to handover standard, with a free supervisor checking the work.",
  finalH2: "Moving soon? Book your handover clean.",
  finalP: "Send your move date, area and property size on WhatsApp for a free quote.",
});

/* ================= 9.3 Office ================= */
pages.push({
  key: "office", file: "office-cleaning-dubai.html", slug: "office-cleaning-dubai",
  title: "Office Cleaning in Dubai & Sharjah, Supervised | Bee Thrive",
  meta: "Office cleaning in Dubai and Sharjah before or after working hours, on hourly, monthly or yearly plans. A free supervisor checks every visit.",
  ogTitle: "Office cleaning in Dubai, before or after your hours",
  ogDesc: "A free supervisor checks every office visit. Hourly, monthly or yearly plans. Free quote on WhatsApp.",
  ogImg: "og-office-cleaning-v1.jpg", ogHeadline: "Office cleaning, before or after your hours",
  h1: "Office cleaning in Dubai, before or after your working hours", crumb: "Office cleaning in Dubai", page: "office cleaning page",
  service: "Office cleaning", formHref: "/?service=Office%20cleaning#contact",
  heroImg: "work-office.jpg", w: 1280, h: 958,
  heroAlt: "A bright, freshly cleaned office in Dubai after a Bee Thrive visit",
  eyebrow: "Office cleaning · Dubai and Sharjah",
  lead: "Bee Thrive office cleaning keeps workplaces in Dubai and Sharjah clean before or after your working hours, so your team is never interrupted. Choose hourly, monthly or yearly plans, six days a week, with better rates for regular visits. A free on-site supervisor checks the work, so the standard does not slip over time.",
  ctaLabel: "Get my office cleaning quote on WhatsApp", ctaShort: "Office quote",
  serviceName: "Office cleaning", serviceType: "Office cleaning before or after working hours",
  shells: [
    [{ id: "clients", from: "office clients", h2: "Which offices does Bee Thrive clean?", html: [
      paras("Bee Thrive cleans offices across Dubai and Sharjah, on one-off visits or regular plans. Office clients that have worked with Bee Thrive include:"),
      clientGrid("office"),
    ].join("\n          ") }],
    [
      { id: "included", from: "what is included", h2: "What does office cleaning with Bee Thrive include?", html: [
        ticks([
          "Cleaning before or after office hours, timed around your team",
          "Hourly, monthly or yearly plans, six days a week",
          "A free on-site supervisor who checks the work on every visit",
          "A vetted, trained team that arrives with professional-grade equipment and materials",
          "Better rates when you book a regular plan",
          "One-off deep cleans on request, for example before a client visit",
        ]),
        paras("Every office is different, so the exact tasks and frequency are agreed with you and set out in your quote."),
      ].join("\n          ") },
      { id: "how-often", from: "how often", h2: "How often should an office be cleaned?", html:
        paras("It depends on how many people use the space and how they use it. A busy office with a kitchen and meeting rooms needs more frequent visits than a small office with a few desks. A practical approach is to agree a regular plan for the everyday cleaning, then book a deep clean when the office needs a reset or before an important visit. Bee Thrive can suggest a pattern once we know your space.") },
    ],
    [{ id: "supervision", from: "why supervision matters", h2: "Why does supervision matter for an office contract?", html:
      paras("Regular cleaning tends to slip slowly: the first weeks look fine, then corners start to be missed. At Bee Thrive a supervisor checks the work on every visit, at no extra cost, so the standard in month six matches the first week. If anything is not right, tell us within 24 hours and we come back to re-clean it free.") }],
    [{ id: "how", from: "how it works", h2: "How to start an office cleaning plan", mid: "Share your office size and working hours, and we will propose a plan.", steps: [
      ["Tell us about the office", "Share the size, your working hours and what matters most, on WhatsApp, by phone or by email."],
      ["Agree the plan and quote", "Pick hourly, monthly or yearly visits and confirm the scope and quote before we start."],
      ["Supervised visits", "A vetted team cleans before or after hours, and a supervisor checks the work each time."],
      ["Keep it on track", "Tell us within 24 hours if anything is not right and we return to re-clean it free."],
    ] }],
    [
      { id: "quote", from: "how quotes work", h2: "How is an office cleaning quote worked out?", html:
        paras("Your quote is based on the size and condition of your office, the scope of work, and your schedule: how often you want visits and whether they happen before or after hours. Regular plans get better rates than one-off visits. You agree the quote before the first visit, with no hidden fees and supervision included.") },
      { id: "extras", from: "window, glass and office support", h2: "Window, glass and office support", html: [
        '<div class="page-sub" id="windows" data-wa-from="window and glass cleaning">',
        "  <h3>Window and glass cleaning</h3>",
        "  " + paras("Clean glass makes a workplace look cared for. Bee Thrive provides window and surface detailing for offices, projects and handovers, so ask for window and glass cleaning alongside your office quote."),
        "  " + smallWa("Window and glass cleaning", "Ask about windows on WhatsApp"),
        "</div>",
        '<div class="page-sub" id="support" data-wa-from="office support staff">',
        "  <h3>Office support staff</h3>",
        "  " + paras("Bee Thrive also offers office support staff for daily housekeeping and admin tasks. Tell us what you need covered and we will confirm it with your quote."),
        "  " + smallWa("Office support staff", "Ask about support staff on WhatsApp"),
        "</div>",
      ].join("\n          ") },
      review("nikki"),
    ],
  ],
  faqH2: "Office cleaning questions, answered",
  faqs: [
    ["Can you clean our office before or after working hours?", "Yes. Bee Thrive schedules office cleaning before or after your working hours, six days a week, so the work never gets in the way of your team. Tell us your opening times when you ask for a quote and we will plan the visits around them, with a supervisor checking each one."],
    ["Do you offer monthly or yearly office cleaning contracts?", "Yes. Bee Thrive offers hourly, monthly and yearly plans for offices, with better rates for regular visits than for one-off cleans. Every visit on a plan includes the free on-site supervisor, and the scope and quote are agreed with you before the first visit."],
    ["Is supervision included in an office cleaning contract?", "Yes. A supervisor checks the work on every Bee Thrive visit at no extra cost, whether you book a single clean or a yearly plan. That check is how the standard stays consistent over months, not just in the first week, and it is never added to your quote as an extra."],
    ["Can you deep clean the office before a client visit?", "Yes. Alongside regular plans, Bee Thrive books one-off office deep cleans, for example before a client visit, a launch or a move. Tell us the date and what needs attention, and we will confirm the scope and quote before we start. The supervisor check is included."],
    ["Do you clean offices in Sharjah?", "Yes. Bee Thrive cleans offices in Sharjah as well as Dubai, before or after working hours, with the same free supervision and 24-hour re-clean promise. Send your office location and size on WhatsApp and we will confirm and prepare your quote."],
  ],
  related: ["commercial", "post", "deep", "sharjah"],
  shareH2: "Know an office manager who needs a reliable cleaner?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive cleans offices in Dubai before or after working hours, and a supervisor checks every visit.",
  finalH2: "Book office cleaning that is checked every visit",
  finalP: "Send your office size, area and working hours on WhatsApp for a free quote.",
});

/* ================= 9.4 Holiday homes ================= */
pages.push({
  key: "holiday", file: "holiday-home-cleaning-dubai.html", slug: "holiday-home-cleaning-dubai",
  title: "Airbnb & Holiday Home Cleaning in Dubai | Bee Thrive",
  meta: "Guest-ready Airbnb and holiday home turnovers in Dubai and Sharjah, with optional linen and towels and a free supervisor check on every clean.",
  ogTitle: "Airbnb and holiday home cleaning in Dubai",
  ogDesc: "Guest-ready turnovers, each checked by a free supervisor. Optional linen and towels.",
  ogImg: "og-holiday-home-v2.jpg", ogHeadline: "Airbnb and holiday home turnovers, checked every stay",
  h1: "Airbnb and holiday home cleaning in Dubai, checked between every stay", crumb: "Airbnb and holiday home cleaning", page: "holiday home page",
  service: "Airbnb and holiday home cleaning", formHref: "/?service=Airbnb%20and%20holiday%20home%20cleaning#contact",
  heroImg: "work-restroom-2.jpg", w: 958, h: 1280,
  heroAlt: "A spotless washroom with polished tiles and fittings after a Bee Thrive clean",
  eyebrow: "Airbnb and holiday homes · Dubai and Sharjah",
  lead: "Bee Thrive cleans Airbnb apartments and holiday homes in Dubai and Sharjah between every checkout and check-in, so each guest walks into a guest-ready home. An optional linen and towel service is available, and a free on-site supervisor checks every turnover. Holiday-home operators including MSH Holiday Homes and Crescent Holiday Homes are among Bee Thrive's clients.",
  ctaLabel: "Get my holiday home quote on WhatsApp", ctaShort: "Turnover quote",
  serviceName: "Airbnb and holiday home cleaning", serviceType: "Holiday home and Airbnb turnover cleaning",
  shells: [
    [
      { id: "clients", from: "holiday home clients", h2: "Who uses Bee Thrive for holiday home cleaning?", html: [
        paras("Bee Thrive works with Airbnb hosts and with holiday-home operators that manage several properties. Holiday-home clients include:"),
        clientGrid("holiday"),
      ].join("\n          ") },
      { id: "turnover", from: "what is turnover cleaning", h2: "What is turnover cleaning for a holiday home?", html:
        paras("A turnover is the clean between one guest checking out and the next checking in. It resets the home so it looks and feels ready for the new arrival. Bee Thrive turnovers are fast resets between stays, and a supervisor checks each one, so the standard does not depend on who happened to clean that day.") },
    ],
    [{ id: "included", from: "what is included", h2: "What is included in a Bee Thrive turnover?", html: [
      ticks([
        "Guest-ready cleaning between every checkout and check-in",
        "An optional linen and towel service",
        "A supervisor check on every turnover, at no extra cost",
        "A vetted team that arrives with professional-grade equipment and materials",
        "A quote based on the size of the home, its amenities, linen and turnover needs",
        "Tell us within 24 hours if anything needs another pass and we come back free",
      ]),
      paras("Every property is set up differently. Share your own turnover checklist, if you have one, and we will confirm what your quote covers before the first clean."),
      smallWa("Turnover cleaning between guests", "Ask about turnovers on WhatsApp"),
    ].join("\n          ") }],
    [{ id: "deep-cleans", from: "turnovers and deep cleans", h2: "Turnovers and deep cleans: how often does a holiday home need each?", html:
      paras('Turnovers keep each stay guest-ready, but a quick reset between guests is not the same as a top-to-bottom clean. Short-stay homes see a lot of use, so it is worth booking a full <a href="/deep-cleaning-dubai">deep clean</a> from time to time, for example between busy seasons or when a property has a gap in bookings. Ask us to plan both together.') }],
    [{ id: "how", from: "how it works", h2: "How does holiday home cleaning work with Bee Thrive?", mid: "Send your property size and turnover pattern for a clear quote.", steps: [
      ["Share your property", "Tell us the size, location and amenities of each home, and how often it turns over."],
      ["Agree the quote and linen", "Choose whether you want the linen and towel service. Your quote is agreed before the first turnover."],
      ["Send checkout and check-in times", "Share the timings for each stay and we confirm the slot for the clean."],
      ["Supervised turnover", "The team resets the home, a supervisor checks it, and you have 24 hours to ask for a free re-clean."],
    ] }],
    [
      { id: "quote", from: "how quotes work", h2: "How is a holiday home cleaning quote worked out?", html:
        paras("Four things shape the quote: the size of the home, its amenities, whether you want linen and towels, and your turnover needs, meaning how often the home changes over. If you manage several homes, list them in one message and we will quote for each. You agree the quote before we start, with no hidden fees.") },
      { id: "tips", from: "host tips", h2: "Host tips for smoother turnovers", html: prep([
        ["Share a property guide.", "How to get in, where to park and any building rules, in one message, saves time on the day."],
        ["Keep a spare set of linen.", "Whether you use the linen and towel service or your own, a spare set in the home makes tight turnovers easier."],
        ["Mark owner-only areas.", "Lock or label any cupboard the team should leave alone."],
        ["Tell us about late checkouts early.", "A quick message lets us confirm a new slot."],
        ["Check after each turnover.", "You have 24 hours to flag anything, and we come back free."],
      ]) },
      review("nikki"),
    ],
  ],
  faqH2: "Holiday home cleaning questions, answered",
  faqs: [
    ["Do you clean Airbnb apartments and holiday homes in Dubai?", "Yes. Bee Thrive provides guest-ready cleaning and turnovers for Airbnb apartments and holiday homes in Dubai and Sharjah. Every turnover includes a supervisor check at no extra cost, and holiday-home operators including MSH Holiday Homes, Crescent Holiday Homes and Nalada Holiday Homes are among Bee Thrive's clients."],
    ["Can you clean between guest checkout and check-in?", "Yes. The window between checkout and check-in is exactly when Bee Thrive turnovers are booked. Send the timings for each stay and we will confirm the slot for the clean. We confirm each booking individually rather than promising a fixed turnaround time, so you always know what to expect."],
    ["Do you provide linen and towels?", "Bee Thrive offers an optional linen and towel service for holiday homes. Tell us how many beds and bathrooms each property has when you ask for a quote, and we will include the linen service in it. You can also keep using your own linen if you prefer."],
    ["Do you work with operators that manage several properties?", "Yes. Bee Thrive's clients include holiday-home operators such as MSH Holiday Homes, Crescent Holiday Homes, Nalada Holiday Homes and Loft and Keys Holiday Homes. Send the list of properties and their locations, and we will quote for each one and agree the scheduling with you."],
    ["Is every turnover checked by a supervisor?", "Yes. A supervisor checks the work on every Bee Thrive clean, including each holiday-home turnover, at no extra cost. If you spot something after the clean, tell us within 24 hours and we come back to re-clean it free, so every guest arrives to the same standard."],
  ],
  related: ["deep", "home", "move", "sharjah"],
  shareH2: "Know a host who needs a reliable turnover team?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive does Airbnb and holiday home turnovers in Dubai, and a supervisor checks every clean.",
  finalH2: "Guest-ready, every stay",
  finalP: "Send your property size, area and turnover pattern on WhatsApp for a free quote.",
});

/* ================= 9.5 Post-construction ================= */
pages.push({
  key: "post", file: "post-construction-cleaning-dubai.html", slug: "post-construction-cleaning-dubai",
  title: "Post-Construction Cleaning Dubai & Sharjah | Bee Thrive",
  meta: "Post-construction cleaning for new villas and commercial buildings in Dubai and Sharjah, planned around your handover, with a free supervisor on site.",
  ogTitle: "Post-construction cleaning in Dubai for villas and buildings",
  ogDesc: "Construction dust cleared to handover ready, with a free supervisor on site. Free WhatsApp quote.",
  ogImg: "og-post-construction-v1.jpg", ogHeadline: "Post-construction cleaning for villas and buildings",
  h1: "Post-construction cleaning in Dubai for villas and commercial buildings", crumb: "Post-construction cleaning", page: "post-construction page",
  service: "Post-construction turnover", formHref: "/#contact",
  heroImg: "work-windows-2.jpg", w: 1280, h: 958,
  heroAlt: "A Bee Thrive professional cleaning high office windows above a Deira street in Dubai",
  eyebrow: "Post-construction cleaning · Villas and commercial buildings",
  lead: "Bee Thrive post-construction cleaning clears construction dust from new and renovated villas and commercial buildings in Dubai and Sharjah, leaving them move-in or handover ready. Commercial work is planned around your project timeline, a free on-site supervisor checks the finish, and every quote is based on size, site condition and scope.",
  ctaLabel: "Get my post-construction quote on WhatsApp", ctaShort: "Post-build quote",
  serviceName: "Post-construction cleaning", serviceType: "Post-construction cleaning for villas and commercial buildings",
  shells: [
    [{ id: "what-is", from: "what is post-construction cleaning", h2: "What is post-construction cleaning?", html:
      paras("Post-construction cleaning, sometimes called a builders' clean or after-renovation cleaning, is the clean that happens once the building work is finished. Construction and fit-out leave fine dust on surfaces and in corners throughout a building. The aim is to turn a finished site into a space people can move into, open or hand over.") }],
    [
      { id: "villas", from: "post-construction villas", h2: "Post-construction villa cleaning", html: [
        paras("For new or renovated villas across Dubai and Sharjah, Bee Thrive clears construction dust to a move-in ready finish. The best time to book is once the builders have finished and before the furniture goes in, so the team can reach every room."),
        ticks(["Construction dust cleared to move-in ready", "For villas across Dubai and Sharjah", "Supervisor check included", "Quote based on size, site condition and scope"]),
        smallWa("Post-construction villa turnover", "Ask about a villa on WhatsApp"),
      ].join("\n          ") },
      { id: "commercial", from: "post-construction commercial", h2: "Post-construction cleaning for commercial buildings", html: [
        paras("For new commercial buildings, Bee Thrive provides handover-ready cleaning after fit-out or construction, ahead of handover or opening. The work is planned around your project timeline, so the clean fits between the last trades leaving and your handover date."),
        ticks(["Handover-ready cleaning for new commercial buildings", "Planned around your project timeline", "Supervisor check included", "Quote based on building size, site condition and project scope", "Window and surface detailing for projects and handovers"]),
        smallWa("Post-construction commercial turnover", "Ask about a commercial project on WhatsApp"),
      ].join("\n          ") },
    ],
    [
      { id: "when", from: "when to book", h2: "When should post-construction cleaning be done?", html:
        paras("Book it for the point when construction is complete but before the space is furnished or occupied. Cleaning earlier means trades may add fresh dust afterwards, and cleaning later means working around furniture, fixtures and people. For commercial projects, tell us your handover or opening date and we will plan the clean around it.") },
      { id: "which", from: "post-construction vs deep cleaning", h2: "Post-construction cleaning or deep cleaning: which do I need?", html:
        paras('If the dust comes from building, fit-out or renovation work, you need post-construction cleaning, which is planned around the site condition and project scope. If the home is lived in and simply needs a thorough reset, a <a href="/deep-cleaning-dubai">deep clean</a> is the right choice. Moving into a finished home? See <a href="/move-in-move-out-cleaning-dubai">move-in cleaning</a>. Not sure? Send a few photos on WhatsApp and we will suggest the right service.') },
    ],
    [{ id: "how", from: "how it works", h2: "How a supervised post-construction clean works", mid: "Share the site size and handover date, and we will send a clear quote.", steps: [
      ["Share the site details", "Send the building type, size, location and your target date, with photos if you have them."],
      ["Agree scope and quote", "We confirm the scope against the site condition, and the quote is agreed before we start."],
      ["Clean and check", "The team works through the building, and a supervisor checks the finish on site."],
      ["Hand over", "Check the result before handover. If anything needs another pass, tell us within 24 hours and we come back free."],
    ] }],
    [
      { id: "quote", from: "how quotes work", h2: "How is a post-construction quote worked out?", html:
        paras("Three things set the quote: the size of the villa or building, the condition of the site after the works, and the project scope. A site with dust across several floors takes more work than a single-room fit-out. You agree the quote before the team starts, with no hidden fees and supervision included free.") },
      { id: "site-ready", from: "getting the site ready", h2: "Getting the site ready for cleaning", html: prep([
        ["Confirm the trades are finished.", "Snagging and touch-ups create new dust, so book the clean after the last works where you can."],
        ["Arrange site access.", "Share gate, security and parking arrangements, and any site rules the team needs to follow."],
        ["Make sure water and power are on.", "The team needs both to clean properly."],
        ["Flag sensitive finishes.", "New stone, wood or coated surfaces are worth mentioning before the clean."],
        ["Share the handover date.", "It lets us plan the work around your programme."],
      ]) },
      review("huda"),
    ],
  ],
  faqH2: "Post-construction cleaning questions, answered",
  faqs: [
    ["What does a post-construction clean include?", "A Bee Thrive post-construction clean clears construction dust to a move-in or handover-ready finish, for villas and for new commercial buildings. The exact scope depends on the site, so it is confirmed in your quote before work starts, and a supervisor checks the finish on site at no extra cost."],
    ["Can the clean be planned around our handover date?", "Yes. Commercial post-construction cleaning is planned around your project timeline, after fit-out or construction and ahead of handover or opening. Share the handover date and any site constraints when you ask for a quote, and we will confirm a plan that fits them before the work starts."],
    ["Do you clean new villas after the builders leave?", "Yes. Bee Thrive clears construction dust from new and renovated villas across Dubai and Sharjah so they are move-in ready. The ideal time is once the builders have finished and before the furniture goes in. Your quote is based on the villa's size, the site condition and the scope."],
    ["Do you offer post-construction cleaning outside Dubai?", "Bee Thrive's post-construction cleaning covers villas and commercial buildings across Dubai and Sharjah. Beyond those two emirates, Bee Thrive takes on projects and events across all Emirates, with team size and timing planned around you. Send the location and project details on WhatsApp and we will confirm."],
  ],
  related: ["move", "commercial", "office", "sharjah"],
  shareH2: "Know a contractor or a new villa owner?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive does post-construction cleaning for new villas and commercial buildings in Dubai, with a free supervisor on site.",
  finalH2: "Building finished? Get it handover ready.",
  finalP: "Send the site size, location and handover date on WhatsApp for a free quote.",
});

/* ================= 9.6 Home cleaning ================= */
const homeCards = [
  ["Normal cleaning for flats and villas", "Regular visits that keep your home consistently fresh. Minimum 2 hours.", "Normal home cleaning"],
  ["Maid services", "Household help, booked regularly or as a one-off.", "Maid services"],
  ["Laundry and ironing", "Handled in your home, fresh and neatly pressed.", "Laundry and ironing"],
  ["Carpet cleaning", "Lifts stains, dust and allergens for a brighter finish.", "Carpet cleaning"],
];
const homeCardsHtml = `<div class="page-cards">
${homeCards.map(([n, t, s]) => `            <article class="page-card">
              <h3>${esc(n)}</h3>
              <p>${esc(t)}</p>
              <a class="btn btn-sm btn-wa-soft" data-wa-link data-wa-service="${s}" href="/#contact">${WA_ICO} Ask on WhatsApp<span class="visually-hidden"> about ${esc(n.charAt(0).toLowerCase() + n.slice(1))}</span></a>
            </article>`).join("\n")}
          </div>`;
const plansTable = `<div class="price-table-wrap page-table">
            <table class="price-table">
              <caption class="visually-hidden">Bee Thrive home cleaning plans</caption>
              <thead>
                <tr><th scope="col">Plan</th><th scope="col">Good for</th></tr>
              </thead>
              <tbody>
                <tr><td data-label="Plan">One-off visit</td><td data-label="Good for">A single clean, for example before guests arrive</td></tr>
                <tr><td data-label="Plan">Hourly</td><td data-label="Good for">Booking the time you need, from a 2-hour minimum</td></tr>
                <tr><td data-label="Plan">Monthly</td><td data-label="Good for">A regular rhythm of visits, with better rates than one-off bookings</td></tr>
                <tr><td data-label="Plan">Yearly</td><td data-label="Good for">The same routine all year round, with better rates for regular visits</td></tr>
              </tbody>
            </table>
          </div>`;
pages.push({
  key: "home", file: "home-cleaning-dubai.html", slug: "home-cleaning-dubai",
  title: "Home Cleaning & Maid Services in Dubai | Bee Thrive",
  meta: "Home cleaning and maid services for apartments and villas in Dubai and Sharjah. One-off visits or regular plans, with a free supervisor every visit.",
  ogTitle: "Home cleaning and maid services in Dubai, supervised",
  ogDesc: "A free supervisor checks every home visit. From a 2-hour minimum. Free quote on WhatsApp.",
  ogImg: "og-home-cleaning-v2.jpg", ogHeadline: "Home cleaning and maid services, supervised",
  h1: "Home cleaning and maid services in Dubai, supervised every visit", crumb: "Home cleaning and maid services", page: "home cleaning page",
  service: "Normal home cleaning", formHref: "/?service=Normal%20home%20cleaning#contact",
  heroImg: "showreel-windows-poster.jpg", w: 540, h: 960,
  heroAlt: "A Bee Thrive team member carefully handling a framed picture while cleaning a room",
  eyebrow: "Home cleaning and maid services · Dubai and Sharjah",
  lead: "Bee Thrive home cleaning keeps apartments and villas in Dubai and Sharjah consistently fresh, visit after visit. Book a one-off clean or an hourly, monthly or yearly plan, six days a week, from a 2-hour minimum. A vetted team arrives fully equipped, and a free on-site supervisor checks the work every time.",
  ctaLabel: "Get my home cleaning quote on WhatsApp", ctaShort: "Home clean quote",
  serviceName: "Home cleaning and maid services", serviceType: "Regular home cleaning and maid services",
  shells: [
    [{ id: "services", from: "home cleaning services", h2: "What home cleaning services does Bee Thrive offer?", html: [
      paras("Bee Thrive's home services in Dubai and Sharjah cover normal cleaning for flats and villas from a 2-hour minimum, maid services booked regularly or as a one-off, laundry and ironing handled in your home, and carpet cleaning that lifts stains, dust and allergens. A free supervisor checks the work on every visit."),
      homeCardsHtml,
    ].join("\n          ") }],
    [
      { id: "included", from: "what is included", h2: "What is included in a regular home cleaning visit?", html: [
        paras("A regular visit covers the everyday cleaning that keeps your home comfortable to live in. Because every household is different, you tell us the rooms and tasks that matter most, and the visit length, materials and schedule are agreed in your quote. Every visit includes:"),
        ticks([
          "A vetted, trained team",
          "Professional-grade equipment and materials, or your own supplies if you prefer",
          "A free supervisor check, so the standard stays the same visit after visit",
          "A minimum visit of 2 hours",
          "The option to add laundry and ironing",
          "The 24-hour re-clean promise if anything is missed",
        ]),
      ].join("\n          ") },
      { id: "plans", from: "plans", h2: "Hourly, monthly or yearly: which home cleaning plan suits you?", html: [
        paras("Choose a one-off visit for a single clean, or an hourly, monthly or yearly plan for regular help, six days a week. Hourly bookings start from a 2-hour minimum, and monthly and yearly plans get better rates than one-off visits. Every plan includes the free supervisor check and the 24-hour re-clean promise."),
        plansTable,
      ].join("\n          ") },
    ],
    [{ id: "maid-vs-deep", from: "maid service vs deep clean", h2: "Maid service or deep clean: what is the difference?", html:
      paras('A maid service or regular cleaning visit looks after the day-to-day: the rooms you live in, kept tidy and fresh on a schedule that suits you. A <a href="/deep-cleaning-dubai">deep clean</a> is a one-off, top-to-bottom reset that reaches the corners regular cleaning misses. A good pattern is to start with a deep clean, then keep it up with regular visits.') }],
    [{ id: "how", from: "how it works", h2: "How to book regular home cleaning", mid: "Tell us your home size and how often you would like a visit.", steps: [
      ["Tell us about your home", "Apartment or villa, the area, and how often you would like a visit."],
      ["Agree your plan", "Choose one-off, hourly, monthly or yearly visits. Your quote is agreed before the first visit."],
      ["Supervised visits", "A vetted team arrives on time and fully equipped, and a supervisor checks the work."],
      ["Adjust as you go", "Need more time, laundry or a deep clean? Tell us on WhatsApp and we will update your plan."],
    ] }],
    [
      { id: "cost", from: "cost", h2: "How much does home cleaning cost in Dubai?", html:
        paras("Bee Thrive quotes each home rather than publishing an hourly rate. Normal cleaning is quoted on visit length, materials and schedule, with a 2-hour minimum, and regular plans get better rates than one-off visits. Using your own supplies adjusts the quote. You agree the quote before the first visit, with no hidden fees and supervision included.") },
      { id: "tips", from: "getting the most from each visit", h2: "Getting the most from each visit", html: prep([
        ["Agree a priority list.", "A short list of must-do rooms or tasks keeps every visit focused."],
        ["Keep supplies in one place.", "If the team uses your products, a single cupboard makes them easy to find."],
        ["Tidy away clutter.", "Clear surfaces let the team spend the visit cleaning, not moving things."],
        ["Mention pets and delicate items.", "It helps the team plan the visit around your household."],
        ["Flag changes early.", "Guests coming, or a room that needs extra time? Tell us before the visit."],
      ]) },
      review("huda"),
    ],
  ],
  faqH2: "Home cleaning questions, answered",
  faqs: [
    ["What is the minimum booking for home cleaning?", "Normal home cleaning with Bee Thrive has a minimum visit of 2 hours. Longer visits, extra rooms or add-ons such as laundry and ironing are included in your quote, which you agree before the first visit. Regular hourly, monthly or yearly plans get better rates than one-off visits."],
    ["Do I need to provide cleaning materials?", "No. Bee Thrive teams arrive fully equipped with professional-grade equipment and materials. If you would rather the team used your own products, tell us when you book and we will use them and adjust your quote to match. Either way, a supervisor checks the work on every visit."],
    ["Are Bee Thrive cleaners vetted and trained?", "Yes. Every Bee Thrive team member is screened and trained before working in clients' homes, and a supervisor checks the work on every visit. That means you are not relying on one person's standards, because the supervisor's check is the same whichever team member cleans your home."],
    ["Can the cleaner also do laundry and ironing?", "Yes. Bee Thrive offers laundry and ironing handled in your home, leaving clothes fresh and neatly pressed. You can ask for it with a regular cleaning visit or on its own. Mention it when you ask for a quote so the visit length and your quote allow for it."],
    ["Do you offer home cleaning in Sharjah?", "Yes. Bee Thrive offers normal and deep cleaning for homes in Sharjah as well as Dubai, with the same free supervisor on every visit and the same 24-hour re-clean promise. Send your area and preferred schedule on WhatsApp and we will confirm and prepare your quote."],
  ],
  related: ["deep", "holiday", "move", "sharjah"],
  shareH2: "Know someone who needs reliable help at home?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive does home cleaning and maid services in Dubai, and a supervisor checks every visit.",
  finalH2: "A home that stays fresh, visit after visit",
  finalP: "Send your home size, area and preferred schedule on WhatsApp for a free quote.",
});

/* ================= 9.7 Commercial ================= */
const bizTypes = [
  ["shops", "Shops and retail", "Bee Thrive cleans shops and retail spaces before or after trading hours, so your store looks its best when the doors open and customers never have to step around a cleaner. Tell us your opening times and we will plan around them.", "Shops and retail cleaning"],
  ["clinics-cafes", "Clinics and cafes", "Bee Thrive provides hygiene-focused cleaning for clinics and cafes. If your premises follow a particular cleaning protocol or product list, share it with your enquiry and we will confirm the scope in your quote.", "Clinics and cafes cleaning"],
  ["restaurants", "Restaurant and cafeteria deep cleaning", "Restaurants and cafeterias are deep cleaned after hours, with full degreasing and sanitising, so the space is ready for the next service.", "Restaurant and cafeteria deep cleaning"],
  ["warehouses", "Warehouses and logistics facilities", "Bee Thrive cleans warehouses and storage, logistics and industrial facilities. Tell us the size of the facility, what is stored and when the work can happen, and we will quote for a one-off clean or a regular plan.", "Warehouse cleaning"],
  ["windows", "Window and glass cleaning", "Bee Thrive provides window and surface detailing for commercial spaces, projects and handovers. Ask for it alongside your commercial quote.", "Window and glass cleaning"],
];
pages.push({
  key: "commercial", file: "commercial-cleaning-dubai.html", slug: "commercial-cleaning-dubai",
  title: "Commercial Cleaning in Dubai & Sharjah | Bee Thrive",
  meta: "Commercial cleaning in Dubai and Sharjah for shops, clinics, cafes, restaurants and warehouses, planned around your hours, with a free supervisor.",
  ogTitle: "Commercial cleaning in Dubai, around your trading hours",
  ogDesc: "Shops, clinics, cafes, restaurants and warehouses. A free supervisor on every job.",
  ogImg: "og-commercial-cleaning-v2.jpg", ogHeadline: "Commercial cleaning around your trading hours",
  h1: "Commercial cleaning in Dubai for shops, clinics, cafes, restaurants and warehouses", crumb: "Commercial cleaning", page: "commercial cleaning page",
  service: "Commercial cleaning", formHref: "/#contact",
  heroImg: "showreel-office-poster.jpg", w: 540, h: 960,
  heroAlt: "A freshly wiped office desk with a plant and calculator after a Bee Thrive clean",
  eyebrow: "Commercial cleaning · Dubai and Sharjah",
  lead: 'Bee Thrive commercial cleaning looks after shops, clinics, cafes, restaurants and warehouses in Dubai and Sharjah, planned around your opening hours so customers are not disturbed. Every job includes a free on-site supervisor, and your quote is agreed before we start.',
  ctaLabel: "Get my commercial cleaning quote on WhatsApp", ctaShort: "Commercial quote",
  serviceName: "Commercial cleaning", serviceType: "Cleaning for shops, clinics, cafes, restaurants and warehouses",
  shells: [
    [{ id: "businesses", from: "businesses we clean", h2: "Which businesses does Bee Thrive clean?", html: bizTypes.map(([id, h, t, s]) => [
      `<div class="page-sub" id="${id}" data-wa-from="${esc(h.toLowerCase())}">`,
      `  <h3>${esc(h)}</h3>`,
      "  " + paras(esc(t)),
      "  " + smallWa(s, "Ask on WhatsApp", "about " + s.charAt(0).toLowerCase() + s.slice(1)),
      "</div>",
    ].join("\n          ")).join("\n          ") + '\n          <p class="page-note">Looking after an office? See our dedicated <a href="/office-cleaning-dubai">office cleaning page</a>.</p>' }],
    [{ id: "includes", from: "what is included", h2: "What every Bee Thrive commercial clean includes", html: ticks([
      "Cleaning planned around your trading or opening hours",
      "A vetted, trained team with professional-grade equipment and materials",
      "A free supervisor check on every job",
      "A quote agreed before we start, with no hidden fees",
      "Hourly, monthly or yearly plans, six days a week, with better rates for regular visits",
      "Tell us within 24 hours if anything needs another pass and we return free",
    ]) }],
    [{ id: "restaurant-kitchens", from: "restaurant kitchens", h2: "Can you deep clean a restaurant kitchen after closing time?", html:
      paras("Yes. Bee Thrive restaurant and cafeteria deep cleaning is done after hours, with full degreasing and sanitising, so the space is ready for the next service. Tell us your closing time, the size of the space and any areas you want prioritised, and we will confirm the scope and quote before the night of the clean.") }],
    [{ id: "how", from: "how it works", h2: "How a commercial clean works", mid: "Share your business type and opening hours for a clear quote.", steps: [
      ["Tell us about the premises", "Business type, size, location and your opening hours."],
      ["Agree scope and quote", "We confirm what is covered and the quote before anything starts."],
      ["Supervised clean", "A vetted team works around your hours and a supervisor checks the result."],
      ["Stay on standard", "Tell us within 24 hours if anything needs another pass and we come back free."],
    ] }],
    [
      { id: "quote", from: "how quotes work", h2: "How is a commercial cleaning quote worked out?", html:
        paras("The quote is based on the size and condition of your premises, the scope of work, and your schedule, including whether the work happens before opening, after closing or on a regular plan. Regular plans get better rates. You agree the quote before we start, with no hidden fees, and supervision is always included free.") },
      review("atta"),
    ],
  ],
  faqH2: "Commercial cleaning questions, answered",
  faqs: [
    ["Do you clean shops before or after trading hours?", "Yes. Bee Thrive cleans shops and retail spaces before or after trading hours, so the store is ready when customers arrive and the work never gets in their way. Share your opening times when you ask for a quote and we will plan the visits around them, six days a week."],
    ["Do you clean clinics and cafes?", "Yes. Bee Thrive provides hygiene-focused cleaning for clinics and cafes in Dubai and Sharjah. If your premises follow a particular cleaning protocol or product list, send it with your enquiry and we will confirm what the quote covers before we start. A supervisor checks every job at no extra cost."],
    ["Do you clean warehouses and logistics facilities?", "Yes. Bee Thrive cleans warehouses and storage, logistics and industrial facilities. Tell us the size of the facility, what is stored and when the work can happen, and we will quote for a one-off clean or a regular plan. A supervisor checks every job at no extra cost."],
    ["Can we set up a regular commercial cleaning plan?", "Yes. Bee Thrive offers hourly, monthly and yearly plans for businesses, six days a week, with better rates for regular visits than for one-off cleans. Every visit includes the free on-site supervisor, and the scope and schedule are agreed with you before the first visit."],
    ["Do you offer commercial cleaning in Sharjah?", "Yes. Bee Thrive cleans businesses in Sharjah as well as Dubai, with the same free supervisor and 24-hour re-clean promise. Send your location and the type of premises on WhatsApp so we can confirm the details and prepare your quote, agreed before we start."],
  ],
  related: ["office", "post", "deep", "sharjah"],
  shareH2: "Know a business owner who needs a dependable cleaner?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive cleans shops, clinics, cafes, restaurants and warehouses in Dubai, with a free supervisor on every job.",
  finalH2: "Spotless premises, planned around your hours",
  finalP: "Send your business type, size and opening hours on WhatsApp for a free quote.",
});

/* ================= 9.8 Sharjah ================= */
pages.push({
  key: "sharjah", file: "cleaning-services-sharjah.html", slug: "cleaning-services-sharjah",
  title: "Cleaning Services in Sharjah, Homes & Offices | Bee Thrive",
  meta: "Licensed cleaning for homes and businesses in Sharjah: deep, move-out, home, office and post-construction cleaning, with a free supervisor on every job.",
  ogTitle: "Cleaning services in Sharjah, checked by a supervisor",
  ogDesc: "Homes, offices and holiday homes in Sharjah. A free supervisor on every job. Free WhatsApp quote.",
  ogImg: "og-sharjah-v1.jpg", ogHeadline: "Cleaning services in Sharjah, supervised",
  h1: "Cleaning services in Sharjah for homes and businesses", crumb: "Cleaning services in Sharjah", page: "Sharjah page",
  area: "Sharjah", formHref: "/?area=Sharjah#contact",
  heroImg: "work-office.jpg", w: 1280, h: 958,
  heroAlt: "A bright, freshly cleaned office after a Bee Thrive visit",
  eyebrow: "Sharjah · Homes and businesses",
  lead: "Bee Thrive Cleaning Services cleans homes, offices and holiday homes in Sharjah as well as Dubai. It is a licensed Dubai company, Trade Licence 1416022, and every Sharjah job gets the same free on-site supervisor and 24-hour re-clean promise. Send your area and the service you need on WhatsApp for a free quote.",
  ctaLabel: "Get my Sharjah quote on WhatsApp", ctaShort: "Sharjah quote",
  serviceName: "Cleaning services in Sharjah", serviceType: "Home and business cleaning in Sharjah",
  shells: [
    [{ id: "services", from: "Sharjah services", h2: "Which cleaning services are available in Sharjah?", html: [
      paras("These services are available for Sharjah homes and businesses. Each links to a page with the full details."),
      relatedList(["deep", "home", "move", "post", "office", "holiday"], { deep: "Deep cleaning" }),
      paras('Shops, clinics, cafes, restaurants and warehouses in Sharjah are covered too. See <a href="/commercial-cleaning-dubai">commercial cleaning</a> for what that service includes, then send your location and the type of premises so we can prepare your quote. Not sure whether we cover your part of Sharjah? Send your area on WhatsApp and we will confirm.'),
      "<!-- OWNER: add confirmed Sharjah neighbourhoods here -->",
    ].join("\n          ") }],
    [{ id: "supervisor", from: "supervision in Sharjah", h2: "Is the free supervisor included for jobs in Sharjah?", html:
      paras("Yes. The Bee Thrive standard is the same on both sides of the emirate border. Every job in Sharjah follows the same three steps as in Dubai: a vetted team cleans, a supervisor checks, and you approve the result. If anything is not right, tell us within 24 hours and we come back to re-clean it, free.") }],
    [{ id: "sharjah-quote", from: "Sharjah quotes", h2: "How is a Sharjah cleaning quote worked out?", html:
      paras("Bee Thrive quotes every job individually, based on the size and condition of the space, the scope of work and your schedule. Tell us your Sharjah area when you ask, and everything is included in the quote you agree before we start. There are no hidden fees, and nothing is added on the day.") }],
    [{ id: "how", from: "how it works", h2: "How do I book a cleaner in Sharjah?", mid: "Send your Sharjah area and the service you need.", steps: [
      ["Message us", "Send your Sharjah area, the type of property and the service you need, on WhatsApp, by phone or by email."],
      ["Agree your quote", "We confirm the scope and quote before anything starts."],
      ["Supervised clean", "A vetted, fully equipped team does the work and a supervisor checks it."],
      ["Check the result", "You have 24 hours to ask for a free re-clean of any area."],
    ] }],
    [
      { id: "what-you-get", from: "what you get", h2: "What you get with Bee Thrive in Sharjah", html: ticks([
        "A licensed company: Trade Licence No. 1416022, Dubai Department of Economy and Tourism",
        "Established in October 2024, with an office in Deira, Dubai",
        "A free on-site supervisor on every job",
        "A screened, trained and fully equipped team",
        "A quote agreed before we start, with no hidden fees",
        "One-off visits, or hourly, monthly and yearly plans, six days a week",
        "The 24-hour re-clean promise",
      ]) },
      review("atta"),
    ],
  ],
  faqH2: "Sharjah cleaning questions, answered",
  faqs: [
    ["Do you provide cleaning services in Sharjah?", "Yes. Bee Thrive Cleaning Services cleans homes, offices and holiday homes in Sharjah as well as Dubai. The company holds Trade Licence No. 1416022 from the Dubai Department of Economy and Tourism, and every Sharjah job includes a free on-site supervisor. Send your area on WhatsApp and we will confirm."],
    ["Do you offer deep cleaning and move-out cleaning in Sharjah?", "Yes. Deep cleaning and move-in and move-out cleaning are available for Sharjah apartments and villas, with the same supervisor check and 24-hour re-clean promise as in Dubai. Your quote is based on the property's size, its condition and the scope or handover requirements, and is agreed before we start."],
    ["Do you clean offices in Sharjah?", "Yes. Bee Thrive cleans offices in Sharjah before or after working hours, on one-off visits or hourly, monthly or yearly plans, six days a week. A supervisor checks every visit at no extra cost. Share your office size, location and working hours on WhatsApp for a free quote."],
    ["Which areas of Sharjah do you cover?", "Bee Thrive serves homes and businesses in Sharjah and confirms each address when you ask for a quote. Send your community or street name on WhatsApp with the service you need, and we will let you know whether we can cover it and agree a time that suits you."],
    ["Can you do post-construction cleaning in Sharjah?", "Yes. Bee Thrive's post-construction cleaning covers new and renovated villas and new commercial buildings across Dubai and Sharjah, leaving them move-in or handover ready. Commercial work is planned around your project timeline, and the quote is based on size, site condition and scope."],
  ],
  related: ["about"],
  shareH2: "Know someone in Sharjah who needs a cleaner?", shareP: SHARE_P,
  shareText: "Thought this might help: Bee Thrive cleans homes and businesses in Sharjah, and a supervisor checks every job.",
  finalH2: "Book a supervised clean in Sharjah",
  finalP: "Send your Sharjah area and the service you need on WhatsApp for a free quote.",
});

/* ================= 9.9 About ================= */
const facts = [
  ["Brand", "Bee Thrive Cleaning Services, also known as Bee Thrive."],
  ["Legal entity", "Bee Thrive Cleaning Services is a brand of Digital Thrive Cleaning Services Co LLC."],
  ["Licence", "Trade Licence No. 1416022, issued by the Dubai Department of Economy and Tourism."],
  ["Established", "October 2024."],
  ["Office", "Office #201, Al Qasimi Building, Salahuddin Street, Deira, Dubai, United Arab Emirates."],
  ["Service area", "Homes and businesses in Dubai and Sharjah, plus projects and events across all Emirates."],
  ["Services", "Home cleaning and maid services, deep cleaning, move-in and move-out cleaning, post-construction cleaning for villas and commercial buildings, office cleaning, Airbnb and holiday home cleaning, and commercial cleaning for shops, clinics, cafes, restaurants and warehouses. Also offered: window and glass cleaning, packing and unpacking, office support staff, and team cleaning for projects and events across all Emirates."],
  ["Supervision", "A free on-site supervisor checks the work on every Bee Thrive job."],
  ["Re-clean promise", "If any area is not right, tell Bee Thrive within 24 hours and the team returns to re-clean it free."],
  ["Pricing", "Quote-based. Bee Thrive agrees each quote before work starts, with no hidden fees. Normal cleaning has a 2-hour minimum."],
  ["Plans", "One-off visits, or hourly, monthly and yearly plans, six days a week."],
];
const factsHtml = `<dl class="facts-list">
${facts.map(([t, d]) => `            <div class="facts-row"><dt>${t}</dt><dd>${esc(d)}</dd></div>`).join("\n")}
            <div class="facts-row"><dt>Booking</dt><dd><a data-wa-link href="/#contact">WhatsApp</a> or <a data-call-primary href="/#contact">call +971 56 846 2872</a>, <a data-call-secondary href="/#contact">call +971 56 509 1801</a>, or <a data-email href="/#contact">email sales.operations@beethrivecleaning.com</a>.</dd></div>
          </dl>`;
const loopHtml = `<div class="standard-loop">
            <h3 class="visually-hidden">The three steps of the Bee Thrive standard</h3>
            <ol class="loop-list">
              <li class="hex-node"><span class="hex-num" aria-hidden="true">1</span><strong>A vetted team cleans.</strong><span>Screened, trained, fully equipped and on time.</span></li>
              <li class="hex-node"><span class="hex-num" aria-hidden="true">2</span><strong>A supervisor checks.</strong><span>On every job, at no extra cost.</span></li>
              <li class="hex-node"><span class="hex-num" aria-hidden="true">3</span><strong>You approve the result.</strong><span>Not right? Tell us within 24 hours and we return to re-clean it, free.</span></li>
            </ol>
          </div>`;
pages.push({
  key: "about", file: "about.html", slug: "about",
  title: "About Us: Licensed Dubai Cleaning Company | Bee Thrive",
  meta: "Bee Thrive Cleaning Services is a brand of Digital Thrive Cleaning Services Co LLC, Trade Licence 1416022, established October 2024 in Deira, Dubai.",
  ogTitle: "About Bee Thrive Cleaning Services",
  ogDesc: "Licensed Dubai cleaning company, established October 2024. A free supervisor on every job.",
  ogImg: "og-about-v1.jpg", ogHeadline: "Licensed, supervised, established October 2024",
  h1: "About Bee Thrive Cleaning Services", crumb: "About Bee Thrive", page: "about page",
  formHref: "/#contact",
  heroImg: "work-windows-2.jpg", w: 1280, h: 958,
  heroAlt: "A Bee Thrive professional cleaning office windows high above a Deira street in Dubai",
  eyebrow: "About us",
  lead: "Bee Thrive Cleaning Services is a licensed cleaning company for homes and businesses in Dubai and Sharjah. It is a brand of Digital Thrive Cleaning Services Co LLC, which holds Trade Licence No. 1416022 from the Dubai Department of Economy and Tourism, and was established in October 2024 with an office in Deira, Dubai.",
  ctaLabel: "Get my free quote on WhatsApp", ctaShort: "Free quote",
  shells: [
    [{ id: "at-a-glance", from: "at a glance", head: `<header class="section-head section-head-left">
            <p class="kicker">Company facts</p>
            <h2 id="at-a-glance-title">Bee Thrive at a glance</h2>
            <p class="section-intro">Updated September 2026.</p>
          </header>`, html: factsHtml }],
    [
      { id: "supervision", from: "why supervision", h2: "Why is Bee Thrive built around supervision?", html:
        paras("Anyone who has hired cleaners knows the pattern: the first visit is excellent, then the standard slowly drifts. Bee Thrive's answer is one simple rule. A supervisor checks the work on every job, whatever its size, and the client never pays extra for it. That is what we mean when we call Bee Thrive Dubai's best-supervised cleaning company.") },
      { id: "standard", from: "the Bee Thrive standard", h2: "How does the Bee Thrive standard work?", html: [
        paras("The Bee Thrive standard is three steps on every job. A vetted, trained team cleans, a supervisor checks the work at no extra cost, and you approve the result. If anything is not right, tell us within 24 hours and the team returns to re-clean it, free."),
        loopHtml,
      ].join("\n          ") },
    ],
    [{ id: "clients", from: "clients", h2: "Who does Bee Thrive work for?", html: [
      paras("Bee Thrive cleans for households, holiday-home hosts and operators, offices and other businesses, and project and event teams. Clients include:"),
      "<h3>Holiday homes</h3>", clientGrid("holiday"),
      "<h3>Offices</h3>", clientGrid("office"),
      "<h3>Projects and events</h3>", clientGrid("events"),
    ].join("\n          ") }],
    [
      { id: "areas", from: "where we work", h2: "Where does Bee Thrive work?", html:
        paras('Bee Thrive cleans homes and businesses across Dubai and Sharjah, including Deira, Bur Dubai, Downtown Dubai, Business Bay, Dubai Marina, JLT, Al Barsha, Jumeirah, Al Nahda, Dubai Silicon Oasis, International City, Mirdif, Al Qusais and Dubai Hills, and takes on projects and events across all Emirates. See <a href="/cleaning-services-sharjah">cleaning services in Sharjah</a> and the <a href="/#areas">areas we cover</a>.') },
      { id: "licence", from: "licence", h2: "How can I check Bee Thrive's licence?", html: [
        paras("Bee Thrive Cleaning Services trades under Digital Thrive Cleaning Services Co LLC, Trade Licence No. 1416022, issued by the Dubai Department of Economy and Tourism. Quote that licence number if you want to verify it with the Department."),
        "<!-- OWNER: add the official DET verification link or licence image when supplied -->",
      ].join("\n          ") },
    ],
    [{ id: "reviews", from: "reviews", h2: "What do clients say?", html: [
      '<div class="page-reviews">', "  " + reviewFig("nikki"), "  " + reviewFig("russel"), "</div>",
      `<p class="page-note"><a data-maps href="${MAPS}">Read our reviews on Google</a></p>`,
    ].join("\n          ") }],
    [{ id: "contact-us", from: "contact details", h2: "Contact Bee Thrive", html: [
      `<p><a class="page-address" data-maps href="${MAPS}">Office #201, Al Qasimi Building, Salahuddin Street, Deira, Dubai, United Arab Emirates</a></p>`,
      `<ul class="page-contact-list">
            <li><a data-wa-link href="/#contact">WhatsApp +971 56 846 2872</a></li>
            <li><a data-call-primary href="/#contact">Call +971 56 846 2872</a></li>
            <li><a data-call-secondary href="/#contact">Call +971 56 509 1801</a></li>
            <li><a data-email href="/#contact">Email sales.operations@beethrivecleaning.com</a></li>
            <li><a data-email-secondary href="/#contact">Email digitalthrivefm@gmail.com</a></li>
          </ul>`,
      paras("We work six days a week with flexible scheduling."),
    ].join("\n          ") }],
  ],
  related: ["deep", "move", "home", "holiday", "post", "office", "commercial", "sharjah"],
  shareH2: "Know someone who needs a cleaner they can trust?", shareP: SHARE_P,
  finalH2: "See the Bee Thrive standard for yourself",
  finalP: "Send a quick message for your free, no-obligation quote.",
});

/* ================= 9.10 404 ================= */
pages.push({
  key: "404", is404: true, file: "404.html", slug: "",
  title: "Page not found | Bee Thrive",
  meta: "Sorry, that page could not be found. Explore Bee Thrive cleaning services in Dubai and Sharjah, or get a free quote on WhatsApp.",
  ogTitle: "Bee Thrive Cleaning Services",
  ogDesc: "Licensed Dubai cleaning company. A free supervisor checks every job. Free quote on WhatsApp.",
  ogImg: "og-home-v1.jpg", ogHeadline: "Dubai's best-supervised cleaning company",
  h1: "Sorry, we could not find that page", page: "404 page", formHref: "/#contact",
  eyebrow: "Page not found",
  lead: "The link may be old or mistyped. These pages might help, or ask us directly on WhatsApp.",
  ctaLabel: "Ask us on WhatsApp",
  extra: `
    <section class="section panel" data-wa-from="page links" aria-labelledby="links-title">
      <div class="container">
        <h2 id="links-title" class="related-title">Pages that might help</h2>
        ${relatedList(["deep", "move", "home", "holiday", "post", "office", "commercial", "sharjah", "about"])}
        <p class="page-home-link"><a href="/">Back to the home page</a></p>
      </div>
    </section>
`,
});

for (const p of pages) {
  const html = build(p);
  fs.writeFileSync(path.join(REPO, p.file), html, "utf8");
  console.log("wrote", p.file, html.length);
}
