/* ============================================================
   NUMRO ANKA — Chaldean Numerology Engine
   Pure client-side calculations. No data leaves the browser.
   ============================================================ */

// Chaldean letter values (older system, 1-8, no 9 — 9 is held sacred)
const CHALDEAN = {
  A:1, B:2, C:3, D:4, E:5, F:8, G:3, H:5, I:1, J:1, K:2, L:3, M:4,
  N:5, O:7, P:8, Q:1, R:2, S:3, T:4, U:6, V:6, W:6, X:5, Y:1, Z:7
};
const VOWELS = "AEIOU";

/* ---------- core math ---------- */
function reduceNumber(n, keepMaster = true) {
  const MASTER = [11, 22, 33];
  while (n > 9 && !(keepMaster && MASTER.includes(n))) {
    n = String(n).split("").reduce((a, d) => a + Number(d), 0);
  }
  return n;
}
function digitSum(s) { return String(s).replace(/\D/g, "").split("").reduce((a, d) => a + Number(d), 0); }

function letterTotal(name, mode) { // mode: 'all' | 'vowels' | 'consonants'
  let sum = 0;
  for (const ch of name.toUpperCase()) {
    if (!CHALDEAN.hasOwnProperty(ch)) continue;
    const isVowel = VOWELS.includes(ch);
    if (mode === "vowels" && !isVowel) continue;
    if (mode === "consonants" && isVowel) continue;
    sum += CHALDEAN[ch];
  }
  return sum;
}

/* ---------- core numbers ---------- */
function parseDOB(dobStr) {
  const [y, m, d] = dobStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m, day: d };
}
function lifePathNumber(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(digitSum(`${dob.day}${dob.month}${dob.year}`));
}
function destinyNumber(fullName) { return reduceNumber(letterTotal(fullName, "all")); }      // expression / name number
function soulUrgeNumber(fullName) { return reduceNumber(letterTotal(fullName, "vowels")); } // heart's desire
function personalityNumber(fullName) { return reduceNumber(letterTotal(fullName, "consonants")); }
function birthDayNumber(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(dob.day); // day 11, 22 and 33 keep their master vibration
}
function allNumbers(fullName, dobStr) {
  return {
    lifePath: lifePathNumber(dobStr),
    destiny: destinyNumber(fullName),
    expression: destinyNumber(fullName), // US-style alias: Core 5 / chart pages read this key
    soulUrge: soulUrgeNumber(fullName),
    personality: personalityNumber(fullName),
    birthday: birthDayNumber(dobStr)
  };
}

/* ---------- daily forecast ---------- */
function universalDayNumber(date = new Date()) {
  const key = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
  return reduceNumber(digitSum(key), false);
}
function personalDayNumber(dobStr, date = new Date()) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(dob.day + dob.month + universalDayNumber(date), false);
}

/* ============================================================
   NUMBER DATA — meanings, lucky colours, days, gems
   ============================================================ */
const NUMBER_DATA = {
  1: { title: "The Leader", planet: "Sun",
    keywords: ["Independent", "Pioneering", "Original", "Ambitious"],
    summary: "The number of beginnings. Ones are natural pioneers who carve their own path rather than follow a trail. Driven, self-reliant and original, they thrive when trusted with authority and shrink under micromanagement.",
    career: "Entrepreneurship, executive leadership, politics, freelance creative work, sports, any field rewarding initiative.",
    love: "Bold and direct in love. Ones need a partner who respects their independence — possessiveness is the fastest way to lose them. Most compatible with 3, 5 and 6.",
    watchOut: "Ego and stubbornness. The same self-belief that lifts you can tip into arrogance when unchallenged. Practise listening as fiercely as you lead.",
    colours: ["#c2410c", "#e0a45e", "#f5e6c8"], colourNames: ["Burnt orange", "Gold", "Cream"], gem: "Ruby", day: "Sunday" },
  2: { title: "The Diplomat", planet: "Moon",
    keywords: ["Intuitive", "Cooperative", "Sensitive", "Peacemaking"],
    summary: "The number of partnership and balance. Twos read rooms before others finish speaking. Gentle, tactful and deeply intuitive, they are the glue in families and teams — but they feel every ripple of conflict twice as hard.",
    career: "Counselling, HR, mediation, nursing, design, hospitality, research — anywhere empathy is a professional skill.",
    love: "Romantic and devoted, twos are happiest in committed partnership. They need verbal reassurance and give loyalty unstintingly in return. Most compatible with 1, 3 and 6.",
    watchOut: "Over-sensitivity and holding grudges silently. Learn to say what you need out loud instead of hoping it will be noticed.",
    colours: ["#8ea9c9", "#e8e4dd", "#c98fa0"], colourNames: ["Pale blue", "Pearl white", "Soft pink"], gem: "Pearl / Moonstone", day: "Monday" },
  3: { title: "The Communicator", planet: "Jupiter",
    keywords: ["Expressive", "Optimistic", "Creative", "Sociable"],
    summary: "The number of joy and self-expression. Threes carry natural charisma — words, colour and humour come easily. Their challenge is depth: scattering their abundant talent across too many projects at once.",
    career: "Writing, teaching, performance, marketing, media, comedy, hospitality — anything with a stage or an audience.",
    love: "Playful, generous and affectionate. Threes keep romance fun but must remember not every problem is solved with a joke. Most compatible with 1, 2, 5 and 7.",
    watchOut: "Superficiality and financial carelessness. Finish what you begin before announcing the next three things.",
    colours: ["#c9a227", "#7c4dbd", "#e8743b"], colourNames: ["Royal yellow", "Violet", "Coral"], gem: "Yellow Sapphire", day: "Thursday" },
  4: { title: "The Builder", planet: "Rahu (Uranus)",
    keywords: ["Disciplined", "Practical", "Loyal", "Methodical"],
    summary: "The number of foundations. Fours turn visions into systems, plans and buildings. Patient, reliable and hard-working, they earn trust the slow way — and keep it for decades. They resist sudden change of any kind.",
    career: "Engineering, finance, law, operations, project management, agriculture, architecture — structure is your native language.",
    love: "Steady, protective and sincere. Fours show love through acts, not words, so they should pair with someone who notices. Most compatible with 1, 4, 6 and 8.",
    watchOut: "Rigidity. The plan is a servant, not a master. Build one afternoon a week for pure spontaneity.",
    colours: ["#4a6b5a", "#3b6ea5", "#98928a"], colourNames: ["Forest green", "Electric blue", "Grey"], gem: "Hessonite (Gomed)", day: "Saturday" },
  5: { title: "The Adventurer", planet: "Mercury",
    keywords: ["Curious", "Adaptable", "Quick-witted", "Free"],
    summary: "The number of movement and change. Fives metabolise novelty the way others metabolise food. Quick, versatile and magnetic, they can rebuild their life in a new city faster than most people change jobs.",
    career: "Travel, sales, journalism, trading, technology, consulting, teaching languages — variety is not a distraction, it is fuel.",
    love: "Exciting and freedom-loving. Fives commit deeply but only to partners who keep growing alongside them. Most compatible with 1, 3, 5 and 7.",
    watchOut: "Restlessness and excess. Five senses, five temptations. Choose your escapes deliberately.",
    colours: ["#3aa6a6", "#c98f2f", "#97a83f"], colourNames: ["Turquoise", "Copper", "Olive green"], gem: "Emerald", day: "Wednesday" },
  6: { title: "The Nurturer", planet: "Venus",
    keywords: ["Loving", "Responsible", "Harmonious", "Aesthetic"],
    summary: "The number of home and heart. Sixes feel responsible for everyone's happiness — often before their own. Aesthetic, warm and justice-minded, they create beauty and calm wherever they are given room.",
    career: "Medicine, education, interior design, food, social work, the arts — anything that serves and beautifies.",
    love: "The most romantic of numbers. Sixes marry deeply and parent instinctively. Most compatible with 1, 2, 6 and 9.",
    watchOut: "Martyrdom and perfectionism. Caring for yourself is not a betrayal of everyone else.",
    colours: ["#a8577e", "#4f7d5c", "#dbe4d0"], colourNames: ["Rose", "Emerald green", "Pale sage"], gem: "Diamond / White Sapphire", day: "Friday" },
  7: { title: "The Seeker", planet: "Ketu (Neptune)",
    keywords: ["Analytical", "Spiritual", "Private", "Perceptive"],
    summary: "The number of wisdom and introspection. Sevens live half in the visible world and half in the world of ideas. Naturally skeptical and deeply intuitive at once, they trust evidence first and mysticism eventually.",
    career: "Research, data science, philosophy, psychology, medicine, writing, aviation — solitary depth over team noise.",
    love: "Private and selective. A seven's affection is quiet, constant and rarely performative. Most compatible with 3, 5 and 7.",
    watchOut: "Isolation and over-thinking. The mind needs a companion it cannot argue with.",
    colours: ["#5c6cae", "#8c5ca8", "#d9d2e9"], colourNames: ["Deep periwinkle", "Amethyst", "Lavender"], gem: "Cat's Eye / Amethyst", day: "Sunday" },
  8: { title: "The Executive", planet: "Saturn",
    keywords: ["Ambitious", "Strategic", "Resilient", "Authoritative"],
    summary: "The number of power and karma. Eights play the long game — building, losing and rebuilding with the patience of Saturn himself. Money, justice and organisation come naturally; so do heavy responsibilities.",
    career: "Banking, real estate, law, manufacturing, management, politics — large systems reward your scale of thinking.",
    love: "Intense, protective and traditional. Eights provide magnificently but must learn softness is not weakness. Most compatible with 2, 4 and 8.",
    watchOut: "Workaholism and control. Power hoarded shrinks you; power shared multiplies you.",
    colours: ["#2f3640", "#5d4037", "#b7a99a"], colourNames: ["Charcoal black", "Deep brown", "Khaki"], gem: "Blue Sapphire / Neelam", day: "Saturday" },
  9: { title: "The Humanitarian", planet: "Mars",
    keywords: ["Compassionate", "Courageous", "Artistic", "Giving"],
    summary: "The number of completion and service. Nines feel connected to everyone and carry a old soul's sense of duty. Fiery like Mars when roused, generous like a river in flood, they give without keeping count.",
    career: "Medicine, activism, arts, teaching, the armed forces, charity leadership — meaning matters more than the paycheck.",
    love: "Passionate, dramatic, whole-hearted. Nines love in capital letters and forgive faster than most. Most compatible with 3, 6 and 9.",
    watchOut: "Saviour complex and burnout. You cannot pour from an empty vessel — refill first.",
    colours: ["#a03030", "#c95b3c", "#f2d0a4"], colourNames: ["Crimson red", "Rust", "Peach"], gem: "Red Coral / Moonga", day: "Tuesday" },
  11: { title: "The Illuminator", planet: "Sun & Moon (master)",
    keywords: ["Visionary", "Inspiring", "Psychic", "Idealistic"],
    summary: "The first master number — a 2 vibrating at a higher octave. Elevens carry intuition so strong it can feel like a burden. Ordinary life feels too small for them, and they are usually right.",
    career: "Spiritual teaching, art, psychology, healing, music, founding movements — anything that lifts a crowd's eyes upward.",
    love: "Deep, almost telepathic connection is the baseline. Elevens must ground themselves with practical partners. Most compatible with 2, 4 and 6.",
    watchOut: "Anxiety and nervous exhaustion. Master numbers run hot; sleep, nature and routine are not optional.",
    colours: ["#c9c9ec", "#e8d8c3", "#a8c8c0"], colourNames: ["Silver-grey", "Champagne", "Aqua mist"], gem: "Moonstone / Opal", day: "Monday" },
  22: { title: "The Master Builder", planet: "Saturn exalted (master)",
    keywords: ["Visionary", "Practical", "Monumental", "Determined"],
    summary: "The second master number — a 4 with a blueprint for civilisations. Twenty-twos dream at architectural scale and possess the discipline to pour the foundations. The rarest of destinies.",
    career: "Institution building, architecture, engineering empires, policy, global business — legacy projects that outlive you.",
    love: "Loyal and stabilising, but your projects will always compete for attention. Choose a partner who is a collaborator, not an audience. Most compatible with 4, 6 and 8.",
    watchOut: "Immense internal pressure. You are allowed to build a quiet Tuesday, not only cathedrals.",
    colours: ["#204e63", "#8fa8b8", "#e0e5e8"], colourNames: ["Deep teal", "Steel blue", "Fog white"], gem: "Blue Sapphire", day: "Saturday" },
  33: { title: "The Master Teacher", planet: "Jupiter exalted (master)",
    keywords: ["Compassionate", "Wise", "Healing", "Devoted"],
    summary: "The highest master number — a 6 raised to sainthood. Thirty-threes are born healers and teachers whose love extends beyond family to humanity. Extremely rare; often arrives with a difficult early life.",
    career: "Spiritual leadership, medicine, teaching, humanitarian work, writing scripture-grade wisdom in any modern field.",
    love: "Unconditional by design. The risk is self-erasure — your devotion needs borders to survive. Most compatible with 3, 6 and 9.",
    watchOut: "Carrying everyone's suffering. Even the greatest teacher sits down to eat.",
    colours: ["#7c4dbd", "#e8c3c9", "#f2e8c3"], colourNames: ["Amethyst violet", "Rose quartz", "Pale gold"], gem: "Amethyst", day: "Thursday" }
};

/* ---------- compatibility ---------- */
const HARMONY = {
  1: [1,3,5,6,9], 2: [1,2,3,4,6,7,9], 3: [1,2,3,5,7,9], 4: [1,2,4,6,7,8],
  5: [1,3,5,7,9], 6: [1,2,3,4,6,8,9], 7: [2,3,4,5,7,9], 8: [2,4,6,8,9], 9: [1,2,3,4,5,6,7,8,9]
};
function compatScore(a, b) {
  const master = { 11:2, 22:4, 33:6 }; // reduce masters to base for table lookup
  const x = master[a] || a, y = master[b] || b;
  const aH = HARMONY[x].includes(y), bH = HARMONY[y].includes(x);
  let score = 55;
  if (aH && bH) score = 88;
  else if (aH || bH) score = 72;
  else score = 58;
  // small deterministic modifiers
  if (a === b) score += 4;
  if ([11,22,33].includes(Number(a)) || [11,22,33].includes(Number(b))) score += 3;
  return Math.min(99, score);
}
function compatVerdict(score) {
  if (score >= 85) return "Natural resonance — this pairing flows with unusual ease. Different strengths, shared direction.";
  if (score >= 70) return "Strong potential — the chemistry is real and the differences are productive rather than corrosive.";
  if (score >= 60) return "Workable with awareness — this bond asks both partners to name their needs instead of assuming them.";
  return "Growth pairing — the friction here is a teacher. If both commit to understanding, this can become a powerful alliance.";
}

/* ---------- daily guidance ---------- */
const DAILY_GUIDE = {
  1: "Start something. Today rewards initiative — make the call, send the email, take the first step you've been circling.",
  2: "Move gently and listen more than you speak. Cooperation opens doors that force cannot.",
  3: "Speak and create. A well-timed conversation or a burst of creative work pays off today.",
  4: "Tend to details and systems. Boring tasks completed today save a week of trouble later.",
  5: "Expect the unexpected — and enjoy it. Say yes to one unplanned opportunity.",
  6: "Show up for home and family. One act of care ripples further than you think.",
  7: "Withdraw and reflect. Answers arrive in quiet, not in noise. Research favours you.",
  8: "Handle money, negotiations and authority. Big-picture strategy favours you today.",
  9: "Give, forgive, complete. Close one lingering chapter — today is for endings done well."
};

/* ============================================================
   LO SHU GRID — Chinese birth-date magic square
   Arrangement:  4 9 2 / 3 5 7 / 8 1 6  (0 is never placed)
   ============================================================ */
const LOSHU_GRID = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
const LOSHU_PLANES = [
  { name: "Mental plane", nums: [4, 9, 2], desc: "planning, memory and ideas" },
  { name: "Emotional plane", nums: [3, 5, 7], desc: "feeling, expression and balance" },
  { name: "Practical plane", nums: [8, 1, 6], desc: "execution, money and discipline" },
  { name: "Thought plane", nums: [4, 3, 8], desc: "analysis and concentration" },
  { name: "Will plane", nums: [9, 5, 1], desc: "purpose and determination" },
  { name: "Action plane", nums: [2, 7, 6], desc: "getting things done" },
  { name: "Golden diagonal", nums: [4, 5, 6], desc: "resolve — the hardest plane to fill" },
  { name: "Silver diagonal", nums: [2, 5, 8], desc: "temperament and intuition" }
];
const LOSHU_MISSING = {
  1: "Confidence and self-expression — a lesson in claiming space without apology.",
  2: "Sensitivity and diplomacy — trusting intuition instead of over-explaining.",
  3: "Creative discipline — brilliant starts, needs help finishing.",
  4: "Order and systems — structure feels optional until it isn't.",
  5: "Balance and adaptability — change rattles more than it should.",
  6: "Responsibility for home and others — intimacy takes conscious effort.",
  7: "Faith and introspection — learning to trust what can't be measured.",
  8: "Money and boundaries — wealth flows when it is respected, not chased.",
  9: "Compassion and completion — allowing endings instead of clinging."
};
function loShuCounts(dobStr) {
  const counts = {}; for (let i = 1; i <= 9; i++) counts[i] = 0;
  const dob = parseDOB(dobStr); if (!dob) return null;
  for (const d of `${dob.day}${dob.month}${dob.year}`) {
    if (d !== "0") counts[Number(d)]++;
  }
  return counts;
}
function loShuPlaneState(counts, nums) {
  // "full" = all 3 present, "partial" = 1-2 present, "empty" = none
  const present = nums.filter(n => counts[n] > 0).length;
  return present === 3 ? "full" : present === 0 ? "empty" : "partial";
}

/* Lo Shu elemental energies (feng shui mapping) */
const LOSHU_ELEMENTS = {
  fire:  { nums: [9],      read: "visibility, recognition, joy" },
  earth: { nums: [2, 5, 8], read: "stability, patience, grounding" },
  metal: { nums: [6, 7],   read: "precision, order, judgement" },
  water: { nums: [1],      read: "wisdom, flow, communication" },
  wood:  { nums: [3, 4],   read: "growth, ambition, new starts" }
};
function loShuElements(counts) {
  const out = [];
  for (const [name, e] of Object.entries(LOSHU_ELEMENTS)) {
    out.push({ name, total: e.nums.reduce((a, n) => a + (counts[n] || 0), 0), nums: e.nums, read: e.read });
  }
  out.sort((a, b) => b.total - a.total);
  return { elements: out, dominant: out[0], weakest: out[out.length - 1] };
}

/* ============================================================
   TODAY'S LUCKY NUMBER — ruling number + weekday planet
   (Planetary "transits" here = the classical weekday rulers:
   Sun rules Sunday, Moon Monday, Mars Tuesday, Mercury
   Wednesday, Jupiter Thursday, Venus Friday, Saturn Saturday.)
   ============================================================ */
const WEEKDAY_PLANETS = [
  { day: "Sunday",    planet: "Sun",     num: 1, colour: "Copper gold",  gem: "Ruby" },
  { day: "Monday",    planet: "Moon",    num: 2, colour: "Pearl white",  gem: "Pearl" },
  { day: "Tuesday",   planet: "Mars",    num: 9, colour: "Crimson red",  gem: "Red Coral" },
  { day: "Wednesday", planet: "Mercury", num: 5, colour: "Emerald green", gem: "Emerald" },
  { day: "Thursday",  planet: "Jupiter", num: 3, colour: "Saffron yellow", gem: "Yellow Sapphire" },
  { day: "Friday",    planet: "Venus",   num: 6, colour: "Pastel shades", gem: "Diamond" },
  { day: "Saturday",  planet: "Saturn",  num: 8, colour: "Deep blue or black", gem: "Blue Sapphire" }
];
function todayLuckyNumber(dobStr, date = new Date()) {
  const ruling = mulankNumber(dobStr);
  if (ruling === null) return null;
  const pDay = personalDayNumber(dobStr, date);
  const uDay = universalDayNumber(date);
  const wp = WEEKDAY_PLANETS[date.getDay()];
  const secondary = reduceNumber(ruling + uDay, false);
  return { ruling, pDay, uDay, wp, secondary, d: NUMBER_DATA[ruling] };
}

/* ============================================================
   BIRTH DATE COMPATIBILITY — strictly DOB vibrations
   Checks all four Vedic pairs: mulank-mulank, mulank-bhagyank,
   bhagyank-mulank, bhagyank-bhagyank. Each harmonious pair
   adds to the score.
   ============================================================ */
function birthDateCompatibility(dobA, dobB) {
  const mA = mulankNumber(dobA), mB = mulankNumber(dobB);
  const bA = bhagyankNumber(dobA), bB = bhagyankNumber(dobB);
  if (mA === null || mB === null) return null;
  const pairs = [
    { label: "Mulank ↔ Mulank", a: mA, b: mB, note: "day-selves meet" },
    { label: "Mulank ↔ Bhagyank", a: mA, b: bB, note: "her nature, his fortune" },
    { label: "Bhagyank ↔ Mulank", a: bA, b: mB, note: "his nature, her fortune" },
    { label: "Bhagyank ↔ Bhagyank", a: bA, b: bB, note: "destinies meet" }
  ];
  const base = m => m; // already single digits
  for (const p of pairs) p.harmony = HARMONY[base(p.a)].includes(base(p.b));
  const good = pairs.filter(p => p.harmony).length;
  const score = 55 + good * 11;
  return { mA, mB, bA, bB, pairs, good, score,
    aLP: lifePathNumber(dobA), bLP: lifePathNumber(dobB) };
}

/* ============================================================
   NAME COMPATIBILITY — strictly name vibrations
   Compares the two Chaldean name numbers (the public contract)
   and the two soul urges (the private wants).
   ============================================================ */
function nameCompatibility(nameA, nameB) {
  const dA = destinyNumber(nameA), dB = destinyNumber(nameB);
  const sA = soulUrgeNumber(nameA), sB = soulUrgeNumber(nameB);
  const base = m => (m === 11 ? 2 : m === 22 ? 4 : m === 33 ? 6 : m);
  const checks = [
    { label: "Name numbers", a: dA, b: dB, harmony: HARMONY[base(dA)].includes(base(dB)),
      note: "the public contract between you" },
    { label: "Soul urges", a: sA, b: sB, harmony: HARMONY[base(sA)].includes(base(sB)),
      note: "the private wants beneath the names" }
  ];
  let score = 55 + checks.filter(c => c.harmony).length * 22;
  if (dA === dB) score = Math.min(99, score + 3);
  return { dA, dB, sA, sB, checks, score };
}

/* ============================================================
   MOBILE NUMBER ANALYSIS — Chaldean
   The digit total is read as a compound number, reduced, and
   compared with the owner's Life Path for harmony.
   ============================================================ */
function mobileAnalysis(numStr) {
  let digits = numStr.replace(/\D/g, "");
  if (digits.length > 10) digits = digits.slice(-10); // drop country/area codes
  if (digits.length < 8) return null;
  const total = digitSum(digits);                 // compound number
  const reduced = reduceNumber(total, false);     // single digit
  const last = Number(digits[digits.length - 1]);
  return { digits, total, reduced, last };
}

/* ============================================================
   PERSONAL YEAR CYCLES — the 9-year rhythm
   Personal Year = birth day + birth month + digits of the
   calendar year, reduced (1-9, no masters in cycle work).
   ============================================================ */
const P_YEAR_DATA = {
  1: { title: "Year of New Beginnings", focus: "Seeds, launches, fresh starts",
    do: "Start the venture, propose, move cities, file the trademark — this year rewards the bold first move.",
    avoid: "Clinging to what has already served its purpose. The door behind you is closing on schedule." },
  2: { title: "Year of Patience & Alliances", focus: "Partnerships, diplomacy, slow growth",
    do: "Nurture alliances, sign the partnership, let the seeds of Year 1 germinate quietly.",
    avoid: "Forcing outcomes or announcing before the roots have taken. This year rewards tending, not harvesting." },
  3: { title: "Year of Visibility", focus: "Expression, marketing, social expansion",
    do: "Publish, launch the campaign, take the stage. What you show this year gets remembered.",
    avoid: "Scattering across ten channels at once — pick two and go deep." },
  4: { title: "Year of Foundations", focus: "Systems, health, hard work",
    do: "Build the boring infrastructure — accounts, contracts, routines, the body. It carries the next five years.",
    avoid: "Shortcuts and speculation. This year's corners cut become next cycle's repairs." },
  5: { title: "Year of Change", focus: "Movement, freedom, pivots",
    do: "Travel, relocate, pivot the offer. The unexpected arrives on schedule this year.",
    avoid: "Rigid five-year plans — and impulsive exits that burn the bridge you will want back." },
  6: { title: "Year of Home & Responsibility", focus: "Family, property, commitments",
    do: "Buy or fix the home, marry, deepen the commitments, honour the responsibilities you've been dodging.",
    avoid: "Over-giving to everyone's opera while your own commitments stay unfenced." },
  7: { title: "Year of Study & Retreat", focus: "Research, spirituality, rest",
    do: "Take the course, write the book, restore the nervous system. Depth over breadth.",
    avoid: "Signing decade-long deals in haste — the mind is turned inward and misses fine print." },
  8: { title: "Year of Power & Harvest", focus: "Career peak, money, authority",
    do: "Ask for the raise, price up, negotiate, scale. The work of Years 4-7 pays out here.",
    avoid: "Ego and burnout — this is the year money notices you, and so do rivals." },
  9: { title: "Year of Completion", focus: "Endings, release, service",
    do: "Finish, forgive, donate, travel far. Clear the decks — Year 1 is coming with new seeds.",
    avoid: "Starting ten-year arcs. What begins in a 9 year carries the old cycle's baggage." }
};
function personalYearNumber(dobStr, date = new Date()) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(dob.day + dob.month + digitSum(date.getFullYear()), false);
}
function personalYearTimeline(dobStr, count = 9, startDate = new Date()) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(startDate.getFullYear() + i, startDate.getMonth(), 1);
    out.push({ year: d.getFullYear(), n: personalYearNumber(dobStr, d) });
  }
  return out;
}
function personalMonthNumber(dobStr, date = new Date()) {
  const py = personalYearNumber(dobStr, date);           // 1-9
  return reduceNumber(py + (date.getMonth() + 1), false); // personal year + calendar month
}
/* Practical theme tags for forecast planners (US-style "what to schedule") */
const MONTH_THEME = {
  1: { tag: "Launch", directive: "Begin. Start the thing you keep postponing — calls, applications, the first version." },
  2: { tag: "Nurture", directive: "Tend what started last month. Follow up, deepen relationships, resist forcing." },
  3: { tag: "Be visible", directive: "Post, publish, present, network. Say yes to stages and introductions." },
  4: { tag: "Build systems", directive: "Paperwork, finances, health routines, admin. Boring now, load-bearing later." },
  5: { tag: "Move & change", directive: "Trips, pivots, experiments. Break one habit that has outlived itself." },
  6: { tag: "Home & family", directive: "Commitments, the people who matter, the space you live in. Show up personally." },
  7: { tag: "Study & rest", directive: "Research, reflect, sleep. Protect quiet — the answer is inward this month." },
  8: { tag: "Push & money", directive: "Negotiate, price, ask, scale. The month money listens — use your voice." },
  9: { tag: "Complete & clear", directive: "Finish, forgive, declutter, end what is done. Make room for the new." }
};

/* ============================================================
   CORE 5 SYNTHESIS — how the five psychological numbers
   interact with each other (the US "reading" layer)
   ============================================================ */
function core5Synthesis(n) {
  const base = m => (m === 11 ? 2 : m === 22 ? 4 : m === 33 ? 6 : m);
  const H = (a, b) => HARMONY[base(a)] !== undefined && HARMONY[base(a)].includes(base(b));
  const notes = [];
  // heart vs road
  notes.push(H(n.soulUrge, n.lifePath)
    ? { pair: "Soul Urge × Life Path", text: "Your heart's private desire walks the same road as your life's direction — an uncommon alignment that makes decisions easier: what you want and where you're going point the same way." }
    : { pair: "Soul Urge × Life Path", text: "Your private wants pull at an angle to your life's road. This tension is not a flaw — it is the engine room of your ambition. Name it, plan around it." });
  // mask vs talent
  if (n.personality === n.expression) {
    notes.push({ pair: "Personality × Expression", text: "What people see first is exactly what you've got — rare transparency. No energy is spent maintaining a gap between the mask and the talent." });
  } else if (H(n.expression, n.personality)) {
    notes.push({ pair: "Personality × Expression", text: "The mask flatters the talent: your first impression and your real capabilities harmonise, so people's trust in you tends to compound." });
  } else {
    notes.push({ pair: "Personality × Expression", text: "The world's first impression undersells your actual ability. People discover you're more than they expected — reveal the depth deliberately rather than waiting to be found." });
  }
  // gift vs road
  if (n.birthday === n.lifePath) {
    notes.push({ pair: "Birthday × Life Path", text: "Your birthday gift IS your road — the talent you arrived with points exactly where you're going. Trust it under pressure; it is your compass." });
  } else if (H(n.birthday, n.lifePath)) {
    notes.push({ pair: "Birthday × Life Path", text: "Your inborn gift supports your path naturally — it feels like cheating when you use it, which is usually the sign you're on course." });
  } else {
    notes.push({ pair: "Birthday × Life Path", text: "Your special skill seems to sit off your main road. Keep it anyway: off-path gifts tend to become the unfair advantage nobody saw coming." });
  }
  // masters
  const masters = [n.lifePath, n.expression, n.soulUrge, n.personality, n.birthday].filter(v => [11, 22, 33].includes(v));
  notes.push(masters.length
    ? { pair: "Master vibrations", text: `Your chart carries ${masters.length > 1 ? "multiple master numbers (" + [...new Set(masters)].join(", ") + ")" : "the master number " + [...new Set(masters)].join(", ")} — higher-octane energy with higher voltage. You will need more rest, more grounding and fewer apologies for wanting an unusual life.` }
    : { pair: "Grounded chart", text: "No master numbers in the core five — your chart is built for steady, sustainable work rather than high-voltage sprints. That is a strength; most breakthroughs are boring on the inside." });
  return notes;
}

/* ============================================================
   BUSINESS NAME ANALYSIS — Chaldean commercial reading
   ============================================================ */
const MONEY_NUMBERS = [6, 8, 9]; // Venus (luxury/retail), Saturn (power/finance), Mars (energy/marketplace)
const BIZ_FIT = {
  1: "Solo brands, startups, premium consulting — anything whose promise is innovation.",
  2: "Partnerships, clinics, hospitality, care brands — businesses built on relationships.",
  3: "Media, marketing, education, F&B — anywhere personality and communication sell.",
  4: "Construction, manufacturing, logistics, engineering — reliability IS the product.",
  5: "Travel, tech, trading, communications — businesses that move fast and adapt faster.",
  6: "Beauty, wellness, interiors, food, jewellery — Venus-ruled luxury and care sectors.",
  7: "Research, analytics, specialty consulting, spiritual and educational services.",
  8: "Finance, real estate, heavy industry, B2B — the classic big-money vibration.",
  9: "Brands with a cause: sustainability, healthcare, community, the arts, sport.",
  11: "Inspirational brands, coaching at scale, spiritual services — high visibility, needs grounding.",
  22: "Institutions, infrastructure, large-scale ventures — a name built for decades.",
  33: "Healing, education and service brands — the teacher-healer vibration."
};
function businessAnalysis(bizName, ownerDobStr) {
  const name = bizName.replace(/[^a-zA-Z ]/g, "").trim();
  if (name.length < 2) return null;
  const destiny = destinyNumber(name);
  const soul = soulUrgeNumber(name);
  const face = personalityNumber(name);
  const base = m => (m === 11 ? 2 : m === 22 ? 4 : m === 33 ? 6 : m);
  const moneyVibe = MONEY_NUMBERS.includes(base(destiny));
  let harmony = null, ownerLP = null;
  if (ownerDobStr) {
    ownerLP = lifePathNumber(ownerDobStr);
    harmony = HARMONY[base(destiny)] !== undefined && HARMONY[base(destiny)].includes(base(ownerLP));
  }
  return { name, destiny, soul, face, moneyVibe, harmony, ownerLP };
}

/* ============================================================
   EXPERIMENTAL: PI-BASED MAPPING
   Not classical numerology — an experimental system where each
   letter's Chaldean value is paired with the digit of pi at the
   same position. Labelled experimental everywhere it appears.
   ============================================================ */
const PI_DIGITS = "14159265358979323846264338327950288419716939937510"; // first 50 digits after the decimal point
function piSignature(textStr) {
  const letters = textStr.replace(/[^a-zA-Z]/g, "").toUpperCase();
  if (letters.length < 2) return null;
  let sum = 0;
  const pairs = [];
  for (let i = 0; i < letters.length; i++) {
    const v = CHALDEAN[letters[i]];
    const p = Number(PI_DIGITS[i % PI_DIGITS.length]);
    sum += v * p;
    pairs.push({ ch: letters[i], v, p });
  }
  return { pairs, sum, root: reduceNumber(sum, false) };
}

/* ============================================================
   VEDIC NUMBERS — Mulank & Bhagyank
   Mulank  = root/birth number from the DAY of birth,
             fully reduced to a single digit (1-9).
   Bhagyank = fortune number from the FULL date of birth,
             fully reduced to a single digit (1-9).
   ============================================================ */
function mulankNumber(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(dob.day, false);
}
function bhagyankNumber(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(digitSum(`${dob.day}${dob.month}${dob.year}`), false);
}

/* ============================================================
   PYTHAGOREAN SYSTEM — A=1..I=9, J=1..R=9, S=1..Z=8
   (letters valued by alphabet position; the modern Western
   system, shown alongside Chaldean in the Namank tool)
   ============================================================ */
const PYTHAGOREAN = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9, J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
};
function pythagoreanNameNumber(name) {
  let sum = 0;
  for (const ch of name.toUpperCase()) if (PYTHAGOREAN.hasOwnProperty(ch)) sum += PYTHAGOREAN[ch];
  return reduceNumber(sum);
}
function pythagoreanRaw(name) {
  let sum = 0;
  for (const ch of name.toUpperCase()) if (PYTHAGOREAN.hasOwnProperty(ch)) sum += PYTHAGOREAN[ch];
  return sum;
}

/* ============================================================
   LIFE PERIODS — Formative / Productive / Harvest
   (Pythagorean school: month, day and year of birth drive
   the three great periods; transition ages vary by school)
   ============================================================ */
function lifePeriods(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  const r = n => reduceNumber(n, false);
  const formative = r(dob.month);
  const productive = r(dob.day);
  const harvest = r(digitSum(dob.year));
  const y1 = dob.year + 27, y2 = dob.year + 56;
  return {
    formative, productive, harvest,
    spans: [
      { name: "Formative period", num: formative, from: dob.year, to: y1, age: "0 – 27" },
      { name: "Productive period", num: productive, from: y1, to: y2, age: "28 – 56" },
      { name: "Harvest period", num: harvest, from: y2, to: "—", age: "57 +" }
    ]
  };
}

/* ============================================================
   PINNACLE NUMBERS — four peak periods of achievement
   P1 = month + day | P2 = day + year | P3 = P1 + P2 | P4 = month + year
   P1 runs to age 36 - Life Path; then 9-year pinnacles.
   ============================================================ */
function pinnacleNumbers(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  const r = n => reduceNumber(n);
  const p1 = r(dob.month + dob.day);
  const p2 = r(dob.day + digitSum(dob.year));
  const p3 = r(p1 + p2);
  const p4 = r(dob.month + digitSum(dob.year));
  const lpBase = reduceNumber(digitSum(`${dob.day}${dob.month}${dob.year}`), false);
  const a1 = 36 - lpBase;
  const a2 = a1 + 9, a3 = a2 + 9;
  return {
    p1: { num: p1, from: 0, to: a1 },
    p2: { num: p2, from: a1, to: a2 },
    p3: { num: p3, from: a2, to: a3 },
    p4: { num: p4, from: a3, to: null },
    lifePathBase: lpBase
  };
}

/* ============================================================
   KARMIC LESSONS — number-values missing from the name
   ============================================================ */
const KARMIC_LESSON = {
  1: "Independence is your homework — few shoulders to lean on were modelled for you. Practise deciding alone, small stakes first.",
  2: "Diplomacy and patience under friction must be learned consciously; your instinct is to push where a pause would win.",
  3: "Open emotional expression doesn't come naturally — say the feeling out loud even when your voice shakes.",
  4: "Order, method and follow-through must be built brick by brick; chaos is comfortable for you, and that is the trap.",
  5: "Adaptability. Change rattles you more than it should — schedule small deliberate disruptions until it doesn't.",
  6: "Taking responsibility at home and for others — commitment itself is the curriculum.",
  7: "Learning to trust what you know without external proof; faith over verification, occasionally.",
  8: "Handling money and the material world with confidence rather than avoidance.",
  9: "Giving without keeping score — compassion at scale, not just for your circle."
};
function karmicLessons(name) {
  // Uses PYTHAGOREAN letter values — the system this tool originates from.
  // (In Chaldean, no letter carries 9, so "missing 9" would apply to every name.)
  const present = new Set();
  for (const ch of name.toUpperCase()) if (PYTHAGOREAN.hasOwnProperty(ch)) present.add(PYTHAGOREAN[ch]);
  const missing = [];
  for (let n = 1; n <= 9; n++) if (!present.has(n)) missing.push(n);
  return { missing, hasAll: missing.length === 0 };
}

/* ============================================================
   CHALLENGE NUMBERS — obstacles by stage of life
   C1 = |month - day|  C2 = |day - year|  C3 = |C1 - C2| (main)
   C4 = |month - year|   (all fully reduced)
   ============================================================ */
const CHALLENGE_DATA = {
  0: "No specific challenge here — a gift position. The only risk of an empty challenge is complacency: ease can stop you reaching.",
  1: "Learning to act without dominating. Your instinct under pressure is to grab the wheel; the lesson is leading while others still hold theirs.",
  2: "Oversensitivity to slights and moods. Boundaries, not walls — and a thick notebook of honest words said kindly.",
  3: "Fear of ridicule blocks self-expression. The work is creating before you are ready and sharing before it is perfect.",
  4: "Finishing. Starting is euphoric; the last twenty percent is where this challenge lives. Systems, deadlines, consequences.",
  5: "Freedom versus commitment — restlessness that trades long-term wealth for short-term novelty. Choose your escapes deliberately.",
  6: "Perfectionism and over-responsibility for everyone's happiness. Do the care, drop the scorekeeping.",
  7: "Faith versus skepticism. The isolated mind can argue with anything — the work is trusting, and saying it out loud.",
  8: "Power and money handled by force instead of finesse. Dominating outcomes works until it doesn't; learn the gentle version."
};
function challengeNumbers(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  const r = n => reduceNumber(n, false);
  const m = r(dob.month), d = r(dob.day), y = r(digitSum(dob.year));
  const c1 = r(Math.abs(m - d)), c2 = r(Math.abs(d - y)), c4 = r(Math.abs(m - y));
  const c3 = r(Math.abs(c1 - c2));
  return {
    c1: { num: c1, stage: "Early life (to ~30)" },
    c2: { num: c2, stage: "Mid life (~30–60)" },
    c3: { num: c3, stage: "Main challenge — lifelong" },
    c4: { num: c4, stage: "Later life (60+)" }
  };
}

/* ============================================================
   BALANCE NUMBER — initials of the full name; how you
   instinctively react under stress or crisis
   ============================================================ */
const BALANCE_DATA = {
  1: "You take command instantly — decisions snap into place and others follow. Guard against steamrolling the feelings that slow the rescue down.",
  2: "You steady the room first, seek counsel, calm the children and the dogs. Guard against being talked out of your own centre.",
  3: "You lighten it — a reframe, a joke, a story — and morale recovers. Guard against deflecting the problem while you're amusing it.",
  4: "You bring order out of chaos, methodically, list first. Guard against rigidity when the crisis demands improvisation.",
  5: "You adapt fast — change the plan, change the room, change the country. Guard against escaping rather than resolving.",
  6: "You carry everyone — the practical load and the emotional one. Guard against martyrdom; you count too.",
  7: "You withdraw to think it through, and your answer is usually right. Guard against leaving everyone else in the dark while you process.",
  8: "You mobilise resources and decisions at scale. Guard against force where finesse would win faster.",
  9: "You absorb the whole crisis with universal empathy and forgive early. Guard against carrying what was never yours."
};
function balanceNumber(fullName) {
  const words = fullName.trim().toUpperCase().split(/\s+/).filter(w => /^[A-Z]/.test(w));
  if (!words.length) return null;
  let sum = 0;
  for (const w of words) sum += CHALDEAN[w[0]] || 0;
  return reduceNumber(sum, false);
}

/* ============================================================
   LUCKY NUMBERS — personalised daily toolkit
   ============================================================ */
function luckyToolkit(dobStr, date = new Date()) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  const bhagyank = bhagyankNumber(dobStr);
  const mulank = mulankNumber(dobStr);
  const lp = lifePathNumber(dobStr);
  const pDay = personalDayNumber(dobStr, date);
  const base = m => (m === 11 ? 2 : m === 22 ? 4 : m === 33 ? 6 : m);
  const friendly = HARMONY[base(lp)].filter(n => n !== base(lp));
  return { mulank, bhagyank, lifePath: lp, personalDay: pDay, friendly,
    d: NUMBER_DATA[lp], colour: NUMBER_DATA[bhagyank] ? NUMBER_DATA[bhagyank].colours[0] : null };
}

/* ============================================================
   SUN NUMBER — day + month of birth: the "outer" you that
   people meet before they know you (the blend of sun-sign
   season and birth date)
   ============================================================ */
function sunNumber(dobStr) {
  const dob = parseDOB(dobStr); if (!dob) return null;
  return reduceNumber(dob.day + dob.month, false);
}

/* ============================================================
   KARMIC DEBT NUMBERS — 13, 14, 16, 19
   Checked in the raw (pre-reduction) sums of the date and name
   ============================================================ */
const KARMIC_DEBT_DATA = {
  13: { title: "The Debt of Work", theme: "shortcuts and laziness in a past life",
    meaning: "Thirteen carries the unfinished lesson of effort dodged. In this life, things inexplicably take longer than they should until the work is done honestly and completely.",
    remedy: "Do the boring thing, fully, every time. Keep a strict routine for 40 days at a stretch; finish tasks you start, however small. Organise your desk, your accounts, your word." },
  14: { title: "The Debt of Moderation", theme: "excess and abuse of freedom in a past life",
    meaning: "Fourteen is the debt of overindulgence — freedom used without responsibility. Watch restlessness, over-commitment and escape habits that quietly cost more than they give.",
    remedy: "Moderation as a spiritual practice: one glass where you'd take three, one project finished before the next begins. Physical discipline — regular sleep, measured spending — repays this debt fastest." },
  16: { title: "The Debt of the Ego", theme: "abuse of love or position in a past life",
    meaning: "Sixteen is the fallen tower: sudden upheavals that rebuild the self on humbler ground. Old certainties collapse so a truer structure can rise.",
    remedy: "Practise humility deliberately — ask for help, admit error early, serve someone with nothing to gain. Build (or rebuild) one honest relationship at a time." },
  19: { title: "The Debt of Power", theme: "selfish use of strength in a past life",
    meaning: "Nineteen is the debt of the lone ruler — success hoarded, help refused. This life asks you to learn interdependence the hard way: things stall until others are included.",
    remedy: "Ask for help twice a week, even when you don't need to. Share credit loudly and publicly. When you lead, carry someone behind you on purpose." }
};
function karmicDebts(name, dobStr) {
  const found = [];
  const push = (pos, raw, label) => {
    if (KARMIC_DEBT_DATA[raw]) found.push({ pos, raw, label });
  };
  if (dobStr) {
    const dob = parseDOB(dobStr);
    if (dob) {
      push("Birth day", dob.day, "the day you were born, unreduced");
      push("Whole-date total", digitSum(`${dob.day}${dob.month}${dob.year}`), "sum of the full date before reduction");
      push("Birth-year total", digitSum(dob.year), "the year's digits summed");
    }
  }
  if (name && name.replace(/[^a-zA-Z]/g, "").length >= 2) {
    push("Full-name total", letterTotal(name, "all"), "Chaldean sum of the whole name");
    push("Vowel total", letterTotal(name, "vowels"), "the Soul Urge sum");
    push("Consonant total", letterTotal(name, "consonants"), "the Personality sum");
  }
  return found;
}

/* ============================================================
   HOUSE NUMBER / ADDRESS — vibrational reading of a home or
   office address, with classical remedies
   ============================================================ */
const HOUSE_REMEDY = {
  1: { vibe: "independent, busy, forward-driving — a house of careers and new starts",
    remedy: "Soften with plants, rounded furniture and warm textures; the 1 home tends all-work. Paint the entrance a warm tone to keep it welcoming." },
  2: { vibe: "gentle, emotional, restful — a home for couples and quiet conversation",
    remedy: "Keep it light and social: host often, and fix the little repairs fast — a 2 home absorbs neglect personally." },
  3: { vibe: "joyful, social, creative — a house of gatherings and noise",
    remedy: "Create one quiet corner for retreat; a 3 home can burn out quieter residents. Keep art and music in it generously." },
  4: { vibe: "stable, orderly, hardworking — a house of routine and foundations",
    remedy: "Schedule delight on purpose: weekly family dinners, plants in every room. The 4 home forgets to celebrate unless reminded." },
  5: { vibe: "restless, social, ever-changing — a hub of movement and guests",
    remedy: "Anchor it: heavy curtains, a fixed meditation corner, one room that never changes. Travel often so the house doesn't travel without you." },
  6: { vibe: "warm, nurturing, beautiful — the classic family home",
    remedy: "Guard the boundaries: a 6 home collects dependents. Keep the guest room and the diary from overflowing." },
  7: { vibe: "quiet, studious, private — a retreat for study and rest",
    remedy: "Invite people in deliberately; the 7 home can drift into isolation. A water feature or aquarium is the classical addition." },
  8: { vibe: "ambitious, prosperous, status-conscious — a house of careers and money",
    remedy: "Keep the accounts and paperwork of the house impeccable, and leave work outside the dining room. A 8 home rewards order and punishes clutter." },
  9: { vibe: "generous, open, community-facing — a house where everyone gathers",
    remedy: "Fix the front door and gate first — the 9 home's generosity flows through its entrance. Regularly declutter what others leave behind." }
};
function houseAnalysis(addr) {
  const digits = addr.replace(/\D/g, "");
  const letters = addr.replace(/[^a-zA-Z]/g, "");
  if (!digits && letters.length < 2) return null;
  let num = null, sum = null, reduced = null;
  if (digits.length) {
    num = digits;
    sum = digitSum(digits);
    reduced = reduceNumber(sum, false);
  }
  const nameNo = letters.length >= 2 ? destinyNumber(letters) : null;
  return { num, sum, reduced, nameNo };
}

/* ============================================================
   ORIGIN & MASTER — nature vs direction, a growth reading
   Origin (Mulank) = the self you start as.
   Master (Bhagyank) = the self life steers you toward.
   ============================================================ */
function originMaster(dobStr) {
  const origin = mulankNumber(dobStr), master = bhagyankNumber(dobStr);
  if (origin === null) return null;
  const same = origin === master;
  const harmony = HARMONY[origin].includes(master);
  return { origin, master, same, harmony,
    relation: same ? "aligned" : harmony ? "supported" : "stretch" };
}

/* ============================================================
   VEHICLE NUMBER — plate digit total vs birth numbers
   ============================================================ */
function vehicleAnalysis(plate) {
  const digits = plate.replace(/\D/g, "");
  if (digits.length < 3) return null;
  const total = digitSum(digits);
  const reduced = reduceNumber(total, false);
  return { digits, total, reduced, saturn: reduced === 8 };
}

/* ============================================================
   LUCKY DATES — best dates in a month for this person
   ============================================================ */
const P_DAY_TAG = {
  1: "Launch & begin", 2: "Love & nurture", 3: "Create & pitch",
  4: "Organise & sign", 5: "Travel & network", 6: "Home, family & money",
  7: "Study & rest", 8: "Money & negotiate", 9: "Complete & give"
};
function luckyDates(dobStr, year, month /* 0-based */) {
  const mul = mulankNumber(dobStr), bha = bhagyankNumber(dobStr), lp = lifePathNumber(dobStr);
  if (mul === null) return null;
  const base = x => (x === 11 ? 2 : x === 22 ? 4 : x === 33 ? 6 : x);
  const out = [];
  const days = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    const pDay = personalDayNumber(dobStr, date);
    let score = 0;
    if (pDay === lp) score += 3;
    if (pDay === mul || pDay === bha) score += 2;
    if (HARMONY[base(mul)].includes(pDay)) score += 1;
    out.push({ d, pDay, score, tag: P_DAY_TAG[pDay] });
  }
  out.sort((a, b) => b.score - a.score || a.d - b.d);
  return { best: out.slice(0, 6), all: out };
}

/* ============================================================
   LUCKY COLOURS — permanent set + today's colour + avoid
   ============================================================ */
function luckyColours(dobStr, date = new Date()) {
  const mul = mulankNumber(dobStr), lp = lifePathNumber(dobStr);
  if (mul === null) return null;
  const primary = NUMBER_DATA[mul].colourNames;
  const support = HARMONY[mul].filter(n => n !== mul).map(n => NUMBER_DATA[n].colourNames[0]);
  const pDay = personalDayNumber(dobStr, date);
  const wp = WEEKDAY_PLANETS[date.getDay()];
  const avoid = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .filter(n => n !== mul && !HARMONY[mul].includes(n))
    .slice(0, 2).map(n => NUMBER_DATA[n].colourNames[0]);
  return { mul, lp, primary, support, today: NUMBER_DATA[pDay].colourNames[0],
    todayFor: pDay, wp, avoid };
}

/* ============================================================
   BABY NAME NUMEROLOGY — candidate names vs the child's numbers
   ============================================================ */
function babyNameCheck(dobStr, name) {
  const mul = mulankNumber(dobStr), bha = bhagyankNumber(dobStr);
  const nameNo = destinyNumber(name);
  const base = x => (x === 11 ? 2 : x === 22 ? 4 : x === 33 ? 6 : x);
  const nb = base(nameNo); // harmony table runs 1-9; masters read at their base value
  const mulOk = HARMONY[mul].includes(nb) || nb === mul;
  const bhaOk = HARMONY[bha].includes(nb) || nb === bha;
  const score = 55 + (mulOk ? 22 : 0) + (bhaOk ? 22 : 0);
  return { mul, bha, nameNo, mulOk, bhaOk, score,
    verdict: mulOk && bhaOk ? "strong" : mulOk || bhaOk ? "workable" : "avoid" };
}
function luckyAlphabets(dobStr) {
  const mul = mulankNumber(dobStr), bha = bhagyankNumber(dobStr);
  if (mul === null) return null;
  const good = {};
  for (const [ch, v] of Object.entries(CHALDEAN)) {
    if (v === mul || v === bha || HARMONY[mul].includes(v)) {
      (good[v] = good[v] || []).push(ch);
    }
  }
  return { mul, bha, groups: Object.entries(good).sort((a, b) => (b[0] === String(mul) ? 1 : 0) - (a[0] === String(mul) ? 1 : 0) || a[0] - b[0]) };
}

/* ============================================================
   REMEDY FINDER — gemstone & rudraksha by ruling number
   ============================================================ */
const RUDRAKSHA = {
  1: { mukhi: "1-mukhi (Ek Mukhi)", planet: "Sun", benefit: "clarity, leadership, freedom from over-attachment" },
  2: { mukhi: "2-mukhi (Do Mukhi)", planet: "Moon", benefit: "emotional balance, harmony in relationships" },
  3: { mukhi: "5-mukhi (Paanch Mukhi)", planet: "Jupiter", benefit: "wisdom, health, all-round growth — the safest everyday bead" },
  4: { mukhi: "8-mukhi (Aath Mukhi)", planet: "Rahu", benefit: "removing obstacles, focus through confusion" },
  5: { mukhi: "4-mukhi (Chaar Mukhi)", planet: "Mercury", benefit: "communication, study, sharp thinking" },
  6: { mukhi: "6-mukhi (Chheh Mukhi)", planet: "Venus", benefit: "love, creativity, prosperity" },
  7: { mukhi: "9-mukhi (Nau Mukhi)", planet: "Ketu", benefit: "protection, letting go of fear" },
  8: { mukhi: "7-mukhi (Saat Mukhi)", planet: "Saturn", benefit: "discipline, sustained prosperity — the Lakshmi bead" },
  9: { mukhi: "3-mukhi (Teen Mukhi)", planet: "Mars", benefit: "courage, energy, burning away anger" }
};

/* ============================================================
   GEMATRIA — Hebrew-tradition letter values (A=1…Z=800)
   Not Chaldean numerology; offered for esoteric comparison.
   ============================================================ */
const GEMATRIA = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:10, K:20, L:30, M:40, N:50, O:60, P:70, Q:80, R:90,
  S:100, T:200, U:300, V:400, W:500, X:600, Y:700, Z:800
};
function gematriaAnalysis(word) {
  const clean = word.toUpperCase().replace(/[^A-Z]/g, "");
  if (clean.length < 2) return null;
  const letters = clean.split("").map(ch => ({ ch, v: GEMATRIA[ch] }));
  const total = letters.reduce((a, l) => a + l.v, 0);
  const root = reduceNumber(total, false);
  return { clean, letters, total, root };
}

/* ============================================================
   BIRTHDAY GIFT — the meaning of the day of the month (1-31)
   ============================================================ */
const DAY_GIFT = {
  1: "A natural first-mover; you'd rather lead badly than follow well.",
  2: "The diplomat — you read rooms before you enter them.",
  3: "Born with a story to tell; charm is your first language.",
  4: "The builder — you trust what can be stacked, measured and repeated.",
  5: "A restless explorer; five senses, and all of them impatient.",
  6: "The caretaker — beauty and responsibility arrive at your door uninvited.",
  7: "The thinker; your gift is a mind that refuses surfaces.",
  8: "Born for scale — money, power and outcomes are your homework.",
  9: "The old soul; you arrived already worried about everyone else.",
  10: "Independent and inventive — the 1's drive with the 0's amplification.",
  11: "Master day — intuition so loud it can feel like nervousness.",
  12: "The expressive organiser; you make structure sound like fun.",
  13: "The practical reformer — takes a messy inheritance and fixes it.",
  14: "Freedom with a briefcase; versatile, curious, easily bored.",
  15: "The magnetic one — money and affection both find you easily.",
  16: "The reflective builder; breaks things down before building them up.",
  17: "The executive mind with an artist hiding inside it.",
  18: "The idealist with a work ethic; leadership through service.",
  19: "The pioneer prince — self-made energy, learns sovereignty early.",
  20: "The sensitive power-behind-the-throne; partnerships are your medium.",
  21: "The social creator; charm plus ideas equals doors opening.",
  22: "Master day — the master builder turns dreams into institutions.",
  23: "The cheerful communicator; people and luck both take your calls.",
  24: "The harmonious builder; family, craft and care in one package.",
  25: "The spiritual analyst — learns by travel, testing and thinking.",
  26: "The business humanitarian; looks after people and ledgers together.",
  27: "The philosophical doer — acts first, questions everything later.",
  28: "The independent cooperator; needs a partner, refuses a leash.",
  29: "The intensifier — deep feelings, high standards, powerful intuition.",
  30: "The joyful creator; optimism with an artistic streak.",
  31: "The practical optimist — a doer whose plans actually finish."
};

/* ============================================================
   Shared chrome: nav + footer injected on every page
   ============================================================ */
const NAV_LINKS = [
  ["index.html", "Home"], ["calculators.html", "Calculators"],
  ["core5.html", "Core 5"], ["chart.html", "Chart"],
  ["business.html", "Business"], ["forecast.html", "Forecasts"],
  ["reports.html", "Reports"], ["about.html", "About"], ["contact.html", "Contact"]
];
function renderChrome() {
  const here = location.pathname.split("/").pop() || "index.html";
  const nav = document.getElementById("main-nav");
  if (nav) {
    nav.setAttribute("aria-label", "Primary");
    nav.innerHTML = NAV_LINKS.map(([href, label]) =>
      `<a href="${href}" class="${here === href ? "active" : ""}">${label}</a>`).join("");
  }
  const burger = document.getElementById("nav-burger");
  if (burger && nav) {
    burger.setAttribute("aria-expanded", "false");
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  const foot = document.getElementById("site-footer");
  if (foot) {
    foot.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">अ</div>
          <p style="max-width:30ch">Chaldean numerology readings, calculators and daily guidance — computed privately in your browser.</p>
        </div>
        <div><h4>Explore</h4>
          <a href="core5.html">Core 5 Reading</a>
          <a href="chart.html">Chart Generator</a>
          <a href="calculators.html">Free Calculators</a>
          <a href="business.html">Business Name Analysis</a>
          <a href="forecast.html">Practical Forecasts</a>
          <a href="daily.html">Daily Forecast</a>
          <a href="reports.html">Paid Reports</a></div>
        <div><h4>Learn</h4>
          <a href="about.html">About Numro Anka</a>
          <a href="about.html#how">How It Works</a>
          <a href="about.html#faq">FAQ</a>
          <a href="contact.html">Contact</a></div>
        <div><h4>Numbers</h4>
          <a href="calculator.html#meanings">Number Meanings</a>
          <a href="calculator.html">Full Chart</a>
          <a href="compatibility.html">Love Compatibility</a>
          <a href="daily.html">Lucky Colours</a>
          <a href="reports.html">Pricing</a></div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Numro Anka · numroanka.com. For reflection and entertainment.</span>
        <span>Made with the Chaldean tradition · अंक</span>
      </div>
    </div>`;
  }
}
document.addEventListener("DOMContentLoaded", renderChrome);

/* ---------- helpers shared across pages ---------- */
function fmtDOB(dobStr) {
  const d = parseDOB(dobStr);
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return d ? `${String(d.day).padStart(2,"0")} ${MONTHS[d.month-1]} ${d.year}` : "";
}
function esc(s) {
  return String(s)
    .split("&").join("&" + "amp;")
    .split("<").join("&" + "lt;")
    .split(">").join("&" + "gt;")
    .split('"').join("&" + "quot;")
    .split("'").join("&" + "#39;");
}
