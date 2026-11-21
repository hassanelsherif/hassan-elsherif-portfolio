import { Asterisk } from "lucide-react";

/**
 * Endless ticker of the stack. The list is rendered twice and the track slides by
 * half its width, so the loop is seamless. Screen readers get the list once.
 */
export function TechMarquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 sm:px-8 font-display text-2xl sm:text-4xl font-medium tracking-tight text-fg/80 whitespace-nowrap">
            {item}
          </span>
          <Asterisk className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="group relative overflow-hidden border-y border-border py-5 sm:py-7 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      aria-label="Core technologies"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
