"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
    {
        key: "marketing",
        label: "Marketing",
        description: "Campanhas, SEO, redes sociais e estratégias de crescimento digital.",
        icon: "/Icons/marketing.png",
        gif: "/Icons/marketing.gif",
        href: "/services#section-marketing",
    },
    {
        key: "design",
        label: "Design",
        description: "Identidade visual, UI/UX, branding e design systems completos.",
        icon: "/Icons/design.png",
        gif: "/Icons/design.gif",
        href: "/services#section-design",
    },
    {
        key: "web",
        label: "Web",
        description: "Websites, landing pages, lojas online e plataformas à medida.",
        icon: "/Icons/web.png",
        gif: "/Icons/web.gif",
        href: "/services#section-web",
    },
    {
        key: "ia",
        label: "IA",
        description: "Automações inteligentes, chatbots, e integrações com IA.",
        icon: "/Icons/ia.png",
        gif: "/Icons/ia.gif",
        href: "/services#section-ia",
    },
    {
        key: "apps",
        label: "Apps",
        description: "Aplicações mobile e web, MVPs, e soluções cross-platform.",
        icon: "/Icons/apps.png",
        gif: "/Icons/apps.gif",
        href: "/services#section-apps",
    },
];

function ServiceCard({
    service,
    index,
}: {
    service: (typeof SERVICES)[number];
    index: number;
}) {
    const [hover, setHover] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={service.href}
                className="group relative block rounded-2xl border border-[#efd1f4]/40 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffd1f7]/20 hover:scale-[1.08] hover:border-[#efd1f4]/70"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="relative z-10">
                    {/* Round icon container — pink background */}
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ffeaf2] transition-all duration-300 group-hover:bg-[#ffd7e6] group-hover:scale-125">
                        <Image
                            src={hover ? service.gif : service.icon}
                            alt={service.label}
                            width={28}
                            height={28}
                            className="h-7 w-7"
                        />
                    </div>

                    {/* Text */}
                    <h3 className="mb-1.5 text-base font-semibold text-[#0b1220] transition-colors duration-300 group-hover:text-[#e27fa3]">
                        {service.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                        {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#d4a0b9] transition-colors group-hover:text-[#e27fa3]">
                        Explorar
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ServicesSection() {
    return (
        <section id="servicos" className="py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center md:mb-14"
                >
                    <span className="mb-3 inline-block rounded-full bg-[#ffeaf2] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#d4a0b9]">
                        Serviços
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-[#0b1220] md:text-3xl">
                        Os Nossos Serviços
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
                        Soluções integradas em cinco áreas-chave para impulsionar a presença
                        digital do seu negócio.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={s.key} service={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
