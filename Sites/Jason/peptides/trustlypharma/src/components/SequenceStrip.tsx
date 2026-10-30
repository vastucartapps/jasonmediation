'use client';

import { Dna, Info } from 'lucide-react';

interface SequenceStripProps {
  sequence?: string[];
  systematicName?: string;
  className?: string;
}

// Map common amino acids to chemical classification colors
const getResidueColor = (aa: string): { bg: string; text: string; border: string; type: string } => {
  const code = aa.toUpperCase();
  if (['GLU', 'ASP'].includes(code)) {
    return {
      bg: 'bg-rose-500/10',
      text: 'text-rose-300',
      border: 'border-rose-500/30',
      type: 'Acidic / Negatively Charged',
    };
  }
  if (['LYS', 'ARG', 'HIS'].includes(code)) {
    return {
      bg: 'bg-blue-500/10',
      text: 'text-blue-300',
      border: 'border-blue-500/30',
      type: 'Basic / Positively Charged',
    };
  }
  if (['SER', 'THR', 'ASN', 'GLN', 'CYS', 'TYR'].includes(code)) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      type: 'Polar / Hydrophilic',
    };
  }
  return {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-300',
    border: 'border-cyan-500/30',
    type: 'Aliphatic / Hydrophobic',
  };
};

export function SequenceStrip({ sequence, systematicName, className = '' }: SequenceStripProps) {
  if (!sequence || sequence.length === 0) return null;

  return (
    <div
      className={`glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 shadow-xl ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono font-semibold tracking-wider text-slate-200">
              Primary Amino Acid Sequence
            </span>
            <span className="text-[11px] font-mono text-slate-400 ml-2">
              ({sequence.length} Residues)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span> Nonpolar
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> Polar
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span> Basic
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> Acidic
          </span>
        </div>
      </div>

      {/* Sequence Residues Chain */}
      <div className="pt-4 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="font-mono text-xs font-bold text-slate-500 px-2 py-1 rounded bg-black/30 border border-white/5">
            H₂N-
          </span>

          {sequence.map((residue, idx) => {
            const style = getResidueColor(residue);
            return (
              <div key={idx} className="flex items-center">
                <div
                  className={`group relative flex flex-col items-center justify-center w-11 h-12 rounded-lg border ${style.border} ${style.bg} transition-all hover:scale-110 hover:z-10 shadow-sm cursor-help`}
                  title={`Residue ${idx + 1}: ${residue} (${style.type})`}
                >
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300">
                    {idx + 1}
                  </span>
                  <span className={`text-xs font-mono font-bold ${style.text}`}>
                    {residue}
                  </span>
                </div>
                {idx < sequence.length - 1 && (
                  <span className="text-slate-600 font-mono text-xs mx-0.5">-</span>
                )}
              </div>
            );
          })}

          <span className="font-mono text-xs font-bold text-slate-500 px-2 py-1 rounded bg-black/30 border border-white/5">
            -COOH
          </span>
        </div>
      </div>

      {systematicName && (
        <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">Systematic IUPAC notation: {systematicName}</span>
        </div>
      )}
    </div>
  );
}
