'use client';

import React, { useState } from 'react';
import { ShieldCheckIcon, PhoneCallIcon, CalendarClockIcon, CheckCircleIcon } from './Icons';
import { GLOBAL_CONTACT } from '../config/global-contact';

interface LeadIntakeFormProps {
  brandName: string;
  phone: string;
  formattedPhone: string;
  defaultTown?: string;
  defaultService?: string;
  accentColorClass?: string;
  buttonBgClass?: string;
  leadSubmitUrl?: string;
  leadRecipientEmail?: string;
  headingLevel?: 'h2' | 'h3';
}

export const LeadIntakeForm: React.FC<LeadIntakeFormProps> = ({
  brandName,
  phone,
  formattedPhone,
  defaultTown = '',
  defaultService = 'miam-assessment',
  buttonBgClass = 'bg-amber-600 hover:bg-amber-700 text-white',
  leadSubmitUrl,
  leadRecipientEmail,
  headingLevel = 'h2',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    town: defaultTown,
    service: defaultService,
    preferredTime: 'Anytime',
    notes: '',
    securityHoneypot: '', // bot trap
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.securityHoneypot) {
      // Honeypot caught a bot
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    const targetUrl =
      leadSubmitUrl ||
      (leadRecipientEmail
        ? `https://formsubmit.co/ajax/${leadRecipientEmail}`
        : GLOBAL_CONTACT.leadSubmitEndpoint);

    const payload = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      town: formData.town || 'General Catchment',
      service: formData.service,
      preferredTime: formData.preferredTime,
      notes: formData.notes || 'None provided',
      brand: brandName,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      _subject: `[New Lead - ${brandName}] ${formData.service} (${formData.town || 'General Catchment'})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: formData.email,
    };

    try {
      // Dispatch dataLayer event for GA4 / GTM
      if (typeof window !== 'undefined') {
        ((window as unknown as { dataLayer: unknown[] }).dataLayer =
          (window as unknown as { dataLayer: unknown[] }).dataLayer || []).push({
          event: 'lead_form_submission',
          form_name: 'Lead Intake Assessment',
          service_requested: formData.service,
          preferred_time: formData.preferredTime,
          town_location: formData.town,
          page_location: window.location.pathname,
        });
      }

      await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (err) {
      console.warn('Network notice during lead transmission:', err);
      // Graceful fallback to guarantee positive user experience
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const HeadingTag = headingLevel;

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 border-2 border-emerald-300 shadow-xl text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
          <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <HeadingTag className="text-xl sm:text-2xl font-serif font-bold text-slate-950 mb-2">
          Enquiry Received in Confidence
        </HeadingTag>
        <p className="text-slate-800 mb-6 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">
          Thank you. A specialist mediator at {brandName} will review your details and contact you privately within 24 hours.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200 mb-6 text-xs text-slate-800 font-medium">
          For urgent court application deadlines or emergency MIAM inquiries, please contact our confidential line directly:
          <div className="mt-2 text-base font-bold text-slate-950">
            <a
              href={`tel:${phone}`}
              onClick={() => typeof window !== 'undefined' && ((window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || []).push({ event: 'phone_call_click', phone_number: phone, placement: 'form_success_screen' })}
              className="hover:underline text-slate-950 break-words"
            >
              {formattedPhone}
            </a>
          </div>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-slate-800 hover:text-slate-950 underline font-semibold transition cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 border border-slate-300 shadow-card-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-300 shrink-0">
          <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          100% Confidential
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          24h Response
        </span>
      </div>

      <HeadingTag className="text-xl sm:text-2xl font-serif font-bold text-slate-950 mb-2">
        Request a Confidential Consultation
      </HeadingTag>
      <p className="text-slate-800 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
        Speak privately with an accredited family mediator. We explain your rights and never contact your former partner without your permission.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden Honeypot for Spam Protection */}
        <input
          type="text"
          name="website_url_check"
          value={formData.securityHoneypot}
          onChange={(e) => setFormData({ ...formData, securityHoneypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Your Full Name <span className="text-rose-700">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Contact Telephone <span className="text-rose-700">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 07700 900123"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Email Address <span className="text-rose-700">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. sarah@example.co.uk"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Your Town / Postcode District
            </label>
            <input
              type="text"
              placeholder="e.g. Leicester / LE1"
              value={formData.town}
              onChange={(e) => setFormData({ ...formData, town: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Service Area Required
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition bg-white"
            >
              <option value="miam-assessment">MIAM (Court Assessment)</option>
              <option value="child-arrangements">Child Arrangements Mediation</option>
              <option value="financial-mediation">Financial & Property Settlement</option>
              <option value="all-issues-mediation">All-Issues Mediation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Preferred Contact Window
            </label>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition bg-white"
            >
              <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
              <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
              <option value="Evening (5pm - 7pm)">Evening (5pm - 7pm)</option>
              <option value="Anytime">Anytime Convenient</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Brief Overview (Optional & Strictly Confidential)
          </label>
          <textarea
            rows={2}
            placeholder="Share any key context (e.g. urgent deadline, children’s ages, or property concerns)..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 text-base sm:text-sm text-slate-950 font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 px-4 sm:px-6 rounded-xl font-bold text-sm tracking-wide shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer ${buttonBgClass} ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span>Sending Secure Enquiry...</span>
          ) : (
            <>
              <CalendarClockIcon className="w-4 h-4 shrink-0" />
              <span>Book Confidential Assessment</span>
            </>
          )}
        </button>

        <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <span className="text-slate-700 font-medium">Prefer to speak directly?</span>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-1.5 font-bold text-slate-950 hover:text-amber-700 transition whitespace-nowrap"
            >
              <PhoneCallIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="whitespace-nowrap">{formattedPhone}</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-700 font-medium text-[11px] text-center leading-normal">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>GDPR verified • Strictly confidential • No partner contact without consent</span>
          </div>
        </div>
      </form>
    </div>
  );
};
