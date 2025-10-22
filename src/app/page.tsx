// app/page.tsx
import AnimatedWavesLite from "@/components/AnimatedWavesLite";
import LogoWithSubtitle from "@/components/LogoWithSubtitle";
import CircleNav from "@/components/CircleNav";
import ChatFAQ from "@/components/ChatFAQ";
import SmartComposer from "@/components/SmartComposer";
import RecommendedBundles from "@/components/RecommendedBundles";

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
        <ChatFAQ />
        <div className="mt-0">
            <SmartComposer
                whatsappNumber="351912345678"          // opcional: sem o '+'
                emailTo="hello@teu-dominio.com"        // opcional
                scheduleUrl="/agendar"                 // opcional (acrescenta ?note=mensagem)
            />
        </div>
        <RecommendedBundles emailTo="hello@teu-dominio.com" />
        </main>
      {/* Conteúdo abaixo em branco */}
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* ... resto da página ... */}
      </main>
    </div>
  );
}
