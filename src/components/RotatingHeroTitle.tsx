"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS: { word: string; prefix?: string }[] = [
    { word: "Informáticas" },
    { word: "Modernas" },
    { word: "Criativas" },
    { word: "Automatizadas" },
    { word: "Consultoria Técnica", prefix: "de" },
    { word: "Campanhas", prefix: "de" },
    { word: "Papelaria Empresarial", prefix: "de" },
];

export default function RotatingHeroTitle() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length);
        }, 2800);
        return () => clearInterval(id);
    }, []);

    const current = WORDS[index];

    return (
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-[#3a3a4a] md:text-4xl lg:text-5xl" style={{ textShadow: "0 0 10px rgba(255,255,255,0.12)" }}>
            {/* Line 1 — static color, optional "de" */}
            <span>
                O Conjunto de Soluções{" "}
                <AnimatePresence mode="wait">
                    {current.prefix && (
                        <motion.span
                            key={current.prefix + current.word}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {current.prefix}
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
            <br />

            {/* Line 2 — rotating word with gradient + pulse */}
            <span className="inline-block h-[1.3em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={current.word}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, #6b5a7a 0%, #8a7a9a 40%, #5a7a9a 100%)",
                            animation: "heroPulse 4s ease-in-out infinite",
                        }}
                    >
                        {current.word}
                    </motion.span>
                </AnimatePresence>
            </span>
            <br />

            {/* Line 3 — static color */}
            <span>para Impulsionar o Seu Negócio.</span>

            <style>{`
        @keyframes heroPulse {
          0%, 100% { color: #3a3a4a; }
          50% { color: #6b5a7a; }
        }
      `}</style>
        </h1>
    );
}
