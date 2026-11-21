import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { ProjectCover } from "@/components/projects/ProjectCover";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * The title link is stretched over the whole card (after:inset-0), so the entire
 * card is one click target with one accessible name. The GitHub link sits above it (z-10).
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col h-full overflow-hidden rounded-card bg-surface border border-border transition-all duration-200",
        "hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/10",
        "focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/30",
        className
      )}
    >
      <ProjectCover project={project} />

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <StatusBadge status={project.status} />
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight leading-snug text-fg mb-2 group-hover:text-accent transition-colors duration-150">
          <Link
            href={`/projects/${project.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">{project.problem}</p>

        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.techCategories.map((t) => (
            <Badge key={t.label} label={t.label} variant={t.category} />
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-150"
            aria-label={`View ${project.title} repository on GitHub`}
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
            Source
          </a>
          <span
            className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-[gap] duration-150 group-hover:gap-2"
            aria-hidden="true"
          >
            Case study
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </article>
  );
}
