import { cn } from "@/lib/utils";

type BadgeVariant = "cloud" | "devops" | "infra" | "scripting" | "monitoring" | "default";

// Neutral chip; the category is carried by a small colored dot so rows of badges stay calm
const dotClasses: Record<BadgeVariant, string> = {
  cloud: "bg-orange-500",
  devops: "bg-blue-500",
  infra: "bg-violet-500",
  scripting: "bg-emerald-500",
  monitoring: "bg-amber-500",
  default: "bg-gray-400",
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-mono font-medium",
        "bg-subtle text-fg/80 border border-border",
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotClasses[variant])} aria-hidden="true" />
      {label}
    </span>
  );
}
