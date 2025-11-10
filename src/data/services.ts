// data/services.ts

export type ServiceKey = "marketing" | "design" | "web" | "ia" | "apps";

export interface ServiceSection {
  key: ServiceKey;
  id: `section-${ServiceKey}`;
  title: string;
  phrase: string;
  text: string;
  bullets: string[];
  image?: string;
}

export const SERVICE_SECTIONS: ServiceSection[] = [
  {
    key: "marketing",
    id: "section-marketing",
    title: "Marketing",
    phrase: "Visiblidade é a chave para a era digital.",
    text:
      "Sem um uma presença forte nas plataformas, o teu negócio passa despercebido. Vamos pô-lo no mapa?",
    bullets: [
      "Estratégia e planeamento",
      "Gestão de redes sociais",
      "Performance e Ads",
      "Email marketing e automações",
      "SEO e conteúdos",
      "Motion Design",
      "Edição de vídeo",
      "Fotografia profissional",
    ],
    image: "/images/marketingimage.png",
  },
  {
    key: "design",
    id: "section-design",
    title: "Design",
    phrase: "Design forte, presença T-Rex.",
    text:
      "De 8-bit a memorável: atualizamos a tua marca para dominar o feed.",
    bullets: [
      "Identidade visual e branding",
      "Redesign de marcas",
      "UI/UX para web e mobile",
      "Design de peças e templates",
      "Guides e sistemas de design",
      "Design Gráfico e publicidade",
      "Estratégias de Marca",
      "Moodboards e conceito visual",
    ],
    image: "/images/designimage_Prancheta1.png",
  },
  {
    key: "web",
    id: "section-web",
    title: "Web",
    phrase: "Leva o teu negócio às alturas!",
    text:
      "O nossos sites e estratégias são de outro mundo!",
    bullets: [
      "Websites Next.js/React",
      "Landing pages e SEO técnico",
      "Headless CMS (Sanity, Strapi)",
      "Integrações e automações",
      "Design de Interfaces Web & Mobile (UX/UI)",
      "Protótipos Navegáveis (Figma/Webflow)",
      "Redesign de Sites",
      "Integrações com Base de Dados e APIs",

    ],
    image: "/images/webimage1.png",
  },
  {
    key: "ia",
    id: "section-ia",
    title: "IA",
    phrase: "Automatize hoje, acelere o amanhã.",
    text:
      "Aplicamos IA onde faz diferença: reduzir tarefas repetitivas, melhorar atendimento e acelerar conteúdos. "
      + "Construímos agentes, RAG e copilots conectados aos teus dados e ferramentas.",
    bullets: [
      "Assistentes e workflows de IA",
      "RAG e automação de conteúdos",
      "Automações N8N",
      "Dashboards e copilots internos",
      "Chatbots para atendimento",
      "Chatbot para reservas",
      "Chatbots para faturação",
      "ChatAssintent Pessoal",
    ],
    image: "/images/AIimage.png",
  },
  {
    key: "apps",
    id: "section-apps",
    title: "Apps",
    phrase: "Apps que as pessoas adoram usar.",
    text:
      "Prototipamos rápido, testamos cedo e lançamos com métricas desde o primeiro dia. "
      + "Trabalhamos com React Native e PWAs para entregar experiências fluidas em várias plataformas.",
    bullets: [
      "Apps iOS/Android (React Native)",
      "PWAs e apps multiplataforma",
      "Publicação e analytics",
      "CICD e otimização de performance",
    ],
    image: "/images/appimage.png",
  },
] as const;

export const SERVICE_BY_KEY: Record<ServiceKey, ServiceSection> = Object.fromEntries(
  SERVICE_SECTIONS.map((s) => [s.key, s])
) as Record<ServiceKey, ServiceSection>;
