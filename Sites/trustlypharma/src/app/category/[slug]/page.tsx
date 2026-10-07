import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  RESEARCH_CATEGORIES,
  getCategoryBySlug,
  getCompoundsByCategory,
} from '../../../data';
import { FORMAT_PROFILES } from '../../../data/formats';
import {
  ChevronRight,
  ArrowRight,
  Atom,
  Dna,
  BookOpen,
  FlaskConical,
  Activity,
  Layers,
  ThermometerSnowflake,
  ExternalLink,
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESEARCH_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Trustly Pharma',
    };
  }

  const shortName = category.name.length > 30 ? category.name.split('&')[0].trim() : category.name;
  const rawTitle = `${category.name} Peptides | Trustly Pharma`;
  const finalTitle = rawTitle.length <= 60 ? rawTitle : `${shortName} Peptides | Trustly Pharma`;

  return {
    title: finalTitle,
    description: `${category.headline}. Preclinical data, molecular mechanisms, formulas, and laboratory vendor links.`.slice(0, 155),
  };
}

export default async function CategoryHubPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const compounds = getCompoundsByCategory(slug);
  const otherCategories = RESEARCH_CATEGORIES.filter((c) => c.slug !== slug);

  // Aggregate citations from compounds in this category
  const allCitations = compounds.flatMap((c) =>
    c.citations.map((cite) => ({
      ...cite,
      compoundName: c.name,
      compoundSlug: c.slug,
    }))
  );

  return (
    <div className="relative pb-24 bg-[#020e24] text-slate-100 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#02102b] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/#categories" className="hover:text-sky-400 transition-colors">
              Pathways
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] via-[#03153b] to-[#041638]">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="container-wide relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Atom className="w-3.5 h-3.5" />
            <span>BIOLOGICAL SIGNALING AXIS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {category.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid sm:grid-cols-3 gap-4 pt-4 max-w-4xl">
            <div className="p-4 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.2)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Indexed Compounds
              </span>
              <span className="text-2xl font-mono font-extrabold text-white">
                {compounds.length} Compounds
              </span>
              <span className="text-[11px] text-sky-400 block mt-0.5">
                Full Chemical Dossiers
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.2)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                PubMed Citations
              </span>
              <span className="text-2xl font-mono font-extrabold text-emerald-400">
                {allCitations.length} Studies
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Peer-Reviewed Literature
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.2)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Verification Tier
              </span>
              <span className="text-2xl font-mono font-extrabold text-amber-400">
                100% HPLC/MS
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Assayed Reagent Standards
              </span>
            </div>
          </div>

          {/* Signaling Target Card */}
          <div className="p-5 rounded-2xl bg-[#071b3e] border border-[rgba(141,168,195,0.25)] max-w-4xl space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>Core Receptor Cascade & Cellular Targets:</span>
            </span>
            <p className="text-xs sm:text-sm font-mono text-sky-300 leading-relaxed">
              {category.signalingFocus}
            </p>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="container-wide mt-12 space-y-16">
        {/* Section 1: Compounds Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Dna className="w-5 h-5 text-sky-400" />
                <span>Indexed Compounds in {category.name}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Select a peptide to review molecular formulas, amino acid sequences, and verified commercial sourcing links.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {compounds.length} Active Dossiers
            </span>
          </div>

          {compounds.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0a2149] border border-[rgba(141,168,195,0.18)] text-center text-slate-400">
              Compounds in this category are currently undergoing analytical sequence verification.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compounds.map((compound) => (
                <div
                  key={compound.slug}
                  className="rounded-3xl p-6 card-paper border border-[rgba(141,168,195,0.2)] hover:border-sky-400 transition-all flex flex-col justify-between space-y-5 group shadow-lg"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-400">
                        CAS {compound.casNumber}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#02102b] text-sky-400 border border-[rgba(141,168,195,0.15)]">
                        MW: {compound.molecularWeight.split(' ')[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        <Link
                          href={`/peptides/${compound.slug}/`}
                          className="hover:text-sky-300 transition-colors block"
                        >
                          {compound.name}
                        </Link>
                      </h3>
                      <span className="text-xs text-slate-400 font-mono line-clamp-1 mt-0.5">
                        {compound.systematicName}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.12)] font-mono text-xs flex items-center justify-between">
                      <span className="text-slate-400">Formula:</span>
                      <span className="text-emerald-400 font-bold">{compound.molecularFormula}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {compound.shortOverview}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[rgba(141,168,195,0.18)]">
                    <div className="flex flex-wrap gap-1">
                      {compound.availableFormats.map((fmt) => (
                        <span
                          key={fmt}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#02102b] text-slate-300 border border-[rgba(141,168,195,0.1)]"
                        >
                          {FORMAT_PROFILES[fmt].label.split(' ')[0]}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/peptides/${compound.slug}/`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-[#103059] group-hover:text-white group-hover:bg-[#123a6b] transition-all border border-[rgba(141,168,195,0.25)]"
                    >
                      <span>Inspect Profile & Sourcing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Biological Signaling Pathway Details */}
        <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-7 md:p-9 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest block">
                Biochemical Architecture
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Cellular Signaling Mechanisms & In Vitro Cascades
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <span className="font-mono text-xs font-bold text-sky-400">Phase 1: Receptor Binding</span>
              <h3 className="text-sm font-bold text-white">Transmembrane Affinity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Selective binding to primary G-protein coupled receptors (GPCRs), receptor tyrosine kinases (RTKs), or ionotropic complexes initiating intracellular phosphorylation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-400">Phase 2: Signal Transduction</span>
              <h3 className="text-sm font-bold text-white">Second Messenger Activation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cascade phosphorylation via MAP kinase, PI3K/Akt, or adenylate cyclase pathways, modulating cytosolic calcium levels and nuclear transcription factor recruitment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] space-y-2">
              <span className="font-mono text-xs font-bold text-amber-400">Phase 3: Phenotypic Outcome</span>
              <h3 className="text-sm font-bold text-white">Transcriptional Synthesis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upregulation of specific mRNA transcripts for structural proteins, angiogenic mediators, or neurotrophins documented across in vitro and pre-clinical assays.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Peer-Reviewed Literature Matrix */}
        {allCitations.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(141,168,195,0.18)]">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Peer-Reviewed PubMed Literature Index</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Primary publications documenting the molecular kinetics and assays of compounds in this axis.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {allCitations.length} Indexed Studies
              </span>
            </div>

            <div className="space-y-4">
              {allCitations.map((cite, idx) => (
                <div
                  key={cite.pubmedId || idx}
                  className="p-5 rounded-2xl bg-[#071b3e] border border-[rgba(141,168,195,0.2)] flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/peptides/${cite.compoundSlug}/`}
                        className="text-xs font-mono font-bold text-sky-400 bg-sky-950/50 px-2.5 py-0.5 rounded border border-sky-500/30 hover:border-sky-400 transition-colors"
                      >
                        {cite.compoundName}
                      </Link>
                      <span className="text-xs font-mono text-slate-400">
                        {cite.journal} ({cite.year})
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {cite.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-mono">
                      {cite.authors}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-[rgba(141,168,195,0.15)]">
                      <strong className="text-slate-200">Key Finding: </strong>
                      {cite.keyFindings}
                    </p>
                  </div>

                  {cite.pubmedId && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${cite.pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#02102b] hover:bg-[#103059] border border-[rgba(141,168,195,0.25)] text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors shrink-0 self-start"
                    >
                      <span>PMID {cite.pubmedId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Laboratory Handling & Storage Advice */}
        <section className="rounded-3xl border border-[rgba(141,168,195,0.25)] bg-[#071b3e] p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block">
                Laboratory Practice
              </span>
              <h2 className="text-lg font-bold text-white">
                Storage & Reconstitution Parameters for {category.name}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Lyophilized peptides cataloged in this pathway should be preserved at -20°C in desiccated containment. 
            Upon reconstitution with Bacteriostatic Water or sterile isotonic saline, maintain solutions at 2°C to 8°C. 
            Avoid repetitive freeze-thaw cycles which induce mechanical shearing of tertiary amino acid conformations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/#calculator"
              className="text-xs font-mono font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
            >
              <span>Launch Dilution Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-slate-600">·</span>
            <Link
              href="/safety/"
              className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              <span>View Full Research Safety Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Section 5: Other Research Pathways Exploration */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Explore Other Research Pathways
            </h2>
            <Link
              href="/#categories"
              className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>All Pathways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="p-5 rounded-2xl bg-[#071b3e] border border-[rgba(141,168,195,0.2)] hover:border-sky-400 transition-all block group"
              >
                <span className="text-[11px] font-mono text-sky-400 block mb-1">
                  Pathways Directory
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {c.headline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
