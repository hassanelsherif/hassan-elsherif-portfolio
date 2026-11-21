import { cn } from "@/lib/utils";
import { Scramble } from "@/components/motion/Scramble";

/** Mono eyebrow used across the site. With `n` it reads "01 — Profile". */
export function SectionLabel({
  n,
  children,
  className,
}: {
  n?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-widest text-accent", className)}>
      {n !== undefined && (
        <>
          {String(n).padStart(2, "0")}
          {children ? (
            <>
              {" "}
              <span className="text-muted mx-1">—</span>{" "}
            </>
          ) : null}
        </>
      )}
      {/* Plain-text labels decode in terminal-style; anything richer renders as-is */}
      {typeof children === "string" ? <Scramble text={children} /> : children}
    </p>
  );
}

/**
 * Numbered in-page section heading: eyebrow + display h2. `id` goes on the h2 so
 * anchors (and the case-study table of contents) land on the title.
 */
export function SectionTitle({
  n,
  label,
  id,
  children,
  className,
  size = "md",
}: {
  n?: number;
  label?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div className={cn("mb-6", className)}>
      {(label || n !== undefined) && (
        <SectionLabel n={n} className="mb-3">
          {label}
        </SectionLabel>
      )}
      <h2
        id={id}
        className={cn(
          "font-display font-semibold tracking-[-0.035em] leading-[1.05] text-fg",
          size === "lg" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
        )}
      >
        {children}
      </h2>
    </div>
  );
}
