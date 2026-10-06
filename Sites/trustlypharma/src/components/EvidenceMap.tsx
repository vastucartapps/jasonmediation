import Link from 'next/link';
import { evidenceLevels } from '../data/site';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { Dna, ArrowRight } from 'lucide-react';

export function EvidenceMap() {
  return (
    <section id="evidence-map" className="border-b border-[rgba(141,168,195,0.18)] bg-[#041638] py-16 md:py-20 scroll-mt-20">
      <div className="container-wide space-y-10">
        <div className="max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2">
            Clinical Proof Index
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Evidence Map
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Every peptide in our index is positioned by how far its proof really extends — from in vitro cellular assays to double-blind human randomized controlled trials — and clustered by biological research application.
          </p>
        </div>

        {/* Legend Pips */}
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.2)]">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase">Evidence Tiers:</span>
          {Object.values(evidenceLevels).map((lvl) => (
            <div key={lvl.label} className="flex items-center gap-2 font-mono text-xs font-semibold text-white">
              <span className="flex items-center gap-1">
                {[1, 2, 3].map((pip) => (
                  <span
                    key={pip}
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{
                      background: pip <= lvl.pips ? lvl.color : 'rgba(141,168,195,0.2)',
                    }}
                  />
                ))}
              </span>
              <span style={{ color: lvl.color }}>{lvl.label}</span>
            </div>
          ))}
        </div>

        {/* Categories Clusters */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className="rounded-3xl p-6 bg-[#0a2149] border border-[rgba(141,168,195,0.2)] hover:border-sky-400 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-sky-400 bg-[#103059] px-2.5 py-0.5 rounded-md border border-sky-500/20 inline-block">
                  {cat.featuredCompoundSlugs.length} Compounds Mapped
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cat.headline}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(141,168,195,0.15)] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-sky-400">
                <span>Explore Signaling Pathways</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
