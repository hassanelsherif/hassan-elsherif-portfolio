/** True when the visitor asked the OS for less motion. Safe to call during SSR. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on devices with a precise pointer (mouse/trackpad) that can hover. */
export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
