'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, CheckCircle2, Clock, MapPin, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { MultiStepLeadForm } from './MultiStepLeadForm';
import { BlufGeoCapsule } from './BlufGeoCapsule';

export interface LocationPageData {
  slug: string;
  cityName: string;
  stateOrRegion: string;
  serviceName: string;
  phone: string;
  formattedPhone: string;
  utilityProvider: string;
  permitDepartment: string;
  avgTurnaround: string;
  pricingRange: { min: string; max: string };
  blufSummary: string;
  tableData: Array<{ scope: string; cost: string; time: string; permit: string }>;
  faqs: Array<{ q?: string; question?: string; a?: string; answer?: string }>;
  nearbyCities: Array<{ name: string; slug: string }>;
  contractorLicense?: string;
}

export function getLayoutVariant(slug: string): number {
  let hash = 0;
  const clean = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 3;
}

export const DynamicLayoutSpintax: React.FC<{ data: LocationPageData }> = ({ data }) => {
  const variant = getLayoutVariant(data.slug);

  // Normalize FAQs defensively
  const safeFaqs = data.faqs.map((f, idx) => ({
    question: f.question || f.q || `Frequently Asked Question ${idx + 1}`,
    answer: f.answer || f.a || `Contact dispatch at ${data.formattedPhone} for localized assistance.`,
  }));

  // =========================================================================
  // WIREFRAME VARIANT A: Form-First Hero + Pricing Table (Lead Capture Focus)
  // =========================================================================
  if (variant === 0) {
    return (
      <div className="w-full bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
        {/* Variant A Hero */}
        <section className="relative py-12 lg:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-slate-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>24/7 Verified Dispatch • {data.cityName}, {data.stateOrRegion}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {data.serviceName} in <span className="text-emerald-600 dark:text-emerald-400">{data.cityName}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                Direct certified contractor dispatch across {data.cityName}. Compliant with {data.utilityProvider} electrical standards and {data.permitDepartment} guidelines.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Avg. Arrival: {data.avgTurnaround}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licensed &amp; Bonded Network</span>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${data.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {data.formattedPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" id="lead-form">
              <MultiStepLeadForm
                cityName={data.cityName}
                serviceName={data.serviceName}
                phone={data.phone}
              />
            </div>
          </div>
        </section>

        {/* Variant A Body */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <BlufGeoCapsule
            question={`How Much Does ${data.serviceName} Cost in ${data.cityName}?`}
            answer={data.blufSummary}
            tableData={data.tableData}
          />

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Local Frequently Asked Questions in {data.cityName}
            </h2>
            <div className="space-y-4">
              {safeFaqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sibling Links */}
          <nav aria-label="Nearby Municipal Service Areas" className="p-6 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-4">
              Additional Service Corridors Near {data.cityName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.nearbyCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}/`}
                  className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs font-semibold hover:border-emerald-500 transition"
                >
                  {city.name} {data.serviceName}
                </Link>
              ))}
            </div>
          </nav>
        </main>
      </div>
    );
  }

  // =========================================================================
  // WIREFRAME VARIANT B: Centered Authority Proof + Diagnostic Triage
  // =========================================================================
  if (variant === 1) {
    return (
      <div className="w-full bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
        {/* Variant B Centered Hero */}
        <section className="py-16 lg:py-24 bg-slate-900 text-white text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mx-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Regional Dispatch • {data.cityName} Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
              {data.serviceName} in {data.cityName}, {data.stateOrRegion}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Direct access to licensed master technicians. Verified compliance with {data.permitDepartment} codes and {data.utilityProvider} utility protocols.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={`tel:${data.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {data.formattedPhone}</span>
              </a>
              <a
                href="#quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
              >
                <span>Request Online Assessment</span>
              </a>
            </div>
          </div>
        </section>

        {/* Variant B Diagnostic Flow & Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <BlufGeoCapsule
            question={`Official Technical Guidelines for ${data.cityName}`}
            answer={data.blufSummary}
            tableData={data.tableData}
          />

          {/* Diagnostic Triage Flow */}
          <section className="p-8 rounded-2xl bg-amber-50/50 dark:bg-zinc-900 border-2 border-amber-200/60 dark:border-zinc-800 space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-950 dark:text-white">
              3-Phase Diagnostic Triage for {data.cityName} Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-amber-100 dark:border-zinc-800">
                <span className="text-xs font-mono font-bold text-amber-600">PHASE 01</span>
                <h4 className="font-bold text-sm mt-1 mb-1.5">Load Evaluation</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400">Assessment of main switchgear capacity and sub-panel breaker headroom.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-amber-100 dark:border-zinc-800">
                <span className="text-xs font-mono font-bold text-amber-600">PHASE 02</span>
                <h4 className="font-bold text-sm mt-1 mb-1.5">Permit Clearance</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400">Direct administrative filing with {data.permitDepartment}.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-amber-100 dark:border-zinc-800">
                <span className="text-xs font-mono font-bold text-amber-600">PHASE 03</span>
                <h4 className="font-bold text-sm mt-1 mb-1.5">Final Inspection</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400">Commissioning certificate issued under municipal building amendments.</p>
              </div>
            </div>
          </section>

          {/* Lead Form Anchor */}
          <div id="quote" className="p-8 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Request Priority Scheduling in {data.cityName}</h2>
            <MultiStepLeadForm cityName={data.cityName} serviceName={data.serviceName} phone={data.phone} />
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold">Frequently Asked Questions</h2>
            {safeFaqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-200 dark:border-zinc-800 pb-4">
                <h3 className="font-bold text-base mb-1">{faq.question}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    );
  }

  // =========================================================================
  // WIREFRAME VARIANT C: Technical SOP + Highway Corridor Matrix
  // =========================================================================
  return (
    <div className="w-full bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      <section className="py-12 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-4">
            <span>DISPATCH SECTOR: {data.cityName.toUpperCase()}</span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight mb-4">
            {data.serviceName} // {data.cityName}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
            Statutory engineering compliance specification. Operating under jurisdiction of {data.permitDepartment} and {data.utilityProvider} utility interconnect tariffs.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <BlufGeoCapsule
            question={`Standard Operating Specifications (${data.cityName})`}
            answer={data.blufSummary}
            tableData={data.tableData}
          />

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-mono">Verified FAQ Protocol</h2>
            {safeFaqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
                <h3 className="font-bold text-sm mb-1">{faq.question}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-4">
            <h3 className="font-bold text-sm font-mono text-emerald-400">DIRECT DISPATCH DESK</h3>
            <p className="text-xs text-zinc-300">
              Immediate connection to certified field coordinators serving {data.cityName}.
            </p>
            <a
              href={`tel:${data.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{data.formattedPhone}</span>
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-3">Service Corridors</h3>
            <ul className="space-y-2 text-xs">
              {data.nearbyCities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/locations/${city.slug}/`} className="text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition flex items-center justify-between">
                    <span>{city.name}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};
