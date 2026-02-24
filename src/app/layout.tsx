import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/SiteNavbar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bundlr | Creative Studio — Design, IA & Tech Solutions",
  description: "Simplificamos o seu trabalho digital. Especialistas em Design UI/UX, Automações com IA, Nex.js e Marketing Digital. Soluções premium para escalar o seu negócio.",
  keywords: ["Design Digital", "Marketing", "Automação IA", "Web Development", "Next.js", "Bundlr", "Branding"],
  authors: [{ name: "Bundlr Team" }],
  openGraph: {
    title: "Bundlr | Design e Soluções Tecnológicas",
    description: "Ideias em pacote. Resultados sem stress. Especialistas em levar o seu negócio ao próximo nível digital.",
    url: "https://bundlr.pt",
    siteName: "Bundlr",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bundlr | Creative Studio",
    description: "Especialistas em Design, IA e Desenvolvimento Web.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
      >
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
