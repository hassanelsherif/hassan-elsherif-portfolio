import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { profile, skillCategories } from "@/content/profile";
import { projects } from "@/content/projects";
import { roles } from "@/content/experience";

export const metadata: Metadata = {
  title: "Hassan El-Sherif | Cloud & DevOps Engineer",
  description:
    "Cloud & Infrastructure Engineer with 3+ years in AWS, Linux, and enterprise infrastructure. Five DevOps lab projects with architecture diagrams, runbooks, and evidence.",
};

const HIGHLIGHT_TECHS = [
  { label: "AWS", category: "cloud" as const },
  { label: "Terraform", category: "devops" as const },
  { label: "Linux", category: "infra" as const },
  { label: "Docker", category: "devops" as const },
  { label: "Kubernetes", category: "devops" as const },
  { label: "GitHub Actions", category: "devops" as const },
  { label: "Bash", category: "scripting" as const },
  { label: "Python", category: "scripting" as const },
  { label: "Prometheus", category: "monitoring" as const },
];

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const currentRole = roles[0];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24 max-w-6xl mx-auto"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/5 dark:bg-[#3B82F6]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
            <span className="font-mono text-xs text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-widest">
              {currentRole.title} · {currentRole.company}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] dark:text-[#E5E7EB] leading-tight"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-medium text-[#2563EB] dark:text-[#3B82F6]">
            {profile.targetRole}
          </p>
          <p className="mt-5 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-2xl">
            {profile.experienceSummary}
          </p>

          {/* Tech highlights */}
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
            {HIGHLIGHT_TECHS.map((t) => (
              <Badge key={t.label} label={t.label} variant={t.category} />
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-150"
            >
              View projects
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="/resume/Hassan-ElSherif-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-[#E5E7EB] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              aria-label="Download CV PDF"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download CV
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-[#E5E7EB] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact
            </Link>
          </div>

          {/* Verified social links */}
          <div className="mt-6 flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center gap-1.5 text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-150"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center gap-1.5 text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-150"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Experience preview ──────────────────────────────── */}
      <section
        aria-labelledby="experience-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1">
              Career
            </p>
            <h2 id="experience-heading" className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
              Experience
            </h2>
          </div>
          <Link
            href="/experience"
            className="text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1"
          >
            Full history
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={`${role.title}-${role.startDate}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800"
            >
              <div>
                <p className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">{role.title}</p>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8]">{role.company}</p>
              </div>
              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                {role.current && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
                    Current
                  </span>
                )}
                <span className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
                  {role.startDate} – {role.current ? "Present" : role.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured projects ───────────────────────────────── */}
      <section
        aria-labelledby="projects-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1">
              Lab projects
            </p>
            <h2 id="projects-heading" className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
              DevOps Portfolio
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1"
          >
            All 5 projects
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-[#E5E7EB] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
          >
            View all 5 projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Skills snapshot ────────────────────────────────── */}
      <section
        aria-labelledby="skills-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800"
      >
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1">
            Technologies
          </p>
          <h2 id="skills-heading" className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
            Skills
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.label}
              className="p-4 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#475569] dark:text-[#94A3B8] mb-3">
                {cat.label}
                {"note" in cat && cat.note ? (
                  <span className="ml-1.5 font-normal normal-case text-[10px] text-amber-600 dark:text-amber-400">
                    ({cat.note})
                  </span>
                ) : null}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 text-[#475569] dark:text-[#94A3B8] border border-gray-200 dark:border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ──────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800"
      >
        <div className="rounded-card bg-gradient-to-br from-[#1D4ED8]/10 to-[#3B82F6]/5 dark:from-[#1D4ED8]/20 dark:to-[#3B82F6]/10 border border-[#2563EB]/20 dark:border-[#3B82F6]/20 p-8 sm:p-12 text-center">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-3"
          >
            Available for new opportunities
          </h2>
          <p className="text-[#475569] dark:text-[#94A3B8] mb-8 max-w-xl mx-auto">
            Looking for mid-level Cloud / DevOps Engineer roles. Happy to discuss infrastructure,
            architecture, or operational challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-150"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Get in touch
            </Link>
            <a
              href="/resume/Hassan-ElSherif-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-[#E5E7EB] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
