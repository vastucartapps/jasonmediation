import React from 'react';
import { FlaskConical, BookOpen, CheckCircle2, Store } from 'lucide-react';

export function ClinicalGlanceBar() {
  const metrics = [
    {
      value: '12+',
      label: 'Verified Chemical Monographs',
      detail: 'CAS, SMILES, InChIKey, and PubChem CIDs',
      icon: FlaskConical,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      value: '140+',
      label: 'Indexed PubMed Citations',
      detail: 'Peer-reviewed pre-clinical & in vitro assays',
      icon: BookOpen,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      value: '≥98.0%',
      label: 'RP-HPLC Assay Standard',
      detail: 'Lot-matched chromatographic purity floor',
      icon: CheckCircle2,
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
    },
    {
      value: '5',
      label: 'Vetted UK Suppliers',
      detail: 'Audited against UK statutory & dispatch criteria',
      icon: Store,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
  ];

  return (
    <section className="container-wide py-2" aria-label="Laboratory Audit Statistics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="clinical-card p-5 sm:p-6 bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/40 hover:shadow-sm transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${item.bg} ${item.border} ${item.color} border shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                  Registry Metric
                </span>
              </div>

              <div className="space-y-1">
                <div className="font-mono font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {item.label}
                </div>
                <div className="text-xs font-mono text-slate-700 leading-relaxed pt-0.5 font-medium">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
