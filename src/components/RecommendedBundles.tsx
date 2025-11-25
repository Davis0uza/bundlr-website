// components/RecommendedBundles.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BUNDLES, type Bundle } from "@/data/bundles";

/** Tipo das tags, inferido diretamente dos bundles */
type BundleTag = NonNullable<Bundle["tags"]>[number];

export type BundleSelection = {
  ids?: string[];
  indices?: number[];
  tag?: BundleTag | string;
  limit?: number;
};

/** Aplica a seleção pedida (ids, índices, tag, limit) */
function selectBundles(selection: BundleSelection | undefined): Bundle[] {
  const all = BUNDLES;
  const sel = selection;
  if (!sel) return all;

  // Prioridade: ids > indices > tag
  if (sel.ids?.length) {
    const byId = new Map(all.map((b) => [b.id, b] as const));
    const ordered = sel.ids.map((id) => byId.get(id)).filter(Boolean) as Bundle[];
    return sel.limit ? ordered.slice(0, sel.limit) : ordered;
  }

  if (sel.indices?.length) {
    const ordered = sel.indices.map((i) => all[i]).filter(Boolean) as Bundle[];
    return sel.limit ? ordered.slice(0, sel.limit) : ordered;
  }

  if (sel.tag) {
    const tag = sel.tag as BundleTag;
    const filtered = all.filter((b) => b.tags?.includes(tag));
    return sel.limit ? filtered.slice(0, sel.limit) : filtered;
  }

  return sel.limit ? all.slice(0, sel.limit) : all;
}

export default function RecommendedBundles({
  className = "",
  selection,
}: {
  className?: string;
  selection?: BundleSelection;
}) {
  const bundles = useMemo(() => selectBundles(selection), [selection]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);

  // Controla se estamos no início para mostrar/esconder o swipe hint
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setAtStart(el.scrollLeft < 8);
    };

    handleScroll(); // estado inicial
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  if (!bundles.length) return null;

  return (
    <section className={`mt-10 md:mt-14 ${className}`}>
      {/* container central, sem fundo próprio */}
      <div className="mx-auto max-w-4xl px-4">
        {/* Título + descrição */}
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
              Bundles recomendados
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              Sugestões de serviços combinados. Personalizamos ao seu caso —
              sem preços aqui.
            </p>
          </div>
        </div>

        {/* Carrossel horizontal por arrasto (sem fundo extra) */}
        <div
          ref={scrollRef}
          className="-mx-4 mt-5 overflow-x-auto pb-3 pl-4 pr-4 md:mx-0 md:mt-6"
        >
          <div className="flex gap-4 md:gap-6 pl-1">
            {bundles.map((b) => (
              <article
                key={b.id}
                className="flex w-[min(320px,85vw)] flex-shrink-0 flex-col rounded-3xl border border-[#dde3f5] bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)]"
              >
                {/* Header do bundle */}
                <header className="mb-3">
                  <h3 className="text-xs font-semibold tracking-[0.16em] text-[#6b7390]">
                    {b.name.toUpperCase()}
                  </h3>
                  {b.subtitle && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {b.subtitle}
                    </p>
                  )}
                </header>

                {/* Grid 2x2: 3 serviços + 1 CTA "Quero!" */}
                <div className="grid grid-cols-2 gap-3">
                  {b.grid.map((item, idx) =>
                    item.kind === "service" ? (
                      <div
                        key={idx}
                        className="flex flex-col justify-between rounded-2xl border border-[#e2e7f6] bg-[#f8f9ff] px-3 py-3 text-left"
                      >
                        <span className="text-xs font-semibold text-slate-900">
                          {item.label}
                        </span>
                        {item.note && (
                          <span className="mt-1 text-[11px] leading-snug text-slate-500">
                            {item.note}
                          </span>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={`/contact?bundle=${encodeURIComponent(b.name)}`}
                        className="group flex h-full flex-col items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ffd1f7_0%,#bfe5ff_100%)] text-[#0b1220] shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
                        aria-label={`Quero o plano ${b.name}`}
                      >
                        <span className="text-sm font-semibold">Quero!</span>
                        <ArrowRight
                          size={18}
                          className="mt-1 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    )
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Hint de swipe — só mobile, menor e centrado */}
        <div className="mt-3 flex justify-center md:hidden">
          {atStart && (
            <Image
              src="/swipe.png"              // garante que está em public/swipe.png
              alt="Arraste para ver mais bundles"
              width={80}                    // metade do tamanho anterior
              height={20}
              className="h-auto w-20 opacity-80"
            />
          )}
        </div>
      </div>
    </section>
  );
}
