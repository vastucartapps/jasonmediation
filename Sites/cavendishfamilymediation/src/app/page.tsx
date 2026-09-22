import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CAVENDISH_BRAND } from '../config/brand';
import {
  CORE_SERVICES,
  SITE2_COUNTIES,
  LeadIntakeForm,
  FAQSection,
  ScalesOfJusticeIcon,
  AwardSealIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  CheckCircleIcon,
  PhoneCallIcon,
  MapPinLocationIcon,
  ArrowRightIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export default function CavendishHomePage() {
  const homeFaqs = [
    {
      question: 'What is a MIAM and is it mandatory before applying to family court?',
      answer:
        'A Mediation Information & Assessment Meeting (MIAM) is a statutory individual assessment. Under Section 10 of the Children and Families Act 2014, courts in Suffolk, Essex, Kent, and Sussex will not accept an application for a child arrangements order (Form C100) or financial remedy (Form A) without an FMC-accredited mediator’s signature on the court form, unless an official statutory exemption applies.',
    },
    {
      question: 'How quickly can I schedule a MIAM with Cavendish Family Mediation?',
      answer:
        'We offer confidential video consultations within 24 to 48 hours across the South East and East Anglia. If joint mediation is not appropriate or the other party declines, your mediator signs and delivers your court certification without delay.',
    },
    {
      question: 'Can mediation handle high-value property, mortgages, and complex pensions?',
      answer:
        'Yes. Our practitioners regularly mediate complex matrimonial finances, including commuter properties in Essex and Kent, high-value estates in Suffolk and Sussex, defined benefit public sector pensions, private pensions, and business shareholdings.',
    },
    {
      question: 'Do we have to be in the same room or video call as our former partner?',
      answer:
        'Your initial MIAM is strictly private and individual. For joint sessions, we provide shuttle mediation where the mediator moves between separate virtual rooms, ensuring you feel completely secure and never have to interact directly if conflict is high.',
    },
    {
      question: 'How does our mediation agreement become legally binding?',
      answer:
        'Following mediation, your mediator drafts a comprehensive Memorandum of Understanding and Open Financial Summary. A family solicitor easily converts these into an uncontested Consent Order for judicial endorsement without any court appearances.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F5]">
      {/* LUXURY HERO SECTION */}
      <section className="relative overflow-hidden bg-emerald-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-[#022c22] opacity-95 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900 text-amber-300 border border-emerald-700 text-xs font-bold backdrop-blur-sm">
                <AwardSealIcon className="w-4 h-4 text-amber-300" />
                <span>Family Mediation Council (FMC) Accredited Practice</span>
              </div>

              <h1 className="text-fluid-hero font-serif font-bold text-white tracking-tight leading-tight">
                Discrete, Accredited Family Mediation & Court MIAMs
              </h1>

              <p className="text-base sm:text-lg text-emerald-50 leading-relaxed max-w-2xl font-normal">
                Protecting your children’s emotional well-being and preserving family assets across Suffolk, Essex, Kent, and Sussex. Discrete, professional resolution without stressful court battles.
              </p>

              {/* Trust Indicators in clean pills */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 border-2 border-emerald-700 font-semibold">
                  <CalendarClockIcon className="w-3.5 h-3.5 text-amber-300" />
                  Appointments Within 48 Hours
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 border-2 border-emerald-700 font-semibold">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-300" />
                  100% Confidential & Impartial
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 border-2 border-emerald-700 font-semibold">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-amber-300" />
                  Forms C100 & Form A Signed
                </span>
              </div>

              {/* Executive Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition transform active:scale-95"
                >
                  Book Confidential Assessment
                </Link>
                <a
                  href={`tel:${CAVENDISH_BRAND.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-emerald-900 hover:bg-emerald-850 border-2 border-emerald-700 text-amber-300 font-bold text-sm transition shadow-sm whitespace-nowrap"
                >
                  <PhoneCallIcon className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap tracking-wide">{CAVENDISH_BRAND.formattedPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Visual Image & Quick Consultation Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-800 shadow-2xl bg-emerald-900/50">
                <div className="relative h-64 sm:h-72 w-full">
                  <Image
                    src="/images/hero-mediation.webp"
                    alt="Accredited Family Mediation Meeting"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                      South East & East Anglia
                    </span>
                    <p className="text-white text-sm font-serif font-bold">
                      Supporting families in Suffolk, Essex, Kent & Sussex
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-950 border-t border-emerald-900">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white">
                      Private Consultation Request
                    </span>
                    <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                      Mediators Available
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <span>Request Callback in Confidence</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                  <p className="text-xs text-emerald-100 text-center mt-2.5 font-medium">
                    We never contact your former partner without prior agreement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-emerald-950 text-white py-10 border-y border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300">93%</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">Settlement Rate Without Court Litigation</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300">24–48 hrs</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">Average MIAM Appointment Waiting Time</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300">£18,000+</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">Average Family Legal Savings</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300">100%</div>
              <div className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">FMC Accredited Practitioners</div>
            </div>
          </div>
        </div>
      </section>

      {/* REGULATED ACCREDITATIONS TRUST BAR */}
      <AccreditationTrustBar />

      {/* 4 CORE SERVICES */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-900 block mb-2">
              FMC-Accredited Pathways
            </span>
            <h2 className="text-fluid-section font-serif font-bold text-stone-950 mb-4">
              Specialist Family Mediation Pathways
            </h2>
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
              Every separation requires discretion, legal exactness, and personal care. Our mediation pathways offer structured resolution for child arrangements and matrimonial finances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.slug}
                className="bg-stone-50 rounded-2xl border border-stone-300 shadow-card-soft hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Card Image Header */}
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
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mb-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-emerald-800 transition"
                      >
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-stone-700 text-sm mb-6 leading-relaxed font-normal">
                      {service.summary}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {service.keyBenefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-900 font-medium">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    {service.courtFormRequired || 'Legally binding options'}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition"
                  >
                    <span>Full service details</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONAL COVERAGE: 4 COUNTIES & 12 TOWNS */}
      <section className="py-16 sm:py-24 bg-subtle-pattern border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800 block mb-2">
              Regional Coverage
            </span>
            <h2 className="text-fluid-section font-serif font-bold text-stone-900 mb-4">
              Regional Family Mediation Centres & Practice Locations
            </h2>
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
              Serving communities across Suffolk, Essex, Kent, and Sussex with accredited online and in-person mediation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE2_COUNTIES.map((county) => (
              <div
                key={county.slug}
                className="bg-white rounded-2xl p-6 border-2 border-stone-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPinLocationIcon className="w-5 h-5 text-emerald-700" />
                    <h3 className="font-serif text-lg font-bold text-stone-950">
                      {county.name}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-800 mb-4 leading-relaxed font-medium">
                    {county.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      Practice Locations:
                    </span>
                    {county.towns.map((town) => (
                      <Link
                        key={town.slug}
                        href={`/locations/${county.slug}/${town.slug}`}
                        className="group flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-stone-100 text-xs font-semibold text-stone-900 transition"
                      >
                        <span className="group-hover:text-emerald-900 font-bold">
                          {town.name}
                        </span>
                        <span className="text-[10px] text-stone-700 bg-stone-100 group-hover:bg-emerald-100 group-hover:text-emerald-950 px-2 py-0.5 rounded font-bold border border-stone-200 group-hover:border-emerald-300 transition">
                          Practice Hub &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200">
                  <Link
                    href={`/locations#${county.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition group"
                  >
                    <span>Explore All {county.name} Practice Hubs &amp; Family Courts</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE MEDIATION VS COURT (FULL-WIDTH BALANCED LUXURY SECTION) */}
      <section className="py-16 sm:py-24 bg-emerald-950 text-white border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-2">
              Why Families Choose Mediation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4">
              Protect Family Capital and Avoid the Trauma of Family Court
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Court litigation in the South East is extraordinarily costly and slow. Family mediation provides a dignified, private framework where you make your own decisions with independent expert support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-emerald-900/70 rounded-2xl p-6 border border-emerald-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-sm">
                01
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Rapid Resolution</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                Most cases settle within 2 to 4 structured sessions, compared to 12 to 18 months of adversarial court proceedings.
              </p>
            </div>

            <div className="bg-emerald-900/70 rounded-2xl p-6 border border-emerald-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-sm">
                02
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Complete Privacy</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                All discussions are protected by legal without-prejudice privilege. Personal disclosures remain strictly confidential.
              </p>
            </div>

            <div className="bg-emerald-900/70 rounded-2xl p-6 border border-emerald-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-sm">
                03
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Children First</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                Arrangements are crafted around real schooling routines, holidays, and living needs rather than rigid court-imposed orders.
              </p>
            </div>

            <div className="bg-emerald-900/70 rounded-2xl p-6 border border-emerald-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold text-sm">
                04
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Financial Savings</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                Save tens of thousands of pounds in solicitor and barrister fees, keeping your family assets intact.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-7 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition"
            >
              Book Your Confidential Assessment
            </Link>
            <a
              href={`tel:${CAVENDISH_BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-sm border-2 border-emerald-600 shadow-sm transition whitespace-nowrap"
            >
              <PhoneCallIcon className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span className="whitespace-nowrap tracking-wide">{CAVENDISH_BRAND.formattedPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <FAQSection faqs={homeFaqs} />
    </div>
  );
}
