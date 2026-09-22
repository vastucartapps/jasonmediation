import React from 'react';
import { Metadata } from 'next';
import { ALDERTON_BRAND } from '../../config/brand';
import { Breadcrumbs } from '@mediation/core';

export const metadata: Metadata = {
  title: `Privacy & Confidentiality Policy | ${ALDERTON_BRAND.brandName}`,
  description:
    'Our commitment to professional confidentiality, GDPR compliance, and without-prejudice legal privilege in UK family mediation.',
};

export default function PrivacyPage() {
  const breadcrumbs = [{ label: 'Privacy Policy', href: '/privacy' }];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4">
            Privacy & Confidentiality Policy
          </h1>
          <p className="text-slate-600 text-sm">
            Last updated: September 2026. Regulated under the Family Mediation Council (FMC) Code of Conduct and UK GDPR.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-lg font-serif font-bold text-slate-900 mb-2">
              1. Professional Confidentiality & Legal Privilege
            </h2>
            <p>
              Under the Family Mediation Council Code of Practice, all information shared during mediation discussions, joint meetings, and intake consultations is strictly confidential and protected by common-law without-prejudice legal privilege. Neither party may disclose proposals or negotiations made within mediation in subsequent court proceedings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-serif font-bold text-slate-900 mb-2">
              2. Exceptions to Confidentiality (Safeguarding & Crime)
            </h2>
            <p>
              In accordance with statutory duties, our mediators are obligated to break confidentiality only in specific circumstances: where there is a risk of significant harm to a child or vulnerable adult, where a mediator has reason to suspect money laundering or proceeds of crime, or where disclosure is required by law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-serif font-bold text-slate-900 mb-2">
              3. Data Collection & GDPR Compliance
            </h2>
            <p>
              We collect personal details (including names, contact numbers, email addresses, and factual financial disclosure schedules) strictly for the purpose of scheduling assessments, conducting mediation, and preparing court documentation (Forms C100 and Form A). Data is retained securely in encrypted storage in accordance with UK Data Protection Act 2018 guidelines.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-serif font-bold text-slate-900 mb-2">
              4. Contacting the Practice
            </h2>
            <p>
              For data protection inquiries or requests regarding your personal records, please contact our Data Protection Officer at {ALDERTON_BRAND.contactEmail} or by telephone on {ALDERTON_BRAND.formattedPhone}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
