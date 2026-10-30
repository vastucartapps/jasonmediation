import React from 'react';
import Link from 'next/link';
import { getAllCategories } from '@/data/categories';
import {
  Activity,
  Sparkles,
  Zap,
  Gauge,
  Layers,
  Dna,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
    compounds: string[];
    receptors: string;
  }
> = {
  'tissue-repair-recovery': {
    icon: Activity,
    accentColor: '#059669',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-500',
    compounds: ['BPC-157', 'TB-500'],
    receptors: 'VEGF-R2, FAK-Paxillin, Actin Sequestration',
  },
  'neuropeptides-cognition': {
    icon: Sparkles,
    accentColor: '#6366f1',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-800',
    badgeBorder: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-500',
    compounds: ['Semax', 'Selank'],
    receptors: 'TrkB, BDNF mRNA, GABA-A Modulation',
  },
  'growth-hormone-secretagogues': {
    icon: Zap,
    accentColor: '#d97706',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    badgeBorder: 'border-amber-200',
    hoverBorder: 'hover:border-amber-500',
    compounds: ['Ipamorelin', 'CJC-1295', 'Sermorelin'],
    receptors: 'GHS-R1a (Ghrelin), GHRH-R, IGF-1 Axis',
  },
  'metabolic-regulation': {
    icon: Gauge,
    accentColor: '#e11d48',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-800',
    badgeBorder: 'border-rose-200',
    hoverBorder: 'hover:border-rose-500',
    compounds: ['Semaglutide', 'Tirzepatide', 'Retatrutide'],
    receptors: 'GLP-1R, GIPR, GCGR (Tri-Agonist)',
  },
  'dermal-extracellular-matrix': {
    icon: Layers,
    accentColor: '#0284c7',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-800',
    badgeBorder: 'border-sky-200',
    hoverBorder: 'hover:border-sky-500',
    compounds: ['GHK-Cu'],
    receptors: 'Copper (II) Chelation, Collagen Type I/III, MMPs',
  },
  'cellular-longevity-mitochondrial': {
    icon: Dna,
    accentColor: '#9333ea',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-800',
    badgeBorder: 'border-purple-200',
    hoverBorder: 'hover:border-purple-500',
    compounds: ['Epithalon'],
    receptors: 'Telomerase Reverse Transcriptase (TERT)',
  },
};

const EVIDENCE_TIERS = [
  { level: 'Tier 1', pips: 1, label: 'In Vitro Assays', desc: 'Cell culture, binding kinetics, enzymatic models', color: '#059669' },
  { level: 'Tier 2', pips: 2, label: 'In Vivo Pre-Clinical', desc: 'Rodent and mammalian pharmacodynamics', color: '#2563eb' },
  { level: 'Tier 3', pips: 3, label: 'Clinical Trial / Approved', desc: 'Human Phase I-III trial or licensed MA formulation', color: '#7c3aed' },
];

export function EvidenceSignalingMap() {
  const categories = getAllCategories();

  return (
    <section id="evidence-map" className="container-wide space-y-10 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold text-blue-800">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>BIOCHEMICAL SIGNALING CLUSTERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Biological Signaling &amp; Evidence Map
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Every peptide in our encyclopedia is clustered by receptor binding mechanism and categorized across empirical scientific proof tiers.
          </p>
        </div>

        <Link
          href="/#catalog"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 hover:text-blue-800 hover:underline shrink-0"
        >
          <span>Jump to All 12 Compounds</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Evidence Tier Legend Bar */}
      <div className="flex flex-wrap items-center gap-6 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <span className="text-xs font-mono text-slate-800 font-bold uppercase tracking-wider">
          Evidence Tiers:
        </span>
        {EVIDENCE_TIERS.map((tier) => (
          <div key={tier.level} className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-800">
            <span className="flex items-center gap-0.5">
              {[1, 2, 3].map((pip) => (
                <span
                  key={pip}
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{
                    backgroundColor: pip <= tier.pips ? tier.color : '#cbd5e1',
                  }}
                />
              ))}
            </span>
            <span className="font-bold text-slate-900">{tier.label}</span>
            <span className="text-slate-600 hidden sm:inline font-medium">({tier.desc})</span>
          </div>
        ))}
      </div>

      {/* 6 Category Pathway Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const theme = CATEGORY_THEMES[cat.slug] || CATEGORY_THEMES['tissue-repair-recovery'];
          const Icon = theme.icon;

          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className={`clinical-card p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xs ${theme.hoverBorder} hover:shadow-md transition-all flex flex-col justify-between space-y-6 group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className={`text-[10px] font-mono font-bold ${theme.badgeBg} ${theme.badgeText} px-2.5 py-1 rounded border ${theme.badgeBorder} inline-flex items-center gap-1.5`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.featuredCompoundSlugs.length} Monograph{cat.featuredCompoundSlugs.length > 1 ? 's' : ''}</span>
                  </span>

                  <span
                    className="w-3 h-3 rounded-full shadow-2xs"
                    style={{ backgroundColor: theme.accentColor }}
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700">
                    {cat.headline}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                    {cat.description}
                  </p>
                </div>

                {/* Key Reagents & Receptors */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-semibold">Reagents:</span>
                    <span className="font-bold text-slate-900">{theme.compounds.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-semibold">Receptors:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[170px]">{theme.receptors}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-800 group-hover:text-blue-800 transition-colors">
                <span>Explore Signaling Pathway</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: theme.accentColor }} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
