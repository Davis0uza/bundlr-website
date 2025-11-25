"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------- Tipos ------------------- */
export type ThemeKey = "marketing" | "design" | "web" | "ia" | "apps";

export interface ServicesNavProps {
  activeSection?: ThemeKey;
  onNavigate?: (key: ThemeKey) => void;
  onContactClick?: () => void;
  className?: string;
}

/* ------------------- Ícones ------------------- */
const THEMES: Record<ThemeKey, { label: string; icon: string }> = {
  marketing: { label: "Marketing", icon: "/Icons/marketing.png" },
  design: { label: "Design", icon: "/Icons/design.png" },
  web: { label: "Web", icon: "/Icons/web.png" },
  ia: { label: "IA", icon: "/Icons/ia.png" },
  apps: { label: "Apps", icon: "/Icons/apps.png" },
};

function cn(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export default function ServicesNav({
  activeSection,
  onNavigate,
  onContactClick,
  className,
}: ServicesNavProps) {
  const [hover, setHover] = useState(false);
  const order = useMemo<ThemeKey[]>(() => ["marketing", "design", "web", "ia", "apps"], []);

  const go = useCallback(
    (key: ThemeKey) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: key } }));
      }
      if (onNavigate) return onNavigate(key);

      const el = document.getElementById(`section-${key}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [onNavigate]
  );

   return (
    <>
      <nav
        className={cn(
          "w-full sticky top-0 z-[999] isolate",
          "backdrop-blur supports-[backdrop-filter]:bg-white/55 bg-white/70",
          "border-b border-black/5",
          className
        )}
        aria-label="Navegação dos serviços"
      >
        {/* 2 colunas no mobile; no iPad/desktop usa 3 colunas com centro auto,
            para garantir o logo SEM sobrepor os lados */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] items-center">

          {/* Esquerda: ícones */}
          <div className="justify-self-start flex items-center gap-2 sm:gap-4">
          {order.map((key) => {
            const isActive = key === activeSection;
            const { icon, label } = THEMES[key];
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => go(key)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative overflow-hidden rounded-full",
                  isActive ? "border-2" : "border",
                  "border-black/70 hover:border-black transition-all duration-300",
                  // tamanhos mais contidos no mobile
                  isActive
                    ? "w-[52px] h-[52px] sm:w-[58px] sm:h-[58px]"
                    : "w-[40px] h-[40px] sm:w-[46px] sm:h-[46px]"
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
                    width={isActive ? 26 : 22}
                    height={isActive ? 26 : 22}
                    priority={isActive}
                  />
                </motion.div>
                <span className="sr-only">{label}</span>
              </motion.button>
            );
          })}
        </div>

          {/* Centro: LOGO */}
          {/* Mobile: apenas o símbolo (log.svg), à direita da fila de ícones */}
          <Link href="/" aria-label="Página inicial" className="justify-self-end sm:hidden shrink-0 mr-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Image src="/log.svg" alt="Bundlr" width={28} height={28} />
            </motion.div>
          </Link>

          {/* iPad/desktop: logo completo centrado e sem sobrepor */}
          <Link href="/" aria-label="Página inicial" className="hidden sm:block justify-self-center shrink-0">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Image src="/logo.png" alt="Bundlr" width={112} height={28} />
            </motion.div>
          </Link>

          {/* Direita: CONTACTAR (iPad/desktop) */}
          <div className="justify-self-end hidden sm:block">
            <Link
              href="/contact"
              onClick={onContactClick}
              aria-label="Ir para a página de contacto"
              className={cn(
                "group inline-flex items-center gap-3 rounded-2xl border border-black/30",
                "px-4 sm:px-5 py-2.5 transition-colors duration-300",
                hover ? "bg-black/5" : "bg-transparent"
              )}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={hover ? "/Icons/contactar.gif" : "/Icons/contactar.png"}
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
              <span className={cn("text-[15px] font-medium tracking-wide", hover ? "text-[#e27fa3]" : "text-neutral-800")}>
                Contactar
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile: botão flutuante de contactar mantém-se */}
      <div className="sm:hidden fixed top-[86px] right-4 z-[1000]">
        <Link
          href="/page3"
          onClick={onContactClick}
          className="group inline-flex items-center gap-3 rounded-2xl border border-black/30 bg-white/80 backdrop-blur px-4 py-2.5 shadow-sm"
          aria-label="Ir para a página de contacto"
        >
          <Image src="/Icons/contactar.png" alt="" width={20} height={20} className="shrink-0" />
          <span className="text-[15px] font-medium tracking-wide text-neutral-800">Contactar</span>
        </Link>
      </div>
    </>
  );
}
