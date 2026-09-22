import React from 'react';
import Link from 'next/link';
import { DesignatedCourt } from '../types';
import {
  AwardSealIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ScalesOfJusticeIcon,
  AlertTriangleIcon,
  ClockIcon,
  BuildingOfficeIcon,
  MapPinLocationIcon,
} from './Icons';

interface LocalProcedureGuideProps {
  townName: string;
  countyName: string;
  court: DesignatedCourt;
  serviceTitle?: string;
}

export const LocalProcedureGuide: React.FC<LocalProcedureGuideProps> = ({
  townName,
  countyName,
  court,
  serviceTitle = 'Family Mediation',
}) => {
  const exemptions = [
    {
      title: 'Domestic Abuse Evidence',
      detail: 'Police reports, injunctions, or MARAC protective documentation exempt an individual from attending a MIAM.',
      IconComponent: AlertTriangleIcon,
      accentBorder: 'border-l-rose-500',
      iconBg: 'bg-rose-100 text-rose-600',
    },
    {
      title: 'Urgent Child Protection',
      detail: 'Urgent risks of unlawful removal from the UK, abduction risk, or immediate social services involvement.',
      IconComponent: ShieldCheckIcon,
      accentBorder: 'border-l-amber-500',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Previous MIAM Attendance',
      detail: 'Having attended an accredited MIAM within the previous 4 months regarding the same dispute.',
      IconComponent: ClockIcon,
      accentBorder: 'border-l-indigo-500',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Bankruptcy Proceedings',
      detail: 'Where the financial application relates to ongoing formal bankruptcy or insolvency matters.',
      IconComponent: BuildingOfficeIcon,
      accentBorder: 'border-l-slate-600',
      iconBg: 'bg-slate-200 text-slate-700',
    },
    {
      title: 'International Residency',
      detail: 'Where either applicant or respondent does not habitually reside within England or Wales.',
      IconComponent: MapPinLocationIcon,
      accentBorder: 'border-l-emerald-500',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-2">
            Statutory Legal Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 mb-3">
            FPR Part 3 Court Rules &amp; MIAM Certification for {townName}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Essential procedural guidelines governing family dispute resolution, court exemptions, and statutory certification for applications to {court.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* FPR Rule Overview Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
                  <ScalesOfJusticeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-950 leading-tight">
                    The 2024 Family Procedure Rules (FPR) Enforcement
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Strict Judicial Scrutiny under CPR / FPR Part 3.4 &amp; Part 28
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Following major amendments to the Family Procedure Rules, family judges at <strong>{court.name}</strong> actively enforce the requirement for separating parties to explore non-court dispute resolution (NCDR). If a party unreasonably fails or refuses to attend a MIAM or engage in mediation, judges possess statutory authority under FPR 28.3 to impose substantial adverse cost orders against them.
              </p>

              {/* Authoritative Certification Seal Banner (Eliminates Nested Dull Box) */}
              <div className="rounded-xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-50/60 to-white border border-amber-300/80 border-l-4 border-l-amber-500 shadow-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-950 text-xs sm:text-sm">
                  <AwardSealIcon className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Statutory Rule: Why Self-Certification is Strictly Prohibited</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Only a mediator holding Full FMC Accreditation (FMCA) is legally authorized to sign Section 14 / Page 9 of court Form C100 or Page 2 of Form A. Paperwork signed by unaccredited individuals or attempted self-certification will be immediately struck out by HMCTS courts.
                </p>
              </div>
            </div>

            {/* Exemption Criteria Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheckIcon className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Statutory Exemptions
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-950 mb-2 leading-tight">
                Statutory MIAM Exemption Grounds in {townName}
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                If you believe mediation is unsuitable for your circumstances, you must formally qualify under one of the statutory exemption categories defined in Section 10 of the Children and Families Act 2014:
              </p>

              {/* Modern Exemption Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {exemptions.map((ex, idx) => {
                  const Icon = ex.IconComponent;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200/80 border-l-4 ${ex.accentBorder} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ex.iconBg}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <strong className="block text-slate-950 font-bold text-xs">
                            {ex.title}
                          </strong>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed mt-1">
                          {ex.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Certification Protocol Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                <span>Certification Protocol</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-white mb-2">
                Fast-Track Form C100 &amp; Form A Sign-Off
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                If mediation does not proceed after your individual MIAM assessment, our FMCA mediators ensure you are not delayed in lodging your application with {court.name}.
              </p>

              <ul className="space-y-3.5 text-xs text-slate-200 mb-7">
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Issued directly via encrypted PDF within 24–48 hours</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Fully verified with official FMC Mediator Registration Number</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Accepted without delay by HMCTS digital court portals</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center block transition shadow-md hover:shadow-lg"
              >
                Schedule Confidential Assessment in {townName}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
