"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PORTFOLIO_ITEMS = [
  {
    name: "Adriana Terapeuta",
    buttonImage: "/images/BOTOES/botaoADRIANATERAPEUTA_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioADRIANATERAPEUTA.pdf",
    visitUrl: "https://www.instagram.com/adrianafernandes.terapeuta?igsh=MXA0bTkxamNoZml4OA==",
  },
  {
    name: "MP Trading",
    buttonImage: "/images/BOTOES/botaoMPTRADING_Prancheta 1-01_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioMPTRADING.pdf",
    visitUrl: "https://mptrading.pt",
  },
  {
    name: "Muito Seguro",
    buttonImage: "/images/BOTOES/botaoMUITOSEGURO_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioMUITOSEGURO.pdf",
    visitUrl: "https://muitoseguro.pt",
  },
  {
    name: "Velocidades Oalheira",
    buttonImage: "/images/BOTOES/botaoVELOCIDADESOALHEIRA_Prancheta 1-01_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioVELOCIDADESOALHEIRA.pdf",
    visitUrl: "https://velocidadesoalheira.com",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[#ffeaf2] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#d4a0b9]">
            Trabalhos Realizados
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#0b1220] md:text-4xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 md:text-lg">
            Conheça os trabalhos que realizamos com clientes de diversas áreas,
            refletindo alguns tipos de serviços que fazemos.
          </p>
        </motion.div>

        {/* Vertical Stack of Full-Width Cards */}
        <div className="flex flex-col gap-12">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative h-auto w-full overflow-hidden rounded-3xl border border-[#efd1f4]/40 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#f4b8d0]/15"
            >
              {/* Main Button Image (Full Width) */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2846 / 1146' }}>
                <Image
                  src={item.buttonImage}
                  alt={`${item.name} portfolio cover`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority={index < 2}
                />
              </div>

              {/* Hover Overlay with Buttons Only */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/5 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100 group-hover:bg-[#0b1220]/20">
                <div className="flex flex-wrap items-center justify-center gap-4 px-4">
                  {/* PDF Button */}
                  <motion.a
                    href={item.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0b1220] px-8 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#e27fa3]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Ver Portfolio PDF
                  </motion.a>

                  {/* Visit Link */}
                  <motion.a
                    href={item.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/20 px-8 py-4 text-sm font-bold text-[#0b1220] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#e27fa3] hover:border-[#e27fa3]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visitar
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
