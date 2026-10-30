'use client';

import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle2, RotateCcw, ShieldAlert, Dna } from 'lucide-react';

export function AminoCalculator() {
  const [vialMg, setVialMg] = useState<number>(5);
  const [waterMl, setWaterMl] = useState<number>(2);
  const [targetMcg, setTargetMcg] = useState<number>(250);
  const [syringeUnits, setSyringeUnits] = useState<'u100' | 'u40'>('u100');

  // Calculations:
  const concentrationMgPerMl = waterMl > 0 ? vialMg / waterMl : 0;
  const concentrationMcgPerMl = concentrationMgPerMl * 1000;
  const volumeNeededMl = concentrationMcgPerMl > 0 ? targetMcg / concentrationMcgPerMl : 0;
  const unitsMultiplier = syringeUnits === 'u100' ? 100 : 40;
  const unitsToDraw = volumeNeededMl * unitsMultiplier;
  const totalDoses = targetMcg > 0 ? (vialMg * 1000) / targetMcg : 0;

  return (
    <section id="calculator" className="py-10 sm:py-14 bg-white rounded-3xl border border-zinc-200/90 p-4 sm:p-6 md:p-10 shadow-am-card space-y-8 max-w-full overflow-hidden">
      <div className="border-b border-zinc-100 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 mb-2.5">
          <Calculator className="w-4 h-4 text-indigo-700" />
          <span>Laboratory Dilution &amp; Reconstitution Standard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
          Amino Acid &amp; Peptide Dilution Calculator
        </h2>
        <p className="text-sm text-zinc-700 max-w-2xl mt-1 leading-relaxed">
          Precision metric reconstitution calculator for laboratory in vitro reference assays. Calculate liquid concentrations, volumetric draw volumes, and syringe unit calibrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Vial Quantity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="vial-quantity-slider" className="text-xs font-bold font-mono uppercase text-zinc-700">
                1. Reagent Quantity in Vial (mg)
              </label>
              <span className="font-mono text-sm font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                {vialMg} mg
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 20].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setVialMg(mg)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                    vialMg === mg
                      ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
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
              className="w-full accent-indigo-700 cursor-pointer"
              aria-label="Reagent quantity in vial in milligrams"
            />
          </div>

          {/* Step 2: Diluent Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="diluent-volume-slider" className="text-xs font-bold font-mono uppercase text-zinc-700">
                2. Diluent Added (Bacteriostatic Water in mL)
              </label>
              <span className="font-mono text-sm font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                {waterMl} mL
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 5].map((ml) => (
                <button
                  key={ml}
                  type="button"
                  onClick={() => setWaterMl(ml)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                    waterMl === ml
                      ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {ml} mL
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
              className="w-full accent-indigo-700 cursor-pointer"
              aria-label="Diluent added in millilitres"
            />
          </div>

          {/* Step 3: Desired Assay Target */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="target-dose-slider" className="text-xs font-bold font-mono uppercase text-zinc-700">
                3. Assay Target Volume / Dose (mcg)
              </label>
              <span className="font-mono text-sm font-bold text-orange-800 bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                {targetMcg} mcg ({targetMcg >= 1000 ? `${targetMcg / 1000} mg` : `${targetMcg} mcg`})
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map((mcg) => (
                <button
                  key={mcg}
                  type="button"
                  onClick={() => setTargetMcg(mcg)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                    targetMcg === mcg
                      ? 'bg-orange-700 text-white border-orange-700 shadow-sm'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
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
              max="5000"
              step="50"
              value={targetMcg}
              onChange={(e) => setTargetMcg(Number(e.target.value))}
              className="w-full accent-orange-700 cursor-pointer"
              aria-label="Assay target volume in micrograms"
            />
          </div>

          {/* Step 4: Syringe Calibration Choice */}
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono uppercase text-zinc-700 block">
              4. Syringe Barrel Calibration Standard
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSyringeUnits('u100')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  syringeUnits === 'u100'
                    ? 'border-indigo-700 bg-indigo-50/50 shadow-xs'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                <div className="font-bold text-sm text-zinc-950">U-100 Standard (100 units = 1.0 mL)</div>
                <div className="text-xs text-zinc-600">Each 1 unit = 0.01 mL (Most common lab barrel)</div>
              </button>
              <button
                type="button"
                onClick={() => setSyringeUnits('u40')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  syringeUnits === 'u40'
                    ? 'border-indigo-700 bg-indigo-50/50 shadow-xs'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                <div className="font-bold text-sm text-zinc-950">U-40 Standard (40 units = 1.0 mL)</div>
                <div className="text-xs text-zinc-600">Each 1 unit = 0.025 mL (Veterinary / specialized)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Results & Visual Readout Column (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-950 text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-xl border border-zinc-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
                Analytical Calibration Readout
              </span>
              <button
                type="button"
                onClick={() => {
                  setVialMg(5);
                  setWaterMl(2);
                  setTargetMcg(250);
                }}
                className="text-zinc-400 hover:text-white transition-colors"
                title="Reset to Defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Core Output Number */}
            <div className="bg-zinc-900/90 rounded-2xl p-5 border border-zinc-800 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Draw Exactly</span>
              <div className="text-4xl sm:text-5xl font-black text-orange-400 font-mono tracking-tight">
                {unitsToDraw.toFixed(1)} <span className="text-xl text-zinc-400 font-sans">Units</span>
              </div>
              <div className="text-xs font-mono text-zinc-400 pt-1">
                Volume: <strong className="text-white">{volumeNeededMl.toFixed(3)} mL</strong> ({Math.round(volumeNeededMl * 1000)} &micro;L)
              </div>
            </div>

            {/* Secondary Parameters */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Total Concentration:</span>
                <span className="font-bold text-white">{concentrationMgPerMl.toFixed(2)} mg/mL ({concentrationMcgPerMl.toLocaleString()} mcg/mL)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Total Available Doses:</span>
                <span className="font-bold text-white">~{Math.floor(totalDoses)} assays</span>
              </div>
            </div>
          </div>

          {/* Statutory Note */}
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
            <span className="font-bold text-orange-400 block mb-0.5">Laboratory Protocol Notice:</span>
            Always verify analytical syringe barrel calibration mark. Discard reconstituted research reagents displaying turbidity or precipitation.
          </div>
        </div>
      </div>
    </section>
  );
}
