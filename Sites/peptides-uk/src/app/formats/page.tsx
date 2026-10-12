import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { Package, ChevronRight, FlaskConical, SprayCan, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Formats & Laboratory Vial Specifications',
  description:
    'Technical guide to peptide delivery formats: lyophilized research vials, pre-metered pen cartridges, nasal spray atomizers, and research stacks.',
  alternates: {
    canonical: `${SITE_METADATA.url}/formats/`,
  },
};

export default function FormatsPage() {
  const formats = [
    {
      title: 'Lyophilized Research Vials',
      format: 'vial',
      description:
        'Vacuum-freeze-dried solid peptide cake sealed in Type I neutral borosilicate glass under inert argon or nitrogen atmosphere. The international gold standard for long-term compound stability.',
      specs: [
        'Storage: -20°C desiccated (stable up to 24-36 months)',
        'Requires reconstitution with bacteriostatic water or sterile diluent',
        'Standard vial quantities: 2mg, 5mg, 10mg, 50mg',
      ],
    },
    {
      title: 'Pre-Metered Cartridge Delivery Pens',
      format: 'pen',
      description:
        'Calibrated multi-dose laboratory dispensing pens holding pre-mixed or dual-chamber peptide solutions for high-precision micro-volumetric dispensing.',
      specs: [
        'Storage: 2°C to 8°C cold-chain refrigeration',
        'Built-in dial micro-volume volumetric graduation',
        'Eliminates manual syringe dead-space error',
      ],
    },
    {
      title: 'Calibrated Metered Nasal Atomizers',
      format: 'spray',
      description:
        'Aqueous peptide formulations engineered specifically for mucosal permeability studies (e.g. Semax, Selank). Metered pumps deliver exactly 0.1ml per actuation.',
      specs: [
        'Storage: 2°C to 8°C refrigerated',
        'Metered actuation delivering precise mcg per spray',
        'Formulated with pharmaceutical saline and preservatives',
      ],
    },
    {
      title: 'Synergistic Multi-Peptide Blends & Stacks',
      format: 'stack',
      description:
        'Pre-combined co-lyophilized peptide ratios (e.g., BPC-157 + TB-500 or CJC-1295 + Ipamorelin) formulated for dual-pathway pre-clinical interaction studies.',
      specs: [
        'Exact stoichiometric molecular co-lyophilization',
        'Eliminates compound reconstitution incompatibility',
        'Supported by dual-wavelength HPLC verification',
      ],
    },
  ];

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Reagent Formats</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Package className="w-3.5 h-3.5" />
          <span>Vial &amp; Cartridge Physical Formats</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Peptide Delivery Formats &amp; Specifications
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive physical and chemical specifications for the four primary research peptide formats
          distributed across United Kingdom laboratories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {formats.map((fmt, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <span className="badge-emerald font-mono text-xs uppercase">{fmt.format}</span>
            <h2 className="text-2xl font-bold text-slate-900">{fmt.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{fmt.description}</p>
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
              {fmt.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
