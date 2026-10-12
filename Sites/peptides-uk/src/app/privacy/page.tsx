import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & UK GDPR Compliance',
  description: 'Privacy policy for Peptides-UK.org detailing our compliance with UK GDPR and Data Protection Act 2018.',
  alternates: {
    canonical: `${SITE_METADATA.url}/privacy/`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Peptides-UK.org is committed to protecting your privacy in full compliance with the UK General Data
          Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">1. Data Controller</h2>
          <p>
            The data controller responsible for this website is the Peptides-UK.org Academic Editorial Desk
            ({SITE_METADATA.contactEmail}).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">2. Telemetry &amp; Analytical Tracking</h2>
          <p>
            We collect anonymized server and browser telemetry (including IP hashes, operating system, and referrers)
            to diagnose system issues and evaluate research index discoverability. We do not sell or lease user data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">3. Cookies</h2>
          <p>
            We use strictly necessary technical cookies and privacy-respecting Matomo analytics cookies. You may manage
            your cookie preferences via your browser settings at any time.
          </p>
        </section>
      </div>
    </div>
  );
}
