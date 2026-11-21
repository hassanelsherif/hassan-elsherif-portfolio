"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectResults } from "@/content/projects";
import { projectCode } from "@/lib/utils";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { hasFinePointer, prefersReducedMotion } from "@/components/motion/motion";
import type { Project } from "@/types";

/**
 * Editorial index of the labs: one full-width row per project with the title in
 * display type. The whole row is the link; hover sweeps a tint in from the left.
 * On mouse devices a cover card trails the cursor while a row is hovered.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  // Ease the card toward the cursor every frame while it's showing
  useEffect(() => {
    if (!enabled || active === null) return;
    let frame = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (preview.current) {
        preview.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(2rem, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, active]);

  const onMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  const onEnter = (i: number) => (e: React.MouseEvent) => {
    // Start from the cursor so the card doesn't fly in from the corner
    if (active === null) pos.current = { x: e.clientX, y: e.clientY };
    target.current = { x: e.clientX, y: e.clientY };
    setActive(i);
  };

  return (
    <div onMouseMove={enabled ? onMove : undefined} onMouseLeave={() => setActive(null)}>
      <ol className="border-t border-border">
        {projects.map((project, i) => {
          const headline = projectResults[project.slug]?.items[0];
          return (
            <li key={project.slug} className="border-b border-border">
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={enabled ? onEnter(i) : undefined}
                className="group relative isolate grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 sm:gap-x-8 gap-y-2 py-6 sm:py-8 px-1 sm:px-3 overflow-hidden"
              >
                <span
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent/[0.07] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-muted self-start pt-2 sm:pt-3">
                  {projectCode(project.order)}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-fg leading-[1.05] transition-[color,transform] duration-300 group-hover:text-accent group-hover:translate-x-1.5">
                    {project.title}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                    {project.techCategories.slice(0, 4).map((t, j) => (
                      <span key={t.label}>
                        {j > 0 && (
                          <span className="text-border mr-3" aria-hidden="true">
                            /
                          </span>
                        )}
                        {t.label}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="flex items-center gap-4 sm:gap-6">
                  {headline && (
                    <span className="hidden md:block text-right">
                      <span className="block font-mono text-lg font-bold text-fg">{headline.value}</span>
                      <span className="block text-xs text-muted max-w-[14rem] truncate">
                        {headline.label}
                      </span>
                    </span>
                  )}
                  <span
                    className="flex w-11 h-11 sm:w-14 sm:h-14 items-center justify-center rounded-full border border-border text-fg transition-colors duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-fg"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Cursor-following preview: purely decorative, never intercepts the pointer */}
      {enabled && (
        <div
          ref={preview}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
          aria-hidden="true"
        >
          <div
            className={`w-64 origin-left overflow-hidden rounded-card border border-border bg-surface shadow-2xl shadow-black/40 transition-[opacity,transform] duration-300 ease-out ${
              active === null ? "opacity-0 scale-75 -rotate-3" : "opacity-100 scale-100 rotate-0"
            }`}
          >
            {/* Stack every cover and slide the active one into view */}
            <div className="relative h-40 overflow-hidden">
              <div
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(-${(active ?? 0) * 10}rem)` }}
              >
                {projects.map((p) => (
                  <ProjectCover key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
