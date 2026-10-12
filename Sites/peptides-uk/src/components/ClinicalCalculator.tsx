'use client';

import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';

export function ClinicalCalculator() {
  const [vialMg, setVialMg] = useState<number>(5);
  const [waterMl, setWaterMl] = useState<number>(2);
  const [targetMcg, setTargetMcg] = useState<number>(250);
  const [syringeUnits, setSyringeUnits] = useState<'u100' | 'u40'>('u100');

  // Calculations:
  // Concentration (mg/ml) = vialMg / waterMl
  const concentrationMgPerMl = waterMl > 0 ? vialMg / waterMl : 0;
  // Concentration in mcg/ml = concentrationMgPerMl * 1000
  const concentrationMcgPerMl = concentrationMgPerMl * 1000;
  // Volume needed in ml = targetMcg / concentrationMcgPerMl
  const volumeNeededMl = concentrationMcgPerMl > 0 ? targetMcg / concentrationMcgPerMl : 0;

  // Syringe units to draw:
  // U-100: 100 units = 1 ml -> units = volumeNeededMl * 100
  // U-40: 40 units = 1 ml -> units = volumeNeededMl * 40
  const unitsMultiplier = syringeUnits === 'u100' ? 100 : 40;
  const unitsToDraw = volumeNeededMl * unitsMultiplier;

  // Total doses available in vial:
  const totalDoses = targetMcg > 0 ? (vialMg * 1000) / targetMcg : 0;

  return (
    <section id="calculator" className="py-14 bg-white rounded-3xl border border-slate-200/90 p-6 md:p-10 shadow-sm space-y-8 max-w-full overflow-hidden">
      <div className="border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 mb-2">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>Laboratory Reconstitution &amp; Concentration Tool</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Clinical Peptide Dilution Calculator
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mt-1">
          Precision metric dilution tool for in vitro laboratory assays. Calculate exact liquid concentrations, volumetric draw volumes, and syringe unit calibrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Vial Quantity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="vial-quantity-slider" className="text-xs font-bold font-mono uppercase text-slate-700">
                1. Reagent Quantity in Vial (mg)
              </label>
              <span className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {vialMg} mg
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 20].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setVialMg(mg)}
                  className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    vialMg === mg
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mg} mg
                </button>
              ))}
            </div>
            <input
              id="vial-quantity-slider"
              type="range"
              min="1"
              max="50"
              step="1"
              value={vialMg}
              onChange={(e) => setVialMg(Number(e.target.value))}
              aria-label="Reagent Quantity in Vial in milligrams"
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Step 2: Diluent Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="diluent-volume-slider" className="text-xs font-bold font-mono uppercase text-slate-700">
                2. Bacteriostatic Water / Diluent Added (ml)
              </label>
              <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {waterMl} ml
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 5].map((ml) => (
                <button
                  key={ml}
                  type="button"
                  onClick={() => setWaterMl(ml)}
                  className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    waterMl === ml
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {ml} ml
                </button>
              ))}
            </div>
            <input
              id="diluent-volume-slider"
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={waterMl}
              onChange={(e) => setWaterMl(Number(e.target.value))}
              aria-label="Diluent Added in milliliters"
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Step 3: Target Dose (mcg) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="target-dose-slider" className="text-xs font-bold font-mono uppercase text-slate-700">
                3. Desired Target Assay Dose (mcg)
              </label>
              <span className="font-mono text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {targetMcg} mcg
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map((mcg) => (
                <button
                  key={mcg}
                  type="button"
                  onClick={() => setTargetMcg(mcg)}
                  className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    targetMcg === mcg
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mcg} mcg
                </button>
              ))}
            </div>
            <input
              id="target-dose-slider"
              type="range"
              min="50"
              max="2500"
              step="50"
              value={targetMcg}
              onChange={(e) => setTargetMcg(Number(e.target.value))}
              aria-label="Desired Target Assay Dose in micrograms"
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          {/* Step 4: Syringe Scale Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono uppercase text-slate-700 block">
              4. Syringe Calibration Standard
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSyringeUnits('u100')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  syringeUnits === 'u100'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 font-mono">U-100 Insulin Syringe</div>
                <div className="text-[11px] text-slate-500 mt-0.5">100 units = 1.0 ml (1 unit = 0.01 ml)</div>
              </button>
              <button
                type="button"
                onClick={() => setSyringeUnits('u40')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  syringeUnits === 'u40'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 font-mono">U-40 Laboratory Syringe</div>
                <div className="text-[11px] text-slate-500 mt-0.5">40 units = 1.0 ml (1 unit = 0.025 ml)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Computed Assay Results
              </span>
              <button
                type="button"
                onClick={() => {
                  setVialMg(5);
                  setWaterMl(2);
                  setTargetMcg(250);
                  setSyringeUnits('u100');
                }}
                className="text-slate-400 hover:text-white transition-colors"
                title="Reset to defaults"
                aria-label="Reset calculator to standard 5mg in 2ml defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Hero Result: Units to Draw */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 text-center space-y-1">
              <div className="text-xs font-mono uppercase text-slate-400">
                Draw Volume On Syringe
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                {unitsToDraw.toFixed(1)}{' '}
                <span className="text-lg font-normal text-slate-300">Units</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Equivalent to {volumeNeededMl.toFixed(3)} ml of reconstituted solution
              </div>
            </div>

            {/* Metric Secondary Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Solution Concentration:</span>
                <span className="font-bold text-slate-200">
                  {concentrationMgPerMl.toFixed(2)} mg/ml ({concentrationMcgPerMl.toFixed(0)} mcg/ml)
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Micrograms per 1 Unit:</span>
                <span className="font-bold text-emerald-400">
                  {(concentrationMcgPerMl / unitsMultiplier).toFixed(1)} mcg / unit
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Total Doses per Vial:</span>
                <span className="font-bold text-slate-200">{Math.floor(totalDoses)} full doses</span>
              </div>
            </div>

            {/* In Vitro Research Compliance Note */}
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Calculations provided strictly for academic and preclinical laboratory reference. Store reconstituted peptide solutions between 2°C and 8°C.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
