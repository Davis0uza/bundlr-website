"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function SmartComposer({
  whatsappNumber,
  emailTo = "hello@teu-dominio.com",
  scheduleUrl = "#",
  className = "",
}: {
  whatsappNumber?: string;
  emailTo?: string;
  scheduleUrl?: string;
  className?: string;
}) {
  const [value, setValue] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);

  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);
  const suggestRef = React.useRef<HTMLDivElement | null>(null);

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

  React.useEffect(() => {
    if (value.trim().length > 0) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % suggestions.length), 2800);
    return () => clearInterval(id);
  }, [value, suggestions.length]);

  const autoGrow = React.useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    const textH = ta.scrollHeight;
    const sugH = suggestRef.current ? suggestRef.current.offsetHeight : 0;
    const next = Math.min(Math.max(textH, sugH), 220);
    ta.style.height = next + "px";
  }, []);

  React.useEffect(() => autoGrow(), [autoGrow]);
  React.useEffect(() => autoGrow(), [idx, value, autoGrow]);
  React.useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(() => autoGrow());
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [autoGrow]);

  const subject = "Pedido via Website Bundlr";
  const message = (value.trim() || suggestions[idx]).trim();

  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    message
  )}`;
  const scheduleHref = "https://docs.google.com/forms/d/e/1FAIpQLSe68HTg1Db4NBW4xiIHdzchFDPNoz68QNiKWM81Tdx6V03bTg/viewform?usp=publish-editor";

  // Compose links
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    emailTo
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  const outlookHref = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
    emailTo
  )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  // Open helpers
  const openNew = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={["smart-composer z-0", className].join(" ")}>
      <div
        ref={wrapRef}
        className="relative mx-auto w-full max-w-3xl rounded-2xl border border-[#d7def0] bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm"
      >
        <textarea
          ref={taRef}
          rows={1}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            autoGrow();
          }}
          placeholder=""
          className="peer block w-full resize-none overflow-hidden bg-transparent pr-4 text-[16px] leading-7 outline-none placeholder:text-transparent md:text-[18px] md:leading-8"
        />

        {value.length === 0 && (
          <div
            ref={suggestRef}
            className="pointer-events-none absolute left-4 right-4 top-3 select-none text-[16px] leading-7 text-[#0b1220]/80 md:text-[18px] md:leading-8"
          >
            <div className="flex items-start">
              <motion.span
                aria-hidden
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-1 self-start leading-7 md:leading-8"
              >
                |
              </motion.span>
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-[#6b7a96] break-words leading-7 md:leading-8"
              >
                {suggestions[idx]}
              </motion.span>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto mt-3 flex w-full max-w-3xl flex-wrap gap-2">
        <ActionLink href={waHref} label="WhatsApp" />
        {/* EMAIL abre modal */}
        <button
          type="button"
          onClick={() => setEmailModalOpen(true)}
          className="group inline-flex items-center gap-2 rounded-full border border-[#d7def0] bg-white/90 px-3 py-1.5 text-sm font-medium text-[#0b1220] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span>Email</span>
          <ArrowRight className="transition group-hover:translate-x-0.5" size={16} />
        </button>
        <ActionLink href={scheduleHref} label="Agendar chamada" newTab/>
      </div>

      {/* MODAL: escolher provedor */}
      <EmailChooserModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onChoose={(opt) => {
          if (opt === "gmail") openNew(gmailHref);
          else if (opt === "outlook") openNew(outlookHref);
          else {
            // Outro -> usa mailto padrão
            window.location.href = mailHref;
          }
          setEmailModalOpen(false);
        }}
      />
    </div>
  );
}

// componente
function ActionLink({ href, label, newTab = false }: { href: string; label: string; newTab?: boolean }) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 rounded-full border border-[#d7def0] bg-white/90 px-3 py-1.5 text-sm font-medium text-[#0b1220] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span>{label}</span>
      <ArrowRight className="transition group-hover:translate-x-0.5" size={16} />
    </a>
  );
}


function EmailChooserModal({
  open,
  onClose,
  onChoose,
}: {
  open: boolean;
  onClose: () => void;
  onChoose: (opt: "gmail" | "outlook" | "other") => void;
}) {
  React.useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          {/* card */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative z-[61] w-full max-w-md rounded-2xl border border-[#d7def0] bg-white p-5 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-[#0b1220]">
                Por onde deseja enviar o email?
              </h3>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="rounded-full p-1 hover:bg-black/5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              <ChooserButton onClick={() => onChoose("gmail")}>Gmail</ChooserButton>
              <ChooserButton onClick={() => onChoose("outlook")}>Outlook</ChooserButton>
              <ChooserButton onClick={() => onChoose("other")}>Outro</ChooserButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChooserButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-[#d7def0] bg-white px-4 py-2 text-left text-sm font-medium text-[#0b1220] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {children}
    </button>
  );
}