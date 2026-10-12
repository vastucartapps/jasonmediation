import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllDiscoveryRoutes, BASE_URL } from '../../lib/discovery';
import {
  FileText,
  ChevronRight,
  FlaskConical,
  Store,
  ShieldCheck,
  Scale,
  Calculator,
  Compass,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Index & Directory Sitemap | Trustly Pharma',
  description:
    'Comprehensive directory sitemap dynamically indexing all chemical compound dossiers, research pathways, verified vendor directories, and regulatory intelligence trackers.',
  alternates: {
    canonical: `${BASE_URL}/sitemap/`,
  },
};

export default function SitemapPage() {
  const routes = getAllDiscoveryRoutes();
  const pageUrl = `${BASE_URL}/sitemap/`;

  const coreRoutes = routes.filter((r) => r.section === 'Core Platform');
  const compoundRoutes = routes.filter((r) => r.section === 'Peptide Compounds');
  const pathwayRoutes = routes.filter((r) => r.section === 'Research Pathways');
  const vendorRoutes = routes.filter((r) => r.section === 'Commercial Vendors');
  const regulatoryRoutes = routes.filter((r) => r.section === 'Regulatory Hub');
  const governanceRoutes = routes.filter((r) => r.section === 'Governance & Legal');

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
            item: `${BASE_URL}/`,
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
          'Complete directory sitemap dynamically indexing all chemical compound dossiers, research pathways, verified vendor directories, and regulatory intelligence trackers.',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: routes.length,
          itemListElement: routes.map((r, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: r.loc,
            name: r.title,
          })),
        },
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
            <span>DYNAMIC DISCOVERY INDEX · {routes.length} CANONICAL ROUTES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            HTML Index &amp; Complete Sitemap
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Direct navigation index cataloging 100% of indexable chemical compound profiles, biological signaling pathways, commercial vendor dossiers, and UK statutory compliance trackers. Auto-populated in real-time from the central scientific registry.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-300">
            <a
              href="/sitemap.xml"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071c3f] border border-sky-500/40 text-sky-300 hover:text-white hover:border-sky-400 transition-colors"
            >
              <span>Unified XML Sitemap</span>
              <span className="text-slate-400">({routes.length} URLs)</span>
            </a>
            <a
              href="/llms.txt"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071c3f] border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white transition-colors"
            >
              <span>llms.txt</span>
            </a>
            <a
              href="/llms-full.txt"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071c3f] border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white transition-colors"
            >
              <span>llms-full.txt</span>
            </a>
            <a
              href="/robots.txt"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071c3f] border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white transition-colors"
            >
              <span>robots.txt</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Sitemap Grid */}
      <main className="container-wide py-12 md:py-16 space-y-12">
        {/* 1. Core Platform & Analytical Tools */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Core Platform &amp; Analytical Tools
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-[#071c3f] px-2.5 py-1 rounded-md border border-[rgba(141,168,195,0.2)]">
              {coreRoutes.length} pages
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coreRoutes.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
              >
                <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                  {r.title} →
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {r.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Priority: {r.priority}</span>
                  <span className="text-sky-400 capitalize">{r.changefreq}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Research Peptides Directory */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Chemical Compound Reference Dossiers
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
              {compoundRoutes.length} compounds auto-indexed
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {compoundRoutes.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="p-4 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base truncate">
                    {r.title.replace(' Chemical Reference Dossier', '')}
                  </h3>
                  {r.meta?.casNumber && (
                    <span className="text-[10px] font-mono text-slate-400 bg-[#02102b] px-2 py-0.5 rounded border border-[rgba(141,168,195,0.18)] shrink-0 ml-2">
                      {r.meta.casNumber}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                  {r.description}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-sky-400">
                  <span>{r.meta?.citationCount || 0} studies indexed</span>
                  <span className="text-slate-400">View Dossier →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Research Pathways & Categories */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Research Pathways &amp; Signaling Axes
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-[#071c3f] px-2.5 py-1 rounded-md border border-[rgba(141,168,195,0.2)]">
              {pathwayRoutes.length} pathways
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pathwayRoutes.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-emerald-400/60 transition-all block group"
              >
                <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors text-base">
                  {r.title.replace(' Pathway Index', '')} →
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {r.description}
                </p>
                <div className="mt-3 text-[11px] font-mono text-emerald-400">
                  Explore Signaling Pathway →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Verified Commercial Vendors */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Verified Commercial Partners &amp; Vendors
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-[#071c3f] px-2.5 py-1 rounded-md border border-[rgba(141,168,195,0.2)]">
              {vendorRoutes.length} suppliers
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {vendorRoutes.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-amber-400/60 transition-all block group text-center"
              >
                <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors text-base">
                  {r.title.replace(' Commercial Supplier Dossier', '')}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {r.meta?.domain || 'Verified Vendor'}
                </p>
                <span className="inline-block mt-3 text-xs text-amber-400 font-mono">
                  View Dossier →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Regulatory Intelligence Hub */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Regulatory Intelligence &amp; Compliance Hub
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-[#071c3f] px-2.5 py-1 rounded-md border border-[rgba(141,168,195,0.2)]">
              {regulatoryRoutes.length} trackers
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {regulatoryRoutes.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-purple-400/60 transition-all block group"
              >
                <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors text-base">
                  {r.title} →
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {r.description}
                </p>
                <div className="mt-3 text-[11px] font-mono text-purple-400">
                  View Regulatory Tracker →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. Institutional Governance & Policies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Institutional Governance &amp; Legal Policies
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-[#071c3f] px-2.5 py-1 rounded-md border border-[rgba(141,168,195,0.2)]">
              {governanceRoutes.length} policies
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {governanceRoutes.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="p-5 rounded-2xl bg-[#071c3f] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 transition-all block group"
              >
                <h3 className="font-bold text-white group-hover:text-sky-300 transition-colors text-base">
                  {r.title} →
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {r.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
