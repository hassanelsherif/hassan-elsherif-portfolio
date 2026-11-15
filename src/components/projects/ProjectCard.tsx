import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card bg-surface border border-gray-200 dark:border-gray-800 hover:border-accent/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/10",
        className
      )}
    >
      {/* Cover: real evidence screenshot, or a styled placeholder */}
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block h-40 overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-[#0A0F1C]"
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-left-top opacity-90 transition-transform duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/30 via-[#0A0F1C] to-violet-500/20">
            <Boxes className="w-12 h-12 text-accent/80" />
          </div>
        )}
      </Link>

      {/* Card header */}
      <div className="p-5 pb-0 flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-muted select-none">
          P0{project.order}
        </span>
        <StatusBadge status={project.status} />
      </div>

      {/* Title + problem */}
      <div className="p-5 flex-1">
        <h3 className="text-base font-semibold text-fg mb-2 group-hover:text-accent transition-colors duration-150">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {project.problem}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.techCategories.map((t) => (
            <Badge key={t.label} label={t.label} variant={t.category} />
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 pb-5 flex items-center justify-between">
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors duration-150"
          aria-label={`View ${project.title} repository on GitHub`}
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          GitHub
        </a>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:gap-2 transition-all duration-150"
          aria-label={`View case study for ${project.title}`}
        >
          Case study
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
