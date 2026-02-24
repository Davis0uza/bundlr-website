"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

export type ChatItem = {
  role: "client" | "team";
  text: string;
};

export default function ChatFAQ({ items: itemsProp }: { items?: ChatItem[] }) {
  const items = itemsProp ?? defaultItems;
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={rootRef}
      id="faq"
      className="relative mx-auto max-w-5xl px-6 py-16 md:py-20"
    >
      <header className="mb-10 text-center md:mb-12">
        <div className="inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efd1f4]/30 ring-1 ring-[#efd1f4]/50">
            <svg className="h-5 w-5 text-[#d4a0b9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#0b1220] md:text-3xl">
            Perguntas Frequentes
          </h2>
        </div>
      </header>

      <div className="space-y-5">
        {items.map((m, i) => (
          <ChatBubble
            key={i}
            role={m.role}
            delay={i * 0.05}
            text={m.text}
          />
        ))}
      </div>
    </section>
  );
}

function ChatBubble({
  role,
  delay = 0,
  text,
}: {
  role: "client" | "team";
  delay?: number;
  text: string;
}) {
  const isClient = role === "client";

  const bg = isClient
    ? "bg-white ring-1 ring-black/5"
    : "bg-[linear-gradient(135deg,#efd1f4_0%,#cfe0ff_100%)] ring-1 ring-black/5";

  const bubbleRef = React.useRef<HTMLDivElement | null>(null);
  const bubbleInView = useInView(bubbleRef, { once: true, amount: 0.6 });

  const bubbleTransition = {
    delay,
    type: "spring" as const,
    stiffness: 220,
    damping: 22,
  };
  const textDelayAfterBubble = delay + 0.18;

  return (
    <motion.div
      ref={bubbleRef}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={bubbleTransition}
      className={[
        "flex flex-col max-w-[85%] md:max-w-[70%]",
        isClient ? "mr-auto" : "ml-auto items-end",
      ].join(" ")}
    >
      {/* Label above the bubble */}
      <span
        className={[
          "mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest",
          isClient ? "text-slate-400" : "text-[#d4a0b9]",
        ].join(" ")}
      >
        {isClient ? "Cliente" : "Bundlr"}
        {!isClient && (
          <svg className="h-3 w-3 text-[#d4a0b9]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>

      <div
        className={[
          "rounded-2xl px-4 py-3 text-[15px] md:text-[16px] leading-7 md:leading-8 tracking-[0.01em] break-words shadow-sm",
          bg,
          isClient ? "text-[#0b1220]" : "text-[#0b1220]",
        ].join(" ")}
      >
        <SmoothRevealText text={text} active={bubbleInView} delay={textDelayAfterBubble} />
      </div>
    </motion.div>
  );
}

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
    role: "team",
    text: "Olá! 👋 Somos a Bundlr. Em que podemos ajudar o seu negócio hoje?",
  },
  {
    role: "client",
    text: "Preciso de um site moderno e de alguém que trate do marketing digital. É possível tudo junto?",
  },
  {
    role: "team",
    text: "Claro! Trabalhamos exatamente assim — design, desenvolvimento e marketing integrados num só pacote. Sem complicações.",
  },
  {
    role: "client",
    text: "Perfeito. E quanto tempo demora mais ou menos?",
  },
  {
    role: "team",
    text: "Depende do projeto, mas normalmente entre 2 a 4 semanas já tem tudo a funcionar. Marcamos uma call rápida para perceber o que precisa?",
  },
];