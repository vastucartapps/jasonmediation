import Link from 'next/link';
import { hero } from '../data/site';
import { Database, BookOpen, Dna, Atom, ExternalLink, ArrowRight } from 'lucide-react';
import { HeroHelix } from './HeroHelix';

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
    <section className="relative overflow-hidden border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] via-[#03153b] to-[#041638] py-14 md:py-20">
      {/* Dynamic 3D drifting peptide chain animation */}
      <HeroHelix />

      {/* Ambient glowing radial lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Authoritative Academic Encyclopedia Positioning with Backdrop Protection */}
          <div className="bg-[#020e24]/90 backdrop-blur-md p-7 sm:p-9 rounded-3xl border border-[rgba(141,168,195,0.3)] shadow-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300 shadow-sm">
              <Database className="w-3.5 h-3.5 text-sky-300" />
              <span>ACADEMIC CHEMICAL REGISTRY & CITATION DIRECTORY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
              {hero.titleLine1}
              <br />
              <span className="text-sky-300">{hero.titleLine2}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed border-l-2 border-sky-400 pl-4 bg-sky-950/20 py-1 rounded-r-xl">
              {hero.quote}
            </p>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {hero.lede}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={hero.cta.href}
                className="gradient-bg px-8 py-3.5 rounded-full font-bold text-sm text-slate-950 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {hero.cta.label}
              </Link>

              <Link
                href={hero.secondary.href}
                className="px-6 py-3.5 rounded-full font-mono text-xs font-bold text-sky-200 bg-[#0a2347] hover:bg-sky-400 hover:text-slate-950 border-2 border-sky-400 transition-all shadow-md"
              >
                {hero.secondary.label}
              </Link>
            </div>

            {/* Quick Peptide Jump Pills */}
            <div className="space-y-2.5 pt-2 border-t border-[rgba(141,168,195,0.2)]">
              <span className="text-xs font-mono uppercase text-slate-200 tracking-wider font-bold block">
                Quick Compound Lookup:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_PEPTIDES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/peptides/${p.slug}/`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#041535] hover:bg-[#0d2c60] border border-sky-400/35 hover:border-sky-300 text-xs font-mono text-slate-200 hover:text-white transition-all shadow-sm"
                  >
                    <span className="font-bold text-sky-300">{p.name}</span>
                    <span className="text-[11px] text-slate-300 font-semibold">CAS {p.cas}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Scientific Sources Card */}
          <div className="rounded-3xl border border-[rgba(141,168,195,0.35)] bg-[#071b3e] p-7 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.22)]">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-sky-300">
                  {card.eyebrow}
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                  {card.title}
                </h2>
              </div>

              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300 bg-sky-950/70 px-3 py-1 rounded-full border border-sky-400/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                NIH Indexed
              </span>
            </div>

            <p className="font-mono text-xs text-slate-200 leading-relaxed">
              {card.caption}
            </p>

            {/* Verified Sources List */}
            <div className="space-y-3">
              {card.sources.map((s) => (
                <div
                  key={s.name}
                  className="p-3.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] flex items-start gap-3 hover:border-sky-400/40 transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 shrink-0 mt-0.5 border border-sky-500/30">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {s.name}
                    </span>
                    <span className="text-xs text-slate-200">
                      {s.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Numerical Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(141,168,195,0.22)] text-center">
              {card.stats.map((s) => (
                <div key={s.label}>
                  <span className="block font-mono font-extrabold text-2xl sm:text-3xl text-white">
                    {s.value}
                  </span>
                  <span className="text-xs font-mono text-slate-200 font-semibold block mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                href="/#peptides-catalog"
                className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
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
