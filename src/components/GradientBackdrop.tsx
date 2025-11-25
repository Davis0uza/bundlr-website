"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mantemos compatível com os temas já usados no projeto
export type ThemeKey = "marketing" | "design" | "web" | "ia" | "apps";

// --- Tokens de cor (pares por tema)
const GRADIENTS: Record<ThemeKey, [string, string]> = {
  // azul claríssimo → azul muito claro
  marketing: ["#f6fbff", "#ecf5ff"],
  // azul muito claro → azul claro
  design: ["#ecf5ff", "#deedff"],
  // azul claro → rosa claríssimo
  web: ["#deedff", "#fff2f6"],
  // rosa claríssimo → rosa muito claro
  ia: ["#fff2f6", "#ffeaf2"],
  // rosa muito claro → rosa claro
  apps: ["#ffeaf2", "#ffdfe9"],
};

function buildGradient(c1: string, c2: string, angleDeg: number, opacity: number) {
  return `linear-gradient(${angleDeg}deg, ${withAlpha(c1, opacity)} 0%, ${withAlpha(c2, opacity)} 100%)`;
}

function withAlpha(hex: string, alpha: number) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface GradientBackdropProps {
  /** Modo controlado: se passar theme, o componente segue esta prop. */
  theme?: ThemeKey;
  /** Modo não-controlado: tema inicial, depois muda via evento `theme-change`. */
  initialTheme?: ThemeKey;
  /** Opacidade do layer do degradé [0..1]. Default 0.85 */
  opacity?: number;
  /** Ângulo do gradiente em graus. Default 180 (vertical). */
  angleDeg?: number;
  /** z-index do wrapper. Default -10 (fica por trás do conteúdo). */
  zIndex?: number;
  /** Classe extra opcional. */
  className?: string;
}

/**
 * GradientBackdrop
 * Camada fixa com um degradé suave e translúcido sobre um fundo branco.
 * — 2 tons por secção, transição suave entre secções.
 * — Funciona em dois modos:
 *   1) Controlado (prop `theme`) — a página define o tema ativo;
 *   2) Não-controlado — escuta `window` por `theme-change` (detalhe: { theme }).
 */
export default function GradientBackdrop({
  theme: controlledTheme,
  initialTheme = "marketing",
  opacity = 0.15,
  angleDeg = 160,
  zIndex = 0,
  className,
}: GradientBackdropProps) {
  const [theme, setTheme] = useState<ThemeKey>(controlledTheme ?? initialTheme);
  const [prev, setPrev] = useState<ThemeKey | null>(null);

  // Se a prop theme for fornecida, atuamos como controlado
  useEffect(() => {
    if (!controlledTheme || controlledTheme === theme) return;
    setPrev(theme);
    setTheme(controlledTheme);
  }, [controlledTheme, theme]);

  // Modo não-controlado: ouvir o evento global "theme-change"
  useEffect(() => {
    if (controlledTheme) return; // quando controlado, ignora eventos
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { theme?: ThemeKey };
      if (!detail?.theme || detail.theme === theme) return;
      setPrev(theme);
      setTheme(detail.theme);
    };
    window.addEventListener("theme-change", onChange as EventListener);
    return () => window.removeEventListener("theme-change", onChange as EventListener);
  }, [controlledTheme, theme]);

  const gradients = useMemo(() => GRADIENTS, []);
  const current = gradients[theme];
  const previous = prev ? gradients[prev] : null;

  return (
  <div
    className={`fixed inset-0 pointer-events-none ${className ?? ""}`}
    style={{ zIndex, contain: "paint" }}
    aria-hidden
  >
    {/* Base branca por baixo, como especificado */}
    <div className="absolute inset-0 bg-white" />

    <AnimatePresence initial={false}>
      {previous && (
        <motion.div
          key={`prev-${prev}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: buildGradient(previous[0], previous[1], angleDeg, opacity),
            willChange: "opacity",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      )}

      <motion.div
        key={`cur-${theme}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{
          backgroundImage: buildGradient(current[0], current[1], angleDeg, opacity),
          willChange: "opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
    </AnimatePresence>
  </div>
);
}
