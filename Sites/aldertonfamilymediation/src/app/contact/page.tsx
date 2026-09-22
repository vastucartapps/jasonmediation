import React from 'react';
import { Metadata } from 'next';
import { ALDERTON_BRAND } from '../../config/brand';
import {
  Breadcrumbs,
  LeadIntakeForm,
  PhoneCallIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  MapPinLocationIcon,
  AwardSealIcon,
  MailIcon,
  ClockIcon,
  BuildingOfficeIcon,
} from '@mediation/core';

export const metadata: Metadata = {
  title: `Contact & Book MIAM Assessment | ${ALDERTON_BRAND.brandName}`,
  description:
    'Book your confidential MIAM assessment or inquire about family mediation across Leicestershire, Rutland, Lincolnshire, and Nottinghamshire. Appointments within 48 hours.',
};

export default function ContactPage() {
  const breadcrumbs = [{ label: 'Contact & Bookings', href: '/contact' }];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <section className="bg-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
              Confidential Client Bookings
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Contact & Bookings
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule your private Mediation Information & Assessment Meeting (MIAM) with an accredited practitioner. Consultations are confidential and available remotely or locally across our East Midlands centres.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Contact Details Grid */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <LeadIntakeForm
                brandName={ALDERTON_BRAND.brandName}
                phone={ALDERTON_BRAND.phone}
                formattedPhone={ALDERTON_BRAND.formattedPhone}
                buttonBgClass="bg-amber-600 hover:bg-amber-700 text-white"
              />
            </div>

            {/* Direct Contact Info Column (Ultimate Card with Rich SVG Medallions & Colors) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 border-t-4 border-t-amber-500 shadow-lg space-y-6">
                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/25 shadow-xs">
                    <PhoneCallIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Confidential Telephone
                    </span>
                    <a
                      href={`tel:${ALDERTON_BRAND.phone}`}
                      className="text-xl sm:text-2xl font-bold text-slate-950 hover:text-amber-600 transition block mt-0.5 tracking-tight"
                    >
                      {ALDERTON_BRAND.formattedPhone}
                    </a>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Confidential assessment booking line, statutory court forms, and emergency inquiries.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="pt-5 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-xs">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Email Correspondence
                    </span>
                    <a
                      href={`mailto:${ALDERTON_BRAND.contactEmail}`}
                      className="text-sm sm:text-base font-bold text-slate-950 hover:text-amber-600 transition block mt-0.5"
                    >
                      {ALDERTON_BRAND.contactEmail}
                    </a>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      All correspondence handled under strict legal without-prejudice privilege.
                    </p>
                  </div>
                </div>

                {/* Practice Hours */}
                <div className="pt-5 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-xs">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Practice Availability
                    </span>
                    <div className="text-xs text-slate-800 space-y-1 mt-1 font-semibold leading-relaxed">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600 font-medium">Monday – Friday:</span>
                        <span className="font-bold text-slate-950">8:30am – 6:00pm</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600 font-medium">Saturday:</span>
                        <span className="font-bold text-slate-950">9:00am – 1:00pm</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600 font-medium">Sunday &amp; Holidays:</span>
                        <span className="text-slate-400 font-normal">Closed (Urgent MIAM on Request)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Centre */}
                <div className="pt-5 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-xs">
                    <BuildingOfficeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      East Midlands Administrative Centre
                    </span>
                    <address className="not-italic text-xs text-slate-800 font-medium leading-relaxed mt-1">
                      Rutland House, 23 Friar Lane<br />
                      Leicester, Leicestershire LE1 5QQ
                    </address>
                  </div>
                </div>
              </div>

              {/* Safeguarding Box */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-700" />
                  <span>Confidentiality & Safeguarding Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  We never contact your former partner without your clear consent. If you are experiencing domestic abuse or have urgent safety concerns, we will guide you through statutory MIAM exemptions and emergency support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
