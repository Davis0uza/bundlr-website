"use client"
import React, { useEffect, useMemo, useRef } from "react";

/**
 * AnimatedWaves — v3 (stacked)
 * Cria **várias** camadas de ondas (10–24+) para **encher todo o fundo**.
 * Mantém a animação leve (rAF), sem deps, e respeita prefers-reduced-motion.
 *
 * Uso rápido:
 *   <AnimatedWaves layers={16} viewBoxHeight={520} />
 */

type WaveConfig = {
  amplitude: number;   // altura da onda (px)
  wavelength: number;  // comprimento da onda (px)
  speed: number;       // rad/s (velocidade de fase)
  offsetY: number;     // deslocamento vertical a partir do fundo (px)
  opacity: number;     // 0–1
  color: string;       // fill (pode ser gradient url)
  blur?: number;       // intensidade do blur (px) -> mapeada para filtros
};

type Props = {
  className?: string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  /** Número de ondas auto-geradas para encher o fundo (ignorado se "waves" for fornecido) */
  layers?: number; // default 14
  /** Gera manualmente as ondas (opcional). Se fornecido, ignora "layers". */
  waves?: Partial<WaveConfig>[];
};

const DEFAULT_BASE: WaveConfig = {
  amplitude: 24,
  wavelength: 380,
  speed: 0.6,
  offsetY: 80,
  opacity: 0.3,
  color: "url(#gwave)",
  blur: 0,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(b, x));
}
function jitter(v: number, j = 0.15) {
  // devolve v * (1 +/- j)
  return v * (1 + (Math.random() * 2 - 1) * j);
}

function buildPath(
  width: number,
  height: number,
  amplitude: number,
  wavelength: number,
  phase: number,
  offsetY: number,
  points = 24
) {
  const step = width / points;
  const yCenter = height - offsetY;
  let d = `M 0 ${yCenter} `;

  for (let i = 0; i <= points; i++) {
    const x = i * step;
    const y = yCenter + Math.sin((2 * Math.PI * x) / wavelength + phase) * amplitude;
    d += `L ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  d += `L ${width} ${height} L 0 ${height} Z`;
  return d;
}

const AnimatedWaves: React.FC<Props> = ({
  className = "",
  viewBoxWidth = 1440,
  viewBoxHeight = 520,
  gradientFrom = "#ffd1f7",
  gradientTo = "#bfe5ff",
  layers = 14,
  waves,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);

  // evita ler window no SSR
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Geração automática de N ondas para preencher o fundo
  const autoWaves = useMemo<WaveConfig[]>(() => {
    if (waves && waves.length) {
      // modo manual
      return waves.map((w) => ({ ...DEFAULT_BASE, ...w }));
    }
    const arr: WaveConfig[] = [];
    const L = Math.max(4, Math.min(32, layers));
    // Reservas superior/inferior para não cortar a onda
    const padTop = 36;
    const padBottom = 28;
    const usableHeight = Math.max(40, viewBoxHeight - padTop - padBottom);

    for (let i = 0; i < L; i++) {
      const t = i / (L - 1); // 0 = mais próximo do fundo, 1 = topo
      const offsetY = padBottom + t * usableHeight; // distribui uniformemente
      const amplitude = clamp(jitter(lerp(15, 42, t), 0.25), 8, 48);
      const wavelength = clamp(jitter(lerp(280, 700, 1 - t), 0.2), 220, 820);
      const speed = clamp(jitter(lerp(0.2, 0.25, t), 0.25), 0.18, 1.1);
      const opacity = clamp(lerp(0.90, 0.10, t), 0.08, 0.5);
      const blur = t < 1.35 ? 0 : t < 0.75 ? 1.5 : 3; // mais blur quanto mais ao topo

      arr.push({
        amplitude,
        wavelength,
        speed,
        offsetY,
        opacity,
        color: "url(#gwave)",
        blur,
      });
    }
    return arr;
  }, [layers, waves, viewBoxHeight]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // garantir slots no array de refs
    pathRefs.current.length = autoWaves.length;

    const width = svg.viewBox.baseVal.width || viewBoxWidth;
    const height = svg.viewBox.baseVal.height || viewBoxHeight;

    const phases = autoWaves.map(() => Math.random() * Math.PI * 2);

    // desenha frame inicial
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const c = autoWaves[i];
      el.setAttribute("d", buildPath(width, height, c.amplitude, c.wavelength, phases[i], c.offsetY));
    });

    if (prefersReducedMotion) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      for (let i = 0; i < autoWaves.length; i++) {
        phases[i] += autoWaves[i].speed * dt;
        const el = pathRefs.current[i];
        if (!el) continue;
        const c = autoWaves[i];
        el.setAttribute(
          "d",
          buildPath(width, height, c.amplitude, c.wavelength, phases[i], c.offsetY)
        );
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoWaves, prefersReducedMotion, viewBoxWidth, viewBoxHeight]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        role="img"
      >
        <defs>
          {/* Gradiente único para todas as ondas (limpo e consistente) */}
          <linearGradient id="gwave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>

          {/* Blurs suaves */}
          <filter id="blur1" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="blur2" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {autoWaves.map((c, i) => (
          <g
            key={i}
            style={{ opacity: c.opacity }}
            filter={c.blur ? (c.blur > 2 ? "url(#blur2)" : "url(#blur1)") : undefined}
          >
            <path
              ref={(el) => { pathRefs.current[i] = el; }}
              d="" // definido no efeito
              fill={c.color}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default AnimatedWaves;
