"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectStatus } from "@/types";

const STATUS_OPTIONS: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
  { value: "planned", label: "Planned" },
];

const TECH_OPTIONS = [
  "All",
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

interface ProjectFilterProps {
  projects: Project[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [techFilter, setTechFilter] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const statusMatch = statusFilter === "all" || p.status === statusFilter;
      const techMatch =
        techFilter === "All" || p.technologies.some((t) => t.toLowerCase().includes(techFilter.toLowerCase()));
      return statusMatch && techMatch;
    });
  }, [projects, statusFilter, techFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Status filter */}
        <div>
          <p className="text-xs font-medium text-[#475569] dark:text-[#94A3B8] mb-2 uppercase tracking-wide">
            Status
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  statusFilter === opt.value
                    ? "bg-[#2563EB] dark:bg-[#3B82F6] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-[#475569] dark:text-[#94A3B8] hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-pressed={statusFilter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tech filter */}
        <div>
          <p className="text-xs font-medium text-[#475569] dark:text-[#94A3B8] mb-2 uppercase tracking-wide">
            Technology
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
            {TECH_OPTIONS.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setTechFilter(tech)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors duration-150 ${
                  techFilter === tech
                    ? "bg-[#2563EB] dark:bg-[#3B82F6] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-[#475569] dark:text-[#94A3B8] hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-pressed={techFilter === tech}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#475569] dark:text-[#94A3B8] mb-6" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[#475569] dark:text-[#94A3B8]">
          <p className="text-lg font-medium mb-1">No projects match these filters</p>
          <p className="text-sm">Try selecting different status or technology options.</p>
        </div>
      )}
    </div>
  );
}
