---
name: uk-family-mediation-engine
description: End-to-end framework, master SOP, and automated engine for building enterprise FMC-accredited UK Family Mediation multi-brand site portfolios with anti-doorway legal enrichment, geo-schema, strict UX guardrails, single-source lead capture, and turnkey deployment.
---

# UK Family Mediation Portfolio Engine (Enterprise SOP & Master Skill)

This skill document defines the complete architectural blueprint, design standards, regulatory compliance measures, technical SEO specifications, lead generation engine, and automated deployment pipeline for developing high-converting, Google-compliant UK Family Mediation websites.

It is designed to be executed **within the primary monorepo (`jasonmediation`)** or **independently in any directory from absolute scratch**.

---

## 1. System Architecture & Repository Governance

### 1.1 Zero-Scattering Governance: Single Unified Repository (`jasonmediation`)
- **Strict Inviolable Rule**: The entire multi-site network, all 10 brand sites, shared packages, build tools, and automated deployment pipelines MUST reside exclusively within the single master repository: **`jasonmediation`** (`vastucartapps/jasonmediation`).
- **Banned**: Creating separate, disconnected child repositories on GitHub or scattering brand code across independent repos.
- **Unified Directory Hierarchy**:
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
  ├── scripts/                      # Build, verification & deployment automation
  ├── .github/workflows/            # Automated CI/CD deployment pipelines
  └── pnpm-workspace.yaml
  ```

### 1.2 Single Source of Truth (SSOT) Contact Principle
- **All contact information** (telephone numbers, email addresses, webhook endpoints, physical office centres) MUST originate strictly from `packages/core/src/config/global-contact.ts`.
- No hardcoded numbers (`0000 000 000` or arbitrary strings) are permitted in page templates or components.
- Brand numbers map directly to regional area codes:
  - **Alderton Family Mediation**: `03300 100 199` (`tel:03300100199`)
  - **Cavendish Family Mediation**: `03300 100 217` (`tel:03300100217`)
  - **Portfolio National Direct Line**: `0800 861 1050` (`tel:08008611050`)

---

## 2. Autonomous Bootstrap & Independent Directory Usage

This skill is 100% self-contained. If invoked in an empty directory or on a new machine, follow this bootstrap blueprint to create and launch any mediation brand site without external dependencies:

### 2.1 Workspace Initialization
In any empty directory:
```bash
# 1. Initialize pnpm workspace
pnpm init

# 2. Create pnpm-workspace.yaml
cat << 'EOF' > pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'Sites/*'
EOF
```

### 2.2 Core Package & SSOT Structure (`packages/core`)
`packages/core` provides the shared domain logic, UI component library, and contact single-source-of-truth. It requires:
1. `src/types.ts`: Strongly typed models (`BrandConfig`, `CountyData`, `TownData`, `CourtAuthority`, `ServiceItem`, `BlogPost`, `FAQItem`).
2. `src/config/global-contact.ts`: Centralized telephone numbers, direct emails, and FormSubmit tokens.
3. `src/components/`:
   - `Header.tsx`: Responsive navigation with active indicators and strict call CTA button.
   - `Footer.tsx`: 5-tier luxury footer with crisis banner, 5 navigation columns, and trust bar.
   - `MobileStickyBar.tsx`: Fixed bottom mobile bar (`[📞 {brand.formattedPhone}]` + `[📅 Book Assessment]`).
   - `LeadIntakeForm.tsx`: Single-source lead capture form with FormSubmit token dispatch.
   - `CourtAuthorityCard.tsx`: HMCTS designated family court center and filing guidance.
   - `ArticleView.tsx`: Authoritative legal article view with table of contents and AEO summary.
   - `FAQSection.tsx`: Interactive FAQ accordions outputting `FAQPage` schema.
   - `Icons.tsx`: Centralized SVG vector icons (Zero Unicode emojis).
4. `src/seo/schema.ts`: JSON-LD structured data generators (`LocalBusiness`, `Service`, `BreadcrumbList`).

### 2.3 Bundled Automation Tooling
The skill includes pre-packaged automation scripts located in the skill's `scripts/` directory:
- `scaffold-mediation-brand.js`: Generates a complete brand site with all 13 standard Next.js route templates, configurations, and `.htaccess` in one command.
- `verify-internal-links.js`: Pre-PR and build auditor scanning all HTML exports to guarantee zero broken links, zero orphan pages, and valid anchor texts.
- `optimize-images.py`: Image optimizer that converts assets to high-density WebP, enforces dimension caps, and purges legacy files.
- `deploy-ftp.py`: Automated cPanel FTPS deployment script with TLS authentication and retry logic.

---

## 3. Anti-Doorway & Anti-Commodity Legal Enrichment (Google Penalty Shield)

To completely protect regional landing pages from Google's **Doorway Page Abuse**, **Commodity Content**, and **Thin Page Penalties**, every county and town page MUST deliver substantial, unique local utility:

### 3.1 Designated UK Family Court Authority
Every town location object MUST specify its designated physical court centre:
- **Court Name**: Full official HMCTS title (e.g., *Leicester County Court and Family Court*, *Ipswich County Court and Family Court*).
- **Physical Address & Postcode**: Verified court registry street address and postcode.
- **Jurisdiction Tier**: Designated Family Centre, Financial Remedies Court (FRC), or Magistrates Family Hearing Centre.
- **Filing Guidance**: Specific court filing rules for Form C100 (Child Arrangements) and Form A / Form FM1 (Financial Remedy).

### 3.2 Family Procedure Rules (FPR 2024) Compliance Callouts
Incorporate legal requirements updated by the Ministry of Justice in April 2024:
- Mandatory pre-action dispute resolution consideration.
- Elimination of procedural loopholes for self-certification exemptions.
- Court powers under FPR Part 3.4(1A) to order cost sanctions against parties unreasonably refusing mediation.

### 3.3 Local Transit, Geography & Catchment Data
- Physical arterial roads (e.g., A12, A14, M1, A46, A52).
- Proximity to mainline train stations and public transit hubs.
- High-density neighbouring area micro-tags for natural semantic geographic context.

---

## 4. Strict UI/UX Guardrails & Inviolable Design Standards

### 4.1 Strict Call Button Formatting
> [!IMPORTANT]
> **Every user-facing call button across the entire site MUST consist of the phone icon and the phone number ONLY: `[📞 {brand.formattedPhone}]`.**
> 
> - **FORBIDDEN**: "Call:", "Call Team:", "Call Our Mediators:", "Direct Line:", or any text prefix.
> - **MANDATORY**: An SVG phone icon followed immediately by `{brand.formattedPhone}`.

### 4.2 Zero Unicode Emojis
- **ZERO Unicode Emojis** are permitted in user-facing code, headlines, body copy, list items, buttons, or badges.
- Use only scalable SVG vector icons from the centralized `Icons.tsx` component:
  - `ScalesOfJusticeIcon`, `PhoneCallIcon`, `CalendarCheckIcon`, `ShieldLockIcon`, `CourtBuildingIcon`, `AwardSealIcon`, `ClockIcon`, `MailIcon`, `BuildingOfficeIcon`, `AlertTriangleIcon`, `CheckCircleIcon`, `XCircleIcon`.

### 4.3 Flawless Responsiveness Across All Viewports
Layouts must undergo zero-collision testing across all standard viewports:

| Viewport Width | Device Target | Header Configuration | Call CTA Placement |
| :--- | :--- | :--- | :--- |
| **320px – 430px** | Mobile Smartphones (iPhone, Pixel) | Logo (`shrink-0`, no truncation) + Hamburger button. Desktop nav hidden. | Fixed bottom `MobileStickyBar` with `[📞 {brand.formattedPhone}]` + `[📅 Book Consultation]`. |
| **640px – 767px** | Large Mobile / Phablet | Logo + `[📞 {brand.formattedPhone}]` + Hamburger button. | Header pill + Bottom sticky bar. |
| **768px – 1023px** | Tablets (iPad Portrait) | Logo + `[📞 {brand.formattedPhone}]` + Hamburger button (`xl:hidden`). | Header pill button. |
| **1024px – 1279px** | Small Laptops / iPad Pro Landscape | Logo + `[📞 {brand.formattedPhone}]` + Hamburger button (`xl:hidden`). Zero collision. | Header pill button. |
| **1280px+** | Standard Desktop / Large Monitors | Full 6-link desktop nav with active route indicator pills + `[📞 {brand.formattedPhone}]`. | Header luxury pill button. |

### 4.4 Modern Card Architecture (Eliminate Dull Card-in-Card Nesting)
- **Eliminate flat wireframe boxes**: Replace nested light-gray borders with elevated surface cards.
- **Accented Left Borders**: Utilize `border-l-4 border-amber-500` or `border-l-4 border-emerald-600` with subtle ambient backgrounds (`bg-amber-50/20` or `bg-slate-50/70`).
- **Dedicated Icon Medallions**: Prepend every statutory card or process stage with a circular gradient badge holding a dedicated vector SVG.
- **Interactive Micro-Pills**: Render neighbouring towns and geographical tags as interactive pill badges with animated accent dots (`group-hover:scale-110`).

### 4.5 Executive Luxury Footer
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

### 4.6 Emotionally Aligned Visual Direction & 10-Brand Asset Distribution Strategy
- **Image Formats**: Exclusively modern **WebP** (`.webp`) format for instant loading and sub-50KB payload.
- **Emotional Resonance**: Images must portray sincere, thoughtful, respectful mediation rooms, neutral conference spaces, and confidential legal consultations.
- **Strict Rule**: NEVER display laughing or smiling couples in separation or divorce contexts.
- **Brand-Enriched Alt Tag Architecture (Mandatory SEO Formula)**:
  - Every image `alt` attribute MUST embed the specific subject description AND the brand entity name:
    - *Editorial / Blog / Infographic Images*: `"[Specific Subject Description] from [Brand Name]"` (e.g. `"Parent reviewing travel consent letter and child passport for holiday approval from Alderton Family Mediation"`).
    - *Local Service & Location Images*: `"[Service / Topic Description] in [Town Name], [County Name] from [Brand Name]"` (e.g. `"Child Arrangements Mediation session in Leicester, Leicestershire from Alderton Family Mediation"`).

---

## 5. In-Depth Legal Articles & Dispute Guides Standard (Zero Fluff & Anti-Commodity)

To establish unbeatable topical authority, satisfy Google EEAT, and avoid commodity content flags, every legal article and dispute guide MUST adhere to the following architecture:
1. **Article Volume Constraint**: Maximum **10 articles per site** (8–10 highly authoritative guides covering core topical search clusters).
2. **Minimum 3 Contextual WebP Images**:
   - Curated blend of authentic photography and structured infographics.
   - Descriptive figure captions below each image providing genuine editorial context.
   - Mandatory brand-enriched alt tags following the formula in Section 4.6.
3. **Minimum 10 Exhaustive, Scenario-Specific FAQs**:
   - Answers must address real financial and parenting complexities (e.g. non-disclosure remedies under *Sharland*, Form D81, CEV pension vs actuarial true value, Deeds of Trust, 28-day overseas travel rules, airport Border Force protocols).
   - Rendered with interactive schema-ready accordions (`FAQPage` JSON-LD).
4. **Structured Editorial Layout (`ArticleView.tsx`)**:
   - **Interactive Table of Contents**: 6 quick-jump anchor links.
   - **Direct Answer / AEO Executive Summary Box**: Highlighting core question and direct authoritative answer upfront for Google AI Overviews and Perplexity.
   - **Statutory Legal Framework Cards**: Explicit citations of English legislation (Children Act 1989, Matrimonial Causes Act 1973, FPR 2024 amendments).
   - **Step-by-Step Resolution Roadmap**: Actionable, numbered cards with clear takeaways.
   - **Tactical Pitfalls & Common Mistakes**: Contrast cards outlining risks of unilateral actions or bypassing MIAMs.
   - **Limits of Mediation Callout**: Plain explanation of when mediation cannot proceed and urgent court injunctions (Prohibited Steps, Freezing Injunctions) are required.
5. **SSOT Consultation Callouts**:
   - Mid-article and bottom booking cards with strictly formatted call button `[📞 {brand.formattedPhone}]`.

### 5.1 Zero-Orphan & Zero-Dead-End Internal Linking Architecture
> [!IMPORTANT]
> **NO URL SHOULD BE AN ORPHAN. NO URL SHOULD BE A DEAD END.**
> Every single indexable page across the website MUST receive multiple inbound internal links and provide multiple contextual outbound links.

- **Core Services (`/services/[slug]`)**: Links to related blog articles, all regional Town+Service landing pages (`/locations/{county}/{town}/{service}`), sibling services grid, and `/contact`.
- **Town Location Pages (`/locations/[county]/[town]`)**: Links to 4 town service landing pages, designated HMCTS family court centre, local dispute advice articles, sister towns, and `/services`.
- **Town + Service Pages (`/locations/[county]/[town]/[service]`)**: Links to parent service specification, other 3 mediation services in that town, related legal guides, sister towns, and `/locations/{county}/{town}`.
- **Blog Articles (`/blog/[slug]`)**: Links to parent service page, designated family court centres, local practice hubs, 3 related dispute guides, and `/blog`.
- **HTML Sitemap (`/sitemap`) & XML Sitemap (`/sitemap.xml`)**: Lists 100% of indexable pages.

### 5.2 Semantic Anchor Text & Domain Authority Consolidation
> [!IMPORTANT]
> **Generic anchor texts are strictly banned across all portfolio sites.**
> - **BANNED**: "View local centre details", "View Details", "Read Full Guide", "Click here", "Learn more".
> - **MANDATORY**: Anchor texts MUST be descriptive and high-intent:
>   - `Explore {town.name} Practice Hub & Court Guidance →`
>   - `Schedule {service.title} in {town.name} →`
>   - `Read Full Legal Analysis for {town.name} →`
>   - `Statutory Guidelines & Protocols for {service.title} →`
>   - `Read Complete Guidance on {article.clusterName} →`

---

## 6. Technical SEO, Rich Schemas & FAQ Statutory Depth

### 6.1 Location Hub FAQ Statutory Depth (8–10+ FAQs Non-Negotiable)
Every town and location-service page MUST provide deep, practical, localized utility:
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
- **Location-Service Pages (`/locations/[county]/[town]/[service]`)**: MUST combine statutory service FAQs with localized town-court FAQs (10 total).

### 6.2 Comprehensive JSON-LD Schema Graphs
- **LocalBusiness Schema**: Exact `name`, `legalName`, `telephone`, `email`, `url`, GeoCoordinates (`latitude`, `longitude`), FMC regulatory accreditations.
- **Service Schema**: `serviceType`, `provider`, `areaServed`, court application applicability (`Form C100`, `Form A`).
- **FAQPage Schema**: County-specific and service-specific FAQ questions and answers formatted for Google SERP rich snippets.
- **BreadcrumbList Schema**: Semantic hierarchy (`Home > Locations > County > Town > Service`).

### 6.3 Next-Generation AI Search Engine Readiness (`llms.txt`)
Every site outputs an `/llms.txt` file providing a structured Markdown manifest of legal frameworks, court jurisdictions, and service offerings for retrieval-augmented generation (Perplexity, ChatGPT Search, Claude).

### 6.4 Strict Heading Hierarchy (Ahrefs & Mangools Auditor Compliant)
> [!IMPORTANT]
> **Strict Semantic Heading Hierarchy is Inviolable Across 100% of Pages.**
> SEO crawlers (Ahrefs, Mangools, Screaming Frog) flag pages with missing H1s, multiple H1s, or skipped heading levels as structural defects:
> 
> 1. **Exactly One `<h1>` Per Page**:
>    - Every page template must contain precisely one `<h1>` defining the primary subject entity.
> 2. **Zero Skipped Heading Levels**:
>    - `<h1>` MUST be followed by `<h2>` for section groupings.
>    - `<h2>` sections MAY contain `<h3>` child cards or sub-sections.
>    - Never jump from `<h1>` directly to `<h3>`, nor from `<h2>` directly to `<h4>`.
> 3. **Sub-Component Heading Nesting**:
>    - If a card or modular block (e.g. `<CourtAuthorityCard>`, `<LeadIntakeForm>`) renders an `<h3>`, the enclosing section container MUST define an overarching `<h2>` (e.g. `<h2>Designated Family Court Authority & Local Catchment for {town.name}</h2>`).
>    - Right-column contact cards in `/contact/` MUST define an `<h2>Direct Practice Information</h2>` to maintain strict hierarchy alongside the intake form's `<h2>`.

### 6.5 Zero `mailto:` & Link Hygiene Standards
> [!IMPORTANT]
> **ZERO `mailto:` Anchors Across the Entire Codebase.**
> Many SEO crawlers (including Ahrefs) flag `mailto:` links as broken links or crawl-traps:
> 
> 1. **No `<a href="mailto:...">` Anchors**:
>    - Render email addresses as selectable text: `<span className="select-all font-mono font-bold ...">{brand.contactEmail}</span>`.
> 2. **Telephone Links**:
>    - Telephone numbers remain click-to-call `<a href="tel:03300...">` with mandatory `[📞 {brand.formattedPhone}]` formatting.
> 3. **Strict Trailing Slashes**:
>    - All internal routes (`Link href` and anchors) MUST have trailing slashes (e.g. `/services/`, `/services/miam-assessment/`, `/locations/`, `/contact/`, `/sitemap/`) to match Next.js `trailingSlash: true`. This prevents 308 redirects and ensures perfect crawler efficiency.
> 4. **Zero Broken Links, 404s, or Orphan Pages**:
>    - Every page must be linked from the HTML sitemap (`/sitemap/`), XML sitemap (`/sitemap.xml`), header/footer navigation, and reciprocal cross-links.

### 6.6 Strict Meta Title & Meta Description Constraints
> [!IMPORTANT]
> **Character Limits & Geographic Targeting Standards:**
> 
> 1. **Meta Title (<= 60 Characters Maximum)**:
>    - Root layout `template` MUST be configured as `template: '%s'` (NEVER append `| Brand Name` in the template, as this causes unexpected string inflation).
>    - Every page must explicitly define a complete title `<= 60 characters`.
>    - Location pages MUST include `{town.name}`:
>      - Town page: `Family Mediation in ${town.name} | ${brand.shortName}` (<= 52 chars).
>      - Town + Service page: `${service.navLabel} in ${town.name} | ${brand.shortName}` (<= 56 chars).
> 2. **Meta Description (<= 160 Characters Maximum)**:
>    - Every page must define a high-intent, click-worthy description `<= 160 characters`.
>    - Location pages MUST include both `{town.name}` and `{town.county}`:
>      - Town page: `FMC-accredited family mediation & fast MIAMs in ${town.name}, ${town.county}. Avoid contentious court hearings. Individual appointments available in 48 hours.` (154–156 chars).
> 3. **Automated Verification**:
>    - Run `node scripts/audit-seo-headings.js` to empirically verify that 0 pages violate title length, description length, heading hierarchy, or contain `mailto:` links.

### 6.7 Geographic HTML Meta Tagging & Location Page Hygiene
> [!IMPORTANT]
> **Native Geotagging & Geo-Coordinates Across All Localized Assets:**
> 
> 1. **HTML Geo Meta Tags in `<head>`**:
>    Every localized page template (`/locations/[county]/[town]/` and `/locations/[county]/[town]/[service]/`) must emit native HTML geo meta tags alongside OpenGraph:
>    ```html
>    <meta name="geo.region" content="GB-ENG" />
>    <meta name="geo.placename" content="{town.name}, {town.county}" />
>    <meta name="geo.position" content="{lat};{lng}" />
>    <meta name="ICBM" content="{lat}, {lng}" />
>    ```
> 2. **Localized Image Alt Attributes & Metadata**:
>    All imagery served on town and service-location hubs must include precise geo-contextual alt tags formatted as:
>    `{Service} consultation room in {town.name}, {town.county} - FMC Accredited Family Mediation`
> 3. **Dual Geo Coordinates (JSON-LD + HTML)**:
>    Never rely on JSON-LD alone. Search engines and map bots parse both `<meta name="geo.position">` and JSON-LD `GeoCoordinates` (`latitude`, `longitude`) to index local catchment boundaries.

### 6.8 Enterprise Snagging Audit & Discovery Standards (`robots.txt`, `sitemap.xml`, `llms.txt`, Visible HTML Sitemap)
> [!IMPORTANT]
> **Zero-Defect Snagging Protocol Prior to Deployment:**
> 
> 1. **Dynamic `robots.txt`**:
>    - Root route handler `src/app/robots.txt/route.ts` dynamically emits `User-agent: *`, `Allow: /`, and `Sitemap: ${BRAND.siteUrl}/sitemap.xml`.
> 2. **Dynamic `sitemap.xml`**:
>    - Root route handler `src/app/sitemap.xml/route.ts` generates standard sitemaps.org XML covering 100% of indexable routes (core, services, county/town hubs, town/service hubs, blog posts).
>    - Every single `<loc>` MUST end with a trailing slash to prevent crawler redirects.
> 3. **Dynamic `llms.txt`**:
>    - Root route handler `src/app/llms.txt/route.ts` exports structured Markdown with practice identity, FMC accreditation, telephone, contact email, and all service/location/blog links with trailing slashes.
> 4. **Visible HTML Sitemap (`/sitemap/`)**:
>    - Accessible directly at `/sitemap/` with single H1, section H2s, and child H3s. Contains links to all 81 routes.
> 5. **Self-Referencing Canonical Tags**:
>    - Root `layout.tsx` MUST configure `alternates: { canonical: './' }` with `metadataBase: new URL(BRAND.siteUrl)`. Next.js resolves exact trailing-slash canonical URLs across all pages.
> 6. **Automated Snagging Suite**:
>    - Execute `node scripts/snagging-audit.js` to ensure zero missing H1s, zero hierarchy skips, zero mailto links, zero broken links, zero non-trailed URLs, zero broken anchors, zero missing alt tags, and zero invalid canonicals.

---

## 7. Enterprise Lead Capture & Automated Dispatch Architecture (Single Source of Truth)

### 7.1 Reusable `<LeadIntakeForm>` Architecture
All lead capture across every site, page, and directory is powered exclusively by `@mediation/core`: `<LeadIntakeForm>`:
- **Placements Across Every Site**:
  1. **Home Page (`/`)**: Dedicated `#book-assessment` section with smooth-scroll hero anchor triggers.
  2. **Contact Portal (`/contact`)**: Primary intake form accompanied by physical head office credentials and crisis safeguarding lines.
  3. **Town Practice Hubs (`/locations/[county]/[town]`)**: Embedded in hero grid column with `defaultTown` pre-selected.
  4. **Town + Service Pages (`/locations/[county]/[town]/[service]`)**: Pre-populated with specific town and statutory service category.
  5. **Core Service Hubs (`/services/[slug]`)**: Pre-selected for immediate procedural assessment.

### 7.2 SSOT Dispatch Pipeline & Themed Email Delivery
1. **Dynamic Target Resolution & Delivery Endpoint**:
   Form submissions dynamically resolve their delivery endpoint from `GLOBAL_CONTACT.leadSubmitEndpoint`. During testing and production, lead enquiries route to the central destination mailbox:
   ```typescript
   export const GLOBAL_CONTACT = {
     leadRecipientEmail: 'venturevidyahindi@gmail.com',
     formSubmitToken: 'venturevidyahindi@gmail.com',
     leadSubmitEndpoint: 'https://formsubmit.co/ajax/venturevidyahindi@gmail.com',
     leadWebhookEndpoint: 'https://formsubmit.co/ajax/venturevidyahindi@gmail.com',
   };
   ```
2. **Beautiful Themed HTML Email Delivery (`_template: 'box'`)**:
   Leads are formatted using FormSubmit's structured box template (`_template: 'box'`) delivering a clean, branded email with clearly demarcated rows for:
   - Client Full Name (`Client Full Name`)
   - Direct Contact Phone (`Client Contact Phone`)
   - Email Address (`Client Email Address` & `_replyto`)
   - Catchment / Town (`Nearest Practice Town`)
   - Statutory Service Pathway (`Mediation Service Requested`)
   - Preferred Contact Window (`Preferred Callback Window`)
   - Confidential Family Summary (`Confidential Enquiry Notes`)
   - Originating Brand Entity (`Originating Brand`)
   - Referral Page & London Timestamp (`Submission Source URL` & `Submission Timestamp (UK)`)
3. **Anti-Spam & Bot Shield**:
   - Hidden honeypot field (`website_url_check`) traps automated bots silently.
   - Zero CAPTCHA friction (`_captcha: 'false'`) ensures maximum conversion for distressed family clients.
   - Originating Brand Entity Name
   - Exact Page URL and Timestamp
3. **Anti-Spam & Bot Shield**:
   - Hidden honeypot field (`website_url_check`) traps automated bots silently.
   - Zero CAPTCHA friction (`_captcha: 'false'`) ensures maximum conversion for distressed family clients.

### 7.3 Responsive Lead Form UX Standards
- **Mobile First (320px–640px)**: 100% full-width inputs, touch-friendly 48px tap targets, legible 16px input font size to prevent iOS Safari auto-zoom.
- **Desktop (1024px+)**: Elevated two-column grid layout, high-contrast labels, clear visual focus states, and instant submit feedback.

---

## 8. Hosting, CI/CD & Deployment Engine

### 8.1 Shared Hosting & Environment Constraints
- **Target Host Type**: Shared PHP / LiteSpeed Web Server.
- **Server Rule**: No Node.js / SSR persistent runtime is permitted on production servers. Sites MUST be exported as static HTML/CSS/JS (`output: 'export'`).
- **Document Root**: Remote root `/` serves as the public docroot.
- **Trailing Slash Enforcement**: All routes must output directory-style URLs (`/about/index.html`, `/services/miam/index.html`) via `trailingSlash: true` in `next.config.ts`.

### 8.2 Production Web Server Configuration (`.htaccess`)
A production `.htaccess` file MUST be placed in `public/.htaccess` and copied into `out/.htaccess` during build:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Strip .html extension
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,}\s([^.]+)\.html [NC]
  RewriteRule ^ %1 [R=301,L]

  # Redirect non-trailing-slash directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.[a-zA-Z0-9]{1,5}|/)$
  RewriteRule ^(.*)$ $1/ [R=301,L]

  # Serve index.html for directories
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.(html|txt)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
  <FilesMatch "\.(js|css|webp|png|jpg|jpeg|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
```

### 8.3 Automated GitHub Actions CI/CD (`deploy-<brand>.yml`)
Automated deployments run on every git push affecting that brand:
```yaml
name: Deploy Alderton Family Mediation to cPanel

on:
  push:
    branches:
      - main
    paths:
      - 'Sites/aldertonfamilymediation/**'
      - 'packages/**'
      - '.github/workflows/deploy-alderton.yml'
  workflow_dispatch:

jobs:
  deploy-alderton:
    name: Build & FTPS Deploy Alderton
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Monorepo
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Workspace Dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Alderton Static Export
        run: pnpm --filter aldertonfamilymediation run build

      - name: Copy .htaccess to Output
        run: cp Sites/aldertonfamilymediation/public/.htaccess Sites/aldertonfamilymediation/out/.htaccess

      - name: Sync Static Export to cPanel via FTPS
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          port: 21
          server-dir: /
          local-dir: ./Sites/aldertonfamilymediation/out/
          dangerous-clean-slate: false
```

### 8.4 Turnkey Deployment Script (`deploy-ftp.py`)
Direct terminal deployments use `python3 scripts/deploy-ftp.py`:
```bash
python3 scripts/deploy-ftp.py \
  --host "s688.lon1.mysecurecloudhost.com" \
  --user "alderton@mediationdirect.co.uk" \
  --password "eOfia5JLHt6D2qNhdgmLw35z" \
  --source "Sites/aldertonfamilymediation/out"
```

### 8.5 Pre-DNS Live Verification
Before updating DNS records, verify live responses directly against the hosting IP using `curl --resolve`:
```bash
# Verify HTTP Port 80
curl -s --resolve aldertonfamilymediation.co.uk:80:77.95.113.13 http://aldertonfamilymediation.co.uk/ | grep "03300 100 199"

# Verify HTTPS Port 443 (LiteSpeed HTTP/2)
curl -s -k --resolve aldertonfamilymediation.co.uk:443:77.95.113.13 https://aldertonfamilymediation.co.uk/ | grep "03300 100 199"
```

---

## 9. One-Command Brand Launch Playbook

To launch an entirely new brand (e.g. Brand #3: *Kingsley Family Mediation*):

### Step 1: Add Contact Details to SSOT
In `packages/core/src/config/global-contact.ts`:
```typescript
export const KINGSLEY_CONTACT = {
  phone: '01214974000',
  formattedPhone: '0121 497 4000',
  email: 'enquiries@kingsleyfamilymediation.co.uk',
  telUri: 'tel:01214974000',
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
  --phone "01214974000" \
  --formattedPhone "0121 497 4000" \
  --countyData "SITE3_COUNTIES" \
  --primaryHex "#1E293B" \
  --accentHex "#0284C7"
```

### Step 4: Build, Verify Links & Export
```bash
pnpm install
pnpm --filter kingsleyfamilymediation run build
node scripts/verify-internal-links.js
```

### Step 5: Deploy & Verify
```bash
python3 scripts/deploy-ftp.py --source "Sites/kingsleyfamilymediation/out"
curl -s --resolve kingsleyfamilymediation.co.uk:80:<HOST_IP> http://kingsleyfamilymediation.co.uk/
```

---
*Maintained by Antigravity Autonomous Engineering & Lead Generation Architecture.*
