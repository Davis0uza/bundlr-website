import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contactar | Bundlr — Vamos construir algo juntos",
    description: "Entre em contacto com a Bundlr. Peça um orçamento, agende uma reunião ou tire as suas dúvidas sobre os nossos serviços de design e tecnologia.",
};

export default function Page() {
    return <ContactClient />;
}
