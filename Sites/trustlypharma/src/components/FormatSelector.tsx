'use client';

import { useState } from 'react';
import { Thermometer, ShieldAlert, CheckCircle2, Droplets, Layers, Sparkles } from 'lucide-react';
import { FORMAT_PROFILES } from '../data/formats';
import { DeliveryFormatType } from '../types';

interface FormatSelectorProps {
  availableFormats?: DeliveryFormatType[];
  className?: string;
}

export function FormatSelector({ availableFormats = ['vial', 'pen', 'spray', 'stack'], className = '' }: FormatSelectorProps) {
  const [selectedFormat, setSelectedFormat] = useState<DeliveryFormatType>(availableFormats[0] || 'vial');
  const profile = FORMAT_PROFILES[selectedFormat];

  return (
    <div
      className={`glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 shadow-xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
            Physical Preparation Standards
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Laboratory Delivery Formats & Cold-Chain Protocols
          </h3>
        </div>

        {/* Format Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {availableFormats.map((fmt) => {
            const fProf = FORMAT_PROFILES[fmt];
            const isActive = selectedFormat === fmt;
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => setSelectedFormat(fmt)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-glow-cyan/50 scale-105'
                    : 'bg-obsidian-950/80 text-slate-300 border border-white/5 hover:border-cyan-500/30'
                }`}
              >
                {fProf.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Format Detail Card */}
      {profile && (
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-md border inline-block mb-2 ${profile.badgeColor}`}>
                {profile.label}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {profile.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Laboratory Handling Directive
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {profile.laboratoryHandling}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block flex items-center gap-1.5 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-blue-400" /> Temperature & Storage
              </span>
              <p className="text-xs text-slate-200 font-mono">
                {profile.storageRequirement}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Reconstitution Required?
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${profile.reconstitutionNeeded ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className="text-xs font-mono text-slate-200">
                  {profile.reconstitutionNeeded ? 'Yes — Requires Bacteriostatic Diluent' : 'No — Pre-Solubilized Aqueous Matrix'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
