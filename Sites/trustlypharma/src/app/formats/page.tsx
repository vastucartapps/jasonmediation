import Link from 'next/link';
import type { Metadata } from 'next';
import { FORMAT_PROFILES } from '../../data/formats';
import {
  Layers,
  Thermometer,
  Droplets,
  ChevronRight,
  Beaker,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Delivery Formats & Physical Preparation Standards',
  description:
    'Laboratory handling protocols for synthetic peptide delivery formats: Lyophilized powder vials, pre-mixed cartridge pens, metered mucosal sprays, and synergistic multi-compound stacks.',
};

export default function FormatsPage() {
  return (
    <div className="relative pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Delivery Formats</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Analytical Physical State Specifications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Peptide Delivery Formats & Preparation Standards
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Standardised handling parameters, reconstitution solvent compatibility, and cold-chain thermal guidelines across the four primary peptide preparation states investigated in preclinical research laboratories.
          </p>
        </div>
      </section>

      {/* Formats Grid */}
      <div className="container-wide mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(FORMAT_PROFILES).map((fmt) => (
            <div
              key={fmt.id}
              id={fmt.id}
              className="scroll-mt-24 rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] space-y-6 shadow-xl"
            >
              <div className="space-y-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
                <span className="text-xs font-mono px-3 py-1 rounded-md border border-[rgba(141,168,195,0.25)] bg-[#02102b] text-sky-300 inline-block">
                  {fmt.label}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {fmt.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Beaker className="w-3.5 h-3.5 text-sky-400" /> Physical Chemical State
                  </span>
                  <p className="text-xs font-mono text-sky-300">
                    {fmt.chemicalState}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-emerald-400" /> Laboratory Handling & Solvent Directive
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {fmt.laboratoryHandling}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-sky-400" /> Storage & Temperature Stability
                  </span>
                  <p className="text-xs font-mono text-slate-200">
                    {fmt.storageRequirement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
