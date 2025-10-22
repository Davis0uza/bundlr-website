"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";

/**
 * SmartComposer — caixa de texto flutuante com sugestões e botões de envio
 *
 * • Textarea auto‑expansível.
 * • Ícone de microfone (esconde quando o utilizador começa a escrever).
 * • Cursor "|" a piscar e sugestões rotativas quando o campo está vazio.
 * • Botões por baixo: WhatsApp, Email e Agendar — já levam a mensagem.
 *
 * Uso básico:
 *   import SmartComposer from "@/components/SmartComposer";
 *   <SmartComposer whatsappNumber="351912345678" emailTo="hello@teu-dominio.com" scheduleUrl="/agendar" />
 */
export default function SmartComposer({
  whatsappNumber,
  emailTo = "hello@teu-dominio.com",
  scheduleUrl = "#contacto",
  className = "",
}: {
  whatsappNumber?: string; // e.g. "3519xxxxxxxx" (sem +)
  emailTo?: string;
  scheduleUrl?: string;
  className?: string;
}) {
  const [value, setValue] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);

  const suggestions = React.useMemo(
    () => [
      "Tem mais alguma pergunta?",
      "Precisava de uma aplicação para vender vinhos.",
      "Turismo em VR.",
      "Preciso de correções a software.",
      "Preciso destacar os meus serviços no Google — conseguem?",
      "Preciso de um modelo 3D de uma casa.",
      "Preciso de um assistente virtual para atender clientes.",
      "Preciso de brochures.",
      "Quero melhorar a eficiência da minha base de dados.",
      "Gostava de uma nova identidade visual.",
    ],
    []
  );

  // Rodar sugestões quando o campo está vazio
  React.useEffect(() => {
    if (value.trim().length > 0) return; // não roda se estiver a escrever
    const id = setInterval(() => setIdx((i) => (i + 1) % suggestions.length), 2800);
    return () => clearInterval(id);
  }, [value, suggestions.length]);

  // Auto‑grow
  const autoGrow = React.useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "0px"; // recalcular
    const next = Math.min(el.scrollHeight, 220); // limite máx.
    el.style.height = next + "px";
  }, []);

  React.useEffect(() => autoGrow(), [autoGrow]);

  const message = (value.trim() || suggestions[idx]).trim();

  // Links com mensagem transportada
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${emailTo}?subject=${encodeURIComponent(
    "Pedido via Website Bundlr"
  )}&body=${encodeURIComponent(message)}`;
  const scheduleHref = `${scheduleUrl}${scheduleUrl.includes("?") ? "&" : "?"}note=${encodeURIComponent(
    message
  )}`;

  const isTyping = value.length > 0;

  return (
    <div className={["smart-composer sticky bottom-6 z-20", className].join(" ")}>      
      <div className="relative mx-auto w-full max-w-3xl rounded-2xl border border-[#d7def0] bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
        {/* Textarea real */}
        <textarea
          ref={taRef}
          rows={1}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            autoGrow();
          }}
          placeholder=""
          className="peer block w-full resize-none overflow-hidden bg-transparent pr-10 text-[16px] leading-7 outline-none placeholder:text-transparent md:text-[18px] md:leading-8"
        />

        {/* Overlay com cursor + sugestão (apenas quando vazio) */}
        {value.length === 0 && (
          <div className="pointer-events-none absolute left-4 right-12 top-3 flex select-none items-center text-[16px] leading-7 text-[#0b1220]/80 md:text-[18px] md:leading-8">
            <motion.span
              aria-hidden
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-1"
            >
              |
            </motion.span>
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-[#6b7a96]"
            >
              {suggestions[idx]}
            </motion.span>
          </div>
        )}

        {/* Mic à direita (desaparece quando o utilizador escreve) */}
        <button
          aria-label="Gravar voz"
          className="absolute right-3 top-2 grid h-9 w-9 place-items-center rounded-full border border-[#d7def0] bg-white text-[#0b1220] shadow-sm transition hover:bg-white/90"
          style={{ visibility: isTyping ? "hidden" : "visible" }}
          type="button"
        >
          <Mic size={18} />
        </button>
      </div>

      {/* Botões de ação */}
      <div className="mx-auto mt-3 flex w-full max-w-3xl flex-wrap gap-2">
        <ActionLink href={waHref} label="WhatsApp" />
        <ActionLink href={mailHref} label="Email" />
        <ActionLink href={scheduleHref} label="Agendar chamada" />
      </div>
    </div>
  );
}

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-[#d7def0] bg-white/90 px-3 py-1.5 text-sm font-medium text-[#0b1220] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span>{label}</span>
      <ArrowRight className="transition group-hover:translate-x-0.5" size={16} />
    </a>
  );
}
