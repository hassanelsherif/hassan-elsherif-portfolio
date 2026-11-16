import {
  Activity,
  Boxes,
  DatabaseBackup,
  FileCode2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { projectResults } from "@/content/projects";
import { projectCode } from "@/lib/utils";
import type { Project } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  "aws-infrastructure-as-code": FileCode2,
  "secure-cicd-pipeline": ShieldCheck,
  "kubernetes-application-platform": Boxes,
  "observability-and-incident-response": Activity,
  "aws-backup-and-disaster-recovery": DatabaseBackup,
};

/**
 * Designed card cover: project icon + the headline result in large type.
 * Replaces scaled-down screenshots, which turned into unreadable text at card size.
 * The real screenshots stay on the case-study page as evidence.
 */
export function ProjectCover({ project }: { project: Project }) {
  const Icon = ICONS[project.slug] ?? Boxes;
  const headline = projectResults[project.slug]?.items[0];

  return (
    <div className="relative h-40 overflow-hidden border-b border-border bg-subtle" aria-hidden="true">
      {/* Tinted wash + dot grid + oversized faint icon for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
      <div className="absolute inset-0 bg-dot-grid opacity-70" />
      <Icon
        className="absolute -right-6 -bottom-8 w-44 h-44 text-accent/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
        strokeWidth={1.25}
      />

      <div className="relative h-full p-5 flex flex-col justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent text-accent-fg shadow-sm shadow-accent/30">
            <Icon className="w-5 h-5" />
          </span>
          <span className="font-mono text-xs font-semibold text-muted">{projectCode(project.order)}</span>
        </div>

        {headline && (
          <div className="min-w-0">
            <p className="font-mono text-2xl font-bold text-fg leading-tight truncate">{headline.value}</p>
            <p className="mt-0.5 text-xs text-muted truncate">{headline.label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
