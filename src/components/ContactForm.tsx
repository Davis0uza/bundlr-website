"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TO_EMAIL = "bundlr.solutions@gmail.com";

type EmailClient = "gmail" | "outlook" | "other";

function buildMailtoUrl(
    client: EmailClient,
    { name, phone, subject, message }: { name: string; phone: string; subject: string; message: string }
): string {
    const body = `Nome: ${name}\nTelemóvel: ${phone}\n\n${message}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    switch (client) {
        case "gmail":
            return `https://mail.google.com/mail/?view=cm&fs=1&to=${TO_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
        case "outlook":
            return `https://outlook.live.com/mail/0/deeplink/compose?to=${TO_EMAIL}&subject=${encodedSubject}&body=${encodedBody}`;
        case "other":
        default:
            return `mailto:${TO_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    }
}

const EMAIL_CLIENTS: { key: EmailClient; label: string; icon: React.ReactNode; color: string }[] = [
    {
        key: "gmail",
        label: "Gmail",
        color: "hover:border-red-300 hover:bg-red-50/60",
        icon: (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                <path d="M20.5 5H3.5C2.67 5 2 5.67 2 6.5v11c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-11c0-.83-.67-1.5-1.5-1.5z" fill="#F4F4F4" stroke="#D44638" strokeWidth="0.5" />
                <path d="M2 6.5L12 13l10-6.5" stroke="#D44638" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17.5l6-5M22 17.5l-6-5" stroke="#D44638" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            </svg>
        ),
    },
    {
        key: "outlook",
        label: "Outlook",
        color: "hover:border-blue-300 hover:bg-blue-50/60",
        icon: (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" fill="#E8F0FE" stroke="#0078D4" strokeWidth="0.5" />
                <path d="M2 6l10 7 10-7" stroke="#0078D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 18l6-5M22 18l-6-5" stroke="#0078D4" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            </svg>
        ),
    },
    {
        key: "other",
        label: "Outra App",
        color: "hover:border-slate-400 hover:bg-slate-50/60",
        icon: (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 6l10 7 10-7" />
            </svg>
        ),
    },
];

export default function ContactForm({ className = "" }: { className?: string }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [sent, setSent] = useState(false);

    const isValid = name.trim() && subject.trim() && message.trim();

    const handleSend = (client: EmailClient) => {
        const url = buildMailtoUrl(client, { name, phone, subject, message });
        window.open(url, "_blank");
        setSent(true);
    };

    const handleClose = () => {
        setShowPicker(false);
        if (sent) {
            setName("");
            setPhone("");
            setSubject("");
            setMessage("");
            setSent(false);
        }
    };

    return (
        <section className={`relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl"
            >
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Envie-nos uma mensagem
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Preencha o formulário e escolha como enviar — tratamos do resto.
                </p>

                <div className="mt-8 space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-zinc-700">
                            Nome <span className="text-[#e06a94]">*</span>
                        </label>
                        <input
                            id="cf-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="O seu nome"
                            className="w-full rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 backdrop-blur-sm outline-none transition-all focus:border-[#efd1f4] focus:ring-2 focus:ring-[#efd1f4]/30"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-zinc-700">
                            Telemóvel
                        </label>
                        <input
                            id="cf-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+351 9XX XXX XXX"
                            className="w-full rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 backdrop-blur-sm outline-none transition-all focus:border-[#efd1f4] focus:ring-2 focus:ring-[#efd1f4]/30"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium text-zinc-700">
                            Assunto <span className="text-[#e06a94]">*</span>
                        </label>
                        <input
                            id="cf-subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Ex: Orçamento para website"
                            className="w-full rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 backdrop-blur-sm outline-none transition-all focus:border-[#efd1f4] focus:ring-2 focus:ring-[#efd1f4]/30"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-zinc-700">
                            Mensagem <span className="text-[#e06a94]">*</span>
                        </label>
                        <textarea
                            id="cf-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Descreva o que pretende..."
                            rows={5}
                            className="w-full resize-none rounded-xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 backdrop-blur-sm outline-none transition-all focus:border-[#efd1f4] focus:ring-2 focus:ring-[#efd1f4]/30"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        disabled={!isValid}
                        onClick={() => { setShowPicker(true); setSent(false); }}
                        className="group inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#f4b8d0]/25 hover:border-[#f4b8d0]/50 disabled:opacity-40 disabled:pointer-events-none"
                        style={{
                            background: "linear-gradient(135deg, rgba(247,199,231,0.4) 0%, rgba(207,231,255,0.4) 100%)",
                        }}
                    >
                        <span className="tracking-wide text-slate-800 uppercase">ENVIAR</span>
                        <svg className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* Email Client Picker / Success Modal */}
            <AnimatePresence>
                {showPicker && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
                        >
                            <div className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur-xl overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {!sent ? (
                                        /* ── Picker state ── */
                                        <motion.div
                                            key="picker"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <h3 className="text-lg font-semibold text-zinc-900">Escolha como enviar</h3>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                Vamos abrir a sua aplicação de email com tudo preenchido.
                                            </p>

                                            <div className="mt-5 space-y-3">
                                                {EMAIL_CLIENTS.map(({ key, label, icon, color }) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => handleSend(key)}
                                                        className={`flex w-full items-center gap-4 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 text-left transition-all duration-200 ${color}`}
                                                    >
                                                        {icon}
                                                        <span className="text-sm font-medium text-zinc-800">{label}</span>
                                                        <svg className="ml-auto h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                onClick={handleClose}
                                                className="mt-4 w-full text-center text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </motion.div>
                                    ) : (
                                        /* ── Success state ── */
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col items-center py-4 text-center"
                                        >
                                            {/* Animated checkmark circle */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                                                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100"
                                            >
                                                <svg
                                                    className="h-8 w-8 text-emerald-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <motion.path
                                                        d="M20 6L9 17l-5-5"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
                                                    />
                                                </svg>
                                            </motion.div>

                                            <motion.h3
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="mt-4 text-lg font-semibold text-zinc-900"
                                            >
                                                Mensagem preparada!
                                            </motion.h3>

                                            <motion.p
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="mt-2 text-sm text-zinc-500 max-w-[260px]"
                                            >
                                                A sua aplicação de email foi aberta com tudo preenchido. Basta carregar em <strong className="text-zinc-700">Enviar</strong>!
                                            </motion.p>

                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.55 }}
                                                onClick={handleClose}
                                                className="mt-6 rounded-full border border-white/40 px-10 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f4b8d0]/20 hover:border-[#f4b8d0]/50"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(247,199,231,0.5) 0%, rgba(207,231,255,0.5) 100%)",
                                                }}
                                            >
                                                Fechar
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
