"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Respeita prefers-reduced-motion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// Escala responsiva (0.6–1) para forças do parallax/idle
function getScale() {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  return Math.min(1, Math.max(0.6, w / 1024));
}

export default function LogoWithSubtitle() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Wrappers para parallax
  const logoParallaxRef = useRef<HTMLDivElement | null>(null);
  const textParallaxWrapRef = useRef<HTMLParagraphElement | null>(null);

  // Elementos animados (entrada + gradiente)
  const logoAnimRef = useRef<HTMLDivElement | null>(null);
  const textAnimRef = useRef<HTMLSpanElement | null>(null);

  const reduced = usePrefersReducedMotion();

  // ---------- Animação de entrada ----------
  useEffect(() => {
    if (reduced) return;
    const setStart = (el?: HTMLElement | null) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px) scale(0.98)";
    };
    const play = (el?: HTMLElement | null, delay = 0) => {
      if (!el) return;
      el.style.willChange = "transform, opacity";
      el.style.transition = `transform 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms, opacity 800ms ease ${delay}ms`;
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      });
    };
    setStart(logoAnimRef.current);
    setStart(textAnimRef.current);
    play(logoAnimRef.current, 60);
    play(textAnimRef.current, 140);
  }, [reduced]);

  // ---------- Parallax + Idle (oscilação oposta) ----------
  useEffect(() => {
    if (reduced) return;
    const root = containerRef.current;
    if (!root) return;

    const hovering = { current: false };
    const onEnter = () => (hovering.current = true);
    const onLeave = () => {
      hovering.current = false;
      pLogo.x = pLogo.y = 0;
      pText.x = pText.y = 0;
      apply();
    };

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);

    // bases
    const STRENGTH_LOGO = 12; // puxa (logo)
    const STRENGTH_TEXT = 10; // empurra (subtítulo)
    const AMP_LOGO_BASE = 4;  // idle
    const AMP_TEXT_BASE = 5;  // idle
    const SPEED = 0.85;       // rad/s

    const pLogo = { x: 0, y: 0 };
    const pText = { x: 0, y: 0 };
    const iLogo = { x: 0, y: 0 };
    const iText = { x: 0, y: 0 };

    let rafParallax = 0;

    const apply = () => {
      if (logoParallaxRef.current) {
        logoParallaxRef.current.style.transform = `translate3d(${pLogo.x + iLogo.x}px, ${pLogo.y + iLogo.y}px, 0)`;
      }
      if (textParallaxWrapRef.current) {
        textParallaxWrapRef.current.style.transform = `translate3d(${pText.x + iText.x}px, ${pText.y + iText.y}px, 0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

      const s = getScale(); // escala responsiva
      cancelAnimationFrame(rafParallax);
      rafParallax = requestAnimationFrame(() => {
        pLogo.x = nx * STRENGTH_LOGO * s;
        pLogo.y = ny * STRENGTH_LOGO * s;
        pText.x = -nx * STRENGTH_TEXT * s;
        pText.y = -ny * STRENGTH_TEXT * s;
        apply();
      });
    };

    root.addEventListener("mousemove", onMove);

    // Idle loop com escala responsiva
    let rafIdle = 0;
    let start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const k = hovering.current ? 0 : 1;
      const s = getScale();

      const AMP_LOGO = AMP_LOGO_BASE * s;
      const AMP_TEXT = AMP_TEXT_BASE * s;

      iLogo.x = Math.cos(t * SPEED) * AMP_LOGO * k;
      iLogo.y = Math.sin(t * SPEED) * AMP_LOGO * k;
      iText.x = -Math.cos((t + 0.2) * SPEED) * AMP_TEXT * k;
      iText.y = -Math.sin((t + 0.2) * SPEED) * AMP_TEXT * k;

      apply();
      animateGradient(t);
      rafIdle = requestAnimationFrame(tick);
    };
    rafIdle = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafParallax);
      cancelAnimationFrame(rafIdle);
    };
  }, [reduced]);

  // ---------- Degradê animado + drop-shadow ----------
  useEffect(() => {
    if (!textAnimRef.current) return;
    textAnimRef.current.style.textShadow = "0 2px 8px rgba(0,0,0,0.15)";
    if (reduced) {
      textAnimRef.current.style.backgroundImage =
        `linear-gradient(45deg, rgba(255,154,216,0.95) 0%, rgba(140,207,255,0.95) 100%)`;
      textAnimRef.current.style.backgroundClip = "text";
      // @ts-ignore
      textAnimRef.current.style.webkitBackgroundClip = "text";
      // @ts-ignore
      textAnimRef.current.style.webkitTextFillColor = "transparent";
      textAnimRef.current.style.color = "transparent";
    }
  }, [reduced]);

  function animateGradient(t: number) {
    const el = textAnimRef.current;
    if (!el || reduced) return;

    const a1 = 0.925 + 0.075 * Math.sin(t * 0.9);
    const a2 = 0.925 + 0.075 * Math.sin(t * 0.9 + Math.PI / 2);
    const angle = (t * 28) % 360;

    const pink = `rgba(255,154,216,${a1})`;
    const blue = `rgba(140,207,255,${a2})`;

    const bx = 50 + Math.sin(t * 0.5) * 25;
    const by = 50 + Math.cos(t * 0.6) * 25;

    el.style.backgroundImage = `linear-gradient(${angle}deg, ${pink} 0%, ${blue} 100%)`;
    el.style.backgroundSize = "200% 200%";
    el.style.backgroundPosition = `${bx}% ${by}%`;
    el.style.backgroundClip = "text";
    // @ts-ignore
    el.style.webkitBackgroundClip = "text";
    // @ts-ignore
    el.style.webkitTextFillColor = "transparent";
    el.style.color = "transparent";
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-3xl select-none flex-col items-center justify-center text-center px-4"
      aria-label="Logótipo e mensagem da marca"
    >
      {/* Logo (parallax + entrada) */}
      <div
        ref={logoParallaxRef}
        className="will-change-transform transition-transform duration-150 ease-out"
      >
        <div ref={logoAnimRef}>
          <Image
            src="/logo.png"
            alt="Bundlr — logótipo"
            width={512}
            height={170}
            className="h-auto w-[clamp(160px,42vw,240px)] sm:w-[clamp(190px,32vw,265px)] md:w-[clamp(210px,22vw,280px)]"
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 32vw, 280px"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Subtítulo (parallax no wrapper, gradiente no span)
          Espaçamento X2: antes mt[clamp(18px,4.5vw,30px)] → agora mt[clamp(36px,9vw,60px)] */}
      <p
        ref={textParallaxWrapRef}
        className="mt-[clamp(36px,9vw,60px)] will-change-transform transition-transform duration-150 ease-out"
      >
        <span
          ref={textAnimRef}
          className="inline-block leading-snug text-[clamp(14px,3.33vw,21px)] sm:text-[clamp(15px,2.53vw,24px)]"
          style={{ letterSpacing: "0.1px" }}
        >
          O CONJUNTO DE SOLUÇÕES PARA IMPULSIONAR O SEU NEGÓCIO.
          <br className="hidden sm:block" />
          
        </span>
      </p>
    </div>
  );
}
