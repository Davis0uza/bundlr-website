"use client";

import { useId, useState, useEffect } from "react";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { Roboto } from "next/font/google";
import type { ComponentType } from "react";
import Image from "next/image";

const robotoBold = Roboto({ weight: "800", subsets: ["latin"], display: "swap" });

export type AnyIcon = ComponentType<{ className?: string; isHover?: boolean }>;

// Tipar o array + tipar o parâmetro `p` elimina o TS7006
type IconProps = { className?: string; isHover?: boolean };
const services: Array<{ label: string; Icon: AnyIcon; href: string }> = [
  { label: "MARKETING", Icon: (p: IconProps) => <GifOnHover name="marketing" {...p} />, href: "/services#section-marketing" },
  { label: "DESIGN",    Icon: (p: IconProps) => <GifOnHover name="design"    {...p} />, href: "/services#section-design" },
  { label: "WEB",       Icon: (p: IconProps) => <GifOnHover name="web"       {...p} />, href: "/services#section-web" },
  { label: "IA",        Icon: (p: IconProps) => <GifOnHover name="ia"        {...p} />, href: "/services#section-ia" },
  { label: "APPS",      Icon: (p: IconProps) => <GifOnHover name="apps"      {...p} />, href: "/services#section-apps" },
  { label: "CONTACTAR", Icon: (p: IconProps) => <GifOnHover name="contactar" {...p} />, href: "/contact" },

];

export default function CircleNav() {
  return (
    // Mobile + iPad: grid 3x3; Desktop: volta a layout “livre” com flex
    <div className="mx-auto grid max-w-6xl grid-cols-3 md:grid-cols-6 place-items-center gap-5 md:gap-6 lg:gap-7 xl:gap-9">
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
    >
      <motion.div
        role="button"
        aria-label={label}
        variants={variants}
        initial="rest"
        animate={shell}
        // Menor em mobile e iPad; cresce só a partir de lg (desktop)
        className="relative origin-top flex h-24 w-24 items-center justify-center md:h-24 md:w-24 lg:h-32 lg:w-32 will-change-transform"
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
            <Icon className="h-7 w-7 md:h-7 md:w-7 lg:h-10 lg:w-10" isHover={isHover} />
          </motion.div>
          <motion.span
            className={`${robotoBold.className} mt-2 text-[10px] tracking-wide md:text-[10px] lg:text-[12px]`}
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
      setSrc(`${gif}?t=${Date.now()}`);
    } else {
      setSrc(still);
    }
  }, [isHover, gif, still]);

  return (
     <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className={`h-7 w-7 md:h-7 md:w-7 lg:h-10 lg:w-10 select-none ${className}`}
      draggable={false}
      aria-hidden={alt === ""}
    />
  );
}
