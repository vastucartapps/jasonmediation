import Link from 'next/link';
import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { evidenceLevels } from '../data/site';
import { ArrowRight, Dna, Database, ShieldCheck } from 'lucide-react';

export function RatedPlainly() {
  return (
    <section id="peptides-catalog" className="border-b border-[rgba(141,168,195,0.22)] bg-[#02102b] py-16 md:py-24 scroll-mt-20">
      <div className="container-wide space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300">
              <Database className="w-3.5 h-3.5" />
              <span>ACADEMIC REPOSITORY INDEX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Evidence Rated Plainly
            </h2>
            <p className="text-base text-slate-200 max-w-2xl font-medium leading-relaxed">
              Transparent, peer-reviewed evaluation of where preclinical and clinical science stands for every indexed peptide.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-sky-300 bg-[#071d42] px-4 py-2 rounded-xl border border-[rgba(141,168,195,0.25)] shrink-0">
            <Dna className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{PEPTIDE_COMPOUNDS.length} Compounds Documented</span>
          </div>
        </div>

        {/* 12-Card Symmetric 3x4 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEPTIDE_COMPOUNDS.map((c) => {
            const lvl = evidenceLevels[c.evidenceLevel];
            return (
              <Link
                key={c.slug}
                href={`/peptides/${c.slug}/`}
                className="block rounded-3xl p-6 bg-gradient-to-br from-[#071d42] to-[#04122d] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 hover:shadow-2xl transition-all group space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300 font-bold">
                    CAS: {c.casNumber}
                  </span>
                  <div className="flex items-center gap-1.5" aria-label={lvl.label}>
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="w-2 h-2 rounded-full shadow-sm"
                        style={{
                          background: n <= c.evidencePips ? lvl.color : 'rgba(141,168,195,0.25)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-sky-300 font-mono mt-0.5 line-clamp-1 font-semibold">
                    {c.categoryName}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] font-mono text-xs flex justify-between text-slate-200">
                  <span className="text-slate-400">Formula:</span>
                  <span className="text-emerald-300 font-bold">{c.molecularFormula}</span>
                </div>

                <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                  {c.shortOverview}
                </p>

                <div className="pt-3 border-t border-[rgba(141,168,195,0.2)] flex items-center justify-between text-xs font-mono font-bold" style={{ color: lvl.color }}>
                  <span>{lvl.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Symmetric Directory Footer Bar */}
        <div className="p-6 rounded-3xl bg-[#071d42] border border-[rgba(141,168,195,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-sm font-bold text-white block">
              Looking for a Specific Synthetic Peptide or Analytical Method?
            </span>
            <span className="text-xs text-slate-300 block">
              Search all CAS numbers, PubChem CIDs, and research documentation across our chemical index.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/safety/"
              className="px-5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 text-xs font-mono text-slate-200 hover:text-white transition-colors"
            >
              Research Safety SOP
            </Link>
            <Link
              href="/formats/"
              className="gradient-bg px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 shadow-md hover:shadow-xl transition-all"
            >
              Delivery Formats Standards →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
