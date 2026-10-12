import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { ShieldAlert, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Research Use Disclaimer',
  description:
    'Terms of service and academic warranty disclaimer for Peptides-UK.org. Strictly in vitro scientific research only.',
  alternates: {
    canonical: `${SITE_METADATA.url}/terms/`,
  },
  openGraph: {
    title: 'Terms of Service & Research Use Disclaimer | Peptides UK',
    description:
      'Terms of service and academic warranty disclaimer for Peptides-UK.org. Strictly in vitro scientific research only.',
    url: `${SITE_METADATA.url}/terms/`,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: `${SITE_METADATA.url}/icon-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Peptides UK Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service & Research Use Disclaimer | Peptides UK',
    description:
      'Terms of service and academic warranty disclaimer for Peptides-UK.org. Strictly in vitro scientific research only.',
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
  },
};

export default function TermsPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Terms of Service</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service &amp; Legal Warranty
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Please review these terms carefully before accessing the Peptides-UK.org research repository.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">1. Strict In Vitro Research Purpose</h2>
          <p>
            All information, molecular data, chemical formulas, and vendor links published on Peptides-UK.org are intended
            solely for scientific, educational, and pre-clinical laboratory evaluation. None of the listed substances are
            intended for human diagnostic or therapeutic use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">2. No Medical Advice</h2>
          <p>
            Peptides-UK.org is not a medical practice, pharmacy, or licensed drug distributor. Content on this site does not
            constitute medical advice, treatment recommendations, or therapeutic prescriptions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">3. Independent Distributor Links</h2>
          <p>
            Commercial links to external chemical suppliers are provided for reference only. Peptides-UK.org does not
            manufacture or fulfill chemical reagents directly.
          </p>
        </section>
      </div>
    </div>
  );
}
