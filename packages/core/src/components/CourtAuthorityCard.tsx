import React from 'react';
import { DesignatedCourt } from '../types';
import { ShieldCheckIcon, AwardSealIcon, ScalesOfJusticeIcon, CourtBuildingIcon, CheckCircleIcon } from './Icons';

interface CourtAuthorityCardProps {
  townName: string;
  countyName: string;
  court: DesignatedCourt;
  accentBg?: string;
}

export const CourtAuthorityCard: React.FC<CourtAuthorityCardProps> = ({
  townName,
  countyName,
  court,
  accentBg = 'bg-slate-900 text-white',
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden">
      {/* Responsive Top Bar (Never Smashes on Mobile) */}
      <div className="bg-slate-900 text-white px-5 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <ScalesOfJusticeIcon className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Statutory Dispute Resolution Framework
          </span>
        </div>
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[11px] bg-slate-800/90 text-amber-300 px-3 py-1 rounded-full border border-slate-700 font-semibold shadow-xs">
          <AwardSealIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>FMC Accredited Practice</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-950 mb-2.5">
          Statutory MIAM Guidelines &amp; Legal Procedure for {townName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
          Under Section 10 of the Children and Families Act 2014, separating parents and couples in <strong>{townName}</strong> must attend an accredited Mediation Information and Assessment Meeting (MIAM) before making private family law applications, unless an official exemption applies.
        </p>

        {/* 2 Distinct Modern Authority Feature Blocks (Replaces Dull Wireframe Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Court Authority Block */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <CourtBuildingIcon className="w-4 h-4 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Designated Family Court
              </span>
            </div>
            <strong className="text-white text-base sm:text-lg font-serif font-bold block mb-1.5">
              {court.name}
            </strong>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official regional justice centre serving {countyName} for applications requiring formal court orders.
            </p>
          </div>

          {/* Mediation Pathway Block */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-950 to-slate-900 text-white border border-emerald-800/80 shadow-md relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <CheckCircleIcon className="w-4 h-4 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Statutory Preferred Pathway
              </span>
            </div>
            <strong className="text-white text-base sm:text-lg font-serif font-bold block mb-1.5">
              Accredited Mediation
            </strong>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Over 80% of couples reach durable agreements out of court, reducing emotional strain and saving thousands.
            </p>
          </div>
        </div>

        {/* Guarantee Callout */}
        <div className="bg-gradient-to-r from-emerald-50 via-emerald-50/60 to-teal-50/30 rounded-2xl p-5 border border-emerald-200/90 flex items-start gap-3.5 shadow-xs">
          <ShieldCheckIcon className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong className="font-bold block mb-0.5 text-emerald-900">
              Statutory Certification Guarantee
            </strong>
            {court.c100SubmissionNote || 'If mediation is not appropriate or the other party declines, your accredited mediator will issue your signed court forms promptly within 24 to 48 hours.'}
          </div>
        </div>
      </div>
    </div>
  );
};
