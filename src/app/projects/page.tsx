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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        label="Lab projects"
        title="DevOps Portfolio"
        subtitle="Five independently verifiable projects built from scratch. Each includes an architecture diagram, versioned infrastructure code, runbook, and evidence gallery. Projects labeled as personal labs; not production employment claims."
      />

      <ProjectFilter projects={projects} />
    </div>
  );
}
