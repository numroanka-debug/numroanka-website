# NUMRO ANKA — Project Handoff & Memory

**Site:** https://numroanka.com (live since 18 Sep 2026)
**Repo:** https://github.com/numroanka-debug/numroanka-website (public, branch: main)
**Repo owner:** numroanka-debug <numroanka@gmail.com>
**Legal owner:** BRAHMA BHOGAR ARKAA PRIVATE LIMITED — CIN U96906DL2026PTC464561,
incorporated 15 Mar 2026 (see section 13). PAN/TAN NOT recorded here on purpose —
repo is public; keep them only in the incorporation certificate.
**This file:** the complete project memory. Any new AI chat or developer who receives this file plus the site files can continue the project without needing the original conversation.

---

## 1. WHAT THIS PROJECT IS

A complete, static numerology website — 36 calculators, 12 pages, no backend,
no build step, no dependencies. Everything runs client-side in the visitor's
browser (a deliberate privacy promise the site makes in its copy). Brand:
**Numro Anka** (Numro = numerology, Anka / अंक = number). Chaldean numerology
is the primary system; Pythagorean only where classical (karmic lessons,
Namank comparison).

## 2. FILE INVENTORY (17 site files + this file)

| File               | Purpose                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------- |
| index.html         | Home — hero, instant life-path mini calculator, features                                    |
| calculators.html   | 36-tool catalog on 5 shelves (main SEO asset, ~112 KB)                                     |
| core5.html         | Core 5 psychological reading (US-style)                                                     |
| calculator.html    | Full Chart generator                                                                        |
| chart.html         | Printable full chart (has print stylesheet)                                                |
| forecast.html      | Forecasts + 12-month planner                                                                |
| compatibility.html | Full compatibility reading                                                                  |
| daily.html         | Daily forecast                                                                              |
| business.html      | Business name analysis + variant comparison                                                 |
| reports.html       | Paid reports (Rs. 199/499/999) + DEMO checkout                                              |
| about.html         | About, Chaldean vs Pythagorean, FAQ                                                         |
| contact.html       | Contact (email: hello@numroanka.com — create mailbox on host)                              |
| style.css          | Design system: warm cream paper, ink text, terracotta + teal                               |
| numerology.js      | Engine (~61 KB): all calculators, data tables, renderChrome()                               |
| sitemap.xml        | For Google Search Console                                                                   |
| robots.txt         | Allows crawlers, points to sitemap                                                          |
| README.txt         | File-by-file documentation                                                                  |

Fonts (Google Fonts, OFL license): Fraunces, Plus Jakarta Sans, Azeret Mono.

## 3. SITE ARCHITECTURE

- **Navigation and footer live in numerology.js → renderChrome()**, injected
into every page at DOMContentLoaded. Site-wide nav changes = one patch
there. NAV_LINKS order: Home, Calculators, Core 5, Chart, Business,
Forecasts, Reports, About, Contact. Burger menu below 1100px.
- Each page ALSO has a static header brand (the अ medallion + "Numro Anka")
so pages look right even before JS runs.
- calculators.html is a single page with 36 `<section class="tool">`
blocks, each with a unique id (t-mk, t-bh, t-veh, t-bn, t-bz...) and a
sequential `<span class="tool-num">NN</span>`. The "Most searched in
India" strip + "Top searched" pills mark the 5 traffic drivers.
- Cross-sell system: `nextSteps([...])` helper in calculators.html renders
a "Where to next?" card after 17 tool results; a "Your numbers, connected"
journeys section closes the page.
- Header layout (all 12 pages): brand अ + name, injected nav (#main-nav),
"Free Reading" CTA to calculator.html (on 9 tool/reading pages; deliberately
absent on about, contact, reports), burger (below 1100px). The burger sets
aria-expanded; the nav carries aria-label="Primary" (since v1.2).
- Footer bottom line (since v1.4): "© YEAR Numro Anka · numroanka.com"
(the "For reflection and entertainment." suffix was removed on owner request).

## 4. ENGINE (numerology.js) — FUNCTIONS & DATA

Calculators: lifePathNumber, destinyNumber, soulUrgeNumber,
personalityNumber, birthDayNumber, mulankNumber, bhagyankNumber,
pythagoreanNameNumber, personalYearNumber / MonthNumber / DayNumber,
universalDayNumber, lifePeriods, pinnacleNumbers, karmicLessons,
challengeNumbers, balanceNumber, innerDream (consonants), sunNumber,
karmicDebts, originMaster, vehicleAnalysis, luckyDates, luckyColours,
babyNameCheck, luckyAlphabets, businessAnalysis, mobileAnalysis,
loShuCounts / Elements, houseAnalysis, birthDateCompatibility,
nameCompatibility, todayLuckyNumber, luckyToolkit, piSignature (experimental),
gematriaAnalysis, RUDRAKSHA map, DAY_GIFT (1–31).

Key data: NUMBER_DATA (titles, summaries, planets, colours, gems, days),
HARMONY (compatibility table), DAILY_GUIDE, P_YEAR_DATA, MONTH_THEME,
P_DAY_TAG, KARMIC_DEBT_DATA, HOUSE_REMEDY, WEEKDAY_PLANETS, BIZ_FIT,
MONEY_NUMBERS [6,8,9], GEMATRIA (A=1…Z=800), PI_DIGITS.

**allNumbers() contract (since v1.3):** returns lifePath, destiny,
expression (alias of destiny — chart.html and core5.html read `n.expression`,
calculator.html and reports.html read `n.destiny`; both keys are always
present), soulUrge, personality, birthday.

## 5. HARD RULES (do not break these)

1. **Brand spelling is load-bearing.** Always "Numro Anka" / "NumroAnka" /
 numroanka.com — one m, no e. The Chaldean total of 33 (the fortunate
 compound the name was chosen for, per Cheiro 33≈24) only holds with this
 exact spelling. "Numero Anka" = 38. Never rename to Anka Jyotish
 (existing Parashara software trademark neighbour).
2. **Chaldean values:** A1 B2 C3 D4 E5 F8 G3 H5 I1 J1 K2 L3 M4 N5 O7 P8 Q1
 R2 S3 T4 U6 V6 W6 X5 Y1 Z7. **9 is never assigned to a letter.**
3. **Pythagorean only where classical:** karmic lessons, Namank comparison.
4. All user input interpolated through `esc()`; prices in Rs. with en-IN
 locale; experimental features (Pi Lab, gematria) clearly labelled with
 honest footnotes; "planetary transits" = weekday rulers, footnoted.
5. Payments are DEMO only. reports.html has a clearly marked `PAYMENT HOOK`
 comment where Razorpay/Stripe integration goes. Real payments need a
 backend — do not fake a working checkout.
6. Honest tone everywhere: numerology framed as a symbolic tradition for
 reflection, not science (kept in about.html — builds trust).

## 6. VERIFICATION RECIPE (run after every change)

```
1. HTML structure parse (python html.parser, void tags: meta link br img
   input hr source circle) + node --check on every inline <script> and
   numerology.js.
2. Engine unit tests: copy numerology.js, strip the line
   document.addEventListener("DOMContentLoaded", renderChrome);
   (that exact line — a broad regex cut deletes fmtDOB/esc defined after it),
   convert const/let -> var, append module.exports, run with node.
3. Renumber check: tool-num spans must be 01..NN sequential; hero/CTA counts
   must match ("36 calculators, five shelves").
4. DOM-id uniqueness: EVERY id on the page must be unique — the catalog
   once shipped with three collisions (pn-, bd-, lc- prefixes) that broke
   anchor jumps and rendered results into the wrong section. Prefix new
   tools uniquely (pers-, bday-, lcol- pattern).
5. Brand check: no bare "Anka" without "Numro" prefix (except the about
   page's definition sentence), no "Numro Numro" double-brand, no
   competitor names anywhere in code/README.
```

Test data that caught real bugs: "Aarav" sums to Chaldean 11 (master) —
harmony checks must reduce masters to base first. "Meridian Consulting" = 63
(G=3, not Z's 7) → 9. "LIVE"/"EVIL" both gematria 444. Karmic-debt sums use
raw totals before reduction. **allNumbers() key contract:** chart.html and
core5.html read `n.expression` while calculator.html and reports.html read
`n.destiny` — the v1.3 crash ("Every number, one page" generating nothing)
was exactly this mismatch; both keys must always exist.

## 7. HOW TO ADD A NEW CALCULATOR (the batch workflow)

1. Engine: add function + any data tables to numerology.js (before the
 shared-chrome section).
2. calculators.html: add a `<section class="tool" id="t-xx">` in the right
 shelf + a handler in the inline script (conventions: $() helper, showErr/
 hideErr, cleanName, esc; result card = .card fade-in + medallion hero).
3. Renumber with the Python script over tool-num spans; update hero count,
 CTA count, README in the same pass.
4. Add a nextSteps([...]) cross-sell to the result.
5. Run the verification recipe (section 6). Deliver ONLY changed files.

## 8. PENDING ROADMAP (not yet built)

- Hindi UI for top tools (Mulank, Bhagyank first) — biggest Tier 2/3 lever.
- Razorpay/Stripe + small backend at the PAYMENT HOOK (order capture,
PDF delivery of reports).
- Trademark: file "Numro Anka" wordmark, IP India classes 41/42 (search
 first — "Anka Jyotish" by Parashara exists in desktop software).
- Google Search Console: verify property + submit sitemap.xml (if not done).
- Analytics (privacy-friendly option fits the site's promise).
- Favicon (the अ medallion as .ico/.png), Open Graph tags for social share.
- Hostinger Git integration: hPanel → Advanced → Git → link
 numroanka-debug/numroanka-website so pushes auto-deploy (current sync is
 manual upload via File Manager to public_html).
- **Brand-family cross-linking (planned, later stage):** link all three
 Brahma Bhogar Arkaa brands to each other — numroanka.com ↔
 divinemandir.com ↔ dinapanchang.com — footer "Our family" strip on each
 site, and matching links from the other two sites back here. See section 13.
- Optional: numroanka.in domain, PWA manifest for app-store-adjacent install.

## 9. MARKET & COMPETITOR NOTES (from launch research, Sep 2026)

- India astrology-app market: ~$0.27B (2025) → $2.32B (2032), ~35% CAGR;
total India astrology market $7B+, only ~1.5% online. Numerology is the
fastest-growing subsegment among Gen Z (wellness/self-reflection framing).
- Monetization playbook (Prokerala/Numerologist.com): free calculation →
paid PDF reports / consults / remedies. Our reports page matches this.
- Competitors audited: Prokerala, AstroSage, Astroyogi, GaneshaSpeaks,
Numerologist.com, WorldNumerology, Pandit.com (their Origin & Master
concept inspired ours — all Pandit references removed from shipped code),
NumroQ (208-tool aggregator, similar namespace — watch them).
- Our differentiation: 36 curated tools, India-first (Mulank/Bhagyank,
vehicle/baby/business) + US (Core 5) + esoteric (gematria, Pi Lab),
honest tone, privacy (client-side), cross-sell journeys.

## 10. GITHUB SETUP — COMPLETED 18 Sep 2026

- Account: **numroanka-debug** (email numroanka@gmail.com)
- Repository: **numroanka-website** — public, default branch `main`,
  https://github.com/numroanka-debug/numroanka-website
- Initial commit: f2a9436 "Upload initial website files" (18 Sep 2026,
  09:39 UTC) — all 17 site files verified present, sizes match this doc.
- THIS FILE (HANDOFF.md) is committed to the repo and is the single source
  of truth for project memory. Update it whenever a rule or architecture
  fact changes, and log every release in section 12.
- Live host: Hostinger (hPanel). Git integration NOT yet linked — site
  updates are manual: download changed file(s), hPanel → File Manager →
  public_html → upload → overwrite.
- GitHub Issues: use as the update tracker — one issue per feature
  (e.g., "Hindi UI for Mulank", "Wire Razorpay at PAYMENT HOOK").
- For AI-chat continuity: at the start of any new chat, share the repo or
  upload HANDOFF.md + the file(s) being changed. The handoff file replaces
  the need for the original conversation.

## 11. DEPLOYMENT STATE

- Static host: **Hostinger** (hPanel, domain numroanka.com active with HTTPS).
- Live-site verification done 18 Sep 2026: index, calculators, style.css,
  core5 confirmed serving. **Launch bug found 20 Sep 2026:** chart.html
  ("Every number, one page") and core5.html crashed on generate — pages
  read `n.expression` but allNumbers() only returned `destiny`. Fixed in
  v1.3; upload numerology.js to Hostinger to apply.
- Repo ↔ live-site sync: MANUAL for now (upload code changes to GitHub AND
  to Hostinger separately). Becomes automatic once Hostinger Git is linked
  (see section 8).

## 12. VERSION LOG

| Version | Date | Commit | Change |
| --- | --- | --- | --- |
| v1.0 | 18 Sep 2026 | f2a9436 | Initial launch: all 17 site files uploaded |
| v1.1 | 18 Sep 2026 | 106cd12 | Added HANDOFF.md to repo; removed stray empty 'request' file; recorded actual repo details (numroanka-debug/numroanka-website) |
| v1.2 | 18 Sep 2026 | 7b26795, 4525b1e | Header fixes: added "Free Reading" CTA to chart, compatibility and daily pages (9 of 12 pages now carry it; about/contact/reports deliberately clean); renderChrome a11y — burger now sets aria-expanded, nav gets aria-label="Primary", burger handler guards nav null |
| v1.3 | 20 Sep 2026 | be07c97 | **Critical fix:** chart.html and core5.html crashed on "Generate" since launch — they read `n.expression` but allNumbers() returned only `destiny`. Engine now returns both keys (expression = destiny alias). Also documented the allNumbers() key contract in section 4 and section 6 |
| v1.4 | 20 Sep 2026 | 679d1d0 | Footer: removed "For reflection and entertainment." from the site-wide footer (owner request) — footer bottom line is now just "© YEAR Numro Anka · numroanka.com" |
| v1.5 | 20 Sep 2026 | (this commit) | HANDOFF.md only: recorded corporate owner and brand family (section 13), added cross-brand linking to roadmap |

## 13. CORPORATE & BRAND FAMILY

All three brands below belong to the same legal entity. When any brand
gets a site update, consider adding/updating the family links (roadmap,
section 8).

**Legal entity:** BRAHMA BHOGAR ARKAA PRIVATE LIMITED
- CIN: U96906DL2026PTC464561
- Incorporated: 15 March 2026 (Certificate of Incorporation, MCA Central
  Registration Centre — SPICE+ Part B approval letter, ref AC2492193;
  signed by the Registrar of Companies, Manesar)
- Registered address: 10 Basement Front Side, Vinobapuri Lajpat Nagar II,
  Lajpat Nagar (South Delhi), New Delhi-110024, Delhi
- PAN/TAN: on the incorporation certificate — deliberately NOT recorded in
  this repo (repo is public; keep tax identity numbers offline).

**Brand family (cross-link all ↔ all, later stage):**

| Brand | Domain | Purpose |
| --- | --- | --- |
| Numro Anka | numroanka.com | Chaldean numerology calculators and readings (this site) |
| Divine Mandir | www.divinemandir.com | Temple / devotional brand |
| Dina Panchang | www.dinapanchang.com | Panchang / daily almanac brand |

Planned cross-linking pattern: a small "Our family of brands" strip in the
site footer (renderChrome() — one patch updates every Numro Anka page):
"A Brahma Bhogar Arkaa brand · Numro Anka · Divine Mandir · Dina Panchang",
with the matching strip on the other two sites linking back. Do NOT hard-
code the strip into individual pages — it belongs in renderChrome().
