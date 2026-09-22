# UK Family Mediation Portfolio Engine (Enterprise SOP & Master Skill)

This skill document defines the complete architectural blueprint, design standards, regulatory compliance measures, technical SEO specifications, and single-command deployment pipeline for developing high-converting, Google-compliant UK Family Mediation websites.

---

## 1. System Architecture & Monorepo Design

The portfolio utilizes a monorepo architecture managed via **pnpm workspaces**:

```text
├── packages/
│   └── core/                     # Shared single source of truth (SSOT)
│       ├── src/
│       │   ├── components/       # Header, Footer, Hero, Forms, Cards, Icons
│       │   ├── config/           # SSOT Global Contact & Brand registry
│       │   ├── data/             # County, Town, Court, Service & Blog data
│       │   ├── seo/              # LocalBusiness, Service, ImageObject schemas
│       │   └── types.ts          # Strongly typed domain models
├── Sites/
│   ├── aldertonfamilymediation/  # Site 1 (East Midlands)
│   ├── cavendishfamilymediation/ # Site 2 (South East / East Anglia)
│   └── [brand3..10]/             # Additional portfolio brands
└── pnpm-workspace.yaml
```

### 1.1 Single Source of Truth (SSOT) Principle
- **All contact information** (telephone numbers, email addresses, webhook endpoints, physical office centres) MUST originate strictly from `packages/core/src/config/global-contact.ts`.
- No hardcoded numbers (`0000 000 000` or arbitrary strings) are permitted in page templates or components.
- Brand numbers map directly to regional area codes:
  - **Alderton Family Mediation**: `0116 497 4555` (`tel:01164974555`)
  - **Cavendish Family Mediation**: `01473 943 933` (`tel:01473943933`)
  - **Portfolio National Direct Line**: `0800 861 1050` (`tel:08008611050`)

---

## 2. Anti-Doorway & Anti-Commodity Legal Enrichment (Google Penalty Shield)

To completely protect regional landing pages from Google's **Doorway Page Abuse**, **Commodity Content**, and **Thin Page Penalties**, every county and town page MUST deliver substantial, unique local utility:

### 2.1 Designated UK Family Court Authority
Every town location object MUST specify its designated physical court centre:
- **Court Name**: Full official HMCTS title (e.g., *Leicester County Court and Family Court*, *Ipswich County Court and Family Court*).
- **Physical Address & Postcode**: Verified court registry street address and postcode.
- **Jurisdiction Tier**: Designated Family Centre, Financial Remedies Court (FRC), or Magistrates Family Hearing Centre.
- **Filing Guidance**: Specific court filing rules for Form C100 (Child Arrangements) and Form A / Form FM1 (Financial Remedy).

### 2.2 Family Procedure Rules (FPR 2024) Compliance Callouts
Incorporate legal requirements updated by the Ministry of Justice in April 2024:
- Mandatory pre-action dispute resolution consideration.
- Elimination of procedural loopholes for self-certification exemptions.
- Court powers under FPR Part 3.4(1A) to order cost sanctions against parties unreasonably refusing mediation.

### 2.3 Local Transit, Geography & Catchment Data
- Physical arterial roads (e.g., A12, A14, M1, A46, A52).
- Proximity to mainline train stations and public transit hubs.
- High-density neighbouring area micro-tags for natural semantic geographic context.

---

## 3. Strict UI/UX Guardrails & Inviolable Design Standards

### 3.1 Strict Call Button Formatting
> [!IMPORTANT]
> **Every user-facing call button across the entire site MUST consist of the phone icon and the phone number ONLY: `[📞 {brand.formattedPhone}]`.**
> 
> - **FORBIDDEN**: "Call:", "Call Team:", "Call Our Mediators:", "Direct Line:", or any text prefix.
> - **MANDATORY**: An SVG phone icon followed immediately by `{brand.formattedPhone}`.

### 3.2 Zero Unicode Emojis
- **ZERO Unicode Emojis** are permitted in user-facing code, headlines, body copy, list items, buttons, or badges.
- Use only scalable SVG vector icons from the centralized `Icons.tsx` component:
  - `ScalesOfJusticeIcon`, `PhoneCallIcon`, `CalendarCheckIcon`, `ShieldLockIcon`, `CourtBuildingIcon`, `AwardSealIcon`, `ClockIcon`, `MailIcon`, `BuildingOfficeIcon`, `AlertTriangleIcon`, `CheckCircleIcon`, `XCircleIcon`.

### 3.3 Flawless Responsiveness Across All Viewports
Layouts must undergo zero-collision testing across all five standard viewports:

| Viewport Width | Device Target | Header Configuration | Call CTA Placement |
| :--- | :--- | :--- | :--- |
| **320px – 430px** | Mobile Smartphones (iPhone, Pixel) | Logo (`shrink-0`, no truncation) + Hamburger button. Desktop nav hidden. | Fixed bottom `MobileStickyBar` with `[📞 {brand.formattedPhone}]` + `[📅 Book Consultation]`. |
| **640px – 767px** | Large Mobile / Phablet | Logo + `[📞 {brand.formattedPhone}]` + Hamburger button. | Header pill + Bottom sticky bar. |
| **768px – 1023px** | Tablets (iPad Portrait, Tablets) | Logo + `[📞 {brand.formattedPhone}]` + Hamburger button (`xl:hidden`). | Header pill button. |
| **1024px – 1279px** | Small Laptops / iPad Pro Landscape | Logo + `[📞 {brand.formattedPhone}]` + Hamburger button (`xl:hidden`). Zero collision. | Header pill button. |
| **1280px+** | Standard Desktop / Monitors | Full 6-link desktop nav with active route indicator pills + `[📞 {brand.formattedPhone}]`. | Header luxury pill button. |

### 3.4 Modern Card Architecture (Eliminate Dull Card-in-Card Nesting)
- **Eliminate flat wireframe boxes**: Replace nested light-gray borders with elevated surface cards.
- **Accented Left Borders**: Utilize `border-l-4 border-amber-500` or `border-l-4 border-emerald-600` with subtle ambient backgrounds (`bg-amber-50/20` or `bg-slate-50/70`).
- **Dedicated Icon Medallions**: Prepend every statutory card or process stage with a circular gradient badge holding a dedicated vector SVG.
- **Interactive Micro-Pills**: Render neighbouring towns and geographical tags as interactive pill badges with animated accent dots (`group-hover:scale-110`).

### 3.5 Executive Luxury Footer
Every site must include the unified 5-tier luxury footer:
1. **Safeguarding Emergency Signposting Banner**: High-contrast, responsive flex banner (`flex-col lg:flex-row items-start lg:items-center justify-between gap-5`) with direct crisis support links.
2. **5-Column Navigation Grid**:
   - Column 1: Brand crest, strapline, business hours (`ClockIcon`), confidential email (`MailIcon`), and SSOT phone link.
   - Column 2: Mediation Services (MIAM, Child Arrangements, Financial Mediation, All-Issues).
   - Column 3: Regional Coverage (County clusters & key population centres).
   - Column 4: Statutory Legal Framework (FMC standards, Form C100, Form A, FPR 2024 compliance).
   - Column 5: Client Support & Resources (Fee structures, Legal Aid assessment, FAQs).
3. **Verified Accreditation Body Trust Bar**: 3 dark glassmorphic cards highlighting:
   - *Family Mediation Council (FMC)* — Code of Professional Conduct.
   - *Resolution UK* — Constructive Non-Court Dispute Resolution.
   - *College of Mediators* — Approved Dispute Resolution Provider.
4. **Responsive Micro-Tag Town Directory**: SEO-crawlable internal link index connecting local town pages without visual clutter.
5. **Copyright & Legal Disclaimers**: Professional regulatory notices and data privacy assurances.

### 3.6 Emotionally Aligned Visual Direction & 10-Brand Asset Distribution Strategy
- **Image Formats**: Exclusively modern **WebP** (`.webp`) format for instant loading and sub-50KB payload.
- **Emotional Resonance**: Images must portray sincere, thoughtful, respectful mediation rooms, neutral conference spaces, and confidential legal consultations.
- **Strict Rule**: NEVER display laughing or smiling couples in separation or divorce contexts.
- **Portfolio-Wide Asset Distribution (10-Brand Portfolio Strategy)**:
  - The master media library comprises **15 specialized legal infographics** and **24 topical/photographic assets** (39 total assets).
  - **DO NOT deploy all 39 assets onto a single brand website.**
  - Partition and curate non-overlapping, topically tailored subsets of 8–12 assets per site matching each brand's domain:
    - *Site 1 (Alderton - East Midlands)*: Focuses on Child Arrangements, 50/50 Rotas, School Holidays, Passports, Remote Shuttle Mediation (`parenting-plan-living-arrangements.webp`, `dividing-school-holidays-calendar.webp`, `shared-parenting-two-homes-rota.webp`, `miam-explained-step-by-step.webp`, `mediation-vs-court-comparison.webp`, `separate-rooms-shuttle-mediation.webp`).
    - *Site 2 (Cavendish - South East / East Anglia)*: Focuses on High-Net-Worth Financial Settlements, Parental House Deposits, Inherited Money, Final Salary Pensions, Family Businesses, Form E Disclosure (`financial-mediation-overview.webp`, `the-family-home-separation-options.webp`, `pensions-long-term-financial-planning.webp`, `property-mediation-equity-division.webp`, `after-mediation-next-steps.webp`, `what-happens-if-no-agreement-mediation.webp`).
    - *Sites 3 through 10*: Deploy remaining assets and generate targeted WebP variations aligned with the core messaging of those regional markets.
- **Brand-Enriched Alt Tag Architecture (Mandatory SEO Formula)**:
  - Every image `alt` attribute MUST embed the specific subject description AND the brand entity name:
    - *Editorial / Blog / Infographic Images*: `"[Specific Subject Description] from [Brand Name]"` (e.g. `"Parent reviewing travel consent letter and child passport for holiday approval from Alderton Family Mediation"`, `"The family home options and parental deposit equity division from Cavendish Family Mediation"`).
    - *Local Service & Location Images*: `"[Service / Topic Description] in [Town Name], [County Name] from [Brand Name]"` (e.g. `"Child Arrangements Mediation session in Leicester, Leicestershire from Alderton Family Mediation"`).
  - This ensures rich entity-level contextual signals in Google Image Search and eliminates generic stock image penalties.

### 3.7 In-Depth Legal Articles & Dispute Guides Standard (Zero Fluff & Anti-Commodity)
To establish unbeatable topical authority, satisfy Google EEAT, and avoid commodity content flags, every legal article and dispute guide MUST adhere to the following architecture:
1. **Article Volume Constraint**: Maximum **10 articles per site** (8–10 highly authoritative guides covering core topical search clusters).
2. **Minimum 3 Contextual WebP Images**:
   - Curated blend of authentic photography and structured infographics.
   - Descriptive figure captions below each image providing genuine editorial context.
   - Mandatory brand-enriched alt tags following the formula in Section 3.6.
3. **Minimum 10 Exhaustive, Scenario-Specific FAQs**:
   - Answers must address real financial and parenting complexities (e.g. non-disclosure remedies under *Sharland*, Form D81, CEV pension vs actuarial true value, Deeds of Trust, 28-day overseas travel rules, airport Border Force protocols).
   - Rendered with interactive schema-ready accordions (`FAQPage` JSON-LD).
4. **Structured Editorial Layout (`ArticleView.tsx`)**:
   - **Interactive Table of Contents**: 6 quick-jump anchor links.
   - **Direct Answer / AEO Executive Summary Box**: Highlighting core question and direct authoritative answer upfront for Google AI Overviews and Perplexity.
   - **Statutory Legal Framework Cards**: Explicit citations of English legislation (e.g. Children Act 1989, Matrimonial Causes Act 1973, FPR 2024 amendments).
   - **Step-by-Step Resolution Roadmap**: Actionable, numbered cards with clear takeaways.
   - **Tactical Pitfalls & Common Mistakes**: Contrast cards outlining risks of unilateral actions or bypassing MIAMs.
   - **Limits of Mediation Callout**: Plain explanation of when mediation cannot proceed and urgent court injunctions (Prohibited Steps, Freezing Injunctions) are required.
5. **SSOT Consultation Callouts**:
   - Mid-article and bottom booking cards with strictly formatted call button `[📞 {brand.formattedPhone}]`.

### 3.8 Zero-Orphan & Zero-Dead-End Internal Linking Architecture (Inviolable Standard)
> [!IMPORTANT]
> **NO URL SHOULD BE AN ORPHAN. NO URL SHOULD BE A DEAD END.**
> Every single indexable page across the website MUST receive multiple inbound internal links and provide multiple contextual outbound links.

The portfolio enforces a circular internal link graph across all page hierarchies:
- **Core Services (`/services/[slug]`)**:
  - *Receives links from*: Header Nav, Footer, Home, HTML Sitemap, Location pages, Town+Service pages, Blog articles.
  - *Gives links to*: Related blog articles matching `p.relatedServiceSlug === service.slug`, all regional Town+Service landing pages (`/locations/{county}/{town}/{service}`), sibling services grid, and `/contact`.
- **Town Location Pages (`/locations/[county]/[town]`)**:
  - *Receives links from*: Locations index, County sections, Home top towns, Footer directory, HTML Sitemap, Blog articles.
  - *Gives links to*: 4 town service landing pages (`/locations/{county}/{town}/{service}`), designated HMCTS family court centre, local dispute advice articles matching `relatedTownSlugs`, sister towns in the county, and `/services`.
- **Town + Service Pages (`/locations/[county]/[town]/[service]`)**:
  - *Receives links from*: Town overview page, Parent service page, Blog articles practice hub links, HTML Sitemap, Footer micro-directory.
  - *Gives links to*: Parent service specification (`/services/{service.slug}`), other 3 mediation services in that town, related legal guides for that service, sister towns for that service, and `/locations/{county}/{town}`.
- **Blog Index (`/blog`)**:
  - *Receives links from*: Header Nav ("Guides & Advice"), Footer, Home, Service pages, Town pages, HTML Sitemap.
  - *Gives links to*: All individual articles (`/blog/{slug}`), Core Services showcase (`/services/{slug}`), and Regional Family Court Districts directory (`/locations/{county}/{town}`).
- **Blog Articles (`/blog/[slug]`)**:
  - *Receives links from*: Blog index, Parent service page, Town location pages, Town+Service pages, Sibling related articles (`relatedPostSlugs`), HTML Sitemap.
  - *Gives links to*: Parent service page (`/services/{relatedServiceSlug}`), Designated Family Court centres with verified street addresses, Local practice hub landing pages (`/locations/{county}/{town}/{service}`), 3 related dispute guides, and `/blog`.
- **HTML Sitemap (`/sitemap`) & XML Sitemap (`/sitemap.xml`)**:
  - Lists 100% of indexable pages (Home, Services, Locations, Towns, Town+Services, Blog Index, all Blog Articles, About, Contact, Privacy, Terms).

---

#### 3.6 Semantic Anchor Text & Domain Authority Consolidation
> [!IMPORTANT]
> **Generic anchor texts are strictly banned across all portfolio sites.**
> 
> - **BANNED**: "View local centre details", "View Details", "Read Full Guide", "Read Practical Guide", "Click here", "Learn more", "View All Locations".
> - **MANDATORY**: Anchor texts MUST be descriptive, high-intent, and semantically rich—combining location + practice area + statutory context without spammy `{name}` token replacement:
>   - **Location Directory Links**: `Explore {town.name} Practice Hub & Court Guidance →`
>   - **Town Service Cards**: `Schedule {service.title} in {town.name} →`
>   - **Location Guide Cards**: `Read Full Legal Analysis for {town.name} →`
>   - **Parent Hub Statutory Links**: `Statutory Guidelines & Protocols for {service.title} →`
>   - **Service Guide Cards**: `Read Complete Guidance on {article.clusterName} →`
>   - **Footer Practice Navigation**: `Find Your Local Family Mediation Practice →`
>   - **County Hub Navigation**: `Explore All {county.name} Practice Hubs & Family Courts →`
> 
> This consolidates domain authority, provides explicit contextual signals to search engines and users, and eliminates doorway penalty triggers.

### 3.7 Strict Topical Guide Relevance & Adaptive Layout Architecture
Guides appearing on location and service pages MUST maintain strict contextual relevance without arbitrary padding:
1. **Town Location Hubs**:
   - Filter strictly by `p.relatedTownSlugs?.includes(town.slug)`.
   - Curate a **topically diverse 3-pillar mix**: exactly 1 MIAM/Court guide, 1 Financial/Property guide, and 1 Child Arrangements guide.
   - Zero arbitrary fallbacks to random articles.
2. **Location-Service Hubs**:
   - Filter strictly by `relatedServiceSlug === service.slug` (or for `all-issues-mediation`, include both financial and child arrangements).
   - Priority sort: guides referencing `town.slug` rank highest.
3. **Adaptive Visual Grid**:
   - **1 Matching Guide**: Render as a **Featured Statutory Authority Banner** (full-width 2-column flex/grid container with "Essential Statutory Guidance for {town.name} Applicants" badge, reading time, detailed overview, and prominent CTA). Never render a lonely 1/3 card inside an empty 3-column grid.
   - **2 Matching Guides**: Render in a balanced 2-column grid (`grid grid-cols-1 md:grid-cols-2 gap-6`).
   - **3 Matching Guides**: Render in a balanced 3-column grid (`grid grid-cols-1 md:grid-cols-3 gap-6`).

---

## 4. Technical SEO, Rich Schemas & FAQ Statutory Depth

### 4.1 Location Hub FAQ Statutory Depth (8–10+ FAQs Non-Negotiable)
To permanently shield against Google's **Doorway Page Abuse**, **Commodity Content**, and **Thin Page** algorithms, every town and location-service page MUST provide deep, practical, localized utility:
- **Town Location Hubs (`/locations/[county]/[town]`)**: MUST contain **10 comprehensive, localized FAQs** addressing:
  1. Remote video MIAMs vs in-person meetings in that town.
  2. Designated Family Court requirements under Section 10 Children and Families Act 2014 & FPR Part 3.
  3. Fast 24–48 hour turnaround for signed Form C100 / Form A court certificates.
  4. Legal enforceability and converting Memorandums of Understanding into binding Consent Orders.
  5. Ministry of Justice £500 Family Mediation Voucher Scheme & Legal Aid eligibility.
  6. Cost and timeframe comparison (£15,000–£30,000+ court litigation vs mediation in weeks).
  7. Non-responsive or refusing ex-partner procedure and statutory certification.
  8. Shuttle mediation in separate physical / virtual breakout rooms.
  9. Tailored child arrangements accounting for local county school term dates and holiday rotas.
  10. Property equity, mortgage borrowing capacities, and pension division (CETVs).
- **Location-Service Pages (`/locations/[county]/[town]/[service]`)**: MUST combine all 5 statutory service FAQs with 5 localized town-court FAQs, presenting **10 in-depth FAQs** combining statutory authority with local court application realities.

### 4.2 Comprehensive JSON-LD Schema Graphs
Every page renders structured data via Next.js script tags:
- **LocalBusiness Schema**:
  - Exact `name`, `legalName`, `telephone`, `email`, `url`.
  - GeoCoordinates (`latitude`, `longitude`) for local mapping signals.
  - FMC regulatory accreditations and membership numbers.
- **Service Schema**:
  - `serviceType`, `provider`, `areaServed`, and statutory court application applicability (`Form C100`, `Form A`).
- **ImageObject Geo-Schema**:
  - Embed geo-coordinates, IPTC copyright notices, and descriptive captions directly into image metadata.
- **FAQPage Schema**:
  - County-specific and service-specific FAQ questions and answers formatted for Google SERP rich snippets.
- **BreadcrumbList Schema**:
  - Semantic navigational hierarchy (`Home > Locations > County > Town > Service`).

### 4.3 Next-Generation AI Search Engine Readiness (`llms.txt`)
Every site outputs an `/llms.txt` file at build time providing a structured Markdown manifest of legal frameworks, court jurisdictions, and service offerings for retrieval-augmented generation (Perplexity, ChatGPT Search, Claude).

---

## 5. Core Web Vitals & Production Performance

1. **Static HTML Generation**: Configured with Next.js `output: 'export'` for sub-millisecond edge delivery.
2. **Font Strategy**: Preloaded Google Fonts (`Plus Jakarta Sans` and `Playfair Display`) using `display: 'swap'` and CSS variables to eliminate Cumulative Layout Shift (CLS = 0).
3. **Image Optimization**: WebP format with explicit `width`, `height`, and responsive `sizes` attributes for sub-second Largest Contentful Paint (LCP < 1.0s).

---

## 6. Tracking, Analytics & Search Console Integration

### 6.1 Google Analytics 4 (GA4)
Inject the GA4 measurement tag dynamically via `BrandConfig.googleAnalyticsId`:
- Automatic page-view tracking on client route changes.
- Custom event tracking:
  - `phone_call_click` (placement: desktop_header, mobile_sticky_bar, lead_form, footer).
  - `form_submission` (lead intake form completion).
  - `court_guide_click` (designated court information interaction).

### 6.2 Google Search Console (GSC)
Inject verification meta tags via `BrandConfig.googleSiteVerification` or direct DNS TXT records.

---

## 7. One-Command Site Deployment Playbook

To launch an entirely new brand (e.g. Brand #3: *Kingsley Family Mediation*):

### Step 1: Add Contact Details to SSOT
In `packages/core/src/config/global-contact.ts`:
```typescript
export const KINGSLEY_CONTACT = {
  phone: '0121XXXXXXX',
  formattedPhone: '0121 XXX XXXX',
  email: 'enquiries@kingsleyfamilymediation.co.uk',
  leadWebhookEndpoint: 'https://webhook.site/kingsley-lead-webhook',
};
```

### Step 2: Define County & Town Data
Create or import the regional data in `packages/core/src/data/site3-locations.ts`. Ensure each town defines its designated HMCTS family court centre, local road links, and all 10 localized statutory FAQs.

### Step 3: Scaffold New Site Directory
Run the automated scaffolding script:
```bash
node scripts/scaffold-mediation-brand.js \
  --name "Kingsley Family Mediation" \
  --slug "kingsleyfamilymediation" \
  --phone "0121XXXXXXX" \
  --formattedPhone "0121 XXX XXXX" \
  --countyData "site3-locations" \
  --primaryHex "#1E293B" \
  --accentHex "#0284C7"
```

### Step 4: Build, Verify Links & Export
```bash
pnpm --filter kingsley-family-mediation build
node scripts/verify-internal-links.js
```

---
*Maintained by Antigravity Autonomous Engineering & Lead Generation Architecture.*
