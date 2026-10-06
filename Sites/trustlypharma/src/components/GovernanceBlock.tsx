import { governance as d } from '../data/site';
import { ShieldCheck, Scale, Microscope, Building2, CheckCircle2 } from 'lucide-react';

export function GovernanceBlock() {
  const icons = [ShieldCheck, Scale, Microscope];

  return (
    <section className="border-t border-[rgba(141,168,195,0.18)] bg-[#020e24] py-16 md:py-24" aria-label="Scientific Governance">
      <div className="container-wide">
        <div className="rounded-3xl border border-[rgba(141,168,195,0.28)] bg-gradient-to-br from-[#071d42] to-[#04122d] p-8 sm:p-12 shadow-2xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              <span>{d.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Chemical Repository Governance & Standards
            </h2>

            <p className="text-base text-slate-200 leading-relaxed font-medium">
              {d.lede}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {d.columns.map((c, i) => {
              const IconComponent = icons[i] || ShieldCheck;
              return (
                <div
                  key={c.heading}
                  className="p-6 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/50 transition-all space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {c.heading}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[rgba(141,168,195,0.2)] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-300 gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Trustly Pharma Research Directory · London, UK · Open Academic Access</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>OECD GLP & UK REACH Information Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
