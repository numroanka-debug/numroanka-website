NUMRO ANKA — Chaldean Numerology Website
==================================

A complete, static numerology website. Brand: Numro Anka,
trial domain numroanka.com (all files client-side; point the DNS
at any static host and it runs). No build step, no dependencies,
no server required — open index.html in any browser, or upload the whole
folder to any static host (Netlify, Vercel, GitHub Pages, cPanel, S3).

FILES
-----
index.html          Home — hero, instant life-path mini calculator, features,
                    how it works, testimonials
core5.html          Core 5 Reading (flagship, US-style) — Life Path,
                    Expression, Soul Urge, Personality and Birthday
                    framed psychologically ("the road / the talent /
                    the heart / the doorway / the gift"), each
                    interpreted in the user's chart plus a synthesis
                    layer on how the five numbers interact
chart.html         Free Numerology Chart Generator — one printable
                    page mapping everything: the Core 5, Vedic numbers,
                    personal years, pinnacles, challenges, life
                    periods, balance & inner dream, Lo Shu mini-grid
                    with elemental bars, karmic lessons and synthesis
                    notes. Includes a print/save-as-PDF button and
                    dedicated print stylesheet
forecast.html       Practical Forecasts — personal day, month and year
                    tiles, this year's do/avoid, power months (launch,
                    money, love, rest) and a 12-month planning table
                    with a directive per month. Universal-day card for
                    visitors without a birthday entered
calculators.html    The Calculators catalog — thirty-six tools on five
                    shelves with a sticky category nav:
                    Core Identity: Life Path, Destiny (Expression),
                    Soul Urge / Heart's Desire (vowels), Personality
                    Number (consonants), Birthday Number (the Western
                    day-of-month gift reading with master days 11/22,
                    Mulank (Vedic root number), Bhagyank (Vedic fortune
                    number), Namank (Chaldean + Pythagorean compared),
                    Chaldean Numerology Calculator (the classic Indian
                    trio: Psychic + Name + Destiny, with the sacred-9
                    explanation);
                    Predictive & Timing: Personal Year & nine-year
                    cycle, Life Cycles (Formative / Productive /
                    Harvest periods with year spans), Pinnacle Numbers
                    (four peaks with age ranges);
                    Karmic & Psychological: Karmic Lessons (missing
                    name values), Challenge Numbers (four stages),
                    Sun Number (day + month — the outer personality),
                    Karmic Debt Calculator (13/14/16/19 in raw sums +
                    remedies), Origin & Master Calculator (a growth
                    reading of Mulank vs Bhagyank — the self you start
                    as vs the self life steers you toward), Inner Dream (consonants — the quiet
                    self), Balance Number (initials — crisis reflex);
                    Practical & Compatibility: Lucky Numbers
                    (permanent set + today's digit), Today's Lucky
                    Number (ruling number + weekday planet),
                    Compatibility (compact + link to full page),
                    Birth Date Compatibility (four Vedic pairs),
                    Name Compatibility (name numbers + soul urges),
                    House Number / Address Calculator (home or office
                    vibration + remedies), Lucky Vehicle Number
                    (plate digits + the Saturn-8 caution), Lucky Date
                    Calculator (six best dates of any month, tagged by
                    purpose), Lucky Colour Calculator (permanent +
                    today + avoid), Baby Name Numerology (up to 3
                    candidate names vs the child's numbers + lucky
                    first letters), Remedy Finder (gemstone +
                    rudraksha by ruling number — informational,
                    nothing sold);
                    Grids & Experimental: Lo Shu Grid (with elemental
                    energy analysis), Mobile Number (checks alignment
                    against Life Path, Mulank AND Bhagyank), Gematria
                    Calculator (Hebrew-tradition A=1...Z=800 values), Pi Lab
business.html       Business Name Analysis — dedicated page: brand name
                    vibration, money-number check (6/8/9), industry
                    fit, owner harmony, letter breakdown and up to
                    three spelling variants compared side by side.
                    Popular with consultants in India and Australia
calculator.html     Full chart — Life Path, Destiny, Soul Urge, Personality,
                    Birthday numbers + complete interpretations
compatibility.html  Love compatibility — two names + birthdays, resonance
                    score, flow & friction reading
daily.html          Daily forecast — universal day, personal day, lucky
                    colours/number/gem, reference table
reports.html        Pricing (Rs 199 / 499 / 999) + checkout modal + premium
                    report preview (demo payment)
about.html          About, Chaldean vs Pythagorean, letter-value table,
                    how it works, FAQ
contact.html        Contact form (opens email client in demo mode)
style.css           Shared design system (warm cream editorial style)
numerology.js       The calculation engine + all number data + shared
                    navigation (nav order: Home, Calculators, Core 5,
                    Chart, Business, Forecasts, Reports, About,
                    Contact — the burger menu takes over below 1100px)
sitemap.xml         Sitemap for Google Search Console (12 pages,
                    numroanka.com) — submit it after launch
robots.txt          Lets all crawlers in + points to the sitemap

HOSTING
-------
1. Upload every file to your host's web root.
2. That's it. Everything is computed client-side in the visitor's browser
   — no data is ever uploaded, which the About/FAQ page states honestly.

ENABLING REAL PAYMENTS (reports.html)
-------------------------------------
The checkout currently runs in DEMO mode: it unlocks the premium report
preview immediately without charging. To accept real payments:

1. Sign up at Razorpay (India, UPI/cards/netbanking) or Stripe.
2. In reports.html, find the block marked "PAYMENT HOOK".
3. Load the gateway's checkout script and replace processDemoPayment()
   with the gateway call; unlockPremium(name, dob) should run only from
   the payment success handler.
4. For a real PDF report you will also need a small backend (or service
   like Serverless/Lambda) to generate and email the document after
   verifying the payment signature.

CUSTOMISATION
-------------
- Colours & fonts: edit the CSS variables at the top of style.css.
- Number meanings, lucky data, prices: edit numerology.js (NUMBER_DATA)
  and the tier cards in reports.html.
- The email address in contact.html / about.html is hello@anka.example —
  replace with your own.

DISCLAIMER CONTENT
-----------------
The site openly labels numerology as a symbolic tradition for reflection
and entertainment, not science — keep this, it builds trust.

Tested: engine unit checks (Chaldean values, reductions, master numbers,
compatibility scoring), HTML structure parse, and JS syntax checks all pass.

CROSS-SELL SYSTEM (rule 4)
Every major calculator result now ends with a "Where to next?"
card (nextSteps() helper in calculators.html) suggesting the
logical follow-on tools plus a soft link to the paid reports
page. A "Your numbers, connected" journeys section closes the
catalog page with four guided paths (core depth, karmic work,
naming/buying, timing). Monetization stays honest: calculations
free forever, reports via the demo checkout (PAYMENT HOOK).
