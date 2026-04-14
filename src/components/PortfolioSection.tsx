"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PORTFOLIO_ITEMS = [
  {
    name: "Adriana Terapeuta",
    buttonImage: "/images/BOTOES/botaoADRIANATERAPEUTA_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioADRIANATERAPEUTA.pdf",
  },
  {
    name: "MP Trading",
    buttonImage: "/images/BOTOES/botaoMPTRADING_Prancheta 1-01_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioMPTRADING.pdf",
  },
  {
    name: "Muito Seguro",
    buttonImage: "/images/BOTOES/botaoMUITOSEGURO_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioMUITOSEGURO.pdf",
  },
  {
    name: "Velocidades Oalheira",
    buttonImage: "/images/BOTOES/botaoVELOCIDADESOALHEIRA_Prancheta 1-01_Prancheta 1-01.jpg",
    pdfPath: "/images/PORTFOLIOS/portfolioVELOCIDADESOALHEIRA.pdf",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-16 md:py-20 bg-white/50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[#ffeaf2] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#d4a0b9]">
            Trabalhos Realizados
          </span>
          <h2 className="mt-3 text-2xl font-bold text-[#0b1220] md:text-3xl lg:text-4xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">
            Conheça os trabalhos que realizamos com clientes de diversas áreas,
            refletindo alguns tipos de serviços que fazemos.
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={item.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-[#efd1f4]/30 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#f4b8d0]/20 hover:-translate-y-2 hover:border-[#efd1f4]/80"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                  <Image
                    src={item.buttonImage}
                    alt={`${item.name} portfolio button`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end justify-center pb-4">
                     <span className="text-white text-xs font-semibold uppercase tracking-wider bg-[#e27fa3] px-3 py-1 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        Ver PDF
                     </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
