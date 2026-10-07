'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PeptideCompound } from '../types';
import { Atom, ExternalLink, Dna, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { MolecularStructureModal } from './MolecularStructureModal';

interface Props {
  compound: PeptideCompound;
}

export function ChemicalIdentityCard({ compound }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const sequenceLength = compound.sequence ? compound.sequence.length : null;

  return (
    <>
      <div className="rounded-3xl border border-[rgba(141,168,195,0.3)] bg-gradient-to-br from-[#071d42] to-[#03112c] p-7 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient glow accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-300 block">
              Molecular Anatomy
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Chemical Structure & Metrics
            </h2>
          </div>

          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified CAS
          </span>
        </div>

        {/* Formula & Weight Display */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              Empirical Molecular Formula:
            </span>
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-300 tracking-wider block">
              {compound.molecularFormula}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1">
              <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                Molecular Weight
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-white block mt-0.5">
                {compound.molecularWeight}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1">
              <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                Residue Length
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-sky-300 block mt-0.5">
                {sequenceLength ? `${sequenceLength} Residues` : 'Synthetic Complex'}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Structure Explorer CTA Button */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500/20 via-emerald-500/15 to-sky-500/20 hover:from-sky-500/30 hover:to-emerald-500/25 border border-sky-400/40 hover:border-sky-300 text-sky-200 hover:text-white font-mono text-xs sm:text-sm font-bold transition-all shadow-md group"
        >
          <Atom className="w-4 h-4 text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
          <span>Inspect Structure (2D Skeletal & 3D Orbit)</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </button>

        {/* Database Verification Matrix */}
        <div className="space-y-3 font-mono text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] flex items-center justify-between">
            <span className="text-slate-300">CAS Registry:</span>
            <span className="text-white font-bold">{compound.casNumber}</span>
          </div>

          {compound.pubchemCid && (
            <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] flex items-center justify-between">
              <span className="text-slate-300">PubChem CID:</span>
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchemCid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:text-white font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>{compound.pubchemCid}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] flex items-center justify-between">
            <span className="text-slate-300">Biochemical Class:</span>
            <span className="text-amber-300 font-bold truncate max-w-[200px]">{compound.categoryName}</span>
          </div>
        </div>

        {/* Sequence Ribbon Preview */}
        {compound.sequence && compound.sequence.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[rgba(141,168,195,0.18)]">
            <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5 text-sky-400" />
              <span>N-to-C Residue Chain Preview:</span>
            </span>
            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {compound.sequence.slice(0, 8).map((aa, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-[#02102b] border border-sky-400/25 text-slate-200"
                >
                  {aa}
                </span>
              ))}
              {compound.sequence.length > 8 && (
                <span className="px-2 py-0.5 rounded bg-[#02102b] text-slate-400">
                  +{compound.sequence.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Analytical Standards Footer */}
        <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/25 text-[11px] font-mono text-slate-300 flex items-center justify-between">
          <span>Assay Standard:</span>
          <span className="text-emerald-300 font-bold">RP-HPLC ≥98% · ESI-MS</span>
        </div>
      </div>

      {/* 2D / 3D Molecular Structure Modal */}
      <MolecularStructureModal
        compound={compound}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
