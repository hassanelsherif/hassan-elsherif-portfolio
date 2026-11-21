import { cn } from "@/lib/utils";
import { LineReveal } from "@/components/ui/LineReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Scramble } from "@/components/motion/Scramble";

interface SectionHeadingProps {
  label?: string; // small eyebrow label
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  /** Page headers are h1 (the default); use h2 when it heads a section within a page. */
  as?: "h1" | "h2";
  /** Optional count shown as a superscript, e.g. (05) */
  count?: number;
}

/**
 * Page header in the site's editorial style: mono eyebrow, oversized display title
 * that rises in, accent full stop, and a ruled row holding the subtitle.
 */
export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "left",
  as: Heading = "h1",
  count,
}: SectionHeadingProps) {
  const isPage = Heading === "h1";

  return (
    <header className={cn(isPage ? "mb-14 sm:mb-20" : "mb-10", align === "center" && "text-center", className)}>
      {label && (
        <SectionLabel className={isPage ? "mb-6 animate-fade-in" : "mb-3"}>
          <Scramble text={label} />
          {count !== undefined && (
            <span className="text-muted ml-2">({String(count).padStart(2, "0")})</span>
          )}
        </SectionLabel>
      )}
      <Heading
        className={cn(
          "font-display font-semibold text-fg",
          isPage
            ? "tracking-[-0.045em] leading-[0.92] text-[clamp(2.75rem,9vw,7rem)]"
            : "tracking-[-0.035em] leading-[1.05] text-3xl sm:text-5xl"
        )}
      >
        {isPage ? (
          <LineReveal
            lines={[
              <>
                {title}
                <span className="text-accent">.</span>
              </>,
            ]}
          />
        ) : (
          title
        )}
      </Heading>
      {subtitle && (
        <div
          className={cn(
            isPage && "mt-10 pt-6 border-t border-border animate-slide-up",
            !isPage && "mt-3"
          )}
        >
          <p
            className={cn(
              "text-muted max-w-2xl leading-relaxed",
              isPage && "text-base sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </div>
      )}
    </header>
  );
}
