import { governance as d } from '../data/site';
import { ShieldCheck, Scale, Microscope } from 'lucide-react';

export function GovernanceBlock() {
  const icons = [ShieldCheck, Scale, Microscope];

  return (
    <section className="bbl-gov" aria-label="Trust, legal and governance">
      <div className="bbl-gov__inner space-y-8">
        <div>
          <div className="bbl-gov__tag">{d.tag}</div>
          <p className="bbl-gov__lede text-sm md:text-base">{d.lede}</p>
        </div>

        <div className="bbl-gov__grid">
          {d.columns.map((c, i) => {
            const IconComponent = icons[i] || ShieldCheck;
            return (
              <div key={c.heading} className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className="w-4 h-4 text-sky-400" />
                  <h3 className="bbl-gov__h !mb-0">{c.heading}</h3>
                </div>
                <p className="bbl-gov__p">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
