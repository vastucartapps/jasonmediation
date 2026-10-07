import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & GDPR | Trustly Pharma',
  description:
    'UK GDPR and Data Protection Act 2018 privacy policy for the Trustly Pharma scientific directory. Transparent data practices and researcher privacy.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020e24] text-slate-100 pb-20">
      {/* Header */}
      <section className="border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638] py-14 md:py-18">
        <div className="container-wide">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-sky-400 transition-colors">
                Index Home
              </Link>
              <span>/</span>
              <span className="text-sky-400">Privacy Policy</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 mb-4">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>DATA PROTECTION & PRIVACY NOTICE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Privacy Policy & Data Governance
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Trustly Pharma operates an open-access scientific chemical database. We are committed to protecting 
              the privacy of researchers, analytical chemists, and academic visitors in full compliance with the UK General Data Protection Regulation (UK GDPR) 
              and the Data Protection Act 2018.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-wide py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8 text-sm text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">01.</span> Data Controller Information
              </h2>
              <p>
                The data controller responsible for the processing of personal data across the Trustly Pharma website is:
              </p>
              <div className="p-4 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] font-mono text-xs space-y-1 text-slate-300">
                <p><strong>Trustly Pharma Scientific Index</strong></p>
                <p>71-75 Shelton Street, Covent Garden</p>
                <p>London, WC2H 9JQ, United Kingdom</p>
                <p>
                  Data Protection Officer:{' '}
                  <span className="select-all font-mono text-sky-400 font-semibold cursor-text">
                    privacy@trustlypharma.co.uk
                  </span>
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">02.</span> Scope of Information Collected
              </h2>
              <p>
                As an open scientific repository, Trustly Pharma operates under a principle of strict data minimization. 
                We do not require user accounts, passwords, or credit card processing on our platform. The data we may process includes:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-400">
                <li>Server access logs (IP address, user agent, requested URI, timestamp) retained for security diagnostics.</li>
                <li>Voluntary contact correspondence (inquiries, chemical errata notices, or citation submissions).</li>
                <li>Aggregated, privacy-preserving analytical metrics collected only upon explicit cookie consent.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">03.</span> Lawful Basis for Processing
              </h2>
              <p>
                Under Article 6 of the UK GDPR, we process technical access logs under our <strong>Legitimate Interests</strong> (Article 6(1)(f)) 
                to ensure system security, prevent bot scraping attacks, and maintain portal availability. 
                Any analytical measurement is performed strictly with your <strong>Consent</strong> (Article 6(1)(a)).
              </p>
            </div>

            {/* Section 4 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">04.</span> Outbound Links & Independent Vendors
              </h2>
              <p>
                Our chemical directory provides outbound references to third-party scientific databases (NCBI PubMed, PubChem) 
                and independent commercial laboratory vendors. When you navigate to an external website, their respective privacy policies 
                and data processing practices govern. We do not transmit visitor identifiers to third-party commercial vendors.
              </p>
            </div>

            {/* Section 5 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">05.</span> Researcher Rights
              </h2>
              <p>
                Under the UK GDPR and Data Protection Act 2018, you possess statutory rights regarding personal data:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-400">
                <li>Request access to any personal data retained in connection with an inquiry.</li>
                <li>Request the rectification or permanent erasure of your correspondence records.</li>
                <li>Lodge a complaint with the UK Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">ico.org.uk</a>.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Key Summary */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              Data Governance Summary & Policies
            </h2>

            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Privacy Commitment</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">No Cookie Profiling</strong>
                  <span className="text-slate-400">We do not employ cross-site tracking cookies or marketing ad pixels.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">Zero Data Selling</strong>
                  <span className="text-slate-400">We never monetize, broker, or transfer visitor records to third parties.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">HTTPS & TLS 1.3</strong>
                  <span className="text-slate-400">All transmissions are encrypted in transit using industry-standard cryptography.</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white">Related Documentation</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/terms/" className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
                    <span>Terms of Service</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link href="/safety/" className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
                    <span>Research Safety Policy</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link href="/about/" className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
                    <span>Database Methodology</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
