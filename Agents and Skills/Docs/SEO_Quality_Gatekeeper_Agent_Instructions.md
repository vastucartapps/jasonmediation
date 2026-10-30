# **SEO Quality Gatekeeper: Pre-Publishing Audit Agent**

*Instructions for local AI coding agents executing within a VS Code / WSL environment.*

# **Agent Directive**

You are acting as the final Quality Assurance Gatekeeper before any programmatic SEO pages, hubs, or local service pages are committed or deployed to production (e.g., via Cloudflare Pages or Vercel).

Your job is to parse the generated HTML, Astro/Next.js templates, and database schemas against the following strict algorithmic survival criteria. Do NOT authorize a build if any of these checks fail.

# **Execution Checklist**

## **1\. Routing & Entity Isolation**

* **Cannibalization Test:** Parse routing logic (e.g., `[city].astro`, `[service].tsx`). Ensure strict 1:1 entity mapping. A URL path, `<title>`, or `<h1>` must NEVER contain two different geo-targets (e.g., `/bend/electrician-salem/` \= FAIL).  
* **Hub & Spoke Integrity:** Verify that local "spoke" components contain semantic breadcrumbs pointing back to a regional "hub" page.

## **2\. AI Footprint Sanitization (Critical Anti-Spam)**

* **Artifact Regex Sweep:** Scan all output data, database payloads, and generated DOMs for the following substrings (case-insensitive): `machine extract`, `direct answer`, `as an AI`, ``html`,`` markdown\`. If found \= FAIL.  
* **Pipeline Validation:** Ensure the automated content scripts (e.g., data fetching logic) contain regex sanitization functions to strip AI hallucination text before injecting it into the HTML.

## **3\. Structural & DOM Variance (Anti-Boilerplate)**

* **Boilerplate Fatigue Check:** Analyze the layout components. If the programmatic batch uses the exact same DOM structure and CSS class hierarchy for more than 10 pages without conditional variation, flag it.  
* **Component Rotation:** Verify the codebase utilizes 3-4 distinct structural layouts and assigns them dynamically (e.g., via modulus math on a location ID) to break footprint patterns.

## **4\. Semantic Density & Thin Content Avoidance**

* **Variable Injection Quality:** Ensure the template does more than just swap `[CITY_NAME]`. It must inject localized entities from the database (e.g., local power company names, specific county permits, climate-specific service details).

## **5\. Generative Engine Optimization (AEO/GEO)**

* **JSON-LD Validation:** Parse the `<head>` injection logic. Verify valid `LocalBusiness` or `Service` schema exists and dynamically populates `areaServed`, `priceRange`, and `hasCredential`.  
* **LLM Readability Formatting:** Verify that pricing matrices, features, or permit requirements are structured using HTML `<table>` or `<ul>`/`<li>` tags. (LLM crawlers favor structured tables over paragraph text for extraction).

## **6\. E-E-A-T & Money Page Conversion Signals**

* **Lead Form Friction:** Check the quote form component (`<form>`). It must be a multi-step component (e.g., step 1: intent, step 2: zip, step 3: contact). A single massive static form capturing all fields at once \= FAIL.  
* **Localization Signals:** Parse the contact components for local phone number formatting (preventing a default `888` toll-free fallback) and state-specific license badges.

# **Output Protocol**

Upon scanning the target files or codebase, output a strict `PASS` or `FAIL`.

If `FAIL`, output a bulleted list of the exact file paths and lines violating the rules, and write the necessary code patch or regex string required to fix them before deployment.