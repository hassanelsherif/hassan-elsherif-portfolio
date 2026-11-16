import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string; // small eyebrow label
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  /** Page headers are h1 (the default); use h2 when it heads a section within a page. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "left",
  as: Heading = "h1",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", align === "center" && "text-center", className)}>
      {label && <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">{label}</p>}
      <Heading className="text-3xl sm:text-4xl font-bold tracking-tight text-fg">{title}</Heading>
      {subtitle && (
        <p className={cn("mt-3 text-muted max-w-2xl leading-relaxed", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
