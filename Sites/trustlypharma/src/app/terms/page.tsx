import Link from 'next/link';
import type { Metadata } from 'next';
import { FileText, ShieldCheck, Scale, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Research Policy | Trustly Pharma',
  description:
    'Terms of use and analytical research disclaimers for the Trustly Pharma chemical repository. Guidelines on data integrity and independent lab vendors.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/terms/',
  },
};

export default function TermsPage() {
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
              <span className="text-sky-400">Terms of Service</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 mb-4">
              <Scale className="w-3.5 h-3.5" aria-hidden="true" />
              <span>LEGAL TERMS & DIRECTORY CONDITIONS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Terms of Service & Scientific Usage Policy
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              These terms govern your access to and use of the Trustly Pharma chemical repository, molecular sequence directory, 
              dilution calculation algorithms, and outbound chemical distributor index.
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
                <span className="text-sky-400 font-mono text-sm">01.</span> Nature of the Repository
              </h2>
              <p>
                Trustly Pharma provides open-access chemical information, CAS identifiers, empirical formulas, and peer-reviewed 
                literature summaries strictly for laboratory research, analytical biochemistry, and educational reference. 
                Trustly Pharma is not a pharmacy, manufacturer, or direct seller of synthetic peptides.
              </p>
            </div>

            {/* Section 2 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">02.</span> No Clinical or Medical Advice
              </h2>
              <p>
                Information cataloged on this portal does not constitute medical, veterinary, or clinical advice. 
                Peptide compounds described are handled strictly as investigational chemical reagents for in vitro and laboratory assays. 
                Materials indexed on this platform are not approved for human or veterinary administration, diagnosis, or therapeutic treatment.
              </p>
            </div>

            {/* Section 3 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">03.</span> Independent Vendor Directories
              </h2>
              <p>
                Outbound links to commercial chemical vendors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) 
                are provided as independent catalog references. Trustly Pharma exercises no operational control over external vendor stock, 
                dispatch logistics, or batch testing execution.
              </p>
            </div>

            {/* Section 4 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">04.</span> Intellectual Property & Citations
              </h2>
              <p>
                All editorial syntheses, layout architectures, and calculation software algorithms are proprietary to Trustly Pharma. 
                Primary scientific data (CAS numbers, PubChem CIDs, PubMed PMIDs) remain in the public domain and are referenced under 
                academic fair-use conventions.
              </p>
            </div>

            {/* Section 5 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">05.</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted under the laws of England and Wales, Trustly Pharma and its contributors disclaim liability 
                for direct, indirect, or consequential damages resulting from the analytical use or laboratory interpretation of cataloged data.
              </p>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              Institutional Terms & Inquiries
            </h2>

            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" aria-hidden="true" />
                <span>Summary of Key Terms</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">Directory Purpose</strong>
                  <span className="text-slate-400">Scientific informational resource and literature indexing only.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">Independent Vendors</strong>
                  <span className="text-slate-400">All outbound vendor links direct to independent third-party laboratory vendors.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">English Jurisdiction</strong>
                  <span className="text-slate-400">Governed under the laws of England and Wales.</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white">Inquiries or Clarifications</h3>
              <p className="text-xs text-slate-400">
                For questions regarding academic citations, IP fair-use, or legal inquiries:
              </p>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 font-bold"
              >
                <span>Contact Legal / Editorial</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
