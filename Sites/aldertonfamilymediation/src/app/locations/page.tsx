import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ALDERTON_BRAND } from '../../config/brand';
import {
  SITE1_COUNTIES,
  Breadcrumbs,
  FAQSection,
  MapPinLocationIcon,
  CourtBuildingIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export const metadata: Metadata = {
  title: 'Regional Locations & Family Courts | Leicestershire, Rutland, Lincs & Notts',
  description:
    'Comprehensive regional directory of our 12 family mediation practice centres and designated Family Courts across Leicestershire, Rutland, Lincolnshire, and Nottinghamshire.',
};

export default function LocationsPage() {
  const breadcrumbs = [{ label: 'Regional Locations', href: '/locations' }];

  const locationFaqs = [
    {
      question: 'Which areas and towns do Alderton Family Mediation cover?',
      answer:
        'We cover four East Midlands ceremonial counties: Leicestershire (Leicester, Loughborough, Hinckley), Rutland (Oakham, Uppingham, Ketton), Lincolnshire (Lincoln, Grimsby, Scunthorpe), and Nottinghamshire (Nottingham, Mansfield, Carlton), providing both online and in-person mediation pathways.',
    },
    {
      question: 'Do I have to live in the same town as the family court?',
      answer:
        'No. Family court applications are typically filed at the designated family hearing centre closest to where the child primarily lives. Our mediators provide signed certificates recognized across all HM Courts & Tribunals Service centres.',
    },
    {
      question: 'Can parents in rural areas access mediation easily?',
      answer:
        'Yes. Our encrypted online video service ensures parents living in rural villages and market towns across Rutland and Lincolnshire can complete their MIAMs and joint sessions from home without travelling into busy city centres.',
    },
  ];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <section className="bg-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
              Regional Coverage Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Family Mediation Practice Centres & Regional Coverage
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Serving separating families across the East Midlands with accredited dispute resolution. Explore your local county and town practice centres below for regional coverage details and confidential booking.
            </p>
          </div>
        </div>
      </section>

      {/* County by County Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SITE1_COUNTIES.map((county) => (
            <div key={county.slug} id={county.slug} className="scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {county.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {county.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  {county.towns.length} Practice Centres
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {county.towns.map((town) => (
                  <div
                    key={town.slug}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          Online Video & Local Chambers
                        </span>
                        <span className="text-[11px] font-bold text-slate-700">
                          48hr Slots
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-slate-950 mb-2">
                        <Link
                          href={`/locations/${county.slug}/${town.slug}`}
                          className="hover:text-amber-700 transition"
                        >
                          Family Mediation {town.name}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-800 font-medium mb-4 leading-relaxed line-clamp-3">
                        {town.localContext}
                      </p>

                      <div className="bg-slate-50 rounded-xl p-3 border-2 border-slate-200 text-xs text-slate-800 font-medium space-y-1 mb-4">
                        <div className="flex items-start gap-1.5">
                          <CourtBuildingIcon className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-950 block text-[11px] font-bold">
                              Regional Court Reference:
                            </strong>
                            <span className="text-[11px] text-slate-900 font-semibold">
                              {town.designatedCourt.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <Link
                        href={`/locations/${county.slug}/${town.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 transition group"
                      >
                        <span>Explore {town.name} Practice Hub &amp; Court Guidance</span>
                        <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <Link
                        href="/contact"
                        className="text-xs font-bold text-slate-900 hover:text-amber-700 underline"
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
