import { cn } from "@/lib/utils";

/**
 * Display headline whose lines rise one after another out of a clipping mask.
 * Pure CSS, so it plays on first paint with no hydration flash; the global
 * reduced-motion rule collapses it to an instant show.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  baseDelay = 0,
  step = 110,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        // pb/-mb keeps descenders (g, y) from being clipped by the mask
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            className={cn("block animate-rise", lineClassName)}
            style={{ animationDelay: `${baseDelay + i * step}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
