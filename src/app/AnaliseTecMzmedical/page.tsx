"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Paintbrush,
    Search,
    ShoppingCart,
    Mail,
    LogIn,
    Bot,
    Check,
    Sparkles,
    Shield,
    TrendingUp,
    ArrowRight,
    Percent,
    X,
    FileText,
    Landmark,
    Copy,
    CheckCircle2,
    User,
    Download,
    LucideIcon,
} from "lucide-react";
import "./AnaliseTecMzmedical.css";

/* ══════════════ Data ══════════════ */
interface Service {
    id: string;
    titulo: string;
    descricao: string;
    valorUnico: number;
    mensalidade: number;
    icon: LucideIcon;
    category: "improvement" | "retention";
}

const SERVICES: Service[] = [
    {
        id: "design",
        titulo: "Novo Website Moderno",
        descricao:
            "Novo webiste em next js, fluido moderno e eficaz, reestruturação e optimização do fluxo de navegação. (Anualidade de 180€ associada a alojamento, foi dividida em 6x 30€, tem de ser paga anualmente)",
        valorUnico: 650,
        mensalidade: 30,
        icon: Paintbrush,
        category: "improvement",
    },
    {
        id: "seo",
        titulo: "Reparação SEO",
        descricao:
            "Correção de falhas técnicas de indexação e otimização de palavras-chave para recuperar visibilidade orgânica e reforçar autoridade no Google.",
        valorUnico: 184,
        mensalidade: 0,
        icon: Search,
        category: "improvement",
    },
    {
        id: "loja",
        titulo: "Melhorias na Loja Virtual",
        descricao:
            "Reestruturação de categorias e navegação, otimização mobile e implementação de fluxo rápido de orçamento (ex.: WhatsApp/CRM) para reduzir abandono e aumentar conversão.",
        valorUnico: 674,
        mensalidade: 860,
        icon: ShoppingCart,
        category: "improvement",
    },
    {
        id: "newsletter",
        titulo: "Newsletters (Newsletter Estratégica)",
        descricao:
            "Criação/gestão de canal direto com clientes (campanhas e conteúdos), com design mensal e otimização técnica para entregabilidade e recorrência.",
        valorUnico: 196,
        mensalidade: 230,
        icon: Mail,
        category: "retention",
    },
    {
        id: "login",
        titulo: "Módulo de Autenticação Social – Google",
        descricao:
            "Implementação e integração de funcionalidades avançadas no website, com foco em performance, segurança e experiência de utilização. O serviço inclui configuração técnica, adaptação ao sistema existente, testes, otimização, reforço de segurança e acompanhamento inicial para garantir estabilidade, fiabilidade e uma utilização eficiente da solução.",
        valorUnico: 196,
        mensalidade: 72,
        icon: LogIn,
        category: "retention",
    },
    {
        id: "login-facebook",
        titulo: "Módulo de Autenticação Social – Facebook",
        descricao:
            "Implementação e integração de funcionalidades avançadas no website, com foco em performance, segurança e experiência de utilização. O serviço inclui configuração técnica, adaptação ao sistema existente, testes, otimização, reforço de segurança e acompanhamento inicial para garantir estabilidade, fiabilidade e uma utilização eficiente da solução.",
        valorUnico: 196,
        mensalidade: 72,
        icon: LogIn,
        category: "retention",
    },
    {
        id: "login-apple",
        titulo: "Módulo de Autenticação Social – Apple",
        descricao:
            "Implementação e integração de funcionalidades avançadas no website, com foco em performance, segurança e experiência de utilização. O serviço inclui configuração técnica, adaptação ao sistema existente, testes, otimização, reforço de segurança e acompanhamento inicial para garantir estabilidade, fiabilidade e uma utilização eficiente da solução.",
        valorUnico: 196,
        mensalidade: 72,
        icon: LogIn,
        category: "retention",
    },
    {
        id: "chatbot",
        titulo: "Assistente Virtual 24h (Chatbot)",
        descricao:
            "Atendimento e captação de orçamentos 24/7 para esclarecer dúvidas, evitar perda de leads por falta de resposta e apoiar a equipa comercial.",
        valorUnico: 1600,
        mensalidade: 520,
        icon: Bot,
        category: "retention",
    },
];

const DISCOUNT_PER_SERVICE = 2;
const MAX_DISCOUNT = 16;

const TERMS_TEXT = `O presente orçamento é válido pelo prazo de trinta (30) dias a contar da data da sua emissão. A aceitação do mesmo implica concordância com as condições aqui descritas.

O prazo estimado para entrega da totalidade do projeto é de vinte e cinco (25) dias úteis, contados a partir da confirmação do pagamento da entrada prevista no presente orçamento. Após a entrega inicial, o prestador compromete-se a realizar as revisões e pequenos ajustes solicitados pelo cliente no prazo máximo de dez (10) dias úteis, salvo acordo escrito em contrário. O não cumprimento dos prazos por parte do cliente na entrega de conteúdos, feedback ou informações necessárias suspende proporcionalmente os prazos de execução previstos.

Os serviços objeto deste orçamento serão faturados através do trabalhador independente Pedro Duarte de Almeida Alves Costa, NIF 231798423, enquadrado no regime de isenção de IVA, nos termos do artigo 53.º do Código do IVA.

As condições de pagamento estabelecem que 50% do valor total dos serviços únicos seja liquidado na adjudicação, acrescido de uma mensalidade de caução correspondente ao último mês de serviço. Os restantes 50% do valor dos serviços únicos serão liquidados na entrega final dos mesmos, salvo acordo escrito em contrário entre as partes.

O presente contrato tem uma duração mínima de seis (6) meses, contados a partir da data de entrega dos serviços. A primeira mensalidade constitui uma caução, referente ao último mês de vigência do contrato. As mensalidades regulares começam a ser cobradas apenas a partir da entrega efetiva dos serviços contratados. Após o período mínimo de seis (6) meses, o cliente poderá cancelar os serviços mensais a qualquer momento, sendo que o último mês de serviço se encontra previamente liquidado pela caução inicial. Em caso de cancelamento antes do término do período mínimo de seis (6) meses, a mensalidade referente ao mês em curso será integralmente devida e a caução inicial será retida pelo prestador, não havendo lugar a qualquer reembolso.

O plano de suporte premium Bundlr contempla até seis (6) revisões, com a duração máxima de duas (2) horas por intervenção, num período de seis (6) meses após a entrega dos serviços. Para efeitos do presente orçamento, consideram-se revisões as pequenas alterações solicitadas pelo cliente e a correção de eventuais erros ou falhas (bugs) decorrentes da utilização normal do serviço.

O suporte premium Bundlr funciona 24 horas por dia, 7 dias por semana. Os pedidos serão respondidos com a maior brevidade possível, garantindo acompanhamento contínuo e dedicado ao cliente.

Qualquer pedido que envolva a adição de novas funcionalidades, serviços distintos ou tecnologias adicionais — incluindo, mas não se limitando, a módulos de faturação, tratamento de imagens ou outros — será obrigatoriamente objeto de novo orçamento autónomo.

O grupo não se responsabiliza por incompatibilidades, erros ou falhas resultantes da integração de serviços ou tecnologias externas, implementadas por terceiros sem supervisão ou validação prévia da equipa.

A aceitação e assinatura do presente orçamento implicam concordância integral com os termos e condições aqui descritos. O cliente compromete-se, desde já, ao pagamento do montante inicial previsto, a título de adjudicação, o qual será devido mesmo em caso de desistência unilateral dos serviços após a aceitação da presente proposta.`;

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
    let logoLoaded = false;
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
            logoLoaded = true;
        }
    } catch {
        // logo not available, skip
    }

    // ── Header subtitle (below logo) ──
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text("Grupo de Design e Soluções Informáticas", margin, y + 14);

    // ── Date right-aligned ──
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const today = new Date().toLocaleDateString("pt-PT");
    doc.text(`Data: ${today}`, pageW - margin, y + 8, { align: "right" });
    doc.text("Ref: 0125S", pageW - margin, y + 13, { align: "right" });

    y += 24;

    // ── Green line ──
    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // ── Title ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(6, 78, 59);
    doc.text("Orçamento — Mz Medical", margin, y);
    y += 10;

    // ── Client data ──
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, contentW, 28, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(6, 78, 59);
    doc.text("Dados do Cliente", margin + 5, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(54, 93, 80);
    doc.text(`Nome: ${clientData.nome}`, margin + 5, y + 12);
    doc.text(`Email: ${clientData.email}`, margin + 5, y + 17);
    doc.text(`NIF: ${clientData.nif}`, margin + contentW / 2, y + 12);
    doc.text(`Morada: ${clientData.morada}`, margin + contentW / 2, y + 17);
    y += 34;

    // ── Services table ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(6, 78, 59);
    doc.text("Serviços Selecionados", margin, y);
    y += 6;

    // Table header
    doc.setFillColor(5, 150, 105);
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
            doc.setFillColor(248, 250, 249);
            doc.rect(margin, y - 3.5, contentW, 7, "F");
        }
        doc.setTextColor(54, 93, 80);
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
        doc.setTextColor(5, 150, 105);
        doc.text(`Desconto aplicado: ${discount}%`, margin, y);
        y += 8;
    }

    // ── Totals box ──
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "F");
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "S");

    const col1 = margin + 5;
    const col2 = pageW - margin - 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(90, 138, 120);
    doc.text("Valor Único (com desconto)", col1, y + 7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text(`${formatNum(totalUnicoComDesconto)}€`, col2, y + 7, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 138, 120);
    doc.text("Entrada (50%)", col1, y + 14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 150, 105);
    doc.text(`${formatNum(entradaPagamento)}€`, col2, y + 14, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 138, 120);
    doc.text("Mensalidade (com desconto)", col1, y + 21);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text(`${formatNum(totalMensalComDesconto)}€/mês`, col2, y + 21, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 138, 120);
    doc.text("Caução (último mês)", col1, y + 28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text(`${formatNum(caucao)}€`, col2, y + 28, { align: "right" });

    y += 40;

    // ── Bank details ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(6, 78, 59);
    doc.text("Dados para Transferência", margin, y);
    y += 6;

    const totalAPagar = entradaPagamento + caucao;

    doc.setFillColor(248, 250, 249);
    doc.roundedRect(margin, y, contentW, 34, 3, 3, "F");

    const bankData = [
        ["Entidade", "Pedro Duarte Costa"],
        ["NIF", "231798423"],
        ["IBAN", "PT50003502100002261490090"],
        ["Banco", "CGD"],
        ["Referência", "0125S"],
        ["Montante", `${formatNum(totalAPagar)}€ (Entrada + Caução)`],
    ];

    doc.setFontSize(8);
    let bankY = y + 5;
    bankData.forEach(([label, val]) => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(90, 138, 120);
        doc.text(`${label}:`, margin + 5, bankY);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(6, 78, 59);
        doc.text(val, margin + 30, bankY);
        bankY += 5;
    });

    y += 42;

    // ── Terms summary ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(6, 78, 59);
    doc.text("Condições Principais", margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    const conditions = [
        "• Orçamento válido por 30 dias.",
        "• Prazo de entrega: 25 dias úteis após confirmação do pagamento.",
        "• Contrato com duração mínima de 6 meses.",
        "• 1ª mensalidade = caução referente ao último mês.",
        "• Mensalidades iniciam após entrega dos serviços.",
        "• Após 6 meses: cancelamento livre (último mês já pago).",
        "• Suporte premium 24/7: 6 revisões de 2h em 6 meses.",
        "• Isento de IVA (art. 53.º do CIVA).",
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
    doc.text("O presente orçamento é regido pelos Termos e Condições constantes na página seguinte, cuja aceitação é obrigatória.", margin, y);
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
    doc.text("Página 1 de 2", pageW / 2, pageH - 10, { align: "center" });

    // ═══════════════════════════════════════
    // PAGE 2 — Terms & Conditions
    // ═══════════════════════════════════════
    doc.addPage();
    let y2 = 20;

    // ── Page 2 header ──
    if (logoLoaded) {
        try {
            const img2 = new Image();
            img2.crossOrigin = "anonymous";
            await new Promise<void>((resolve, reject) => {
                img2.onload = () => resolve();
                img2.onerror = () => reject();
                img2.src = "/logo.png";
            });
            const canvas2 = document.createElement("canvas");
            canvas2.width = img2.width;
            canvas2.height = img2.height;
            const ctx2 = canvas2.getContext("2d");
            if (ctx2) {
                ctx2.drawImage(img2, 0, 0);
                const dataUrl2 = canvas2.toDataURL("image/png");
                const logoH2 = 10;
                const logoW2 = (img2.width / img2.height) * logoH2;
                doc.addImage(dataUrl2, "PNG", margin, y2, logoW2, logoH2);
            }
        } catch {
            // skip
        }
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text("Grupo de Design e Soluções Informáticas", margin, y2 + 14);

    y2 += 22;

    // ── Green line ──
    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(0.8);
    doc.line(margin, y2, pageW - margin, y2);
    y2 += 8;

    // ── Title ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(6, 78, 59);
    doc.text("Termos e Condições", margin, y2);
    y2 += 10;

    // ── Terms text ──
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(60, 60, 60);

    const paragraphs = TERMS_TEXT.split("\n\n");
    const maxTextWidth = contentW;
    const lineHeight = 3.5;

    paragraphs.forEach((para) => {
        const lines = doc.splitTextToSize(para, maxTextWidth);
        lines.forEach((line: string) => {
            if (y2 > pageH - 20) {
                // would overflow, but terms should fit on one page at 7.5pt
                doc.addPage();
                y2 = 20;
            }
            doc.text(line, margin, y2);
            y2 += lineHeight;
        });
        y2 += 2; // paragraph gap
    });

    // ── Page 2 footer ──
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(180);
    doc.text("Página 2 de 2", pageW / 2, pageH - 10, { align: "center" });

    // Save
    doc.save(`Orcamento_MzMedical_${clientData.nome.replace(/\s+/g, "_")}.pdf`);
}

function formatNum(v: number) {
    return Math.round(v * 100 / 100)
        .toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ══════════════ Main Component ══════════════ */
export default function AnaliseTecMzmedicalPage() {
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

    const improvements = SERVICES.filter((s) => s.category === "improvement");
    const retentions = SERVICES.filter((s) => s.category === "retention");

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
                        Análise Técnica Personalizada
                    </div>
                    <h1 className="analise-title">
                        Soluções para <span>Mz Medical</span>
                    </h1>
                    <p className="analise-subtitle">
                        Selecione os serviços que pretende implementar. Quanto mais serviços
                        escolher, maior o seu desconto — até{" "}
                        <strong>16% sobre o valor único e mensalidades</strong>.
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
                        🚀 Cada serviço selecionado acrescenta <strong>2% de desconto</strong>{" "}
                        sobre o valor único <strong>e sobre as mensalidades</strong>. Selecione
                        todos os 8 para obter o máximo de{" "}
                        <strong>16% de desconto em tudo</strong>!
                    </p>
                </motion.div>

                {/* ── Melhorias ── */}
                <section>
                    <div className="section-title-row">
                        <div className="section-icon-wrap improvements">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h2 className="section-title">Melhorias e Recomendações</h2>
                            <p className="section-title-sub">
                                Otimizações técnicas e visuais para o seu website
                            </p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {improvements.map((s, i) => (
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
                            <h2 className="section-title">Métodos de Retenção de Clientes</h2>
                            <p className="section-title-sub">
                                Ferramentas para fidelizar e converter mais clientes
                            </p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {retentions.map((s, i) => (
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
                                            {selected.size} serviço{selected.size > 1 ? "s" : ""}{" "}
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
                                        <span className="total-label">Valor Único</span>
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
                                    Avançar <ArrowRight size={18} />
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
                                    Preencha os seus dados para emissão da fatura
                                </p>
                            </div>

                            <div className="form-grid">
                                <div className="form-field full">
                                    <label>Nome</label>
                                    <input
                                        type="text"
                                        placeholder="Ex.: João Silva ou Empresa Lda."
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
                                    <span>Valor Único (com {discount}% desc.)</span>
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
                                    <span>Total a pagar (Entrada + Caução)</span>
                                    <strong>{fmtFull(Math.round(entradaPagamento + caucao))}</strong>
                                </div>
                            </div>

                            <div className="terms-info-box">
                                <p>📋 Contrato mínimo de <strong>6 meses</strong>. A 1ª mensalidade serve como caução referente ao último mês. As mensalidades regulares iniciam após a entrega dos serviços.</p>
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
                                <h2 className="modal-title">Dados para Transferência</h2>
                                <p className="modal-subtitle">
                                    Realize a transferência para confirmar a adjudicação
                                </p>
                            </div>

                            <div className="bank-details">
                                <BankRow label="Entidade" value="Pedro Duarte Costa" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="NIF" value="231798423" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="IBAN" value="PT50003502100002261490090" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="Banco" value="CGD" copyable={false} onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="Referência" value="0125S" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <div className="bank-row highlight">
                                    <span className="bank-label">Total (Entrada + Caução)</span>
                                    <div className="bank-value-wrap">
                                        <span className="bank-value big">{fmtFull(entradaPagamento + caucao)}</span>
                                        <button className="copy-btn" onClick={() => copyToClipboard((entradaPagamento + caucao).toFixed(2), "montante")}>
                                            {copiedField === "montante" ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {caucao > 0 && (
                                <div className="bank-note">
                                    <p>🔒 Caução (último mês): <strong>{fmtFull(Math.round(caucao))}</strong> — referente ao último mês de contrato.</p>
                                </div>
                            )}

                            {totalMensalComDesconto > 0 && (
                                <div className="bank-note">
                                    <p>📋 A mensalidade de <strong>{fmtFull(Math.round(totalMensalComDesconto))}/mês</strong> será cobrada a partir da entrega dos serviços.</p>
                                </div>
                            )}

                            <div className="bank-note secondary">
                                <p>Os restantes <strong>{fmtFull(entradaPagamento)}</strong> (50%) serão liquidados na entrega final do projeto.</p>
                            </div>

                            <button className="modal-download-btn" onClick={handleDownloadPDF}>
                                <Download size={18} />
                                Descarregar Fatura Digital
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ══════════════ Sub-components ══════════════ */
function ServiceCard({
    service,
    index,
    isSelected,
    onToggle,
    colorClass,
}: {
    service: Service;
    index: number;
    isSelected: boolean;
    onToggle: (id: string) => void;
    colorClass: string;
}) {
    const Icon = service.icon;
    return (
        <motion.div
            className={`service-card ${isSelected ? "selected" : ""}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={index}
            onClick={() => onToggle(service.id)}
            whileTap={{ scale: 0.98 }}
        >
            <div className="card-check">
                <Check size={14} strokeWidth={3} />
            </div>
            <div className={`card-icon-wrap ${colorClass}`}>
                <Icon size={24} />
            </div>
            <h3 className="card-title">{service.titulo}</h3>
            <p className="card-description">{service.descricao}</p>
            <div className="card-prices">
                <div className="price-tag unico">
                    <span className="price-label">Único:</span>
                    {service.valorUnico}€
                </div>
                <div className="price-tag mensal">
                    <span className="price-label">Mensal:</span>
                    {service.mensalidade > 0 ? `${service.mensalidade}€` : "0€"}
                </div>
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
