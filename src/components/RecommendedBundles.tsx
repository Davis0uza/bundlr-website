// components/RecommendedBundles.tsx
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BUNDLES, type Bundle } from "@/data/bundles";

type BundleTag = NonNullable<Bundle["tags"]>[number];

export type BundleSelection = {
  ids?: string[];
  indices?: number[];
  tag?: BundleTag | string;
  limit?: number;
};

function selectBundles(selection: BundleSelection | undefined): Bundle[] {
  const all = BUNDLES;
  const sel = selection;
  if (!sel) return all;
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

/* ── Icons for bundle types ── */
const BUNDLE_ICONS: Record<string, React.ReactNode> = {
  "arranque-rapido": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  default: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
};

/* ── Single bundle card ── */
function BundleCard({ bundle, index }: { bundle: Bundle; index: number }) {
  const services = bundle.grid.filter((item) => item.kind === "service") as {
    kind: "service";
    label: string;
    note?: string;
  }[];

  const icon = BUNDLE_ICONS[bundle.id] ?? BUNDLE_ICONS.default;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex w-[min(300px,85vw)] flex-shrink-0 flex-col rounded-2xl border border-white/60 bg-white/50 p-6 backdrop-blur-md shadow-[0_2px_16px_rgba(244,184,208,0.08)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(244,184,208,0.18)] hover:scale-[1.04] hover:border-[#efd1f4]/60 hover:bg-white/70"
    >
      {/* Header: icon + name */}
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#efd1f4]/20 text-[#d4a0b9] transition-colors duration-300 group-hover:bg-[#efd1f4]/40 group-hover:text-[#e27fa3]">
          {icon}
        </span>
        <h3 className="text-[15px] font-bold text-[#0b1220] transition-colors duration-300 group-hover:text-[#e27fa3]">
          {bundle.name}
        </h3>
      </div>

      {/* Tags */}
      {(() => {
        const tags = bundle.tags?.filter((t) => t !== "Destaque") ?? [];
        if (!tags.length) return null;
        const TAG_COLORS: Record<string, string> = {
          Marketing: "bg-[#e6f7f0]/60 text-[#3a9b74] border-[#d0f0e0]/50",
          Design: "bg-[#ffeaf2]/60 text-[#d4799c] border-[#ffd7e6]/50",
          Web: "bg-[#e8f0ff]/60 text-[#5b7fc7] border-[#d4e4ff]/50",
          Apps: "bg-[#fff4e6]/60 text-[#c4883a] border-[#ffe8cc]/50",
          IA: "bg-[#f0eaff]/60 text-[#8b6fc0] border-[#e4d8ff]/50",
        };
        return (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-sm ${TAG_COLORS[tag] ?? "bg-slate-50/60 text-slate-500 border-slate-200/50"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        );
      })()}

      {/* Services checklist */}
      <ul className="mb-6 flex-1 space-y-3">
        {services.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4a0b9]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-[#3a3a4a] leading-snug">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <Link
        href={`/contact?bundle=${encodeURIComponent(bundle.name)}`}
        className="block rounded-xl border border-[#efd1f4]/40 bg-white/60 py-2.5 text-center text-sm font-semibold text-[#0b1220] backdrop-blur-sm transition-all duration-300 hover:bg-[#ffeaf2] hover:border-[#efd1f4]/70 hover:text-[#e27fa3]"
      >
        Personalizar
      </Link>
    </motion.article>
  );
}

/* ── Dot indicators ── */
function DotIndicators({
  total,
  scrollRef,
}: {
  total: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [active, setActive] = React.useState(0);
  const cardWidth = 320; // 300 + gap

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(idx, total - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef, total, cardWidth]);

  // Show max 5 dots
  const dotCount = Math.min(total, 5);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: dotCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            scrollRef.current?.scrollTo({
              left: i * cardWidth,
              behavior: "smooth",
            });
          }}
          className={`h-2 rounded-full transition-all duration-300 ${i === active % dotCount
            ? "w-6 bg-[#d4a0b9]"
            : "w-2 bg-[#efd1f4]/50 hover:bg-[#efd1f4]"
            }`}
          aria-label={`Bundle ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ── Main component ── */
export default function RecommendedBundles({
  className = "",
  selection,
}: {
  className?: string;
  selection?: BundleSelection;
}) {
  const bundles = useMemo(() => selectBundles(selection), [selection]);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  /* ── Drag-to-scroll ── */
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current!;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  };

  if (!bundles.length) return null;

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 py-14 md:py-16 mt-10 md:mt-14 ${className}`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-[#ffd1f7]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-96 rounded-full bg-[#bfe5ff]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 className="text-xl font-bold text-[#0b1220] md:text-2xl">
            Bundles recomendados
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Sugestões de serviços combinados — personalizamos ao seu caso.
          </p>
        </motion.div>

        {/* Carousel — draggable */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-6 cursor-grab select-none overflow-x-auto overflow-y-hidden px-6 py-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="flex gap-5">
            {bundles.map((b, i) => (
              <div key={b.id} style={{ scrollSnapAlign: "start" }}>
                <BundleCard bundle={b} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <DotIndicators total={bundles.length} scrollRef={scrollRef} />
      </div>
    </section>
  );
}
