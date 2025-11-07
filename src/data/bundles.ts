// data/bundles.ts
// Fonte: "Arranque Rápido.docx" (listas de bundles + bullets)
// Tags máximas por bundle: 2 entre ["Marketing", "Design", "Web", "Apps"].
// Se algum bundle estiver destacado a roxo no site/doc, acrescenta a tag extra "Destaque".

export type GridItem =
  | { kind: "service"; label: string; note?: string }
  | { kind: "cta" };

export type Bundle = {
  id: string;
  name: string;
  subtitle?: string;
  tags?: ("Marketing" | "Design" | "Web" | "Apps" | "Destaque")[];
  grid: [GridItem, GridItem, GridItem, GridItem]; // 2x2 (3 serviços + 1 CTA)
};

export const BUNDLES: Bundle[] = [
    {
        id: "arranque-rapido",
        name: "Arranque Rápido",
        tags: ["Web", "Marketing", "Destaque"],
        grid: [
        { kind: "service", label: "Landing Page", note: "Apresente-se e chame a atenção." },
        { kind: "service", label: "Logotipo Moderno", note: "Imagem Profissional" },
        { kind: "service", label: "Socias Meta", note: "Destaque-se no Instagram e Facebook" },
        { kind: "cta" },
        ],
    },                        
    {
    id: "catalogo-digital",
    name: "Catálogo Digital",
    tags: ["Web", "Marketing", "Destaque"],
    grid: [
      { kind: "service", label: "Catálogo online", note: "produtos/serviços" },
      { kind: "service", label: "Pesquisa e filtros", note: "encontrar rápido" },
      { kind: "service", label: "Análises", note: "cliques e pedidos" },
      { kind: "cta" },
    ],
  },
  {
    id: "loja-rapida",
    name: "Loja Rápida",
    tags: ["Web", "Marketing", "Destaque"],
    grid: [
      { kind: "service", label: "Página de vendas", note: "checkout simples" },
      { kind: "service", label: "Pagamentos online" },
      { kind: "service", label: "Análises", note: "vendas e pedidos" },
      { kind: "cta" },
    ],
  },
  {
    id: "branding",
    name: "Branding",
    tags: ["Design", "Marketing"],
    grid: [
      { kind: "service", label: "Logotipo + cores", note: "base da marca" },
      { kind: "service", label: "Guia rápido de uso", note: "consistência" },
      { kind: "service", label: "Mockups", note: "aplicações reais" },
      { kind: "cta" },
    ],
  },
  {
    id: "mvp-rapido",
    name: "MVP Rápido",
    tags: ["Apps", "Web"],
    grid: [
      { kind: "service", label: "Protótipo navegável", note: "teste a ideia" },
      { kind: "service", label: "Ecrãs principais", note: "UI simples" },
      { kind: "service", label: "Versão 1 web/app", note: "funções essenciais" },
      { kind: "cta" },
    ],
  },
  {
    id: "loja-pro",
    name: "Loja Pro",
    tags: ["Web", "Apps"],
    grid: [
      { kind: "service", label: "Loja + Sugestões Inteligentes", note: "faça mais vendas" },
      { kind: "service", label: "Área de cliente Pro", note: "conta & histórico" },
      { kind: "service", label: "Análises Pro", note: "dashboard avançado" },
      { kind: "cta" },
    ],
  },
  {
    id: "reservas-sem-stress",
    name: "Reservas sem Stress",
    tags: ["Web", "Apps"],
    grid: [
      { kind: "service", label: "Página de marcações", note: "24/7" },
      { kind: "service", label: "Lembretes automáticos", note: "email e chatbot" },
      { kind: "service", label: "Análises", note: "reservas e no-shows" },
      { kind: "cta" },
    ],
  },
  {
    id: "experiencia-imersiva",
    name: "Experiência Imersiva",
    tags: ["Apps", "Marketing"],
    grid: [
      { kind: "service", label: "AR/VR rooms", note: "tours, imobiliária, turismo" },
      { kind: "service", label: "Página de ativação", note: "explicar e captar" },
      { kind: "service", label: "Vídeo teaser", note: "divulgação" },
      { kind: "cta" },
    ],
  },
  {
    id: "rebrand-leve",
    name: "Rebrand Leve",
    tags: ["Design", "Web"],
    grid: [
      { kind: "service", label: "Logotipo novo", note: "versões essenciais" },
      { kind: "service", label: "Identidade visual", note: "cores e tipografia" },
      { kind: "service", label: "Atualização do site", note: "páginas‑chave" },
      { kind: "cta" },
    ],
  },
  {
    id: "site-completo",
    name: "Site Completo",
    tags: ["Web", "Marketing", "Destaque"],
    grid: [
      { kind: "service", label: "Website institucional", note: "páginas principais" },
      { kind: "service", label: "Formulários de contacto", note: "gere leads" },
      { kind: "service", label: "SEO de base", note: "ser encontrado" },
      { kind: "cta" },
    ],
  },
  {
    id: "anuncios-locais",
    name: "Anúncios Locais",
    tags: ["Marketing", "Design", "Destaque"],
    grid: [
      { kind: "service", label: "Objetivo & orçamento", note: "plano simples" },
      { kind: "service", label: "Criativos para anúncios", note: "imagem + texto" },
      { kind: "service", label: "Análise de resultados", note: "gráficos claros" },
      { kind: "cta" },
    ],
  },
  {
    id: "papelaria-pro",
    name: "Papelaria Pro",
    tags: ["Design", "Marketing"],
    grid: [
      { kind: "service", label: "Cartões de visita", note: "físico e digital" },
      { kind: "service", label: "Envelope & timbrado", note: "profissional" },
      { kind: "service", label: "Assinatura de email", note: "coerência" },
      { kind: "cta" },
    ],
  },
  {
    id: "automacao-simples",
    name: "Automação Simples",
    tags: ["Apps", "Marketing", "Destaque"],
    grid: [
      { kind: "service", label: "Respostas automáticas", note: "WhatsApp/email" },
      { kind: "service", label: "Recolha de contactos", note: "lista organizada" },
      { kind: "service", label: "Relatório mensal", note: "o que funcionou" },
      { kind: "cta" },
    ],
  },
  {
    id: "socias-meta",
    name: "Socias Meta (Instagram + Facebook)",
    tags: ["Marketing", "Design", "Destaque"],
    grid: [
      { kind: "service", label: "Calendário de posts", note: "ritmo certo" },
      { kind: "service", label: "Design & legendas", note: "mensagem alinhada" },
      { kind: "service", label: "Análises", note: "alcance e seguidores" },
      { kind: "cta" },
    ],
  },
  {
    id: "conteudo-digital-pro",
    name: "Conteúdo Digital Pro",
    tags: ["Marketing", "Design"],
    grid: [
      { kind: "service", label: "Gestão de Redes Sociais", note: "multi-plataforma" },
      { kind: "service", label: "Plano de tráfego pago", note: "orçamento e análises" },
      { kind: "service", label: "Design & legendas", note: "post + mensagem" },
      { kind: "cta" },
    ],
  },
  {
    id: "eventos",
    name: "Eventos",
    tags: ["Web", "Marketing"],
    grid: [
      { kind: "service", label: "Página do evento", note: "detalhes e inscrições" },
      { kind: "service", label: "Kit gráfico", note: "cartazes, posts" },
      { kind: "service", label: "Análises", note: "inscritos e presenças" },
      { kind: "cta" },
    ],
  },
  {
    id: "eventos-automatizados",
    name: "Eventos Automatizados",
    tags: ["Apps", "Web"],
    grid: [
      { kind: "service", label: "Página do evento + AI assistente", note: "FAQ automático" },
      { kind: "service", label: "Kit gráfico", note: "cartazes, outdoors, convites" },
      { kind: "service", label: "Bilheteira Inteligente", note: "emails, listas, presenças" },
      { kind: "cta" },
    ],
  },
  {
    id: "destaque-google-maps",
    name: "Destaque no Google Maps",
    tags: ["Marketing", "Web", "Destaque"], // contém a tag extra por nomenclatura; editar se necessário
    grid: [
      { kind: "service", label: "50 Citações", note: "comentários, palavras‑chave" },
      { kind: "service", label: "Cobertura mínima 20 km", note: "destaque local" },
      { kind: "service", label: "Otimização de conteúdo", note: "reconfigurações SEO" },
      { kind: "cta" },
    ],
  },
  {
    id: "destaque-google-search",
    name: "Destaque no Google Search",
    tags: ["Marketing", "Web", "Destaque"], // contém a tag extra por nomenclatura; editar se necessário
    grid: [
      { kind: "service", label: "Conteúdo SEO", note: "palavras‑chave, títulos, descrições" },
      { kind: "service", label: "Backlinks Seguros" },
      { kind: "service", label: "Endereçamento & Reconfigurações", note: "estratégias de tráfego" },
      { kind: "cta" },
    ],
  },
];
