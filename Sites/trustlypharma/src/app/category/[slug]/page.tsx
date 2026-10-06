import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  RESEARCH_CATEGORIES,
  getCategoryBySlug,
  getCompoundsByCategory,
} from '../../../data';
import { FORMAT_PROFILES } from '../../../data/formats';
import { ChevronRight, ArrowRight, Atom } from 'lucide-react';

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
    description: `${category.headline}. Preclinical data, molecular mechanisms, formulas, and laboratory supplier links for ${category.name.toLowerCase()}.`,
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
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-sky-400 transition-colors">
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
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Atom className="w-3.5 h-3.5" />
            <span>Biological Signaling Axis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {category.description}
          </p>

          <div className="p-4 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.2)] max-w-3xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              Core Receptor & Secondary Messenger Focus:
            </span>
            <p className="text-xs font-mono text-sky-300">
              {category.signalingFocus}
            </p>
          </div>
        </div>
      </section>

      {/* Compounds Grid */}
      <div className="container-wide mt-12 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(141,168,195,0.18)]">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Cataloged Compounds in {category.name}
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {compounds.length} Indexed Compounds
          </span>
        </div>

        {compounds.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.18)] text-center text-slate-400">
            Compounds in this category are undergoing analytical sequence verification.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compounds.map((compound) => (
              <div
                key={compound.slug}
                className="rounded-3xl p-6 card-paper border border-[rgba(141,168,195,0.2)] hover:border-sky-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      CAS: {compound.casNumber}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#02102b] text-sky-400 border border-[rgba(141,168,195,0.15)]">
                      MW: {compound.molecularWeight.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/peptides/${compound.slug}/`}
                      className="text-xl font-bold text-white hover:text-sky-300 transition-colors block"
                    >
                      {compound.name}
                    </Link>
                    <span className="text-xs text-slate-400 font-mono line-clamp-1 mt-0.5">
                      {compound.systematicName}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.12)] font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Formula:</span>
                    <span className="text-emerald-400 font-bold">{compound.molecularFormula}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {compound.shortOverview}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[rgba(141,168,195,0.18)]">
                  <div className="flex flex-wrap gap-1">
                    {compound.availableFormats.map((fmt) => (
                      <span
                        key={fmt}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#02102b] text-slate-300 border border-[rgba(141,168,195,0.1)]"
                      >
                        {FORMAT_PROFILES[fmt].label.split(' ')[0]}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/peptides/${compound.slug}/`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-[#103059] hover:text-white hover:bg-[#123a6b] transition-all border border-[rgba(141,168,195,0.25)]"
                  >
                    <span>Inspect Profile & Sourcing</span>
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
