"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------- Tipos ------------------- */
export type ThemeKey = "marketing" | "design" | "web" | "ia" | "apps";

export interface ServicesNavPage3Props {
  /** opcional: qual secção queres destacar visualmente */
  activeSection?: ThemeKey;
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

/**
 * Navbar feita para PAGE 3:
 * - sem botão Contactar
 * - cada ícone envia para /page2#section-<key>
 */
export default function ServicesNavPage3({
  activeSection,
  className,
}: ServicesNavPage3Props) {
  const order: ThemeKey[] = ["marketing", "design", "web", "ia", "apps"];

  return (
    <nav
      className={cn(
        "w-full sticky top-0 z-[999] isolate",
        "backdrop-blur supports-[backdrop-filter]:bg-white/55 bg-white/70",
        "border-b border-black/5",
        className
      )}
      aria-label="Navegação dos serviços"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] items-center">
        {/* Esquerda: ícones que linkam para a page2 */}
        <div className="justify-self-start flex items-center gap-2 sm:gap-4">
          {order.map((key) => {
            const isActive = key === activeSection;
            const { icon, label } = THEMES[key];
            const href = `/services#section-${key}`; // ids da page2: section-marketing/design/web/ia/apps

            return (
              <Link key={key} href={href} aria-label={`${label} em page 2`}>
                <motion.button
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative overflow-hidden rounded-full",
                    isActive ? "border-2" : "border",
                    "border-black/70 hover:border-black transition-all duration-300",
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
              </Link>
            );
          })}
        </div>

        {/* Mobile: só o símbolo à direita */}
        <Link href="/" aria-label="Página inicial" className="justify-self-end sm:hidden shrink-0 mr-2">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Image src="/log.svg" alt="Bundlr" width={28} height={28} />
          </motion.div>
        </Link>

        {/* iPad/desktop: logo centrado */}
        <Link href="/" aria-label="Página inicial" className="hidden sm:block justify-self-center shrink-0">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Image src="/logo.png" alt="Bundlr" width={112} height={28} />
          </motion.div>
        </Link>

        {/* Direita: vazio (sem Contactar na page3) */}
        <div className="justify-self-end hidden sm:block" />
      </div>
    </nav>
  );
}
