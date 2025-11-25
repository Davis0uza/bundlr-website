"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ServicesNav, { ThemeKey } from "@/components/ServicesNav";
import { SERVICE_SECTIONS, type ServiceSection } from "@/data/services";
import { motion, type Variants, type TargetAndTransition } from "framer-motion";
import AnimatedFooter from "@/components/AnimatedFooter";

// Lazy para evitar hidratação pesada
const RecommendedBundles = dynamic(() => import("@/components/RecommendedBundles"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/* Gradientes simples por secção (aplicados diretamente em cada <section>) */
const GRADIENTS: Record<ThemeKey, [string, string]> = {
  apps: ["#ecf5ff","#f6fbff"],
  ia: ["#deedff","#ecf5ff"],
  web: ["#fff2f6", "#deedff"],
  design: [ "#ffeaf2", "#fff2f6"],
  marketing: ["#ffe0e0", "#ffeaf2"],
};
/* ------------------------------------------------------------------ */
type PhraseChildVariants = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
};

type PhraseVariantConfig = {
  hidden?: TargetAndTransition;
  visible?: TargetAndTransition;
  child?: PhraseChildVariants;
  wiggle?: TargetAndTransition;
};



/* Animações da frase — marketing passa a usar o mesmo estilo de apps */
const phraseVariants: Record<ThemeKey, PhraseVariantConfig> = {
  marketing: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
    child: {
      hidden: { y: 10, opacity: 0 },
      visible: { y: [10, -2, 0], opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    },
  },
  design: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035 } },
    child: {
      hidden: { y: 12, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 24 } },
    },
  },
  web: {
    hidden: { x: -24, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  },
  ia: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.05 } },
    wiggle: {
      x: [0, 0.6, -0.6, 0.4, 0],
      filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
      transition: { duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
    },
  },
  apps: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
    child: {
      hidden: { y: 10, opacity: 0 },
      visible: { y: [10, -2, 0], opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    },
  },
};

const LAST_THEME = SERVICE_SECTIONS[SERVICE_SECTIONS.length - 1].key as ThemeKey;
const LAST_END_COLOR = GRADIENTS[LAST_THEME][1];

function AnimatedPhrase({ theme, text }: { theme: ThemeKey; text: string }) {
  const v = phraseVariants[theme];
  const cls = "text-xl sm:text-2xl font-medium text-neutral-800";

  // Marketing usa a mesma lógica de apps (stagger de caracteres)
    if (theme === "design" || theme === "apps" || theme === "marketing") {
    return (
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={v as Variants}
        className={cls}
      >
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            variants={v.child as unknown as Variants}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.p>
    );
  }
  if (theme === "ia") {
    return (
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={v as Variants}
        className={cls}
      >
        <motion.span animate={v.wiggle}>{text}</motion.span>
      </motion.p>
    );
  }
  return (
  <motion.p
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.6 }}
    variants={v as Variants}
    className={cls}
  >
    {text}
  </motion.p>
);

}

export default function Page() {
  const [active, setActive] = useState<ThemeKey>("marketing");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Atualiza qual secção está mais visível (para navbar)
  // Atualiza qual secção está mais “central” no viewport do container (para navbar)
useEffect(() => {
  const root = containerRef.current;
  if (!root) return;

  const sections = Array.from(root.querySelectorAll<HTMLElement>("section[data-key]"));
  if (sections.length === 0) return;

  const handleScroll = () => {
    const rootRect = root.getBoundingClientRect();
    const rootCenter = (rootRect.top + rootRect.bottom) / 2;

    let bestKey: ThemeKey | null = null;
    let bestDist = Infinity;

    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      const sectionCenter = (rect.top + rect.bottom) / 2;
      const dist = Math.abs(sectionCenter - rootCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestKey = s.getAttribute("data-key") as ThemeKey | null;
      }
    }

    if (bestKey && bestKey !== active) {
      setActive(bestKey);
    }
  };

  // Atualiza logo ao entrar na página
  handleScroll();

  root.addEventListener("scroll", handleScroll, { passive: true });
  return () => root.removeEventListener("scroll", handleScroll);
}, [active]);

      // Faz scroll dentro do container para uma secção específica (sem snap nem smooth)
  const scrollToSection = (id: string) => {
    const root = containerRef.current;
    if (!root) return;

    const el = document.getElementById(id);
    if (!el) return;

    // Scroll normal
    el.scrollIntoView({ behavior: "auto", block: "start" });
  };

      // Quando a page abre (ou o hash muda de verdade), scroll normal para a secção
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollByHash = () => {
      const { hash } = window.location;
      if (!hash) return;

      const id = hash.slice(1); // "#section-web" -> "section-web"
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({ behavior: "auto", block: "start" });
    };

    // Ao entrar em /services#section-...
    scrollByHash();

    // Se o hash mudar já dentro da página (ex: link anchor interno)
    window.addEventListener("hashchange", scrollByHash);
    return () => window.removeEventListener("hashchange", scrollByHash);
  }, []);


  const handleNavigate = (key: ThemeKey) => {
    const id = `section-${key}`;
    scrollToSection(id);
    if (typeof window !== "undefined") {
      const newHash = `#${id}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash);
      }
    }
  };

  return (
    <div className="relative">
      <ServicesNav activeSection={active} onNavigate={handleNavigate} />
      <div
        ref={containerRef}
        className="
                h-[100svh] md:h-[100vh]
                overflow-y-auto overscroll-y-contain
                overflow-x-hidden
                touch-pan-y
                scroll-pt-20
                [scrollbar-gutter:stable]
              "
      >


        {SERVICE_SECTIONS.map((s, i) => (
        <Section key={s.key} data={s} isLast={i === SERVICE_SECTIONS.length - 1} />
        ))}

        <div className="snap-start mt-[-1px]" style={{ backgroundColor: LAST_END_COLOR }}>
            <AnimatedFooter />
        </div>
      </div>
    </div>
  );
}

function Section({ data, isLast = false }: { data: ServiceSection; isLast?: boolean }) {
  const theme = data.key as ThemeKey;
  const isMarketing = theme === "marketing";
  const [c1, c2] = GRADIENTS[theme];
  const tagForBundles = data.title;

  return (
    <section
      id={data.id}
      data-key={theme}
      className="min-h-[100svh] md:min-h-[100vh] flex items-stretch"
      style={{ backgroundImage: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)` }}
    >
      {/* Topo e fundo com padding ajustado por secção */}
      <div
        className={[
          "w-full mx-auto max-w-7xl px-6 lg:px-10",
          isMarketing ? "pt-28 md:pt-32" : "pt-12 md:pt-14", // topo extra só no marketing
          isLast ? "pb-28 md:pb-32" : "pb-16 md:pb-20",
        ].join(" ")}
      >
        {/* Linha 1: texto + imagem */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          {/* Texto */}
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900"
            >
              {data.title}
            </motion.h2>

            <div className="mt-3">
              <AnimatedPhrase theme={theme} text={data.phrase} />
            </div>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 text-base leading-relaxed text-neutral-700"
            >
              {data.text}
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="mt-6 grid sm:grid-cols-2 gap-2"
            >
              {data.bullets.map((b) => (
                <motion.li
                  key={b}
                  variants={{ hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className="flex items-start gap-2 text-neutral-800"
                >
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-neutral-800" />
                  <span className="text-sm sm:text-[15px]">{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Imagem (menor e à direita) */}
          <div className="col-span-12 md:col-span-5 flex items-start justify-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-[5/4]">
              <Image
                src={data.image ?? `/Icons/${theme}.png`}
                alt={data.title}
                fill
                className="object-contain drop-shadow-sm"
                priority={theme === "marketing"}
              />
            </div>
          </div>

          {/* Bundles + “respiro” extra (só nas que NÃO são marketing) */}
          <div className="col-span-12">
            <div className="mt-2">
              <RecommendedBundles selection={{ tag: tagForBundles }} />
            </div>
            {!isMarketing && <div className="h-10 md:h-16" />} {/* espaço extra pós-bundles */}
          </div>
        </div>
      </div>
    </section>
  );
}
