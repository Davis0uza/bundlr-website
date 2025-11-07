"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Types
export type ThemeKey = "marketing" | "design" | "web" | "ia" | "apps";

export interface ServicesNavProps {
  /** Qual secção está ativa neste momento */
  activeSection?: ThemeKey;
  /** Navegar para uma secção específica (override ao comportamento default de scroll para #section-<key>) */
  onNavigate?: (key: ThemeKey) => void;
  /** Disparado quando clicam em contactar */
  onContactClick?: () => void;
  /** Classe extra opcional */
  className?: string;
}

// --- Config dos temas (ícone + rótulo)
const THEMES: Record<ThemeKey, { label: string; icon: string }> = {
  marketing: { label: "Marketing", icon: "/icons/marketing.png" },
  design: { label: "Design", icon: "/icons/design.png" },
  web: { label: "Web", icon: "/icons/web.png" },
  ia: { label: "IA", icon: "/icons/ia.png" },
  apps: { label: "Apps", icon: "/icons/apps.png" },
};

// Utilitário simples para concatenar classes
function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ServicesNav({
  activeSection = "marketing",
  onNavigate,
  onContactClick,
  className,
}: ServicesNavProps) {
  const [isContactHover, setIsContactHover] = useState(false);

  // Ordenação fixa: Marketing, Design, Web, IA, Apps
  const themeOrder = useMemo<ThemeKey[]>(
    () => ["marketing", "design", "web", "ia", "apps"],
    []
  );

  const handleNavigate = useCallback(
    (key: ThemeKey) => {
      // Dispara trigger público para que a página possa transitar o fundo (gradiente)
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("theme-change", { detail: { theme: key } })
        );
      }

      if (onNavigate) {
        onNavigate(key);
        return;
      }

      // Comportamento default: scroll suave para a secção #section-<key>
      const el = document.getElementById(`section-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [onNavigate]
  );

  return (
    <nav
      className={cn(
        // Fundo translúcido e sticky
        "w-full sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/55 bg-white/70",
        "border-b border-black/5",
        className
      )}
      aria-label="Navegação dos serviços"
    >
      {/* Grid em 3 colunas para manter o botão 100% centrado independentemente das larguras esquerda/direita */}
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          "h-20 grid grid-cols-3 items-center"
        )}
      >
        {/* Esquerda: ícones de secções */}
        <div className="justify-self-start flex items-center gap-3 sm:gap-5">
          {themeOrder.map((key) => {
            const isActive = key === activeSection;
            const { icon, label } = THEMES[key];

            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => handleNavigate(key)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative overflow-hidden rounded-full bg-transparent",
                  // contorno fino por defeito, ligeiramente mais espesso no ativo
                  isActive ? "border-2" : "border",
                  "border-black/70 hover:border-black",
                  "transition-all duration-300",
                  // Tamanhos variam com ativo e viewport
                  isActive
                    ? "w-[56px] h-[56px] sm:w-[60px] sm:h-[60px]"
                    : "w-[44px] h-[44px] sm:w-[48px] sm:h-[48px]"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={isActive ? 28 : 24}
                    height={isActive ? 28 : 24}
                    priority={isActive}
                  />
                </motion.div>
                <span className="sr-only">{label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Centro: botão Contactar (sempre centrado na coluna 2) */}
        <motion.button
          type="button"
          onMouseEnter={() => setIsContactHover(true)}
          onMouseLeave={() => setIsContactHover(false)}
          onClick={onContactClick}
          className={cn(
            "justify-self-center group relative inline-flex items-center gap-3",
            "rounded-2xl border border-black/30 bg-transparent",
            "px-4 sm:px-5 py-2.5 transition-colors duration-300",
            isContactHover ? "bg-black/5" : "bg-transparent"
          )}
        >
          <Image
            src={
              isContactHover ? "/icons/contactar.gif" : "/icons/contactar.png"
            }
            alt="Contactar"
            width={20}
            height={20}
            className="shrink-0"
          />
          <span
            className={cn(
              "text-[15px] font-medium tracking-wide transition-colors",
              isContactHover ? "text-[#e27fa3]" : "text-neutral-800"
            )}
          >
            Contactar
          </span>
        </motion.button>

        {/* Direita: logo da Bundlr volta à home */}
        <Link
          href="/"
          aria-label="Voltar à página principal"
          className="justify-self-end shrink-0"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Image src="/logo.png" alt="Bundlr" width={112} height={28} />
          </motion.div>
        </Link>
      </div>
    </nav>
  );
}
