import React from 'react';
import Link from 'next/link';
import { PeptideCompound } from '@/types';
import { ShieldCheck, ExternalLink, Activity, ArrowRight } from 'lucide-react';

interface ReagentCardProps {
  compound: PeptideCompound;
}

export function ReagentCard({ compound }: ReagentCardProps) {
  const evidenceBadge = {
    human: { label: 'Human Trial Data', class: 'badge-emerald' },
    mixed: { label: 'Mixed Pre-Clinical', class: 'badge-cobalt' },
    animal: { label: 'Pre-Clinical Animal', class: 'badge-amber' },
  }[compound.evidenceLevel];

  return (
    <div className="clinical-card p-6 flex flex-col justify-between h-full group bg-white border border-slate-200/90 rounded-2xl hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      <div>
        {/* Top Meta Strip */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={evidenceBadge.class}>
            <Activity className="w-3 h-3" />
            <span>{evidenceBadge.label}</span>
          </span>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            CAS {compound.casNumber}
          </span>
        </div>

        {/* Compound Title & Systematic Name */}
        <Link href={`/peptides/${compound.slug}/`} className="block group-hover:text-emerald-700 transition-colors">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {compound.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {compound.systematicName}
          </p>
        </Link>

        {/* Molecular Parameters Chips */}
        <div className="flex flex-wrap items-center gap-1.5 my-3.5 font-mono text-[11px]">
          <span className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
            {compound.molecularFormula}
          </span>
          <span className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
            {compound.molecularWeight}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            {compound.categoryName}
          </span>
        </div>

        {/* Short Summary Description */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {compound.shortOverview}
        </p>

        {/* Verified UK Supplier Availability Chips */}
        <div className="pt-3 border-t border-slate-100 mb-4">
          <div className="text-[11px] font-mono text-slate-500 mb-1.5 font-semibold">
            Verified UK Sourcing Partners:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {compound.supplierLinks.map((supplier) => (
              <span
                key={supplier.supplierId}
                className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/80"
              >
                {supplier.supplierName} ({supplier.puritySpecification})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <Link
        href={`/peptides/${compound.slug}/`}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 text-slate-800 text-xs font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-colors"
      >
        <span>View Full Technical Monograph</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
