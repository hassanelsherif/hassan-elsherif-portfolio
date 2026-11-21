"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/motion";

// "11", "0.3 s", "3+ years", "5 labs": one leading number, no other digits after it
const PATTERN = /^(\d+(?:\.\d+)?)(\D*)$/;

/**
 * Counts a leading number up from zero the first time it scrolls into view.
 * Values that aren't "number + text" (e.g. "CRITICAL", "11 → 0") render as-is.
 * The server render is always the final value.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(PATTERN);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    const target = parseFloat(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const suffix = match[2];
    if (target === 0) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        el.textContent = (0).toFixed(decimals) + suffix;
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // match is derived from value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
