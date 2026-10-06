'use client';

import { useState } from 'react';
import { Droplets, Calculator, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface ReconstitutionCalculatorProps {
  initialVialMg?: number;
  initialDoseMcg?: number;
  className?: string;
}

export function ReconstitutionCalculator({
  initialVialMg = 5,
  initialDoseMcg = 250,
  className = '',
}: ReconstitutionCalculatorProps) {
  const [vialMg, setVialMg] = useState<number>(initialVialMg);
  const [waterMl, setWaterMl] = useState<number>(2);
  const [doseMcg, setDoseMcg] = useState<number>(initialDoseMcg);
  const [syringeType, setSyringeType] = useState<number>(100); // 100 units per mL (standard U-100)

  // Calculations
  const concentrationMcgPerMl = waterMl > 0 ? (vialMg * 1000) / waterMl : 0;
  const volumeMlPerDose = concentrationMcgPerMl > 0 ? doseMcg / concentrationMcgPerMl : 0;
  const unitsPerDose = volumeMlPerDose * syringeType;
  const totalDoses = doseMcg > 0 ? (vialMg * 1000) / doseMcg : 0;

  const handleReset = () => {
    setVialMg(5);
    setWaterMl(2);
    setDoseMcg(250);
    setSyringeType(100);
  };

  return (
    <div
      id="calculator"
      className={`rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-2xl space-y-6 scroll-mt-20 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[rgba(141,168,195,0.18)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-sky-500/10 text-sky-400">
              <Calculator className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              Interactive Laboratory Tool
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Laboratory Solution Dilution & Reconstitution Calculator
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Calculate stock concentration, aliquot volumes, and calibrated micro-pipette/syringe units for laboratory solutions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-[#103059] border border-slate-700 self-start sm:self-auto transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Parameters */}
        <div className="space-y-5">
          {/* 1. Vial Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-200">1. Peptide Vial Quantity (mg)</label>
              <span className="font-mono text-sky-400 font-bold">{vialMg} mg</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 15].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setVialMg(mg)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    vialMg === mg
                      ? 'bg-sky-500 text-obsidian-950 shadow-md'
                      : 'bg-[#103059] text-slate-300 border border-[rgba(141,168,195,0.2)] hover:border-sky-400'
                  }`}
                >
                  {mg} mg
                </button>
              ))}
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={vialMg}
              onChange={(e) => setVialMg(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          {/* 2. Bacteriostatic Water Added */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-200">2. Bacteriostatic Water Added (mL)</label>
              <span className="font-mono text-sky-400 font-bold">{waterMl} mL</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 2.5, 3].map((ml) => (
                <button
                  key={ml}
                  type="button"
                  onClick={() => setWaterMl(ml)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    waterMl === ml
                      ? 'bg-sky-500 text-obsidian-950 shadow-md'
                      : 'bg-[#103059] text-slate-300 border border-[rgba(141,168,195,0.2)] hover:border-sky-400'
                  }`}
                >
                  {ml} mL
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={waterMl}
              onChange={(e) => setWaterMl(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          {/* 3. Target Aliquot */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-200">3. Target Aliquot Mass (mcg)</label>
              <span className="font-mono text-amber-400 font-bold">{doseMcg} mcg</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map((mcg) => (
                <button
                  key={mcg}
                  type="button"
                  onClick={() => setDoseMcg(mcg)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    doseMcg === mcg
                      ? 'bg-amber-400 text-obsidian-950 shadow-md'
                      : 'bg-[#103059] text-slate-300 border border-[rgba(141,168,195,0.2)] hover:border-amber-400'
                  }`}
                >
                  {mcg} mcg
                </button>
              ))}
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={doseMcg}
              onChange={(e) => setDoseMcg(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="p-6 rounded-3xl bg-[#103059] border border-[rgba(141,168,195,0.3)] space-y-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
            Volumetric Pipetting / Draw Calibration
          </span>

          <div className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] text-center space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase">
              Draw to on U-100 Syringe:
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 tracking-tight">
              {unitsPerDose.toFixed(1)}{' '}
              <span className="text-xl font-normal text-slate-300">Units</span>
            </div>
            <div className="text-xs font-mono text-slate-400 pt-1">
              Volume: {volumeMlPerDose.toFixed(3)} mL ({unitsPerDose.toFixed(0)} tick marks)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#0a2149] border border-[rgba(141,168,195,0.15)]">
              <span className="text-slate-400 text-[10px] block">Concentration</span>
              <span className="text-sky-300 font-bold text-sm">
                {(concentrationMcgPerMl / 1000).toFixed(2)} mg/mL
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a2149] border border-[rgba(141,168,195,0.15)]">
              <span className="text-slate-400 text-[10px] block">Yield Per Vial</span>
              <span className="text-amber-300 font-bold text-sm">
                {Math.floor(totalDoses)} Aliquots
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0a2149]/60 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Laboratory standard:</strong> Slowly introduce bacteriostatic diluent against the internal glass vial wall. Swirl gently in circular motion; avoid vigorous agitation to prevent mechanical shearing of delicate peptide bonds.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
