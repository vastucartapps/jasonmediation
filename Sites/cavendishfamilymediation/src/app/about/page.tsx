import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CAVENDISH_BRAND } from '../../config/brand';
import {
  Breadcrumbs,
  ScalesOfJusticeIcon,
  AwardSealIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  CheckCircleIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export const metadata: Metadata = {
  title: `About Our FMC-Accredited Practice | ${CAVENDISH_BRAND.brandName}`,
  description:
    'Learn about our Family Mediation Council (FMC) accreditation, regulatory compliance, professional mediation ethics, and child-focused dispute resolution standards across the South East.',
};

export default function AboutPage() {
  const breadcrumbs = [{ label: 'About Practice', href: '/about' }];

  return (
    <div className="w-full bg-[#FAF9F5]">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-emerald-950 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-2">
              Professional Standards & Ethics
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              About {CAVENDISH_BRAND.brandName}
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              We are an elite, FMC-accredited dispute resolution practice providing discrete, calm, and legally verified mediation across Suffolk, Essex, Kent, and Sussex.
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
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-2">
                Our Foundational Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4">
                Discrete Resolution, Protecting Family Legacies
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Separation in the South East often involves intricate financial realities: commuting commitments, high-value property portfolios, complex pensions, and business interests. When disputes escalate into court, costs quickly spiral into tens of thousands of pounds.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                At {CAVENDISH_BRAND.brandName}, we provide an executive, high-empathy alternative. We facilitate structured, private discussions where separating couples can resolve child living arrangements and financial settlements with dignity, confidentiality, and legal exactness.
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center">
                  <AwardSealIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    FMC Accredited Practice
                  </h3>
                  <p className="text-xs text-stone-700 font-medium">
                    Regulated under the Family Mediation Council Standards Board
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-stone-800 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Authorized statutory sign-off for court Forms C100 & Form A</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Strict legal without-prejudice confidentiality</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Rigorous safeguarding and vulnerability screening</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive financial disclosure schedules and Consent Order prep</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-emerald-950 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">
                Speak With an Accredited Mediator in Confidence
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Appointments available this week via secure video and across our South East and East Anglia practice centres.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition"
            >
              Book Confidential Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
