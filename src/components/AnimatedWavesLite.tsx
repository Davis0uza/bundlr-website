"use client";
import React, { useEffect, useMemo, useRef } from "react";

/**
 * AnimatedWavesLite — Canvas (v2)
 * Alta performance em 1 <canvas>. Suporta:
 *  - invert: renderiza as ondas "de cima para baixo" (espelhadas verticalmente)
 *  - fadeEdge + fadeSize: máscara de transparência suave no topo ou fundo
 *
 * Exemplo (topo normal):
 *   <AnimatedWavesLite layers={14} height={520} fadeEdge="bottom" fadeSize={140} />
 *
 * Exemplo (secção seguinte, invertida a partir do topo, e desvanece para branco):
 *   <section className="relative h-[260px]">
 *     <AnimatedWavesLite invert layers={10} height={260} fadeEdge="bottom" fadeSize={180} />
 *   </section>
 */

type Props = {
  className?: string;
  layers?: number;           // nº de ondas (8–20 recomendado)
  gradientFrom?: string;     // cor inicial do gradiente (esquerda)
  gradientTo?: string;       // cor final do gradiente (direita)
  height?: number;           // altura do view (px)
  speed?: number;            // fator base de velocidade (rad/s)
  quality?: number;          // 0.5..2 — passos/amostragem horizontal
  pauseWhenHidden?: boolean; // pausa se sair do viewport
  invert?: boolean;          // espelha verticalmente (ondas "do topo para baixo")
  fadeEdge?: "top" | "bottom"; // onde aplicar o desvanecer p/ transparente
  fadeSize?: number;         // tamanho do fade (px)
};

const AnimatedWavesLite: React.FC<Props> = ({
  className = "",
  layers = 14,
  gradientFrom = "#ffd1f7",
  gradientTo = "#bfe5ff",
  height = 520,
  speed = 1,
  quality = 1,
  pauseWhenHidden = true,
  invert = false,
  fadeEdge = "bottom",
  fadeSize = 140,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runningRef = useRef(true);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cfg = useMemo(() => {
    const L = Math.max(4, Math.min(40, layers));
    const arr = Array.from({ length: L }, (_, i) => {
      const t = i / (L - 1);
      return {
        amp: lerp(16, 60, t) * (0.9 + Math.random() * 0.2),
        wave: lerp(280, 700, 1 - t) * (0.9 + Math.random() * 0.2),
        speed: lerp(1.1, 0.25, t) * (0.85 + Math.random() * 0.3) * speed,
        op:  lerp(1.00, 0.28, t),
        y: 40 + t * (height - 68),
      };
    });
    return arr;
  }, [layers, height, speed]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: true })!;

    const DPR = Math.min(1.5, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);

    const resize = () => {
      const parent = cvs.parentElement || cvs;
      const w = parent.clientWidth;
      const h = height;
      cvs.width = Math.max(1, Math.floor(w * DPR));
      cvs.height = Math.max(1, Math.floor(h * DPR));
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cvs.parentElement || cvs);

    const makeGradient = () => {
      const g = ctx.createLinearGradient(0, 0, cvs.clientWidth, 0);
      g.addColorStop(0, gradientFrom);
      g.addColorStop(1, gradientTo);
      return g;
    };
    let gradient = makeGradient();

    const phases = cfg.map(() => Math.random() * Math.PI * 2);
    let raf = 0;
    let last = performance.now();

    let io: IntersectionObserver | null = null;
    if (pauseWhenHidden && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        runningRef.current = entries.some((e) => e.isIntersecting);
      });
      io.observe(cvs);
    }

    const drawOnce = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;
      renderAll(ctx, cfg, phases, cvs.clientWidth, height, quality, invert);
      applyFadeMask(ctx, cvs.clientWidth, height, fadeEdge, fadeSize);
    };

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (prefersReducedMotion) {
        drawOnce();
        return; // sem loop
      }

      if (runningRef.current) {
        for (let i = 0; i < cfg.length; i++) phases[i] += cfg[i].speed * dt;
        drawOnce();
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const gradientResize = () => { gradient = makeGradient(); };
    const ro2 = new ResizeObserver(gradientResize);
    ro2.observe(cvs);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ro2.disconnect();
      io?.disconnect();
    };
  }, [cfg, gradientFrom, gradientTo, height, prefersReducedMotion, quality, pauseWhenHidden, invert, fadeEdge, fadeSize]);

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`} style={{ height }}>
      <canvas ref={canvasRef} aria-hidden />
    </div>
  );
};

export default AnimatedWavesLite;

// --- helpers ---
function renderAll(
  ctx: CanvasRenderingContext2D,
  cfg: Array<{ amp: number; wave: number; speed: number; op: number; y: number }>,
  phases: number[],
  width: number,
  height: number,
  quality: number,
  invert: boolean
) {
  const baseStep = 12 / quality; // px

  for (let i = 0; i < cfg.length; i++) {
    const { amp, wave, op, y } = cfg[i];
    const baseY = invert ? y : height - y; // topo->baixo quando invert = true
    ctx.globalAlpha = op;

    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let x = 0; x <= width + baseStep; x += baseStep) {
      const yy = baseY + Math.sin((x / wave) * (Math.PI * 2) + phases[i]) * amp;
      ctx.lineTo(x, yy);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }
}

function applyFadeMask(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  edge: "top" | "bottom" | undefined,
  size: number | undefined
) {
  if (!edge || !size || size <= 0) return;
  ctx.save();
  ctx.globalCompositeOperation = "destination-in";
  const y0 = edge === "top" ? 0 : height - size;
  const y1 = edge === "top" ? size : height;
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  if (edge === "top") {
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,1)");
  } else {
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
