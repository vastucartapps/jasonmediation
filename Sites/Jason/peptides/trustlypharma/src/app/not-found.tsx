import Link from 'next/link';
import { FlaskConical, ArrowLeft, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#020e24] text-slate-100">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="inline-flex p-4 rounded-3xl bg-[#071b3e] border border-[rgba(141,168,195,0.25)] text-sky-400 shadow-xl">
          <FlaskConical className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold block">
            Error 404 · Unresolved Endpoint
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Research Record Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
            The requested chemical monograph, regulatory briefing, or vendor reference does not exist or has been relocated within the Trustly Pharma directory.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#041638] border border-[rgba(141,168,195,0.2)] space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Navigation & Chemical Directory Assistance
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="gradient-bg px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-900 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Index</span>
            </Link>
            <Link
              href="/#categories"
              className="px-5 py-2.5 rounded-xl bg-[#02102b] hover:bg-[#071d42] border border-[rgba(141,168,195,0.25)] text-slate-200 font-mono text-xs font-bold inline-flex items-center gap-2 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span>Browse Signaling Pathways</span>
            </Link>
            <Link
              href="/regulatory/"
              className="px-5 py-2.5 rounded-xl bg-[#02102b] hover:bg-[#071d42] border border-[rgba(141,168,195,0.25)] text-slate-200 font-mono text-xs font-bold inline-flex items-center gap-2 transition-colors"
            >
              <span>Regulatory Hub</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
