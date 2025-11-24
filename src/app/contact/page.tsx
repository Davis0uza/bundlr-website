"use client";

import Link from "next/link";
import Image from "next/image";
import ServicesNavPage3 from "@/components/ServicesNavPage3";
import AnimatedFooter from "@/components/AnimatedFooter";
import SmartComposer from "@/components/SmartComposer";

// TODO: substitui pelos teus links de Google Forms
const FORM_COMECAR = "https://docs.google.com/forms/d/e/1FAIpQLSdbCNPIjxGAY4O-bBJf1WEf61dIW_r2b8i6UJTQmdV32_fK0g/viewform?usp=header";
const FORM_AGENDAR = "https://docs.google.com/forms/d/e/1FAIpQLSe68HTg1Db4NBW4xiIHdzchFDPNoz68QNiKWM81Tdx6V03bTg/viewform?usp=header";

export default function Page3() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* NAV FIXA NO TOPO */}
      <ServicesNavPage3 className="mb-10" />

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8 pb-28">
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
              className="group inline-flex items-center gap-3 rounded-2xl border border-black/10
                        bg-gradient-to-br from-[#f7c7e7] via-[#e7d7ff] to-[#cfe7ff]
                        px-6 py-3 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-sm font-semibold tracking-wide text-slate-800">
                COMEÇAR
              </span>
              <Image
                src="/icons/form.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
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
              className="group inline-flex items-center gap-3 rounded-2xl border border-black/10
                        bg-gradient-to-br from-[#f7c7e7] via-[#e7d7ff] to-[#cfe7ff]
                        px-6 py-3 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-sm font-semibold tracking-wide text-slate-800">
                AGENDAR
              </span>
              <Image
                src="/icons/agendar.svg"
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
