import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ALDERTON_BRAND } from '../../config/brand';
import {
  Breadcrumbs,
  ScalesOfJusticeIcon,
  AwardSealIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  CheckCircleIcon,
  PhoneCallIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export const metadata: Metadata = {
  title: `About Our FMC-Accredited Practice | ${ALDERTON_BRAND.brandName}`,
  description:
    'Learn about our Family Mediation Council (FMC) accreditation, regulatory compliance, professional mediation ethics, and child-focused dispute resolution standards.',
};

export default function AboutPage() {
  const breadcrumbs = [{ label: 'About Practice', href: '/about' }];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
              Professional Standards & Ethics
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              About {ALDERTON_BRAND.brandName}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are an accredited dispute resolution practice dedicated to providing calm, confidential, and legally verified mediation across Leicestershire, Rutland, Lincolnshire, and Nottinghamshire.
            </p>
          </div>
        </div>
      </section>

      <AccreditationTrustBar />

      {/* Main Philosophy & Standards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-2">
                Our Foundational Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                Preserving Family Dignity, Protecting Children’s Futures
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Separation and divorce are among the most stressful transitions anyone can experience. When couples enter contentious court litigation, communication breaks down permanently, legal expenses escalate uncontrollably, and children bear the emotional burden.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At {ALDERTON_BRAND.brandName}, our core objective is to offer an authoritative, dignified alternative. We create a neutral, structured environment where separating parents and couples can discuss living arrangements, financial divisions, and parenting routines with clarity and mutual respect.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
                  <AwardSealIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">
                    FMC Accredited Mediators
                  </h3>
                  <p className="text-xs text-slate-700 font-medium">
                    Regulated under the Family Mediation Council Code of Conduct
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-800 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Statutory authorization to sign court forms C100 and Form A</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Strict adherence to confidentiality and without-prejudice privilege</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Robust safeguarding and domestic abuse screening protocols</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Rigorous continuous professional development and supervision</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center">
              Our Guiding Principles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <ShieldCheckIcon className="w-8 h-8 text-amber-600 mb-3" />
                <h4 className="font-serif font-bold text-slate-950 text-base mb-2">
                  Absolute Impartiality
                </h4>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Our mediators do not take sides, judge past actions, or impose decisions. We facilitate fair, balanced negotiations where both voices are respected equally.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <ScalesOfJusticeIcon className="w-8 h-8 text-amber-600 mb-3" />
                <h4 className="font-serif font-bold text-slate-950 text-base mb-2">
                  Legal & Court Alignment
                </h4>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Our documentation adheres strictly to Family Procedure Rules Part 3 and Section 10 of the Children and Families Act 2014, facilitating seamless Consent Orders.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <CalendarClockIcon className="w-8 h-8 text-amber-600 mb-3" />
                <h4 className="font-serif font-bold text-slate-950 text-base mb-2">
                  Rapid Accessibility
                </h4>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Family crises cannot wait months. We provide individual MIAM appointments within 24 to 48 hours across our East Midlands practice centres and online.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 text-white">
                Speak With an Accredited Mediator in Confidence
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 font-medium">
                Appointments available this week via secure video or by arrangement across our East Midlands centres.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              Book Confidential Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
