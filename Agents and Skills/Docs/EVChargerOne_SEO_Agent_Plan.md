# **EVChargerOne.com Comprehensive SEO & Architecture Blueprint**

Technical execution roadmap optimized for AI coding agent deployment and sequential implementation.

# **Phase 1: Technical SEO & Critical Bug Fixes**

## **Task 1.1: Fix Dynamic Routing Cannibalization**

* **Issue:** Cross-pollinated slugs (e.g., `/locations/bend/ev-charger-installation-salem-or/`).  
* **Action:** Update routing logic (Astro/Next.js) to enforce strict 1:1 city-to-service mapping. Prevent multi-city injection in URLs, `<title>` tags, and H1s.

## **Task 1.2: AI Footprint Sanitization**

* **Issue:** Leaked AI prompts ("Machine Extract") trigger Google's Helpful Content spam filters.  
* **Action:** Implement a regex filter node in the data pipeline (e.g., n8n/Supabase) to strip `Direct Answer`, `Machine Extract`, and raw markdown artifacts before pushing to production.

## **Task 1.3: Core Web Vitals Optimization**

* **Action:** Ensure LCP (Largest Contentful Paint) is under 2.5s. Optimize hero images to WebP format.

# **Phase 2: Semantic SEO, Hubs & Spokes, & Page Authority**

## **Task 2.1: Hub and Spoke Internal Linking Architecture**

* **Action:** Build a State/Region "Hub" page (e.g., `/oregon/`).  
* **Action:** Link the Hub to City "Spokes" (e.g., `/oregon/bend/`).  
* **Action:** Implement strict semantic breadcrumbs: `Home > [State] > [City] > [Service]`.

## **Task 2.2: Programmatic Layout Spintax (Boilerplate Reduction)**

* **Issue:** Identical DOM structure across 100+ pages looks like spam.  
* **Action:** Create 3 distinct structural layout components. Randomly assign them based on the location's database ID to break the programmatic footprint.

## **Task 2.3: Semantic Entity Injection**

* **Action:** Dynamically inject local relevance entities: Local power company names, hyper-local climate considerations, and county permit office links.

# **Phase 3: AEO, GEO, and Schema (Generative Engine Optimization)**

## **Task 3.1: JSON-LD Injection**

* **Action:** Inject dynamic `LocalBusiness` and `Service` schema per city page.  
* **Action:** Must include `areaServed`, `priceRange`, and `hasCredential` (e.g., CCB license numbers).

## **Task 3.2: Formatting for LLM Crawlers (AEO)**

* **Action:** Format pricing and permit requirements using semantic `<table>` and `<ul>` elements. AI overviews (Search Generative Experience) prefer structured tabular data.

# **Phase 4: Money Page SEO & Trust Signals (E-E-A-T)**

## **Task 4.1: Localize Contact Elements**

* **Action:** Replace the national `(888)` number with dynamically mapped local area codes.

## **Task 4.2: Multi-Step Lead Form (CRO)**

* **Action:** Replace the long static form with a low-friction multi-step component. (Step 1: EV Model, Step 2: Zip Code, Step 3: Contact Info).

## **Task 4.3: Trust Factor Injection**

* **Action:** Add a "Local Master Electricians" localized team section. Display state-specific contractor license badges in the hero section.

# **Phase 5: Expansion \- Top 20 High-Intent Locations**

Target these high EV-adoption cities for the next programmatic build-out:

| Priority | Metro Area | State | Target Hub | Priority Level |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Los Angeles | CA | `/california/` | Tier 1 |
| 2 | San Francisco | CA | `/california/` | Tier 1 |
| 3 | San Jose | CA | `/california/` | Tier 1 |
| 4 | San Diego | CA | `/california/` | Tier 1 |
| 5 | Seattle | WA | `/washington/` | Tier 1 |
| 6 | Austin | TX | `/texas/` | Tier 1 |
| 7 | Denver | CO | `/colorado/` | Tier 1 |
| 8 | Portland | OR | `/oregon/` | Tier 1 |
| 9 | Miami | FL | `/florida/` | Tier 2 |
| 10 | Atlanta | GA | `/georgia/` | Tier 2 |
| 11 | Chicago | IL | `/illinois/` | Tier 2 |
| 12 | Phoenix | AZ | `/arizona/` | Tier 2 |
| 13 | Dallas | TX | `/texas/` | Tier 2 |
| 14 | Houston | TX | `/texas/` | Tier 2 |
| 15 | Boston | MA | `/massachusetts/` | Tier 2 |
| 16 | Washington | D.C. | `/district-of-columbia/` | Tier 2 |
| 17 | Boulder | CO | `/colorado/` | Tier 2 |
| 18 | Sacramento | CA | `/california/` | Tier 2 |
| 19 | Raleigh | NC | `/north-carolina/` | Tier 2 |
| 20 | Charlotte | NC | `/north-carolina/` | Tier 2 |

