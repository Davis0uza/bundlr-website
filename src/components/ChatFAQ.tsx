"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useMemo, useRef } from "react";

// ChatFAQ — FAQ em formato de conversa
// - Perguntas (cliente) à DIREITA em azul.
// - Respostas (nossa equipa) à ESQUERDA em azul claro/lilás.
// - As frases animam letra-a-letra com efeito de "queda".
// - A animação só arranca quando o bloco entra no viewport (scroll).
// - Sem dependências extra além de framer-motion e tailwind.
//
// Uso:
//   import ChatFAQ from "@/components/ChatFAQ";
//   ...
//   <ChatFAQ />
//
// Personalização:
//   • Altere o array "items" para adaptar perguntas/respostas.
//   • Pode também passar uma prop items se quiser controlar fora do componente.

export type ChatItem = {
  role: "client" | "team"; // client => direita | team => esquerda
  text: string;
};

export default function ChatFAQ({ items: itemsProp }: { items?: ChatItem[] }) {
  const items = itemsProp ?? defaultItems;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.25 });

  return (
    <section
      ref={rootRef}
      id="faq"
      className="relative mx-auto max-w-5xl px-6 py-16 md:py-20"
    >
      <header className="mb-8 md:mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[#0b1220] md:text-3xl">
          FAQ em conversa
        </h2>
        <p className="mt-1 text-sm text-[#51607a] md:text-base">
          Perguntas reais que recebemos — respondidas como numa chat thread.
        </p>
      </header>

      <div className="space-y-5">
        {items.map((m, i) => (
          <ChatBubble
            key={i}
            align={m.role === "client" ? "right" : "left"}
            delay={i * 0.05}
          >
            <FallingText text={m.text} />
          </ChatBubble>
        ))}
      </div>
    </section>
  );
}

function ChatBubble({
  children,
  align,
  delay = 0,
}: {
  children: React.ReactElement<{ active?: boolean }>;
  align: "left" | "right";
  delay?: number;
}) {
  const isRight = align === "right";
  const bg = isRight
    ? "bg-[linear-gradient(135deg,#bfe5ff_0%,#d7efff_100%)]"
    : "bg-[linear-gradient(135deg,#efd1f4_0%,#cfe0ff_100%)]"; // lilás→azul claro
  const tailColor = isRight ? "#d7efff" : "#dcd9ff";

  // Cada bolha controla o seu próprio inView
  const bubbleRef = React.useRef<HTMLDivElement | null>(null);
  const bubbleInView = useInView(bubbleRef, { once: true, amount: 0.6 });

  const content = React.isValidElement(children)
    ? React.cloneElement(children, { active: bubbleInView })
    : children;

  return (
    <motion.div
      ref={bubbleRef}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 18 }}
      className={[
        "relative flex max-w-[85%] items-end gap-3 md:max-w-[70%]",
        isRight ? "ml-auto justify-end" : "mr-auto",
      ].join(" ")}
    >
      {!isRight && (
        <div className="hidden shrink-0 select-none md:block">
          <Avatar label="Bundlr" color="#8b7bd1"/>
        </div>
      )}

      <div
        className={[
          // Aumentei tamanho da letra e line-height; tracking subtil e word-break seguro
          "relative rounded-2xl px-4 py-3 text-[16px] md:text-[18px] leading-7 md:leading-8 tracking-[0.01em] break-words",
          "ring-1 ring-black/5 shadow-sm",
          bg,
          isRight ? "rounded-br-sm" : "rounded-bl-sm",
        ].join(" ")}
      >
        {content}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 h-3 w-3 rotate-45"
          style={{
            right: isRight ? "-6px" : undefined,
            left: !isRight ? "-6px" : undefined,
            background: tailColor,
            boxShadow: "0 1px 1px rgba(0,0,0,.05)",
          }}
        />
      </div>

      {isRight && (
        <div className="hidden shrink-0 select-none md:block">
          <Avatar label="Cliente" color="#69a8ff" />
        </div>
      )}
    </motion.div>
  );
}

function Avatar({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="grid h-8 w-8 place-items-center rounded-full text-[10px] font-semibold text-white shadow-sm"
      style={{ background: color }}
      aria-hidden
    >
      {label.slice(0, 1)}
    </div>
  );
}

// Texto que cai letra-a-letra. Respeita prefers-reduced-motion.
function FallingText({ text, active = false }: { text: string; active?: boolean }) {
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);

  if (reduce) return <span className="whitespace-pre-wrap">{text}</span>;

  return (
    <motion.span
      role="text"
      aria-label={text}
      className="inline-block whitespace-pre-wrap"
      initial="hidden"
      animate={active ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.02,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {words.map((w, wi) => (
        <motion.span
          key={wi}
          className="inline-block whitespace-nowrap"
          variants={{ show: { transition: { staggerChildren: 0.02 } } }}
        >
          {[...w].map((c, ci) => (
            <motion.span
              key={ci}
              className="inline-block will-change-transform"
              variants={{
                hidden: { opacity: 0, y: -12, rotate: -4, filter: "blur(2px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                  transition: { type: "spring", stiffness: 400, damping: 26 },
                },
              }}
            >
              {c}
            </motion.span>
          ))}
          {wi < words.length - 1 ? <span>&nbsp;</span> : null}
        </motion.span>
      ))}
    </motion.span>
  );
}

const defaultItems: ChatItem[] = [
  {
    role: "client",
    text:
      "Preciso de automações para organizar a minha caixa de email e acelerar respostas. Conseguem?",
  },
  {
    role: "team",
    text:
      "Claro. Montamos fluxos no Gmail/Outlook, templates inteligentes, etiquetas automáticas, integrações com Slack e dashboards para métricas de resposta.",
  },
  {
    role: "client",
    text:
      "Já tenho site. Quero modernizar o design e vender produtos com faturação certificada.",
  },
  {
    role: "team",
    text:
      "Fazemos auditoria UX/SEO, otimizamos performance e implementamos e‑commerce com Stripe/Mollie/PayPal e faturação (ex.: InvoiceXpress).",
  },
  {
    role: "client",
    text: "Podem tratar das minhas redes sociais e anúncios?",
  },
  {
    role: "team",
    text:
      "Cuidamos do plano editorial, design, copy e campanhas. Entregamos relatórios de crescimento e aprendizados práticos todos os meses.",
  },
  {
    role: "client",
    text: "Tenho uma ideia para app. Conseguem desenvolver um MVP rápido?",
  },
  {
    role: "team",
    text:
      "Sim — prototipagem em Figma, backlog claro e desenvolvimento ágil (web/app). Login social, pagamentos e analytics desde o início.",
  },
];
