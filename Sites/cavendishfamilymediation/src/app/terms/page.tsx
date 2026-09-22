import React from 'react';
import { Metadata } from 'next';
import { CAVENDISH_BRAND } from '../../config/brand';
import { Breadcrumbs } from '@mediation/core';

export const metadata: Metadata = {
  title: `Terms of Engagement | ${CAVENDISH_BRAND.brandName}`,
  description:
    'Terms of engagement, FMC mediation code of conduct, assessment cancellation policies, and fee arrangements.',
};

export default function TermsPage() {
  const breadcrumbs = [{ label: 'Terms of Engagement', href: '/terms' }];

  return (
    <div className="w-full bg-[#FAF9F5]">
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-14 lg:py-20 bg-emerald-950 text-white border-b border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Terms of Engagement
          </h1>
          <p className="text-emerald-100 text-sm">
            Professional engagement conditions governed by English law and the Family Mediation Council Standards Board.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
              1. Nature of Mediation Services
            </h2>
            <p>
              Family mediation is a voluntary, non-adversarial dispute resolution process. The mediator acts as an impartial facilitator and does not represent either party or provide partisan legal advice. Parties are strongly encouraged to obtain independent legal advice alongside mediation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
              2. Court Certification (MIAMs)
            </h2>
            <p>
              Attendance at a Mediation Information & Assessment Meeting does not compel a participant to continue into joint mediation. If either party or the mediator determines that mediation is unsuitable, or if one party declines to attend, the mediator will sign the applicant’s court form (Form C100 or Form A) in accordance with Family Procedure Rules Part 3.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
              3. Fees and Appointments
            </h2>
            <p>
              Fees for MIAMs and joint sessions are fixed and transparent. Written notice of cancellation is requested at least 24 hours prior to scheduled meetings. Sessions may be conducted remotely via encrypted video conference or in designated regional meeting rooms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
