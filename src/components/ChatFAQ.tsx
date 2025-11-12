"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

export type ChatItem = {
  role: "client" | "team"; // client => direita | team => esquerda
  text: string;
};

export default function ChatFAQ({ items: itemsProp }: { items?: ChatItem[] }) {
  const items = itemsProp ?? defaultItems;
  const rootRef = useRef<HTMLDivElement | null>(null);
  useInView(rootRef, { once: true, amount: 0.25 }); // mantém, caso uses no futuro

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
            text={m.text}
          />
        ))}
      </div>
    </section>
  );
}

function ChatBubble({
  align,
  delay = 0,
  text,
}: {
  align: "left" | "right";
  delay?: number;
  text: string;
}) {
  const isRight = align === "right";
  const bg = isRight
    ? "bg-[linear-gradient(135deg,#bfe5ff_0%,#d7efff_100%)]"
    : "bg-[linear-gradient(135deg,#efd1f4_0%,#cfe0ff_100%)]";
  const tailColor = isRight ? "#d7efff" : "#dcd9ff";

  // Cada bolha controla o seu próprio inView
  const bubbleRef = React.useRef<HTMLDivElement | null>(null);
  const bubbleInView = useInView(bubbleRef, { once: true, amount: 0.6 });

  // Timings: bolha entra (x) e só depois o texto sobe
  const bubbleTransition = { delay, type: "spring", stiffness: 220, damping: 22 };
  const textDelayAfterBubble = delay + 0.18;

  return (
    <motion.div
      ref={bubbleRef}
      initial={{ opacity: 0, x: isRight ? 24 : -24, scale: 0.98 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay, type: "spring" as const, stiffness: 220, damping: 22 }}
      className={[
        "relative flex max-w-[85%] items-end gap-3 md:max-w-[70%]",
        isRight ? "ml-auto justify-end" : "mr-auto",
      ].join(" ")}
    >
      {!isRight && (
        <div className="hidden shrink-0 select-none md:block">
          <Avatar label="Bundlr" color="#8b7bd1" />
        </div>
      )}

      <div
        className={[
          "relative rounded-2xl px-4 py-3 text-[16px] md:text-[18px] leading-7 md:leading-8 tracking-[0.01em] break-words",
          "ring-1 ring-black/5 shadow-sm",
          bg,
          isRight ? "rounded-br-sm" : "rounded-bl-sm",
        ].join(" ")}
      >
        <SmoothRevealText text={text} active={bubbleInView} delay={textDelayAfterBubble} />

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

/**
 * Texto que aparece de uma vez, de baixo para cima.
 * Respeita prefers-reduced-motion (sem animação).
 */
function SmoothRevealText({
  text,
  active = false,
  delay = 0,
}: {
  text: string;
  active?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="whitespace-pre-wrap">{text}</span>;

  return (
    <motion.span
      role="text"
      aria-label={text}
      className="inline-block whitespace-pre-wrap"
      initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
      animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 12 }}
      transition={{ delay, type: "spring", stiffness: 240, damping: 26 }}
    >
      {text}
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
      "Fazemos auditoria UX/SEO, otimizamos performance e implementamos e-commerce com Stripe/Mollie/PayPal e faturação (ex.: InvoiceXpress).",
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
  