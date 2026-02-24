import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: "Bundlr | Creative Studio — Design, IA & Tech Solutions",
    description: "Simplificamos o seu trabalho digital. Especialistas em Design UI/UX, Automações com IA, Nex.js e Marketing Digital. Soluções premium para escalar o seu negócio.",
    keywords: ["Design Digital", "Marketing", "Automação IA", "Web Development", "Next.js", "Bundlr", "Branding"],
    openGraph: {
        title: "Bundlr | Design e Soluções Tecnológicas",
        description: "Ideias em pacote. Resultados sem stress. Especialistas em levar o seu negócio ao próximo nível digital.",
        url: "https://bundlr.pt",
        siteName: "Bundlr",
        locale: "pt_PT",
        type: "website",
    },
};

export default function Page() {
    return <HomeClient />;
}
