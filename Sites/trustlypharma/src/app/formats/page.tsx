import Link from 'next/link';
import type { Metadata } from 'next';
import { FORMAT_PROFILES } from '../../data/formats';
import {
  Layers,
  Thermometer,
  Droplets,
  ChevronRight,
  ShieldAlert,
  Beaker,
  FileCheck2,
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
      <div className="border-b border-white/5 bg-obsidian-950/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Delivery Formats</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-16 border-b border-white/10 bg-gradient-to-b from-obsidian-900 to-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(FORMAT_PROFILES).map((fmt) => (
            <div
              key={fmt.id}
              id={fmt.id}
              className="scroll-mt-24 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 space-y-6 shadow-xl"
            >
              <div className="space-y-3 pb-4 border-b border-white/5">
                <span className={`text-xs font-mono px-3 py-1 rounded-md border inline-block ${fmt.badgeColor}`}>
                  {fmt.label}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {fmt.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Beaker className="w-3.5 h-3.5 text-cyan-400" /> Physical Chemical State
                  </span>
                  <p className="text-xs font-mono text-cyan-300">
                    {fmt.chemicalState}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-emerald-400" /> Laboratory Handling & Solvent Directive
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {fmt.laboratoryHandling}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-blue-400" /> Storage & Temperature Stability
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
