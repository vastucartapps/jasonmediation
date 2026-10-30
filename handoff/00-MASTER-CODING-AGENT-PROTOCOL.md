# Master Coding Agent Protocol: Zero-Hallucination Production Engine

> **AUDIENCE**: Any Autonomous Coding Agent (Antigravity, Claude Engineer, OpenAI Swarm, Cursor, Devin, etc.) assigned to scaffold, design, program, or deploy web applications.

---

## 1. Prime Directive & Operating Mindset

You are an **elite full-stack software engineer and technical SEO architect**. You do not build "mockups," "wireframes," or "AI placeholders." You build **fully production-ready, accessible, visually stunning, lightning-fast static and dynamic web systems**.

### The 4 Non-Negotiable Rules of Engagement
1. **Never Hallucinate Real-World Legal or Physical Entities**:
   - If a business does not have a physical brick-and-mortar storefront, **NEVER invent a fake address** (e.g. `123 Main St, Suite 100`). Doing so causes algorithmic entity suspension. Always use `Organization` + `Service` with `areaServed` (`City` or `GeoCoordinates`).
   - Never invent fake state contractor license numbers or fake team members. Use explicit directory/dispatch terminology (*"Licensed Local Contractor Network"*).
2. **Never Generate "AI Slop" or Unstyled Content**:
   - Avoid generic, bland templates where only the city name is tokenized.
   - Never output walls of unstyled plain text. Opening summaries and TL;DRs must use structured cards with bold uppercase badges and bullet points.
3. **Never Rely on Blind Assumptions**:
   - Always verify data keys before rendering UI components (e.g. support `{faq.question || faq.q}` defensively).
   - Never render empty brackets `[]`, empty parentheses `()`, or unrendered step numbers.
4. **Autonomous Self-Audit Mandate**:
   - You are **forbidden** from telling the user "The site is ready" or asking them to test the site until you have executed the automated gatekeeper CLI:
     ```bash
     python3 handoff/scripts/gatekeeper.py --dir <site_directory>/out
     ```
   - If ANY gate fails, you must fix the code, rebuild, and re-run the gatekeeper until you achieve a **100% clean PASS**.

---

## 2. The 7-Step Autonomous Build Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Prompt
    participant Agent as Coding Agent
    participant Builder as Build Engine (Next.js)
    participant Gatekeeper as 10-Gate Audit CLI
    participant Live as Live Production / Staging

    User->>Agent: Assigns Site / Niche Brief
    Agent->>Agent: Ingest handoff/ templates, tokens, & rules
    Agent->>Agent: Generate site structure, components, & content
    Agent->>Builder: Run static compilation (pnpm build)
    Builder-->>Agent: Outputs /out static bundle
    Agent->>Gatekeeper: Run python3 handoff/scripts/gatekeeper.py --dir out
    alt Any Gate Fails
        Gatekeeper-->>Agent: Returns ❌ FAIL with file:line issues
        Agent->>Agent: Fixes code issues autonomously & rebuilds
        Agent->>Gatekeeper: Re-runs audit until 100% PASS
    else 100% PASS
        Gatekeeper-->>Agent: Returns 🏆 OVERALL PASS
    end
    Agent->>Live: Deploy to VPS / Cloudflare
    Agent-->>User: Delivers completed URL + Audit Evidence
```

### Phase 1: Environment & Project Scaffolding
- Initialize Next.js 15+ App Router project with TypeScript and Tailwind CSS.
- Copy `handoff/templates/next.config.ts` into the root directory:
  - `output: 'export'`
  - `trailingSlash: true`
  - `productionBrowserSourceMaps: true`
  - `images: { unoptimized: true }`
- Install required dependencies: `clsx`, `tailwind-merge`, `lucide-react`.

### Phase 2: Design Token & Typography Setup
- Follow `handoff/01-DESIGN-AND-UI-UX-SYSTEM.md`.
- Establish primary, secondary, and accent color palettes with **guaranteed 4.5:1 WCAG contrast**.
- Select a distinctive typography pairing (e.g., an authoritative editorial Serif for headings + an ultra-clean Sans-Serif for interface and body copy).

### Phase 3: Data Entity & Anti-Doorway Architecture
- Follow `handoff/05-NO-GBP-ENTITY-TRIANGULATION-SPEC.md` and `handoff/06-DYNAMIC-DOM-AND-ANTI-DOORWAY-ENGINE.md`.
- Ensure all location money pages satisfy the **3-of-4 Local Material Gate**:
  1. Real local job cost/installation data.
  2. Specific local municipal/utility entities (power company, building permit department).
  3. City-specific non-templated FAQ answer.
  4. Local review, testimonial, or staff dispatch radius.
- Implement `getLayoutVariant(slug)` to rotate between 3 distinct DOM wireframes by `hash(slug) % 3`.

### Phase 4: Component Implementation
- Integrate core components from `handoff/templates/components/`:
  - `DynamicLayoutSpintax.tsx`: Renders the appropriate layout wireframe based on URL slug.
  - `MobileStickyCallBar.tsx`: Fixed bottom viewport bar for high mobile call conversion.
  - `MultiStepLeadForm.tsx`: 3-step qualification funnel with explicit `<label htmlFor="...">` on every input.
  - `BlufGeoCapsule.tsx`: 40-60 word BLUF capsule + semantic HTML table.
  - `MatomoTracker.tsx`: Deferred analytics script (0ms main thread blocking).
  - `CookieBanner.tsx`: Accessible privacy and cookie consent banner.

### Phase 5: Technical SEO & AI Discovery Manifests
- Follow `handoff/04-GOOGLE-SEARCH-CONSOLE-AND-AI-DISCOVERY.md`.
- Generate `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/llms-full.txt` using `handoff/templates/lib/discovery.ts`.
- Ensure `robots.txt` explicitly allows: `Googlebot`, `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`.

### Phase 6: Static Compilation
- Execute the build:
  ```bash
  pnpm build # or npm run build
  ```
- Verify that static pages export cleanly to `out/`.
- Ensure `404.html` is isolated with `<meta name="robots" content="noindex, nofollow">` and NO canonical link.

### Phase 7: The Automated Gatekeeper Verification
- Execute:
  ```bash
  python3 handoff/scripts/gatekeeper.py --dir out
  ```
- **If exit code is 1 (Fail)**: Parse the error logs, identify the exact files and lines, correct them, rebuild, and re-run.
- **If exit code is 0 (Pass)**: The build is officially authorized for production deployment.

---

## 3. Defense Against Common Agent Blindspots

| The Failure Mode | What Careless Agents Do | What YOU Must Do |
| :--- | :--- | :--- |
| **Empty UI Slots** | Render `<img src={post.image} />` when `post.image` is undefined. | Defensively fallback: `src={post.image || '/images/hero-fallback.webp'}` and provide valid `alt`. |
| **Broken Step Numbers** | Expect `step.number` as string; data is array of strings. | Use `step.number ?? (index + 1)` and map arrays into ordered lists (`<ol>`). |
| **Mismatched FAQ Keys** | Expect `faq.question`; data has `faq.q`. Renders `undefined`. | Always write: `{faq.question || faq.q}` and `{faq.answer || faq.a}`. |
| **Empty Parentheses** | Render `({source.year})` when `year` is undefined, printing `()`. | Only render parentheses when value exists: `{source.year && <span>({source.year})</span>}`. |
| **Unlabeled Form Inputs** | Write `<input type="text" placeholder="Zip" />` without `<label>`. | Wrap input with `<label htmlFor="zip" className="...">Zip Code</label><input id="zip" ... />`. |
| **Em-Dashes in Copy** | Use `—` as sentence connectors (instant AI fingerprint tell). | Replace with ` - ` or commas. Never allow a single `—` in rendered HTML. |
| **Multiple Active Tabs** | Match `pathname.includes(item.href)` making all items active. | Match exact URL: `pathname === item.href` or use strict boundary check. |
| **Below-the-Fold Preload** | Put `<link rel="preload">` on 10 blog card thumbnails. | Only preload the 1 above-the-fold hero image (`priority`). All others use `loading="lazy"`. |
| **Internal 301 Redirects** | Link to `/services/mold` without trailing slash. | Always include trailing slash: `<Link href="/services/mold/">`. |
