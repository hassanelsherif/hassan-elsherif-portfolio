"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&/<>_*+=";

/**
 * Terminal-style decode: the first time the text scrolls into view, characters
 * cycle through random glyphs and lock in left to right. Meant for monospace
 * labels, so the width never changes. Screen readers get the real text only;
 * the server render (and reduced motion) shows the final text.
 */
export function Scramble({ text, duration = 700 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let lastSwap = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // Re-roll the random glyphs ~every 40ms so it flickers, not strobes
        if (now - lastSwap > 40 || t === 1) {
          lastSwap = now;
          const locked = Math.floor(t * text.length);
          el.textContent = Array.from(text, (ch, i) =>
            i < locked || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          ).join("");
        }
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 1 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, duration]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </>
  );
}
