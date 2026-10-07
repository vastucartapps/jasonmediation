import Link from 'next/link';
import {
  ShieldAlert,
  ThermometerSnowflake,
  FlaskConical,
  Beaker,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Research Safety & GLP Standards | Trustly Pharma',
  description:
    'Good Laboratory Practice (GLP) standards, cold-chain storage thresholds, reconstitution protocols, and chemical PPE guidelines for research peptides.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/safety/',
  },
};

export default function SafetyPolicyPage() {
  const pageUrl = 'https://trustlypharma.co.uk/safety/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Research Safety Policy',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Research Safety Policy & Chemical Handling SOP | Trustly Pharma',
        description:
          'Good Laboratory Practice (GLP) standards, cold-chain storage thresholds, reconstitution protocols, and chemical PPE guidelines for research peptides.',
        about: [
          {
            '@type': 'DefinedTerm',
            name: 'Good Laboratory Practice',
            description: 'OECD GLP compliance for chemical and peptide handling.',
          },
          {
            '@type': 'DefinedTerm',
            name: 'COSHH Regulations',
            description: 'Control of Substances Hazardous to Health Regulations 2002.',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#020e24] text-slate-100">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638] py-14 md:py-18">
        <div className="container-wide">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Index Home
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-sky-400">Research Safety Policy</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LABORATORY BIOSAFETY & GLP STANDARDS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Research Safety Policy & Chemical Handling SOP
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Standard operating procedures for chemical purity verification, cold-chain temperature integrity, 
              solvent compatibility, and personal protective protocols (PPE) governing synthetic peptides in academic and laboratory research environments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="container-wide py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Good Laboratory Practice (GLP) Overview */}
            <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest block">
                    Protocol Section 01
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Good Laboratory Practice (GLP) Principles
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  All synthetic peptide reagents, modified polypeptide chains, and amino acid sequences indexed across 
                  Trustly Pharma are designated strictly for analytical testing, in vitro cellular culture investigations, 
                  chromatographic characterization, and formal biochemical research.
                </p>
                <p>
                  Handling of these materials must adhere to the <strong>OECD Principles of Good Laboratory Practice (GLP)</strong> and 
                  the UK Health and Safety Executive (HSE) statutory frameworks. Personnel engaging with chemical powders must possess 
                  documented competency in hazardous chemical manipulation, aseptic technique, and analytical balance calibration.
                </p>
              </div>
            </section>

            {/* 2. Cold-Chain & Storage Protocols */}
            <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">
                    Protocol Section 02
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Thermal Preservation & Cold-Chain Parameters
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Peptide stability depends strictly on temperature maintenance, humidity suppression, and protection from ultraviolet radiation. 
                Deamidation, methionine oxidation, and enzymatic degradation accelerate exponentially when storage guidelines are compromised.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Lyophilized Solid Phase</span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">-20°C to -80°C</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Long-term preservation: maintain below -20°C in desiccated chambers.</li>
                    <li>Avoid frequent freezer cycles; vacuum seals must remain intact.</li>
                    <li>Equilibrate vials to room temperature (20–25°C) for 60 min before opening septum.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Reconstituted Aqueous Phase</span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">2°C to 8°C</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Refrigerate immediately after sterile solvent introduction.</li>
                    <li>Aqueous stability window: typically 21–28 days with bacteriostatic agents.</li>
                    <li>Strictly avoid repetitive freeze-thaw cycles; secondary crystallization shears peptide backbones.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Reconstitution & Solvent Compatibility */}
            <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Beaker className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block">
                    Protocol Section 03
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Reconstitution Mechanics & Solvent Standards
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Reconstitution must occur under sterile laminar airflow hood conditions. The selection of diluent depends directly on 
                  the net charge, hydrophobicity index, and isoelectric point (pI) of the peptide sequence:
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-white block font-sans">Bacteriostatic Water (0.9% Benzyl Alcohol USP)</strong>
                      <span className="text-slate-400 font-normal">Primary standard for multi-draw research vials requiring antimicrobial suppression.</span>
                    </div>
                    <span className="text-sky-400 shrink-0">pH 4.5 – 7.0</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-white block font-sans">Sterile 0.9% Sodium Chloride (Saline)</strong>
                      <span className="text-slate-400 font-normal">Optimal for physiological ionic strength assays and cell membrane interaction models.</span>
                    </div>
                    <span className="text-emerald-400 shrink-0">Osmolarity ~308 mOsm/L</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-white block font-sans">Dilute Acetic Acid (0.1% to 1.0%)</strong>
                      <span className="text-slate-400 font-normal">Required as a solubilization aid for strongly basic or hydrophobic polypeptide fragments.</span>
                    </div>
                    <span className="text-amber-400 shrink-0">Acidic Solubilization</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#02102b]/70 border-l-4 border-amber-400 text-xs text-slate-300">
                  <strong className="text-amber-300 block mb-1">Mechanical Shearing Warning:</strong>
                  Never subject peptide solutions to high-speed mechanical vortexing or sonication unless specifically prescribed by the analytical method. 
                  Dissolution should be achieved via slow, steady orbital rotation to prevent denaturation of secondary helical loops.
                </div>
              </div>
            </section>

            {/* 4. PPE & Biosafety Containment */}
            <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest block">
                    Protocol Section 04
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Personal Protective Equipment (PPE) & Containment
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  To prevent inadvertent contact, aerosol inhalation, or cross-sample contamination, laboratory staff must strictly comply with the following PPE standards:
                </p>

                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)]">
                    <span className="font-bold text-white block mb-1">Hand Protection</span>
                    <span className="text-slate-400">BS EN ISO 374-1 nitrile gloves. Double-gloving recommended during mass weighing.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)]">
                    <span className="font-bold text-white block mb-1">Ocular Defense</span>
                    <span className="text-slate-400">BS EN 166:2001 certified side-shield polycarbonate chemical safety glasses.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)]">
                    <span className="font-bold text-white block mb-1">Aerosol Control</span>
                    <span className="text-slate-400">Class II Type A2 Biosafety Cabinets (BSC) or certified fume capture hoods.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Waste Disposal & Emergency SDS */}
            <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block">
                    Protocol Section 05
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Disposal & Safety Data Sheet (SDS) Access
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Waste generated from peptide synthesis, reconstitution, or assay testing must be segregated into dedicated hazardous chemical streams:
                </p>

                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
                  <li><strong>Sharps & Glass Vials:</strong> Must be discarded into rigid, puncture-resistant UN 3291 certified biohazard sharps containers.</li>
                  <li><strong>Residual Solutions:</strong> Neutralized pursuant to institutional chemical hygiene plans (CHP); never discharged directly into municipal sewers.</li>
                  <li><strong>Safety Data Sheets (SDS):</strong> SDS documents corresponding to indexed CAS registries can be requested from distributor partners or verified via the PubChem Laboratory Chemical Safety Summary (LCSS).</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column: Quick Reference & Tools */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="sr-only">Quick Reference and Laboratory Tools</h2>
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Analytical Tools</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use our interactive dilution calculator to calculate exact solvent volumes and concentration curves for analytical protocols.
              </p>
              <Link
                href="/#calculator"
                className="w-full gradient-bg py-3 px-4 rounded-xl font-bold text-xs text-slate-900 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <span>Launch Dilution Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Analytical Standards</span>
              </h3>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <span className="font-bold text-white block">RP-HPLC Assay</span>
                  <span className="text-[11px] text-slate-400">Purity quantification standard ≥98.0%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <span className="font-bold text-white block">ESI-MS / MALDI</span>
                  <span className="text-[11px] text-slate-400">Molecular weight confirmation ±1 Da</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <span className="font-bold text-white block">LAL Endotoxin</span>
                  <span className="text-[11px] text-slate-400">Threshold &lt;0.05 EU/mg for assays</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white">Need Protocol Clarification?</h3>
              <p className="text-xs text-slate-400">
                Contact our chemical curation team for questions regarding specific sequence solubility or CAS documentation.
              </p>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 font-bold"
              >
                <span>Institutional Inquiry Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
