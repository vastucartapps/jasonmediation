import Link from 'next/link';
import { evidenceLevels } from '../data/site';
import { RESEARCH_CATEGORIES } from '../data/categories';
import {
  Activity,
  Sparkles,
  Zap,
  Gauge,
  Layers,
  Dna,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const CATEGORY_THEMES: Record<
  string,
  {
    icon: typeof Activity;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    hoverBorder: string;
    glowBg: string;
  }
> = {
  'tissue-repair-recovery': {
    icon: Activity,
    accentColor: '#3fe0b0',
    badgeBg: 'bg-emerald-950/60',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-400',
    glowBg: 'from-emerald-500/10 to-transparent',
  },
  'neuropeptides-cognition': {
    icon: Sparkles,
    accentColor: '#818cf8',
    badgeBg: 'bg-indigo-950/60',
    badgeText: 'text-indigo-300',
    badgeBorder: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-400',
    glowBg: 'from-indigo-500/10 to-transparent',
  },
  'growth-hormone-secretagogues': {
    icon: Zap,
    accentColor: '#f6c058',
    badgeBg: 'bg-amber-950/60',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-400',
    glowBg: 'from-amber-500/10 to-transparent',
  },
  'metabolic-regulation': {
    icon: Gauge,
    accentColor: '#f0655c',
    badgeBg: 'bg-rose-950/60',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-400',
    glowBg: 'from-rose-500/10 to-transparent',
  },
  'dermal-extracellular-matrix': {
    icon: Layers,
    accentColor: '#38bdf8',
    badgeBg: 'bg-sky-950/60',
    badgeText: 'text-sky-300',
    badgeBorder: 'border-sky-500/30',
    hoverBorder: 'hover:border-sky-400',
    glowBg: 'from-sky-500/10 to-transparent',
  },
  'cellular-longevity-mitochondrial': {
    icon: Dna,
    accentColor: '#c084fc',
    badgeBg: 'bg-purple-950/60',
    badgeText: 'text-purple-300',
    badgeBorder: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-400',
    glowBg: 'from-purple-500/10 to-transparent',
  },
};

export function EvidenceMap() {
  return (
    <section id="evidence-map" className="border-b border-[rgba(141,168,195,0.22)] bg-[#041638] py-16 md:py-24 scroll-mt-20">
      <div className="container-wide space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BIOCHEMICAL SIGNALING DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Biological Signaling & Evidence Map
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
            Every peptide in our encyclopedia is clustered by cellular mechanism and positioned by scientific proof tier — from in vitro assays to peer-reviewed clinical studies.
          </p>
        </div>

        {/* Legend Pips */}
        <div className="flex flex-wrap items-center gap-6 p-5 rounded-2xl bg-[#071d42] border border-[rgba(141,168,195,0.25)] shadow-lg">
          <span className="text-xs font-mono text-slate-200 font-bold uppercase tracking-wider">
            Evidence Tiers:
          </span>
          {Object.values(evidenceLevels).map((lvl) => (
            <div key={lvl.label} className="flex items-center gap-2.5 font-mono text-xs font-bold text-white">
              <span className="flex items-center gap-1">
                {[1, 2, 3].map((pip) => (
                  <span
                    key={pip}
                    className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
                    style={{
                      background: pip <= lvl.pips ? lvl.color : 'rgba(141,168,195,0.25)',
                    }}
                  />
                ))}
              </span>
              <span style={{ color: lvl.color }} className="font-extrabold">{lvl.label}</span>
            </div>
          ))}
        </div>

        {/* Categories Clusters - Differentiated Color & Theme */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_CATEGORIES.map((cat) => {
            const theme = CATEGORY_THEMES[cat.slug] || CATEGORY_THEMES['tissue-repair-recovery'];
            const Icon = theme.icon;

            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}/`}
                className={`rounded-3xl p-7 bg-gradient-to-br from-[#071d42] to-[#04122d] border border-[rgba(141,168,195,0.25)] ${theme.hoverBorder} transition-all duration-200 group flex flex-col justify-between space-y-5 shadow-xl hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${theme.badgeBg} ${theme.badgeText} px-3 py-1 rounded-full border ${theme.badgeBorder} inline-flex items-center gap-1.5`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.featuredCompoundSlugs.length} Compounds Mapped</span>
                    </span>

                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: theme.accentColor }}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-300 mt-1 line-clamp-1">
                      {cat.headline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(141,168,195,0.2)] flex items-center justify-between text-xs font-mono font-bold text-slate-300 group-hover:text-white transition-colors">
                  <span>Explore Signaling Pathways</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" style={{ color: theme.accentColor }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
