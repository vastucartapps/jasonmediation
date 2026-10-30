'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  FlaskConical,
  Droplets,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Syringe,
  Wind,
  Sparkles,
  Zap,
} from 'lucide-react';
import { FORMAT_PROFILES, FormatProfile } from '../data/formats';
import { DeliveryFormatType } from '../types';

interface SolventGuide {
  name: string;
  idealFor: string;
  shelfLife: string;
  notes: string;
}

const SOLVENT_GUIDES: SolventGuide[] = [
  {
    name: 'Bacteriostatic Water (0.9% Benzyl Alcohol)',
    idealFor: 'Multi-dose lyophilized vials, repeated laboratory sampling',
    shelfLife: 'Up to 28 days refrigerated at 2°C–8°C',
    notes: 'Preservative inhibits bacterial growth across repeated septum punctures. Gold standard for research assays.',
  },
  {
    name: 'USP Sterile Water for Injection (SWFI)',
    idealFor: 'Single-use acute assays, cell culture sensitive to alcohol',
    shelfLife: 'Single-use / Consume within 4–6 hours',
    notes: 'Contains no antimicrobial agents. Risk of bacterial contamination if stored after unsealing.',
  },
  {
    name: 'Sterile 0.9% Sodium Chloride (Normal Saline)',
    idealFor: 'Electrophysiological and cellular isotonic perfusion assays',
    shelfLife: '24–48 hours refrigerated at 2°C–8°C',
    notes: 'Maintains osmotic balance across membrane potential assays; avoid if sodium alters assay kinetics.',
  },
  {
    name: '0.1%–1.0% Sterile Acetic Acid Solution',
    idealFor: 'Hydrophobic or basic peptide sequences prone to aggregation',
    shelfLife: 'Varies by sequence (immediate aliquot recommended)',
    notes: 'Lowers pH to disrupt hydrophobic agglomerates; neutralize with buffered diluent after initial dissolution.',
  },
];

const BENCHMARK_COMPARISONS = [
  {
    format: 'Lyophilized Powder Vials',
    shelfLife: '24–36 months at -20°C',
    volumetricPrecision: '±0.5% (Analytical Pipette)',
    reconstitutionNeeded: 'Yes (Bacteriostatic / Sterile)',
    coldChainDuringTransit: 'Ambient short-term / Insulated long-term',
    bestApplication: 'Quantitative in vitro assays, HPLC controls',
  },
  {
    format: 'Pre-Mixed Multidose Pens',
    shelfLife: '60–90 days at 2°C–8°C',
    volumetricPrecision: '±2.0% (Dial mechanism clicks)',
    reconstitutionNeeded: 'No (Pre-dissolved in cartridge)',
    coldChainDuringTransit: 'Mandatory cold-chain (2°C–8°C)',
    bestApplication: 'High-throughput routine dosing cohorts',
  },
  {
    format: 'Metered Nasal Atomizers',
    shelfLife: '30–60 days refrigerated',
    volumetricPrecision: '±5.0% (Actuator spray plume)',
    reconstitutionNeeded: 'No (Buffered aqueous solution)',
    coldChainDuringTransit: 'Refrigerated cold-chain required',
    bestApplication: 'Blood-brain barrier bypass & neurotrophic models',
  },
  {
    format: 'Synergistic Research Stacks',
    shelfLife: '24 months dry / 14–21 days dissolved',
    volumetricPrecision: '±1.0% (Pre-measured stoichiometry)',
    reconstitutionNeeded: 'Yes (Synchronized solvent additions)',
    coldChainDuringTransit: 'Ambient dry / Insulated long-term',
    bestApplication: 'Receptor crosstalk & cascade activation studies',
  },
];

export function FormatsLabExplorer() {
  const [selectedFormat, setSelectedFormat] = useState<DeliveryFormatType>('vial');

  const activeProfile = FORMAT_PROFILES[selectedFormat];

  return (
    <div className="space-y-16">
      {/* Interactive Format Switcher */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 block">
              Physical Preparation States
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Select Peptide Delivery State
            </h2>
          </div>

          {/* Format Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] self-start sm:self-auto">
            {(Object.keys(FORMAT_PROFILES) as DeliveryFormatType[]).map((fmtId) => {
              const fmt = FORMAT_PROFILES[fmtId];
              const isSelected = selectedFormat === fmtId;
              return (
                <button
                  key={fmtId}
                  type="button"
                  onClick={() => setSelectedFormat(fmtId)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 shadow-md scale-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {fmt.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Format Spotlight Card */}
        <div className="rounded-3xl p-6 sm:p-10 card-paper border border-sky-500/30 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#071d42] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(141,168,195,0.2)]">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold uppercase text-sky-300 block">
                Physical State Profile
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {activeProfile.label}
              </h3>
            </div>

            <span className="text-xs font-mono font-bold px-4 py-1.5 rounded-xl border border-sky-400/40 bg-[#02102b] text-sky-200 self-start md:self-auto shadow-sm">
              Reconstitution Required: {activeProfile.reconstitutionNeeded ? 'YES (In-Lab)' : 'NO (Pre-Formulated)'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl">
            {activeProfile.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-sky-500/25 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold">
                  Chemical Matrix
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {activeProfile.chemicalState}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-emerald-500/25 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Droplets className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
                  Solvent Directive
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeProfile.laboratoryHandling}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-amber-500/25 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                  <Thermometer className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  Thermal Window
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {activeProfile.storageRequirement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volumetric Precision & Stability Benchmark Table */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
              Analytical Comparison
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Volumetric Precision & Degradation Matrix
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-300 bg-[#02102b] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
            Coefficient of Variation (CV%)
          </span>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#02102b]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[rgba(141,168,195,0.2)] bg-[#041638] text-sky-300 font-mono text-[11px] uppercase">
                <th className="py-4 px-5">Physical Format</th>
                <th className="py-4 px-5">Volumetric Precision (CV)</th>
                <th className="py-4 px-5">Shelf-Life Stability</th>
                <th className="py-4 px-5">Reconstitution</th>
                <th className="py-4 px-5">Cold-Chain Transit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(141,168,195,0.12)] text-slate-200">
              {BENCHMARK_COMPARISONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#071d42]/60 transition-colors">
                  <td className="py-4 px-5 font-bold text-white whitespace-nowrap">
                    {row.format}
                  </td>
                  <td className="py-4 px-5 font-mono text-emerald-300 font-semibold">
                    {row.volumetricPrecision}
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-300">
                    {row.shelfLife}
                  </td>
                  <td className="py-4 px-5">
                    {row.reconstitutionNeeded}
                  </td>
                  <td className="py-4 px-5 text-amber-200">
                    {row.coldChainDuringTransit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4-Step Reconstitution SOP */}
      <section className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[rgba(141,168,195,0.18)]">
          <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold block">
              Standard Operating Procedure
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              4-Phase Laboratory Reconstitution Protocol
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-sky-500/25 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400 font-mono font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <h3 className="font-mono font-bold text-sky-300 uppercase text-[11px]">
                Thermal Equilibration
              </h3>
            </div>
            <p className="text-slate-200">
              Remove the lyophilized peptide vial from -20°C freezer and allow it to equilibrate naturally to ambient room temperature (20°C–25°C) for 15–20 minutes before unsealing. Opening a frozen vial risks atmospheric moisture condensation, inducing premature hydrolytic peptide cleavage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-emerald-500/25 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <h3 className="font-mono font-bold text-emerald-300 uppercase text-[11px]">
                Wall-Trickle Diluent Introduction
              </h3>
            </div>
            <p className="text-slate-200">
              Draw the exact calculated volume of diluent using a calibrated analytical pipette or sterile syringe. Slowly aim the diluent stream against the inside glass wall of the vial, allowing the solvent to trickle down gently. Never project diluent directly onto the fragile lyophilized cake.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-purple-500/25 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-400 font-mono font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <h3 className="font-mono font-bold text-purple-300 uppercase text-[11px]">
                Gentle Rotational Dissolution
              </h3>
            </div>
            <p className="text-slate-200">
              Swirl the vial gently in slow circular horizontal rotations until all lyophilized particles are completely solubilized into a transparent solution. <strong className="text-rose-300">NEVER VORTEX OR VIGOROUSLY SHAKE</strong>: Mechanical shear stress disrupts fragile tertiary structures and denatures peptide chains.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#02102b]/90 border border-amber-500/25 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <h3 className="font-mono font-bold text-amber-300 uppercase text-[11px]">
                Aliquot Partitioning & Cold Storage
              </h3>
            </div>
            <p className="text-slate-200">
              For multi-week research schedules, partition reconstituted solution into single-use amber cryogenic micro-centrifuge tubes. Store at 2°C–8°C for active protocols, or deep-freeze aliquots at -20°C. Never subject a reconstituted solution to repeated freeze-thaw cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Solvent Compatibility Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 block">
              Diluent Selection Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Laboratory Reconstitution Solvent Compatibility
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-300 bg-[#02102b] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
            USP & Analytical Standards
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOLVENT_GUIDES.map((sol, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(141,168,195,0.15)]">
                <h3 className="text-sm font-bold text-white font-mono">{sol.name}</h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                  {sol.shelfLife}
                </span>
              </div>
              <p className="text-xs text-sky-200 font-mono">
                Optimal For: {sol.idealFor}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {sol.notes}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
