import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { ShieldAlert, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Laboratory Safety Standards & COSHH Protocols',
  description:
    'Laboratory safety guidelines for handling synthetic research peptides under UK COSHH regulations, PPE requirements, and aseptic handling.',
  alternates: {
    canonical: `${SITE_METADATA.url}/safety/`,
  },
};

export default function SafetyPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Safety Protocols</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>COSHH &amp; Laboratory Biohazard Precautions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Laboratory Safety Protocols
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Standard operating procedures for managing, handling, and disposing of synthetic peptide reagents
          under the United Kingdom Control of Substances Hazardous to Health (COSHH) Regulations 2002.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Personal Protective Equipment (PPE)</h2>
          <p>
            All laboratory personnel reconstituting or manipulating lyophilized peptide cakes must wear certified nitrile
            gloves, chemical-resistant splash goggles, and a clean laboratory coat. Lyophilized powders should be handled
            inside a certified Class II microbiological safety cabinet or laminar flow hood to eliminate aerosol inhalation.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Chemical Disposal &amp; Sharps Management</h2>
          <p>
            Reagent residues, reconstitution vials, and dilution needles must be disposed of via designated yellow clinical
            waste incineration bins and certified sharps containers in compliance with the UK Hazardous Waste Regulations 2005.
          </p>
        </div>
      </div>
    </div>
  );
}
