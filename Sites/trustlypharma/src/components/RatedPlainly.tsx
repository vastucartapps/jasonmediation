import Link from 'next/link';
import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { evidenceLevels } from '../data/site';
import { ArrowRight } from 'lucide-react';

export function RatedPlainly() {
  return (
    <section id="peptides-catalog" className="border-b border-[rgba(141,168,195,0.18)] bg-[#02102b] py-16 md:py-20 scroll-mt-20">
      <div className="container-wide space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2">
              Compound Database
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Evidence Rated Plainly
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Clear, transparent rating of where preclinical and clinical science really stands for each compound.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEPTIDE_COMPOUNDS.map((c) => {
            const lvl = evidenceLevels[c.evidenceLevel];
            return (
              <Link
                key={c.slug}
                href={`/peptides/${c.slug}/`}
                className="block rounded-3xl p-6 bg-[#0a2149] border border-[rgba(141,168,195,0.2)] hover:border-sky-400 hover:shadow-xl transition-all group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    CAS: {c.casNumber}
                  </span>
                  <div className="flex items-center gap-1" aria-label={lvl.label}>
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: n <= c.evidencePips ? lvl.color : 'rgba(141,168,195,0.2)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-sky-400 font-mono mt-0.5">
                    {c.categoryName}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.1)] font-mono text-[11px] flex justify-between text-slate-300">
                  <span className="text-slate-500">Formula:</span>
                  <span className="text-emerald-400 font-bold">{c.molecularFormula}</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {c.shortOverview}
                </p>

                <div className="pt-2 border-t border-[rgba(141,168,195,0.15)] flex items-center justify-between text-xs font-mono" style={{ color: lvl.color }}>
                  <span>{lvl.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
