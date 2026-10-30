import React from 'react';
import { FlaskConical, BookOpen, CheckCircle2, Store, Dna } from 'lucide-react';

export function AminoGlanceBar() {
  const metrics = [
    {
      value: '12+',
      label: 'Verified Chemical Monographs',
      detail: 'CAS, SMILES, InChIKey, and PubChem CIDs',
      icon: Dna,
      color: 'text-indigo-800',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
    },
    {
      value: '140+',
      label: 'Indexed PubMed Citations',
      detail: 'Peer-reviewed pre-clinical & in vitro assays',
      icon: BookOpen,
      color: 'text-purple-800',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      value: '≥98.0%',
      label: 'RP-HPLC Assay Standard',
      detail: 'Lot-matched chromatographic purity floor',
      icon: CheckCircle2,
      color: 'text-orange-800',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      value: '5',
      label: 'Verified Supplier Portals',
      detail: 'Audited against UK & EU laboratory criteria',
      icon: Store,
      color: 'text-zinc-900',
      bg: 'bg-zinc-100',
      border: 'border-zinc-300',
    },
  ];

  return (
    <section className="container-ultra-wide py-4" aria-label="Laboratory Audit Statistics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="amino-card p-6 bg-white border border-zinc-200/90 shadow-am-card hover:border-indigo-500/40 hover:shadow-am-elevated transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${item.bg} ${item.border} ${item.color} border shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
                  Registry Metric
                </span>
              </div>
              <div>
                <span className="text-3xl font-black text-zinc-950 tracking-tight block">
                  {item.value}
                </span>
                <span className="text-sm font-bold text-zinc-900 block mt-0.5">
                  {item.label}
                </span>
                <span className="text-xs text-zinc-700 leading-snug block mt-1">
                  {item.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
