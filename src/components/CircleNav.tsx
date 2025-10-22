"use client";

import { useId, useState, useEffect } from "react";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { Roboto } from "next/font/google";
import type { ComponentType } from "react";

const robotoBold = Roboto({ weight: "800", subsets: ["latin"], display: "swap" });

export type AnyIcon = ComponentType<{ className?: string; isHover?: boolean }>;

const services: { label: string; Icon: AnyIcon; href: string }[] = [
  { label: "MARKETING",  Icon: (p) => <GifOnHover name="marketing"  {...p} />, href: "#marketing" },
  { label: "DESIGN",     Icon: (p) => <GifOnHover name="design"     {...p} />, href: "#design" },
  { label: "WEB",        Icon: (p) => <GifOnHover name="web"        {...p} />, href: "#web" },
  { label: "IA",         Icon: (p) => <GifOnHover name="ia"         {...p} />, href: "#ia" },
  { label: "APPS",       Icon: (p) => <GifOnHover name="apps"       {...p} />, href: "#apps" },
  { label: "CONTACTAR",  Icon: (p) => <GifOnHover name="contactar"  {...p} />, href: "mailto:hello@teu-dominio.com" },
];

export default function CircleNav() {
  return (
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-7 md:gap-9">
      {services.map(({ label, Icon, href }, i) => (
        <Circle key={label} Icon={Icon} href={href} label={label} delay={i * 0.05} />
      ))}
    </div>
  );
}

function Circle({
  Icon,
  href,
  label,
  delay = 0,
}: {
  Icon: AnyIcon;
  href: string;
  label: string;
  delay?: number;
}) {
  const BLUE_ICON = "#242424";
  const PINK_RING_1 = "#efd1f4";
  const PINK_RING_2 = "#f4e3fa";
  const PINK_GLOW = "#ffd7e6";

  const shell = useAnimationControls();
  const ringOn = useAnimationControls();
  const iconCtl = useAnimationControls();
  const glowCtl = useAnimationControls();

  const variants: Variants = {
    rest: { scale: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 18 } },
    hover: { scale: 1.15, y: 0, transition: { duration: 0.22 } },
    click: { scale: 1.1, y: 0, transition: { duration: 0.38, ease: "easeInOut" } },
  };

  const [isHover, setIsHover] = useState(false);

  const handleEnter = () => {
    setIsHover(true);
    shell.start("hover");
    ringOn.start({ opacity: 1, transition: { duration: 0.22 } });
    glowCtl.start({ opacity: 0.35, transition: { duration: 0.22 } });
    iconCtl.start({ color: "#e06a94", transition: { duration: 0.22 } });
  };
  const handleLeave = () => {
    setIsHover(false);
    shell.start("rest");
    ringOn.start({ opacity: 0, transition: { duration: 0.22 } });
    glowCtl.start({ opacity: 0, transition: { duration: 0.22 } });
    iconCtl.start({ color: BLUE_ICON, transition: { duration: 0.22 } });
  };
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await Promise.all([
      shell.start("click"),
      ringOn.start({ opacity: 1, transition: { duration: 0.38, ease: "easeInOut" } }),
      glowCtl.start({ opacity: 0.35, transition: { duration: 0.38, ease: "easeInOut" } }),
      iconCtl.start({ color: "#efd1f4", transition: { duration: 0.38, ease: "easeInOut" } }),
    ]);
    window.location.assign(href);
  };

  const uid = useId();
  const baseGradId = `base-${uid}`;
  const hoverGradId = `hover-${uid}`;
  const glowFilterId = `glow-${uid}`;
  const clipOuterId = `clip-outer-${uid}`;

  const STROKE = 4;
  const R = 48;

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 160, damping: 18 }}
      className="group relative select-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onClick={handleClick}
    >
      <motion.div
        role="button"
        aria-label={label}
        variants={variants}
        initial="rest"
        animate={shell}
        className="relative origin-top flex h-28 w-28 items-center justify-center md:h-32 md:w-32 will-change-transform"
      >
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          aria-hidden
        >
          <defs>
            <linearGradient id={baseGradId} x1="0%" y1="0%" x2="30%" y2="50%">
              <stop offset="0%" stopColor="#efd1f4" />
              <stop offset="100%" stopColor="#c4d4ec" />
            </linearGradient>
            <linearGradient id={hoverGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={PINK_RING_1} />
              <stop offset="100%" stopColor={PINK_RING_2} />
            </linearGradient>
            <filter id={glowFilterId} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <clipPath id={clipOuterId}>
              <circle cx="50" cy="50" r={R + STROKE / 2} />
            </clipPath>
          </defs>

          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={PINK_GLOW}
            strokeWidth={STROKE}
            filter={`url(#${glowFilterId})`}
            clipPath={`url(#${clipOuterId})`}
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={glowCtl}
          />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={`url(#${baseGradId})`}
            strokeWidth={STROKE}
            vectorEffect="non-scaling-stroke"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={`url(#${hoverGradId})`}
            strokeWidth={STROKE}
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={ringOn}
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={iconCtl}
            style={{ color: BLUE_ICON }}
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <Icon className="h-8 w-8 md:h-10 md:w-10" isHover={isHover} />
          </motion.div>
          <motion.span
            className={`${robotoBold.className} mt-2 text-[11px] tracking-wide md:text-[12px]`}
            animate={iconCtl}
            style={{ color: BLUE_ICON }}
          >
            {label}
          </motion.span>
        </div>
      </motion.div>
    </motion.a>
  );
}

/**
 * Ícone que troca entre PNG estático e GIF animado.
 * - Toca a animação (GIF) quando o botão está em hover (isHover=true).
 * - Volta ao PNG quando o hover termina.
 * - Usa cache-buster para reiniciar o GIF sempre.
 */
function GifOnHover({
  name,
  alt = "",
  className = "",
  isHover = false,
}: {
  name: string;
  alt?: string;
  className?: string;
  isHover?: boolean;
}) {
  const still = `/Icons/${name}.png`;
  const gif = `/Icons/${name}.gif`;
  const [src, setSrc] = useState<string>(still);

  useEffect(() => {
    if (isHover) {
      setSrc(`${gif}?t=${Date.now()}`); // reinicia sempre que entra em hover
    } else {
      setSrc(still);
    }
  }, [isHover, gif, still]);

  return (
    <img
      src={src}
      alt={alt}
      className={`h-8 w-8 md:h-10 md:w-10 select-none ${className}`}
      draggable={false}
      aria-hidden={alt === ""}
    />
  );
}
