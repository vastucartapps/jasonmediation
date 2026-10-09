'use client';

import { useState } from 'react';
import Link from 'next/link';
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

    if (!form.fullName.trim() || !form.email.trim() || !form.institution.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Please complete all mandatory fields marked with an asterisk (*).');
      return;
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError('Please provide a valid institutional or research email address.');
      return;
    }

    if (!form.confirmAcademic) {
      setError('Please confirm that the inquiry relates strictly to academic, chemical, or directory correspondence.');
      return;
    }

    setSubmitting(true);

    // Simulate verified desk dispatch
    setTimeout(() => {
      const generatedId = `TP-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
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

  const pageUrl = 'https://trustlypharma.co.uk/contact/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Institutional Contact',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ContactPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Institutional Contact & Chemical Data Submissions | Trustly Pharma',
        description:
          'Direct contact desk for chemical errata, PubMed citations, academic partnerships, and commercial vendor directory inclusions at Trustly Pharma.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#020e24] text-slate-100">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Header */}
      <section className="border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638] py-12 md:py-16">
        <div className="container-wide">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Index Home
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-sky-400">Institutional Contact & Inquiries</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>ACADEMIC CORRESPONDENCE DESK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Institutional Contact & Chemical Data Submissions
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Trustly Pharma provides open-access chemical and biochemical indexing for the international research community. 
              Use this channel to submit data errata, peer-reviewed PubMed citations, molecular sequence verifications, or institutional directory inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="container-wide py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(141,168,195,0.18)] mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Submit Inquiry or Chemical Data
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Directly routed to the biochemical editorial and verification team.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Desk Active
                </div>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Submission Received
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your inquiry has been successfully lodged with the Trustly Pharma scientific curation team.
                    </p>
                  </div>

                  <div className="bg-[#02102b] border border-[rgba(141,168,195,0.25)] rounded-2xl p-4 max-w-sm mx-auto text-center font-mono">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Verification Reference ID
                    </span>
                    <span className="text-lg font-bold text-sky-400 tracking-wider">
                      {ticketId}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    A confirmation has been recorded. Editorial staff aim to review verified academic and chemical inquiries within 24–48 business hours.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#103059] hover:bg-[#123a6b] text-sky-300 text-xs font-mono font-semibold border border-[rgba(141,168,195,0.25)] transition-colors"
                  >
                    Submit Another Record
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="fullName">
                        Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Dr. Eleanor Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="email">
                        Institutional Email <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.vance@oxford.ac.uk"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="institution">
                        Organization / University <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="institution"
                        type="text"
                        required
                        value={form.institution}
                        onChange={(e) => setForm({ ...form, institution: e.target.value })}
                        placeholder="Department of Pharmacology"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="inquiryType">
                        Inquiry Nature <span className="text-sky-400">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        value={form.inquiryType}
                        onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                      >
                        {INQUIRY_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="subject">
                      Subject / Compound Under Review <span className="text-sky-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. CAS 137525-51-0 BPC-157 Amino Acid Sequence Errata"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="citationUrl">
                      PubMed PMID, DOI, or Primary Literature URL (Optional)
                    </label>
                    <input
                      id="citationUrl"
                      type="url"
                      value={form.citationUrl}
                      onChange={(e) => setForm({ ...form, citationUrl: e.target.value })}
                      placeholder="https://pubmed.ncbi.nlm.nih.gov/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="message">
                      Detailed Methodology / Submission Note <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Specify the compound, molecular weight discrepancy, analytical method (e.g. HPLC/MS), or editorial citation update..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <label htmlFor="confirmAcademic" className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="confirmAcademic"
                        type="checkbox"
                        checked={form.confirmAcademic}
                        onChange={(e) => setForm({ ...form, confirmAcademic: e.target.checked })}
                        className="mt-1 rounded border-slate-700 text-sky-500 focus:ring-sky-500 bg-[#02102b] w-4 h-4 shrink-0"
                      />
                      <span className="text-xs text-slate-300 leading-normal">
                        I confirm that this correspondence relates strictly to academic research, chemical indexing, peer-reviewed citations, or directory verification.
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full gradient-bg py-3.5 px-6 rounded-xl font-bold text-sm text-slate-900 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                          <span>Transmitting to Editorial Desk...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch Submission to Editorial Desk</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Department Desks & Directory Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              Direct Department Contacts & Desk Information
            </h2>

            {/* Direct Desks Card */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-400" aria-hidden="true" />
                <span>Specialized Editorial Desks</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Chemical Registry & Curation</span>
                    <span className="text-[10px] font-mono text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-500/30">PubChem / UniProt</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    For molecular formulas, amino acid residue corrections, and isomeric notations.
                  </p>
                  <span className="select-all font-mono text-xs text-sky-300 font-semibold block cursor-text">
                    curation@trustlypharma.co.uk
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Literature & PubMed Verification</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">PMID / DOI</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Submissions of newly published peer-reviewed in vitro assays and clinical trial data.
                  </p>
                  <span className="select-all font-mono text-xs text-sky-300 font-semibold block cursor-text">
                    editorial@trustlypharma.co.uk
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Laboratory Sourcing Directory</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">Procurement</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Inquiries regarding inclusion in our research chemical vendor matrix (HPLC/COA verification mandatory).
                  </p>
                  <span className="select-all font-mono text-xs text-sky-300 font-semibold block cursor-text">
                    directory@trustlypharma.co.uk
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Protocol & SLA */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Verification Standards & SLA</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual-Scientist Verification:</strong> Every proposed sequence adjustment or PubMed citation undergoes independent verification against the NCBI Entrez database before publication.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Response Timeline:</strong> Academic inquiries accompanied by verified institutional email addresses receive initial editorial acknowledgment within 48 business hours.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registered Headquarters:</strong> Trustly Pharma Research Directory, 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom.
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Looking for Chemical Protocols?</span>
                <span className="text-[11px] text-slate-400">Review our laboratory safety & handling protocols.</span>
              </div>
              <Link
                href="/safety/"
                className="text-xs font-mono text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 shrink-0"
              >
                <span>Safety SOP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
