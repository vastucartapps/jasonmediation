'use client';

import { useEffect, useRef } from 'react';

// Tunable animation constants
const INTENSITY = 0.85; // master opacity
const BEAD = 11; // residue sphere radius
const SPACING = 60; // spacing between residues along chain
const ZIG = 15; // backbone zig-zag amplitude
const SIDE = 20; // side-chain length
const TAU = Math.PI * 2;

interface Chain {
  y: number;
  speed: number;
  phase: number;
  wave: number;
  dx: number;
  dy: number;
  px: number;
  py: number;
  spacing: number;
  zig: number;
  side: number;
  bead: number;
  bright: number;
  opacity: number;
  depth: number;
}

const TEMPLATES = [
  { y: 0.38, depth: 0.12, ang: -12, speed: 0.08, wave: 8, phase: 0.4 },
  { y: 0.65, depth: 0.45, ang: -8, speed: 0.06, wave: 11, phase: 2.3 },
  { y: 0.22, depth: 0.75, ang: -16, speed: 0.045, wave: 6, phase: 4.1 },
];

function buildGlowSprite(): HTMLCanvasElement {
  const glow = document.createElement('canvas');
  glow.width = glow.height = 64;
  const gx = glow.getContext('2d')!;
  const gg = gx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gg.addColorStop(0, 'rgba(0, 242, 254, 0.85)');
  gg.addColorStop(0.5, 'rgba(16, 185, 129, 0.25)');
  gg.addColorStop(1, 'rgba(16, 185, 129, 0)');
  gx.fillStyle = gg;
  gx.fillRect(0, 0, 64, 64);
  return glow;
}

/** Animated drifting peptide chains rendered on canvas */
export function HeroHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const glow = buildGlowSprite();
    let w = 0;
    let h = 0;
    let chains: Chain[] = [];
    let t = 0;
    let raf = 0;
    let running = false;

    const configure = () => {
      const unit = w >= 1024 ? 1 : 0.8;
      chains = TEMPLATES.map((c) => {
        const r = (c.ang * Math.PI) / 180;
        const scale = (1.18 - 0.66 * c.depth) * unit;
        return {
          y: c.y,
          depth: c.depth,
          speed: c.speed * unit,
          phase: c.phase,
          wave: c.wave * unit,
          dx: Math.cos(r),
          dy: Math.sin(r),
          px: -Math.sin(r),
          py: Math.cos(r),
          spacing: SPACING * scale,
          zig: ZIG * scale,
          side: SIDE * scale,
          bead: BEAD * scale,
          bright: 1 - c.depth,
          opacity: (0.95 - 0.66 * c.depth) * INTENSITY,
        };
      }).sort((a, b) => b.depth - a.depth);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      configure();
    };

    const atom = (x: number, y: number, rad: number, b: number, main: boolean) => {
      if (rad < 0.4 || x < -40 || x > w + 40 || y < -40 || y > h + 40) return;
      if (rad < 3.2) {
        ctx.fillStyle = `rgba(${(20 + 40 * b) | 0},${(200 + 55 * b) | 0},${(240 + 15 * b) | 0},1)`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, TAU);
        ctx.fill();
        return;
      }
      if (main && b > 0.25) {
        const size = rad * 4.4;
        const prev = ctx.globalAlpha;
        ctx.globalAlpha = prev * (0.15 + 0.35 * b);
        ctx.drawImage(glow, x - size / 2, y - size / 2, size, size);
        ctx.globalAlpha = prev;
      }
      const g = ctx.createRadialGradient(x - rad * 0.34, y - rad * 0.4, rad * 0.04, x, y, rad * 1.04);
      if (main) {
        g.addColorStop(0, 'rgba(210, 250, 255, 1)');
        g.addColorStop(0.45, `rgba(${(0 + 20 * b) | 0},${(210 + 45 * b) | 0},${(235 + 20 * b) | 0},1)`);
        g.addColorStop(1, `rgba(${(4 + 10 * b) | 0},${(40 + 30 * b) | 0},${(70 + 40 * b) | 0},1)`);
      } else {
        g.addColorStop(0, 'rgba(215, 255, 240, 1)');
        g.addColorStop(0.55, `rgba(${(16 + 25 * b) | 0},${(185 + 45 * b) | 0},${(140 + 35 * b) | 0},1)`);
        g.addColorStop(1, 'rgba(6, 45, 40, 1)');
      }
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, TAU);
      ctx.fill();
      if (main) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.65 * b})`;
        ctx.beginPath();
        ctx.arc(x - rad * 0.32, y - rad * 0.38, rad * 0.2, 0, TAU);
        ctx.fill();
      }
    };

    const drawChain = (c: Chain) => {
      const { spacing, zig, bright: b, dx, dy, px, py } = c;
      const ax = w * 0.5;
      const ay = c.y * h;
      const diag = Math.sqrt(w * w + h * h);
      const half = Math.min(Math.ceil((diag * 0.5) / spacing) + 2, 70);
      const base = (t * c.speed) / spacing;
      const k0 = Math.floor(base);
      const frac = base - k0;
      const pts: { x: number; y: number; parity: number }[] = [];
      for (let j = -half; j <= half; j++) {
        const along = (j - frac) * spacing;
        const parity = (k0 + j) & 1;
        const off = (parity ? zig : -zig) + Math.sin(along * 0.012 + t * 0.01 + c.phase) * c.wave;
        pts.push({ x: ax + dx * along + px * off, y: ay + dy * along + py * off, parity });
      }

      ctx.globalAlpha = c.opacity;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.strokeStyle = `rgba(${(0 + 30 * b) | 0},${(180 + 60 * b) | 0},${(220 + 35 * b) | 0},${0.5 + 0.35 * b})`;
      ctx.lineWidth = c.bead * 0.44;
      ctx.beginPath();
      for (let j = 0; j < pts.length - 1; j++) {
        ctx.moveTo(pts[j].x, pts[j].y);
        ctx.lineTo(pts[j + 1].x, pts[j + 1].y);
      }
      ctx.stroke();

      ctx.strokeStyle = `rgba(${(16 + 25 * b) | 0},${(165 + 50 * b) | 0},${(130 + 40 * b) | 0},${0.4 + 0.3 * b})`;
      ctx.lineWidth = c.bead * 0.28;
      for (const pt of pts) {
        const dir = pt.parity ? 1 : -1;
        const ex = pt.x + px * dir * c.side;
        const ey = pt.y + py * dir * c.side;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        atom(ex, ey, c.bead * 0.55, b, false);
      }
      for (const pt of pts) atom(pt.x, pt.y, c.bead, b, true);

      ctx.globalAlpha = 1;
    };

    const draw = () => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const sp = ctx.createRadialGradient(w * 0.65, h * 0.45, 0, w * 0.65, h * 0.45, Math.max(w, h) * 0.75);
      sp.addColorStop(0, 'rgba(0, 242, 254, 0.07)');
      sp.addColorStop(0.5, 'rgba(16, 185, 129, 0.025)');
      sp.addColorStop(1, 'rgba(4, 7, 17, 0)');
      ctx.fillStyle = sp;
      ctx.fillRect(0, 0, w, h);
      chains.forEach(drawChain);
    };

    let lastTime = 0;
    const loop = (timestamp: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      // Throttle to ~30fps (32ms) to eliminate long tasks and reduce main-thread CPU overhead
      if (timestamp - lastTime < 32) return;
      lastTime = timestamp;
      t += 1;
      draw();
    };

    let startTimer: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      if (reduce) return draw();
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const scheduleStart = () => {
      if (startTimer) clearTimeout(startTimer);
      // Defer continuous loop start until after initial paint & hydration window
      startTimer = setTimeout(start, 500);
    };

    const stop = () => {
      if (startTimer) {
        clearTimeout(startTimer);
        startTimer = null;
      }
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw();
    const onResize = () => {
      resize();
      draw();
    };
    const onVisibility = () => (document.hidden ? stop() : scheduleStart());
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? scheduleStart() : stop())),
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true" />;
}
