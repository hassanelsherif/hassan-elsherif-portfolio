"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/components/motion/motion";

/**
 * Text whose words light up one by one as the block scrolls through the viewport.
 * Server render (and reduced motion) shows every word at full strength.
 */
export function ScrollWords({ text, dim = 0.18 }: { text: string; dim?: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the viewport, 1 when its bottom reaches 45%
      const progress = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height));
      const lit = progress * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(dim + (1 - dim) * clamp(lit - i));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dim]);

  return (
    <span ref={root}>
      {words.map((w, i) => (
        <span key={i} data-word className="transition-opacity duration-150">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
