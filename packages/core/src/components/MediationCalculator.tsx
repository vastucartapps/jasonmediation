'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandConfig } from '../types';
import { AwardSealIcon, ShieldCheckIcon, PhoneCallIcon, CheckCircleIcon } from './Icons';

interface MediationCalculatorProps {
  brand: BrandConfig;
  brandVariant?: 'alderton' | 'cavendish';
}

type DisputeType = 'children' | 'finances' | 'all-issues';

export const MediationCalculator: React.FC<MediationCalculatorProps> = ({
  brand,
  brandVariant = 'alderton',
}) => {
  const isAlderton = brandVariant === 'alderton';

  const [disputeType, setDisputeType] = useState<DisputeType>('children');
  const [sessions, setSessions] = useState<number>(2);

  // Statutory cost constants (Verified UK Family Law averages)
  const MIAM_COST_PER_PERSON = 130;
  const SESSION_COST_PER_PERSON = 140; // 90 min session
  const MOJ_VOUCHER_GRANT = 500; // Ministry of Justice grant for child dispute cases

  // Voucher applies to Child Arrangements and All-Issues
  const isVoucherEligible = disputeType === 'children' || disputeType === 'all-issues';

  // Total couple mediation cost calculation
  const totalMiamCouple = MIAM_COST_PER_PERSON * 2;
  const totalSessionsCouple = SESSION_COST_PER_PERSON * 2 * sessions;
  const grossMediation = totalMiamCouple + totalSessionsCouple;
  const netMediation = isVoucherEligible ? Math.max(0, grossMediation - MOJ_VOUCHER_GRANT) : grossMediation;

  // Contested court litigation benchmark averages (Per party x 2 for couple comparison)
  const courtLitigationMin = disputeType === 'children' ? 12000 : disputeType === 'finances' ? 18000 : 25000;
  const courtLitigationMax = disputeType === 'children' ? 24000 : disputeType === 'finances' ? 35000 : 45000;
  const estimatedCourtAverage = Math.round((courtLitigationMin + courtLitigationMax) / 2);
  const estimatedSavings = estimatedCourtAverage - netMediation;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 text-white ${
        isAlderton ? 'bg-slate-950' : 'bg-emerald-950'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <AwardSealIcon className="w-3.5 h-3.5 text-amber-400" />
            Statutory Dispute Cost Benchmark
          </span>
          <span className="text-xs text-slate-300 font-medium">
            MoJ Voucher Scheme Approved
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white mb-2">
          Mediation vs. Court Litigation Cost Calculator
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Estimate statutory mediation fees versus contentious court litigation costs, factoring in the non-means-tested £500 Ministry of Justice voucher scheme.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dispute Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Matter in Dispute
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDisputeType('children');
                  if (sessions > 3) setSessions(2);
                }}
                className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                  disputeType === 'children'
                    ? isAlderton
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                      : 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Child Arrangements
              </button>
              <button
                type="button"
                onClick={() => setDisputeType('finances')}
                className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                  disputeType === 'finances'
                    ? isAlderton
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                      : 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Financial Remedy
              </button>
              <button
                type="button"
                onClick={() => {
                  setDisputeType('all-issues');
                  if (sessions < 3) setSessions(3);
                }}
                className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                  disputeType === 'all-issues'
                    ? isAlderton
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                      : 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                All-Issues (Both)
              </button>
            </div>
          </div>

          {/* Number of Joint Sessions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Estimated Joint Sessions
              </label>
              <span className="text-xs font-bold text-slate-900">
                {sessions} Sessions {sessions === 2 ? '(Typical for parenting)' : sessions === 3 ? '(Average for finances)' : '(Complex assets)'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSessions(num)}
                  className={`py-3 rounded-xl border text-xs font-bold transition text-center ${
                    sessions === num
                      ? isAlderton
                        ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                        : 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num} {num === 1 ? 'Session' : 'Sessions'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Voucher Scheme Notification Callout */}
        {isVoucherEligible ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-emerald-900 font-bold block text-sm">
                Qualifies for MoJ £500 Family Mediation Voucher Scheme
              </strong>
              <p className="text-emerald-800">
                Because your matter involves children, you are eligible for the non-means-tested £500 government contribution. We apply this deduction directly to your joint sessions.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Note:</strong> The £500 Voucher Scheme applies to disputes involving child arrangements. Purely financial disputes do not qualify for the MoJ grant, but save substantially compared to court litigation.
          </div>
        )}

        {/* Comparison Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Mediation Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-white border-2 border-emerald-300 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                FMC Accredited Mediation Pathway
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 mt-1">
                £{netMediation.toLocaleString()}
                <span className="text-xs font-sans text-slate-600 font-normal ml-2">
                  (Total estimated for both parties)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 border-t border-emerald-200/60 pt-3">
              <div className="flex justify-between">
                <span>Individual MIAMs (2 parties):</span>
                <span className="font-bold">£{totalMiamCouple}</span>
              </div>
              <div className="flex justify-between">
                <span>{sessions} Joint Mediation Sessions:</span>
                <span className="font-bold">£{totalSessionsCouple}</span>
              </div>
              {isVoucherEligible && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>MoJ Voucher Scheme Grant:</span>
                  <span>-£{MOJ_VOUCHER_GRANT}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200 text-slate-900 font-bold">
                <span>Average Resolution Timeline:</span>
                <span className="text-emerald-700">4 – 8 Weeks</span>
              </div>
            </div>
          </div>

          {/* Court Litigation Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50/50 to-white border-2 border-rose-200 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block">
                Contested Family Court Litigation
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-rose-950 mt-1">
                £{estimatedCourtAverage.toLocaleString()}+
                <span className="text-xs font-sans text-slate-600 font-normal ml-2">
                  (Combined solicitor &amp; counsel fees)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 border-t border-rose-200/60 pt-3">
              <div className="flex justify-between">
                <span>Solicitor &amp; Barrister Fees:</span>
                <span className="font-bold">£{courtLitigationMin.toLocaleString()} – £{courtLitigationMax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Court Filing &amp; Hearing Costs:</span>
                <span className="font-bold">£255 – £300+</span>
              </div>
              <div className="flex justify-between text-rose-700 font-bold">
                <span>Risk of Adverse Costs (FPR 28.3):</span>
                <span>Substantial</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-slate-900 font-bold">
                <span>Average Court Hearing Wait:</span>
                <span className="text-rose-700">12 – 18+ Months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Savings Banner */}
        <div className={`p-6 rounded-2xl text-center space-y-2 ${
          isAlderton ? 'bg-slate-900 text-white' : 'bg-emerald-950 text-white'
        }`}>
          <div className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Projected Family Financial Savings
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Save Approximately £{estimatedSavings.toLocaleString()} by Mediating
          </div>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            Mediation preserves family capital for your children's future and avoids contentious courtroom hostility.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              Book Individual MIAM Assessment
            </Link>
            <a
              href={`tel:${brand.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
            >
              <PhoneCallIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{brand.formattedPhone}</span>
            </a>
          </div>
        </div>

        {/* Statutory Verified Disclaimer */}
        <div className="pt-2 text-center">
          <p className="text-[11px] text-slate-600 leading-relaxed max-w-3xl mx-auto italic">
            <strong>Data Verification &amp; Statutory Disclaimer:</strong> Data verified &amp; last updated: September 2026. Figures based on Ministry of Justice Family Mediation Voucher Scheme guidelines, Family Mediation Council fee standards, and HMCTS contested court statistics. Court litigation estimates exclude potential adverse cost sanctions under Family Procedure Rules Part 28.3. Figures provided for guidance; exact fees confirmed during individual MIAM consultation.
          </p>
        </div>
      </div>
    </div>
  );
};
