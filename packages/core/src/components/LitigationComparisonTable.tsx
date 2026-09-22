import React from 'react';
import Link from 'next/link';
import { ScalesOfJusticeIcon, ShieldCheckIcon, CheckCircleIcon, XCircleIcon } from './Icons';

interface LitigationComparisonTableProps {
  townName: string;
  countyName: string;
  isDark?: boolean;
}

export const LitigationComparisonTable: React.FC<LitigationComparisonTableProps> = ({
  townName,
  countyName,
  isDark = false,
}) => {
  const comparisonRows = [
    {
      factor: 'Time to Resolution',
      court: '9 to 18 months of court backlogs and multiple adjourned hearings',
      mediation: '2 to 6 weeks on average across 2–4 structured sessions',
      mediationAdvantage: true,
    },
    {
      factor: 'Total Legal Cost',
      court: '£15,000 to £40,000+ per person in solicitor and barrister fees',
      mediation: 'Typically £600 to £2,200 total per party (up to 80% cheaper)',
      mediationAdvantage: true,
    },
    {
      factor: 'Decision Making',
      court: 'Imposed by a judge who does not know your children or family dynamic',
      mediation: 'Decided mutually by you, tailored to your family routines',
      mediationAdvantage: true,
    },
    {
      factor: 'Privacy & Privilege',
      court: 'Adversarial legal proceedings with formal court records',
      mediation: '100% confidential under legal without-prejudice privilege',
      mediationAdvantage: true,
    },
    {
      factor: 'Impact on Children',
      court: 'Prolonged parental hostility and emotional anxiety',
      mediation: 'Protects children from conflict with a cooperative Parenting Plan',
      mediationAdvantage: true,
    },
    {
      factor: 'Legal Standing',
      court: 'Contested court order with heavy penalties for breaches',
      mediation: 'Drafted into an uncontested legally binding Consent Order',
      mediationAdvantage: true,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-2">
            Informed Decision Making
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 mb-3">
            Family Court Litigation vs Accredited Mediation in {townName}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Compare the realities of contested courtroom proceedings against constructive, accredited family mediation for {townName} and {countyName} families.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-1/4">
                  Key Consideration
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-3/8 text-slate-300">
                  Contested Family Court Route
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-3/8 bg-amber-500/20 text-amber-300 border-l border-amber-500/30">
                  FMC Accredited Mediation in {townName}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {comparisonRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                  <td className="py-4 px-6 font-bold text-slate-950">
                    {row.factor}
                  </td>
                  <td className="py-4 px-6 text-slate-700 leading-relaxed font-normal">
                    <div className="flex items-start gap-2">
                      <XCircleIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.court}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-950 font-medium leading-relaxed bg-amber-50/40 border-l border-amber-200/60">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.mediation}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Over 90% of family mediation cases reach an agreed settlement, avoiding court hearings entirely.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition whitespace-nowrap shadow-sm shrink-0"
          >
            Check Assessment Availability
          </Link>
        </div>
      </div>
    </section>
  );
};
