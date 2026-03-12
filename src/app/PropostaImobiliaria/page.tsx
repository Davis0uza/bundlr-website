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

    // Load logo 
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
    } catch { /* skip logo if not found */ }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text("Bundlr — Modern Real Estate Solutions", margin, y + 14);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const today = new Date().toLocaleDateString("pt-PT");
    doc.text(`Data: ${today}`, pageW - margin, y + 8, { align: "right" });
    doc.text("Ref: RI-2026", pageW - margin, y + 13, { align: "right" });

    y += 24;
    doc.setDrawColor(2, 132, 199);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59);
    doc.text("Proposta de Imobiliária Virtual", margin, y);
    y += 10;

    // Client data
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentW, 28, 3, 3, "F");
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

    // Services table
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text("Resumo da Solução", margin, y);
    y += 6;

    doc.setFillColor(2, 132, 199);
    doc.roundedRect(margin, y, contentW, 7, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("Serviço / Módulo", margin + 3, y + 5);
    doc.text("Preço Base", pageW - margin - 42, y + 5, { align: "right" });
    doc.text("Recorrência", pageW - margin - 3, y + 5, { align: "right" });
    y += 9;

    selectedServices.forEach((s, i) => {
        if (i % 2 === 0) {
            doc.setFillColor(241, 245, 249);
            doc.rect(margin, y - 3.5, contentW, 7, "F");
        }
        doc.setTextColor(51, 65, 85);
        doc.text(s.titulo, margin + 3, y);
        doc.text(`${s.valorUnico}€`, pageW - margin - 42, y, { align: "right" });
        doc.text(s.mensalidade > 0 ? `${s.mensalidade}€/mês` : "Único", pageW - margin - 3, y, { align: "right" });
        y += 7;
    });

    y += 4;
    if (discount > 0) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(2, 132, 199);
        doc.text(`Desconto Estratégico aplicado: ${discount}%`, margin, y);
        y += 8;
    }

    // Totals
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "F");
    doc.setDrawColor(14, 165, 233);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, 32, 3, 3, "S");

    const col1 = margin + 5;
    const col2 = pageW - margin - 5;
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("Implementação Única (Total)", col1, y + 7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`${formatNum(totalUnicoComDesconto)}€`, col2, y + 7, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.text("Entrada Adjudicação (50%)", col1, y + 14);
    doc.setTextColor(2, 132, 199);
    doc.text(`${formatNum(entradaPagamento)}€`, col2, y + 14, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("Gestão Mensal", col1, y + 21);
    doc.setFont("helvetica", "bold");
    doc.text(`${formatNum(totalMensalComDesconto)}€/mês`, col2, y + 21, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.text("Caução (último mês)", col1, y + 28);
    doc.text(`${formatNum(caucao)}€`, col2, y + 28, { align: "right" });

    y += 40;
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text("Informações de Pagamento", margin, y);
    y += 6;

    const totalAPagar = entradaPagamento + caucao;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, contentW, 20, 3, 3, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("IBAN Bundlr:", margin + 5, y + 7);
    doc.setFont("helvetica", "bold");
    doc.text("PT50 0035 0000 0000 0000 0000 0", margin + 30, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text("Total à Adjudicar:", margin + 5, y + 14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 132, 199);
    doc.text(`${formatNum(totalAPagar)}€ (50% Entrada + Caução)`, margin + 30, y + 14);

    y += 30;
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("* Todos os valores são acrescidos de IVA à taxa legal em vigor, se aplicável.", margin, y);
    
    doc.save(`Proposta_Imobiliaria_${clientData.nome.replace(/\s+/g, "_")}.pdf`);
}

function formatNum(v: number) {
    return Math.round(v * 100 / 100).toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ══════════════ Main Component ══════════════ */
export default function PropostaImobiliariaPage() {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [step, setStep] = useState<null | "form" | "terms" | "bank">(null);
    const [formData, setFormData] = useState({ nome: "", email: "", nif: "", morada: "" });
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
        totalUnicoComDesconto,
        totalMensalComDesconto,
        discount,
        entradaPagamento,
        caucao,
        poupancaTotal,
    } = useMemo(() => {
        let u = 0; let m = 0;
        selected.forEach((id) => {
            const s = SERVICES.find((sv) => sv.id === id);
            if (s) { u += s.valorUnico; m += s.mensalidade; }
        });
        const d = Math.min(selected.size * DISCOUNT_PER_SERVICE, MAX_DISCOUNT);
        const uFinal = u * (1 - d / 100);
        const mFinal = m * (1 - d / 100);
        return {
            totalUnicoComDesconto: uFinal,
            totalMensalComDesconto: mFinal,
            discount: d,
            entradaPagamento: uFinal * 0.5,
            caucao: mFinal,
            poupancaTotal: (u + m) * (d / 100),
        };
    }, [selected]);

    const selectedServices = useMemo(() => SERVICES.filter((s) => selected.has(s.id)), [selected]);

    return (
        <div className="analise-page">
            <div className="analise-inner">
                <motion.header className="analise-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="analise-badge"><Sparkles size={14} /> Proposta Premium 2026</div>
                    <h1 className="analise-title">Plataforma de <span>Imobiliária Virtual</span></h1>
                    <p className="analise-subtitle">Configure a sua solução digital completa. Obtenha até <strong>16% de desconto</strong> ao selecionar múltiplos módulos.</p>
                </motion.header>

                <div className="discount-incentive">
                    <p>🚀 Cada módulo adicionado garante <strong>2% de desconto extra</strong> em toda a faturação (única e mensal).</p>
                </div>

                <section>
                    <div className="section-title-row">
                        <div className="section-icon-wrap improvements"><Rocket size={20} /></div>
                        <div>
                            <h2 className="section-title">Website e Core Tecnológico</h2>
                            <p className="section-title-sub">A base da sua presença digital imobiliária</p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {SERVICES.filter(s => s.category === "website").map((s, i) => (
                            <ServiceCard key={s.id} service={s} index={i} isSelected={selected.has(s.id)} onToggle={toggle} colorClass="green" />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="section-title-row">
                        <div className="section-icon-wrap retention"><Shield size={20} /></div>
                        <div>
                            <h2 className="section-title">Retenção e Funcionalidades Extra</h2>
                            <p className="section-title-sub">Converta visitantes em clientes fidelizados</p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {SERVICES.filter(s => s.category === "retention").map((s, i) => (
                            <ServiceCard key={s.id} service={s} index={i + 3} isSelected={selected.has(s.id)} onToggle={toggle} colorClass="teal" />
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: "4rem" }}>
                    <div className="section-title-row">
                        <div className="section-icon-wrap improvements" style={{ background: "linear-gradient(135deg, #db2777, #fa4d9d)" }}><Instagram size={20} /></div>
                        <div>
                            <h2 className="section-title">Marketing Digital e Redes</h2>
                            <p className="section-title-sub">Planos mensais de gestão e crescimento</p>
                        </div>
                    </div>
                    <div className="cards-grid">
                        {SERVICES.filter(s => s.category === "marketing").map((s, i) => (
                            <ServiceCard key={s.id} service={s} index={i + 7} isSelected={selected.has(s.id)} onToggle={toggle} colorClass="teal" />
                        ))}
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {selected.size > 0 && (
                    <motion.div className="summary-panel" variants={summaryVariants} initial="hidden" animate="visible">
                        <div className="summary-inner">
                            <div className="discount-section">
                                <div className="discount-label"><Percent size={16} /> <span>{selected.size} Módulos</span> <span className="discount-badge">{discount}% desc.</span></div>
                                <div className="discount-bar-track"><motion.div className="discount-bar-fill" animate={{ width: `${(discount / MAX_DISCOUNT) * 100}%` }} /></div>
                            </div>
                            <div className="totals-section">
                                <div className="total-item">
                                    <span className="total-label">Implementação</span>
                                    <span className="total-value accent">{formatNum(totalUnicoComDesconto)}€</span>
                                </div>
                                <div className="total-item">
                                    <span className="total-label">Mensalidade</span>
                                    <span className="total-value">{formatNum(totalMensalComDesconto)}€<span className="total-suffix">/mês</span></span>
                                </div>
                            </div>
                            <button className="summary-cta" onClick={() => setStep("form")}>Gerar Proposta PDF <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step && (
                    <div className="modal-overlay" onClick={() => setStep(null)}>
                        <motion.div className="modal-container" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <button className="modal-close" onClick={() => setStep(null)}><X size={20} /></button>
                            {step === "form" && (
                                <div className="modal-form">
                                    <div className="modal-header">
                                        <div className="modal-icon-wrap form-icon"><User size={24} /></div>
                                        <h2 className="modal-title">Dados do Cliente</h2>
                                        <p className="modal-subtitle">Preencha os dados para personalizar a proposta</p>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-field full"><label>Nome / Empresa</label><input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: Imobiliária Central" /></div>
                                        <div className="form-field"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="contacto@empresa.com" /></div>
                                        <div className="form-field"><label>NIF</label><input type="text" value={formData.nif} onChange={e => setFormData({...formData, nif: e.target.value})} placeholder="123456789" /></div>
                                        <div className="form-field full"><label>Morada</label><input type="text" value={formData.morada} onChange={e => setFormData({...formData, morada: e.target.value})} placeholder="Rua principal, nº1" /></div>
                                    </div>
                                    <button className="modal-accept-btn" onClick={() => setStep("terms")}>Continuar <ArrowRight size={18} /></button>
                                </div>
                            )}
                            {step === "terms" && (
                                <div className="modal-terms">
                                    <div className="modal-header"><div className="modal-icon-wrap terms"><FileText size={24} /></div><h2 className="modal-title">Termos da Proposta</h2></div>
                                    <div className="terms-scroll">{TERMS_TEXT.split('\n\n').map((p, i) => <p key={i} className="terms-paragraph">{p}</p>)}</div>
                                    <button className="modal-accept-btn" onClick={() => { generateInvoicePDF(formData, selectedServices, discount, totalUnicoComDesconto, totalMensalComDesconto, entradaPagamento, caucao); setStep("bank"); }}>Aceitar e Descarregar PDF</button>
                                </div>
                            )}
                            {step === "bank" && (
                                <div className="modal-bank">
                                    <div className="modal-header"><div className="modal-icon-wrap bank"><CheckCircle2 size={24} /></div><h2 className="modal-title">Quase Pronto!</h2><p>Transfira o valor da adjudicação para iniciar o projeto.</p></div>
                                    <div className="bank-details">
                                        <div className="bank-row"><span className="bank-label">IBAN</span><span className="bank-value">PT50 0035 0000 0000 0000 0000 0</span></div>
                                        <div className="bank-row highlight"><span className="bank-label">Montante</span><span className="bank-value big">{formatNum(entradaPagamento + caucao)}€</span></div>
                                    </div>
                                    <div className="bank-note"><p>Após a transferência, envie o comprovativo para que possamos iniciar o desenvolvimento.</p></div>
                                    <button className="modal-download-btn" onClick={() => setStep(null)}>Fechar</button>
                                </div>
                            )}
                        </motion.div>
                    </div>
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
            animate="visible"
            whileHover={{ y: -5 }} 
            whileTap={{ scale: 0.98 }}>
            <div className={`card-icon-wrap ${colorClass}`}><service.icon size={26} /></div>
            <div className="card-check"><Check size={16} /></div>
            <h3 className="card-title">{service.titulo}</h3>
            <p className="card-description">{service.descricao}</p>
            <div className="card-prices">
                {service.valorUnico > 0 && <div className="price-tag unico"><span className="price-label">Único:</span> {service.valorUnico}€</div>}
                {service.mensalidade > 0 && <div className="price-tag mensal"><span className="price-label">Mensal:</span> {service.mensalidade}€</div>}
            </div>
        </motion.div>
    );
}
