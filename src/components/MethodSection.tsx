"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ── Data for the 3 method cards ── */
const STEPS = [
    {
        number: "01",
        name: "Consolidar",
        focus: "Análise de mercado • Auditoria técnica • Consultorias",
        impact:
            "Diagnosticamos oportunidades e entregamos um plano objetivo e adaptado ao seu negócio.",
        badge: "Análise Completa",
        cta: "Começar",
    },
    {
        number: "02",
        name: "Construir",
        focus: "Soluçoes Modernas • Automações • Websites",
        impact:
            "Websites, apps e automações, para construir ecossistemas digitais modernos.",
        badge: "Produção Escalável",
        cta: "Acompanhar",
    },
    {
        number: "03",
        name: "Crescer",
        focus: "Gestão • Campanhas • Conteúdo",
        impact:
            "Transforme a presença digital em resultados, previsibilidade, escala e consistência na aquisição e retenção.",
        badge: "Otimização e Suporte",
        cta: "Consultar",
    },
];

/* ── Animated rising wave SVG ── */
function RisingWaveChart({ hoveredIndex }: { hoveredIndex: number | null }) {
    const pathRef = useRef<SVGPathElement>(null);
    const [inView, setInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Growing wave path — trending upward left-to-right
    const wavePath =
        "M 0 85 C 40 80, 80 75, 120 68 S 200 50, 260 55 S 340 35, 400 30 S 480 18, 540 22 S 620 10, 680 8 S 740 5, 800 3";

    // Dot positions on the path (3 dots for the 3 steps)
    const dots = [
        { cx: 120, cy: 68 },
        { cx: 400, cy: 30 },
        { cx: 680, cy: 8 },
    ];

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || !pathRef.current) return;
        const path = pathRef.current;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        // Animate line drawing
        requestAnimationFrame(() => {
            path.style.transition = "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1)";
            path.style.strokeDashoffset = "0";
        });
    }, [inView]);

    return (
        <div ref={containerRef} className="mx-auto mt-8 mb-4 max-w-2xl px-4 md:mt-10 md:mb-6">
            <svg
                viewBox="0 -20 800 115"
                fill="none"
                className="w-full h-auto overflow-visible"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Gradient definition */}
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f4b8d0" />
                        <stop offset="50%" stopColor="#d4a0b9" />
                        <stop offset="100%" stopColor="#bfe5ff" />
                    </linearGradient>
                    <linearGradient id="wave-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f4b8d0" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#bfe5ff" stopOpacity="0.3" />
                    </linearGradient>
                    {/* Traveling dot glow */}
                    <radialGradient id="traveling-dot-glow">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#f4b8d0" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#bfe5ff" stopOpacity="0" />
                    </radialGradient>
                    <filter id="dot-blur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                    {/* Active dot glow */}
                    <filter id="active-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="5" />
                    </filter>
                </defs>

                {/* Glow behind the line */}
                <path
                    d={wavePath}
                    stroke="url(#wave-glow-gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className={`transition-opacity duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}
                    style={{ filter: "blur(6px)" }}
                />

                {/* Main animated line */}
                <path
                    ref={pathRef}
                    d={wavePath}
                    stroke="url(#wave-gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Traveling glowing dot */}
                {inView && (
                    <g>
                        {/* Outer glow halo */}
                        <circle r="12" fill="url(#traveling-dot-glow)" filter="url(#dot-blur)" opacity="0.8">
                            <animateMotion
                                dur="3.5s"
                                repeatCount="indefinite"
                                begin="2.5s"
                                path={wavePath}
                                rotate="auto"
                            />
                        </circle>
                        {/* Bright core */}
                        <circle r="3.5" fill="white" opacity="0.95">
                            <animateMotion
                                dur="3.5s"
                                repeatCount="indefinite"
                                begin="2.5s"
                                path={wavePath}
                                rotate="auto"
                            />
                        </circle>
                    </g>
                )}

                {/* Dots at step positions */}
                {dots.map((dot, i) => {
                    const isActive = hoveredIndex === i;
                    const dotColor = i === 0 ? "#f4b8d0" : i === 1 ? "#d4a0b9" : "#bfe5ff";
                    return (
                        <g key={i}>
                            {/* Active glow burst */}
                            <circle
                                cx={dot.cx}
                                cy={dot.cy}
                                r={isActive ? 18 : 10}
                                fill={dotColor}
                                filter="url(#active-dot-glow)"
                                className="transition-all duration-300"
                                style={{ opacity: isActive ? 0.7 : 0 }}
                            />
                            {/* Outer glow ring */}
                            <circle
                                cx={dot.cx}
                                cy={dot.cy}
                                r={isActive ? 14 : 10}
                                fill="none"
                                stroke={dotColor}
                                strokeWidth={isActive ? 2 : 1}
                                className={`transition-all duration-300 ${inView ? (isActive ? "opacity-80" : "opacity-40") : "opacity-0"}`}
                                style={{ transitionDelay: isActive ? "0s" : `${1.0 + i * 0.4}s` }}
                            />
                            {/* Main dot */}
                            <circle
                                cx={dot.cx}
                                cy={dot.cy}
                                r={isActive ? 7 : 5}
                                fill={isActive ? "#ffffff" : dotColor}
                                stroke={isActive ? dotColor : "none"}
                                strokeWidth={isActive ? 2 : 0}
                                className={`transition-all duration-300 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                                style={{
                                    transitionDelay: isActive ? "0s" : `${1.0 + i * 0.4}s`,
                                    transformOrigin: `${dot.cx}px ${dot.cy}px`,
                                }}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

/* ── Method card ── */
function MethodCard({
    step,
    index,
    onHover,
}: {
    step: (typeof STEPS)[number];
    index: number;
    onHover: (index: number | null) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                delay: index * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col rounded-2xl border border-[#efd1f4]/40 bg-white p-5 transition-all duration-300 hover:shadow-xl hover:shadow-[#ffd1f7]/15 hover:border-[#efd1f4]/70 sm:p-6 lg:hover:scale-[1.04]"
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
        >
            {/* Header: Number + Title + Mobile Toggle */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    {/* Step number — pink */}
                    <span className="text-4xl font-extrabold text-[#f4b8d0] select-none transition-colors duration-300 group-hover:text-[#e27fa3] md:text-5xl lg:text-6xl">
                        {step.number}
                    </span>
                    {/* Name */}
                    <h3 className="mt-0.5 text-lg font-bold text-[#0b1220] transition-colors duration-300 group-hover:text-[#e27fa3] md:text-xl">
                        {step.name}
                    </h3>

                    {/* Mini Foco - Always visible on mobile */}
                    <div className="mt-2 flex flex-col gap-0.5 sm:hidden">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#e27fa3]">
                            Foco
                        </span>
                        <p className="text-[13px] leading-snug text-slate-500 font-medium line-clamp-2">
                            {step.focus}
                        </p>
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf7fc] text-[#e27fa3] transition-transform duration-300 sm:hidden"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-label={isExpanded ? "Fechar detalhes" : "Ver detalhes"}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100 mt-5" : "max-h-0 opacity-0 sm:max-h-none sm:opacity-100 sm:mt-6"}`}>
                {/* Focus - Hidden on mobile if collapsed? No, hide it always on mobile body since it's in header */}
                <div className="mb-4 hidden sm:block">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#e27fa3]">
                        Foco
                    </span>
                    <div className="mt-1 rounded-lg border-l-2 border-[#f4b8d0] bg-[#faf7fc] px-3 py-2">
                        <p className="text-sm text-[#0b1220]">{step.focus}</p>
                    </div>
                </div>

                {/* Impact */}
                <div className="mb-5 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#d4a0b9] md:text-[11px]">
                        Impacto
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {step.impact}
                    </p>
                </div>

                {/* Footer: badge + CTA */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#f0e8f5]/60">
                    <span className="rounded-full bg-[#ffeaf2] px-3 py-1 text-[10px] font-semibold text-[#e27fa3] md:text-[11px]">
                        {step.badge}
                    </span>
                    <Link
                        href="/contact"
                        className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b1220] transition-colors hover:text-[#e27fa3]"
                    >
                        {step.cta}
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Main section ── */
export default function MethodSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold text-[#0b1220] md:text-3xl lg:text-4xl">
                        O nosso método
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-base text-slate-500">
                        Um processo claro e linear focado em resultados tangíveis para o seu
                        negócio.
                    </p>
                </motion.div>

                {/* Animated rising wave */}
                <RisingWaveChart hoveredIndex={hoveredIndex} />

                {/* 3 method cards */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
                    {STEPS.map((step, i) => (
                        <MethodCard key={step.number} step={step} index={i} onHover={setHoveredIndex} />
                    ))}
                </div>
            </div>
        </section>
    );
}
