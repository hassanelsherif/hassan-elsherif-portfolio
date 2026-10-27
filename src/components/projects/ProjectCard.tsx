import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
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
        "group relative flex flex-col rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 hover:border-[#2563EB]/40 dark:hover:border-[#3B82F6]/40 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5",
        className
      )}
    >
      {/* Card header */}
      <div className="p-5 pb-0 flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-[#475569] dark:text-[#94A3B8] select-none">
          P0{project.order}
        </span>
        <StatusBadge status={project.status} />
      </div>

      {/* Title + problem */}
      <div className="p-5 flex-1">
        <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-2 group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors duration-150">
          {project.title}
        </h3>
        <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed line-clamp-3">
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
          className="inline-flex items-center gap-1 text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-150"
          aria-label={`View ${project.title} repository on GitHub`}
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          GitHub
        </a>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] dark:text-[#3B82F6] hover:gap-2 transition-all duration-150"
          aria-label={`View case study for ${project.title}`}
        >
          Case study
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
