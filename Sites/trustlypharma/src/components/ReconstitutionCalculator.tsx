'use client';

import { useState } from 'react';
import { Droplets, Calculator, CheckCircle2, RotateCcw, Syringe, Sparkles, Scale } from 'lucide-react';

interface ReconstitutionCalculatorProps {
  initialVialMg?: number;
  initialDoseMcg?: number;
  className?: string;
}

type SyringeCapacity = 0.3 | 0.5 | 1.0;

export function ReconstitutionCalculator({
  initialVialMg = 5,
  initialDoseMcg = 250,
  className = '',
}: ReconstitutionCalculatorProps) {
  const [vialMg, setVialMg] = useState<number>(initialVialMg);
  const [waterMl, setWaterMl] = useState<number>(2);
  const [doseMcg, setDoseMcg] = useState<number>(initialDoseMcg);
  const [syringeCapacity, setSyringeCapacity] = useState<SyringeCapacity>(1.0);

  // Calculations
  const concentrationMcgPerMl = waterMl > 0 ? (vialMg * 1000) / waterMl : 0;
  const volumeMlPerDose = concentrationMcgPerMl > 0 ? doseMcg / concentrationMcgPerMl : 0;
  // Standard U-100 syringe has 100 units per mL
  const unitsPerDose = volumeMlPerDose * 100;
  const maxUnitsForSyringe = syringeCapacity * 100;
  const fillPercentage = Math.min(100, Math.max(0, (unitsPerDose / maxUnitsForSyringe) * 100));
  const totalDoses = doseMcg > 0 ? (vialMg * 1000) / doseMcg : 0;

  const handleReset = () => {
    setVialMg(5);
    setWaterMl(2);
    setDoseMcg(250);
    setSyringeCapacity(1.0);
  };

  return (
    <div
      id="calculator"
      className={`rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6 scroll-mt-24 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[rgba(141,168,195,0.2)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE LABORATORY DILUTION TOOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Peptide Dilution & Reconstitution Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
            Compute stock concentrations, micro-pipetting draw volumes, and U-100 syringe units with zero procedural guesswork.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-white bg-[#0a2347] hover:bg-[#103059] border border-sky-400/30 self-start sm:self-auto transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
          <span>Reset Calculator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 Input Parameters + Formula Equation Box */}
        <div className="lg:col-span-6 space-y-5">
          {/* 1. Vial Amount */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#031535] border border-[rgba(141,168,195,0.25)] space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-400 text-xs font-mono font-extrabold flex items-center justify-center">1</span>
                <span>Lyophilized Vial Mass</span>
              </label>
              <span className="px-3 py-1 rounded-xl bg-sky-500/15 border border-sky-400/35 font-mono text-sky-300 font-bold text-sm shadow-sm">{vialMg} mg</span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[2, 5, 10, 15].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setVialMg(mg)}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                    vialMg === mg
                      ? 'bg-sky-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-[#0a2347] text-slate-200 border border-[rgba(141,168,195,0.25)] hover:border-sky-400'
                  }`}
                >
                  {mg} mg
                </button>
              ))}
            </div>
            <div className="pt-1">
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={vialMg}
                onChange={(e) => setVialMg(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg accent-sky-400 cursor-pointer"
              />
            </div>
          </div>

          {/* 2. Bacteriostatic Water Added */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#031535] border border-[rgba(141,168,195,0.25)] space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-400 text-xs font-mono font-extrabold flex items-center justify-center">2</span>
                <span>Reconstitution Solvent Added</span>
              </label>
              <span className="px-3 py-1 rounded-xl bg-sky-500/15 border border-sky-400/35 font-mono text-sky-300 font-bold text-sm shadow-sm">{waterMl} mL</span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[1, 2, 2.5, 3].map((ml) => (
                <button
                  key={ml}
                  type="button"
                  onClick={() => setWaterMl(ml)}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                    waterMl === ml
                      ? 'bg-sky-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-[#0a2347] text-slate-200 border border-[rgba(141,168,195,0.25)] hover:border-sky-400'
                  }`}
                >
                  {ml} mL
                </button>
              ))}
            </div>
            <div className="pt-1">
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={waterMl}
                onChange={(e) => setWaterMl(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg accent-sky-400 cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Target Aliquot */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#031535] border border-[rgba(141,168,195,0.25)] space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-mono font-extrabold flex items-center justify-center">3</span>
                <span>Target Aliquot / Test Mass</span>
              </label>
              <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-400/35 font-mono text-amber-300 font-bold text-sm shadow-sm">{doseMcg} mcg</span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[100, 250, 500, 1000].map((mcg) => (
                <button
                  key={mcg}
                  type="button"
                  onClick={() => setDoseMcg(mcg)}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                    doseMcg === mcg
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-[#0a2347] text-slate-200 border border-[rgba(141,168,195,0.25)] hover:border-amber-400'
                  }`}
                >
                  {mcg} mcg
                </button>
              ))}
            </div>
            <div className="pt-1">
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={doseMcg}
                onChange={(e) => setDoseMcg(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Syringe Barrel Specification */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#031535] border border-[rgba(141,168,195,0.25)] space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <label className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-mono font-extrabold flex items-center justify-center">4</span>
                <Syringe className="w-4 h-4 text-emerald-400" />
                <span>Syringe Barrel Calibration (U-100)</span>
              </label>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-400/35 font-mono text-emerald-300 font-bold text-sm shadow-sm">
                {maxUnitsForSyringe} Units Capacity
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { cap: 0.3 as SyringeCapacity, label: '0.3 mL (30 U)', sub: '0.5U precision' },
                { cap: 0.5 as SyringeCapacity, label: '0.5 mL (50 U)', sub: '1.0U standard' },
                { cap: 1.0 as SyringeCapacity, label: '1.0 mL (100 U)', sub: 'High volume' },
              ].map((item) => (
                <button
                  key={item.cap}
                  type="button"
                  onClick={() => setSyringeCapacity(item.cap)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-mono text-center transition-all ${
                    syringeCapacity === item.cap
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md scale-[1.02]'
                      : 'bg-[#0a2347] text-slate-200 border border-[rgba(141,168,195,0.25)] hover:border-emerald-400'
                  }`}
                >
                  <div className="font-bold">{item.label}</div>
                  <div className="text-[11px] opacity-85 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Live Mathematical Equation Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#02102b] border border-sky-500/35 space-y-3 font-mono shadow-inner">
            <span className="text-xs uppercase text-sky-300 font-bold tracking-wider block border-b border-[rgba(141,168,195,0.18)] pb-2">
              Dilution Formula Derivation:
            </span>
            <div className="text-slate-200 text-xs sm:text-sm space-y-2 leading-relaxed">
              <div className="flex flex-wrap items-center gap-1.5">
                <span>Concentration =</span>
                <span className="text-white font-semibold">{(vialMg * 1000).toLocaleString()} mcg</span>
                <span>÷</span>
                <span className="text-white font-semibold">{waterMl} mL</span>
                <span>=</span>
                <strong className="text-sky-300 font-bold bg-sky-950/70 px-2.5 py-0.5 rounded-lg border border-sky-500/30 font-mono">{concentrationMcgPerMl.toFixed(0)} mcg/mL</strong>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span>Draw Volume =</span>
                <span className="text-white font-semibold">{doseMcg} mcg</span>
                <span>÷</span>
                <span className="text-white font-semibold">{concentrationMcgPerMl.toFixed(0)} mcg/mL</span>
                <span>=</span>
                <strong className="text-emerald-300 font-bold bg-emerald-950/70 px-2.5 py-0.5 rounded-lg border border-emerald-500/30 font-mono">{volumeMlPerDose.toFixed(3)} mL</strong>
                <span className="text-slate-300 font-normal">
                  (<strong className="text-emerald-300 font-bold">{unitsPerDose.toFixed(1)} Units</strong>)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Output, Visual Syringe Fill & Handling Protocols */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#071d42] to-[#03112c] border border-[rgba(141,168,195,0.3)] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.2)]">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-sky-300 font-bold">
              Volumetric Dispensing Calibration
            </span>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
              U-100 Standard
            </span>
          </div>

          {/* Primary Result Box */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.25)] text-center space-y-3 shadow-md">
            <span className="text-xs sm:text-sm font-mono text-slate-300 uppercase tracking-wider block font-semibold">
              Draw to on {syringeCapacity} mL U-100 Syringe:
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold font-mono text-emerald-300 tracking-tight">
              {unitsPerDose.toFixed(1)}{' '}
              <span className="text-2xl font-normal text-slate-300">Units</span>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-300 pt-1">
              Exact Liquid Volume:{' '}
              <strong className="text-white">{volumeMlPerDose.toFixed(3)} mL</strong> (approx.{' '}
              {unitsPerDose.toFixed(0)} tick marks)
            </div>

            {/* Visual Syringe Barrel Gauge Bar */}
            <div className="pt-3 space-y-2">
              <div className="w-full h-3.5 rounded-full bg-[#0a2347] border border-[rgba(141,168,195,0.2)] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>0 U</span>
                <span className="font-semibold text-sky-300">Barrel Fill: {fillPercentage.toFixed(0)}%</span>
                <span>{maxUnitsForSyringe} U</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4.5 sm:p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1.5">
              <span className="text-slate-300 text-xs uppercase block font-semibold">
                Stock Concentration
              </span>
              <span className="text-sky-300 font-bold text-lg sm:text-xl block mt-0.5">
                {(concentrationMcgPerMl / 1000).toFixed(2)} mg/mL
              </span>
              <span className="text-xs text-slate-400 block">
                ({concentrationMcgPerMl.toFixed(0)} mcg/mL)
              </span>
            </div>

            <div className="p-4.5 sm:p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1.5">
              <span className="text-slate-300 text-xs uppercase block font-semibold">
                Aliquot Yield Per Vial
              </span>
              <span className="text-amber-300 font-bold text-lg sm:text-xl block mt-0.5">
                {Math.floor(totalDoses)} Doses
              </span>
              <span className="text-xs text-slate-400 block">
                ({(vialMg * 1000).toLocaleString()} mcg total)
              </span>
            </div>
          </div>

          {/* Scientific Handling Advisory */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#02102b] border border-sky-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-4 shadow-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <strong className="text-sky-300 block font-mono text-xs uppercase tracking-wider font-bold">
                Laboratory Reconstitution Protocol:
              </strong>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Slowly introduce bacteriostatic diluent against the internal glass vial wall. Swirl gently in a circular horizontal rotation. Never shake or vortex vigorously to prevent mechanical shearing of delicate peptide bonds. Store reconstituted stock at 2°C–8°C.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
