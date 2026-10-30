'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { HeroSpectrum } from '@/components/HeroSpectrum';
import { AminoGlanceBar } from '@/components/AminoGlanceBar';
import { AminoReagentCard } from '@/components/AminoReagentCard';
import { VendorMatrix } from '@/components/VendorMatrix';
import { AminoCalculator } from '@/components/AminoCalculator';
import { AminoFaqAccordion, FAQS } from '@/components/AminoFaqAccordion';
import { getAllCompounds } from '@/data/compounds';
import { getAllCategories } from '@/data/categories';
import {
  Search,
  FlaskConical,
  Filter,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Layers,
  ChevronRight,
  CheckCircle2,
  Scale,
  Dna,
} from 'lucide-react';

export default function HomePage() {
  const allCompounds = useMemo(() => getAllCompounds(), []);
  const allCategories = useMemo(() => getAllCategories(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCompounds = useMemo(() => {
    return allCompounds.filter((compound) => {
      const matchesCategory =
        selectedCategory === 'all' || compound.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        compound.name.toLowerCase().includes(q) ||
        compound.systematicName.toLowerCase().includes(q) ||
        compound.casNumber.toLowerCase().includes(q) ||
        compound.shortOverview.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allCompounds, searchQuery, selectedCategory]);

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://aminoacidsupplements.co/#website',
        url: 'https://aminoacidsupplements.co/',
        name: 'AminoAcidSupplements',
        description:
          'British & global chemical monograph registry indexing analytical amino acid sequences, synthetic research peptides, and verified laboratory supplier audits.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://aminoacidsupplements.co/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://aminoacidsupplements.co/#webpage',
        url: 'https://aminoacidsupplements.co/',
        name: 'AminoAcidSupplements | Biochemical Monograph Registry',
        description:
          'British & global chemical monograph registry indexing analytical amino acid sequences, synthetic research peptides, and verified laboratory supplier audits.',
        isPartOf: {
          '@id': 'https://aminoacidsupplements.co/#website',
        },
        breadcrumb: {
          '@id': 'https://aminoacidsupplements.co/#breadcrumb',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://aminoacidsupplements.co/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aminoacidsupplements.co/',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://aminoacidsupplements.co/#catalog',
        url: 'https://aminoacidsupplements.co/#catalog',
        name: 'Chemical Reagent Catalog & Monograph Index',
        description: `Comprehensive directory of ${allCompounds.length} analytical research peptides and amino acid sequences.`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: allCompounds.length,
          itemListElement: allCompounds.map((compound, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: compound.name,
            url: `https://aminoacidsupplements.co/peptides/${compound.slug}/`,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://aminoacidsupplements.co/#faq',
        name: 'United Kingdom Statutory Chemical Research & Quality Control FAQs',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <div className="space-y-16 lg:space-y-24">
        {/* 1. Hero Spectrum */}
        <HeroSpectrum />

        {/* 2. Glance Metrics Bar */}
        <AminoGlanceBar />

        {/* 3. Reagent Catalog Section (Ultra-Wide Row) */}
        <section id="catalog" className="container-ultra-wide scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/90 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 mb-2.5">
                <FlaskConical className="w-4 h-4 text-indigo-700" />
                <span>Analytical Chemical Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
                Indexed Chemical Monographs ({allCompounds.length} Reagents)
              </h2>
              <p className="text-sm text-zinc-700 max-w-2xl mt-1 leading-relaxed">
                Filter by CAS number, amino acid sequence, or primary signaling pathway. All monographs benchmarked against reverse-phase HPLC and ESI-MS purity assays.
              </p>
            </div>

            {/* Live Search Input Bar */}
            <div className="w-full md:w-80 relative">
              <label htmlFor="catalog-search-input" className="sr-only">
                Search chemical catalog by compound name, CAS number, or sequence
              </label>
              <input
                id="catalog-search-input"
                type="text"
                placeholder="Search CAS, name, or formula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-700/20 focus:border-indigo-700 shadow-xs transition-all"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Signaling Pathway Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-zinc-600 flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-indigo-700" />
              <span>Filter Pathway:</span>
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              All Pathways ({allCompounds.length})
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Cards Grid (3 Columns on Large Screens) */}
          {filteredCompounds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompounds.map((compound) => (
                <AminoReagentCard key={compound.slug} compound={compound} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <FlaskConical className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-sm font-bold text-zinc-900">
                No chemical monographs matched &quot;{searchQuery}&quot;
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="btn-amino-secondary text-xs py-1.5 px-4"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* 4. Signaling Pathways Hubs */}
        <section id="categories" className="container-ultra-wide space-y-8">
          <div className="border-b border-zinc-200/90 pb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/80 mb-2.5">
              <Layers className="w-4 h-4 text-orange-700" />
              <span>Biochemical Classification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Signaling Pathways &amp; Cellular Axes
            </h2>
            <p className="text-sm text-zinc-700 max-w-2xl mt-1 leading-relaxed">
              Explore compounds organized by biological receptor mechanisms, intracellular secondary messengers, and organ-specific target systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}/`}
                className="amino-card p-6 bg-white border border-zinc-200/90 rounded-2xl hover:border-indigo-400 hover:shadow-am-elevated group flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Signaling Axis
                    </span>
                    <span className="text-xs font-mono text-zinc-600 font-semibold">
                      {cat.featuredCompoundSlugs.length} Compounds
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 group-hover:text-indigo-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-700 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
                  <span>Explore Pathway</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Verified Laboratory Supplier Standards Banner */}
        <section className="container-ultra-wide">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-zinc-950 to-purple-950 text-white p-8 sm:p-10 border border-indigo-900/40 shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 text-xs font-mono font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span>Audited Laboratory Corridors</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Independent Laboratory Supplier Verification
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  We audit dispatch corridors, HPLC certificate-of-analysis (CoA) authenticity, nitrogen-purged borosilicate packaging, and cold-chain stability across 5 certified chemical vendors serving UK and international institutions.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> ISO 17025 Third-Party Tested</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> &ge;98.0% HPLC Baseline</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> UK Tracked Dispatch</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/vendors/"
                  className="btn-amino-copper text-xs sm:text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>View All 5 Supplier Dossiers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/verification/"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5 text-indigo-400" />
                  <span>HPLC &amp; ESI-MS Testing Protocols</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Dilution & Reconstitution Calculator */}
        <section className="container-ultra-wide">
          <AminoCalculator />
        </section>

        {/* 7. Research Blog / Technical Monographs Teaser */}
        <section className="container-ultra-wide space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/90 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 mb-2.5">
                <BookOpen className="w-4 h-4 text-indigo-700" />
                <span>Laboratory Monographs &amp; Research SOPs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                Technical Articles &amp; Laboratory Guides
              </h2>
              <p className="text-sm text-zinc-700 max-w-2xl mt-1 leading-relaxed">
                Empirical research papers, reconstitution standards, and analytical stability studies published by our academic editorial desk.
              </p>
            </div>
            <Link
              href="/blog/"
              className="btn-amino-secondary text-xs py-2 px-4 rounded-xl flex items-center gap-1.5"
            >
              <span>View All Research Articles</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-700" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Article 1 Card */}
            <Link
              href="/blog/bpc-157-stability-protocols/"
              className="amino-card p-6 bg-white border border-zinc-200/90 rounded-2xl hover:border-indigo-400 hover:shadow-am-elevated group transition-all space-y-4"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-200">
                <img
                  src="/images/posts/bpc-157-stability-protocols.webp"
                  alt="BPC-157 Stability Analysis"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={338}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                  <span className="text-indigo-800 font-bold">Stability &amp; Reconstitution</span>
                  <span>&bull;</span>
                  <span>7 min read</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-950 group-hover:text-indigo-800 transition-colors">
                  BPC-157 Lyophilized Stability Protocols in UK Laboratories
                </h3>
                <p className="text-xs text-zinc-700 line-clamp-2 leading-relaxed">
                  Detailed analytical protocol for BPC-157 lyophilized powder storage, bacteriostatic reconstitution, and HPLC purity degradation curves.
                </p>
              </div>
            </Link>

            {/* Article 2 Card */}
            <Link
              href="/blog/tb-500-reconstitution-guidelines/"
              className="amino-card p-6 bg-white border border-zinc-200/90 rounded-2xl hover:border-indigo-400 hover:shadow-am-elevated group transition-all space-y-4"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-200">
                <img
                  src="/images/posts/tb-500-reconstitution-guidelines.webp"
                  alt="TB-500 Laboratory Standards"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={338}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                  <span className="text-orange-800 font-bold">Stability &amp; Reconstitution</span>
                  <span>&bull;</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-950 group-hover:text-indigo-800 transition-colors">
                  TB-500 Reconstitution &amp; Dilution Protocols for Assays
                </h3>
                <p className="text-xs text-zinc-700 line-clamp-2 leading-relaxed">
                  Laboratory standards for reconstituting synthetic TB-500 hexapeptide with bacteriostatic water, measuring actin-binding affinity, and cold-chain stability.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* 8. Biochemical & Legal FAQ Accordion */}
        <section className="container-ultra-wide">
          <AminoFaqAccordion />
        </section>
      </div>
    </>
  );
}
