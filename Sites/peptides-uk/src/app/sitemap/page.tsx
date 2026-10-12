import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCanonicalRoutes, CANONICAL_BASE_URL } from '@/lib/discovery';
import { SITE_METADATA } from '@/data/site';
import {
  FileText,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  Layers,
  ShieldCheck,
  Building2,
  Scale,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Visual HTML Sitemap & Complete Page Index',
  description:
    'Complete index of all canonical routes, chemical monographs, pre-clinical signaling pathways, and UK supplier dossiers on Peptides-UK.org.',
  alternates: {
    canonical: `${SITE_METADATA.url}/sitemap/`,
  },
};

export default function HtmlSitemapPage() {
  const routes = getAllCanonicalRoutes();

  const coreRoutes = routes.filter((r) => r.section === 'core');
  const compoundRoutes = routes.filter((r) => r.section === 'compounds');
  const categoryRoutes = routes.filter((r) => r.section === 'categories');
  const vendorRoutes = routes.filter((r) => r.section === 'vendors');
  const regulatoryRoutes = routes.filter((r) => r.section === 'regulatory');
  const governanceRoutes = routes.filter((r) => r.section === 'governance');

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">HTML Sitemap</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <FileText className="w-3.5 h-3.5" />
          <span>Complete Architectural Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Visual HTML Sitemap
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Index of all {routes.length} canonical URLs on Peptides-UK.org organized by section, alongside
          machine-readable XML and LLM discovery endpoints.
        </p>

        {/* Machine Discovery Strip */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-mono">
          <a
            href="/sitemap.xml"
            className="text-emerald-600 hover:text-emerald-700 font-bold underline inline-flex items-center gap-1"
          >
            <span>Single Unified sitemap.xml</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">|</span>
          <a
            href="/robots.txt"
            className="text-slate-600 hover:text-slate-900 underline inline-flex items-center gap-1"
          >
            <span>robots.txt</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">|</span>
          <a
            href="/llms.txt"
            className="text-emerald-600 hover:text-emerald-700 font-bold underline inline-flex items-center gap-1"
          >
            <span>llms.txt (AI Index)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">|</span>
          <a
            href="/llms-full.txt"
            className="text-blue-600 hover:text-blue-700 font-bold underline inline-flex items-center gap-1"
          >
            <span>llms-full.txt (Technical Compendium)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1. Core Platform */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Core Platform ({coreRoutes.length})</span>
          </div>
          <ul className="space-y-2 text-xs">
            {coreRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-slate-800 hover:text-emerald-600 font-medium">
                  {r.title || r.path}
                </Link>
                <div className="text-[10px] font-mono text-slate-400">{r.path}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Compound Monographs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <FlaskConical className="w-4 h-4 text-emerald-600" />
            <span>Compound Monographs ({compoundRoutes.length})</span>
          </div>
          <ul className="space-y-2 text-xs">
            {compoundRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-slate-800 hover:text-emerald-600 font-medium">
                  {r.title || r.path}
                </Link>
                <div className="text-[10px] font-mono text-slate-400">{r.path}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Research Pathways */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Signaling Pathways ({categoryRoutes.length})</span>
          </div>
          <ul className="space-y-2 text-xs">
            {categoryRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-slate-800 hover:text-blue-600 font-medium">
                  {r.title || r.path}
                </Link>
                <div className="text-[10px] font-mono text-slate-400">{r.path}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Verified UK Suppliers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>UK Suppliers &amp; Directory ({vendorRoutes.length})</span>
          </div>
          <ul className="space-y-2 text-xs">
            {vendorRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-slate-800 hover:text-emerald-600 font-medium">
                  {r.title || r.path}
                </Link>
                <div className="text-[10px] font-mono text-slate-400">{r.path}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Statutory Regulatory */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>UK Regulatory Hub ({regulatoryRoutes.length})</span>
          </div>
          <ul className="space-y-2 text-xs">
            {regulatoryRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-slate-800 hover:text-amber-600 font-medium">
                  {r.title || r.path}
                </Link>
                <div className="text-[10px] font-mono text-slate-400">{r.path}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Governance & Compliance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <span>Governance &amp; Legal ({governanceRoutes.length})</span>
          </div>
          <ul className="space-y-2 text-xs">
            {governanceRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-slate-800 hover:text-slate-600 font-medium">
                  {r.title || r.path}
                </Link>
                <div className="text-[10px] font-mono text-slate-400">{r.path}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
