"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/motion";

/**
 * Moves its content up at a fraction of the scroll speed and fades it out over
 * the first viewport, so hero type drifts away as the page scrolls.
 */
export function Parallax({
  children,
  speed = 0.25,
  fade = true,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      el.style.transform = `translate3d(0, ${-y * speed}px, 0)`;
      if (fade) el.style.opacity = String(1 - (y / window.innerHeight) * 0.9);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed, fade]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
