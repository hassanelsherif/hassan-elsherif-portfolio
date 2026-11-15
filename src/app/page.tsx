import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TerminalCard } from "@/components/home/TerminalCard";
import { profile, skillCategories } from "@/content/profile";
import { projects } from "@/content/projects";
import { certifications, roles } from "@/content/experience";

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
  // Only projects with evidence screenshots are featured on the home page
  const featuredProjects = projects.filter((p) => p.featured && p.coverImage).slice(0, 3);
  const currentRole = roles[0];
  const latestCert = certifications[0];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-accent/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 grid gap-12 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="font-mono text-xs text-accent uppercase tracking-widest">
              {currentRole.title} · {currentRole.company}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-fg leading-tight"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-medium text-accent">
            {profile.targetRole}
          </p>
          <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            {profile.experienceSummary}
          </p>

          {/* Tech highlights */}
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
            {HIGHLIGHT_TECHS.map((t) => (
              <Badge key={t.label} label={t.label} variant={t.category} />
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-accent text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-150"
            >
              View projects
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="/resume/Hassan-ElSherif-CV.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-surface border border-gray-200 dark:border-gray-700 text-fg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              aria-label="Download CV PDF"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download CV
            </a>
          </div>

          {/* Verified social links */}
          <div className="mt-6 flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors duration-150"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors duration-150"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="animate-slide-up lg:pl-4">
          <TerminalCard />
        </div>
        </div>
      </section>

      {/* ── At a glance ─────────────────────────────────────── */}
      <section aria-label="At a glance" className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-card border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800">
          {[
            { value: "3+ years", label: "Cloud infrastructure & system administration" },
            { value: "AWS SA Associate", label: `${latestCert.issuer} certification, ${latestCert.year}` },
            { value: `${projects.length} labs`, label: "Each with code, a runbook and evidence" },
            { value: currentRole.title, label: currentRole.company, href: "/experience", cta: "Full history" },
          ].map((stat) => (
            <div key={stat.value} className="bg-surface p-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="text-lg font-bold text-fg leading-snug">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">
                  {stat.label}
                  {stat.href && (
                    <>
                      {" · "}
                      <Link href={stat.href} className="text-accent hover:underline">
                        {stat.cta}
                      </Link>
                    </>
                  )}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Featured projects ───────────────────────────────── */}
      <section
        aria-labelledby="projects-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">
              Lab projects
            </p>
            <h2 id="projects-heading" className="text-2xl font-bold text-fg">
              DevOps Portfolio
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline flex items-center gap-1"
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

      </section>

      {/* ── Skills snapshot ────────────────────────────────── */}
      <section
        aria-labelledby="skills-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-800"
      >
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">
            Technologies
          </p>
          <h2 id="skills-heading" className="text-2xl font-bold text-fg">
            Skills
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.label}
              className="p-4 rounded-card bg-surface border border-gray-200 dark:border-gray-800"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 text-muted border border-gray-200 dark:border-gray-700"
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
        <div className="rounded-card bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border border-accent/20 p-8 sm:p-12 text-center">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold text-fg mb-3"
          >
            Available for new opportunities
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Looking for mid-level Cloud / DevOps Engineer roles. Happy to discuss infrastructure,
            architecture, or operational challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold bg-accent text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-150"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
