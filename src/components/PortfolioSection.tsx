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
    <section className="py-16 md:py-24 bg-white/50">
      <div className="mx-auto max-w-5xl px-6">
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

        {/* Vertical Stack */}
        <div className="flex flex-col gap-10">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-3xl border border-[#efd1f4]/40 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#f4b8d0]/15 hover:border-[#efd1f4]/80">
                <div className="flex flex-col md:flex-row items-center">
                  {/* Left Side: Large Image Button */}
                  <div className="relative h-[240px] w-full md:h-[280px] md:w-2/3 overflow-hidden">
                    <Image
                      src={item.buttonImage}
                      alt={`${item.name} portfolio cover`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Right Side: Actions */}
                  <div className="flex w-full flex-col justify-center p-8 md:w-1/3 md:p-10">
                    <h3 className="mb-6 text-xl font-bold text-[#0b1220] md:text-2xl transition-colors duration-300 group-hover:text-[#e27fa3]">
                      {item.name}
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      {/* PDF Button */}
                      <a
                        href={item.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b1220] px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e27fa3] hover:scale-[1.03] active:scale-95 shadow-md shadow-black/10"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Ver Portfolio PDF
                      </a>

                      {/* Visit Website Button */}
                      <a
                        href={item.visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#efd1f4] bg-transparent px-6 py-4 text-sm font-bold text-[#0b1220] transition-all duration-300 hover:bg-[#faf7fc] hover:border-[#e27fa3] hover:text-[#e27fa3] hover:scale-[1.03] active:scale-95"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visitar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
