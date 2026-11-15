"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

// A status filter was removed: every project is completed, so it never filtered anything.
// Add it back once there are in-progress or planned projects.

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
  const [techFilter, setTechFilter] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter(
      (p) => techFilter === "All" || p.technologies.some((t) => t.toLowerCase().includes(techFilter.toLowerCase()))
    );
  }, [projects, techFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        {/* Tech filter */}
        <div>
          <p className="text-xs font-medium text-muted mb-2 uppercase tracking-wide">
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
                    ? "bg-accent text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-muted hover:bg-gray-200 dark:hover:bg-gray-700"
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
      <p className="text-sm text-muted mb-6" aria-live="polite">
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
        <div className="text-center py-16 text-muted">
          <p className="text-lg font-medium mb-1">No projects use {techFilter} yet</p>
          <p className="text-sm">Try another technology.</p>
        </div>
      )}
    </div>
  );
}
