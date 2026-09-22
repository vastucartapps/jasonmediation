import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CAVENDISH_BRAND } from '../../config/brand';
import {
  CORE_SERVICES,
  Breadcrumbs,
  FAQSection,
  CheckCircleIcon,
  ArrowRightIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export const metadata: Metadata = {
  title: 'Accredited Family Mediation Services | MIAM, Child Arrangements & Finance',
  description:
    'FMC-accredited mediation services across Suffolk, Essex, Kent, and Sussex. Court-authorized MIAM certificates, child arrangements, and financial clean breaks.',
};

export default function ServicesPage() {
  const breadcrumbs = [{ label: 'Mediation Services', href: '/services' }];

  const servicesFaqs = [
    {
      question: 'Which family mediation pathway is right for our situation?',
      answer:
        'If your dispute involves parenting schedules, child living arrangements, or holiday rotas, select Child Arrangements. If your concerns involve dividing matrimonial property, mortgages, or pensions, choose Financial Mediation. If both areas need resolving, All-Issues Mediation unifies the entire separation framework at substantial financial savings.',
    },
    {
      question: 'Is a MIAM compulsory before going to family court in the South East?',
      answer:
        'Yes. Designated family courts in Essex, Kent, Surrey, Sussex, and Suffolk will routinely reject private family applications unless an accredited mediator signs Form C100 or Form A, certifying that you attended a MIAM or qualify for an exemption.',
    },
    {
      question: 'Can mediation handle high-value marital assets and complex pensions?',
      answer:
        'Yes. Our practitioners have deep experience mediating substantial marital capital, London commuter property portfolios, defined benefit pensions (NHS, civil service, police), and family business interests.',
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
              FMC-Accredited Professional Practice
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Specialist Family Mediation Services
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Constructive, legally sound pathways designed to protect children’s emotional security and achieve fair financial settlements without adversarial litigation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-stone-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Card Header */}
                <div className="relative h-52 w-full overflow-hidden bg-emerald-950">
                  <Image
                    src={service.cardImage || service.heroImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-md">
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4">
                    <span className="text-xs font-semibold text-white bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full backdrop-blur-xs">
                      {service.typicalDuration}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-stone-950 mb-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-emerald-800 transition"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="text-stone-700 font-normal text-sm mb-6 leading-relaxed">
                      {service.summary}
                    </p>

                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-6 text-xs text-stone-800 font-medium space-y-1.5">
                      <div>
                        <strong className="text-stone-950 font-bold">Legal Basis:</strong> {service.statutoryBasis}
                      </div>
                      {service.courtFormRequired && (
                        <div>
                          <strong className="text-stone-950 font-bold">Court Forms:</strong> {service.courtFormRequired}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      {service.keyBenefits.slice(0, 4).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-800 font-semibold">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition"
                    >
                      <span>Explore Pathway Details</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-stone-900 hover:text-emerald-800 transition"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Trust Bar */}
      <AccreditationTrustBar />

      <FAQSection faqs={servicesFaqs} />
    </div>
  );
}
