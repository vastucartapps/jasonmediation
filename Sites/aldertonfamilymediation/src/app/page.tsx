import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALDERTON_BRAND } from '../config/brand';
import {
  CORE_SERVICES,
  SITE1_COUNTIES,
  LeadIntakeForm,
  FAQSection,
  ScalesOfJusticeIcon,
  FamilyCareIcon,
  HomeFinanceIcon,
  MiamBadgeIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  AwardSealIcon,
  PhoneCallIcon,
  MapPinLocationIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AccreditationTrustBar,
} from '@mediation/core';

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What is a MIAM and why do I need one before going to court?',
      answer:
        'A Mediation Information and Assessment Meeting (MIAM) is an individual, confidential session with an accredited family mediator. Under Section 10 of the Children and Families Act 2014, attending a MIAM is legally required in England before you can submit an application for a child arrangements order (Form C100) or financial remedy (Form A) to a family court, unless you qualify for an official statutory exemption.',
    },
    {
      question: 'How quickly can I schedule a MIAM with Alderton Family Mediation?',
      answer:
        'We understand that family issues often require urgent clarity. Individual video consultations are typically scheduled within 24 to 48 hours of your inquiry. If court certification is required, signed Form C100 or Form A documents are issued promptly upon completion of your assessment.',
    },
    {
      question: 'Do my former partner and I have to attend mediation together?',
      answer:
        'Your initial MIAM is always conducted individually in complete confidence. For subsequent joint sessions, if sitting in the same room or on the same screen causes discomfort or distress, we offer shuttle mediation where the mediator moves between separate private virtual rooms so you never have to interact directly.',
    },
    {
      question: 'How much does family mediation cost compared to court proceedings?',
      answer:
        'Contested court litigation through private solicitors regularly costs £15,000 to £30,000 per party and can take 12 to 18 months. In contrast, family mediation typically costs a few hundred pounds per session and resolves disputes within weeks, protecting your family’s financial security.',
    },
    {
      question: 'Are agreements made in mediation legally binding?',
      answer:
        'The outcomes of successful mediation are recorded in a Memorandum of Understanding and an agreed Parenting Plan or Open Financial Summary. These documents can be turned into a legally binding Consent Order by a family solicitor, which a family court judge approves without needing any courtroom hearings.',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* LUXURY HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle royal background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-90 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold backdrop-blur-sm">
                <AwardSealIcon className="w-4 h-4 text-amber-400" />
                <span>Family Mediation Council (FMC) Accredited Practice</span>
              </div>

              <h1 className="text-fluid-hero font-serif font-bold text-white tracking-tight leading-tight">
                Calm, Dignified Family Mediation & MIAM Assessments
              </h1>

              <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl font-normal">
                Guiding separated parents and couples across the East Midlands through constructive child arrangements and fair financial settlements—avoiding the emotional and financial strain of courtroom litigation.
              </p>

              {/* Trust Indicators in clean pills */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border-2 border-slate-600 font-semibold">
                  <CalendarClockIcon className="w-3.5 h-3.5 text-amber-400" />
                  Appointments Within 48 Hours
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border-2 border-slate-600 font-semibold">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                  100% Confidential & Impartial
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border-2 border-slate-600 font-semibold">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-amber-400" />
                  Court Forms C100 & Form A Signed
                </span>
              </div>

              {/* Executive Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <a
                  href="#book-assessment"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-95"
                >
                  Book Confidential Assessment
                </a>
                <a
                  href={`tel:${ALDERTON_BRAND.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 text-amber-300 font-bold text-sm transition shadow-sm whitespace-nowrap"
                >
                  <PhoneCallIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="whitespace-nowrap tracking-wide">{ALDERTON_BRAND.formattedPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Visual Image & Quick Consultation Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800/50">
                <div className="relative h-64 sm:h-72 w-full">
                  <Image
                    src="/images/hero-mediation.webp"
                    alt="Accredited Family Mediation Meeting"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                      Professional Dispute Resolution
                    </span>
                    <p className="text-white text-sm font-serif font-bold">
                      Supporting families in Leicestershire, Rutland, Lincolnshire & Nottinghamshire
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white">
                      Private Consultation Request
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Mediators Available
                    </span>
                  </div>
                  <a
                    href="#book-assessment"
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <span>Request Callback in Confidence</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-slate-200 text-center mt-2.5 font-medium">
                    We never contact your former partner without prior agreement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & IMPACT BAR */}
      <section className="bg-slate-950 text-white py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">92%</div>
              <div className="text-xs sm:text-sm text-slate-100 font-medium mt-1">Resolution Rate Without Court Litigation</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">24–48 hrs</div>
              <div className="text-xs sm:text-sm text-slate-100 font-medium mt-1">Average MIAM Appointment Waiting Time</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">£15,000+</div>
              <div className="text-xs sm:text-sm text-slate-100 font-medium mt-1">Average Savings Compared to Court Litigation</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-100 font-medium mt-1">FMC Accredited Family Mediators</div>
            </div>
          </div>
        </div>
      </section>

      {/* REGULATED ACCREDITATIONS TRUST BAR */}
      <AccreditationTrustBar />

      {/* 4 CORE SERVICES SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-800 block mb-2">
              Accredited Pathways
            </span>
            <h2 className="text-fluid-section font-serif font-bold text-slate-950 mb-4">
              Comprehensive Family Mediation Services
            </h2>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              Every family separation presents distinct emotional and practical challenges. Our accredited practitioners guide you through structured, child-centred, and legally verified solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-300 shadow-card-soft hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Card Image Header */}
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
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950 mb-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-amber-800 transition"
                      >
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-slate-700 text-sm mb-6 leading-relaxed font-normal">
                      {service.summary}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      {service.keyBenefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 font-medium">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {service.courtFormRequired || 'Legally binding options'}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 transition"
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

      {/* REGIONAL COVERAGE: 4 COUNTIES & 12 TOWNS (CLEAN & PROFESSIONAL) */}
      <section className="py-16 sm:py-24 bg-subtle-pattern border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 block mb-2">
              East Midlands Coverage
            </span>
            <h2 className="text-fluid-section font-serif font-bold text-slate-900 mb-4">
              Regional Family Mediation Centres & Practice Locations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Providing accredited online and local in-person mediation for separating parents and couples across our regional practice centres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE1_COUNTIES.map((county) => (
              <div
                key={county.slug}
                className="bg-white rounded-2xl p-6 border border-slate-300 shadow-card-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <MapPinLocationIcon className="w-5 h-5 text-amber-700" />
                    <h3 className="font-serif text-xl font-bold text-slate-950">
                      {county.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 mb-4 leading-relaxed font-medium">
                    {county.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Practice Locations:
                    </span>
                    {county.towns.map((town) => (
                      <Link
                        key={town.slug}
                        href={`/locations/${county.slug}/${town.slug}`}
                        className="group flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-900 transition"
                      >
                        <span className="group-hover:text-amber-800 font-bold">
                          {town.name}
                        </span>
                        <span className="text-[11px] font-bold text-slate-700 bg-slate-100 group-hover:bg-amber-100 group-hover:text-amber-950 px-2 py-0.5 rounded border border-slate-200 group-hover:border-amber-300 transition">
                          Practice Hub &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Link
                    href={`/locations#${county.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 transition group"
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

      {/* WHY CHOOSE MEDIATION VS COURT (FULL-WIDTH BALANCED PRESTIGE SECTION) */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-2">
              Why Families Choose Mediation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
              Avoid the Emotional and Financial Strain of Contested Court Proceedings
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Court proceedings pit parents against one another, creating lasting hostility that damages children. Family mediation provides a dignified, private forum where parents retain control over their own agreements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                01
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Fast Resolution</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Most mediation processes conclude in 2 to 4 sessions over a matter of weeks, compared to 12 to 18 months of court litigation backlogs.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                02
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Strict Confidentiality</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Discussions are legally privileged and without prejudice. Personal finances and sensitive family matters remain completely private.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                03
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Children at the Centre</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Plans are designed around your children’s practical emotional needs, school calendars, and routine stability.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                04
              </span>
              <h3 className="font-serif font-bold text-white text-lg">Financial Savings</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Preserve your family home equity and savings rather than expending tens of thousands on adversarial solicitor bills.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-7 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition"
            >
              Book Your Confidential Assessment
            </Link>
            <a
              href={`tel:${ALDERTON_BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm border-2 border-slate-700 transition shadow-sm whitespace-nowrap"
            >
              <PhoneCallIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="whitespace-nowrap tracking-wide">{ALDERTON_BRAND.formattedPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* CONFIDENTIAL LEAD INTAKE ASSESSMENT SECTION */}
      <section id="book-assessment" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-700 block mb-2">
              Confidential Client Bookings
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
              Request Your Confidential Family Mediation Consultation
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              Appointments conducted privately via secure video or at our regional East Midlands practice centres. No ex-partner contact without prior agreement.
            </p>
          </div>

          <LeadIntakeForm
            brandName={ALDERTON_BRAND.brandName}
            phone={ALDERTON_BRAND.phone}
            formattedPhone={ALDERTON_BRAND.formattedPhone}
            buttonBgClass="bg-amber-600 hover:bg-amber-700 text-white"
            headingLevel="h3"
          />
        </div>
      </section>

      {/* FAQS SECTION */}
      <FAQSection faqs={homeFaqs} />
    </div>
  );
}
