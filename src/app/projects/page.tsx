import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Five DevOps lab projects by Hassan El-Sherif: AWS IaC, CI/CD pipeline, Kubernetes platform, observability stack, and disaster recovery. Each with architecture diagrams, runbooks, and evidence.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20">
      <SectionHeading
        label="Lab projects"
        count={projects.length}
        title="Selected work"
        subtitle="Five personal labs built from scratch. Each includes versioned infrastructure code, an architecture diagram, a runbook and screenshots from a real run. These are hands-on labs, not production work for an employer."
      />

      <ProjectFilter projects={projects} />
    </div>
  );
}
