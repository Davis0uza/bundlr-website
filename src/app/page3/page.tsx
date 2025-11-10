"use client";

import Link from "next/link";
import Image from "next/image";
import ServicesNav from "@/components/ServicesNav";
import AnimatedFooter from "@/components/AnimatedFooter";

export default function Page3() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* NAV FIXA NO TOPO */}
      <ServicesNav className="mb-10" />

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8 pb-20">
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
            <Link
              href="#formulario"
              className="group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 shadow-sm transition hover:bg-white"
            >
              <span className="grid size-9 place-items-center rounded-xl border border-black/15 bg-white/70 group-hover:bg-white">
                <Image
                  src="/icons/form.png"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </span>
              <span className="text-sm font-medium tracking-wide text-zinc-900">
                COMEÇAR
              </span>
            </Link>
          </div>
        </section>

        {/* BLOCO 2 */}
        <section>
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
            <Link
              href="#agendar"
              className="group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 shadow-sm transition hover:bg-white"
            >
              <span className="grid size-9 place-items-center rounded-xl border border-black/15 bg-white/70 group-hover:bg-white">
                <Image
                  src="/icons/agendar.png"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </span>
              <span className="text-sm font-medium tracking-wide text-zinc-900">
                AGENDAR
              </span>
            </Link>
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
