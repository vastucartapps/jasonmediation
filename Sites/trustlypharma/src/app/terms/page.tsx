import Link from 'next/link';
import { FileText, ShieldCheck, Scale, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Trustly Pharma Chemical Index',
  description:
    'Terms of service and legal agreement governing the use of the Trustly Pharma open-access peptide directory, chemical data, and research citation resources.',
};

export default function TermsPage() {
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
              <span className="text-sky-400">Terms of Service</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 mb-4">
              <Scale className="w-3.5 h-3.5" />
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
                <span className="text-sky-400 font-mono text-sm">01.</span> Nature of the Directory
              </h2>
              <p>
                Trustly Pharma operates strictly as an educational and scientific chemical directory. The primary purpose of this portal 
                is the synthesis, indexing, and cross-referencing of molecular identifiers (CAS numbers, PubChem CIDs, UniProt accession codes), 
                chemical formulas, molecular weights, and peer-reviewed PubMed citations for qualified researchers, analytical chemists, and academic institutions.
              </p>
            </div>

            {/* Section 2 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">02.</span> Laboratory Reagent Scope
              </h2>
              <p>
                All compounds, polypeptides, and synthetic analogs documented across Trustly Pharma are referenced in the context of in vitro 
                laboratory research, cell culture assays, chromatographic characterization, and analytical method development. 
                Trustly Pharma does not manufacture, package, distribute, dispense, or vend chemical substances.
              </p>
            </div>

            {/* Section 3 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">03.</span> Independent Commercial Distributor Links
              </h2>
              <p>
                To assist researchers with chemical sourcing, compound detail dossiers provide external hyperlinks to established laboratory reagent distributors: 
                PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, and PharmaLab Global.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-xs text-slate-400">
                <li>These distributors operate as completely separate and independent commercial entities.</li>
                <li>Trustly Pharma has no role in pricing, payment processing, batch synthesis, customs clearance, shipping, or fulfillment.</li>
                <li>Any commercial transactions entered into with external distributors are governed exclusively by their respective commercial terms.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">04.</span> Intellectual Property & Fair Use Citations
              </h2>
              <p>
                Chemical structure data, amino acid sequences, and bibliographic citations indexed on this site are sourced from public domain databases 
                including the National Center for Biotechnology Information (NCBI PubChem / PubMed) and the UniProt Consortium under academic fair-use principles. 
                Editorial synopses, custom computational calculators, and site design are the intellectual property of Trustly Pharma.
              </p>
            </div>

            {/* Section 5 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">05.</span> Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                While the Trustly Pharma curation staff takes rigorous measures to ensure biochemical data, molecular weights, and citations reflect published literature, 
                all data is provided on an &ldquo;as is&rdquo; basis without warranty of any kind. Trustly Pharma shall not be liable for any direct, indirect, incidental, 
                or consequential damages arising from the use of chemical calculations or laboratory protocols referenced herein.
              </p>
            </div>

            {/* Section 6 */}
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400 font-mono text-sm">06.</span> Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of England and Wales. 
                Any legal proceedings arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Summary of Key Terms</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">Directory Purpose</strong>
                  <span className="text-slate-400">Scientific informational resource and literature indexing only.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.18)]">
                  <strong className="text-white block mb-0.5">Independent Vendors</strong>
                  <span className="text-slate-400">All outbound supplier links direct to third-party laboratory vendors.</span>
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
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
