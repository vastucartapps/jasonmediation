import Link from 'next/link';
import type { Metadata } from 'next';
import { PEPTIDE_COMPOUNDS } from '../../data/compounds';
import { RESEARCH_CATEGORIES } from '../../data/categories';
import { getAllVendors } from '../../data/suppliers';
import {
  FileText,
  ChevronRight,
  FlaskConical,
  Store,
  ShieldCheck,
  Scale,
  Calculator,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Index & Directory Sitemap | Trustly Pharma',
  description:
    'Comprehensive directory sitemap indexing all chemical compound dossiers, research pathways, verified vendor directories, and regulatory intelligence trackers.',
  alternates: {
    canonical: 'https://trustlypharma.uk/sitemap/',
  },
};

export default function SitemapPage() {
  const vendors = getAllVendors();
  const pageUrl = 'https://trustlypharma.uk/sitemap/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'HTML Sitemap',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'HTML Index & Complete Sitemap | Trustly Pharma',
        description:
          'Complete directory sitemap indexing all chemical compound dossiers, research pathways, verified vendor directories, and regulatory intelligence trackers.',
      },
    ],
  };

  return (
    <div className="relative pb-24 bg-[#020e24] text-slate-100 min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#02102b] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-semibold">HTML Sitemap</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>EXHAUSTIVE PLATFORM DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            HTML Index & Complete Sitemap
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Direct navigation index cataloging 100% of indexable chemical compound profiles, biological signaling pathways, commercial vendor dossiers, and UK statutory compliance trackers.
          </p>
        </div>
      </section>

      {/* Main Sitemap Grid */}
      <main className="container-wide py-12 md:py-16 space-y-12">
        {/* 1. Core Platform & Analytical Tools */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <Calculator className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Core Platform & Analytical Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Index Home →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Main peptide chemical index,PubChem cross-references, and search.
              </p>
            </Link>

            <Link
              href="/vendors/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Commercial Vendors Directory →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Independent partner directory for verified research suppliers.
              </p>
            </Link>

            <Link
              href="/#calculator"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Dilution & Syringe Calculator →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Precision micro-volume reconstitution and unit calculation engine.
              </p>
            </Link>

            <Link
              href="/#evidence-map"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                The Evidence Map →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Interactive 3-tier preclinical and clinical evidence matrix.
              </p>
            </Link>

            <Link
              href="/formats/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Delivery Formats Standards →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Lyophilized vials, cartridges, atomizers, and solvent diluents.
              </p>
            </Link>

            <Link
              href="/verification/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Analytical Verification Standards →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                HPLC purity assays and ESI mass spectrometry standards.
              </p>
            </Link>
          </div>
        </section>

        {/* 2. Research Pathways & Categories */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Research Pathways & Signaling Axes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {RESEARCH_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}/`}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-emerald-400/60 transition-all block group"
              >
                <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors text-base">
                  {cat.name} →
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Peptides Compound Directory */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <FileText className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Chemical Compound Reference Dossiers (12 Compounds)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PEPTIDE_COMPOUNDS.map((c) => (
              <Link
                key={c.slug}
                href={`/peptides/${c.slug}/`}
                className="p-4 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                    {c.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 bg-[#02102b] px-2 py-0.5 rounded border border-[rgba(141,168,195,0.18)]">
                    {c.casNumber}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                  {c.systematicName}
                </p>
                <div className="mt-2 text-[11px] font-mono text-sky-400">
                  {c.citations.length} PubMed studies indexed →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Verified Commercial Vendors */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <Store className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Verified Commercial Partners & Vendors
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {vendors.map((v) => (
              <Link
                key={v.id}
                href={`/vendors/${v.id}/`}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-amber-400/60 transition-all block group text-center"
              >
                <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors text-base">
                  {v.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {v.domain}
                </p>
                <span className="inline-block mt-3 text-xs text-sky-400 font-mono">
                  View Dossier →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Regulatory Intelligence Hub */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <Scale className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Regulatory Intelligence & Compliance Hub
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/regulatory/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-purple-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors text-base">
                Regulatory Hub Home →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                UK & international legal framework for synthetic chemical research.
              </p>
            </Link>

            <Link
              href="/regulatory/mhra-tracker/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-purple-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors text-base">
                MHRA Enforcement Tracker →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Live compliance timeline, border seizures, and regulatory bulletins.
              </p>
            </Link>

            <Link
              href="/regulatory/uk-legal-status/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-purple-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors text-base">
                UK Legal Status Matrix →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Misuse of Drugs Act 1971, POM schedules, and GLP handling statutes.
              </p>
            </Link>
          </div>
        </section>

        {/* 6. Institutional Governance & Policies */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Institutional Governance & Legal Policies
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/about/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                About & Methodology →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Charter, 5-stage chemical protocol, and evidence tiering.
              </p>
            </Link>

            <Link
              href="/safety/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Research Safety Policy →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                OECD GLP handling, cold-chain thresholds, and PPE.
              </p>
            </Link>

            <Link
              href="/contact/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Contact & Submissions →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Direct academic desk for errata, PMIDs, and collaborations.
              </p>
            </Link>

            <Link
              href="/privacy/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Privacy Policy →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                UK GDPR data handling and analytical privacy notice.
              </p>
            </Link>

            <Link
              href="/terms/"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                Terms of Service →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Academic terms of access and research reagent disclaimer.
              </p>
            </Link>

            <a
              href="/sitemap.xml"
              className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
            >
              <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                XML Sitemap Feed →
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Machine-readable XML index for search engine crawlers.
              </p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
