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
  return (
    <div className="relative">
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
