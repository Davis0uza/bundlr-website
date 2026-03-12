"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Paintbrush,
    Layout,
    Settings,
    Heart,
    LogIn,
    Mail,
    Instagram,
    Camera,
    Video,
    Rocket,
    Landmark,
    Check,
    Sparkles,
    Shield,
    TrendingUp,
    ArrowRight,
    Percent,
    X,
    FileText,
    Copy,
    CheckCircle2,
    User,
    Download,
    LucideIcon,
} from "lucide-react";
import "./PropostaImobiliaria.css";

/* ══════════════ Data ══════════════ */
interface Service {
    id: string;
    titulo: string;
    descricao: string;
    valorUnico: number;
    mensalidade: number;
    icon: LucideIcon;
    category: "website" | "retention" | "marketing";
}

const SERVICES: Service[] = [
    {
        id: "website-moderno",
        titulo: "Website Moderno",
        descricao: "Página de apresentação desenvolvida com tecnologia moderna (Next.js), layout responsivo otimizado para performance em telemóveis e tablets, garantindo uma experiência premium.",
        valorUnico: 480,
        mensalidade: 0,
        icon: Layout,
        category: "website",
    },
    {
        id: "painel-admin",
        titulo: "Painel de Administração",
        descricao: "Plataforma intuitiva que permite a consulta de propriedades, publicação de novos imóveis e edição em tempo real do estado das propriedades disponíveis.",
        valorUnico: 480,
        mensalidade: 0,
        icon: Settings,
        category: "website",
    },
    {
        id: "login-favoritos",
        titulo: "Login, Favoritos e Comentários",
        descricao: "Módulo interativo que permite aos utilizadores criar conta, guardar os seus imóveis favoritos e deixar comentários ou notas nas propriedades.",
        valorUnico: 480,
        mensalidade: 0,
        icon: Heart,
        category: "website",
    },
    {
        id: "login-google",
        titulo: "Login Social – Google",
        descricao: "Facilite o registo de utilizadores permitindo o login direto via Google, aumentando a taxa de conversão e simplificando o processo de autenticação.",
        valorUnico: 300,
        mensalidade: 0,
        icon: LogIn,
        category: "retention",
    },
    {
        id: "login-facebook",
        titulo: "Login Social – Facebook",
        descricao: "Integração nativa com Facebook Login para um acesso rápido e social à sua plataforma imobiliária.",
        valorUnico: 300,
        mensalidade: 0,
        icon: LogIn,
        category: "retention",
    },
    {
        id: "login-apple",
        titulo: "Login Social – Apple",
        descricao: "Opção de autenticação segura para utilizadores iOS, reforçando a confiança e o profissionalismo da marca.",
        valorUnico: 450,
        mensalidade: 0,
        icon: LogIn,
        category: "retention",
    },
    {
        id: "newsletter",
        titulo: "Newsletter Estratégica",
        descricao: "Criação e gestão de canal direto com leads. Inclui configuração inicial (190€) e gestão mensal de conteúdos e envio (200€/mês).",
        valorUnico: 190,
        mensalidade: 200,
        icon: Mail,
        category: "retention",
    },
    {
        id: "marketing-fast",
        titulo: "Marketing Digital – FAST",
        descricao: "Ideal para presença constante: 12 posts mensais focados em visibilidade e engajamento inicial.",
        valorUnico: 0,
        mensalidade: 75,
        icon: Rocket,
        category: "marketing",
    },
    {
        id: "marketing-standart",
        titulo: "Marketing Digital – STANDART",
        descricao: "Pack equilibrado: 16 posts e 12 stories mensais para uma comunicação dinâmica e próxima do cliente.",
        valorUnico: 0,
        mensalidade: 149,
        icon: Instagram,
        category: "marketing",
    },
    {
        id: "marketing-pro",
        titulo: "Marketing Digital – PRO",
        descricao: "Gestão profissional: 16 posts, 12 stories, edição de 4 vídeos Reels, além de gestão de Google Business e LinkedIn.",
        valorUnico: 0,
        mensalidade: 220,
        icon: Camera,
        category: "marketing",
    },
    {
        id: "marketing-video-pro",
        titulo: "Marketing Digital – VIDEO PRO",
        descricao: "Foco total em performance: 16 posts, 16 stories, scripting e 1 captura mensal para produção de 2 Reels premium, Google Business e LinkedIn.",
        valorUnico: 0,
        mensalidade: 445,
        icon: Video,
        category: "marketing",
    },
];

const DISCOUNT_PER_SERVICE = 2;
const MAX_DISCOUNT = 16;

const TERMS_TEXT = `O presente orçamento é válido pelo prazo de trinta (30) dias a contar da data da sua emissão. A aceitação do mesmo implica concordância com as condições aqui descritas.

O prazo estimado para entrega da estrutura tecnológica (Website e Painel) é de trinta (30) dias úteis, contados a partir da confirmação do pagamento da entrada. Os serviços de Marketing Digital e Newsletter são de cariz mensal, com renovação automática, salvo cancelamento por escrito com 30 dias de antecedência.

Os serviços serão faturados através do prestador Bundlr, seguindo o regime fiscal em vigor.

As condições de pagamento estabelecem que 50% do valor total dos serviços únicos seja liquidado na adjudicação, acrescido de uma mensalidade de caução correspondente ao último mês de serviço para os planos mensais. Os restantes 50% do valor dos serviços únicos serão liquidados na entrega final dos mesmos.

O contrato de gestão (Marketing/Newsletter) tem uma duração mínima de seis (6) meses. A primeira mensalidade constitui uma caução. Em caso de cancelamento antes do termo, a caução será retida.

O suporte premium Bundlr contempla acompanhamento contínuo e técnico para garantir estabilidade da plataforma imobiliária.`;

/* ══════════════ Animations ══════════════ */
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: i * 0.08, duration: 0.5, ease: EASE },
    }),
};

const summaryVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
    exit: { opacity: 0, scale: 0.92, y: 30, transition: { duration: 0.2 } },
};

function formatNum(v: number) {
    return Math.round(v * 100) / 100 === 0 ? "0,00" : v.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ══════════════ PDF Generator ══════════════ */
async function generateInvoicePDF(
    clientData: { nome: string; email: string; nif: string; morada: string },
    selectedServices: Service[],
    discount: number,
    totalUnicoComDesconto: number,
    totalMensalComDesconto: number,
    entradaPagamento: number,
    caucao: number
) {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = pageW - margin * 2;
    let y = 20;

    // ── Load logo ──
    try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = "/logo.png";
        });
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL("image/png");
            const logoH = 10;
            const logoW = (img.width / img.height) * logoH;
            doc.addImage(dataUrl, "PNG", margin, y, logoW, logoH);
        }
    } catch {
        // logo not available, skip
    }

    // ── Header subtitle (below logo) ──
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text("Bundlr — Modern Real Estate Solutions", margin, y + 14);

    // ── Date right-aligned ──
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const today = new Date().toLocaleDateString("pt-PT");
    doc.text(`Data: ${today}`, pageW - margin, y + 8, { align: "right" });
    doc.text("Ref: RI-2026", pageW - margin, y + 13, { align: "right" });

    y += 24;

    // ── Primary color line ──
    doc.setDrawColor(2, 132, 199);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // ── Title ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("Proposta de Imobiliária Virtual", margin, y);
    y += 10;

    // ── Client data ──
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(margin, y, contentW, 28, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("Dados do Cliente", margin + 5, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Nome: ${clientData.nome}`, margin + 5, y + 12);
    doc.text(`Email: ${clientData.email}`, margin + 5, y + 17);
    doc.text(`NIF: ${clientData.nif}`, margin + contentW / 2, y + 12);
    doc.text(`Morada: ${clientData.morada}`, margin + contentW / 2, y + 17);
    y += 34;

    // ── Services table ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("Serviços Selecionados", margin, y);
    y += 6;

    // Table header
    doc.setFillColor(2, 132, 199);
    doc.roundedRect(margin, y, contentW, 7, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("Serviço", margin + 3, y + 5);
    doc.text("Único", pageW - margin - 42, y + 5, { align: "right" });
    doc.text("Mensal", pageW - margin - 3, y + 5, { align: "right" });
    y += 9;

    // Table rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    selectedServices.forEach((s, i) => {
        if (i % 2 === 0) {
            doc.setFillColor(248, 250, 252);
            doc.rect(margin, y - 3.5, contentW, 7, "F");
        }
        doc.setTextColor(51, 65, 85);
        const title = s.titulo.length > 50 ? s.titulo.substring(0, 47) + "..." : s.titulo;
        doc.text(title, margin + 3, y);
        doc.text(`${s.valorUnico}€`, pageW - margin - 42, y, { align: "right" });
        doc.text(s.mensalidade > 0 ? `${s.mensalidade}€` : "0€", pageW - margin - 3, y, {
            align: "right",
        });
        y += 7;
    });

    y += 4;

    // ── Discount line ──
    if (discount > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(2, 132, 199);
        doc.text(`Desconto aplicado: ${discount}%`, margin, y);
        y += 8;
    }

    // ── Totals box ──
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "F");
    doc.setDrawColor(2, 132, 199);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "S");

    const col1 = margin + 5;
    const col2 = pageW - margin - 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("Valor Único (com desconto)", col1, y + 7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${formatNum(totalUnicoComDesconto)}€`, col2, y + 7, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Entrada (50%)", col1, y + 14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 132, 199);
    doc.text(`${formatNum(entradaPagamento)}€`, col2, y + 14, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Mensalidade (com desconto)", col1, y + 21);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${formatNum(totalMensalComDesconto)}€/mês`, col2, y + 21, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Caução (último mês)", col1, y + 28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`${formatNum(caucao)}€`, col2, y + 28, { align: "right" });

    y += 40;

    // ── Bank details ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("Dados para Transferência", margin, y);
    y += 6;

    const totalAPagar = entradaPagamento + caucao;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentW, 34, 3, 3, "F");

    const bankData = [
        ["Entidade", "Pedro Duarte Costa"],
        ["NIF", "231798423"],
        ["IBAN", "PT50003502100002261490090"],
        ["Banco", "CGD"],
        ["Referência", "RI-2026"],
        ["Montante", `${formatNum(totalAPagar)}€ (Entrada + Caução)`],
    ];

    doc.setFontSize(8);
    let bankY = y + 5;
    bankData.forEach(([label, val]) => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`${label}:`, margin + 5, bankY);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(val, margin + 30, bankY);
        bankY += 5;
    });

    y += 42;

    // ── Terms summary ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("Condições Principais", margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    const conditions = [
        "• Orçamento válido por 30 dias.",
        "• Prazo de entrega tecnológica: 30 dias úteis após adjudicação.",
        "• Gestão mensal (Marketing/Newsletter) com duração mínima de 6 meses.",
        "• 1ª mensalidade = caução referente ao último mês.",
        "• As mensalidades de gestão iniciam imediatamente após a adjudicação.",
        "• Após 6 meses: cancelamento livre com 30 dias de aviso.",
        "• Suporte premium Bundlr incluído durante a vigência do contrato.",
        "• Isento de IVA nos termos do regime em vigor.",
    ];
    conditions.forEach((c) => {
        doc.text(c, margin, y);
        y += 4;
    });

    y += 6;

    // ── Legal note ──
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(130, 130, 130);
    doc.text("O presente orçamento é regido pelos Termos e Condições constantes no contrato geral Bundlr.", margin, y);
    y += 8;

    // ── Signature line ──
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + 70, y);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text("Assinatura do Cliente", margin, y + 4);

    doc.line(pageW - margin - 70, y, pageW - margin, y);
    doc.text("Data", pageW - margin - 70, y + 4);

    // ── Page 1 footer ──
    const pageH = doc.internal.pageSize.getHeight();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(180);
    doc.text("Página 1 de 1", pageW / 2, pageH - 10, { align: "center" });

    // Save
    doc.save(`Proposta_Imobiliaria_${clientData.nome.replace(/\s+/g, "_")}.pdf`);
}



/* ══════════════ Main Component ══════════════ */
export default function PropostaImobiliariaPage() {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [step, setStep] = useState<null | "form" | "terms" | "bank">(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        nif: "",
        morada: "",
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const toggle = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const {
        totalUnico,
        totalMensal,
        discount,
        totalUnicoComDesconto,
        totalMensalComDesconto,
        poupancaUnico,
        poupancaMensal,
        entradaPagamento,
        caucao,
    } = useMemo(() => {
        let totalU = 0;
        let totalM = 0;
        selected.forEach((id) => {
            const s = SERVICES.find((sv) => sv.id === id);
            if (s) {
                totalU += s.valorUnico;
                totalM += s.mensalidade;
            }
        });
        const disc = Math.min(selected.size * DISCOUNT_PER_SERVICE, MAX_DISCOUNT);
        const descontoU = totalU * (disc / 100);
        const descontoM = totalM * (disc / 100);
        const unicoFinal = totalU - descontoU;
        const mensalFinal = totalM - descontoM;
        return {
            totalUnico: totalU,
            totalMensal: totalM,
            discount: disc,
            totalUnicoComDesconto: unicoFinal,
            totalMensalComDesconto: mensalFinal,
            poupancaUnico: descontoU,
            poupancaMensal: descontoM,
            entradaPagamento: Math.round(unicoFinal * 0.5 * 100) / 100,
            caucao: mensalFinal,
        };
    }, [selected]);

    const selectedServices = useMemo(
        () => SERVICES.filter((s) => selected.has(s.id)),
        [selected]
    );

    const fmtShort = (v: number) =>
        v.toLocaleString("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + "€";
    const fmtFull = (v: number) =>
        v.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "€";

    const handleAvancar = () => {
        if (selected.size === 0) return;
        setStep("form");
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.nome.trim()) errors.nome = "Campo obrigatório";
        if (!formData.email.trim()) errors.email = "Campo obrigatório";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            errors.email = "Email inválido";
        if (!formData.nif.trim()) errors.nif = "Campo obrigatório";
        else if (!/^\d{9}$/.test(formData.nif.replace(/\s/g, "")))
            errors.nif = "NIF deve ter 9 dígitos";
        if (!formData.morada.trim()) errors.morada = "Campo obrigatório";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = () => {
        if (validateForm()) setStep("terms");
    };

    const handleAcceptTerms = () => setStep("bank");

    const closeModal = () => setStep(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleDownloadPDF = useCallback(async () => {
        await generateInvoicePDF(
            formData,
            selectedServices,
            discount,
            totalUnicoComDesconto,
            totalMensalComDesconto,
            entradaPagamento,
            caucao
        );
    }, [formData, selectedServices, discount, totalUnicoComDesconto, totalMensalComDesconto, entradaPagamento, caucao]);

    const websiteServices = SERVICES.filter(s => s.category === "website");
    const retentionServices = SERVICES.filter(s => s.category === "retention");
    const marketingServices = SERVICES.filter(s => s.category === "marketing");

    return (
        <div className="analise-page">
            <div className="analise-inner">
                {/* ── Header ── */}
                <motion.header
                    className="analise-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="analise-badge">
                        <Sparkles size={14} />
                        Proposta Premium 2026
                    </div>
                    <h1 className="analise-title">
                        Plataforma de <span>Imobiliária Virtual</span>
                    </h1>
                    <p className="analise-subtitle">
                        Configure a sua solução digital completa. Obtenha até{" "}
                        <strong>16% de desconto</strong> ao selecionar múltiplos módulos.
                    </p>
                </motion.header>

                {/* ── Discount incentive ── */}
                <motion.div
                    className="discount-incentive"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <p>
                        🚀 Cada módulo adicionado garante <strong>2% de desconto extra</strong>{" "}
                        sobre o valor único <strong>e sobre as mensalidades</strong>.
                    </p>
                </motion.div>

                {/* ── Website Core ── */}
                <section>
                    <div className="section-title-row">
                        <div className="section-icon-wrap improvements">
                            <Rocket size={20} />
                        </div>
                        <div>
                            <h2 className="section-title">Website e Core Tecnológico</h2>
                            <p className="section-title-sub">
                                A base da sua presença digital imobiliária
                            </p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {websiteServices.map((s, i) => (
                            <ServiceCard
                                key={s.id}
                                service={s}
                                index={i}
                                isSelected={selected.has(s.id)}
                                onToggle={toggle}
                                colorClass="green"
                            />
                        ))}
                    </div>
                </section>

                {/* ── Retenção ── */}
                <section>
                    <div className="section-title-row">
                        <div className="section-icon-wrap retention">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h2 className="section-title">Retenção e Funcionalidades Extra</h2>
                            <p className="section-title-sub">
                                Converta visitantes em clientes fidelizados
                            </p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {retentionServices.map((s, i) => (
                            <ServiceCard
                                key={s.id}
                                service={s}
                                index={i + 3}
                                isSelected={selected.has(s.id)}
                                onToggle={toggle}
                                colorClass="teal"
                            />
                        ))}
                    </div>
                </section>

                {/* ── Marketing ── */}
                <section style={{ marginBottom: "4rem" }}>
                    <div className="section-title-row">
                        <div className="section-icon-wrap improvements" style={{ background: "linear-gradient(135deg, #db2777, #fa4d9d)" }}>
                            <Instagram size={20} />
                        </div>
                        <div>
                            <h2 className="section-title">Marketing Digital e Redes</h2>
                            <p className="section-title-sub">
                                Planos mensais de gestão e crescimento
                            </p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {marketingServices.map((s, i) => (
                            <ServiceCard
                                key={s.id}
                                service={s}
                                index={i + 7}
                                isSelected={selected.has(s.id)}
                                onToggle={toggle}
                                colorClass="teal"
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* ══════════════ Summary Panel ══════════════ */}
            <AnimatePresence>
                <motion.div
                    className="summary-panel"
                    variants={summaryVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="summary-inner">
                        {selected.size === 0 ? (
                            <div className="summary-empty">
                                👆 Selecione serviços acima para ver o resumo e desconto
                            </div>
                        ) : (
                            <>
                                <div className="discount-section">
                                    <div className="discount-label">
                                        <Percent size={16} />
                                        <span>
                                            {selected.size} módulo{selected.size > 1 ? "s" : ""}{" "}
                                            selecionado{selected.size > 1 ? "s" : ""}
                                        </span>
                                        <span className="discount-badge">{discount}% desc.</span>
                                    </div>
                                    <div className="discount-bar-track">
                                        <motion.div
                                            className="discount-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(discount / MAX_DISCOUNT) * 100}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                <div className="totals-section">
                                    <div className="total-item">
                                        <span className="total-label">Implementação</span>
                                        <div className="total-row">
                                            {poupancaUnico > 0 && (
                                                <span className="total-original">{fmtShort(totalUnico)}</span>
                                            )}
                                            <span className="total-value accent">
                                                {fmtShort(Math.round(totalUnicoComDesconto))}
                                            </span>
                                        </div>
                                        {poupancaUnico > 0 && (
                                            <span className="total-savings">
                                                Poupa {fmtShort(Math.round(poupancaUnico))}
                                            </span>
                                        )}
                                    </div>

                                    <div className="total-item">
                                        <span className="total-label">Mensalidade</span>
                                        <div className="total-row">
                                            {poupancaMensal > 0 && (
                                                <span className="total-original">{fmtShort(totalMensal)}</span>
                                            )}
                                            <span className="total-value">
                                                {fmtShort(Math.round(totalMensalComDesconto))}
                                                <span className="total-suffix">/mês</span>
                                            </span>
                                        </div>
                                        {poupancaMensal > 0 && (
                                            <span className="total-savings">
                                                Poupa {fmtShort(Math.round(poupancaMensal))}/mês
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button onClick={handleAvancar} className="summary-cta">
                                    Gerar Proposta PDF <ArrowRight size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ══════════════ STEP 1 — Client Form ══════════════ */}
            <AnimatePresence>
                {step === "form" && (
                    <motion.div
                        className="modal-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-container modal-form"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={closeModal}>
                                <X size={20} />
                            </button>

                            {/* Stepper */}
                            <div className="stepper">
                                <div className="stepper-step active">
                                    <div className="stepper-dot">1</div>
                                    <span>Dados</span>
                                </div>
                                <div className="stepper-line" />
                                <div className="stepper-step">
                                    <div className="stepper-dot">2</div>
                                    <span>Termos</span>
                                </div>
                                <div className="stepper-line" />
                                <div className="stepper-step">
                                    <div className="stepper-dot">3</div>
                                    <span>Pagamento</span>
                                </div>
                            </div>

                            <div className="modal-header">
                                <div className="modal-icon-wrap form-icon">
                                    <User size={24} />
                                </div>
                                <h2 className="modal-title">Dados de Faturação</h2>
                                <p className="modal-subtitle">
                                    Preencha os seus dados para personalização da proposta
                                </p>
                            </div>

                            <div className="form-grid">
                                <div className="form-field full">
                                    <label>Nome / Empresa</label>
                                    <input
                                        type="text"
                                        placeholder="Ex.: Imobiliária Central ou João Silva"
                                        value={formData.nome}
                                        onChange={(e) =>
                                            setFormData((p) => ({ ...p, nome: e.target.value }))
                                        }
                                        className={formErrors.nome ? "error" : ""}
                                    />
                                    {formErrors.nome && (
                                        <span className="field-error">{formErrors.nome}</span>
                                    )}
                                </div>
                                <div className="form-field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@exemplo.com"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData((p) => ({ ...p, email: e.target.value }))
                                        }
                                        className={formErrors.email ? "error" : ""}
                                    />
                                    {formErrors.email && (
                                        <span className="field-error">{formErrors.email}</span>
                                    )}
                                </div>
                                <div className="form-field">
                                    <label>NIF</label>
                                    <input
                                        type="text"
                                        placeholder="123456789"
                                        value={formData.nif}
                                        onChange={(e) =>
                                            setFormData((p) => ({ ...p, nif: e.target.value }))
                                        }
                                        className={formErrors.nif ? "error" : ""}
                                    />
                                    {formErrors.nif && (
                                        <span className="field-error">{formErrors.nif}</span>
                                    )}
                                </div>
                                <div className="form-field full">
                                    <label>Morada Fiscal</label>
                                    <input
                                        type="text"
                                        placeholder="Rua, nº, código postal, cidade"
                                        value={formData.morada}
                                        onChange={(e) =>
                                            setFormData((p) => ({ ...p, morada: e.target.value }))
                                        }
                                        className={formErrors.morada ? "error" : ""}
                                    />
                                    {formErrors.morada && (
                                        <span className="field-error">{formErrors.morada}</span>
                                    )}
                                </div>
                            </div>

                            <button className="modal-accept-btn" onClick={handleFormSubmit}>
                                Continuar <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════ STEP 2 — Terms & Conditions ══════════════ */}
            <AnimatePresence>
                {step === "terms" && (
                    <motion.div
                        className="modal-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-container modal-terms"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={closeModal}>
                                <X size={20} />
                            </button>

                            <div className="stepper">
                                <div className="stepper-step done">
                                    <div className="stepper-dot"><Check size={12} /></div>
                                    <span>Dados</span>
                                </div>
                                <div className="stepper-line filled" />
                                <div className="stepper-step active">
                                    <div className="stepper-dot">2</div>
                                    <span>Termos</span>
                                </div>
                                <div className="stepper-line" />
                                <div className="stepper-step">
                                    <div className="stepper-dot">3</div>
                                    <span>Pagamento</span>
                                </div>
                            </div>

                            <div className="modal-header">
                                <div className="modal-icon-wrap terms">
                                    <FileText size={24} />
                                </div>
                                <h2 className="modal-title">Termos e Condições</h2>
                                <p className="modal-subtitle">
                                    Leia atentamente antes de prosseguir
                                </p>
                            </div>

                            <div className="terms-scroll">
                                {TERMS_TEXT.split("\n\n").map((p, i) => (
                                    <p key={i} className="terms-paragraph">{p}</p>
                                ))}
                            </div>

                            <div className="terms-summary-box">
                                <div className="terms-summary-row">
                                    <span>Implementação Única (com {discount}% desc.)</span>
                                    <strong>{fmtFull(Math.round(totalUnicoComDesconto))}</strong>
                                </div>
                                {totalMensalComDesconto > 0 && (
                                    <div className="terms-summary-row">
                                        <span>Mensalidade (com {discount}% desc.)</span>
                                        <strong>{fmtFull(Math.round(totalMensalComDesconto))}/mês</strong>
                                    </div>
                                )}
                                <div className="terms-summary-row">
                                    <span>Entrada (50% do valor único)</span>
                                    <strong>{fmtFull(entradaPagamento)}</strong>
                                </div>
                                {caucao > 0 && (
                                    <div className="terms-summary-row">
                                        <span>Caução (último mês)</span>
                                        <strong>{fmtFull(Math.round(caucao))}</strong>
                                    </div>
                                )}
                                <div className="terms-summary-row highlight">
                                    <span>Total a adjudicar (Entrada + Caução)</span>
                                    <strong>{fmtFull(Math.round(entradaPagamento + caucao))}</strong>
                                </div>
                            </div>

                            <div className="terms-info-box">
                                <p>📋 Contrato de gestão com duração mínima de <strong>6 meses</strong>. A 1ª mensalidade serve como caução referente ao último mês.</p>
                            </div>

                            <button className="modal-accept-btn" onClick={handleAcceptTerms}>
                                <Check size={18} />
                                Li e aceito os Termos e Condições
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════ STEP 3 — Bank Transfer + PDF ══════════════ */}
            <AnimatePresence>
                {step === "bank" && (
                    <motion.div
                        className="modal-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-container modal-bank"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={closeModal}>
                                <X size={20} />
                            </button>

                            <div className="stepper">
                                <div className="stepper-step done">
                                    <div className="stepper-dot"><Check size={12} /></div>
                                    <span>Dados</span>
                                </div>
                                <div className="stepper-line filled" />
                                <div className="stepper-step done">
                                    <div className="stepper-dot"><Check size={12} /></div>
                                    <span>Termos</span>
                                </div>
                                <div className="stepper-line filled" />
                                <div className="stepper-step active">
                                    <div className="stepper-dot">3</div>
                                    <span>Pagamento</span>
                                </div>
                            </div>

                            <div className="modal-header">
                                <div className="modal-icon-wrap bank">
                                    <Landmark size={24} />
                                </div>
                                <h2 className="modal-title">Dados para Adjudicação</h2>
                                <p className="modal-subtitle">
                                    Realize a transferência para iniciar o desenvolvimento
                                </p>
                            </div>

                            <div className="bank-details">
                                <BankRow label="Entidade" value="Pedro Duarte Costa" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="NIF" value="231798423" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="IBAN" value="PT50003502100002261490090" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="Banco" value="CGD" copyable={false} onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="Referência" value="RI-2026" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <div className="bank-row highlight">
                                    <span className="bank-label">Total a Pagar</span>
                                    <div className="bank-value-wrap">
                                        <span className="bank-value big">{fmtFull(entradaPagamento + caucao)}</span>
                                        <button className="copy-btn" onClick={() => copyToClipboard((entradaPagamento + caucao).toFixed(2), "montante")}>
                                            {copiedField === "montante" ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {totalMensalComDesconto > 0 && (
                                <div className="bank-note">
                                    <p>🔒 Caução (incluída no total): <strong>{fmtFull(Math.round(caucao))}</strong> — referente ao último mês.</p>
                                </div>
                            )}

                            <div className="bank-note secondary">
                                <p>Os restantes <strong>{fmtFull(entradaPagamento)}</strong> (50%) serão liquidados na entrega final do projeto.</p>
                            </div>

                            <button className="modal-download-btn" onClick={handleDownloadPDF}>
                                <Download size={18} />
                                Descarregar Proposta Completa (PDF)
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ServiceCard({ service, isSelected, onToggle, colorClass, index }: { service: Service, isSelected: boolean, onToggle: (id: string) => void, colorClass: string, index: number }) {
    return (
        <motion.div className={`service-card ${isSelected ? 'selected' : ''}`} onClick={() => onToggle(service.id)} 
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -5 }} 
            whileTap={{ scale: 0.98 }}>
            <div className={`card-icon-wrap ${colorClass}`}><service.icon size={26} /></div>
            <div className="card-check"><Check size={16} strokeWidth={3} /></div>
            <h3 className="card-title">{service.titulo}</h3>
            <p className="card-description">{service.descricao}</p>
            <div className="card-prices">
                {service.valorUnico > 0 && <div className="price-tag unico"><span className="price-label">Único:</span> {service.valorUnico}€</div>}
                {service.mensalidade > 0 && <div className="price-tag mensal"><span className="price-label">Mensal:</span> {service.mensalidade}€</div>}
            </div>
        </motion.div>
    );
}

function BankRow({
    label,
    value,
    copyable,
    onCopy,
    copiedField,
}: {
    label: string;
    value: string;
    copyable: boolean;
    onCopy: (text: string, field: string) => void;
    copiedField: string | null;
}) {
    const fieldKey = label.toLowerCase();
    return (
        <div className="bank-row">
            <span className="bank-label">{label}</span>
            <div className="bank-value-wrap">
                <span className="bank-value">{value}</span>
                {copyable && (
                    <button className="copy-btn" onClick={() => onCopy(value, fieldKey)}>
                        {copiedField === fieldKey ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                )}
            </div>
        </div>
    );
}
