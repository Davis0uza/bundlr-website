"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ChatFAQ from "@/components/ChatFAQ";
import SmartComposer from "@/components/SmartComposer";
import RecommendedBundles from "@/components/RecommendedBundles";
import AnimatedFooter from "@/components/AnimatedFooter";
import ServicesSection from "@/components/ServicesSection";
import MethodSection from "@/components/MethodSection";
import HeroSceneWrapper from "@/components/HeroSceneWrapper";
import RotatingHeroTitle from "@/components/RotatingHeroTitle";

export default function HomeClient() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isClickedMobile, setIsClickedMobile] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    // Check if it's a mobile device (rough check via window width)
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsClickedMobile(true);

      // Delay navigation to let animation play
      setTimeout(() => {
        router.push("/contact");
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0b1220]">
      {/* ── HERO ── */}
      <section className="relative min-h-[620px] md:min-h-[700px] overflow-hidden bg-[#f5f7fb]">
        {/* 3D background */}
        <HeroSceneWrapper />

        {/* Frosted glass layer for text readability */}
        <div className="absolute inset-0 z-[5] backdrop-blur-sm bg-white/25" />

        {/* Content overlay */}
        <div className="relative z-20 mx-auto flex min-h-[620px] md:min-h-[700px] max-w-6xl flex-col items-center justify-center px-6 text-center">
          {/* Centered logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Bundlr — Estúdio de design e soluções tecnológicas em Portugal"
              width={140}
              height={36}
              className="mb-5 h-auto w-28 md:w-32"
              priority
            />
          </Link>

          {/* SEO H1 - Visually hidden but mapped by search engines */}
          <h1 className="sr-only">Bundlr | Soluções de Design, Apps e IA para o seu Negócio</h1>

          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#efd1f4]/40 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-widest text-[#9a7a8e] uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a7a8e]" style={{ animation: "dotPulse 2s ease-in-out infinite" }} />
            Grupo de Design e Soluções Tecnológicas
          </span>
          <style>{`
            @keyframes dotPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.8); }
            }
          `}</style>

          {/* Heading with rotating word */}
          <RotatingHeroTitle />

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg" style={{ textShadow: "0 0 8px rgba(255,255,255,0.1)" }}>
            Simplificamos o seu trabalho digital para que se possa focar no que
            realmente importa. Realizamos vários tipos de trabalhos no setor de
            informática, design e marketing, criando oportunidades para o seu
            negócio crescer e destacar-se.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              onClick={handleContactClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-[#3a3a4a] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#f4b8d0]/25 hover:border-[#f4b8d0]/50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244,184,208,0.35) 0%, rgba(191,229,255,0.35) 100%)",
              }}
            >
              <motion.span
                animate={
                  isClickedMobile
                    ? { scale: 1.15, color: "#e27fa3" }
                    : isHovered
                      ? { color: "#e27fa3" }
                      : { scale: 1, color: "#3a3a4a" }
                }
                transition={{ duration: 0.3 }}
              >
                Contactar Especialista
              </motion.span>
              <div className="relative h-5 w-5 shrink-0">
                <Image
                  src={isHovered ? "/Icons/contactar.gif" : "/Icons/contactar.png"}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 rounded-full border border-[#3a3a4a]/15 bg-white/20 px-7 py-3 text-sm font-semibold text-[#3a3a4a] backdrop-blur-sm transition-all duration-300 hover:bg-white/40 hover:border-[#3a3a4a]/25"
            >
              Serviços
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f7fb] to-transparent z-10 pointer-events-none" />
      </section>

      {/* ── METHOD SECTION ── */}
      <MethodSection />

      {/* ── SERVICES SECTION ── */}
      <ServicesSection />

      {/* ── MAIN CONTENT ── */}
      <main className="mx-auto max-w-6xl px-6 py-2">
        <ChatFAQ />
        <div className="mt-0">
          <SmartComposer
            whatsappNumber="351912345678"
            emailTo="bundlr.solutions@gmail.com"
            scheduleUrl="/contact"
          />
        </div>
        <RecommendedBundles selection={{ tag: "Destaque" }} />
      </main>

      <AnimatedFooter
        slogan="Ideias em pacote. Resultados sem stress."
        subline="BUNDLR — Design & TechSolutions."
      />
    </div>
  );
}