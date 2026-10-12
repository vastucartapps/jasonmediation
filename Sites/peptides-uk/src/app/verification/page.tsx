import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { FlaskConical, CheckCircle2, ChevronRight, FileCheck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HPLC & Mass Spectrometry Peptide Verification Protocols',
  description:
    'Laboratory analytical verification standards: Reverse-Phase HPLC, Electrospray Ionization Mass Spectrometry (ESI-MS), and Certificate of Analysis (COA) audit criteria.',
  alternates: {
    canonical: `${SITE_METADATA.url}/verification/`,
  },
};

export default function VerificationPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Assay Verification</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Analytical Chromatography &amp; Spectrometry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Analytical Verification Standards
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          How Peptides-UK verifies research peptide purity. We mandate dual-modality analytical confirmation:
          Reverse-Phase HPLC for chromatographic purity integration, and ESI Mass Spectrometry for molecular identity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="font-mono text-xs font-bold text-emerald-600 uppercase">Modality 01</div>
          <h2 className="text-2xl font-bold text-slate-900">Reverse-Phase HPLC (RP-HPLC)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Measures chromatographic purity by separating the main target peptide from truncated synthesis fragments,
            deletion peptides, and residual protecting group adducts using a C18 stationary phase column and acetonitrile gradient.
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-mono space-y-1 text-slate-700">
            <div>Detection Wavelength: 214 nm (peptide bond) &amp; 254 nm</div>
            <div>Acceptance Baseline: Peak Area Integration ≥98.0%</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="font-mono text-xs font-bold text-blue-600 uppercase">Modality 02</div>
          <h2 className="text-2xl font-bold text-slate-900">ESI Mass Spectrometry (ESI-MS)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ionizes the peptide sample without thermal fragmentation, measuring exact mass-to-charge (m/z) ratios to confirm
            that the synthesized amino acid sequence precisely matches the calculated theoretical monoisotopic mass.
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-mono space-y-1 text-slate-700">
            <div>Mass Accuracy: &plusmn; 0.5 Da variance from theoretical MW</div>
            <div>Excludes misfolded or substituted sequence errors</div>
          </div>
        </div>
      </div>
    </div>
  );
}
