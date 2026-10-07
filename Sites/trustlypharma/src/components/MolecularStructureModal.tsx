'use client';

import { useState, useEffect, useRef } from 'react';
import { PeptideCompound } from '../types';
import {
  Atom,
  X,
  ExternalLink,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface MolecularStructureModalProps {
  compound: PeptideCompound;
  open: boolean;
  onClose: () => void;
}

// Atom color definitions matching CPK chemical conventions
const CPK_COLORS: Record<string, string> = {
  C: '#94a3b8', // Carbon: silver/slate
  N: '#38bdf8', // Nitrogen: sky blue
  O: '#ef4444', // Oxygen: ruby red
  H: '#f8fafc', // Hydrogen: light pearl
  S: '#f59e0b', // Sulfur: amber yellow
  Cu: '#f97316', // Copper: bronze orange
};

interface AtomNode {
  x: number;
  y: number;
  z: number;
  element: string;
  radius: number;
  label: string;
}

interface Bond {
  a: number;
  b: number;
  order: number;
}

export function MolecularStructureModal({
  compound,
  open,
  onClose,
}: MolecularStructureModalProps) {
  const [activeTab, setActiveTab] = useState<'2d' | '3d' | 'dossier'>('2d');
  const [invert2D, setInvert2D] = useState(true);
  const [zoom2D, setZoom2D] = useState(1);
  const [renderMode, setRenderMode] = useState<'ball_stick' | 'space_fill' | 'backbone'>('ball_stick');
  const [isRotating, setIsRotating] = useState(true);
  const [zoom3D, setZoom3D] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Rotation angles (radians)
  const rotRef = useRef<{ pitch: number; yaw: number; roll: number }>({
    pitch: 0.35,
    yaw: 0.5,
    roll: 0,
  });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Generate 3D molecular lattice representation based on peptide sequence/formula
  const molecularLattice = useRef<{ atoms: AtomNode[]; bonds: Bond[] }>({ atoms: [], bonds: [] });

  useEffect(() => {
    const sequence = compound.sequence || ['Gly', 'Ala', 'Pro', 'Lys', 'Asp', 'Leu'];
    const atoms: AtomNode[] = [];
    const bonds: Bond[] = [];

    const numResidues = sequence.length;
    // Generate an alpha-helical or folded peptide backbone in 3D
    const radiusHelix = 45;
    const pitchHelix = 18;

    for (let i = 0; i < numResidues; i++) {
      const angle = (i * 1.7) % (Math.PI * 2);
      const z = (i - numResidues / 2) * pitchHelix;
      const x = Math.cos(angle) * radiusHelix;
      const y = Math.sin(angle) * radiusHelix;

      // Alpha-Carbon (C_alpha)
      const cAlphaIdx = atoms.length;
      atoms.push({
        x,
        y,
        z,
        element: 'C',
        radius: 8,
        label: `${sequence[i]} Cα`,
      });

      // Peptide Nitrogen (N)
      const nIdx = atoms.length;
      atoms.push({
        x: x + 15 * Math.cos(angle + 0.6),
        y: y + 15 * Math.sin(angle + 0.6),
        z: z + 5,
        element: 'N',
        radius: 7.5,
        label: 'N',
      });
      bonds.push({ a: cAlphaIdx, b: nIdx, order: 1 });

      // Carbonyl Oxygen (O)
      const oIdx = atoms.length;
      atoms.push({
        x: x - 18 * Math.cos(angle - 0.4),
        y: y - 18 * Math.sin(angle - 0.4),
        z: z + 6,
        element: 'O',
        radius: 7,
        label: 'O',
      });
      bonds.push({ a: cAlphaIdx, b: oIdx, order: 2 });

      // Sidechain atom (variable based on residue)
      const res = sequence[i].toLowerCase();
      let sideElement = 'C';
      if (res.includes('cys') || res.includes('met')) sideElement = 'S';
      else if (res.includes('lys') || res.includes('arg') || res.includes('his')) sideElement = 'N';
      else if (res.includes('asp') || res.includes('glu')) sideElement = 'O';

      // Special check for GHK-Cu copper coordination
      if (compound.slug === 'ghk-cu' && i === 1) {
        sideElement = 'Cu';
      }

      const sideIdx = atoms.length;
      atoms.push({
        x: x + 24 * Math.cos(angle + 1.2),
        y: y + 24 * Math.sin(angle + 1.2),
        z: z - 8,
        element: sideElement,
        radius: sideElement === 'Cu' ? 11 : 7.5,
        label: sideElement,
      });
      bonds.push({ a: cAlphaIdx, b: sideIdx, order: 1 });

      // Connect peptide backbone bond to previous residue
      if (i > 0) {
        const prevCAlphaIdx = (i - 1) * 4;
        bonds.push({ a: prevCAlphaIdx, b: cAlphaIdx, order: 1 });
      }
    }

    molecularLattice.current = { atoms, bonds };
  }, [compound]);

  // 3D Canvas Rendering Loop
  useEffect(() => {
    if (!open || activeTab !== '3d') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      if (isRotating && !isDraggingRef.current) {
        rotRef.current.yaw += 0.008;
        rotRef.current.pitch += 0.003;
      }

      const { pitch, yaw } = rotRef.current;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const fov = 380;
      const scale = zoom3D * 1.15;

      const { atoms, bonds } = molecularLattice.current;

      // Project atoms
      interface ProjectedAtom {
        px: number;
        py: number;
        pz: number;
        pRadius: number;
        element: string;
        label: string;
        idx: number;
      }

      const projected: ProjectedAtom[] = [];

      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];

        // 3D Rotation Matrix (Yaw around Y, then Pitch around X)
        const x1 = a.x * cosY + a.z * sinY;
        const z1 = -a.x * sinY + a.z * cosY;

        const y2 = a.y * cosP - z1 * sinP;
        const z2 = a.y * sinP + z1 * cosP;

        const distance = 420;
        const pz = z2 + distance;
        if (pz <= 0) continue;

        const factor = (fov / pz) * scale;
        const px = cx + x1 * factor;
        const py = cy + y2 * factor;

        let atomRadius = a.radius;
        if (renderMode === 'space_fill') atomRadius *= 2.0;
        else if (renderMode === 'backbone') atomRadius *= 0.65;

        projected.push({
          px,
          py,
          pz,
          pRadius: Math.max(2, atomRadius * factor),
          element: a.element,
          label: a.label,
          idx: i,
        });
      }

      // Depth sort for z-buffering
      const sorted = [...projected].sort((a, b) => b.pz - a.pz);

      // 1. Draw Bonds (if not space-filling)
      if (renderMode !== 'space_fill') {
        ctx.lineWidth = renderMode === 'backbone' ? 3 : 2.2;
        ctx.lineCap = 'round';

        for (const bond of bonds) {
          const pA = projected.find((p) => p.idx === bond.a);
          const pB = projected.find((p) => p.idx === bond.b);
          if (!pA || !pB) continue;

          const grad = ctx.createLinearGradient(pA.px, pA.py, pB.px, pB.py);
          const colA = CPK_COLORS[pA.element] || '#cbd5e1';
          const colB = CPK_COLORS[pB.element] || '#cbd5e1';
          grad.addColorStop(0, colA);
          grad.addColorStop(1, colB);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(pA.px, pA.py);
          ctx.lineTo(pB.px, pB.py);
          ctx.stroke();
        }
      }

      // 2. Draw Atom Spheres
      for (const p of sorted) {
        const baseColor = CPK_COLORS[p.element] || '#94a3b8';

        // Radial sphere shading for 3D illusion
        const grad = ctx.createRadialGradient(
          p.px - p.pRadius * 0.35,
          p.py - p.pRadius * 0.35,
          p.pRadius * 0.1,
          p.px,
          p.py,
          p.pRadius
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, baseColor);
        grad.addColorStop(1, '#020b18');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.pRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle stroke
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [open, activeTab, isRotating, zoom3D, renderMode]);

  // Mouse handlers for 3D Orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    rotRef.current.yaw += dx * 0.008;
    rotRef.current.pitch += dy * 0.008;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  if (!open) return null;

  const pubchemImageUrl = compound.pubchemCid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${compound.pubchemCid}/PNG?image_size=large`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Molecular Structure Explorer for ${compound.name}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.35)] shadow-2xl space-y-6 relative">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-700/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-950/70 px-2.5 py-1 rounded-md border border-sky-500/30 flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5" />
                PubChem Molecular Anatomy
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                CAS: {compound.casNumber}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
              {compound.name} — Molecular Structure & Spatial Conformation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {compound.systematicName} · Empirical Formula:{' '}
              <span className="text-emerald-300 font-mono font-bold">{compound.molecularFormula}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-colors flex-shrink-0"
            aria-label="Close molecular explorer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('2d')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === '2d'
                  ? 'bg-sky-500 text-obsidian-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 bg-obsidian-900/60 hover:bg-obsidian-800 border border-slate-700/60 hover:text-white'
              }`}
            >
              2D Skeletal Structure (PubChem NLM)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === '3d'
                  ? 'bg-sky-500 text-obsidian-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 bg-obsidian-900/60 hover:bg-obsidian-800 border border-slate-700/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Interactive 3D Conformer
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dossier')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dossier'
                  ? 'bg-sky-500 text-obsidian-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-300 bg-obsidian-900/60 hover:bg-obsidian-800 border border-slate-700/60 hover:text-white'
              }`}
            >
              Analytical Dossier
            </button>
          </div>

          {compound.pubchemCid && (
            <a
              href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchemCid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-500/25"
            >
              <span>PubChem CID: {compound.pubchemCid}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Tab 1: 2D Skeletal Formula Display */}
        {activeTab === '2d' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Rendering Engine:</span>
                <span className="text-sky-300 font-semibold">NCBI PubChem PUG REST API</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInvert2D(!invert2D)}
                  className="px-3 py-1.5 rounded-lg bg-[#03132e] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {invert2D ? <Moon className="w-3.5 h-3.5 text-sky-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{invert2D ? 'Dark Laboratory Matrix' : 'Standard Paper White'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoom2D((z) => Math.min(2.0, z + 0.25))}
                  className="p-1.5 rounded-lg bg-[#03132e] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 text-slate-200"
                  aria-label="Zoom in 2D formula"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom2D((z) => Math.max(0.75, z - 0.25))}
                  className="p-1.5 rounded-lg bg-[#03132e] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 text-slate-200"
                  aria-label="Zoom out 2D formula"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom2D(1)}
                  className="px-2.5 py-1 rounded-lg bg-[#03132e] border border-[rgba(141,168,195,0.25)] text-slate-300 text-xs"
                >
                  Reset
                </button>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-[rgba(141,168,195,0.25)] p-6 flex items-center justify-center min-h-[360px] overflow-hidden transition-colors ${
                invert2D ? 'bg-[#02102b]' : 'bg-white'
              }`}
            >
              {pubchemImageUrl ? (
                <div
                  className="transition-transform duration-200 ease-out flex items-center justify-center"
                  style={{ transform: `scale(${zoom2D})` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pubchemImageUrl}
                    alt={`2D Chemical Structure of ${compound.name}`}
                    className={`max-h-[320px] w-auto object-contain transition-all duration-300 ${
                      invert2D ? 'filter invert hue-rotate-180 brightness-110 contrast-125' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="text-center py-12 space-y-2">
                  <Atom className="w-12 h-12 text-slate-500 mx-auto" />
                  <p className="text-sm text-slate-300 font-semibold">PubChem CID Not Registered</p>
                  <p className="text-xs text-slate-400">
                    Skeletal coordinates for this synthetic fragment are cross-referenced via primary literature.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive 3D Conformer & Backbone */}
        {activeTab === '3d' && (
          <div className="space-y-4">
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Representation:</span>
                <div className="flex rounded-lg border border-[rgba(141,168,195,0.25)] p-0.5 bg-[#03132e]">
                  <button
                    type="button"
                    onClick={() => setRenderMode('ball_stick')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      renderMode === 'ball_stick' ? 'bg-sky-500 text-obsidian-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Ball & Stick
                  </button>
                  <button
                    type="button"
                    onClick={() => setRenderMode('space_fill')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      renderMode === 'space_fill' ? 'bg-sky-500 text-obsidian-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    CPK Space-Filling
                  </button>
                  <button
                    type="button"
                    onClick={() => setRenderMode('backbone')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      renderMode === 'backbone' ? 'bg-sky-500 text-obsidian-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Residue Spline
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRotating(!isRotating)}
                  className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                    isRotating
                      ? 'bg-sky-950/60 border-sky-400/50 text-sky-300'
                      : 'bg-[#03132e] border-[rgba(141,168,195,0.25)] text-slate-300'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>{isRotating ? 'Auto-Orbit ON' : 'Paused'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoom3D((z) => Math.min(2.2, z + 0.2))}
                  className="p-1.5 rounded-lg bg-[#03132e] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 text-slate-200"
                  aria-label="Zoom in 3D"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom3D((z) => Math.max(0.6, z - 0.2))}
                  className="p-1.5 rounded-lg bg-[#03132e] border border-[rgba(141,168,195,0.25)] hover:border-sky-400 text-slate-200"
                  aria-label="Zoom out 3D"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3D Canvas Box */}
            <div
              className="rounded-2xl border border-[rgba(141,168,195,0.25)] bg-[#01091a] relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-[360px] block"
              />

              {/* Atom CPK Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#02102b]/90 backdrop-blur-md border border-[rgba(141,168,195,0.2)] rounded-xl px-3 py-2 flex items-center gap-3 text-[11px] font-mono">
                <span className="text-slate-400 font-semibold">CPK Key:</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] inline-block" /> C
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] inline-block" /> N
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block" /> O
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block" /> S
                </span>
                {compound.slug === 'ghk-cu' && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] inline-block" /> Cu
                  </span>
                )}
              </div>

              {/* Interaction Hint */}
              <div className="absolute top-3 right-3 bg-[#02102b]/85 backdrop-blur-md border border-[rgba(141,168,195,0.2)] rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-400">
                Click & Drag to Orbit 360°
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Analytical Dossier */}
        {activeTab === 'dossier' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1.5">
                <span className="text-slate-400 block font-semibold">IUPAC / Systematic Designation:</span>
                <span className="text-white font-bold text-sm block">{compound.systematicName}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1.5">
                <span className="text-slate-400 block font-semibold">CAS Registry Identifier:</span>
                <span className="text-emerald-300 font-bold text-sm block">{compound.casNumber}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1.5">
                <span className="text-slate-400 block font-semibold">Molecular Formula:</span>
                <span className="text-white font-bold text-sm block">{compound.molecularFormula}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-1.5">
                <span className="text-slate-400 block font-semibold">Molecular Weight:</span>
                <span className="text-sky-300 font-bold text-sm block">{compound.molecularWeight}</span>
              </div>
            </div>

            {/* Sequence ribbon breakdown */}
            {compound.sequence && compound.sequence.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-2">
                <span className="text-xs font-mono font-semibold text-slate-300 block">
                  Complete Primary Amino Acid Sequence ({compound.sequence.length} Residues):
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {compound.sequence.map((aa, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#03132e] border border-sky-500/25 text-sky-200"
                    >
                      <span className="text-slate-500 text-[10px] mr-1">{i + 1}</span>
                      {aa}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* In-vitro signaling mechanisms */}
            <div className="p-4 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] space-y-2">
              <span className="text-xs font-mono font-semibold text-slate-300 block">
                Primary Preclinical Signaling Cascades:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {compound.mechanismOfAction.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-400 font-mono mt-0.5">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-400" />
            <span>Strictly In Vitro / Analytical Reagent Specification Reference</span>
          </span>
          <div className="flex items-center gap-3">
            {compound.pubchemCid && (
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchemCid}#section=3D-Conformer`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>NCBI 3D Interactive Conformer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
