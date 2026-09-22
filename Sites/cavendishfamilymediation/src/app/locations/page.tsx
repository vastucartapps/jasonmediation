import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CAVENDISH_BRAND } from '../../config/brand';
import {
  SITE2_COUNTIES,
  Breadcrumbs,
  FAQSection,
  MapPinLocationIcon,
  CourtBuildingIcon,
  ArrowRightIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export const metadata: Metadata = {
  title: 'Regional Locations & Family Courts | Suffolk, Essex, Kent & Sussex',
  description:
    'Comprehensive regional directory of our 12 family mediation practice centres and designated Family Courts across Suffolk, Essex, Kent, and Sussex.',
};

export default function LocationsPage() {
  const breadcrumbs = [{ label: 'Regional Locations', href: '/locations' }];

  const locationFaqs = [
    {
      question: 'Which areas do Cavendish Family Mediation cover?',
      answer:
        'We cover four major counties across South East England and East Anglia: Suffolk (Ipswich, Lowestoft, Bury St Edmunds), Essex (Southend-on-Sea, Colchester, Chelmsford), Kent (Maidstone, Gillingham, Dartford), and Sussex (Brighton & Hove, Eastbourne, Worthing), providing both digital video and local in-person mediation.',
    },
    {
      question: 'Will our local family court accept mediation certificates from Cavendish?',
      answer:
        'Yes. All our mediators are fully accredited by the Family Mediation Council (FMC). Our Form C100 and Form A certificates are universally recognized by HM Courts & Tribunals Service throughout England.',
    },
    {
      question: 'Can parents living in different towns mediate together?',
      answer:
        'Yes. Remote online mediation allows parents living anywhere in the UK or overseas to attend joint or shuttle sessions effortlessly, eliminating travel friction.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F5]">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <section className="bg-emerald-950 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-2">
              Regional Coverage Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Family Mediation Practice Centres & Regional Coverage
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Serving communities across Suffolk, Essex, Kent, and Sussex. Explore your local county and town practice centres below for regional coverage details and confidential booking.
            </p>
          </div>
        </div>
      </section>

      {/* County by County Section */}
      <section className="py-16 sm:py-20 bg-stone-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SITE2_COUNTIES.map((county) => (
            <div key={county.slug} id={county.slug} className="scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-stone-200 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {county.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    {county.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  {county.towns.length} Practice Centres
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {county.towns.map((town) => (
                  <div
                    key={town.slug}
                    className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          Online Video & Private Chambers
                        </span>
                        <span className="text-[11px] font-bold text-stone-700">
                          48hr Slots
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-stone-950 mb-2">
                        <Link
                          href={`/locations/${county.slug}/${town.slug}`}
                          className="hover:text-emerald-800 transition"
                        >
                          Family Mediation {town.name}
                        </Link>
                      </h3>

                      <p className="text-xs text-stone-800 font-medium mb-4 leading-relaxed line-clamp-3">
                        {town.localContext}
                      </p>

                      <div className="bg-stone-50 rounded-xl p-3 border-2 border-stone-200 text-xs text-stone-800 font-medium space-y-1 mb-4">
                        <div className="flex items-start gap-1.5">
                          <CourtBuildingIcon className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-stone-950 block text-[11px] font-bold">
                              Regional Court Reference:
                            </strong>
                            <span className="text-[11px] text-stone-900 font-semibold">
                              {town.designatedCourt.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                      <Link
                        href={`/locations/${county.slug}/${town.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition group"
                      >
                        <span>Explore {town.name} Practice Hub &amp; Court Guidance</span>
                        <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <Link
                        href="/contact"
                        className="text-xs font-bold text-stone-900 hover:text-emerald-800 underline"
                      >
                        Book MIAM
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditation Trust Bar */}
      <AccreditationTrustBar />

      <FAQSection faqs={locationFaqs} />
    </div>
  );
}
