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
    phrase: "Criamos conexão que converte.",
    text:
      "Planeamos e executamos campanhas orientadas a objetivos claros: alcance, tráfego e receita. "
      + "Do conteúdo às automações, otimizamos continuamente com base em dados para crescer de forma sustentável.",
    bullets: [
      "Estratégia e planeamento",
      "Gestão de redes sociais",
      "Performance e Ads",
      "Email marketing e automações",
    ],
    image: "/icons/marketing.png",
  },
  {
    key: "design",
    id: "section-design",
    title: "Design",
    phrase: "Design com propósito, não só aparência.",
    text:
      "Construímos identidades e sistemas visuais que tornam a comunicação clara e memorável. "
      + "Do branding aos componentes de UI, garantimos consistência, acessibilidade e velocidade de produção.",
    bullets: [
      "Identidade visual e branding",
      "UI/UX para web e mobile",
      "Design de peças e templates",
      "Guides e sistemas de design",
    ],
    image: "/icons/design.png",
  },
  {
    key: "web",
    id: "section-web",
    title: "Web",
    phrase: "Sites rápidos, bonitos e fáceis de escalar.",
    text:
      "Desenvolvemos em Next.js/React com foco em performance, SEO técnico e DX. "
      + "Integramos CMS headless e analytics para que o teu site seja fácil de manter e medir.",
    bullets: [
      "Websites Next.js/React",
      "Landing pages e SEO técnico",
      "Headless CMS (Sanity, Strapi)",
      "Integrações e automações",
    ],
    image: "/icons/web.png",
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
      "Integração com APIs e dados",
      "Dashboards e copilots internos",
    ],
    image: "/icons/ia.png",
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
    image: "/icons/apps.png",
  },
] as const;

export const SERVICE_BY_KEY: Record<ServiceKey, ServiceSection> = Object.fromEntries(
  SERVICE_SECTIONS.map((s) => [s.key, s])
) as Record<ServiceKey, ServiceSection>;
