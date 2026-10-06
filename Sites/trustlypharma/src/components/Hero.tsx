import Link from 'next/link';
import { hero } from '../data/site';
import { Database, BookOpen, Dna, Atom, ExternalLink, ArrowRight } from 'lucide-react';

export const POPULAR_PEPTIDES = [
  { name: 'BPC-157', cas: '137525-51-0', slug: 'bpc-157', formula: 'C62H98N16O22' },
  { name: 'TB-500', cas: '77591-33-4', slug: 'tb-500', formula: 'C212H350N56O78S' },
  { name: 'Semax', cas: '80714-61-0', slug: 'semax', formula: 'C37H51N9O10S' },
  { name: 'GHK-Cu', cas: '49557-75-7', slug: 'ghk-cu', formula: 'C14H24CuN6O4' },
  { name: 'CJC-1295', cas: '863288-34-0', slug: 'cjc-1295', formula: 'C152H252N44O42' },
  { name: 'Ipamorelin', cas: '170851-70-4', slug: 'ipamorelin', formula: 'C38H49N9O5' },
];

export function Hero() {
  const { card } = hero;

  return (
    <section className="border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638] py-14 md:py-20">
      <div className="container-wide">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">
          {/* Left Column: Authoritative Academic Encyclopedia Positioning */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 mb-6">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>ACADEMIC CHEMICAL REGISTRY & CITATION DIRECTORY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5">
              {hero.titleLine1}
              <br />
              <span className="text-sky-400">{hero.titleLine2}</span>
            </h1>

            <p className="text-base text-slate-300 leading-relaxed max-w-xl mb-4 border-l-2 border-sky-500/40 pl-4">
              {hero.quote}
            </p>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl mb-8">
              {hero.lede}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href={hero.cta.href}
                className="gradient-bg px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {hero.cta.label}
              </Link>

              <Link
                href={hero.secondary.href}
                className="px-6 py-3.5 rounded-full font-mono text-xs font-semibold text-sky-300 bg-[#103059] hover:bg-[#123a6b] border border-[rgba(141,168,195,0.25)] transition-colors"
              >
                {hero.secondary.label}
              </Link>
            </div>

            {/* Quick Peptide Jump Pills */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                Quick Compound Lookup:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_PEPTIDES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/peptides/${p.slug}/`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a2149] hover:bg-[#103059] border border-[rgba(141,168,195,0.2)] text-xs font-mono text-slate-300 hover:text-white transition-all"
                  >
                    <span className="font-bold text-sky-400">{p.name}</span>
                    <span className="text-[10px] text-slate-500">CAS {p.cas}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Scientific Sources Card */}
          <div className="rounded-3xl border border-[rgba(141,168,195,0.3)] bg-[#0a2149] p-7 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
              <div>
                <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-400">
                  {card.eyebrow}
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                  {card.title}
                </h2>
              </div>

              <span className="flex items-center gap-1.5 text-[11px] font-mono text-sky-400 bg-sky-950/40 px-2.5 py-1 rounded-full border border-sky-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                NIH Indexed
              </span>
            </div>

            <p className="font-mono text-xs text-slate-300 leading-relaxed">
              {card.caption}
            </p>

            {/* Verified Sources List */}
            <div className="space-y-3">
              {card.sources.map((s) => (
                <div
                  key={s.name}
                  className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.15)] flex items-start gap-3"
                >
                  <div className="p-1 rounded bg-sky-500/10 text-sky-400 shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {s.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {s.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Numerical Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(141,168,195,0.18)] text-center">
              {card.stats.map((s) => (
                <div key={s.label}>
                  <span className="block font-mono font-extrabold text-2xl text-white">
                    {s.value}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                href="/#peptides-catalog"
                className="text-xs font-mono font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
              >
                <span>{card.cta.label}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
