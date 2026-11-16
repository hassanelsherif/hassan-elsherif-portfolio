import { cn } from "@/lib/utils";

/** Plain monospace tag for skills and stack lists (no category dot — see Badge for that). */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-muted bg-subtle border border-border",
        className
      )}
    >
      {children}
    </span>
  );
}
