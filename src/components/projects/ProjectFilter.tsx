"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

// A status filter was removed: every project is completed, so it never filtered anything.
// Add it back once there are in-progress or planned projects.

const TECH_OPTIONS = [
  "Terraform",
  "AWS",
  "GitHub Actions",
  "Docker",
  "Kubernetes",
  "Prometheus",
  "Grafana",
  "Bash",
  "Python",
];

const ALL = "All";

function matches(project: Project, tech: string) {
  return tech === ALL || project.technologies.some((t) => t.toLowerCase().includes(tech.toLowerCase()));
}

interface ProjectFilterProps {
  projects: Project[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [techFilter, setTechFilter] = useState(ALL);

  // Per-chip counts; chips that would match nothing are left out entirely
  const options = useMemo(
    () =>
      [ALL, ...TECH_OPTIONS]
        .map((tech) => ({ tech, count: projects.filter((p) => matches(p, tech)).length }))
        .filter((o) => o.count > 0),
    [projects]
  );

  const filtered = useMemo(() => projects.filter((p) => matches(p, techFilter)), [projects, techFilter]);

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs text-muted mb-3 uppercase tracking-widest">Filter by technology</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
          {options.map(({ tech, count }) => {
            const active = techFilter === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setTechFilter(tech)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border transition-colors duration-150",
                  active
                    ? "bg-accent text-accent-fg border-accent"
                    : "bg-transparent text-muted border-border hover:text-fg hover:border-accent/50"
                )}
                aria-pressed={active}
              >
                {tech}
                <span
                  className={cn(
                    "px-1.5 rounded-full text-[10px] tabular-nums",
                    active ? "bg-accent-fg/15" : "bg-subtle"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6 pb-4 border-b border-border" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
        {techFilter !== ALL && (
          <>
            {" "}using <span className="text-fg">{techFilter}</span> ·{" "}
            <button type="button" onClick={() => setTechFilter(ALL)} className="text-accent hover:underline">
              clear
            </button>
          </>
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
