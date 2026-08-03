"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Check,
    Clock,
    ChevronDown,
    FileText,
    Copy,
    CheckCircle2,
    User,
    Download,
    X,
    ArrowRight,
    ShieldCheck,
    Lock,
    Zap,
    MailCheck,
    Loader2
} from "lucide-react";
import "./AnaliseTecMzmedical.css";

/* ══════════════ Data Structures ══════════════ */
export interface Task {
    id: string;
    name: string;
    price: number;
}

export interface Package {
    id: string;
    tier: string;
    title: string;
    description: string;
    totalPrice: number;
    halfPayment: number;
    monthlyPayment: number;
    monthsCount: number;
    timeline: string;
    featured?: boolean;
    includedSummary?: string[];
    toggleButtonLabel: string;
    allTasksCount: number;
    tasks: Task[];
}

export interface MonthlyService {
    id: string;
    title: string;
    description: string;
    basePrice: number;
    icon: typeof ShieldCheck;
}

/* ── Base Task Lists ── */
const TASKS_P1: Task[] = [
    { id: "p1-1", name: 'SEO homepage — título, meta, Open Graph', price: 75 },
    { id: "p1-2", name: 'Remover "solicite cotação" em produtos com preço', price: 75 },
    { id: "p1-3", name: 'Renomear variações "1/2/3" → nomes reais', price: 100 },
    { id: "p1-4", name: "Corrigir links de banners para domínio próprio", price: 75 },
    { id: "p1-5", name: "Hospedar documentos regulatórios no domínio", price: 100 },
    { id: "p1-6", name: "Migração charset → UTF-8", price: 75 },
    { id: "p1-7", name: "Meta tags otimizadas — top 15-20 páginas", price: 250 },
    { id: "p1-8", name: "Schema markup (Product, Org, Breadcrumb)", price: 350 },
    { id: "p1-9", name: "Google Search Console + Analytics", price: 100 },
    { id: "p1-10", name: "Auditoria Core Web Vitals + otimização imagens", price: 200 },
    { id: "p1-11", name: "Indicação de stock / prazo de entrega", price: 100 },
    { id: "p1-12", name: "Atualização info de envio (transportadora)", price: 75 },
];

const TASKS_P2: Task[] = [
    { id: "p2-1", name: "Registo ANVISA por produto", price: 300 },
    { id: "p2-2", name: "Reescrita descrições + specs (20-25 produtos)", price: 700 },
    { id: "p2-3", name: "Formulário de cotação RFQ dedicado", price: 350 },
    { id: "p2-4", name: "Setup downloads manuais / fichas técnicas", price: 200 },
    { id: "p2-5", name: "Descrições páginas de categoria (8-10)", price: 300 },
    { id: "p2-6", name: "Auto-resposta WhatsApp fora de horário", price: 100 },
    { id: "p2-7", name: "Auditoria navegação facetada / canonical", price: 200 },
];

const TASKS_P3: Task[] = [
    { id: "p3-1", name: "Sistema conta B2B (preço por perfil, faturamento)", price: 500 },
    { id: "p3-2", name: "Tabelas desconto por volume (top 15 SKUs)", price: 200 },
    { id: "p3-3", name: "Estratégia conteúdo + 4-6 artigos", price: 450 },
    { id: "p3-4", name: "Relatório análise competitiva", price: 250 },
    { id: "p3-5", name: "Revisão conformidade LGPD", price: 100 },
    { id: "p3-6", name: "Avaliação capacidades plataforma Tray", price: 150 },
    { id: "p3-7", name: "Descrições produtos restantes (catálogo completo)", price: 350 },
];

/* ── Packages Definitions ── */
const PACKAGES: Package[] = [
    {
        id: "pacote-1",
        tier: "Pacote 1",
        title: "Correções Essenciais",
        description: "Correções técnicas imediatas e fundação SEO.",
        totalPrice: 1650,
        halfPayment: 825,
        monthlyPayment: 825,
        monthsCount: 2,
        timeline: "~2 meses",
        toggleButtonLabel: "12 tarefas incluídas",
        allTasksCount: 12,
        tasks: TASKS_P1,
    },
    {
        id: "pacote-2",
        tier: "Pacote 2",
        title: "Otimização de Conversão",
        description: "Conteúdo e ferramentas que removem barreiras B2B.",
        totalPrice: 3800,
        halfPayment: 1900,
        monthlyPayment: 1267,
        monthsCount: 3,
        timeline: "~3 meses",
        includedSummary: ["Inclui todas as 12 tarefas do Pacote 1 (Correções Essenciais)"],
        toggleButtonLabel: "7 novas tarefas + Pacote 1 (19 total)",
        allTasksCount: 19,
        tasks: TASKS_P2,
    },
    {
        id: "pacote-3",
        tier: "Pacote 3",
        title: "Crescimento Estratégico",
        description: "Diferenciação B2B real e catálogo completo.",
        totalPrice: 5800,
        halfPayment: 2900,
        monthlyPayment: 1450,
        monthsCount: 4,
        timeline: "~4 meses",
        includedSummary: [
            "Inclui todas as 12 tarefas do Pacote 1 (Correções Essenciais)",
            "Inclui todas as 7 tarefas do Pacote 2 (Otimização de Conversão)",
        ],
        toggleButtonLabel: "7 novas tarefas + Pacotes 1 e 2 (26 total)",
        allTasksCount: 26,
        tasks: TASKS_P3,
    },
];

/* ── Monthly Services Options (200€ /mês) ── */
const MONTHLY_SERVICES: MonthlyService[] = [
    {
        id: "retainer",
        title: "Manutenção Mensal",
        description: "Monitorização SEO, atualizações de conteúdo e relatórios mensais.",
        basePrice: 200,
        icon: ShieldCheck,
    },
    {
        id: "cybersec",
        title: "Cibersegurança e Monitorização",
        description: "Proteção contra ameaças, monitorização 24/7 de uptime, segurança, backups e patches.",
        basePrice: 200,
        icon: Lock,
    },
];

const COMPARISON_FEATURES = [
    { name: "Total de Tarefas Incluídas", p1: "12 Tarefas", p2: "19 Tarefas (Inclui P1)", p3: "26 Tarefas (Inclui P1 + P2)" },
    { name: "Auditoria Técnica & Fundação SEO", p1: true, p2: true, p3: true },
    { name: "Meta Tags Otimizadas & Schema Markup", p1: true, p2: true, p3: true },
    { name: "Integração Google Analytics & Search Console", p1: true, p2: true, p3: true },
    { name: "Registo ANVISA & Fichas Técnicas", p1: false, p2: true, p3: true },
    { name: "Formulário de Cotação RFQ B2B", p1: false, p2: true, p3: true },
    { name: "Reescrita Descrições Produtos (Top 25)", p1: false, p2: true, p3: true },
    { name: "Sistema de Conta B2B (Preço por Perfil)", p1: false, p2: false, p3: true },
    { name: "Tabelas de Desconto por Volume", p1: false, p2: false, p3: true },
    { name: "Estratégia de Conteúdo & Catálogo Completo", p1: false, p2: false, p3: true },
    { name: "Manutenção Mensal (Opcional)", p1: "200 € /mês", p2: "200 € /mês", p3: "0 € (Gratuito 3 Meses)" },
    { name: "Cibersegurança & Monitorização (Opcional)", p1: "200 € /mês", p2: "200 € /mês", p3: "0 € (Gratuito 3 Meses)" },
    { name: "Caução de Reserva Serv. Mensais", p1: "1º Mês na Adjudicação", p2: "1º Mês na Adjudicação", p3: "0 € (Oferta no P3)" },
    { name: "Tempo de Entrega Estimado", p1: "~2 meses", p2: "~3 meses", p3: "~4 meses" },
];

const TERMS_TEXT = `O presente orçamento é válido pelo prazo de trinta (30) dias a contar da data da sua emissão. A aceitação do mesmo implica concordância com as condições aqui descritas.

O prazo estimado para entrega da totalidade do projeto é o especificado no pacote contratado, contado a partir da confirmação do pagamento inicial previsto. Após a entrega inicial, o prestador compromete-se a realizar as revisões e pequenos ajustes solicitados pelo cliente no prazo máximo de dez (10) dias úteis.

Os serviços objeto deste orçamento serão faturados através do trabalhador independente Pedro Duarte de Almeida Alves Costa, NIF 231798423, enquadrado no regime de isenção de IVA, nos termos do artigo 53.º do Código do IVA.

Na opção de pagamento 50/50, estabelece-se que 50% do valor total do pacote selecionado seja liquidado na adjudicação e os restantes 50% na entrega final dos trabalhos. Na opção de pagamento Mensal, o montante é dividido pelo número de meses correspondente ao pacote (2 meses no Pacote 1, 3 meses no Pacote 2 e 4 meses no Pacote 3).

Aquando da adjudicação, é cobrada na fatura inicial a caução correspondente ao 1.º mês dos serviços mensais adicionais selecionados, garantindo o compromisso e a reserva de disponibilidade. O serviço entra em ativação efetiva após a conclusão da auditoria inicial. Os serviços mensais são renovados mês a mês, podendo o cliente rescindir livremente a qualquer momento até ao final de cada mês.

No caso da seleção do Pacote 3 (Crescimento Estratégico), os serviços mensais adicionais beneficiam de um valor promocional de 0€ durante os primeiros três (3) meses após a auditoria, ficando isentos do valor da caução inicial.

A aceitação e assinatura do presente orçamento implicam concordância integral com os termos e condições aqui descritos.`;

/* ══════════════ PDF Generator ══════════════ */
async function generateInvoicePDF(
    clientData: { nome: string; email: string; nif: string; morada: string },
    selectedPackage: Package,
    activeMonthlyServices: { title: string; price: number; isFreeOffer: boolean }[],
    paymentMode: "half" | "monthly",
    totalAmount: number,
    upfrontAmount: number,
    packageUpfront: number,
    monthlyCaucao: number
) {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF("p", "mm", "a4");
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = pageW - margin * 2;
    let y = 20;

    // Header Logo
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
        // logo skip
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text("Grupo de Design e Soluções Informáticas", margin, y + 14);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const today = new Date().toLocaleDateString("pt-PT");
    doc.text(`Data: ${today}`, pageW - margin, y + 8, { align: "right" });
    doc.text("Ref: MZ-2026-B2B", pageW - margin, y + 13, { align: "right" });

    y += 24;

    doc.setDrawColor(5, 150, 105);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(6, 78, 59);
    doc.text("Proposta Comercial — Mz Medical", margin, y);
    y += 10;

    // Client box
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, contentW, 26, 3, 3, "F");
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
    y += 32;

    // Table
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(6, 78, 59);
    doc.text("Plano Selecionado, Caução & Serviços Mensais", margin, y);
    y += 6;

    doc.setFillColor(5, 150, 105);
    doc.roundedRect(margin, y, contentW, 7, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("Item / Descrição", margin + 3, y + 5);
    doc.text("Tipo / Condição", pageW - margin - 45, y + 5, { align: "right" });
    doc.text("Valor", pageW - margin - 3, y + 5, { align: "right" });
    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setFillColor(248, 250, 249);
    doc.rect(margin, y - 3.5, contentW, 7, "F");
    doc.setTextColor(54, 93, 80);
    doc.text(`${selectedPackage.tier} — ${selectedPackage.title}`, margin + 3, y);
    doc.text(`Plano Main (${selectedPackage.timeline})`, pageW - margin - 45, y, { align: "right" });
    doc.text(`${formatNum(selectedPackage.totalPrice)} €`, pageW - margin - 3, y, { align: "right" });
    y += 7;

    activeMonthlyServices.forEach((mServ) => {
        doc.setTextColor(54, 93, 80);
        const priceStr = mServ.isFreeOffer ? "0 € (OFERTA 3 Meses)" : `${mServ.price} €/mês`;
        doc.text(`Serviço Mensal: ${mServ.title}`, margin + 3, y);
        doc.text("Ativação pós-auditoria", pageW - margin - 45, y, { align: "right" });
        doc.text(priceStr, pageW - margin - 3, y, { align: "right" });
        y += 7;
    });

    if (monthlyCaucao > 0) {
        doc.setFillColor(236, 253, 245);
        doc.rect(margin, y - 3.5, contentW, 7, "F");
        doc.setTextColor(4, 120, 87);
        doc.setFont("helvetica", "bold");
        doc.text("Caução 1.º Mês (Serviços Mensais — Adjudicação)", margin + 3, y);
        doc.text("Caução de Reserva", pageW - margin - 45, y, { align: "right" });
        doc.text(`${formatNum(monthlyCaucao)} €`, pageW - margin - 3, y, { align: "right" });
        y += 7;
    }

    y += 5;

    // Totals Box
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, contentW, 36, 3, 3, "F");
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, 36, 3, 3, "S");

    const col1 = margin + 5;
    const col2 = pageW - margin - 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(90, 138, 120);
    doc.text("Modalidade de Pagamento do Plano", col1, y + 6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text(
        paymentMode === "half"
            ? "50% Entrada / 50% Entrega"
            : `Pagamento Mensal (${selectedPackage.monthsCount} meses)`,
        col2,
        y + 6,
        { align: "right" }
    );

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 138, 120);
    doc.text("Prestação/Entrada do Plano Principal", col1, y + 13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text(`${formatNum(packageUpfront)} €`, col2, y + 13, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 138, 120);
    doc.text("Caução 1.º Mês de Serviços Mensais", col1, y + 20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text(monthlyCaucao > 0 ? `${formatNum(monthlyCaucao)} €` : "0 € (OFERTA P3)", col2, y + 20, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(6, 78, 59);
    doc.text("Total Inicial a Pagar na Adjudicação", col1, y + 28);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(5, 150, 105);
    doc.text(`${formatNum(upfrontAmount)} €`, col2, y + 28, { align: "right" });

    y += 44;

    // Bank Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(6, 78, 59);
    doc.text("Dados para Transferência Bancária", margin, y);
    y += 6;

    doc.setFillColor(248, 250, 249);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "F");

    const bankData = [
        ["Titular", "Pedro Duarte Costa"],
        ["NIF", "231798423"],
        ["IBAN", "PT50003502100002261490090"],
        ["Banco", "CGD"],
        ["Montante Inicial", `${formatNum(upfrontAmount)} €`],
    ];

    doc.setFontSize(8);
    let bankY = y + 5;
    bankData.forEach(([label, val]) => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(90, 138, 120);
        doc.text(`${label}:`, margin + 5, bankY);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(6, 78, 59);
        doc.text(val, margin + 35, bankY);
        bankY += 5;
    });

    y += 40;

    // Signatures
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + 70, y);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text("Assinatura do Cliente", margin, y + 4);

    doc.line(pageW - margin - 70, y, pageW - margin, y);
    doc.text("Data de Aceitação", pageW - margin - 70, y + 4);

    doc.save(`Orcamento_MzMedical_${clientData.nome.replace(/\s+/g, "_")}.pdf`);
}

function formatNum(v: number) {
    return v.toLocaleString("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/* ══════════════ Main Page Component ══════════════ */
export default function AnaliseTecMzmedicalPage() {
    const [paymentMode, setPaymentMode] = useState<"half" | "monthly">("half");
    const [selectedPackageId, setSelectedPackageId] = useState<string>("pacote-2");
    const [selectedMonthlyServices, setSelectedMonthlyServices] = useState<Set<string>>(
        new Set(["retainer"])
    );

    const [expandedTasks, setExpandedTasks] = useState<Set<string>>(
        new Set(["pacote-1", "pacote-2", "pacote-3"])
    );

    const [step, setStep] = useState<null | "form" | "terms" | "success">(null);
    const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        nif: "",
        morada: "",
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const toggleMonthlyService = (id: string) => {
        setSelectedMonthlyServices((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleTasksAccordion = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setExpandedTasks((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectedPackage = useMemo(
        () => PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1],
        [selectedPackageId]
    );

    const isPacote3Selected = selectedPackageId === "pacote-3";

    const activeMonthlyServicesDetails = useMemo(() => {
        return MONTHLY_SERVICES.filter((m) => selectedMonthlyServices.has(m.id)).map((m) => ({
            ...m,
            price: isPacote3Selected ? 0 : m.basePrice,
            effectivePrice: isPacote3Selected ? 0 : m.basePrice,
            isFreeOffer: isPacote3Selected,
        }));
    }, [selectedMonthlyServices, isPacote3Selected]);

    const { totalAmount, upfrontAmount, packageUpfront, monthlyCaucao, totalMonthlyFee } = useMemo(() => {
        const pkgTotal = selectedPackage.totalPrice;
        const pkgUpfront = paymentMode === "half" ? selectedPackage.halfPayment : selectedPackage.monthlyPayment;
        const caucao = isPacote3Selected ? 0 : activeMonthlyServicesDetails.reduce((acc, m) => acc + m.effectivePrice, 0);
        const totalUpfront = pkgUpfront + caucao;
        const monthlyFee = activeMonthlyServicesDetails.reduce((acc, m) => acc + m.effectivePrice, 0);

        return {
            totalAmount: pkgTotal,
            upfrontAmount: totalUpfront,
            packageUpfront: pkgUpfront,
            monthlyCaucao: caucao,
            totalMonthlyFee: monthlyFee,
        };
    }, [selectedPackage, paymentMode, activeMonthlyServicesDetails, isPacote3Selected]);

    const handleAvancar = () => {
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

    const handleAcceptTermsAndSendEmail = async () => {
        setIsSendingEmail(true);
        try {
            await fetch("/api/send-proposal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientData: formData,
                    selectedPackage,
                    paymentMode,
                    upfrontAmount,
                    monthlyCaucao,
                    totalMonthlyFee,
                    activeMonthlyServices: activeMonthlyServicesDetails,
                }),
            });
        } catch (err) {
            console.error("Erro ao enviar chamada de email:", err);
        } finally {
            setIsSendingEmail(false);
            setStep("success");
        }
    };

    const closeModal = () => setStep(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleDownloadPDF = useCallback(async () => {
        await generateInvoicePDF(
            formData,
            selectedPackage,
            activeMonthlyServicesDetails,
            paymentMode,
            totalAmount,
            upfrontAmount,
            packageUpfront,
            monthlyCaucao
        );
    }, [formData, selectedPackage, activeMonthlyServicesDetails, paymentMode, totalAmount, upfrontAmount, packageUpfront, monthlyCaucao]);

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
                        Proposta Comercial &amp; Otimização
                    </div>
                    <h1 className="analise-title">
                        Otimização <span>mzmedical.com.br</span>
                    </h1>
                    <p className="analise-subtitle">
                        Auditoria técnica, SEO, conversão e preparação B2B para a plataforma Tray Commerce.
                    </p>

                    <div className="header-meta">
                        <span>Preparado em <strong>03 Ago 2026</strong></span>
                        <span>Válido até <strong>03 Set 2026</strong></span>
                    </div>
                </motion.header>

                {/* ── Payment Mode Switcher ── */}
                <div className="toggle-section">
                    <div className="toggle-wrapper">
                        <div
                            className={`toggle-slider ${paymentMode === "monthly" ? "right" : ""}`}
                        />
                        <button
                            className={`toggle-btn ${paymentMode === "half" ? "active" : ""}`}
                            onClick={() => setPaymentMode("half")}
                        >
                            50 / 50
                        </button>
                        <button
                            className={`toggle-btn ${paymentMode === "monthly" ? "active" : ""}`}
                            onClick={() => setPaymentMode("monthly")}
                        >
                            Mensal
                        </button>
                    </div>
                </div>

                {/* ── Packages Grid (Single Choice) ── */}
                <div className="packages-grid">
                    {PACKAGES.map((pkg) => {
                        const isSelected = selectedPackageId === pkg.id;
                        const isExpanded = expandedTasks.has(pkg.id);
                        return (
                            <div
                                key={pkg.id}
                                className={`package-card ${isSelected ? "selected" : ""}`}
                                onClick={() => setSelectedPackageId(pkg.id)}
                            >
                                <div className="card-select-check">
                                    <Check size={16} strokeWidth={3} />
                                </div>

                                <div className="card-tier">{pkg.tier}</div>
                                <h2 className="card-title">{pkg.title}</h2>
                                <p className="card-desc">{pkg.description}</p>

                                {pkg.id === "pacote-3" && (
                                    <div className="p3-offer-badge">
                                        <Zap size={13} />
                                        Serviços Mensais a 0€ nos primeiros 3 Meses!
                                    </div>
                                )}

                                <div className="price-block">
                                    <div className="price-main">
                                        <span className="currency">€</span>
                                        {paymentMode === "half"
                                            ? formatNum(pkg.halfPayment)
                                            : formatNum(pkg.monthlyPayment)}
                                        <span className="period">
                                            {paymentMode === "half"
                                                ? " × 2 pagamentos"
                                                : ` /mês × ${pkg.monthsCount} meses`}
                                        </span>
                                    </div>
                                    <div className="price-sub">Total: {formatNum(pkg.totalPrice)} €</div>
                                </div>

                                <div className="card-timeline">
                                    <Clock size={14} />
                                    {pkg.timeline}
                                </div>

                                <button
                                    className={`tasks-toggle ${isExpanded ? "open" : ""}`}
                                    onClick={(e) => toggleTasksAccordion(e, pkg.id)}
                                >
                                    <span>{pkg.toggleButtonLabel}</span>
                                    <ChevronDown size={16} />
                                </button>

                                <div className={`tasks-list ${isExpanded ? "open" : ""}`}>
                                    {pkg.includedSummary?.map((inc, i) => (
                                        <div key={i} className="included-package-summary">
                                            <Check size={14} className="inc-icon" />
                                            <span>{inc}</span>
                                        </div>
                                    ))}

                                    {pkg.tasks.map((task) => (
                                        <div key={task.id} className="task-item">
                                            <span className="task-name">{task.name}</span>
                                            <span className="task-price">{task.price} €</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Monthly Services Options ── */}
                <h2 className="monthly-section-title">Serviços Mensais Adicionais (Opcionais)</h2>
                <p className="monthly-section-sub">
                    {isPacote3Selected
                        ? "🎉 Os serviços mensais entram em ativação após a auditoria inicial, beneficiando de 0€ nos primeiros 3 meses no Pacote 3 (isento de caução)!"
                        : "Estes serviços entram em ativação após a auditoria. É cobrada a caução do 1.º mês na adjudicação para garantia de reserva. Pode rescindir a qualquer momento até ao fim de cada mês."}
                </p>

                <div className="monthly-grid">
                    {MONTHLY_SERVICES.map((mServ) => {
                        const isSelected = selectedMonthlyServices.has(mServ.id);
                        const priceToDisplay = isPacote3Selected ? 0 : mServ.basePrice;

                        return (
                            <div
                                key={mServ.id}
                                className={`monthly-card ${isSelected ? "selected" : ""}`}
                                onClick={() => toggleMonthlyService(mServ.id)}
                            >
                                <div className="monthly-card-left">
                                    <div className="monthly-card-check">
                                        <Check size={16} strokeWidth={3} />
                                    </div>
                                    <div className="monthly-card-text">
                                        <h3>{mServ.title}</h3>
                                        <p>{mServ.description}</p>
                                    </div>
                                </div>

                                <div className="monthly-card-price">
                                    {isPacote3Selected ? (
                                        <>
                                            <div className="amount free">0 €</div>
                                            <span className="free-offer-tag">OFERTA 3 MESES</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="amount">€{priceToDisplay}</div>
                                            <div className="period">/mês (Caução 1º Mês: {priceToDisplay} €)</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Tabulated Comparison Matrix ── */}
                <section className="comparison-section">
                    <div className="comparison-header-row">
                        <h2 className="comparison-title">Diferenças Tabuladas entre Pacotes</h2>
                        <p className="comparison-subtitle">
                            Compare detalhadamente o escopo acumulativo e entregáveis de cada plano
                        </p>
                    </div>

                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Funcionalidade / Entregável</th>
                                    <th className="col-p1">Pacote 1 — Essenciais</th>
                                    <th className="col-p2">Pacote 2 — Conversão</th>
                                    <th className="col-p3">Pacote 3 — Estratégico</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_FEATURES.map((feat, idx) => (
                                    <tr key={idx}>
                                        <td>{feat.name}</td>
                                        <td>
                                            {typeof feat.p1 === "boolean" ? (
                                                feat.p1 ? <span className="check-icon"><Check size={14} /></span> : <span className="dash-icon">—</span>
                                            ) : (
                                                feat.p1
                                            )}
                                        </td>
                                        <td>
                                            {typeof feat.p2 === "boolean" ? (
                                                feat.p2 ? <span className="check-icon"><Check size={14} /></span> : <span className="dash-icon">—</span>
                                            ) : (
                                                feat.p2
                                            )}
                                        </td>
                                        <td>
                                            {typeof feat.p3 === "boolean" ? (
                                                feat.p3 ? <span className="check-icon"><Check size={14} /></span> : <span className="dash-icon">—</span>
                                            ) : (
                                                feat.p3.includes("Gratuito") || feat.p3.includes("Oferta") ? (
                                                    <span className="highlight-free-cell">{feat.p3}</span>
                                                ) : (
                                                    feat.p3
                                                )
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Summary & Terms ── */}
                <div className="summary-terms-grid">
                    <div className="summary-card">
                        <h2>Resumo da Seleção</h2>

                        <div className="summary-row">
                            <span className="summary-label">{selectedPackage.tier} — {selectedPackage.title}</span>
                            <span className="summary-value">{formatNum(selectedPackage.totalPrice)} €</span>
                        </div>

                        {activeMonthlyServicesDetails.map((m) => (
                            <div key={m.id} className="summary-row">
                                <span className="summary-label">{m.title}</span>
                                <span className="summary-value">
                                    {m.isFreeOffer ? "0 € (OFERTA 3 Meses)" : `${m.basePrice} € /mês`}
                                </span>
                            </div>
                        ))}

                        {monthlyCaucao > 0 && (
                            <div className="summary-row">
                                <span className="summary-label">Caução 1.º Mês (Serviços Mensais)</span>
                                <span className="summary-value">{formatNum(monthlyCaucao)} €</span>
                            </div>
                        )}

                        <div className="summary-row total">
                            <span className="summary-label">Entrada / Inicial a Pagar na Adjudicação</span>
                            <span className="summary-value">{formatNum(upfrontAmount)} €</span>
                        </div>

                        {totalMonthlyFee > 0 && (
                            <div className="summary-row">
                                <span className="summary-label">Recorrente Mensal (Pós-Auditoria)</span>
                                <span className="summary-value">{formatNum(totalMonthlyFee)} € /mês</span>
                            </div>
                        )}
                    </div>

                    <div className="terms-card">
                        <h2>Condições Comerciais</h2>
                        <ul>
                            <li>Valores expressos em EUR (isento de IVA ao abrigo do art. 53.º)</li>
                            <li>Apenas 1 plano principal selecionado por orçamento</li>
                            <li>Conteúdo técnico (ANVISA, specs, manuais PDF) fornecido pelo cliente</li>
                            <li>Serviços mensais entram em ativação após conclusão da auditoria inicial</li>
                            <li>
                                <strong>Caução de Serviços Mensais:</strong> cobrada no 1.º pagamento na adjudicação para garantia de reserva de disponibilidade
                            </li>
                            <li>
                                <strong>Cancelamento Flexível:</strong> o cliente pode rescindir os serviços mensais recorrentes a qualquer momento até ao fim de cada mês
                            </li>
                            {isPacote3Selected && (
                                <li style={{ fontWeight: "600", color: "#059669" }}>
                                    OFERTA: Serviços mensais contratados com custo 0€ nos primeiros 3 meses (isento de caução) no Pacote 3!
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <footer className="footer">
                    <p>Proposta válida até 03 de Setembro de 2026 · Todos os pacotes incluem suporte durante a implementação</p>
                </footer>
            </div>

            {/* ══════════════ Floating Summary Bar ══════════════ */}
            <AnimatePresence>
                <motion.div
                    className="summary-panel"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="summary-inner">
                        <div className="totals-section">
                            <div className="total-item">
                                <span className="total-label">Plano: {selectedPackage.title}</span>
                                <span className="total-value accent">
                                    {formatNum(totalAmount)} €
                                </span>
                            </div>

                            <div className="total-item">
                                <span className="total-label">
                                    Total Inicial a Pagar na Adjudicação
                                </span>
                                <span className="total-value">
                                    {formatNum(upfrontAmount)} €
                                    <span className="total-suffix">
                                        {monthlyCaucao > 0 ? ` (Inclui ${monthlyCaucao}€ caução 1º mês)` : ""}
                                    </span>
                                </span>
                            </div>

                            {activeMonthlyServicesDetails.length > 0 && (
                                <div className="total-item">
                                    <span className="total-label">Mensalidade Recorrente (Pós-Auditoria)</span>
                                    <span className="total-value">
                                        {isPacote3Selected ? "0 €" : `${formatNum(totalMonthlyFee)} €`}
                                        <span className="total-suffix">
                                            {isPacote3Selected ? " (OFERTA 3 Meses)" : " /mês"}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>

                        <button onClick={handleAvancar} className="summary-cta">
                            Avançar com Proposta <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ══════════════ STEP 1 — Form Modal ══════════════ */}
            <AnimatePresence>
                {step === "form" && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-container modal-form"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={closeModal}>
                                <X size={20} />
                            </button>

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
                                    <span>Concluído</span>
                                </div>
                            </div>

                            <div className="modal-header">
                                <div className="modal-icon-wrap form-icon">
                                    <User size={24} />
                                </div>
                                <h2 className="modal-title">Dados de Faturação</h2>
                                <p className="modal-subtitle">
                                    Preencha os seus dados para emissão da proposta e fatura
                                </p>
                            </div>

                            <div className="form-grid">
                                <div className="form-field full">
                                    <label>Nome / Razão Social</label>
                                    <input
                                        type="text"
                                        placeholder="Ex.: Mz Medical Lda."
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
                                        placeholder="contato@mzmedical.com.br"
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
                                    <label>NIF / CNPJ</label>
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
                                        placeholder="Rua, número, código postal, cidade"
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

            {/* ══════════════ STEP 2 — Terms Modal ══════════════ */}
            <AnimatePresence>
                {step === "terms" && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-container modal-terms"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
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
                                    <span>Concluído</span>
                                </div>
                            </div>

                            <div className="modal-header">
                                <div className="modal-icon-wrap terms">
                                    <FileText size={24} />
                                </div>
                                <h2 className="modal-title">Termos e Condições</h2>
                                <p className="modal-subtitle">
                                    Leia atentamente antes de aceitar a proposta
                                </p>
                            </div>

                            <div className="terms-scroll">
                                {TERMS_TEXT.split("\n\n").map((p, i) => (
                                    <p key={i} className="terms-paragraph">{p}</p>
                                ))}
                            </div>

                            <div className="terms-summary-box">
                                <div className="terms-summary-row">
                                    <span>Plano Contratado</span>
                                    <strong>{selectedPackage.title} ({formatNum(selectedPackage.totalPrice)} €)</strong>
                                </div>
                                <div className="terms-summary-row">
                                    <span>Modalidade do Plano</span>
                                    <strong>{paymentMode === "half" ? "50 / 50" : `Mensal (${selectedPackage.monthsCount} meses)`}</strong>
                                </div>
                                {monthlyCaucao > 0 && (
                                    <div className="terms-summary-row">
                                        <span>Caução 1.º Mês (Serviços Mensais)</span>
                                        <strong>{formatNum(monthlyCaucao)} €</strong>
                                    </div>
                                )}
                                <div className="terms-summary-row highlight">
                                    <span>Montante Inicial a Pagar na Adjudicação</span>
                                    <strong>{formatNum(upfrontAmount)} €</strong>
                                </div>
                            </div>

                            <button
                                className="modal-accept-btn"
                                onClick={handleAcceptTermsAndSendEmail}
                                disabled={isSendingEmail}
                            >
                                {isSendingEmail ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        A enviar proposta...
                                    </>
                                ) : (
                                    <>
                                        <Check size={18} />
                                        Aceitar e Finalizar Proposta
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════ STEP 3 — Email Sent & Success Modal ══════════════ */}
            <AnimatePresence>
                {step === "success" && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-container modal-bank"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
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
                                    <div className="stepper-dot"><Check size={12} /></div>
                                    <span>Concluído</span>
                                </div>
                            </div>

                            <div className="modal-header">
                                <div className="modal-icon-wrap bank" style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
                                    <MailCheck size={28} />
                                </div>
                                <h2 className="modal-title">E-mail Enviado com Sucesso!</h2>
                                <p className="modal-subtitle">
                                    Enviámos uma cópia da proposta comercial e dados bancários para <strong>{formData.email}</strong>
                                </p>
                            </div>

                            <div className="bank-details">
                                <div className="bank-row highlight">
                                    <span className="bank-label">Montante Inicial a Pagar</span>
                                    <span className="bank-value big">{formatNum(upfrontAmount)} €</span>
                                </div>
                                <BankRow label="IBAN CGD" value="PT50003502100002261490090" copyable onCopy={copyToClipboard} copiedField={copiedField} />
                                <BankRow label="Titular" value="Pedro Duarte Costa" copyable={false} onCopy={copyToClipboard} copiedField={copiedField} />
                            </div>

                            <div className="bank-note">
                                <p>📧 <strong>Consulte o seu e-mail:</strong> O resumo completo da adjudicação e as instruções para envio do comprovativo foram enviadas para <strong>{formData.email}</strong>.</p>
                            </div>

                            <button className="modal-download-btn" onClick={handleDownloadPDF}>
                                <Download size={18} />
                                Descarregar Fatura Digital em PDF
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ══════════════ Helper Component ══════════════ */
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
