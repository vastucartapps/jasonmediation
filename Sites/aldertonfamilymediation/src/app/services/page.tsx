import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ALDERTON_BRAND } from '../../config/brand';
import {
  CORE_SERVICES,
  Breadcrumbs,
  FAQSection,
  CheckCircleIcon,
  ArrowRightIcon,
  ScalesOfJusticeIcon,
  AwardSealIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export const metadata: Metadata = {
  title: 'Accredited Family Mediation Services | MIAM, Child Arrangements & Finance',
  description:
    'Explore our FMC-accredited mediation services across Leicestershire, Rutland, Lincolnshire, and Nottinghamshire. MIAM court certificates, child arrangements, and financial settlements.',
};

export default function ServicesPage() {
  const breadcrumbItems = [{ label: 'Mediation Services', href: '/services' }];

  const servicesFaqs = [
    {
      question: 'Which family mediation pathway is right for my circumstances?',
      answer:
        'If you have disputes regarding where children will live or holiday rotas, choose Child Arrangements Mediation. If your separation involves the family home, mortgages, pensions, or debts, choose Financial Mediation. If both areas need resolving, All-Issues Mediation resolves everything together at a reduced total cost.',
    },
    {
      question: 'Do I need a MIAM even if I know mediation will not work?',
      answer:
        'Yes. In the vast majority of cases, family court judges at Leicester, Nottingham, and Lincoln will reject private law applications unless page 9 of Form C100 or Form A is officially signed by an accredited FMC mediator at a MIAM.',
    },
    {
      question: 'Can mediation handle complex pensions and properties?',
      answer:
        'Yes. Our specialists possess extensive experience working with high-value residential homes, defined benefit pensions (NHS, local government, military, teachers), private pensions, and business assets.',
    },
  ];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <section className="bg-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
              FMC-Accredited Professional Practice
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Family Mediation Services & Court Certification
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Constructive, legally sound pathways designed to protect children’s well-being and achieve equitable financial settlements without stressful court disputes.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Card Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={service.cardImage || service.heroImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-md">
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4">
                    <span className="text-xs font-semibold text-white bg-slate-950/80 border border-slate-700 px-3 py-1 rounded-full backdrop-blur-xs">
                      {service.typicalDuration}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-950 mb-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-amber-700 transition"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="text-slate-700 font-normal text-sm mb-6 leading-relaxed">
                      {service.summary}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 text-xs text-slate-800 font-medium space-y-1.5">
                      <div>
                        <strong className="text-slate-950 font-bold">Legal Basis:</strong> {service.statutoryBasis}
                      </div>
                      {service.courtFormRequired && (
                        <div>
                          <strong className="text-slate-950 font-bold">Court Forms:</strong> {service.courtFormRequired}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      {service.keyBenefits.slice(0, 4).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-800 font-semibold">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-900 transition"
                    >
                      <span>Explore Pathway Details</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-slate-900 hover:text-amber-700 transition"
                    >
                      Book MIAM
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table: Mediation vs Court */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
              Mediation vs Family Court Litigation
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              A factual breakdown of the differences between amicable mediation and contested court hearings in England.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Aspect</th>
                  <th className="p-4 bg-amber-900/40 text-amber-300">Accredited Family Mediation</th>
                  <th className="p-4">Contested Family Court</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-4 font-semibold">Typical Timeframe</td>
                  <td className="p-4 bg-amber-50/50 text-slate-900 font-medium">3 to 8 weeks</td>
                  <td className="p-4 text-slate-600">12 to 18 months</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Average Costs</td>
                  <td className="p-4 bg-amber-50/50 text-slate-900 font-medium">£500 – £2,000 per couple</td>
                  <td className="p-4 text-slate-600">£15,000 – £40,000+ per party</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Confidentiality</td>
                  <td className="p-4 bg-amber-50/50 text-slate-900 font-medium">100% Private & Without Prejudice</td>
                  <td className="p-4 text-slate-600">Conducted in court setting</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Decision Maker</td>
                  <td className="p-4 bg-amber-50/50 text-slate-900 font-medium">You and your former partner</td>
                  <td className="p-4 text-slate-600">Imposed by a judge or magistrates</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Children’s Impact</td>
                  <td className="p-4 bg-amber-50/50 text-slate-900 font-medium">Low-conflict, collaborative stability</td>
                  <td className="p-4 text-slate-600">High-stress, adversarial confrontation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Accreditation Trust Bar */}
      <AccreditationTrustBar />

      <FAQSection faqs={servicesFaqs} />
    </div>
  );
}
