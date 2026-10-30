import React from 'react';
import Link from 'next/link';
import { PeptideCompound } from '@/types';
import { Activity, ArrowRight, Dna } from 'lucide-react';

interface AminoReagentCardProps {
  compound: PeptideCompound;
}

export function AminoReagentCard({ compound }: AminoReagentCardProps) {
  const evidenceBadge = {
    human: { label: 'Human Trial Data', badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' },
    mixed: { label: 'Mixed Pre-Clinical', badge: 'bg-amber-500/20 text-amber-200 border-amber-400/30' },
    animal: { label: 'Pre-Clinical Animal', badge: 'bg-indigo-400/20 text-indigo-200 border-indigo-300/30' },
  }[compound.evidenceLevel];

  return (
    <div className="amino-card flex flex-col justify-between h-full group bg-white border border-zinc-300/80 rounded-2xl shadow-sm hover:border-indigo-600 hover:shadow-am-elevated hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      <div>
        {/* Thematic Gradient Header Cap */}
        <div className="bg-gradient-to-r from-[#1b1933] via-[#241f47] to-[#1e1b38] text-white px-5 py-3.5 border-b border-indigo-900/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${evidenceBadge.badge}`}>
              <Activity className="w-3 h-3" />
              <span>{evidenceBadge.label}</span>
            </span>
          </div>
          <span className="font-mono text-xs text-indigo-200 bg-indigo-950/80 px-2.5 py-0.5 rounded-md border border-indigo-500/40 font-bold tracking-wide">
            CAS {compound.casNumber}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Compound Title & Systematic Name */}
          <Link href={`/peptides/${compound.slug}/`} className="block group-hover:text-indigo-800 transition-colors">
            <h3 className="text-xl font-black text-zinc-950 group-hover:text-indigo-800 transition-colors tracking-tight">
              {compound.name}
            </h3>
            <p className="text-xs text-zinc-600 font-medium line-clamp-1 mt-0.5 font-mono">
              {compound.systematicName}
            </p>
          </Link>

          {/* Molecular Parameters Chips */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            <span className="bg-zinc-100 text-zinc-900 px-2 py-0.5 rounded border border-zinc-300 font-semibold shadow-2xs">
              {compound.molecularFormula}
            </span>
            <span className="bg-zinc-100 text-zinc-900 px-2 py-0.5 rounded border border-zinc-300 font-semibold shadow-2xs">
              {compound.molecularWeight}
            </span>
            <span className="bg-indigo-50 text-indigo-950 px-2 py-0.5 rounded border border-indigo-200 font-bold">
              {compound.categoryName}
            </span>
          </div>

          {/* Short Summary Description */}
          <p className="text-xs text-zinc-700 line-clamp-3 leading-relaxed">
            {compound.shortOverview}
          </p>

          {/* Available Delivery Formats */}
          <div className="pt-3 border-t border-zinc-200/80">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1.5">
              Available Laboratory Formats:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {compound.availableFormats.map((fmt) => (
                <span
                  key={fmt}
                  className="text-[10px] font-mono uppercase bg-white text-zinc-800 px-2 py-0.5 rounded font-bold border border-zinc-300 shadow-2xs"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 py-3.5 bg-zinc-50/80 border-t border-zinc-200 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-orange-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-600" />
          <span>Purity &ge;98.5% HPLC</span>
        </span>
        <Link
          href={`/peptides/${compound.slug}/`}
          aria-label={`View ${compound.name} analytical monograph`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Monograph</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
