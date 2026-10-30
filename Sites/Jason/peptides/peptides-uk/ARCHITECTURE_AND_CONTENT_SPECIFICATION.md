# Peptides UK: Information Architecture & Content Specification Dossier
**Document Version:** 2.0 (Clinical & Academic Handover Specification)  
**Target Domain:** `peptides-uk.org`  
**Audience:** UX/UI Designers, Information Architects, and Frontend Engineers  
**Scope:** Content hierarchy, data organization, entity schemas, and Core Web Vitals accessibility requirements. *(Explicitly excludes subjective styling, CSS frameworks, or hardcoded color palettes).*

---

## 1. Executive Purpose, Audience & Regulatory Framing

### 1.1 What the Platform Is
`peptides-uk.org` is an open-access British chemical registry, academic research compendium, and analytical sourcing directory for synthetic peptides. It serves as an authoritative bridge between:
1. **Peer-reviewed pre-clinical scientific literature** (indexed via PubMed and PubChem).
2. **Statutory UK chemical and medical governance** (MHRA directives, Human Medicines Regulations 2012 [SI 2012/1916], Misuse of Drugs Act 1971, and COSHH 2002).
3. **Independent commercial supplier transparency** (benchmarking third-party HPLC chromatography purity, cold-chain logistics, and analytical laboratory verification).

### 1.2 What the Platform Is NOT
- It is **not** an online pharmacy, medical dispensary, or manufacturer.
- It does **not** sell, compound, bottle, or distribute substances.
- It strictly **does not** provide human administration guidance, clinical dosing regimens, or therapeutic health claims. All cataloged materials are classified strictly as **unlicensed research chemicals for in vitro scientific and laboratory inquiry only**.

### 1.3 Target Audience Personas
- **Academic & University Researchers:** Requiring validated IUPAC nomenclature, empirical CAS numbers, monoisotopic molecular weights, residue sequence chains, and PubMed experimental citations.
- **Biotechnology Laboratory Procurement Officers:** Seeking batch HPLC purity certifications (≥98.0%), independent European testing verification, neutral borosilicate glass packaging, and domestic dispatch speeds (Royal Mail Tracked 24).
- **Statutory Compliance & Legal Officers:** Verifying compound legal scheduling, MHRA regulatory enforcement updates, and COSHH chemical safety handling protocols.

---

## 2. Homepage: Information Architecture & Content Organization

The Homepage is organized into seven sequential information zones. Each zone serves a specific data requirement and user intent.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Zone 1: Statutory Notice & Live Laboratory Dispatch Status             │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 2: Platform Identity, Mandate & Primary Research Search           │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 3: Live Reagent Catalog & Searchable Laboratory Sourcing Matrix   │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 4: Physiological Signaling Pathways & Research Classifications    │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 5: Interactive Aseptic Reconstitution & Dilution Engine           │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 6: Five-Stage Analytical Supplier Verification Framework          │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 7: Verified British Distributor Comparison Matrix                 │
├────────────────────────────────────────────────────────────────────────┤
│ Zone 8: Statutory Regulatory Declarations & Canonical Sitemap Footer   │
└────────────────────────────────────────────────────────────────────────┘
```

### Zone 1: Statutory Notice & Live Dispatch Status Bar
*Positioned at the absolute top of the viewport to establish legal compliance before any interaction.*
- **Live UK Laboratory Dispatch Notice:** Confirmation of domestic dispatch corridors (Royal Mail Tracked 24 and cold-chain priority dispatch).
- **Statutory Regulatory Standard:** Reference to MHRA In Vitro Standard (SI 2012/1916).
- **Quick Links:** Direct anchor to the UK Legal Status Matrix.

### Zone 2: Platform Identity & Search Architecture
*Establishes the authority of the British Clinical Chemical Registry and facilitates instant discovery.*
- **Registry Title & Mandate:** Clear naming as *Peptides UK: British Clinical Chemical Registry*.
- **Authoritative Value Proposition:** Summarizes the registry's function—indexing synthetic peptides, amino acid sequence structures, verified CAS numbers, and empirical laboratory supplier benchmarks.
- **Verification Badges:**
  - ISO/IEC 17025 European Third-Party Tested Assays.
  - MHRA SI 2012/1916 In Vitro Laboratory Reagent Standard.
  - COSHH 2002 Controlled Laboratory Reference.
- **Search & Filter Controls:**
  - Keyword search input querying compound common names, synonyms, CAS numbers, and PubChem CIDs.
  - Pathway filter chips (Tissue Repair, Neuropeptides, GHRH/Secretagogues, Metabolic, Dermal, Longevity).
  - Quick action links to full Catalog, Pathways, Suppliers, Calculator, Formats, Verification, and Regulatory Hub.

### Zone 3: Live Reagent Catalog & Laboratory Sourcing Matrix
*The primary interactive chemical table allowing researchers to evaluate reagents side-by-side.*
- **Per-Compound Data Fields Displayed in the Matrix:**
  1. **Compound Identity:** Common trade name (e.g., BPC-157, TB-500, Semax), systematic chemical name, and research classification badge.
  2. **Chemical Identifiers:** CAS Registry Number (e.g., `137525-51-0`), Empirical Molecular Formula (e.g., `C62H98N16O22`), and Monoisotopic Molecular Weight (g/mol).
  3. **Biochemical Target:** Primary physiological target (e.g., VEGFR2 / FAK-Paxillin, Thymosin-beta-4 active fragment, ACTH/TrkB modulation).
  4. **Analytical Purity Floor:** Baseline HPLC chromatographic purity threshold (e.g., ≥99.2% Purity).
  5. **Standard Storage Diluent:** Reconstitution solvent recommendation (Bacteriostatic Water with 0.9% Benzyl Alcohol, Sterile Water, or 0.1M Acetic Acid).
  6. **Market Starting Price (GBP):** Baseline benchmark price per vial among verified UK distributors.
  7. **Verified Suppliers Count:** Number of audited UK distributors stocking analytical batches.
  8. **Action Links:** Direct link to full Compound Monograph (`/peptides/[slug]/`) and external verified supplier portal.

### Zone 4: Physiological Signaling Pathways & Research Classifications
*Topical clustering of reagents by biochemical mechanism and physiological inquiry scope.*
- **The Six Core Signaling Categories:**
  1. **Tissue Repair & Angiogenesis:** Focusing on focal adhesion kinase (FAK), VEGFR2 capillary sprouting, and tenocyte migration (Featured: BPC-157, TB-500).
  2. **Neuropeptides & CNS Signaling:** Focusing on BDNF/TrkB axis, monoaminergic receptor interactions, and synaptic resilience (Featured: Semax, Selank).
  3. **Growth Hormone Secretagogues & GHRH:** Focusing on selective GHSR-1a binding and pulsatile somatotroph signaling (Featured: CJC-1295, Ipamorelin).
  4. **Metabolic & Incretin Signaling:** Focusing on unimolecular GLP-1/GIP co-agonism and lipolytic energy homeostasis (Featured: AOD-9604, Tirzepatide, Semaglutide).
  5. **Dermal & Extracellular Matrix:** Focusing on copper-chelate coordinate complexes, procollagen I/III transcription, and MMP homeostasis (Featured: GHK-Cu).
  6. **Cellular Longevity & Mitochondrial Axis:** Focusing on telomerase catalytic subunit (hTERT) transcription, cardiolipin preservation, and ROS mitigation (Featured: Epithalon, MOTS-c).
- **Per-Category Data Displayed:** Category title, pre-clinical headline, detailed biological mechanism description, key biochemical signaling kinases, compound count, and navigation link to Category Archive (`/category/[slug]/`).

### Zone 5: Interactive Aseptic Reconstitution & Dilution Engine
*A functional laboratory utility enabling researchers to calculate precise reconstituted molarity and draw volumes.*
- **Input Parameters:**
  - Lyophilized Peptide Vial Mass (mg) — presets for 2mg, 5mg, 10mg, or custom numeric input.
  - Diluent Liquid Volume Added (mL) — presets for 1.0mL, 2.0mL, 2.5mL, 3.0mL, or custom input.
  - Desired Assay Draw / Sample Mass (mcg).
- **Computed Outputs Displayed:**
  - Concentration per mL (mg/mL and mcg/mL).
  - Required Liquid Draw Volume (mL and standard 100-unit laboratory tick units).
  - Total Discrete Sampling Draws available in vial.
- **Storage Kinetics Reference Table:**
  - Ambient (20°C–25°C): Storage duration limit (<48 hours) before hydrolytic cleavage.
  - Refrigerated (2°C–8°C): Stable shelf-life window (21 to 28 days) in sterile amber vial.
  - Frozen Lyophilized (-20°C): Shelf-life (24 to 36 months) desiccated under argon.

### Zone 6: Five-Stage Analytical Supplier Verification Framework
*Documents the empirical evaluation criteria used by the registry to audit commercial partners.*
- **Stage 01 — RP-HPLC Chromatography Benchmarking:** Requirements for analytical Reverse-Phase HPLC showing ≥98.0% peak area integration.
- **Stage 02 — Electrospray Mass Spectrometry (ESI-MS):** Deconvolution confirming intact theoretical molecular mass within ±0.5 Da variance.
- **Stage 03 — European/UK Third-Party Accreditation:** Strict requirement that testing occurs in ISO/IEC 17025 accredited independent analytical laboratories.
- **Stage 04 — Container Closure & Cold-Chain Integrity:** Requirement for Type I neutral borosilicate glass vials, bromobutyl stoppers, and Royal Mail Tracked 24 transit.
- **Stage 05 — Statutory Advertising Compliance:** Immediate disqualification for suppliers advertising human consumption, dosages, or therapeutic medical claims in breach of CAP Code Rule 12.11 or UK SI 2012/1916.

### Zone 7: Verified British Distributor Comparison Matrix
*A side-by-side evaluation table of verified UK commercial reagent suppliers.*
- **Suppliers Evaluated:** PharmaGrade Store, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global.
- **Data Points Per Supplier:** Corporate identity, primary UK fulfillment hub, tested HPLC purity baseline, vial formatting options, dispatch speeds, testing transparency rating, and direct link to Supplier Dossier (`/vendors/[slug]/`).

### Zone 8: Statutory Regulatory Declarations & Canonical Footer
*Establishes legal protection and exposes sitemaps and machine-readable discovery.*
- **Comprehensive Statutory Disclaimer:** Explicit legal notice quoting UK Human Medicines Regulations 2012 (SI 2012/1916) and Misuse of Drugs Act 1971.
- **Categorized Sitemap Navigation:** Links to all 12 compounds, 6 pathways, 5 suppliers, and 4 statutory guides.
- **Discovery Assets:** HTML Sitemap, XML Sitemap (`sitemap.xml`), Robots directive (`robots.txt`), and LLM manifesto (`llms.txt`).

---

## 3. Product / Peptide Detail Page: Information Architecture & Monograph Schema

The Product / Peptide Monograph Detail Page (`/peptides/[slug]/`) represents the deepest scientific layer of the platform. It must present exhaustive chemical, pharmacological, and sourcing data in an organized, academic layout.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Header: Breadcrumb Hierarchy & Compound Classification Badges          │
├────────────────────────────────────────────────────────────────────────┤
│ Block 1: Monograph Title, IUPAC Name & Identification Registry Matrix  │
├────────────────────────────────────────────────────────────────────────┤
│ Block 2: 2D Chemical Topology, Residue Chain & Molecular Specifications│
├────────────────────────────────────────────────────────────────────────┤
│ Block 3: Receptor Pharmacology & Downstream Effector Cascades          │
├────────────────────────────────────────────────────────────────────────┤
│ Block 4: Aseptic Reconstitution & Dissolution Standard Operating Proc  │
├────────────────────────────────────────────────────────────────────────┤
│ Block 5: Verified UK Laboratory Sourcing & Commercial Price Comparison │
├────────────────────────────────────────────────────────────────────────┤
│ Block 6: Primary Literature & Curated PubMed Trial Evidence Matrix     │
├────────────────────────────────────────────────────────────────────────┤
│ Block 7: Curated Technical FAQ Entity & Statutory In Vitro Warning     │
└────────────────────────────────────────────────────────────────────────┘
```

### Block 1: Header & Primary Identification Data
- **Breadcrumb Navigation:** Home &rarr; Category Name &rarr; Compound Name (each linked with canonical URLs).
- **Primary Title:** Common Trade/Chemical Name (e.g., *BPC-157*).
- **Systematic / IUPAC Name:** Complete chemical name (e.g., *Body Protection Compound-157 Pentadecapeptide*).
- **Core Chemical Identification Badge Grid:**
  1. **CAS Registry Number:** Official Chemical Abstracts Service index number.
  2. **Molecular Formula:** Stoichiometric formula (e.g., `C62H98N16O22`).
  3. **Monoisotopic Mass:** Precision molecular mass (e.g., `1419.55 g/mol`).
  4. **PubChem Compound ID (CID):** Numeric identifier linked directly to NCBI PubChem.
  5. **Analytical Purity Floor:** Baseline minimum chromatographic threshold (e.g., ≥99.2%).
  6. **Storage Protocol:** Lyophilized temperature requirements (e.g., `-20°C Desiccated`).
  7. **Evidence Level:** Pre-clinical maturity tier (*in vitro*, rodent models, human clinical trials).

### Block 2: Chemical Topology, Sequence & Molecular Properties
- **Residue Chain Badge Sequence:** The complete amino acid peptide sequence broken down into individual residue blocks (e.g., `Gly` &rarr; `Glu` &rarr; `Pro` &rarr; `Pro` &rarr; `Pro` &rarr; `Gly` &rarr; `Lys` &rarr; `Pro` &rarr; `Ala` &rarr; `Asp` &rarr; `Asp` &rarr; `Ala` &rarr; `Gly` &rarr; `Leu` &rarr; `Val`).
- **Residue Count:** Explicit length count (e.g., *15-amino acid oligopeptide*).
- **Physical Appearance:** Description of the physical chemical state (e.g., *Sterile lyophilized white crystalline cake / powder*).
- **Solubility Class:** Solvent affinity (e.g., *Aqueous soluble in water and saline; hydrophobic sequences require dilute acetic acid*).
- **Counter-Ion Content:** Presence of acetate or trifluoroacetate (TFA) salts.

### Block 3: Receptor Pharmacology & Signaling Cascades
- **Primary Receptor Target:** Specific receptor or complex (e.g., `VEGFR2 / FAK-Paxillin Complex`, `GHSR-1a`, `GLP-1R`).
- **Receptor Family:** Classification (e.g., *Receptor Tyrosine Kinase (RTK)*, *G-Protein Coupled Receptor (GPCR)*).
- **Binding Affinity / Dissociation Constant:** In vitro binding affinity metrics (e.g., `Kd ≈ 18.4 nM`).
- **Downstream Cellular Effectors:** Bulleted breakdown of downstream signal transduction events (e.g., phosphorylation events, transcriptional activations, cytokine attenuations).
- **Pre-Clinical Inquiry Scope:** Summary of ongoing academic laboratory research domains.

### Block 4: Aseptic Reconstitution & Handling SOP
- **Recommended Diluent:** Exact liquid specification (e.g., *Bacteriostatic Water with 0.9% Benzyl Alcohol USP*).
- **Step-by-Step SOP:**
  1. *Thermal Equilibration:* 20-minute cabinet acclimation.
  2. *Septum Disinfection:* 70% IPA wipe.
  3. *Aseptic Liquid Introduction:* Slow wall-directed stream using low-gauge needle.
  4. *Gentle Dissolution:* Passive circular swirl (no vortexing or mechanical agitation).
- **Reconstituted Storage Matrix:** Clear expiration countdowns based on temperature exposure.

### Block 5: Verified UK Sourcing & Price Comparison Table
*Direct, verified supplier pricing and availability for British laboratories.*
- **Columns Displayed:**
  1. **Supplier Name & Hub:** Audited distributor name and dispatch city.
  2. **Available Formats:** Reagent formats offered (e.g., 5mg Vial, 10mg Vial, Cartridge Pen).
  3. **Verified Purity Standard:** Batch assay HPLC purity rating (e.g., `≥99.2%`).
  4. **Batch COA Availability:** Confirmation of verifiable analytical testing report.
  5. **UK Delivery Standard:** Royal Mail 24 or courier dispatch speed.
  6. **Baseline Pricing:** Price starting range in GBP (£).
  7. **Commercial Outbound Link:** Outbound partner link tagged with `rel="noopener noreferrer nofollow"`.

### Block 6: Primary Literature & PubMed Evidence Matrix
*Empirical citations establishing academic EEAT (Experience, Expertise, Authoritativeness, and Trustworthiness).*
- **Per-Citation Data Fields:**
  - Full Paper Title.
  - Journal Title and Publication Year.
  - Contributing Authors List.
  - Direct PubMed PMID link (`https://pubmed.ncbi.nlm.nih.gov/[PMID]/`).
  - Empirical Findings Synopsis: Exact methodological conclusions established in the study.

### Block 7: Curated Technical FAQs
*Structured Question and Answer entities addressing statutory, physical, and handling questions.*
- Answers explicitly formatted for Google Rich Results (`FAQPage` Schema.org entity).
- Topics: CAS identification, proper diluent selection, legal classification under UK law, and batch verification procedures.

---

## 4. Key Secondary Pages: Content & Data Schemas

### 4.1 Signaling Pathway Archive (`/category/[slug]/`)
- **Category Overview:** Systematic biochemical title, physiological signaling headline, and extended academic scope.
- **Kinase & Signaling Axis:** Key intracellular targets (e.g., *FAK-Paxillin cascade, VEGFR2 transcription, eNOS modulation*).
- **Filtered Reagent Grid:** Card catalog of all reagents belonging to the category, exposing formula, mass, targets, and supplier counts.
- **Laboratory Research Applications:** Detailed overview of in vitro assays currently active in British institutions.

### 4.2 Supplier Audit Profile (`/vendors/[slug]/`)
- **Supplier Identity:** Corporate name, UK fulfillment warehouse location, primary domain, and year founded.
- **Analytical Testing Rigor:** HPLC purity floor baseline, testing frequency, third-party laboratory accreditations, and mass spectrometry verification.
- **Packaging & Cold-Chain Standards:** Glass type (Type I borosilicate), stopper material (bromobutyl), inert gas atmosphere (argon/nitrogen), and packaging insulation.
- **Dispatch Corridors:** Domestic couriers (Royal Mail Tracked 24, DPD Next Day), cutoff times, and international transit policies.
- **Audited Compound Catalog:** Filterable list of all reagents verified in the supplier's active inventory.

### 4.3 UK Regulatory Hub & MHRA Directives (`/regulatory/`)
- **Statutory Framework Breakdown:**
  - *The Human Medicines Regulations 2012 (SI 2012/1916):* Clear legal distinction between licensed medicinal products and unlicensed research chemicals.
  - *Misuse of Drugs Act 1971:* Scheduling assessment of synthetic peptide sequences.
  - *CAP Code Rule 12.11 & Advertising Standards Authority (ASA):* Prohibition of medicinal claims for unlicensed chemicals.
- **Rolling MHRA 90-Day Tracker (`/regulatory/mhra-tracker/`):** Real-time log of MHRA drug safety notifications, border seizures, and enforcement warnings.
- **Statutory Legal Matrix (`/regulatory/uk-legal-status/`):** Tabular legal breakdown for all 12 indexed reagents detailing scheduling, research permissions, and WADA anti-doping status.

### 4.4 Analytical Verification Standards (`/verification/`)
- **Chromatographic Principles:** Reverse-Phase HPLC explanation, peak retention time tolerances (±0.15 min), and integration baselines.
- **Mass Spectrometry Identification:** Electrospray Ionization (ESI-MS) mass deconvolution and monoisotopic accuracy tolerances (±0.5 Da).
- **Certificate of Analysis (COA) Audit Guide:** How researchers distinguish authentic ISO 17025 laboratory chromatograms from truncated or simulated commercial graphics.

### 4.5 Vial & Reagent Formats Guide (`/formats/`)
- **Physical Delivery States:**
  - *Lyophilized Vials:* Physical characteristics of vacuum-sealed cakes and inert gas filling.
  - *Pre-Metered Cartridge Pens:* Multi-dose liquid cartridges for micro-pipette laboratory delivery.
  - *Sublingual & Intranasal Formulations:* Research limitations and mucosal absorption kinetics.
  - *Synergistic Multi-Compound Stacks:* Analytical evaluation of co-lyophilized reagent pairs (e.g., BPC-157 + TB-500).

---

## 5. Critical Accessibility & Core Web Vitals Mandatory Mandate

> [!IMPORTANT]
> While UX/UI designers are granted complete creative freedom regarding visual language, typography choices, and layout aesthetics, the design **MUST STRICTLY COMPLY** with the following Core Web Vitals and Web Content Accessibility Guidelines (WCAG 2.1). Failure to meet these technical baselines directly harms SERP visibility and user trust.

### 5.1 WCAG 2.1 Contrast Ratio Mandate
Because no color choice is pre-imposed, the designer must select color pairings that pass automated accessibility audits:
- **Standard Text (< 18pt or < 14pt bold):** Minimum contrast ratio of **4.5:1** against its adjacent background.
- **Large Text (≥ 18pt or ≥ 14pt bold) & Section Headings:** Minimum contrast ratio of **3.0:1**.
- **Dense Clinical & Tabular Data (HPLC Purity, CAS Numbers, Molar Mass):** Target enhanced Level AAA contrast of **7.0:1** to ensure readability in laboratory lighting conditions.
- **Interactive Controls & Form Inputs:** Minimum contrast ratio of **3.0:1** for borders, focus rings, and active states.
- **Color Independence:** Information must never be conveyed solely through color. Any status indicator (e.g., "In Stock", "Verified Batch", "Controlled Chemical") must pair color with explicit text labels, numerical values, or icons.

### 5.2 Core Web Vitals Performance Constraints
1. **Largest Contentful Paint (LCP < 2.5s):**
   - The above-the-fold hero section and primary title must render immediately without waiting for client-side JavaScript execution.
   - Any hero imagery or molecular structure diagrams must use optimized WebP format with explicit `width` and `height` attributes to eliminate rendering lag.
2. **Cumulative Layout Shift (CLS < 0.05):**
   - Every image, icon, data table, and interactive widget must declare explicit aspect ratios or reserved container heights.
   - No dynamic content insertion (such as banners or lazy-loaded tables) may push existing content down the page after initial render.
3. **Interaction to Next Paint (INP < 200ms):**
   - The dilution calculator, compound search filters, and table sorting controls must respond within 200ms of user interaction.
   - Heavy computations must execute asynchronously without locking the main thread.

### 5.3 Touch Target & Keyboard Navigation Requirements
- **Touch Target Size:** All buttons, table links, dropdown toggles, and filter chips must have a minimum interactive target size of **48 × 48 CSS pixels** with adequate spacing to prevent accidental mis-taps on mobile viewports.
- **Focus Indicators:** All interactive elements must exhibit a clearly visible, high-contrast keyboard focus ring (minimum 2px solid with 3:1 contrast against background) when navigated via keyboard (`Tab` / `Shift+Tab`).
- **Semantic Structure:** The DOM must strictly adhere to HTML5 semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<table>`, `<footer>`) with logical heading levels (`<h1>` through `<h3>`) without skipping levels.

---

## 6. Handover Summary & Designer Checklist

When translating this specification into visual mockups, the designer must deliver:
- [ ] **Desktop & Mobile Wireframes** for the 7 Homepage zones.
- [ ] **Full Desktop & Mobile Layout** for the Monograph Detail Page (`/peptides/[slug]/`) containing all 7 clinical data blocks.
- [ ] **Data Table Layouts** optimized for both widescreen desktop scrolling and mobile card-based responsive collapse.
- [ ] **Interactive Calculator Interface** with clear input steppers, unit toggles, and result output cards.
- [ ] **Verified WCAG Contrast Report** confirming all text, badges, and controls satisfy the 4.5:1 (normal text) and 3.0:1 (large text) criteria.
