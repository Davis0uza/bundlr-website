"use client";

import { useState, useEffect } from "react";

interface Bubble {
  id: number;
  startSize: number;
  endSize: number;
  left: number;
  delay: number;
  duration: number;
  wobbleAmp: number;
  morphDuration: number;
  hue: number;
  opacity: number;
}

const BUBBLE_COUNT = 24;

const PINK = { r: 248, g: 205, b: 224 };
const BLUE = { r: 208, g: 237, b: 255 };

function lerpColor(t: number): string {
  const r = Math.round(PINK.r + (BLUE.r - PINK.r) * t);
  const g = Math.round(PINK.g + (BLUE.g - PINK.g) * t);
  const b = Math.round(PINK.b + (BLUE.b - PINK.b) * t);
  return `${r}, ${g}, ${b}`;
}

function lerpColorDark(t: number): string {
  const factor = 0.75;
  const r = Math.round((PINK.r + (BLUE.r - PINK.r) * t) * factor);
  const g = Math.round((PINK.g + (BLUE.g - PINK.g) * t) * factor);
  const b = Math.round((PINK.b + (BLUE.b - PINK.b) * t) * factor);
  return `${r}, ${g}, ${b}`;
}

export default function LavaBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const arr: Bubble[] = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      arr.push({
        id: i,
        startSize: 20 + Math.random() * 40,
        endSize: 120 + Math.random() * 140,
        left: Math.random() * 100,
        delay: Math.random() * -60,
        duration: 35 + Math.random() * 30,
        wobbleAmp: 40 + Math.random() * 80,
        morphDuration: 3 + Math.random() * 5,
        hue: Math.random(),
        opacity: 0.15 + Math.random() * 0.4,
      });
    }
    setBubbles(arr);
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bubbles.map((b) => {
        const col = lerpColor(b.hue);
        const colDark = lerpColorDark(b.hue);
        return (
          <div
            key={b.id}
            className="absolute"
            style={{
              left: `${b.left}%`,
              bottom: "-180px",
              width: `${b.startSize}px`,
              height: `${b.startSize}px`,
              opacity: b.opacity,
              animation: [
                `lavaBubbleRiseFull ${b.duration}s linear ${b.delay}s infinite`,
                `lavaBubbleWobble ${b.duration * 0.35}s ease-in-out infinite`,
              ].join(", "),
              ["--wobble-amp" as string]: `${b.wobbleAmp}px`,
              ["--start-size" as string]: `${b.startSize}px`,
              ["--end-size" as string]: `${b.endSize}px`,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                borderRadius: "42% 58% 63% 37% / 45% 52% 48% 55%",
                background: `radial-gradient(circle at 35% 30%, rgba(${col}, 0.95) 0%, rgba(${col}, 0.6) 40%, rgba(${colDark}, 0.4) 100%)`,
                boxShadow: `inset -8px -10px 20px rgba(${colDark}, 0.5), inset 6px 6px 15px rgba(255,255,255,0.6), 0 0 32px rgba(${col}, 0.3)`,
                filter: "blur(2px)",
                animation: [
                  `lavaBubbleMorph ${b.morphDuration}s ease-in-out infinite`,
                  `lavaBubbleSquish ${b.morphDuration * 1.6}s ease-in-out infinite`,
                ].join(", "),
              }}
            />
          </div>
        );
      })}

      <style>{`
        @keyframes lavaBubbleRiseFull {
          0% {
            transform: translateY(0);
            width: var(--start-size);
            height: var(--start-size);
            opacity: 0;
          }
          8% { opacity: 1; }
          92% { opacity: 0.4; }
          100% {
            transform: translateY(-8500px); 
            width: var(--end-size);
            height: var(--end-size);
            opacity: 0;
          }
        }

        @keyframes lavaBubbleWobble {
          0%, 100% { margin-left: 0; }
          25% { margin-left: var(--wobble-amp); }
          75% { margin-left: calc(var(--wobble-amp) * -1); }
        }

        @keyframes lavaBubbleMorph {
          0%   { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          25%  { border-radius: 65% 35% 45% 55% / 35% 65% 35% 65%; }
          50%  { border-radius: 45% 55% 35% 65% / 65% 35% 65% 35%; }
          75%  { border-radius: 35% 65% 75% 25% / 55% 45% 65% 35%; }
          100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
        }

        @keyframes lavaBubbleSquish {
          0%, 100% { transform: scaleX(1) scaleY(1); }
          25% { transform: scaleX(1.35) scaleY(0.75); }
          50% { transform: scaleX(0.75) scaleY(1.35); }
          75% { transform: scaleX(1.2) scaleY(0.85); }
        }
      `}</style>
    </div>
  );
}
