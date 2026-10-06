import { FlaskConical, BookOpen, CheckCircle2, Store } from 'lucide-react';

const GLANCE_METRICS = [
  {
    value: '45+',
    text: 'Compounds Cataloged',
    detail: 'Complete CAS & monoisotopic formulas',
    icon: FlaskConical,
    color: 'text-sky-300',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
  },
  {
    value: '304',
    text: 'Peer-Reviewed Studies',
    detail: 'Indexed NCBI PubMed citations',
    icon: BookOpen,
    color: 'text-emerald-300',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
  },
  {
    value: '100%',
    text: 'Verified Chemical Entries',
    detail: 'PubChem CID & UniProt referenced',
    icon: CheckCircle2,
    color: 'text-cyan-300',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
  },
  {
    value: '5',
    text: 'Vetted Research Vendors',
    detail: 'Independent reagent partner stores',
    icon: Store,
    color: 'text-amber-300',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
  },
];

export function GlanceBar() {
  return (
    <section className="border-b border-[rgba(141,168,195,0.22)] bg-[#020e24] py-10">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GLANCE_METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#071d42] to-[#04122d] border border-[rgba(141,168,195,0.25)] hover:border-sky-400/60 transition-all shadow-xl space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${item.bg} ${item.border} ${item.color} border shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold bg-[#02102b] px-2.5 py-1 rounded-full border border-[rgba(141,168,195,0.18)]">
                    Audit Metric
                  </span>
                </div>

                <div>
                  <span className="font-mono font-extrabold text-3xl sm:text-4xl text-white tracking-tight block">
                    {item.value}
                  </span>
                  <span className="text-sm font-bold text-slate-100 block mt-1">
                    {item.text}
                  </span>
                  <span className="text-xs font-mono text-slate-300 block mt-0.5">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
