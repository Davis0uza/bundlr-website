"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type GridItem =
  | { kind: "service"; label: string; note?: string }
  | { kind: "cta" };

type Bundle = {
  id: string;
  name: string;           // Ex.: Essencial, Standard, Avançado+
  subtitle?: string;      // Ex.: “web + ia + social”
  grid: [GridItem, GridItem, GridItem, GridItem]; // 2x2
};

export default function RecommendedBundles({
  emailTo = "hello@teu-dominio.com",
  className = "",
}: {
  emailTo?: string;
  className?: string;
}) {
  const bundles: Bundle[] = [
    {
      id: "essencial",
      name: "Essencial",
      subtitle: "web + ia + social",
      grid: [
        { kind: "service", label: "Web — Landing Page", note: "simples e moderno" },           // Mini → Landing Page
        { kind: "service", label: "IA — Chatbot WhatsApp", note: "≈ 1 000 conversas/mês" },     // Mini
        { kind: "service", label: "Social — Instagram", note: "4 posts/semana" },               // Mini
        { kind: "cta" },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      subtitle: "essencial + extras",
      grid: [
        { kind: "service", label: "Web — Login Google", note: "+ comentários" },                // Standard
        { kind: "service", label: "Marca — Logo animado", note: "variações cromáticas" },       // Standard
        { kind: "service", label: "IA — Chatbot WhatsApp", note: "≈ 5 000 conversas/mês" },     // Standard
        { kind: "cta" },
      ],
    },
    {
      id: "avancado",
      name: "Avançado +",
      subtitle: "e-commerce + identidade",
      grid: [
        { kind: "service", label: "Web — Reservas + Pagamentos" },                              // Pro
        { kind: "service", label: "Marca — Identidade Visual" },                                // Pro
        { kind: "service", label: "Social — Instagram + Facebook", note: "campanhas & captação" }, // Pro
        { kind: "cta" },
      ],
    },
  ];

  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  };

  const mailHref = (plan: string) => {
    const subject = `Interesse no plano ${plan} — Website Bundlr`;
    const body = [
      `Olá, estou interessado no plano ${plan}.`,
      ``,
      `O meu foco na adesão é : _______`,
      `Estou disponível para uma reunião: ______`,
      ``,
      `Cumprimentos,`,
      `"Seu Nome"`,
    ].join("\n");
    return `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
  };

  return (
    <section
      id="recomendados"
      className={`relative mx-auto max-w-6xl px-6 py-14 ${className}`}
      aria-label="Serviços Recomendados"
    >
      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0b1220] md:text-3xl">
          Bundles recomendados
        </h2>
        <p className="mt-1 text-sm text-[#51607a] md:text-base">
          Sugestões de serviços combinados. Personalizamos ao seu caso — sem preços aqui.
        </p>
      </header>

      {/* Controles */}
      <div className="relative">
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[#d7def0] bg-white p-2 shadow-sm hover:bg-white/90 md:block"
          aria-label="Anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {bundles.map((b) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="snap-center"
            >
              <div className="min-w-[320px] max-w-[360px] rounded-3xl border border-[#d7def0] bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-[#6b7a96]">
                      {b.name}
                    </div>
                    {b.subtitle && (
                      <div className="text-xs text-[#8a9ab8]">{b.subtitle}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                  {b.grid.map((cell, i) =>
                    cell.kind === "service" ? (
                      <div
                        key={i}
                        className="rounded-2xl border border-[#d7def0] bg-[#ffffff] p-3 shadow-sm"
                      >
                        <div className="text-[13px] font-medium leading-tight text-[#0b1220]">
                          {cell.label}
                        </div>
                        {cell.note && (
                          <div className="mt-0.5 text-[11px] text-[#6b7a96]">
                            {cell.note}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        key={i}
                        href={mailHref(b.name)}
                        className="group grid place-items-center rounded-2xl border border-transparent bg-[linear-gradient(135deg,#ffd1f7_0%,#bfe5ff_100%)] p-3 text-center text-[#0b1220] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        aria-label={`Quero o plano ${b.name}`}
                      >
                        <span className="text-base font-semibold">
                          Quero!
                        </span>
                        <ArrowRight
                          size={18}
                          className="mt-1 transition group-hover:translate-x-0.5"
                        />
                      </a>
                    )
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy("right")}
          className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[#d7def0] bg-white p-2 shadow-sm hover:bg-white/90 md:block"
          aria-label="Seguinte"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
