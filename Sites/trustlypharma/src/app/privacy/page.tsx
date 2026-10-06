import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Trustly Pharma Chemical Index',
  description:
    'UK GDPR and Data Protection Act 2018 privacy policy for the Trustly Pharma scientific directory. Transparent data practices, minimal analytics, and researcher privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020e24] text-slate-100">
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
              <Lock className="w-3.5 h-3.5" />
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
                <p>Data Protection Officer: <a href="mailto:privacy@trustlypharma.co.uk" className="text-sky-400">privacy@trustlypharma.co.uk</a></p>
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
              <ul className="space-y-2 list-disc pl-5 text-xs text-slate-400">
                <li>
                  <strong className="text-slate-200">Institutional Correspondence Data:</strong> Name, professional email address, 
                  academic institution, and message contents submitted voluntarily via our editorial inquiry form.
                </li>
                <li>
                  <strong className="text-slate-200">Technical Server Telemetry:</strong> Anonymized IP addresses, browser user agent strings, 
                  page request timestamps, and HTTP referral headers necessary for DDoS mitigation and server security logging.
                </li>
                <li>
                  <strong className="text-slate-200">Client-Side Calculator State:</strong> Inputs entered into our reconstitution calculator 
                  are processed entirely locally within your browser's JavaScript runtime and are never transmitted to our servers.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">03.</span> Lawful Bases for Processing
              </h2>
              <p>
                Under UK GDPR Article 6, we process technical telemetry under our <strong>Legitimate Interests</strong> (maintaining website security, 
                optimizing resource caching, and preventing automated malicious scraping). Correspondence submissions are processed on the basis of 
                <strong>Consent</strong> provided by the sender at the moment of submission.
              </p>
            </div>

            {/* Section 4 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">04.</span> Outbound External Links & Third Parties
              </h2>
              <p>
                Trustly Pharma provides hyperlinks to external databases (e.g. PubMed/NCBI, PubChem, UniProt) and independent commercial chemical vendors 
                (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global). When clicking an external link, you leave Trustly Pharma and become 
                subject to that external entity’s independent privacy and data collection policies.
              </p>
            </div>

            {/* Section 5 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">05.</span> Your Statutory Rights
              </h2>
              <p>
                Under the UK Data Protection Act 2018, you possess the right to:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-400">
                <li>Request access to any personal data retained in connection with an inquiry.</li>
                <li>Request the rectification or permanent erasure of your correspondence records.</li>
                <li>Lodge a complaint with the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">ico.org.uk</a>.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Key Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/safety/" className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
                    <span>Research Safety Policy</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link href="/about/" className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono">
                    <span>Database Methodology</span>
                    <ArrowRight className="w-3 h-3" />
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
