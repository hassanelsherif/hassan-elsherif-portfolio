"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/content/profile";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * Oversized closing line that ends every page. Hidden on /contact, where the
 * form already is the call to action.
 */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-60"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <SectionLabel className="mb-8">Next step</SectionLabel>
        <Reveal>
          <h2
            id="cta-heading"
            className="font-display font-semibold tracking-[-0.045em] leading-[0.92] text-fg text-[clamp(2.75rem,9vw,7.5rem)]"
          >
            Let&apos;s build something
            <span className="block text-outline">reliable.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 grid-cols-[minmax(0,1fr)] lg:grid-cols-2 lg:items-end">
          <p className="text-muted max-w-md leading-relaxed">
            Looking for mid-level {profile.targetRole} roles. Happy to discuss infrastructure,
            architecture, or operational challenges.
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:justify-self-end">
            <Magnetic strength={0.35}>
              <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                <Mail className="w-4 h-4" aria-hidden="true" />
                Get in touch
              </Link>
            </Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-fg hover:text-accent transition-colors break-all"
            >
              {profile.email}
              <ArrowUpRight
                className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
