'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface MultiStepLeadFormProps {
  cityName: string;
  serviceName: string;
  phone: string;
}

export const MultiStepLeadForm: React.FC<MultiStepLeadFormProps> = ({
  cityName,
  serviceName,
  phone,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'Residential',
    scope: 'Standard',
    zipCode: '',
    fullName: '',
    phoneNumber: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-emerald-500/30 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Dispatch Request Received
        </h3>
        <p className="text-xs text-slate-600 dark:text-zinc-400">
          Our field coordinator for <strong>{cityName}</strong> will contact you at <strong>{formData.phoneNumber}</strong> within 15 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4 mb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Step {step} of 3
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Fast Quote • {cityName}
          </h3>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                step >= s ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Select Property Installation Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Residential', 'Commercial'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, propertyType: type })}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    formData.propertyType === type
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{type}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-3 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Continue to Step 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="form-zip" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Service Postal / Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                id="form-zip"
                type="text"
                required
                placeholder="e.g. 85201"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
              >
                Final Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="form-name" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="form-name"
                type="text"
                required
                placeholder="Your Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="form-phone" className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Contact Telephone <span className="text-red-500">*</span>
              </label>
              <input
                id="form-phone"
                type="tel"
                required
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
              >
                Confirm Dispatch Quote
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
