# The Money Page Playbook — Crafting Rankable, AI-Citable Pay-Per-Call Pages

Researched and written 2026-10-23. This is the strategy document behind an eventual SOP/skill for
generating every page on every EMD/hub site this project builds. Read `CLAUDE.md` first for the
business model and existing data architecture — this document assumes that context.

## 1. The core tension, and how this project already half-solves it

Two bodies of research pull in opposite directions, and reconciling them is the whole game:

- **Google's own 2026 enforcement reality**: location pages that read identically after swapping
  the city name are the textbook definition of a "doorway page" / scaled-content-abuse violation.
  Multiple current sources describe a **site-wide quality demotion risk** — a large share of thin,
  templated pages can drag down the whole domain, not just the thin pages themselves. The
  consistent practitioner advice is "fewer, stronger pages" over "many thin pages."
- **This business model's whole premise**: one EMD/page per niche × city, at a scale of thousands
  of candidate locations.

**The Hub & Spoke architecture already built in this project (`ReVerified Niches/`) is the
resolution to this tension, not just a revenue-ranking convenience.** Consolidating 20+ thin
single-city opportunities into one real multi-city hub site (County → Metro/CBSA → Adjacency)
directly produces the "fewer, stronger pages" outcome Google's own enforcement rewards — each hub
page can legitimately discuss a real metro area with real shared context (one service area, one
set of nearby landmarks, one climate/seasonal pattern), rather than being a copy-pasted shell with
only the city name changed. **Treat every hub's city list as the page's genuine, defensible scope
— not as a list to be hidden, but as the actual service-area promise the page makes.**

## 2. Page architecture: Service → Sub-Service → Location

### 2.1 Don't guess which sub-services deserve their own page — the data already answers this

This project's own Ahrefs screenshot extraction already captured the **real query volume behind
each sub-intent**, as a side effect of building the prefix-matching logic for each niche (e.g. AC
Repair's extracted CSV: 2,685 "ac repair" + 850 "emergency ac repair" + 282 "commercial ac repair"
+ 148 "home ac repair" + 148 "ductless ac repair" + 144 "central ac repair" + 130 "residential ac
repair" + 116 "same day ac repair" distinct keyword instances — real counted intent, not a guess).
**Before building sub-service pages for any niche, re-run that niche's prefix-frequency count**
(the same method used in `Pipeline Scripts/keyword_match_lib.py`'s `HOME_PREFIXES` construction)
and only build a dedicated sub-service section/page for a prefix with enough real volume to earn
it. This avoids the exact trap of building pages nobody searches for — the central discipline of
this whole project, now applied to content instead of city selection.

### 2.2 The three-tier hierarchy

1. **Hub page** (one per Hub & Spoke cluster): the main money page. Covers the primary niche for
   the whole service area (e.g. "AC Repair — Maricopa County, AZ"). This is the page that gets
   the domain's primary EMD treatment and the bulk of the internal links.
2. **Sub-service sections on the SAME page** (not separate URLs) for sub-intents confirmed by step
   2.1 that don't have enough volume to stand alone, but are real enough to deserve explicit
   treatment (headed sections: "Emergency AC Repair," "Ductless Mini-Split Repair," "Commercial AC
   Repair") — this is also exactly what the GEO research below wants: well-organized subheadings
   that an AI Overview can extract independently of each other from the same page.
3. **Dedicated sub-service pages**, only when a sub-intent clears its own volume bar AND has
   genuinely different content to offer (different pricing, different process, different urgency
   profile — e.g. "Emergency AC Repair" genuinely differs in urgency/CTA framing from "AC
   Maintenance Plans," which is a scheduled, non-urgent, different-buyer-intent page). Internally
   link these back to the hub page and to each other — this is the "pillar and cluster" model every
   current source recommends, and it mirrors the Hub & Spoke geographic pattern at the content
   level: **hub = pillar, sub-service pages = cluster, both consolidate rather than fragment.**

### 2.3 Per-city differentiation within a hub page (the doorway-page defense)

Every member city of a hub must appear with **something genuinely different from every other
member city**, or the page risks being read as a disguised doorway page even though it's legitimately
one service area. Sources for genuine per-city differentiation, all of which this project already
has on hand or can cheaply obtain:
- **Population, county, and metro context** (already in every niche's extracted row) — "serving
  Mesa and the other 15 cities of Maricopa County" reads as a real claim, not filler.
- **The exact Ahrefs-matched query and its real volume/KD per city** — can be surfaced as an
  honest "how people search for this near you" element, which is also genuinely unique content.
- **Collision/competitive context** — if a city's own name collides with a bigger national city
  (the project's own collision-detection logic), that's actually a reason to be MORE specific and
  locally-grounded in that city's copy, not less, since generic copy is what a confused searcher
  (and a confused AI Overview) can't disambiguate.
- **Climate/seasonal framing per region** (e.g. AC Repair urgency copy differs for Phoenix AZ
  summer heat vs. a more moderate-climate city) — cheap to source from public NOAA climate normals
  per county, and this is exactly the kind of "information gain" content this project's existing
  SITE_BUILD_STANDARDS.md "Micro-Authority EMD Rule Book" treatment already mandates project-wide.

## 3. Page template (money page skeleton)

Answer-first, because **AI Overviews pull from whichever section of whichever page answers most
directly** — a vague scene-setting intro paragraph is pure cost with no GEO benefit.

1. **H1**: primary keyword + hub/location name, exact match to how the query is actually phrased
   (reuse the "Exact Ahrefs Query Matched" value already captured per niche — it's the real
   phrasing, not a guess).
2. **First ~150-200 words, answer-first**: what the service is, who it's for, the service area
   (named cities), and a direct call to action. This block is what gets lifted into an AI Overview
   or a ChatGPT/Perplexity citation — it must stand alone and be unambiguous about the entity
   (business name, service, area) without requiring the rest of the page for context.
3. **Trust/urgency strip immediately below the fold-line**: review rating + count, years in
   business or licensing, a visible phone number, and (critically for this project's pay-per-call
   model) a **sticky click-to-call element** that persists on scroll — mobile is 60-70%+ of this
   traffic per current research, and tap-to-call is the actual conversion event being monetized.
4. **Sub-service sections** (per 2.2), each with its own H2, each independently answer-first
   (an AI engine may extract just this section, so it can't depend on earlier page context).
5. **Service-area / city list section**: the hub's member cities, framed with the genuine
   per-city differentiation from 2.3, not a bare list.
6. **Pricing/process transparency block**: current research is consistent that pricing context
   (even a range) measurably helps both human trust and AI-citation odds (specificity and
   evidence-backed claims are the single most repeated GEO lever across every source checked).
7. **FAQ section, schema-marked**: directly answers the actual long-tail variants already captured
   in this niche's Ahrefs/GKP data (another place to reuse already-collected real query data
   instead of guessing questions).
8. **Second CTA + trust repeat** at the bottom, for the scroll-all-the-way-down reader.

## 4. Technical requirements (non-negotiable, checked before any page goes live)

- **Server-rendered HTML, not client-side-only.** Current research: an estimated 69% of AI
  crawlers do not execute JavaScript. A JS-only templated site is invisible to most AI citation
  sources even if it ranks fine in classic Google search. Static-generated or server-rendered
  output only.
- **`robots.txt` must explicitly allow `OAI-SearchBot`** (governs ChatGPT Search citation
  eligibility) and should not block `GPTBot` unless there's a deliberate reason to opt out of
  future training-data inclusion — these are two separate bots serving two separate purposes, don't
  conflate them when writing the rule.
- **Schema markup, JSON-LD**: `LocalBusiness` (or the most specific subtype available) on the hub
  page, `Service` schema on each dedicated sub-service page, matching exactly what's visibly on
  the page — never marking up anything not shown to the user (a direct manual-action risk).
  `FAQPage` schema on the FAQ block.
- **Entity consistency**: business name, phone number, and service name must be byte-identical
  across the page, the schema markup, the GBP listing (if any), and any citation/directory profile
  — repeatedly cited as a GEO factor (entity disambiguation is how an AI engine decides you're a
  real, single, trustworthy entity rather than a content farm).
- **Freshness signal**: a visible "last verified/updated" date, genuinely updated when pricing or
  service details change — one cited (vendor-reported, unverified-primary-source) figure claims
  roughly half of AI-cited content is under 13 weeks old; directionally, stale pages are a real
  disadvantage for AI citation even if their classic-SEO rank hasn't moved.
- **llms.txt**: optional, cheap to add, but current evidence says it has no measured effect on
  major crawlers yet (Google's own Gary Illyes has said Google doesn't use it). Don't spend real
  design effort here — a basic one is fine, don't treat it as a priority lever.

## 5. What NOT to do (the failure modes this research directly warns against)

- Do not generate a page by swapping only the city name in an otherwise-identical template — this
  is the exact, named Google enforcement target in 2026 and the exact thing Hub & Spoke exists to
  avoid at the site level; the same discipline must carry into the content level.
- Do not build a dedicated sub-service page for a sub-intent with no real volume behind it — reuse
  this project's own collected Ahrefs frequency data to gate that decision, never guess.
- Do not let a "fewer, stronger pages" instinct become "one generic page with no location
  specificity" — the goal is fewer pages that are each more substantive, not less substantive.
- Do not mark up schema fields that aren't genuinely, visibly true on the page.
- Do not rely on an EMD alone to rank — current consensus is domain keywords are now a minor
  contextual/CTR signal, not a ranking force; the page content quality above is what actually
  carries the page now.

## 6a. The full matrix (Service × Sub-Service × Location) — addendum, 2026-10-23

The user's explicit requirement: for a hub of N locations with M real sub-services, the **main
service must independently rank for all N locations, AND each of the M sub-services must
independently rank for all N locations too** — i.e. the full matrix, not a single consolidated hub
page. This is a legitimate, more aggressive architecture than section 2 describes, and it is
**achievable without doorway-page risk, but only under a strict uniqueness discipline** — the
margin for error shrinks as page count grows, and there's a real documented failure case to
respect: a regional HVAC firm's "hundreds of near-identical suburb pages" lost rankings and only
recovered by consolidating, per a reported case study. **Scale itself is not the violation — Google
and practitioner consensus agree a large matrix can be entirely legitimate if every page clears a
real uniqueness bar. The failure mode is always thin/duplicate content, never raw page count.**

### The two gates every matrix cell must clear before it gets built

1. **Demand gate**: build a dedicated page for `{sub-service} × {location}` only if that exact
   combination has real, independently confirmed search intent — reuse this project's own captured
   Ahrefs/GKP data per niche (already gathered, see section 2.1) rather than assuming every cell of
   the matrix deserves a page. A sub-service with no real per-city volume becomes a **section on the
   main service page for that city** instead of its own URL (see section 2.2's tier 2) — this alone
   prunes a meaningful fraction of a naive full matrix down to the cells that are actually worth it.
2. **Uniqueness gate**: every page that does get built must score below a textual-overlap ceiling
   against every sibling page in its row and column (same sub-service, different location; same
   location, different sub-service) — one vendor source puts the danger threshold around 75%
   overlap (unverified as a Google-sourced number, but directionally the right target: treat
   anything above ~60-65% overlap as needing more unique material before publishing, not as already
   safe). This is a **mechanical, checkable gate**, not a vibe — see section 13 below for the exact
   check.

### What makes each matrix cell genuinely different (not just a template with two variables swapped)

- **Location axis** (holding sub-service fixed): population/county/metro context, climate/seasonal
  framing, the row's actual collision status and exact matched query, nearby-landmark or
  neighborhood specificity — all per section 2.3, all already available or cheap to source per city.
- **Sub-service axis** (holding location fixed): genuinely different process, pricing driver,
  urgency profile, and FAQ set per sub-service — "Ductless Mini-Split Repair" should describe a
  materially different job (different equipment, different price band, different typical symptom
  list) than "Central AC Repair," not the same paragraph with one noun swapped.
- **Both axes together**: the combination itself is the uniqueness lever — "Emergency AC Repair in
  Surprise, AZ" earns a different urgency framing (Phoenix-metro summer heat, specific to Surprise's
  climate data) than "Emergency AC Repair in Spokane, WA" would, even though both are the same
  sub-service. This is the real reason a full matrix CAN work: the cross of two genuinely-varying
  axes produces much more real variance per page than varying either axis alone.

### Internal linking direction (hub-and-spoke content silo, corrected per current practice)

Rigid, isolated silos are now considered outdated — the current consensus model is hub-and-spoke
with semantic (not folder-structure) organization: **the main-service pillar page links DOWN to
each sub-service's own pillar page, never directly to the deepest location-level pages; each
sub-service pillar then links down to its own set of location pages; location pages link back UP
through their sub-service pillar and sideways to the other sub-services available in that same
city.** This keeps the hierarchy legible to both users and AI crawlers (which is itself a semantic
signal — the link graph tells the engine which pages are pillars vs. detail) while still letting a
user (or a crawler) reach any page within 2-3 clicks. Minimize cross-linking between different
niches/hubs unless genuinely topically related (e.g. "Water Damage Cleanup" and "Black Mold
Remediation" are legitimately related and may cross-link; "AC Repair" and "Gutter Installation" are
not and should not cross-link just because they share a city).

## 7. Schema stack — corrected and expanded (don't just throw every schema type at it)

**Corrected 2026-10-23** against Google's own live LocalBusiness documentation (fetched directly,
not paraphrased) after the Research Material review surfaced a conflict — see section 14.3 for the
full reasoning. The short version: the previous version of this section recommended `LocalBusiness`
with no `streetAddress`, sourced from SEO-blog folklore about "service-area businesses." **Google's
actual structured-data page lists `address` (a full `PostalAddress`) as a REQUIRED property of
`LocalBusiness`, with no documented exception for service-area businesses, no `areaServed`-only
alternative, and no mention of `hideLocalBusinessAddress` or any similar flag.** That exception
exists for the separate **Google Business Profile** product (which this project has already
correctly ruled out — no GBP for this business, per `CLAUDE.md`), not for the `LocalBusiness`
schema.org type. Since this project has no genuine street address and will never fabricate one (the
single most repeated prohibition across every Research Material document — see section 14), using
`LocalBusiness` here would mean either shipping it without a required property (undefined
eligibility, not a clean pass) or inventing an address (an absolute, non-negotiable violation).
**`LocalBusiness` is therefore dropped entirely from this project's schema stack.**

- **Use**: `Organization` (the one entity node, anchoring brand name, URL, logo, and the one real
  `telephone`/`ContactPoint` this project actually has — no address claimed, none needed),
  `Service` (on every sub-service page and the hub/main-service page, describing that specific
  offering, with `areaServed` listing the real member cities — this is the correct, honest way to
  express "we serve this area" without implying a fixed physical location), `BreadcrumbList`
  (encoding the exact service → sub-service → location hierarchy — also a direct, mechanical way to
  signal the silo structure to a crawler), `FAQPage` (sourced from real captured query variants, per
  niche, per sub-service — see the FAQ rich-result caveat below). **All of these should live inside
  one unified `@graph` block in a single `<script type="application/ld+json">` tag, cross-referenced
  by stable `@id` values** (adopted directly from the Master Specification document, section 14.2 —
  this is a genuinely better engineering pattern than scattering separate schema tags, and several
  of the Research Material documents independently warn against "conflicting duplicate graphs from
  themes, plugins and custom code").
- **`FAQPage` — corrected expectation, not a rejection**: verified directly against Google's own
  Search Central blog (`developers.google.com/search/blog/2023/08/howto-faq-changes`, August 2023):
  Google did not remove FAQ rich results outright, it **restricted the visible rich-result snippet
  to "well-known, authoritative government and health websites" only** — for every other site type
  (including this one), the rich result will not show, but Google's own post explicitly says the
  markup causes no harm and there's no need to remove it. **Keep `FAQPage` markup** — it costs
  nothing, it's a real, honest description of real on-page content, and the FAQ answers themselves
  (plain, complete, self-contained sentences) are what actually gets lifted by AI Overviews, Ask
  Maps, and chatbot citations regardless of whether the rich snippet itself ever shows. Just don't
  promise or expect the blue-accordion SERP snippet — that part is genuinely gone for a site like
  this one. (One SEO-blog claim seen during this research, that Google "removed FAQ rich results in
  May 2026," could not be verified against any Google source and should be treated as unverified
  folklore, not fact — the 2023 government/health restriction is the real, sourced event.)
- **`Speakable` (`SpeakableSpecification`) — include, but with correct, lowered expectations.** The
  Master Specification document prescribes it; checked directly against available current sources:
  Google's own Speakable documentation still carries an explicit **beta label** (unchanged since the
  2018 launch), eligibility is still narrowly scoped to **English-language Google Home/Assistant
  users, primarily for news-style content**, and it never reached general release for any other
  content type or surface. There is no confirmed evidence any major AI assistant (ChatGPT, Perplexity,
  Google's own AI Overviews) actually reads or weights this markup for citation purposes — that claim
  circulates in 2026 SEO-blog content but has no Google-sourced confirmation. **Verdict: include it
  (it's cheap, valid, non-fabricated markup pointing at real, genuinely-speakable content — the AEO
  summary block and the H1), but do not present it to anyone as a confirmed AI-citation or voice-
  search lever. It is a harmless, zero-downside inclusion with unproven current upside**, not the
  schema-domination silver bullet the Master Specification's confident tone implies.
- **Do NOT use**: `LocalBusiness` (see above — the actual reason, corrected from the prior vendor-
  folklore reasoning). `HowTo` — Google stopped showing HowTo rich results in search as of 2023; no
  confirmed current benefit, and it requires describing the page as a step-by-step tutorial, which
  these pages genuinely aren't. `Review`/`AggregateRating` — **confirmed twice over**: Google's own
  documentation restricts this to "sites that capture reviews about other local businesses," and
  every one of the four newly-read Research Material documents independently repeats the same
  prohibition in their own words ("NEVER generate fake customer reviews... unless explicitly reading
  from a verified, populated first-party user review table" — Master Spec; "Never fabricate...
  reviews" — all three others). This project has no first-party review mechanism at launch. Do not
  add this schema type until one genuinely exists.
- **Verify before relying on anything beyond this list**: schema advice from vendor blogs restates
  the same basics without a cited current Google source — cross-check against Google's own Search
  Central structured-data documentation before implementing it. This section itself was corrected
  once already (the `LocalBusiness` reversal above) by doing exactly that — a direct, cautionary
  example of why this rule exists.

## 8. AEO and GEO — two distinct plays, both required, don't treat them as one thing

They share the same underlying content fundamentals but target different surfaces:
- **AEO (Answer Engine Optimization)** competes for the single, short answer slot — a direct
  question-and-answer format, FAQ blocks, a definition-led opener. **Build this INTO every
  location/sub-service page** — this is the "answer-first 150-200 words" from section 3, applied
  at the granularity of the matrix cell's own specific query, reusing the project's own exact
  captured query phrasing rather than a generic rephrasing.
- **GEO (Generative Engine Optimization)** targets being cited inside a longer, generated answer —
  this favors broader, more authoritative content: comparison pages ("Central AC vs. Ductless Mini-
  Split: Which Needs Repair More Often"), topic-pillar content that covers the full entity graph of
  the niche (symptoms, causes, typical costs, common brands, when to repair vs. replace), not just
  the bare transactional keyword. **Build this as the main-service and sub-service PILLAR pages**
  (the hub-level content, one level up from the individual location cells) — pillars are naturally
  the right altitude for this kind of broader authority content, and it reinforces rather than
  duplicates the narrower AEO content sitting underneath them in the silo.
- Practical rule of thumb from current sources: start taking GEO seriously once a niche has 50+
  commercial-intent pages live and/or its query set is dominated by comparison-style searches —
  exactly the scale this project's matrices reach quickly.

## 9. Semantic SEO / entity coverage — cover the topic, not just the keyword

Current consensus: **topical coverage of the full entity graph matters more than hitting an
arbitrary page or word count.** For each niche, before writing any copy, map out the real entity
graph once (reusable across every location instantiation): common symptoms/failure modes, typical
causes, relevant equipment/brand names (already surfacing in this project's own Ahrefs data — e.g.
AC Repair's extracted keywords already show Carrier, Lennox, Trane, Rheem, Goodman, Daikin, American
Standard as real brand-specific query variants), typical price drivers, repair-vs-replace decision
factors, and the realistic FAQ set. This becomes the shared semantic skeleton that every location
instantiation of a sub-service page fleshes out with location-specific detail (section 6a) —
**the skeleton is what keeps 10 location pages for the same sub-service topically consistent and
complete; the location-specific flesh is what keeps them textually distinct.** This is also
directly what feeds GEO citation odds (section 8) — genuine entity/topic depth is what a generative
engine is drawing on when it cites a page inside a longer synthesized answer.

## 10. TL;DR blocks — explicit, not implied

Add a visually distinct, explicitly-labeled TL;DR/summary block at the top of every page (service,
sub-service, AND location-cell pages), 2-4 sentences, answering the page's core question directly
with the specific entity names (service, sub-service, city) spelled out — this is a stronger, more
mechanically extractable version of the "answer-first paragraph" from section 3, and should be
checked for standalone comprehensibility (does this 2-4 sentence block make complete sense with
zero other page context? If not, it needs rewriting — an AI engine will frequently lift exactly
this block and nothing else).

## 11. Citations without GBP

Since a GBP listing is correctly off the table for this business model (see standing decision in
`CLAUDE.md`), citations have to come from directories that don't require Google verification:
general business listing sites and niche/industry-specific service directories that accept a
tracking number + service-area + category. This still feeds the citations ranking weight and
reinforces entity-name consistency (brand/service name identical everywhere) — a factor repeatedly
cited for GEO too. **Not yet built — flagged as the concrete next research/execution target**, per
the "available-but-unplanned" levers identified in the prior conversation turn (citations and
link-building, since GBP and reviews are genuinely structurally closed for this model).

## 12. The uniqueness enforcement mechanism (what makes the full matrix actually safe)

A mechanical gate, not a vibe check, run before any page in the matrix is published:
1. Generate the page's full text.
2. Compute textual-overlap percentage against every already-published sibling page (same
   sub-service/different location; same location/different sub-service) — a straightforward
   shingled n-gram or embedding-cosine-similarity check is sufficient, doesn't need to be
   sophisticated.
3. **Gate**: if overlap exceeds the working ceiling (treat ~60-65% as the point to start adding
   more unique material, not ~75% as the first warning line — build in margin below the unverified
   vendor-reported danger threshold), the page does not go live until genuinely new unique material
   (more specific local detail, a more developed sub-service-specific section, additional FAQ
   content) brings it under the ceiling.
4. Log every page's overlap score permanently (a simple running registry) — this becomes the
   dataset that proves, if Google or anyone else ever asks, that this was a deliberate
   differentiation discipline and not a disguised doorway-page operation.
This is the single mechanism that reconciles "build the full service × sub-service × location
matrix" with "never repeat the Manning HVAC doorway-page failure" — scale and safety are not in
tension as long as this gate is real and actually enforced, not aspirational.

## 12a. Correcting earlier claims against primary sources (2026-10-23, deeper research pass)

The first research pass leaned on vendor/agency blogs that mostly restate each other. Going
directly to primary sources changes or sharpens several claims made earlier in this document:

- **The GEO research is real and verifiable — exact citation**: Aggarwal, Murahari, Rajpurohit,
  Kalyan, Narasimhan, Deshpande, **"GEO: Generative Engine Optimization,"** arXiv:2311.09735,
  published at KDD 2024. Confirmed directly from the paper's own abstract: **"GEO can boost
  visibility by up to 40%"** on their GEO-bench benchmark, and critically, **"the efficacy of these
  strategies varies across domains"** — i.e. there is no single universal technique; what works
  depends on the content vertical. (The earlier-cited "41% from adding statistics" figure was a
  secondhand vendor paraphrase, not a number from the paper's own abstract — treat the specific
  per-technique percentages circulating in SEO blogs as unverified until the full paper text is
  checked directly, not just the abstract.)
- **Doorway pages — exact official Google wording** (developers.google.com/search/docs/essentials/
  spam-policies, Google's own Spam Policies page): doorway abuse is defined as pages "created to
  rank for specific, similar search queries" that "lead users to intermediate pages that aren't as
  useful as the final destination." The explicitly listed violation is **"having multiple domain
  names or pages targeted at specific regions or cities that FUNNEL USERS TO ONE PAGE"** (emphasis
  added) — the violation is the funnel/intermediary pattern, not the existence of many genuine
  per-location pages. This is a meaningfully more precise and more favorable reading than the
  vendor paraphrases used earlier: **a full service × sub-service × location matrix where every
  page is itself a real, standalone destination (not an intermediary funneling to one "real" page)
  does not match Google's own definition of a doorway page**, provided section 6a's uniqueness gate
  is genuinely enforced. The separate **scaled content abuse** policy is the one that actually
  governs the risk here: "many pages generated for the primary purpose of manipulating search
  rankings... focused on creating large amounts of unoriginal content that provides little to no
  value to users, no matter how it's created" — this is the policy the uniqueness-gate mechanism
  (section 12) is built to stay clear of, and it's explicitly medium-agnostic (applies "no matter
  how it's created," i.e. manual writing doesn't exempt a page from this policy if the result is
  still unoriginal/low-value).
- **The "GBP = 32% of local ranking" figure has no Google source** — Google's own guidance
  (Google Business Profile Help, Google Maps Help) states local ranking rests on **relevance,
  distance, and prominence**, explicitly declining to give weights: "the algorithm details are
  kept confidential." The 32/19/16/15/8/7% breakdown cited earlier is a third-party vendor survey
  (Whitespark-attributed, repeated uncritically across SEO blogs), not a Google-disclosed number —
  **directionally useful as an industry estimate, but should never be treated as precise or
  official.** The qualitative point it supports (this business model structurally can't compete on
  GBP-adjacent signals) still stands on Google's own plain-language guidance alone, without needing
  the disputed percentage.
- **OpenAI's crawler behavior — exact official documentation**
  (developers.openai.com/api/docs/bots): confirms the two-bot model used in section 4 is correct —
  **GPTBot** governs training-data use, **OAI-SearchBot** governs ChatGPT Search citation
  eligibility, and the two opt-outs are independent (you can allow one while blocking the other).
  Adds one previously-missed detail: **`ChatGPT-User` is a separate, user-triggered-visit agent
  that robots.txt rules may not govern at all** (it fires when a live user asks ChatGPT to visit a
  specific page, not during automated crawling/indexing) — don't rely on a robots.txt rule to
  control this traffic class. OpenAI also publishes **live IP ranges** at
  `openai.com/searchbot.json` and `openai.com/gptbot.json` for server-level verification beyond
  user-agent string checks (user-agent strings alone can be spoofed; IP-range checking is the more
  rigorous verification method, worth using if any bot-gating logic is ever built).
- **Google's official LocalBusiness schema guidance confirms**: use "the most specific LocalBusiness
  sub-type possible," and — important caution for this project specifically — **Review/
  AggregateRating markup is only appropriate "for sites that capture reviews about other local
  businesses"**; a site cannot legitimately mark up review/rating schema about itself if it doesn't
  independently collect and control those reviews. This forecloses any temptation to add review
  schema to these pages without a genuine, independently-collected review mechanism behind it —
  doing so would be marking up a claim Google's own documentation says is ineligible for this
  business type, not just unwise.

**UPDATE 2026-10-23: full paper text verified** (downloaded the PDF and extracted all 17 pages with
`pypdf` directly, since WebFetch cannot parse PDF binaries — don't rely on WebFetch for primary-
source PDFs again, download + extract instead). The per-technique breakdown is now confirmed from
the paper's own Table 1/2/3/4, not a secondhand paraphrase:

**The 9 tested methods, ranked by the paper's own data** (Position-Adjusted Word Count score,
baseline = 19.3):
1. **Quotation Addition — best single method** (27.8, ~41% relative improvement — this is where
   the "41%" figure actually comes from; it's the single best method's result, not a general
   "adding stats gives 41%" claim as some vendor blogs implied).
2. **Statistics Addition** (25.9) — strongest specifically in Law & Government, Debate, and
   Opinion domains.
3. **Fluency Optimization** (25.1) — i.e. writing QUALITY, not just content additions, measurably
   helps. Don't treat GEO as purely "add more evidence" — how well it reads matters comparably.
4. **Cite Sources** (24.9 alone) — **weaker alone than Quotation Addition, but becomes the
   strongest method in combination with others (31.4% average when paired)**. Pair it, don't rely
   on it solo.
5. Technical Terms (23.1), Easy-to-Understand (22.2), Authoritative (21.8) — moderate.
6. **Keyword Stuffing actively UNDERPERFORMS doing nothing** (17.8 vs. 19.3 baseline — worse than
   no optimization at all). **Unique Words**: negligible effect (~20.5, barely above baseline).
7. **Best combination found: Fluency Optimization + Statistics Addition**, outperforming any
   single method by 5.5%+.
8. **"Authoritative" (persuasive/authoritative tone) showed no significant overall improvement** —
   a direct contradiction of a common vendor-blog claim that authoritative tone is a major GEO
   lever. The nuance: it DOES help, but only in specifically argumentative/debate-style domains
   (its top categories are Debate, History, Science) — for straightforward commercial local-
   service pages with no debate framing, **don't prioritize "sound more authoritative" as a GEO
   tactic**; prioritize citations, quotes, statistics, and fluency instead.

**Genuinely important, directly relevant finding**: GEO disproportionately helps **lower-ranked,
smaller sites** — in the paper's own test, applying Cite Sources to a 5th-ranked (low-visibility)
source gave it a **+115.1%** visibility increase, while the SAME method applied to the already-top-
ranked source *decreased* its visibility by -30.3%. The paper explicitly frames this as GEO's
"potential to democratize" visibility for small creators who can't compete on backlinks/domain
authority — this describes this project's exact situation (new, small EMD sites with no backlink
history) more favorably than the general GEO hype suggests, and it's a verified result, not a
vendor claim.

**The honest caveat that matters most for THIS project**: the paper's own benchmark (GEO-bench,
10,000 queries) is **80% informational, only 10% transactional, 10% navigational** — built from
trivia/encyclopedic/debate/essay-style queries (Natural Questions, ELI5, debate prompts, Oxford
essay questions), not commercial local-service searches like "emergency ac repair austin tx."
**None of these verified percentages were tested on transactional, local-service, pay-per-call-
style queries** — applying them to this project's money pages is a reasonable, evidence-informed
extrapolation, not a directly-proven result for this exact content type. Treat the ranked list
above as the best available starting prior, not a guarantee, and weight it accordingly when
designing the quality-gate checklist in section 14 below.

**Methodology caveats worth knowing**: results were generated with `gpt-3.5-turbo` as the backend
model and separately cross-validated on Perplexity.ai (consistent direction: Quotation Addition
+22%, Statistics Addition up to +37% there) — but never validated against Google AI Overviews or
ChatGPT specifically, the two engines most relevant to this project's actual audience. The
"Subjective Impression" sub-metrics are also scored by GPT-3.5 itself (LLM-judging-LLM-output),
a legitimate but known-imperfect evaluation method.

### What this means for the quality-gate checklist (ties directly to the independent-agent testing plan)

Since pages here will be checked by multiple independent agents before templates are finalized,
the verified ranking above converts directly into checkable criteria for those review agents:
1. Does the page cite a real source for any factual claim it makes? (Cite Sources — pair this with
   #2 or #3 below, don't rely on it in isolation per the paper's own combination finding.)
2. Does the page include at least one real, specific statistic (price range, typical job duration,
   local climate/seasonal data, etc.) rather than only qualitative description? (Statistics Addition)
3. Does the page include a genuine quotation (from a credible source, a real FAQ answer framed as
   direct response, or similar)? (Quotation Addition — the single best-performing method)
4. Is the writing fluent and easy to read, not stilted or keyword-dense? (Fluency Optimization)
5. **Negative check**: flag and reject any page that reads as keyword-stuffed (the same phrase
   repeated unnaturally) — this isn't just neutral, the paper shows it actively underperforms a
   page with no optimization at all.
6. Don't bother checking for "authoritative/persuasive tone" as its own criterion — deprioritize it
   given the null overall result; focus review time on 1-4 instead.

## 12b. Learnings from an external reference implementation (github.com/youtube-jono/seo-agent)

Cloned and read in full 2026-10-23 (temporary, not added to this repo). It's a complete Claude Code
command pipeline (`/keyword-research` → `/build-website` → `/blog-post` → `/service-page` →
`/seo-optimization` → `/publish` → `/audit`) for building and ranking real local-service websites.
Substantially more mature than this document's first pass in several places — genuinely corrected
some of what's above, and surfaced one critical mismatch with this project's actual business model.

### What to adopt directly

- **Evidence grading, `[E]`/`[C]`, on every claim.** Their `keyword-strategy.md` tags each claim as
  backed by a published study with stated sample/method, or practitioner convention with none —
  and runs a dedicated "Myths" section debunking widely-repeated SEO folklore with sources. This is
  a stricter standard than this document has used throughout; retroactively grade claims above
  against it where a claim's confidence matters for a real decision.
- **The real Google policy history, more precise than section 12a's version**: the "city pages ==
  doorway pages" line existed in Google's doorway policy until it was explicitly deleted on March
  16, 2015. The widely-attributed Mueller quote *"You can't swap out the city name... and call it
  good"* **has no primary source anywhere** — every trail leads to blogs quoting each other; it is
  a fabricated attribution and must never be cited. Similarly, "80% similarity is the duplicate
  threshold" is unsourced folklore (most plausibly from article-spinner marketing copy) — Mueller,
  directly asked for a duplicate-content percentage in September 2022: *"There is no number (also
  how do you measure it anyway?)."* **Strike any reliance on an invented percentage threshold.**
- **A better uniqueness-check methodology than section 12's.** Their `check_page_similarity.py`
  (read in full): (1) extract main content, dropping nav/footer/template chrome — `trafilatura` is
  the cited best performer (2023 ACM SIGIR comparison); (2) **drop any 5-word shingle appearing on
  more than 30% of the page set — the site's own boilerplate** — described as "the highest-leverage
  step in the pipeline," since skipping it makes every uniqueness number meaningless (all pages look
  95% similar when nav+footer dominate the token count); (3) measure **both** Jaccard (≥0.50 =
  near-duplicate, a real citation: Broder et al., *Syntactic Clustering of the Web*, WWW 1997,
  shipped at AltaVista web-scale) **and containment** (≥0.80 = template clone) — containment is
  asymmetric and catches "master page plus 40 words of city fluff" that Jaccard alone softens.
  **Adapt this script directly for our own uniqueness gate (section 12) rather than inventing a
  fresh one** — it's a working, sourced implementation, not a concept to redo from scratch.
- **Progressive disclosure, confirmed sound.** Write full depth, then collapse nearly everything
  into accordions — only H1/hero promise, the offer+price+guarantee, ONE proof line, every CTA, and
  one service-area line stay visible. Confirmed technically costless: accordion content is indexed
  and weighted identically to visible content under mobile-first indexing. The test: screenshot the
  page with every accordion shut — if that doesn't sell on its own, fix the visible line, never
  reopen a section.
- **"Ask Maps" replaced Google Business Profile Q&A entirely on November 3, 2025** — the API was
  discontinued, public Q&A sections removed by profiles through December 2025. Ask Maps now
  generates a live answer from the business's website content, reviews, and profile fields when
  someone asks a question on Maps. **Practical consequence, directly applicable even without a
  GBP**: FAQ answers must be plain, complete, self-contained sentences — a bullet fragment with no
  context is unusable to an extraction-based answer system, whether that's Ask Maps, an AI
  Overview, or a chatbot citation. One well-written answer now serves every surface at once.
- **AI Overviews barely touch transactional local queries — genuinely good news specific to money
  pages.** Seer tracked 3,119 terms / 25.1M impressions: organic CTR fell 61% on AI-Overview-
  triggering queries, but the drop concentrates on informational/educational searches — AI
  Overviews rarely trigger on "near me"/transactional local queries at all, since a summary doesn't
  help someone already ready to hire. [E] This means the AI-citation work in sections 8-10 should
  be weighted toward this project's informational/blog-adjacent content (if any gets built) more
  than toward the transactional money pages themselves, where the AI-Overview threat is smaller to
  begin with.
- **New-domain ranking reality check**: across 1.3M US keywords, 72.9% of current top-10 pages are
  3+ years old; the average #1 page is 5 years old. [E] A brand-new EMD will not out-rank incumbents
  quickly on competitive terms regardless of content quality — this is exactly why this project's
  existing low-competition niche/city selection discipline (`CLAUDE.md`) matters as much as the page
  content itself; content quality is necessary, not sufficient, against an entrenched competitor.
- **For local organic ranking below the map pack specifically** (the achievable battlefield for
  this business, since the map pack itself requires GBP): Whitespark's 2026 practitioner survey
  places "dedicated page per service," "geographic keyword relevance," "quality inbound links," and
  "keyword in the landing page title tag" as the top local-organic factors — none of which require
  GBP. [C, survey-based] This is the correct frame: **not competing for the map pack, competing for
  organic results below it**, where the levers in sections 2-10 of this document actually apply.

### The critical mismatch — resolved directly by the user, 2026-10-23 (correcting this document's earlier error)

Their entire template assumes a real local business: a real owner to interview, real completed
jobs with photos ("Jobs we've done — the uncopyable section"), real review quotes, a real
verifiable address, a real GBP with real products/services. Asked directly: **this project's calls
route through anonymous pay-per-call network dispatch (MarketCall/LeadSmart-style) — one tracking
number per site, whichever contractor is live/bidding takes the call. There is no fixed, named
contractor behind any given page.** This is a confirmed, permanent structural fact, not a gap to
eventually close.

**This document originally concluded from that fact that the pages should be positioned as a
referral/marketplace service (a niche-specific Thumbtack/Angi), not as a local business — the user
explicitly and firmly overrode that conclusion, and it was wrong:**

> "yes, we will have our call partners, phone numbers, and we will be delivering services, so the
> sites are not for amusements, we are delivering the VALUE, so yes, we can present ourselves as
> local business and we should do, else how we even stand in chance."

The error in the original reasoning was treating "no single fixed named contractor" as equivalent
to "not a real local business." **It isn't.** Real services ARE delivered, by real licensed
network-partner technicians, to real local customers, through real dispatch — the business genuinely
performs the service, it just does so through a network-sourced technician rather than an
in-house W-2 employee. That is a completely ordinary, honest pattern across the home-services trade
(dispatch companies, franchise models, and most "24/7 emergency" operations work exactly this way).
**Positioning as a local service business is correct and required, per the user's direction — the
question this section actually needs to resolve is not "may we present as a local business" (yes),
but "which specific claims are we honestly entitled to make as one," which is a narrower, more
useful question. This reconciles the user's instruction with every anti-fabrication rule in the
Research Material documents (section 14) without contradiction**, because none of those documents
ever say a dispatch-model business can't present as a local business — they say it can't
**misrepresent facts** while doing so. The two are separate axes, and this document previously
conflated them.

**What this changes, concretely:**

- **Positioning**: present every page as a real, local-serving business delivering the stated
  service in the stated area — "24/7 Emergency AC Repair serving Surprise, AZ," not "connect with
  available pros." This is the correct, intended framing, confirmed by the user, and it is also the
  framing every Research Material document's own money-page template assumes once the underlying
  facts are honest (none of the four documents object to local-business positioning itself — see
  section 14.1's three-model table, where "actual service-business" and "lead-gen/referral" are
  both legitimate, and the user has now chosen the former).
- **Schema**: `Organization` + `Service` (section 7), not `LocalBusiness` — this was already the
  right call for the independent reason that there's no genuine street address to mark up (section
  7's correction), and it now also happens to be the right call for the business-model reason: a
  dispatch-based service business is honestly described as an `Organization` providing a `Service`
  across an `areaServed`, not as a single-location `LocalBusiness`. Both reasons point the same way.
- **What CAN be claimed truthfully, and should be built out as the real proof layer**: the service
  genuinely happens (real technicians, real jobs, real outcomes) even though no single page can
  point to one fixed, named company history. That means: honest process description (what happens
  when you call, realistic response framing), genuine local/data specificity (population, county,
  climate, real captured query data, real municipal permit/code references — section 14.2's
  geography and regulatory data layers), and **any claim about network-wide technician licensing,
  insurance, or vetting standards that is independently verified true of the specific MarketCall/
  LeadSmart network before it is ever published** (still an open item, see below — verify, don't
  assume, per every Research Material document's claim-provenance rule).
- **What still CANNOT be claimed, because it would be fabrication regardless of business-model
  framing**: a specific named founder/owner story, specific "jobs we've done" with invented photos
  or invented customer quotes, a specific fabricated response-time number (e.g. an invented
  `avgDispatchMinutes`), fake reviews or star ratings, or a street address. These prohibitions exist
  independent of the referral-vs-local-business question — they are "don't invent facts," which
  applies identically under either framing. The correction here is about **positioning**, not about
  loosening the zero-fabrication standard, which stays exactly as strict as the first research pass
  already had it.
- **The real open item, unchanged by this correction**: whether any claim about network-contractor
  licensing/insurance vetting is actually true and safe to state still needs verifying against the
  actual MarketCall/LeadSmart network terms before it goes on any page. **Separately, and newly
  flagged by the Research Material review (section 14.4)**: it's worth asking the network partners
  directly whether they can supply any real, aggregate, honestly-attributable data this project
  could use for the "proof layer" once site-build starts — e.g. genuine average connect/answer
  rates, genuine licensed/insured attestations for network technicians, or anything else that would
  let real data (not an invented number) fill the trust-signal role the Master Specification
  document assumes a page needs. Not resolved here — a question for the user to put to the network
  when it's time to scaffold the first real site, not before.

## 14. The Research Material synthesis (2026-10-23) — governance layer + engineering layer

Four documents were supplied for this pass, read in full (not skimmed), from
`Money Page Playbook/Research Material/`: `enterprise-local-seo-money-page-spec.md`,
`Local_SEO_Money_Page_Enterprise_Implementation_Specification.docx`,
`County_Level_Multi_Site_Local_SEO_Coding_Agent_Specification.docx`, and
`Master Specification — Enterprise Programmatic Pay-Per-Call (PPCall) SEO/AEO/GEO Architecture &
Anti-Hallucination Blueprint.docx`. They split cleanly into two registers that need to be merged,
not picked between:

- **Three of the four** (the first-read spec, the Implementation Specification, and the County-Level
  Coding Agent Specification) are **evidence-first governance contracts** — exhaustive, repetitive-
  by-design anti-hallucination rulebooks built around a page-qualification state machine
  (CREATE/CONSOLIDATE/HOLD/REJECT), a claim-provenance data model (every factual statement traces to
  a source or is omitted), and an independent-audit/release-gate pipeline. They are niche-neutral,
  business-model-agnostic, and deeply conservative — their central fear is a coding agent that
  "fills gaps with plausible inventions" at scale.
- **The fourth** (the Master Specification) is an **aggressive engineering architecture** —
  population-tier URL topology, a concrete 3-table relational data model
  (`NicheConfig`/`LocationEntity`/`SubServiceEntity`), a deterministic per-city pricing calculation,
  a literal DOM wireframe, and a unified JSON-LD `@graph` contract. It shares the same zero-
  fabrication rules in its own Section 2, but expressed as narrower, more mechanical checks (no fake
  reviews, no fake addresses, no placeholder strings) rather than the first three documents' full
  evidentiary-provenance philosophy.

**These are complementary, not competing, once one real tension is resolved: the Master
Specification's data model assumes several fields are already populated with real data
(`localRegulatoryBody`, `environmentalStressors`, `avgDispatchMinutes`, pricing multipliers) without
specifying how that data gets sourced or verified — which is exactly what the other three
documents' claim-provenance machinery exists to govern.** The correct synthesis: **use the Master
Specification's architecture as the implementation target, gated at every field by the other three
documents' evidence rules.** A field with a verified source populates; a field without one is
omitted or the page build is held — never filled with a plausible-sounding placeholder. This is the
single organizing principle for everything below.

### 14.1 The governing decision gate — supersedes section 6a's "two gates"

Section 6a's demand-gate/uniqueness-gate pair was correct but incomplete. All three governance
documents independently converge on the same richer four-state model; adopt it wholesale as the
gate every matrix cell (service × sub-service × location) passes through before a brief is even
written, let alone a page built:

| State | Meaning here | Action |
|---|---|---|
| **CREATE** | Real demand (section 2.1's volume gate), real service coverage in that exact location, enough genuinely sourceable local data to clear the uniqueness gate (section 12), and no unresolved overlap with an existing page. | Proceed to a content brief (section 14.5) and draft. |
| **CONSOLIDATE** | The proposed cell's intent is already served by an existing page (e.g. a sub-service with real but thin volume belongs as a section on the hub page, per section 2.2 tier 2, not its own URL). | Fold into the stronger existing URL; do not duplicate. |
| **HOLD** | Demand is real but a required data field is missing or unverified (no sourced municipal code reference yet, no confirmed regional pricing data, business-model question unresolved) — i.e. exactly the per-field gating this section exists to enforce. | Do not build. Log the specific missing field as the blocker. Revisit once sourced. |
| **REJECT** | No real demand (fails section 2.1's volume bar), or the only way to fill the page would require inventing a fact. | Do not build, and do not let it re-enter the queue automatically on a later run without new evidence. |

The critical discipline this adds beyond section 6a: **a matrix cell is not entitled to CREATE just
because it exists in the spreadsheet.** "County/city exists, service exists, keyword has volume" is
necessary but not sufficient — per the County-Level spec's own wording, "a county list is not a
service-coverage list," and per the Implementation spec, "the page count must be evidence-led, not
generated by multiplying service count by location count." Every CREATE decision should be
logged (even informally, in the per-niche workbook) with its reason, so a REJECT or HOLD cell is
never silently re-attempted without new information — this is the exact discipline this project
already applies to niche/city selection (`CLAUDE.md`'s GKP-fallback-is-final rule is the same
pattern: a verdict is final until new evidence arrives, not re-litigated every run).

### 14.2 Claim provenance — every non-obvious factual sentence gets a source and a status

Adopted from all three governance documents' shared data model, simplified to what this project's
actual scale needs (a full database-backed claims registry is overkill for the current stage; the
*discipline* is what matters, not the tooling):

- Every factual sentence that isn't a generic, universally-true statement about the service itself
  (i.e. every local-specific claim — a price, a code reference, a regulatory body name, a climate
  fact, a dispatch-time claim, a licensing/insurance claim) needs a traceable source: which public
  document, which dataset, which page, accessed when.
- Classify every such claim as one of: **VERIFIED** (source directly supports the exact statement),
  **PARTIALLY_SUPPORTED** (source supports a narrower version — narrow the sentence to match, don't
  publish the broader version), **UNVERIFIED** (no adequate source yet — omit from the page or HOLD
  the page), or **EXPIRED** (was verified, but is price/regulation/hours-type data old enough to need
  rechecking before reuse). **Never publish an UNVERIFIED claim as if it were VERIFIED** — this one
  rule, restated in nearly identical language across all three governance documents, is the actual
  core of "zero hallucination" in practice. It isn't a vibe, it's this binary gate applied per
  sentence.
- This is cheap to apply even without software: a per-niche "claims" tab or column next to the
  existing Hub & Spoke workbook data, listing each local-specific claim type used in that niche's
  template (regulatory body name, climate fact, pricing figure, licensing claim) and its source URL
  + access date. Build this alongside the content brief (section 14.5), not after the fact.

### 14.3 Schema correction cross-reference

The `LocalBusiness`-without-address correction and the `Organization`+`Service` replacement are
already made in section 7, prompted directly by cross-checking Google's own live LocalBusiness
documentation during this research pass (fetched directly, not paraphrased from a blog) — it
independently confirms what the Master Specification's Section 2 already mandated ("NEVER invent
street addresses... for service-area Pay-Per-Call sites. Use Service and Organization schemas") and
what all three governance documents separately warn about ("A service area is not automatically a
physical branch"). All four documents and Google's own documentation agree once the folklore is
stripped out — see section 7 for the full correction.

### 14.4 The engineering architecture to adopt from the Master Specification — with the real-data overlay

The Master Specification's structure is genuinely the most concrete, buildable implementation
blueprint of the four documents, and should be adopted as the literal target architecture for the
eventual SOP/skill (section 13/15), **field by field, gated per 14.2**:

- **Population-tier URL topology — adopt as-is.** Tier 1 (population ≥100k or a primary high-CPC
  metro) gets a city hub + all sub-service spokes; Tier 2 (25k–99,999) gets a city hub + only the
  core high-intent sub-services (this is the same volume-justified pruning as section 2.1, now
  expressed as explicit population tiers rather than only a keyword-volume check — **combine both**:
  a Tier 2 city's sub-service still needs real per-city volume per section 2.1 even if it clears the
  population bar); Tier 3 (<25k) gets **zero standalone pages**, rolled into the nearest Tier 1/2
  hub's "extended coverage" section with real ZIP code and real distance. This maps directly onto
  this project's existing Hub & Spoke County→Metro→CBSA clustering (`CLAUDE.md`) — it's the same
  idea, one layer more granular, and should be reconciled with the existing hub-membership logic
  rather than run as a separate system.
- **The 3-table relational model — adopt the shape, gate every field.** `LocationEntity` and
  `SubServiceEntity` are the right shape for the per-niche, per-city data this project already
  partially has (population, county, coordinates are already in the extracted Hub & Spoke data).
  Walk every field in the Master Specification's own schema and classify it per 14.2 **before**
  treating it as buildable:
  - **Already real, already in this project's data**: `cityName`, `stateName`, `countyName`,
    `population`, `latitude`/`longitude`, the tier assignment itself. No new sourcing needed.
  - **Real, publicly sourceable, cheap to add (do this)**: `wikidataId`/`wikipediaSlug` (direct
    lookups, trivially verifiable, exactly the kind of "knowledge graph entity binding" that
    strengthens AI/entity disambiguation per section 9), `zipCodes`/`neighborhoods` (public postal
    and municipal data), `majorCorridors` (public highway/road data), `localRegulatoryBody`/
    `localUtilityProvider` (the actual name of the city/county permitting department and the actual
    utility serving that area — public record, genuinely strengthens the "local differentiation"
    uniqueness gate in section 12 with zero fabrication risk), `environmentalStressors` (real public
    data exists for this — e.g. USGS/state water-hardness data, USDA soil-survey data, NOAA climate
    normals already flagged in section 2.3 — this is real research work per niche/region, not
    invention, and it's one of the highest-value genuine-uniqueness levers across all four
    documents).
  - **Real only if sourced and disclosed — do not invent (currently the main open research task)**:
    `regionalLaborMultiplier` and the base price range it scales. A search during this pass found
    **no public Angi/HomeAdvisor API or data feed** — their cost-guide pages exist publicly but
    scraping them is a terms-of-service question, not a clean data source. The defensible path: find
    a citable, public, dated source for national baseline pricing per niche (a trade-association
    publication, a BLS/cost-of-living index as a defensible regional multiplier proxy, or a
    publisher's own cost guide used as an attributed citation rather than scraped raw data) and
    **disclose the source and methodology on the page itself** ("regional estimate based on
    [source], adjusted for local cost-of-living index as of [date]") — this satisfies the
    "Localized Pricing Matrix" data layer's intent honestly, rather than inventing a multiplier with
    no defensible basis. **Flagged as the concrete next research task, not resolved in this pass.**
  - **Currently blocked — omit until real data exists, do not invent a placeholder**:
    `avgDispatchMinutes` (a specific dispatch-time number has no current source — this project
    doesn't yet know its own real average; this is exactly the kind of field Section 2's "STRICT
    DATA GATING (NULL = ABORT OR OMIT)" rule exists for — omit this element of the DOM wireframe
    entirely rather than publish an invented minute count), `recent_job_proof`/named customer quotes/
    job photos (no first-party job-history data exists yet, per the section 12b correction above —
    build the template with a slot for this, leave the slot empty/absent until real data exists,
    never fill it with a synthetic example), any `AggregateRating`/`Review` node (schema already
    excluded in section 7 for the same reason).
- **The DOM wireframe (hero, AEO summary block, pricing/triage table, interactive estimator,
  causal-failure-narrative section, 4-vector internal linking, sticky mobile call bar) — adopt
  directly, it's a strong, concrete synthesis of sections 3, 6a, 8, and 10 of this document into one
  literal page skeleton.** The one correction: everywhere the wireframe names a specific number
  (`avgDispatchMinutes`, a specific regional price), that number must trace to a 14.2-verified
  source or the element is omitted from that page's build, per the gating above — the wireframe's
  *structure* is adoptable wholesale, its *example values* are illustrative placeholders in the
  source document, not data to ship as-is.
- **The 4-vector internal linking module — adopt directly**, it's a more precise restatement of
  section 2.2/6a's hub-and-spoke linking direction (parent hub, same-city sibling sub-services,
  Haversine-nearest same-sub-service cities, state/regional breadcrumb) with one addition worth
  keeping: capping sibling-city cross-links to the nearest few by real distance (Haversine on real
  lat/long, already in this project's data) rather than linking every member city to every other
  member city — this avoids the "massive automated cross-link grid" multiple documents separately
  warn against.

### 14.5 The merged master checklist — reconciling the three different scoring systems

The four documents each ship their own checklist (a 25-point audit, a 32-point evidence-weighted
scorecard, and a 15-point build-verification gate). Rather than picking one, merge them into a
single two-layer checklist matching this project's actual two-layer architecture (governance +
engineering):

**Layer A — per-page evidence/governance gates (any FAIL here blocks publication, no exceptions):**
1. Every local-specific claim on the page has a 14.2-logged source, or is omitted.
2. No fabricated review, rating, testimonial, job photo, or customer quote anywhere on the page.
3. No fabricated street address; schema matches section 7 exactly (`Organization`+`Service`, no
   `LocalBusiness`).
4. No invented numeric claim (dispatch time, specific price, specific regulatory detail) without a
   logged source.
5. The page passes the uniqueness gate (section 12) against every sibling page.
6. The page would still have a genuine, distinct reason to exist if the city name and sub-service
   name were removed from its text (the "anti-commodity test," restated identically across all three
   governance documents — a strong, cheap sanity check worth running on every drafted page).
7. Positioning is honest per section 12b's correction — presents as a real local-serving business,
   makes no claim about a fixed named contractor or single-location history that isn't true.

**Layer B — technical/engineering build checks (mechanical, automatable, matches section 4 +
14.4's wireframe):**
1. Server-rendered/SSR-SSG raw HTML parity (section 4) — all text, tables, FAQ, links, and the
   unified JSON-LD `@graph` present without requiring JS execution.
2. Unified JSON-LD `@graph` parses cleanly and contains exactly the node types specified in section
   7, cross-referenced by stable `@id` values, no duplicate/conflicting graphs.
3. AEO summary block present immediately below the H1, self-contained, no page-context dependency
   (section 10).
4. 4-vector internal linking present and correct (section 14.4).
5. `robots.txt`/bot-access rules correct per section 4.
6. Mobile tap-to-call present and tested; Core Web Vitals checked on a representative page, not
   assumed.
7. Zero placeholder strings (`TODO`, `Lorem Ipsum`, `undefined`, `NaN`) anywhere in shipped HTML —
   the one Master Specification check worth keeping verbatim, it's a pure engineering bug-catcher.

**One explicit warning carried over from the governance documents, aimed squarely at the Master
Specification's own example output**: that document's Section 10 shows a sample "sign-off ledger"
reporting a clean 100% pass rate across 11,190 pages. **Treat that as an illustrative template
format only, never as a result to reproduce by filling in plausible-looking numbers.** The
governance documents are explicit and repeated on this exact failure mode: "a 32/32 score is not
proof," "never report '100% compliant' or 'risk-free'," "NOT TESTED is not PASS." Any real batch
report for this project must come from an actual count of actually-checked pages, including however
many genuinely fail, are held, or are not yet tested — a report that looks too clean should be the
first thing to re-check, not the thing to aspire to copy.

### 14.6 What this synthesis does NOT yet resolve — honest open items

- **The pricing-data sourcing task** (14.4) is real work, not yet done — finding and disclosing a
  defensible public source for baseline pricing per niche, per the method described above.
- **The network-partner proof-data question** (12b) — what MarketCall/LeadSmart can honestly supply
  (aggregate answer rates, technician licensing/insurance attestations) is unknown until asked.
- **Municipal code/regulatory-body research is per-niche, per-city real work**, not a one-time
  lookup — it scales with the matrix, and needs to be budgeted as an actual research task in the
  eventual SOP (section 15), not assumed to be free.
- **No independent-agent page-quality testing has happened yet** — the user's stated plan (multiple
  independent agents grading sample pages before finalizing templates) is still ahead, and the
  merged checklist in 14.5 is what those agents should be checking against once sample pages exist.

## 15. Toward an SOP / skill

This document is the strategy layer. The next step (not yet built) is turning sections 2-4 and the
section 14 synthesis into a literal, repeatable generation procedure: given a niche's
`ReVerified Niches/<niche>/..._REVERIFIED.xlsx` Hub & Spoke tab (which hub, which member cities,
what their real Ahrefs/GKP data is) and that niche's sub-service prefix-frequency table (section
2.1), mechanically produce: the 14.1 CREATE/CONSOLIDATE/HOLD/REJECT decision per matrix cell, the
14.2 claim-provenance pull (source + status for every local-specific fact the template needs), the
H1/intro copy brief, the sub-service section list with a volume-justified inclusion/exclusion
decision per sub-service, the per-city differentiation data pull (section 2.3/14.4), the unified
JSON-LD `@graph` block (section 7), and an FAQ question list sourced from real captured query
variants — handed to a human or LLM writer as a complete, data-backed content brief, not a blank
page. The 14.5 merged checklist is what every resulting draft gets graded against, including by the
independent review agents the user plans to run before finalizing templates. **Not yet built — this
is the natural next conversation**, once this strategy (now including the Research Material
synthesis) is confirmed as the right direction.

---

## Sources

### User-supplied Research Material (read in full, 2026-10-23 — see section 14)

- `Money Page Playbook/Research Material/enterprise-local-seo-money-page-spec.md`
- `Money Page Playbook/Research Material/Local_SEO_Money_Page_Enterprise_Implementation_Specification.docx`
- `Money Page Playbook/Research Material/County_Level_Multi_Site_Local_SEO_Coding_Agent_Specification.docx`
- `Money Page Playbook/Research Material/Master Specification_ Enterprise Programmatic Pay-Per-Call (PPCall) SEO_AEO_GEO Architecture & Anti-Hallucination Blueprint.docx`

These four are evidence-first governance contracts plus one aggressive engineering architecture
spec (see section 14.1 for how they relate); they are the direct source of sections 14 and most of
the section 7/12b corrections. Where their own claims were independently checkable (Google policy
specifics, schema eligibility), they were cross-checked against primary sources below rather than
taken at face value — two corrections came out of that check (the `LocalBusiness` address
requirement, and the FAQPage 2023-restriction-not-2026-removal fact).

### Primary / authoritative (verify any planning decision against these first)

- [github.com/youtube-jono/seo-agent](https://github.com/youtube-jono/seo-agent) — external reference implementation, cloned and read in full 2026-10-23 (not vendored into this repo). Source of section 12b; its `references/*.md` files are themselves heavily primary-sourced (Google policy history, Mueller/Illyes quotes with dates, Broder 1997, Zyppy's 23M-link study, Whitespark's 2026 survey) and worth reading directly if this playbook's paraphrase of them is ever in doubt.
- [GEO: Generative Engine Optimization (Aggarwal et al., KDD 2024) — arXiv:2311.09735](https://arxiv.org/abs/2311.09735) — the actual research paper behind every "GEO" claim circulating in SEO blogs.
- [Google Search Essentials — Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies) — official doorway-abuse and scaled-content-abuse definitions, quoted directly in section 12a.
- [Google Search's Guidance on Generative AI Content on Your Website](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [What web creators should know about our March 2024 core update and new spam policies](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- [Local Business (LocalBusiness) Structured Data — Google](https://developers.google.com/search/docs/appearance/structured-data/local-business) — fetched directly 2026-10-23; confirms `address` (full `PostalAddress`) is a REQUIRED property with no service-area exception documented, which is what forced the section 7 `LocalBusiness` → `Organization`+`Service` correction.
- [Review Snippet (Review, AggregateRating) Structured Data — Google](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Changes to HowTo and FAQ rich results — Google Search Central Blog, August 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes) — confirms FAQPage rich results were restricted to "well-known, authoritative government and health websites" in 2023, not removed outright and not in 2026 as an unverified secondary source claimed; markup causes no harm to keep.
- [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots) — official GPTBot/OAI-SearchBot/ChatGPT-User documentation.
- [Tips to improve your local ranking on Google — Google Business Profile Help](https://support.google.com/business/answer/7091?hl=en) — official relevance/distance/prominence framing, no disclosed weights.

### Secondary / vendor (directional only — cross-check before relying on any specific number)

- [Generative Engine Optimization: Best Practices 2026](https://www.zealousweb.com/resources/blog/generative-engine-optimization-best-practices/)
- [Generative Engine Optimization (GEO): The Complete 2026 Guide](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)
- [ChatGPT SEO & GEO 2026: 12 Tips To Get Cited In AI Answers](https://www.yotpo.com/blog/chatgpt-seo-geo-tips/)
- [Mastering AI Citations: The Ultimate GEO Playbook](https://www.frase.io/blog/how-to-get-cited-by-ai-search-engines-the-complete-geo-playbook)
- [Generative Engine Optimization (GEO): How to Get Cited in Google AI Overviews, ChatGPT & Perplexity (2026)](https://www.kickads.co/en/generative-engine-optimization)
- [Local SEO 2026: What Actually Moves Rankings Now](https://www.ecoyork.com/local-seo-2026-ranking-factors/)
- [Local SEO Ranking Factors 2026: What Moves Rankings](https://www.speedmobi.com/local-seo-ranking-factors-2026)
- [Local SEO for Home Service Businesses: The Complete 2026 Guide](https://evergreenwebpartners.com/blog/local-seo-home-service-business-guide)
- [Schema Markup for Local SEO: A Complete Guide (2026)](https://onecity.co.in/blog/?p=56280)
- [Schema.org in 2026: What OC Businesses Need for AI Search and Rich Results](https://technijian.com/digital-marketing/schema-org-2026-orange-county-ai-search-rich-results/)
- [Programmatic SEO on a Budget: Scaling Local Landing Pages Without Spam Penalties](https://searchfoundry.co.uk/blog/programmatic-seo-on-a-budget-scaling-local-landing-pages-without-spam-penalties/)
- [Doorway Pages Vs Landing Pages: Hidden SEO Risks In 2026](https://www.bigredseo.com/doorway-pages-vs-landing-pages/)
- [How Google Treats Programmatic Content in 2026](https://www.aiappsapi.com/articles/programmaticseo/googletreatment.php)
- [Do Exact Match Domains Still Work for SEO in 2026?](https://fruits.co/news/do-exact-match-domains-still-work-for-seo-in-2026)
- [Exact Match Domains Are Making a Comeback (and SEOs Are In Denial)](https://blog.mean.ceo/?p=2298)
- [Local SEO for Service Area Businesses: The 2026 Playbook](https://www.mdtechteam.com/local-seo-for-service-area-businesses/)
- [Service Pages vs Location Pages SEO Guide 2026](https://www.localmighty.com/blog/service-pages-vs-location-pages/)
- [Pillar & Cluster Content Guide for Local SEO Success](https://dndseoservices.com/blog/pillar-cluster-content-structure-local-seo-guide/)
- [On-Page SEO for Local Service Firms: Rank in 2026?](https://ustechautomations.com/resources/blog/onpage-seo-for-local-service-businesses-2026)
- [Locksmith Landing Page Statistics: 2026 Conversion Rates & CRO Data](https://www.webtonic.io/blog/locksmith-landing-page-statistics)
- [Home services landing pages that convert](https://www.stackmatix.com/blog/home-services-landing-pages-that-convert)
- [LLMS.TXT in 2026: the full guide](https://www.limy.ai/blog/llms.txt-in-2026-the-full-guide)
- [Top LLM crawlers and what they do 2026](https://hyperleap.ai/blog/top-llm-crawlers-and-what-they-do-2026)
- [Silo SEO: Website structure that ranks in 2026](https://blog.hubspot.com/website/silo-seo)
- [Site Architecture That Builds Topical Authority at Scale](https://forgr.co/blog/site-architecture-topical-authority-ai-content-scale-2026/)
- [AEO vs. GEO explained: What marketers need to know now](https://blog.hubspot.com/marketing/aeo-vs-geo?Sid=1)
- [GEO vs AEO: What's the Difference and Which Should You Optimize For?](https://rankai.ai/articles/geo-vs-aeo)
- [Schema markup 2026: why pages without JSON-LD lose 20-40% CTR](https://kolonell.com/en/blog/advanced-schema-markup-rich-snippets-2026)
- [The Programmatic SEO Paradox: Why Your Fear of Creating Thousands of Pages Is Both Valid and Obsolete](https://guptadeepak.com/the-programmatic-seo-paradox-why-your-fear-of-creating-thousands-of-pages-is-both-valid-and-obsolete/)
- [Why Doorway Spam Is Offensive, and Why Businesses That Use It Don't Deserve Your Business](https://keystonewebstudios.com/2026/08/why-doorway-spam-is-offensive/)
- [Multi-Location SEO Strategy UK: Architecture Without Penalties](https://vydexatechnologies.com/blog/multi-location-service-pages-technical-seo-uk-architecture/)
- [Programmatic SEO: How We Generate 40,000+ Ranking Pages Automatically](https://www.delpuma.com/blog/programmatic-seo-40000-ranking-pages)
