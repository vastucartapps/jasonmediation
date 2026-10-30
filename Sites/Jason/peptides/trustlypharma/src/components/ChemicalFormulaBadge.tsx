'use client';

import { useState } from 'react';
import { Copy, Check, FlaskConical, Atom, Hash } from 'lucide-react';

interface ChemicalFormulaBadgeProps {
  formula: string;
  molecularWeight: string;
  casNumber: string;
  pubchemCid?: string;
  className?: string;
}

export function ChemicalFormulaBadge({
  formula,
  molecularWeight,
  casNumber,
  pubchemCid,
  className = '',
}: ChemicalFormulaBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format chemical formula into nice subscripts: C62H98N16O22 -> C₆₂H₉₈N₁₆O₂₂
  const formatFormulaSubscripts = (raw: string) => {
    const parts = raw.split(/([0-9]+)/);
    return parts.map((part, idx) => {
      if (/^[0-9]+$/.test(part)) {
        return (
          <sub key={idx} className="text-[0.75em] bottom-[-0.2em] relative text-cyan-300">
            {part}
          </sub>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-4 sm:p-5 border border-cyan-500/20 bg-gradient-to-br from-obsidian-850/90 to-obsidian-900/90 shadow-xl ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-300">
            Chemical Specifications
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 transition-colors"
          title="Copy empirical formula"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Formula Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Formula</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3.5">
        {/* Empirical Formula */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Molecular Formula
          </span>
          <div className="font-mono text-base font-bold text-cyan-400 tracking-wide select-all">
            {formatFormulaSubscripts(formula)}
          </div>
        </div>

        {/* Molecular Weight */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Molecular Mass
          </span>
          <div className="font-mono text-sm font-semibold text-slate-200">
            {molecularWeight}
          </div>
        </div>

        {/* CAS Registry & PubChem */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            CAS & PubChem
          </span>
          <div className="font-mono text-xs font-medium text-slate-300 flex items-center gap-2">
            <span>CAS: {casNumber}</span>
            {pubchemCid && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                CID {pubchemCid}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
