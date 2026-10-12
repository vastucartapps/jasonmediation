'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ClinicalHero } from '@/components/ClinicalHero';
import { RegistryArchitecture } from '@/components/RegistryArchitecture';
import { ClinicalGlanceBar } from '@/components/ClinicalGlanceBar';
import { UkRegulatoryFeed } from '@/components/UkRegulatoryFeed';
import { EvidenceSignalingMap } from '@/components/EvidenceSignalingMap';
import { ReagentCard } from '@/components/ReagentCard';
import { UkVendorMatrix } from '@/components/UkVendorMatrix';
import { ClinicalCalculator } from '@/components/ClinicalCalculator';
import { SmarterLaboratoryBuyer } from '@/components/SmarterLaboratoryBuyer';
import { RegulatoryTrackersHub } from '@/components/RegulatoryTrackersHub';
import { BiochemicalFaqAccordion } from '@/components/BiochemicalFaqAccordion';
import { FreshnessAndGovernance } from '@/components/FreshnessAndGovernance';
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
        '@type': 'WebPage',
        '@id': 'https://peptides-uk.org/#webpage',
        url: 'https://peptides-uk.org/',
        name: 'Peptides UK | British Clinical Chemical Registry & Academic Compendium',
        description:
          'PubChem chemical monographs, RP-HPLC purity standards, statutory MHRA frameworks, and verified UK laboratory supplier directories for non-clinical research.',
        about: [
          {
            '@type': 'DefinedTermSet',
            name: 'UK Synthetic Peptide Chemical Monographs',
            hasDefinedTerm: [
              {
                '@type': 'DefinedTerm',
                name: 'BPC-157 Pentadecapeptide',
                termCode: '137525-51-0',
                description: 'Body Protection Compound 157 for in vitro microvascular and angiogenic signaling assays.',
              },
              {
                '@type': 'DefinedTerm',
                name: 'TB-500 Thymosin Beta-4',
                termCode: '77591-33-4',
                description: 'Thymosin Beta-4 synthetic fragment investigating actin sequestration and cellular motility models.',
              },
              {
                '@type': 'DefinedTerm',
                name: 'Semaglutide Incretin Mimetic',
                termCode: '910463-68-2',
                description: 'GLP-1 receptor agonist investigating metabolic kinase cascades and glycemic signaling.',
              },
              {
                '@type': 'DefinedTerm',
                name: 'RP-HPLC Assay Purity Standard',
                description: 'Reversed-Phase High-Performance Liquid Chromatography analytical purity verification benchmark ≥98.0%.',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-10 md:space-y-14 pb-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* 1. Clinical Hero with Live Assay Dashboard */}
      <ClinicalHero />

      {/* 2. Database Architecture & Methodology */}
      <RegistryArchitecture />

      {/* 3. Clinical Glance Stats Strip */}
      <ClinicalGlanceBar />

      {/* 4. Live 2026 UK Statutory & MHRA Governance Feed */}
      <UkRegulatoryFeed />

      {/* 5. The Biological Signaling & Pre-Clinical Evidence Map */}
      <EvidenceSignalingMap />

      {/* 6. Interactive Compound Catalog Section */}
      <section id="catalog" className="container-wide space-y-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 mb-2">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>Chemical Monographs &amp; PubChem Index</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              UK Research Peptides Directory
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Filter by biological signaling pathway, search by CAS number or systematic chemical formula, and view verified UK sourcing partners.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Showing <strong className="text-slate-900">{filteredCompounds.length}</strong> of{' '}
            <strong>{allCompounds.length}</strong> verified monographs
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by peptide name (e.g. BPC-157), CAS (137525-51-0), or mechanism..."
              aria-label="Search peptide chemical directory by name, CAS, or keyword"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Category Filter Pills (Wrapping, Zero Horizontal Scrollbars) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Compounds ({allCompounds.length})
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Compound Cards Grid */}
        {filteredCompounds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompounds.map((compound) => (
              <ReagentCard key={compound.slug} compound={compound} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <FlaskConical className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Reagents Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No chemical monographs matched your query &ldquo;{searchQuery}&rdquo;. Try clearing your search filter or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 7. Verified UK Suppliers Comparison Matrix */}
      <div className="container-wide">
        <UkVendorMatrix />
      </div>

      {/* 8. Clinical Dilution & Syringe Calculator */}
      <div className="container-wide">
        <ClinicalCalculator />
      </div>

      {/* 9. Smarter Laboratory Buyer - 4 Procurement Standards */}
      <SmarterLaboratoryBuyer />

      {/* 10. Live Research & Regulatory Intelligence Trackers */}
      <RegulatoryTrackersHub />

      {/* 11. Biochemical & Statutory Frequently Asked Questions */}
      <BiochemicalFaqAccordion />

      {/* 12. Freshness Stamp & Scientific Governance */}
      <FreshnessAndGovernance />

      {/* 13. UK Regulatory & Statutory Authority Briefing */}
      <section className="container-wide">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>United Kingdom Medicines &amp; Healthcare products Regulatory Agency (MHRA)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Statutory Classification of Synthetic Peptides in Britain
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In Great Britain and Northern Ireland, synthetic peptides that lack Marketing Authorisation (MA) are regulated as{' '}
              <strong className="text-white">unlicensed chemicals for laboratory research</strong>. Under the{' '}
              <strong className="text-white">Human Medicines Regulations 2012</strong>, advertising, distributing, or selling these substances for human therapeutic use or ingestion without a marketing licence constitutes an offence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
              <div className="font-mono font-bold text-emerald-400">Human Medicines Regs 2012</div>
              <p className="text-slate-400">Strictly prohibits sale for administration to humans without MHRA license.</p>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
              <div className="font-mono font-bold text-blue-400">Misuse of Drugs Act 1971</div>
              <p className="text-slate-400">Research peptides listed here are non-controlled Schedule substances for legitimate labs.</p>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
              <div className="font-mono font-bold text-amber-400">COSHH &amp; Laboratory Safety</div>
              <p className="text-slate-400">Handle under certified laminar flow hoods with standard aseptic PPE protocols.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/regulatory/"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
            >
              UK Regulatory Hub →
            </Link>
            <Link
              href="/regulatory/uk-legal-status/"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700 transition-colors"
            >
              Full Legal Status Matrix
            </Link>
            <Link
              href="/regulatory/mhra-tracker/"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700 transition-colors"
            >
              MHRA Enforcement Tracker
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
