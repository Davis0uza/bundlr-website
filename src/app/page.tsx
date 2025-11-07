// app/page.tsx
import AnimatedWavesLite from "@/components/AnimatedWavesLite";
import LogoWithSubtitle from "@/components/LogoWithSubtitle";
import CircleNav from "@/components/CircleNav";
import ChatFAQ from "@/components/ChatFAQ";
import SmartComposer from "@/components/SmartComposer";
import RecommendedBundles from "@/components/RecommendedBundles";
import ProfileCard from "@/components/ProfileCard";
import AnimatedFooter from "@/components/AnimatedFooter";


const cards = [
  {
    // Card 1 — “Cyber Violet”
    name: "Consolidar",
    title: "Análise de mercado • Auditoria técnica",
    status: "Análise Completa",
    contactText: "Começar",
    avatarUrl: "/blank.png",
    miniAvatarUrl: "/compass.png",
    iconUrl: "/compass.png",
    innerGradient: "linear-gradient(145deg,#2b5d8c 0%,#7d7d7d 100%)", // default vibe
    behindGradient:
      "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)",
  },
  {
    // Card 2 — “Sunset Peach”
    name: "Construir",
    title: "Design systems • n8n + APIs",
    status: "Produção Escalável",
    contactText: "Acompanhar",
    avatarUrl: "/blank.png",
    miniAvatarUrl: "/gear.png",
    iconUrl: "/gear.png",
    innerGradient: "linear-gradient(145deg,#f24edc 0%,#7d7d7d 100%)",
    behindGradient:
      "radial-gradient(60% 60% at 40% 20%,#ffd1a880 0%,#0000 70%),conic-gradient(from 90deg at 50% 50%,#ff7c5c 0%,#ffd27a 40%,#ffd27a 60%,#ff7c5c 100%)",
  },
  {
    // Card 3 — “Aqua Mint”
    name: "Crescer",
    title: "Campanhas • Conteúdo • Alojamento",
    status: "Otimização e Suporte",
    contactText: "Consultar",
    avatarUrl: "/blank.png",
    miniAvatarUrl: "/rocket.png",
    iconUrl: "/rocket.png",
    innerGradient: "linear-gradient(145deg,#7cd688 0%,#7d7d7d 100%)",
    behindGradient:
      "radial-gradient(35% 52% at 55% 20%,#00ffaa80 0%,#0000 100%),radial-gradient(100% 100% at 50% 50%,#00c1ff66 1%,#0000 76%),conic-gradient(from 124deg at 50% 50%,#00c2a8 0%,#0ad1ff 50%,#00c2a8 100%)",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0b1220]">
      {/* HERO (ondas normais) */}
      <section className="relative h-[520px]">
        <AnimatedWavesLite
          layers={14}
          gradientFrom="#ffd1f7"
          gradientTo="#bfe5ff"
          height={520}
          quality={1}
          fadeEdge="bottom"
          fadeSize={120}
        />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6">
          <div className="pt-6 md:pt-8">
            <CircleNav />
          </div>

          <div className="flex-1" />

          <div className="pb-10 md:pb-14">
            <LogoWithSubtitle />
          </div>
        </div>
      </section>

      {/* TRANSIÇÃO (invertida, desvanece para branco) */}
      <section className="relative h-[260px] -mt-px">
        <AnimatedWavesLite
          invert
          layers={10}
          gradientFrom="#ffd1f7"
          gradientTo="#bfe5ff"
          height={260}
          quality={1}
          fadeEdge="bottom"
          fadeSize={220}
        />
      </section>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-40 md:grid-cols-3 place-items-center -mt-12 md:-mt-66">
          {cards.map((c, i) => (
            <ProfileCard
              key={i}
              className="pc-compact"
              showUserInfo
              enableTilt
              enableMobileTilt={false}
              {...c}
            />
          ))}
        </div>
        <ChatFAQ />
        <div className="mt-0">
          <SmartComposer
            whatsappNumber="351912345678" // opcional: sem o '+'
            emailTo="hello@teu-dominio.com" // opcional
            scheduleUrl="/agendar" // opcional (acrescenta ?note=mensagem)
          />
        </div>
        <RecommendedBundles selection={{ tag: "Destaque" }} />
        
      </main>
      
      <AnimatedFooter
          slogan="Ideias em pacote. Resultados sem stress."
          subline="BUNDLR — Design & TechSolutions."
        />
    </div>
  );
}
