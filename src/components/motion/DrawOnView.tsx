"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/motion";

/**
 * Drives the diagram draw-in. It sets data-anim="ready" (hidden start state) after
 * mount and "in" once the block is on screen; the CSS in globals.css does the rest.
 * Without JS, or with reduced motion, the attribute is never set and the
 * diagram is simply fully drawn.
 */
export function DrawOnView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    el.dataset.anim = "ready";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          // Next frame, so the hidden state is painted before the transition starts
          requestAnimationFrame(() => (el.dataset.anim = "in"));
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
