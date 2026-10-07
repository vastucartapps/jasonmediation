import { Hero } from '../components/Hero';
import { WhatThisIs } from '../components/WhatThisIs';
import { GlanceBar } from '../components/GlanceBar';
import { WhatChanged } from '../components/WhatChanged';
import { EvidenceMap } from '../components/EvidenceMap';
import { ReconstitutionCalculator } from '../components/ReconstitutionCalculator';
import { RatedPlainly } from '../components/RatedPlainly';
import { SmarterBuyer } from '../components/SmarterBuyer';
import { DataTrackers } from '../components/DataTrackers';
import { FreshnessStamp } from '../components/FreshnessStamp';
import { GovernanceBlock } from '../components/GovernanceBlock';

export default function HomePage() {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://trustlypharma.co.uk/#webpage',
        url: 'https://trustlypharma.co.uk/',
        name: 'Trustly Pharma | UK & International Peptide Index & Chemical Encyclopedia',
        description:
          'Curated PubChem molecular profiles, peer-reviewed PubMed citations, verified laboratory preparation standards, and independent commercial vendor directories for scientific research.',
        about: [
          {
            '@type': 'DefinedTermSet',
            name: 'Synthetic Peptide Research Nomenclature',
            hasDefinedTerm: [
              {
                '@type': 'DefinedTerm',
                name: 'BPC-157',
                termCode: '137525-51-0',
                description: 'Body Protection Compound 157 Pentadecapeptide for microvascular and angiogenic laboratory models.',
              },
              {
                '@type': 'DefinedTerm',
                name: 'TB-500',
                termCode: '77591-33-4',
                description: 'Thymosin Beta-4 synthetic fragment investigating actin sequestration and wound recovery.',
              },
              {
                '@type': 'DefinedTerm',
                name: 'Semaglutide',
                termCode: '910463-68-2',
                description: 'GLP-1 receptor agonist investigating metabolic signalling and glycemic modulation.',
              },
              {
                '@type': 'DefinedTerm',
                name: 'RP-HPLC Assay Purity',
                description: 'Reversed-Phase High-Performance Liquid Chromatography analytical purity verification standard ≥98.0%.',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="relative">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* 1. Academic Encyclopedia Hero with Verified Scientific Sources */}
      <Hero />

      {/* 2. Database Architecture & Methodology */}
      <WhatThisIs />

      {/* 3. At a Glance Stats Strip */}
      <GlanceBar />

      {/* 4. What Changed (Live 2026 UK Regulatory Feed) */}
      <WhatChanged />

      {/* 5. The Clinical Proof Evidence Map */}
      <EvidenceMap />

      {/* 6. Interactive Reconstitution & Syringe Calculator */}
      <section className="border-b border-[rgba(141,168,195,0.18)] bg-[#03132e] py-16 md:py-24">
        <div className="container-wide">
          <ReconstitutionCalculator />
        </div>
      </section>

      {/* 7. Evidence Rated Plainly (Popular Compounds) */}
      <RatedPlainly />

      {/* 8. Smarter Buyer Quality Benchmarks */}
      <SmarterBuyer />

      {/* 9. Live Data & Regulatory Trackers */}
      <DataTrackers />

      {/* 10. Audit Freshness & Governance Stamp */}
      <FreshnessStamp />

      {/* 11. Governance & Corporate Standards */}
      <GovernanceBlock />
    </div>
  );
}
