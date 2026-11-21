"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { hasFinePointer, prefersReducedMotion } from "@/components/motion/motion";

/**
 * Wrapper that pulls its child a few pixels toward the cursor, then springs back
 * on leave. Mouse/trackpad only; does nothing for touch or reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || !hasFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transition = "transform 150ms ease-out";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("inline-flex will-change-transform", className)}
    >
      {children}
    </span>
  );
}
