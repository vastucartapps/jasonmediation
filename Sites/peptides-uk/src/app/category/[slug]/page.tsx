import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCategories, getCategoryBySlug } from '@/data/categories';
import { getCompoundsByCategory } from '@/data/compounds';
import { ReagentCard } from '@/components/ReagentCard';
import { SITE_METADATA } from '@/data/site';
import { Layers, ChevronRight, Activity, FlaskConical, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | UK Pre-Clinical Signaling Pathways`,
    description: `${category.headline}: ${category.description}`,
    alternates: {
      canonical: `${SITE_METADATA.url}/category/${category.slug}/`,
    },
    openGraph: {
      title: `${category.name} Signaling Hub`,
      description: category.description,
      url: `${SITE_METADATA.url}/category/${category.slug}/`,
      images: [`${SITE_METADATA.url}/icon-512x512.png`],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const compounds = getCompoundsByCategory(category.slug);

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/#categories" className="hover:text-emerald-700">
          Signaling Pathways
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">{category.name}</span>
      </nav>

      {/* Category Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
          <Layers className="w-3.5 h-3.5" />
          <span>Biological Pathway Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {category.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-semibold max-w-3xl">
          {category.headline}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          {category.description}
        </p>
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-500">
            <span className="font-bold text-slate-700">Signaling Focus: </span>
            <span>{category.signalingFocus}</span>
          </div>
          <div className="text-slate-500">
            {compounds.length} Compound Monograph{compounds.length === 1 ? '' : 's'} Indexed
          </div>
        </div>
      </div>

      {/* Compounds in this Category */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Reagents in this Signaling Category
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compounds.map((compound) => (
            <ReagentCard key={compound.slug} compound={compound} />
          ))}
        </div>
      </section>

      {/* Cross-linking to Other Categories */}
      <div className="pt-8 border-t border-slate-200">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">
          Explore Other Pre-Clinical Pathways
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {getAllCategories()
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{c.headline}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
