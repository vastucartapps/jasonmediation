'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_METADATA } from '@/data/site';
import {
  Mail,
  Building2,
  FileCheck2,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

interface FormState {
  fullName: string;
  email: string;
  institution: string;
  inquiryType: string;
  subject: string;
  message: string;
  citationUrl: string;
  confirmAcademic: boolean;
}

const INQUIRY_TYPES = [
  { value: 'errata', label: 'Chemical Data / CAS / Sequence Errata' },
  { value: 'citation', label: 'Peer-Reviewed PubMed Citation Addition' },
  { value: 'academic', label: 'Academic & Institutional Collaboration' },
  { value: 'directory', label: 'Commercial Laboratory Directory Inclusion' },
  { value: 'calculator', label: 'Reconstitution Calculator Algorithm Inquiry' },
  { value: 'general', label: 'General Scientific Registry Inquiry' },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    institution: '',
    inquiryType: 'errata',
    subject: '',
    message: '',
    citationUrl: '',
    confirmAcademic: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.institution.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setError('Please complete all mandatory fields marked with an asterisk (*).');
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError('Please provide a valid institutional or research email address.');
      return;
    }

    if (!form.confirmAcademic) {
      setError(
        'Please confirm that your correspondence relates strictly to academic, chemical, or directory correspondence.'
      );
      return;
    }

    setSubmitting(true);

    // Simulate instant ticket dispatch
    setTimeout(() => {
      const generatedId = `PUK-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      institution: '',
      inquiryType: 'errata',
      subject: '',
      message: '',
      citationUrl: '',
      confirmAcademic: false,
    });
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Contact &amp; Institutional Inquiries</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-benzene-washout">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Mail className="w-3.5 h-3.5" />
          <span>Scientific Correspondence &amp; Editorial Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact Peptides UK Editorial Desk
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          The registry welcomes communications from academic investigators, university research departments,
          contract testing laboratories, and certified chemical suppliers. Use this portal to report chemical errata,
          suggest PubMed literature additions, or apply for commercial directory benchmarking.
        </p>
      </div>

      {/* Main Grid: Form + Institutional Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Dispatch Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Submit Scientific Inquiry or Errata
            </h2>
            <p className="text-xs text-slate-600 font-mono mt-1">
              Standard Response Window: 1 – 2 Business Days (Monday – Friday, GMT)
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-4 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-emerald-950">Correspondence Logged</h3>
                <p className="text-xs text-emerald-800 font-mono">
                  Assigned Reference Ticket: <strong className="text-emerald-950">{ticketId}</strong>
                </p>
              </div>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you for your submission. The chemical registrar has received your dispatch. A confirmation
                notice and formal response will be routed to <strong className="text-emerald-950">{form.email}</strong>.
              </p>
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Dr. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.vance@ucl.ac.uk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Institution / Organization *</label>
                  <input
                    type="text"
                    required
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                    placeholder="University College London / Imperial"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Inquiry Category *</label>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                  >
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Subject Line *</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Errata Notice: BPC-157 CAS Registry Number"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Detailed Message / Chemical Errata Specification *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Provide precise details, batch numbers, sequence fragments, or journal citations..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Supporting URL / DOI / PubMed PMID (Optional)
                </label>
                <input
                  type="url"
                  value={form.citationUrl}
                  onChange={(e) => setForm({ ...form, citationUrl: e.target.value })}
                  placeholder="https://pubmed.ncbi.nlm.nih.gov/12345678/ or DOI link"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.confirmAcademic}
                    onChange={(e) => setForm({ ...form, confirmAcademic: e.target.checked })}
                    className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700 border-slate-300"
                  />
                  <span className="text-[11px] text-slate-700 leading-relaxed">
                    I confirm this inquiry relates strictly to academic research, chemical registry data, or vendor
                    directory inclusion. I acknowledge that Peptides-UK does not provide personal health, dosage,
                    or clinical advice.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Dispatching...' : 'Submit Inquiry to Registry Desk'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Institutional Desk Directory */}
        <div className="lg:col-span-5 space-y-6">
          {/* Strict Non-Clinical Warning */}
          <div className="p-6 bg-amber-50/90 border border-amber-200 rounded-3xl space-y-2 text-xs">
            <div className="font-mono font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Strict Non-Clinical Warning</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Do not submit clinical dosage inquiries, individual medical treatment requests, or personal human health
              questions. Peptides-UK is an academic chemical registry. In accordance with the Human Medicines Regulations
              2012, all clinical inquiries are immediately discarded without response.
            </p>
          </div>

          {/* Departmental Directory Cards */}
          <div className="card-inner-elevated p-6 space-y-4 text-xs">
            <div className="font-mono font-bold uppercase text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Departmental Correspondence Routing</span>
            </div>

            <div className="space-y-3 font-mono">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900 font-sans">Chemical Editorial &amp; Errata Desk</div>
                <div className="text-slate-600 text-[11px]" dangerouslySetInnerHTML={{ __html: '<!--email_off-->errata@peptides-uk.org<!--/email_off-->' }} />
                <div className="text-[10px] text-slate-600">CAS validation, IUPAC nomenclature, sequence checks</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900 font-sans">Commercial Audit &amp; Supplier Matrix</div>
                <div className="text-slate-600 text-[11px]" dangerouslySetInnerHTML={{ __html: '<!--email_off-->vendors@peptides-uk.org<!--/email_off-->' }} />
                <div className="text-[10px] text-slate-600">HPLC baseline verification, European CRO audits</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900 font-sans">Statutory &amp; Legal Inquiries</div>
                <div className="text-slate-600 text-[11px]" dangerouslySetInnerHTML={{ __html: '<!--email_off-->compliance@peptides-uk.org<!--/email_off-->' }} />
                <div className="text-[10px] text-slate-600">MHRA regulatory cross-checks, COSHH safety guidelines</div>
              </div>
            </div>
          </div>

          {/* Operating Hours & Jurisdiction */}
          <div className="card-inner-elevated p-6 space-y-2 text-xs font-mono text-slate-700">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>Registry Operating Hours</span>
            </div>
            <div>Monday – Friday, 08:30 – 17:30 GMT</div>
            <div className="text-[11px] text-slate-600">Jurisdiction: United Kingdom (England &amp; Wales)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
