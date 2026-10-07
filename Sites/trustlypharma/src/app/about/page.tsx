import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Database,
  ChevronRight,
  ShieldCheck,
  FlaskConical,
  BookOpen,
  CheckCircle2,
  Atom,
  Scale,
  Building2,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  FileCheck2,
  AlertTriangle,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Trustly Pharma & Methodology | Trustly Pharma',
  description:
    'Independent biochemical encyclopedia: editorial charter, 5-stage verification methodology, PubMed literature curation, and commercial vendor standards.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/about/',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://trustlypharma.co.uk/#website',
        url: 'https://trustlypharma.co.uk',
        name: 'Trustly Pharma',
      },
      {
        '@type': 'AboutPage',
        '@id': 'https://trustlypharma.co.uk/about/#webpage',
        url: 'https://trustlypharma.co.uk/about/',
        name: 'About Trustly Pharma & Analytical Methodology',
        description:
          'Independent chemical encyclopedia and academic research directory for synthetic peptides.',
        isPartOf: { '@id': 'https://trustlypharma.co.uk/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://trustlypharma.co.uk/about/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Index Home',
            item: 'https://trustlypharma.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About & Methodology',
            item: 'https://trustlypharma.co.uk/about/',
          },
        ],
      },
    ],
  };

  return (
    <div className="relative pb-24 bg-[#020e24] text-slate-100 min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-semibold">About & Methodology</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-20 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] via-[#03153b] to-[#041638] relative overflow-hidden">
        <div className="container-wide space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#103059] text-sky-300 border border-sky-400/35 font-bold shadow-sm">
            <Database className="w-4 h-4 text-sky-400" />
            <span>ACADEMIC EDITORIAL CHARTER & METHODOLOGY</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              About Trustly Pharma & Analytical Methodology
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Trustly Pharma is an independent biochemical encyclopedia and chemical catalog. We provide academic researchers, laboratory analysts, and biochemists with systematically structured chemical reference profiles, molecular formulas, and verified scientific literature citations.
            </p>
          </div>

          {/* 6 Key Architectural Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-4">
            <div className="p-4 rounded-2xl bg-[#061a38] border border-[rgba(141,168,195,0.22)] shadow-sm space-y-1">
              <span className="text-2xl font-extrabold font-mono text-sky-400 block">100%</span>
              <span className="text-xs text-slate-300 block font-medium">Non-Commercial Model</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#061a38] border border-[rgba(141,168,195,0.22)] shadow-sm space-y-1">
              <span className="text-2xl font-extrabold font-mono text-emerald-400 block">12</span>
              <span className="text-xs text-slate-300 block font-medium">Core Monograph Dossiers</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#061a38] border border-[rgba(141,168,195,0.22)] shadow-sm space-y-1">
              <span className="text-2xl font-extrabold font-mono text-amber-400 block">≥98.0%</span>
              <span className="text-xs text-slate-300 block font-medium">RP-HPLC Assay Standard</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#061a38] border border-[rgba(141,168,195,0.22)] shadow-sm space-y-1">
              <span className="text-2xl font-extrabold font-mono text-purple-400 block">100%</span>
              <span className="text-xs text-slate-300 block font-medium">PubMed Indexed Sources</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#061a38] border border-[rgba(141,168,195,0.22)] shadow-sm space-y-1">
              <span className="text-2xl font-extrabold font-mono text-cyan-400 block">GLP</span>
              <span className="text-xs text-slate-300 block font-medium">OECD Laboratory Ethics</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#061a38] border border-[rgba(141,168,195,0.22)] shadow-sm space-y-1">
              <span className="text-2xl font-extrabold font-mono text-rose-400 block">Zero</span>
              <span className="text-xs text-slate-300 block font-medium">End-User Selling Claims</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="container-wide mt-12 space-y-16">
        {/* Section 1: Institutional Mission & Editorial Charter */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[rgba(141,168,195,0.18)]">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold block">
              Editorial Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              Institutional Mission & Editorial Charter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.25)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
                  <Atom className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  The Fragmentation Problem in Synthetic Peptide Research
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Biochemical peptide investigation is increasingly hindered by fragmented documentation, inconsistent chemical naming conventions, conflation of analytical grades with clinical medicines, and unverified commercial labeling. Academic investigators require an authoritative single source of truth for chemical identity, sequence structures, and verified assay parameters.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.25)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Our Core Editorial Mandate
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Trustly Pharma operates strictly as an academic encyclopedia and scientific catalog. We curate verifiable chemical identifiers (CAS, CID, IUPAC), map primary amino acid sequences, summarize documented cellular mechanisms with direct PubMed citations, and catalog verified commercial laboratory vendors for qualified procurement. We maintain absolute independence from vendor sales operations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 5-Stage Chemical Verification Protocol */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[rgba(141,168,195,0.18)]">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Methodological Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              5-Stage Chemical Verification & Indexing Protocol
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.22)] space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/35 text-sky-300 font-mono font-bold text-xs flex items-center justify-center">
                    01
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Chemical Identity & Crystallographic Triangulation
                  </h3>
                </div>
                <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-500/30 font-semibold">
                  PubChem · CAS Registry
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every candidate compound undergoes multi-database triangulation against the NIH PubChem Compound Database, ChemSpider, and the Chemical Abstracts Service (CAS). Monoisotopic and average molecular weights are verified against theoretical stoichiometry within ±0.05 Da tolerance.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.22)] space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">
                    02
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Primary Sequence Architecture & Topological Alignment
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                  UniProtKB · IUPAC Notation
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Peptide amino acid sequences are indexed using standardized three-letter and single-letter IUPAC notations. Modifications including N-terminal acetylation, C-terminal amidation, synthetic unnatural D-amino acids, and intramolecular disulfide bridges are systematically validated against parent peptide accessions in UniProtKB.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.22)] space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/35 text-purple-300 font-mono font-bold text-xs flex items-center justify-center">
                    03
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Peer-Reviewed Literature Curation & Evidentiary Grading
                  </h3>
                </div>
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30 font-semibold">
                  NCBI PubMed · PMC Registry
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Receptor binding affinities (Ki, Kd, EC50), downstream cellular cascades, and preclinical outcomes must be supported by peer-reviewed literature published in indexed biochemical journals. Each study is cross-referenced with permanent PubMed Identifiers (PMIDs), author teams, and digital object identifiers (DOIs).
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.22)] space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/35 text-amber-300 font-mono font-bold text-xs flex items-center justify-center">
                    04
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Analytical Batch Audit & Chromatographic Standards (CoA)
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
                  RP-HPLC ≥98% · ESI-MS
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Before cataloging commercial laboratory vendors, our editorial board confirms that vendors provide batch-traceable Certificates of Analysis (CoA) demonstrating ≥98.0% chromatographic purity determined by reversed-phase HPLC, with electrospray mass spectrometry confirming molecular weight within ±1.0 Da.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.22)] space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/35 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                    05
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Statutory Compliance & UK Regulatory Classification
                  </h3>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 font-semibold">
                  MHRA · MDA 1971 · WADA
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                All indexed substances are mapped against UK statutory instruments including the Human Medicines Regulations 2012, Misuse of Drugs Act 1971, Psychoactive Substances Act 2016, and the World Anti-Doping Agency (WADA) Prohibited List to provide unambiguous legal clarity for institutional labs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Evidence Level Hierarchy & Preclinical Scope */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[rgba(141,168,195,0.18)]">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Scientific Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              Evidence Grading Hierarchy & Preclinical Scope
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.22)] space-y-3.5 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-mono font-bold text-sm flex items-center justify-center">
                ●●●
              </div>
              <h3 className="text-base font-bold text-white">
                Tier 1: Multi-Laboratory Replicated Literature
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Replicated preclinical studies conducted across multiple independent university laboratories confirming receptor interaction kinetics, signaling pathways, and phenotypic responses with high statistical power.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.22)] space-y-3.5 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/35 text-sky-300 font-mono font-bold text-sm flex items-center justify-center">
                ●●○
              </div>
              <h3 className="text-base font-bold text-white">
                Tier 2: In Vivo Animal Preclinical Models
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Animal in vivo investigations (murine, rodent, or canine models) assessing pharmacokinetic parameters, metabolic half-life curves, tissue bio-distribution, and physiological efficacy in controlled experimental designs.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.22)] space-y-3.5 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-300 font-mono font-bold text-sm flex items-center justify-center">
                ●○○
              </div>
              <h3 className="text-base font-bold text-white">
                Tier 3: In Vitro Cell Culture & Mechanistic Assays
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Isolated cell culture assays, primary membrane radioligand binding studies, and enzymatic activation assays providing early mechanistic hypotheses regarding cellular signal transduction pathways.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Commercial Independence & Outbound Partner Policy */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[rgba(141,168,195,0.18)]">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block">
              Commercial Neutrality
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              Commercial Independence & Partner Directory Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.25)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-400/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Editorial Autonomy & Zero-Commission Policy
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Trustly Pharma does not sell peptide vials, formulate chemical compounds, operate synthesis laboratories, or collect commissions on sales. Commercial chemical vendors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) are cataloged strictly as external sourcing references for research laboratories.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.25)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Commercial Partner Inclusion Criteria
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Vendors indexed in our directory must satisfy strict quality thresholds: transparent publication of analytical test reports, desiccation under inert nitrogen, cold-chain thermal transit protection, unambiguous research-only labeling, and established UK/European fulfillment infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Continuous Data Freshness & Correction Protocol */}
        <section className="space-y-6">
          <div className="pb-3 border-b border-[rgba(141,168,195,0.18)]">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block">
              Editorial Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              Continuous Data Freshness & Correction Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.25)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/20">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Quarterly Literature & Regulatory Audits
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                All chemical monographs and regulatory intelligence entries are audited quarterly. New scientific papers published on NCBI PubMed, safety notices from the MHRA Enforcement Group, and annual updates to the WADA Prohibited List are integrated directly into our live data hubs.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#031535] border border-[rgba(141,168,195,0.25)] space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/20">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Peer-Review Submission Desk
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                We invite academic biochemists, university researchers, and analytical testing laboratories to submit new published literature, analytical data corrections, or regulatory notices. Submissions are reviewed by our editorial team against primary journal registries.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Submit Data Notice via Inquiry Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Laboratory Biosafety & GLP Ethics Commitment */}
        <section className="rounded-3xl p-7 sm:p-10 card-paper border border-amber-500/30 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-400/25">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block">
                Compliance & Biosafety
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Commitment to Laboratory Biosafety & GLP Ethics
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">
                OECD Good Laboratory Practice (GLP) Principles
              </h3>
              <p>
                All chemical monographs and handling parameters published on Trustly Pharma are tailored exclusively to qualified laboratory personnel operating under the OECD Principles of Good Laboratory Practice. Chemical reagents must be handled with appropriate analytical controls, aseptic equipment, and validated personal protective gear (PPE).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">
                COSHH & Hazardous Chemical Regulations
              </h3>
              <p>
                In the United Kingdom, manipulation of synthetic polypeptides must conform to Control of Substances Hazardous to Health (COSHH) regulations. Lyophilized powders, reconstitution diluents, and hazardous waste must be cataloged in institutional chemical hygiene plans (CHP) and disposed of via certified hazardous waste management services.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(141,168,195,0.15)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="text-slate-400">
              Institutional Reference Standard: ISO 17025 & OECD GLP Compliant
            </span>
            <Link
              href="/safety/"
              className="text-amber-300 hover:text-white font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Review Full Research Safety SOP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
