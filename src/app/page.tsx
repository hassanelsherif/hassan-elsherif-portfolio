import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TerminalCard } from "@/components/home/TerminalCard";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { certifications, roles } from "@/content/experience";
import { projectCode } from "@/lib/utils";

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

// One principle per lab, in project order — each step links to the lab that demonstrates it
const PRINCIPLES: Record<number, { verb: string; text: string }> = {
  1: { verb: "Codify", text: "Infrastructure lives in Terraform, plans are reviewed, re-plans show zero drift." },
  2: { verb: "Automate", text: "Every change passes lint, tests and an image scan before it can ship." },
  3: { verb: "Orchestrate", text: "Workloads roll out with probes, limits and self-healing by default." },
  4: { verb: "Observe", text: "Metrics, dashboards and alerts tell me something broke before users do." },
  5: { verb: "Recover", text: "Backups are only real once a timed restore has been verified." },
};

export default function HomePage() {
  // Only projects with evidence screenshots are featured on the home page
  const featuredProjects = projects.filter((p) => p.featured && p.coverImage).slice(0, 3);
  const currentRole = roles[0];
  const latestCert = certifications[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden -mt-16 pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-dot-grid" />
          <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-accent/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-24 grid gap-12 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
          <div className="max-w-3xl animate-fade-in">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mb-6 pl-2 pr-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/60 transition-colors"
            >
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              Open to {profile.targetRole} roles
            </Link>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-fg leading-[1.1]"
            >
              {profile.name}
            </h1>
            <p className="mt-3 text-xl sm:text-2xl font-medium text-accent">{profile.targetRole}</p>
            <p className="mt-2 flex items-center gap-2 font-mono text-xs text-muted">
              <Terminal className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              {currentRole.title} · {currentRole.company}
            </p>
            <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
              {profile.experienceSummary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
              {HIGHLIGHT_TECHS.map((t) => (
                <Badge key={t.label} label={t.label} variant={t.category} />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link href="/projects" className={buttonVariants({ size: "lg" })}>
                View projects
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="/resume/Hassan-ElSherif-CV.pdf"
                download
                className={buttonVariants({ variant: "secondary", size: "lg" })}
                aria-label="Download CV PDF"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download CV
              </a>
            </div>

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

      {/* ── At a glance ──────────────────────────────────────── */}
      <section aria-label="At a glance" className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-card border border-border bg-border">
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
        </Reveal>
      </section>

      {/* ── Featured projects ────────────────────────────────── */}
      <section
        aria-labelledby="projects-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-border"
      >
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">Lab projects</p>
            <h2 id="projects-heading" className="text-2xl sm:text-3xl font-bold text-fg">
              DevOps Portfolio
            </h2>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm text-accent hover:underline flex items-center gap-1"
          >
            All {projects.length} projects
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How I work ───────────────────────────────────────── */}
      <section
        aria-labelledby="approach-heading"
        className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-border"
      >
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">Approach</p>
          <h2 id="approach-heading" className="text-2xl sm:text-3xl font-bold text-fg">
            How I work
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            Each lab covers one step of the same loop. Click a step to see it done.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...projects]
            .sort((a, b) => a.order - b.order)
            .map((project, i) => {
              const principle = PRINCIPLES[project.order];
              if (!principle) return null;
              return (
                <li key={project.slug}>
                  <Reveal delay={i * 70} className="h-full">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group relative flex flex-col h-full p-5 rounded-card bg-surface border border-border hover:border-accent/50 transition-colors"
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                        <span className="text-border mx-1.5">/</span>
                        {projectCode(project.order)}
                      </span>
                      <span className="mt-3 text-lg font-semibold text-fg group-hover:text-accent transition-colors">
                        {principle.verb}
                      </span>
                      <span className="mt-2 text-sm text-muted leading-relaxed">{principle.text}</span>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                        {project.title}
                        <ArrowRight
                          className="w-3 h-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
        </ol>
      </section>

      {/* ── CTA strip ────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" className="px-4 sm:px-6 lg:px-8 pb-20 pt-4 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/5 p-8 sm:p-12 text-center">
            <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60" aria-hidden="true" />
            <div className="relative">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-fg mb-3">
                Available for new opportunities
              </h2>
              <p className="text-muted mb-8 max-w-xl mx-auto">
                Looking for mid-level Cloud / DevOps Engineer roles. Happy to discuss infrastructure,
                architecture, or operational challenges.
              </p>
              <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                <Mail className="w-4 h-4" aria-hidden="true" />
                Get in touch
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
