import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  RESEARCH_CATEGORIES,
  getCategoryBySlug,
  getCompoundsByCategory,
} from '../../../data';
import { FORMAT_PROFILES } from '../../../data/formats';
import { ChevronRight, ArrowRight, Dna, Atom, Layers, Beaker } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESEARCH_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Trustly Pharma',
    };
  }

  return {
    title: `${category.name} Peptides — Research Index & Chemical Specifications`,
    description: `${category.headline}. Preclinical data, molecular mechanisms, formulas, and certified suppliers for ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryHubPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const compounds = getCompoundsByCategory(slug);

  return (
    <div className="relative pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-white/5 bg-obsidian-950/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500">Pathways</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero */}
      <section className="py-14 sm:py-16 border-b border-white/10 bg-gradient-to-b from-obsidian-900 to-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Atom className="w-3.5 h-3.5" />
            <span>Biological Signaling Axis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {category.description}
          </p>

          <div className="p-4 rounded-2xl bg-obsidian-850/80 border border-white/5 max-w-3xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Core Receptor & Secondary Messenger Focus:
            </span>
            <p className="text-xs font-mono text-cyan-300">
              {category.signalingFocus}
            </p>
          </div>
        </div>
      </section>

      {/* Compounds Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Cataloged Compounds in {category.name}
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {compounds.length} Indexed Compounds
          </span>
        </div>

        {compounds.length === 0 ? (
          <div className="p-8 rounded-2xl bg-obsidian-900/40 border border-white/5 text-center text-slate-400">
            Compounds in this category are undergoing analytical sequence verification.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compounds.map((compound) => (
              <div
                key={compound.slug}
                className="glass-panel rounded-3xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      CAS: {compound.casNumber}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
                      MW: {compound.molecularWeight.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/peptides/${compound.slug}`}
                      className="text-xl font-bold text-white hover:text-cyan-400 transition-colors block"
                    >
                      {compound.name}
                    </Link>
                    <span className="text-xs text-slate-400 font-mono line-clamp-1 mt-0.5">
                      {compound.systematicName}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-obsidian-950/80 border border-white/5 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Formula:</span>
                    <span className="text-cyan-300 font-bold">{compound.molecularFormula}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {compound.shortOverview}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {compound.availableFormats.map((fmt) => (
                      <span
                        key={fmt}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300"
                      >
                        {FORMAT_PROFILES[fmt].label.split(' ')[0]}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/peptides/${compound.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/5 hover:bg-cyan-500 hover:text-obsidian-950 transition-all border border-white/10"
                  >
                    <span>Inspect Profile & Suppliers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
