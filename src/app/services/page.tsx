import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Serviços | Bundlr — Marketing, Design, Web, IA & Apps",
    description: "Explore as nossas soluções digitais. Do marketing estratégico e design de marca ao desenvolvimento de apps e integração de IA.",
    keywords: ["Serviços Marketing Digital", "UI/UX Design Portugal", "Desenvolvimento Web IA", "Bundlr Serviços"],
};

export default function Page() {
    return <ServicesClient />;
}
