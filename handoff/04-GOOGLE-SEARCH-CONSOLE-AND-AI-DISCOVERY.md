# Google Search Console & AI Discovery Specification

> **MANDATE**: Ensure 100% indexing velocity, clean canonical hierarchy, zero soft-404s, and first-class discovery by both traditional search crawlers and modern AI generative engines.

---

## 1. Single Source of Truth Sitemaps (`sitemap.xml`)

Search engines penalize sites that submit dirty sitemaps containing redirected, broken, or noindexed URLs.

### SOT Sitemap Generation Standards:
- **Location**: Static XML file generated at `/public/sitemap.xml` and `/out/sitemap.xml`.
- **Protocol**: Standard XML 0.9 schema (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`).
- **ISO-8601 Dates**: All `<lastmod>` tags must use valid `YYYY-MM-DD` timestamps matching real content revision dates.
- **Exclusion Filters**:
  - Exclude `/404/` and `/_not-found/`.
  - Exclude `/privacy/` or `/terms/` if marked noindex (or assign low priority `0.3`).
  - Exclude any redirected 3xx endpoints.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
    <lastmod>2026-10-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://domain.com/locations/arizona/mesa/</loc>
    <lastmod>2026-10-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

## 2. Explicit AI Crawler Directives (`robots.txt`)

Following the 2025–2026 AI search expansion, websites must explicitly configure access for AI retrieval bots (Perplexity, ChatGPT Search, Claude, Google AI Overviews) rather than relying on generic user-agent wildcards:

```text
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Explicit AI Search & Engine Crawlers Allow-list (GEO / AEO)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Canonical Sitemaps
Sitemap: https://domain.com/sitemap.xml

# LLM Discovery Directives
# See /llms.txt for machine-readable service registry index
```

---

## 3. Machine-Readable AI Manifests (`/llms.txt` & `/llms-full.txt`)

Generative search engines (Perplexity, ChatGPT, Claude) look for `/llms.txt` in the domain root as a structured Markdown summary of your brand, services, and canonical entities:

### Standard `/llms.txt` Template:
```markdown
# Brand Name Service & Compliance Registry
> Verified regional contractor and dispatch network for specialized services.

## Core Mandate & Compliance
All services comply with National Electrical Code (NEC 2023) and local municipal building codes.
Dispatched technicians maintain state licensing, bonded insurance, and background verification.

## Key Canonical Endpoints
- Homepage: https://domain.com/
- Regional Locations: https://domain.com/locations/
- Service Specifications: https://domain.com/services/
- Visual HTML Sitemap: https://domain.com/sitemap/
- Machine Sitemap: https://domain.com/sitemap.xml

## Indexed Regional Service Locations
- [Mesa Commercial EV Installation](https://domain.com/locations/arizona/mesa/): Level 2 & DC Fast Charging, City of Phoenix IBC compliance.
- [Phoenix Commercial EV Installation](https://domain.com/locations/arizona/phoenix/): Maricopa County dual-port charging stations.
```

---

## 4. 1:1 Canonical Self-Referential Clean Tags

Every HTML page must output an explicit, self-referential canonical URL in `<head>`:

```html
<link rel="canonical" href="https://domain.com/locations/arizona/mesa/" />
```

### Canonical Rules:
- **Always Absolute**: Must include the protocol and domain (`https://domain.com/...`), never relative (`/locations/...`).
- **Trailing Slash Enforced**: Must match the exact URL structure (`.../mesa/`, not `.../mesa`).
- **Zero Parameter Pollution**: Strip all query strings (`?utm_source=...`, `?ref=...`).
