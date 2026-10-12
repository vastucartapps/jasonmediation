import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import {
  FlaskConical,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  ShieldCheck,
  Activity,
  Layers,
  Search,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Award,
  Thermometer,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HPLC & Mass Spectrometry Peptide Verification Protocols | Peptides UK',
  description:
    'Comprehensive laboratory analytical verification methodology: Reverse-Phase HPLC chromatographic purity, ESI Mass Spectrometry molecular identity, Endotoxin LAL assay, and Certificate of Analysis (COA) audit criteria.',
  alternates: {
    canonical: `${SITE_METADATA.url}/verification/`,
  },
  openGraph: {
    title: 'Peptide Analytical Verification Standards | Peptides UK',
    description: 'Analytical chemistry standards: HPLC, ESI-MS, COA audits, and ISO 17025 testing.',
    url: `${SITE_METADATA.url}/verification/`,
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
  },
};

export default function VerificationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_METADATA.url}/#website`,
        url: SITE_METADATA.url,
        name: SITE_METADATA.name,
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `${SITE_METADATA.url}/verification/#webpage`,
        url: `${SITE_METADATA.url}/verification/`,
        name: 'HPLC & Mass Spectrometry Peptide Verification Protocols',
        description:
          'Standard operating procedures for chemical identity, chromatographic purity, and microbiological stability validation of synthetic peptides.',
        isPartOf: { '@id': `${SITE_METADATA.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/verification/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_METADATA.url}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Assay Verification Standards',
            item: `${SITE_METADATA.url}/verification/`,
          },
        ],
      },
    ],
  };

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Assay Verification Standards</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-benzene-washout">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Analytical Chromatography &amp; Mass Spectrometry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Analytical Quality Standards &amp; Verification Protocol
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          Every synthetic peptide monograph cataloged by <strong className="text-slate-900">Peptides-UK</strong> mandates
          rigorous orthogonal analytical confirmation before being indexed. We establish a non-negotiable benchmark across
          chromatographic purity, molecular mass validation, residual solvent content, and third-party laboratory verification.
        </p>
      </div>

      {/* 5-Pillar Laboratory Testing Framework */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold uppercase text-emerald-700">Analytical Modalities</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            The 5-Pillar Laboratory Verification Architecture
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Single-modality testing is chemically insufficient to certify research peptides. Our framework requires
            orthogonal multi-spectral verification to eliminate synthetic impurities and sequence truncation errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-mono text-xs font-bold text-emerald-700">MODALITY 01</span>
              <span className="badge-emerald text-[10px] py-0 px-2">≥98.0% Baseline</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reverse-Phase HPLC (RP-HPLC)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Utilizes a C18 stationary phase column and an acetonitrile/water gradient with 0.1% trifluoroacetic acid (TFA).
              Integrates peak absorbance at 214 nm (peptide bond backbone) and 254 nm (aromatic side chains) to detect
              early-eluting truncated sequences and late-eluting hydrophobic impurities.
            </p>
            <div className="pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-500 space-y-1">
              <div>Column: C18 Silica 4.6 × 250 mm, 5 µm</div>
              <div>Flow Rate: 1.0 mL/min isocratic/gradient</div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-mono text-xs font-bold text-blue-700">MODALITY 02</span>
              <span className="badge-cobalt text-[10px] py-0 px-2">±0.5 Da Variance</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Electrospray Ionization MS (ESI-MS)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides soft ionization without thermal decomposition, measuring mass-to-charge (m/z) ratios.
              Confirms that the molecular weight corresponds precisely to the theoretical monoisotopic mass,
              verifying that no amino acid residue deletions, additions, or oxidation events occurred during solid-phase synthesis.
            </p>
            <div className="pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-500 space-y-1">
              <div>Mass Range: 200 – 10,000 m/z</div>
              <div>Deconvolution: Multi-charge state resolution</div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-mono text-xs font-bold text-purple-700">MODALITY 03</span>
              <span className="badge-purple text-[10px] py-0 px-2">&lt;10 EU/mg</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Endotoxin Chromogenic LAL Assay</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quantifies bacterial lipopolysaccharide (LPS) pyrogen levels using the Limulus Amebocyte Lysate (LAL)
              colorimetric substrate reaction. Critical for in vitro cell culture assays to ensure that cellular activation
              or cytokine responses are not artifactual reactions to bacterial contamination.
            </p>
            <div className="pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-500 space-y-1">
              <div>Sensitivity: 0.005 EU/mL lower detection limit</div>
              <div>Standard: European Pharmacopoeia (Ph. Eur. 2.6.14)</div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-mono text-xs font-bold text-amber-700">MODALITY 04</span>
              <span className="badge-amber text-[10px] py-0 px-2">&lt;5.0% Karl Fischer</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Moisture Content &amp; Net Peptide Content</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lyophilized peptide vials contain counter-ions (acetate or trifluoroacetate salts) and residual hydration water.
              Coulometric Karl Fischer titration determines true moisture percentage, enabling investigators to accurately
              calculate net active peptide mass versus gross vial powder weight.
            </p>
            <div className="pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-500 space-y-1">
              <div>Titration: Coulometric Karl Fischer oven method</div>
              <div>Net Peptide Factor: Typically 75% – 85% of gross cake</div>
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-mono text-xs font-bold text-slate-700">MODALITY 05</span>
              <span className="badge-slate text-[10px] py-0 px-2">ICP-MS Profiling</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Residual Catalyst &amp; Heavy Metal Trace</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inductively Coupled Plasma Mass Spectrometry (ICP-MS) screens for trace synthesis coupling reagents and toxic
              heavy metals (lead, arsenic, cadmium, mercury, palladium). Confirms compliance with ICH Q3D elemental impurity
              thresholds for ultra-pure research standards.
            </p>
            <div className="pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-500 space-y-1">
              <div>Limit of Quantitation: &lt;0.1 ppm</div>
              <div>ICH Q3D Guideline Class 1 &amp; 2A metals screen</div>
            </div>
          </div>

          {/* Pillar 6 */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-mono text-xs font-bold text-emerald-700">AUDIT CRITERIA</span>
              <span className="badge-emerald text-[10px] py-0 px-2">ISO 17025 Required</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Third-Party Independent Laboratory Testing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manufacturer in-house testing carries inherent commercial conflict of interest. We require all verified UK vendors
              to submit random production batches to accredited independent European contract research organizations (CROs)
              maintaining ISO/IEC 17025 certification.
            </p>
            <div className="pt-2 border-t border-slate-100 font-mono text-[11px] text-slate-500 space-y-1">
              <div>Accreditation: ISO/IEC 17025:2017</div>
              <div>Audit Cycle: Batch-specific COA verification</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Point COA Authenticity Verification Checklist */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-emerald-700 mb-1">
            Laboratory Due Diligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            The 7-Point Certificate of Analysis (COA) Audit Protocol
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            When reviewing supplier documentation, British research institutions must scrutinize every Certificate of Analysis
            against these seven essential authenticity criteria:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                1
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Unique Traceable Lot / Batch Number</div>
                <p className="text-slate-600 leading-relaxed">
                  The lot number printed on the COA must match the physical label on the lyophilized glass vial exactly,
                  allowing retrospective traceability to the specific solid-phase synthesis run.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                2
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Full High-Resolution HPLC Chromatogram</div>
                <p className="text-slate-600 leading-relaxed">
                  Legitimate COAs display the raw chromatographic trace with explicit X-axis (retention time in minutes)
                  and Y-axis (mAU absorbance units), including the integrated peak report table showing peak area percentages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                3
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Explicit HPLC Analytical Parameters</div>
                <p className="text-slate-600 leading-relaxed">
                  The COA must state the column type (e.g., Inertsil ODS-3, 4.6×250mm), detection wavelength (214 nm),
                  mobile phase gradient composition, flow rate, and column oven temperature.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                4
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">ESI Mass Spectrum with Resolved Ion Peaks</div>
                <p className="text-slate-600 leading-relaxed">
                  The mass spectrum must present clear parent ion ([M+H]+) and multi-charged species ([M+2H]2+, [M+3H]3+)
                  confirming the compound identity against calculated theoretical mass within ±0.5 Da.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                5
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Third-Party Analytical Laboratory Identification</div>
                <p className="text-slate-600 leading-relaxed">
                  The report must identify the independent contract analytical facility, laboratory accreditation number,
                  and physical testing address, rather than an anonymous generic template.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                6
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Testing Date &amp; Retest Shelf-Life Window</div>
                <p className="text-slate-600 leading-relaxed">
                  The COA must date the analysis within an acceptable testing timeframe and declare the validated stability
                  window under recommended storage conditions (-20°C desiccated).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold flex-shrink-0">
                7
              </span>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Principal Chemist Signature &amp; Quality Release</div>
                <p className="text-slate-600 leading-relaxed">
                  Formal sign-off by a designated analytical chemist and quality assurance manager certifying that the batch
                  meets all defined acceptance criteria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Links Gateway */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Compare Verified UK Laboratory Suppliers</h2>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Inspect our independent audit of Britain&apos;s 5 verified suppliers, cross-referencing HPLC purity baselines,
            borosilicate packaging protocols, and tracked cold-chain dispatch.
          </p>
        </div>
        <Link
          href="/vendors/"
          className="px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-md flex items-center gap-2 flex-shrink-0"
        >
          <span>View 5 Audited UK Suppliers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
