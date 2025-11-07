import React from "react";

export type AnimatedFooterProps = {
  className?: string;
  slogan?: string;
  subline?: string;
  /** Set false if you want to render the footer without the wave cap above */
  showWaves?: boolean;
};

/**
 * Animated footer with layered SVG waves ABOVE the footer block.
 * Palette aligned with the "Quero!" button (pink → blue) and softened.
 */
export default function AnimatedFooter({
  className = "",
  slogan = "Design que soma, soluções que escalam.",
  subline = "Feito pelo BUNDLR — Group of Design & TechSolutions.",
  showWaves = true,
}: AnimatedFooterProps) {
  const areas = [
    { label: "Marketing", href: "/marketing" },
    { label: "Design", href: "/design" },
    { label: "Web", href: "/web" },
    { label: "IA", href: "/ia" },
    { label: "Apps", href: "/apps" },
  ];

  const socials = [
    { label: "Instagram", href: "/instagram" },
    { label: "WhatsApp", href: "/whatsapp" },
    { label: "Agendar Chamada", href: "/agendar-chamada" },
  ];

  return (
    <div className={`footer-theme w-full ${className}`}>
      {/* Waves ABOVE the footer (not inside) — full-bleed */}
      {showWaves && (
        <div
          aria-hidden
          className="wave-cap relative select-none pointer-events-none overflow-hidden"
          style={{ height: "clamp(72px, 12vw, 150px)" }}
        >
          <div className="wave-layer wave-1" />
          <div className="wave-layer wave-2" />
          <div className="wave-layer wave-3" />
        </div>
      )}

      {/* Footer block */}
      <footer className={`relative overflow-hidden text-zinc-900`}>      
        {/* Background gradient full-bleed */}
        <div className="bg-layer full-bleed">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Brand / Slogan */}
              <div className="max-w-xl">
                <img
                  src="/logo.png"
                  alt="BUNDLR logo"
                  className="h-10 w-auto mb-6"
                  loading="lazy"
                />
                <h3 className="text-3xl leading-tight font-semibold tracking-tight mb-2">
                  {slogan}
                </h3>
                <p className="text-base/relaxed text-zinc-800/80 max-w-prose">
                  {subline}
                </p>
              </div>

              {/* Areas */}
              <nav aria-label="Secções" className="md:justify-self-center">
                <ul className="space-y-4 text-xl font-medium">
                  {areas.map((i) => (
                    <li key={i.label}>
                      <a className="footer-link" href={i.href}>
                        {i.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Socials */}
              <nav aria-label="Social e contacto" className="md:justify-self-end">
                <ul className="space-y-4 text-xl font-medium">
                  {socials.map((i) => (
                    <li key={i.label}>
                      <a className="footer-link" href={i.href}>
                        {i.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Divider */}
            <hr className="mt-12 border-zinc-900/10" />

            {/* Bottom line */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 text-sm text-zinc-700/90">
              <p>
                made by <strong>BUNDLR</strong> — Group of Design and TechSolutions
              </p>
              <p className="opacity-80">© {new Date().getFullYear()} Todos os direitos reservados.</p>
            </div>
          </div>
        </div>

        {/* Component-scoped styles */}
        <style>{`
          /* THEME (softened pink → blue, lighter & less saturated) */
          .footer-theme { --pink: #ffeafb; --lav: #f5eaff; --blue: #e6f3ff; --page-bg: #f5f7fb; }
          .bg-layer { background: linear-gradient(180deg, var(--pink) 0%, var(--blue) 100%); }
          .full-bleed { width: 100vw; margin-left: calc(50% - 50vw); }

          /* Link styling */
          .footer-link { position: relative; text-decoration: none; }
          .footer-link::after {
            content: ""; position: absolute; left: 0; bottom: -2px; width: 100%; height: 2px;
            background: currentColor; transform: scaleX(0); transform-origin: left;
            transition: transform 240ms ease; opacity: .25;
          }
          .footer-link:hover::after { transform: scaleX(1); opacity: .55; }

          /* WAVE CAP — full-bleed and soft fade at bottom */
          .wave-cap { width: 100vw; margin-left: calc(50% - 50vw); background: transparent; }
          .wave-cap::after {
            content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 32px;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--pink) 100%);
            pointer-events: none;
          }

          /* WAVE LAYERS — smoother motion, no hard corners, fully responsive */
          .wave-layer {
            position: absolute; left: -25%; right: -25%; bottom: -8px;
            height: 160px; background-repeat: repeat-x; background-size: 1600px 160px;
            animation-timing-function: linear; will-change: background-position; transform: translateZ(0);
            -webkit-mask-image: radial-gradient(140% 180% at 50% 0, #000 68%, transparent 100%);
            mask-image: radial-gradient(140% 180% at 50% 0, #000 68%, transparent 100%);
            opacity: 0.8;
          }

          .wave-1 {
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 160' preserveAspectRatio='none'><path d='M0,88 C160,56 480,52 800,84 C1120,116 1440,120 1600,92 L1600,160 L0,160 Z' fill='%23ffeafb'/></svg>");
            animation: waveMove1 36s infinite; opacity: .9; animation-delay: -6s;
          }
          .wave-2 {
            background-image: url("data:image/svg+xml;utf8;<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 160' preserveAspectRatio='none'><path d='M0,100 C220,70 520,58 800,86 C1080,114 1380,124 1600,96 L1600,160 L0,160 Z' fill='%23f5eaff'/></svg>");
            animation: waveMove2 28s infinite; opacity: .7; animation-delay: -3s;
          }
          .wave-3 {
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 160' preserveAspectRatio='none'><path d='M0,112 C260,84 580,70 800,96 C1020,122 1340,120 1600,108 L1600,160 L0,160 Z' fill='%23e6f3ff'/></svg>");
            animation: waveMove3 20s infinite; opacity: .85; animation-delay: -9s;
          }

          @keyframes waveMove1 { from { background-position: 0% 100%; } to { background-position: -1600px 100%; } }
          @keyframes waveMove2 { from { background-position: -200px 100%; } to { background-position: -1800px 100%; } }
          @keyframes waveMove3 { from { background-position: -400px 100%; } to { background-position: -2000px 100%; } }

          @media (prefers-reduced-motion: reduce) { .wave-layer { animation: none; } }
        `}</style>
      </footer>
    </div>
  );
}
