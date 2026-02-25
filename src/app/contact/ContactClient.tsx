"use client";

import Link from "next/link";
import Image from "next/image";
import ServicesNavPage3 from "@/components/ServicesNavPage3";
import AnimatedFooter from "@/components/AnimatedFooter";
import SmartComposer from "@/components/SmartComposer";
import ContactForm from "@/components/ContactForm";
import { ClipboardList } from "lucide-react";
import LavaBubbles from "@/components/LavaBubbles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactar | Bundlr — Vamos construir algo juntos",
  description: "Entre em contacto com a Bundlr. Peça um orçamento, agende uma reunião ou tire as suas dúvidas sobre os nossos serviços de design e tecnologia.",
};

// TODO: substitui pelos teus links de Google Forms
const FORM_COMECAR = "https://docs.google.com/forms/d/e/1FAIpQLSdbCNPIjxGAY4O-bBJf1WEf61dIW_r2b8i6UJTQmdV32_fK0g/viewform?usp=header";
const FORM_AGENDAR = "https://docs.google.com/forms/d/e/1FAIpQLSe68HTg1Db4NBW4xiIHdzchFDPNoz68QNiKWM81Tdx6V03bTg/viewform?usp=header";

export default function Page3() {
  return (
    <main className="relative min-h-screen bg-[#f5f7fb] overflow-hidden">
      {/* 3D Lava Bubbles background */}
      <LavaBubbles />
      {/* NAV FIXA NO TOPO */}
      <div className="relative z-10">
        <ServicesNavPage3 className="mb-10" />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 pb-28">
        {/* FORMULÁRIO DE CONTACTO */}
        <ContactForm className="mb-16 pb-16 border-b border-zinc-200/60" />

        {/* BLOCO 1 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
            Já tem uma ideia do que quer, vamos começar?
          </h2>

          <p className="mt-3 text-lg text-zinc-700/90">
            Entre em contacto connosco, vamos lançar o seu projeto!
          </p>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600/90 max-w-prose">
            Preencha um pequeno questionário, e vamos entrar em contacto consigo com
            mais detalhes e o orçamento. Tempo médio de resposta de 2 dias úteis.
          </p>

          <div className="mt-6">
            {/* BOTÃO "COMEÇAR" */}
            <Link
              href={FORM_COMECAR}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#f4b8d0]/25 hover:border-[#f4b8d0]/50"
              style={{
                background: "linear-gradient(135deg, rgba(247,199,231,0.4) 0%, rgba(207,231,255,0.4) 100%)",
              }}
            >
              <span className="tracking-wide">COMEÇAR</span>
              <ClipboardList
                size={20}
                aria-hidden
                className="text-slate-700 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        {/* BLOCO 2 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
            Tem um projeto em mente mas não sabe como começar?
          </h2>

          <p className="mt-3 text-lg text-zinc-700/90">
            Entre em contacto connosco, vamos marcar uma reunião.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600/90 max-w-prose">
            Forneça o seu contacto e melhor hora para contactar, escolha como ser
            contactado, e vamos responder com mais detalhes e confirmar a sua
            reunião. Tempo médio de resposta de 2 dias úteis.
          </p>

          <div className="mt-6">
            {/* BOTÃO "AGENDAR" */}
            <Link
              href={FORM_AGENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#f4b8d0]/25 hover:border-[#f4b8d0]/50"
              style={{
                background: "linear-gradient(135deg, rgba(247,199,231,0.4) 0%, rgba(207,231,255,0.4) 100%)",
              }}
            >
              <span className="tracking-wide">AGENDAR</span>
              <Image
                src="/Icons/agendar.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        {/* BLOCO 3 — SmartComposer */}
        <section>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
            Não encontrou o que procurava? Pergunte-nos diretamente.
          </h3>

          {/* Podes passar whatsappNumber / emailTo se quiseres sobrescrever os defaults */}
          <div className="mt-6">
            <SmartComposer
              whatsappNumber="351912345678" // opcional: sem o '+'
              emailTo="bundlr.solutions@gmail.com" // opcional
              scheduleUrl="/contact" // opcional (acrescenta ?note=mensagem)
            />
          </div>
        </section>
      </div>

      {/* FOOTER ANIMADO */}
      <AnimatedFooter
        showWaves
        slogan="Vamos construir algo em conjunto?"
        subline="Conte-nos onde está e para onde quer ir — nós tratamos do caminho."
      />
    </main>
  );
}
