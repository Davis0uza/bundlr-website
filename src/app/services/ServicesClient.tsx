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

const EyeScene = dynamic(() => import("@/components/EyeScene"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/* Gradientes simples por secção (aplicados diretamente em cada <section>) */
const GRADIENTS: Record<ThemeKey, [string, string]> = {
  apps: ["#ecf5ff", "#f6fbff"],
  ia: ["#deedff", "#ecf5ff"],
  web: ["#fff2f6", "#deedff"],
  design: ["#ffeaf2", "#fff2f6"],
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

export default function ServicesClient() {
  const [active, setActive] = useState<ThemeKey>("marketing");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Atualiza qual secção está mais visível (para navbar)
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

    handleScroll();

    root.addEventListener("scroll", handleScroll, { passive: true });
    return () => root.removeEventListener("scroll", handleScroll);
  }, [active]);

  const scrollToSection = (id: string) => {
    const root = containerRef.current;
    if (!root) return;

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "auto", block: "start" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollByHash = () => {
      const { hash } = window.location;
      if (!hash) return;

      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({ behavior: "auto", block: "start" });
    };

    scrollByHash();

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
    <div className="relative h-[100svh] md:h-[100vh] flex flex-col overflow-hidden">
      <ServicesNav activeSection={active} onNavigate={handleNavigate} />
      <div
        ref={containerRef}
        className="
                flex-1
                overflow-y-auto overscroll-y-contain
                overflow-x-hidden
                touch-pan-y
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

/* ── Theme accent colors for titles & decorations ── */
const THEME_ACCENTS: Record<ThemeKey, { title: string; dot: string; glow: string }> = {
  marketing: { title: "#d94a7b", dot: "#e06a94", glow: "rgba(224,106,148,0.15)" },
  design: { title: "#9b59b6", dot: "#a66bbf", glow: "rgba(155,89,182,0.15)" },
  web: { title: "#3a7bd5", dot: "#5b94de", glow: "rgba(58,123,213,0.15)" },
  ia: { title: "#5b6abf", dot: "#7a84d4", glow: "rgba(91,106,191,0.15)" },
  apps: { title: "#5b9bd5", dot: "#7ab3e0", glow: "rgba(91,155,213,0.15)" },
};

/* ── Per-theme image animation config ── */
const IMAGE_ANIMS: Record<ThemeKey, { name: string; origin: string }> = {
  marketing: { name: "marketingFloat 6s ease-in-out infinite", origin: "center center" },
  design: { name: "designShakeFloat 10s ease-in-out infinite", origin: "center center" },
  web: { name: "webSpaceFloat 10s ease-in-out infinite", origin: "center center" },
  ia: { name: "iaWave 8s ease-in-out infinite", origin: "center bottom" },
  apps: { name: "appFlip 6s ease-in-out infinite", origin: "center center" },
};

function Section({ data, isLast = false }: { data: ServiceSection; isLast?: boolean }) {
  const theme = data.key as ThemeKey;
  const isMarketing = theme === "marketing";
  const [c1, c2] = GRADIENTS[theme];
  const tagForBundles = data.title;
  const accent = THEME_ACCENTS[theme];

  return (
    <section
      id={data.id}
      data-key={theme}
      className="relative min-h-[100svh] md:min-h-[100vh] flex items-stretch overflow-hidden"
      style={{ backgroundImage: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)` }}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-40"
        style={{ background: accent.glow }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: accent.glow }}
      />

      <motion.div
        className="pointer-events-none absolute top-0 left-0 h-1 rounded-full"
        style={{ background: accent.title }}
        initial={{ width: "0%" }}
        whileInView={{ width: "40%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div
        className={[
          "relative z-10 w-full mx-auto max-w-7xl px-6 lg:px-10",
          "pt-28 md:pt-32",
          isLast ? "pb-28 md:pb-32" : "pb-16 md:pb-20",
        ].join(" ")}
      >
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
            >
              <span style={{ color: accent.title }}>{data.title}</span>
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
                  <span
                    className="mt-1.5 inline-block h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accent.dot }}
                  />
                  <span className="text-sm sm:text-[15px]">{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="col-span-12 md:col-span-5 flex items-start justify-end">
            <motion.div
              className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-[4/3] overflow-visible"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ perspective: "800px" }}
            >
              <div
                className="absolute inset-4 rounded-3xl blur-2xl opacity-50"
                style={{
                  background: accent.glow,
                  animation: "imageGlow 4s ease-in-out infinite alternate",
                }}
              />
              <div
                className="relative w-full h-full"
                style={{
                  animation: theme === "marketing" ? "none" : IMAGE_ANIMS[theme].name,
                  transformStyle: "preserve-3d",
                  transformOrigin: IMAGE_ANIMS[theme].origin,
                }}
              >
                {theme === "marketing" ? (
                  <EyeScene />
                ) : (
                  <Image
                    src={data.image ?? `/Icons/${theme}.png`}
                    alt={data.title}
                    fill
                    className="object-contain drop-shadow-lg"
                    priority={false}
                  />
                )}
              </div>
            </motion.div>
          </div>

          <div className="col-span-12">
            <div className="mt-2">
              <RecommendedBundles selection={{ tag: tagForBundles }} />
            </div>
            {!isMarketing && <div className="h-10 md:h-16" />}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marketingFloat {
          0%   { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          25%  { transform: translateY(-8px) rotateX(2deg) rotateY(-1.5deg); }
          50%  { transform: translateY(-4px) rotateX(-1deg) rotateY(2deg); }
          75%  { transform: translateY(-10px) rotateX(1.5deg) rotateY(-1deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
        }

        @keyframes designShakeFloat {
          0%   { transform: translateX(0) translateY(0) rotate(0deg); }
          2%   { transform: translateX(-8px) translateY(-3px) rotate(-3deg); }
          4%   { transform: translateX(9px) translateY(2px) rotate(3.5deg); }
          6%   { transform: translateX(-10px) translateY(-4px) rotate(-4deg); }
          8%   { transform: translateX(8px) translateY(3px) rotate(3deg); }
          10%  { transform: translateX(-9px) translateY(-2px) rotate(-3.5deg); }
          12%  { transform: translateX(10px) translateY(4px) rotate(4deg); }
          14%  { transform: translateX(-7px) translateY(-3px) rotate(-2.5deg); }
          16%  { transform: translateX(6px) translateY(2px) rotate(2deg); }
          18%  { transform: translateX(-8px) translateY(-2px) rotate(-3deg); }
          20%  { transform: translateX(7px) translateY(3px) rotate(2.5deg); }
          22%  { transform: translateX(-5px) translateY(-2px) rotate(-2deg); }
          24%  { transform: translateX(6px) translateY(1px) rotate(1.5deg); }
          26%  { transform: translateX(-4px) translateY(-1px) rotate(-1.5deg); }
          28%  { transform: translateX(3px) translateY(1px) rotate(1deg); }
          30%  { transform: translateX(-2px) translateY(0px) rotate(-0.5deg); }
          32%  { transform: translateX(1px) translateY(0px) rotate(0.3deg); }
          35%  { transform: translateX(0) translateY(0) rotate(0deg); }
          50%  { transform: translateY(-8px) rotateX(1.5deg) rotateY(-1deg); }
          70%  { transform: translateY(-3px) rotateX(-0.5deg) rotateY(1.5deg); }
          85%  { transform: translateY(-10px) rotateX(1deg) rotateY(-0.5deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
        }

        @keyframes webSpaceFloat {
          0%   { transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg); }
          15%  { transform: translate(8px, -14px) rotateX(2.5deg) rotateY(-2deg); }
          30%  { transform: translate(-5px, -6px) rotateX(-1.5deg) rotateY(3deg); }
          45%  { transform: translate(10px, -18px) rotateX(2deg) rotateY(-1deg); }
          60%  { transform: translate(-8px, -10px) rotateX(-2deg) rotateY(2.5deg); }
          75%  { transform: translate(4px, -16px) rotateX(1.5deg) rotateY(-2.5deg); }
          90%  { transform: translate(-3px, -5px) rotateX(-1deg) rotateY(1deg); }
          100% { transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg); }
        }

        @keyframes iaWave {
          0%   { transform: rotate(0deg) translateY(0px); }
          10%  { transform: rotate(6deg) translateY(-3px); }
          20%  { transform: rotate(-6deg) translateY(-2px); }
          28%  { transform: rotate(4deg) translateY(-1px); }
          36%  { transform: rotate(-3deg) translateY(0px); }
          42%  { transform: rotate(1.5deg) translateY(0px); }
          48%  { transform: rotate(0deg) translateY(0px); }
          62%  { transform: rotate(0deg) translateY(-8px); }
          78%  { transform: rotate(0deg) translateY(-4px); }
          90%  { transform: rotate(0deg) translateY(-10px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }

        @keyframes appFlip {
          0%   { transform: rotateY(0deg) translateY(0px); }
          10%  { transform: rotateY(22deg) translateY(-5px); }
          20%  { transform: rotateY(-4deg) translateY(-2px); }
          30%  { transform: rotateY(-25deg) translateY(-7px); }
          40%  { transform: rotateY(3deg) translateY(-3px); }
          50%  { transform: rotateY(20deg) translateY(-6px); }
          60%  { transform: rotateY(-5deg) translateY(-4px); }
          70%  { transform: rotateY(-22deg) translateY(-8px); }
          80%  { transform: rotateY(4deg) translateY(-3px); }
          90%  { transform: rotateY(18deg) translateY(-5px); }
          100% { transform: rotateY(0deg) translateY(0px); }
        }

        @keyframes imageGlow {
          0% { opacity: 0.3; transform: scale(0.95); }
          100% { opacity: 0.55; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
