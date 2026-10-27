import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string; // small eyebrow label
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="font-mono text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-2">
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-[#475569] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
