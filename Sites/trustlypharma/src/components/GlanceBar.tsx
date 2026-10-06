import { glance } from '../data/site';

export function GlanceBar() {
  return (
    <section className="border-b border-[rgba(141,168,195,0.18)] bg-[#02102b] py-8">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {glance.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0a2149]/60 border border-[rgba(141,168,195,0.15)] flex flex-col justify-center"
            >
              <span className="font-mono font-extrabold text-2xl sm:text-3xl text-sky-400 tracking-tight">
                {item.value}
              </span>
              <span className="text-xs font-mono text-slate-300 mt-1">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
