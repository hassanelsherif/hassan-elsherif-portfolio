import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Terminal,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LineReveal } from "@/components/ui/LineReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { CountUp } from "@/components/motion/CountUp";
import { TechMarquee } from "@/components/home/TechMarquee";
import { WorkIndex } from "@/components/home/WorkIndex";
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
  "AWS",
  "Terraform",
  "Linux",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "Bash",
  "Python",
  "Prometheus",
];

// One principle per lab, in project order — each step links to the lab that demonstrates it
const PRINCIPLES: Record<number, { verb: string; text: string }> = {
  1: {
    verb: "Codify",
    text: "Infrastructure lives in Terraform, plans are reviewed, re-plans show zero drift.",
  },
  2: {
    verb: "Automate",
    text: "Every change passes lint, tests and an image scan before it can ship.",
  },
  3: {
    verb: "Orchestrate",
    text: "Workloads roll out with probes, limits and self-healing by default.",
  },
  4: {
    verb: "Observe",
    text: "Metrics, dashboards and alerts tell me something broke before users do.",
  },
  5: { verb: "Recover", text: "Backups are only real once a timed restore has been verified." },
};

export default function HomePage() {
  const orderedProjects = [...projects].sort((a, b) => a.order - b.order);
  const currentRole = roles[0];
  const sinceYear = roles[roles.length - 1].startDate.split(" ").pop();
  const latestCert = certifications[0];

  return (
    <>
      {/* ── Hero: type-led, lines rise in ───────────────────────── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden -mt-16 pt-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-dot-grid" />
          <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-accent/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 lg:min-h-[calc(100svh-4rem)] flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <Link
                href="/about"
                className="shrink-0 rounded-full"
                aria-label={`About ${profile.name}`}
              >
                <Image
                  src={profile.photo}
                  alt=""
                  width={48}
                  height={48}
                  priority
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/60 ring-offset-2 ring-offset-bg"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/60 transition-colors"
              >
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                Open to {profile.targetRole} roles
              </Link>
            </div>
          </div>

          <Parallax speed={0.2} className="mt-12 sm:mt-16 lg:mt-auto">
          <h1
            id="hero-heading"
            aria-label={profile.name}
            className="font-display font-semibold text-fg tracking-[-0.045em] leading-[0.88] text-[clamp(3.5rem,14vw,11rem)]"
          >
            <LineReveal
              baseDelay={120}
              step={130}
              lines={[
                "Hassan",
                <>
                  El-Sherif<span className="text-accent">.</span>
                </>,
              ]}
            />
          </h1>
          </Parallax>

          <div className="mt-10 grid gap-8 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end border-t border-border pt-8">
            <div className="animate-slide-up">
              <p className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-accent">
                {profile.targetRole}
              </p>
              {/* Each group is unbreakable and carries its leading separator, so a wrap
                  never strands the icon or a dot at the end of a line */}
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                <span className="whitespace-nowrap">
                  <Terminal
                    className="inline w-3.5 h-3.5 mr-2 -mt-0.5 text-accent"
                    aria-hidden="true"
                  />
                  {currentRole.title}
                </span>{" "}
                <span className="whitespace-nowrap">
                  <span className="text-accent">·</span> {currentRole.company}
                </span>{" "}
                <span className="whitespace-nowrap">
                  <span className="text-accent">·</span> {profile.location}, since {sinceYear}
                </span>
              </p>
              <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                {profile.experienceSummary}
              </p>
            </div>

            <div className="animate-slide-up lg:justify-self-end">
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <Magnetic>
                  <Link href="/projects" className={buttonVariants({ size: "lg", className: "w-full" })}>
                    View projects
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/resume/Hassan-ElSherif-CV.pdf"
                    download
                    className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full" })}
                    aria-label="Download CV PDF"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download CV
                  </a>
                </Magnetic>
              </div>
              <div className="mt-5 flex items-center gap-5 lg:justify-end">
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
          </div>

          <a
            href="#profile"
            className="mt-10 hidden lg:inline-flex items-center gap-3 self-start font-mono text-[11px] uppercase tracking-widest text-muted hover:text-accent transition-colors"
          >
            <span className="relative block w-px h-10 bg-border overflow-hidden" aria-hidden="true">
              <span className="absolute inset-0 bg-accent animate-scroll-cue" />
            </span>
            Scroll to explore
          </a>
        </div>
      </section>

      <TechMarquee items={HIGHLIGHT_TECHS} />

      {/* ── 01 Profile: statement + live terminal ──────────────── */}
      <section
        id="profile"
        aria-labelledby="profile-heading"
        className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-6xl mx-auto"
      >
        <div className="mb-6">
          <SectionLabel n={1}>Profile</SectionLabel>
        </div>
        <div className="grid gap-12 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <h2
              id="profile-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-fg"
            >
              <ScrollWords text="I keep infrastructure boring. Codified, automated, observed and recoverable, with evidence for every claim." />
            </h2>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              More about me
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <TerminalCard />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-card border border-border bg-border">
            {[
              { value: "3+ years", label: "Cloud infrastructure & system administration" },
              {
                value: "AWS SA Associate",
                label: `${latestCert.issuer} certification, ${latestCert.year}`,
              },
              { value: `${projects.length} labs`, label: "Each with code, a runbook and evidence" },
              {
                value: currentRole.title,
                label: currentRole.company,
                href: "/experience",
                cta: "Full history",
              },
            ].map((stat) => (
              <div key={stat.value} className="bg-surface p-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="font-display text-lg font-semibold text-fg leading-snug">
                    <CountUp value={stat.value} />
                  </p>
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

      {/* ── 02 Selected work: editorial index ───────────────────── */}
      <section
        aria-labelledby="projects-heading"
        className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 max-w-6xl mx-auto"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="mb-4">
              <SectionLabel n={2}>Lab projects</SectionLabel>
            </div>
            <h2
              id="projects-heading"
              className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-none text-fg"
            >
              Selected work
              <sup className="ml-2 align-super font-mono text-base sm:text-lg font-normal tracking-normal text-muted">
                ({String(projects.length).padStart(2, "0")})
              </sup>
            </h2>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm text-accent hover:underline flex items-center gap-1"
          >
            Browse and filter all projects
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <Reveal>
          <WorkIndex projects={orderedProjects} />
        </Reveal>
      </section>

      {/* ── 03 How I work ───────────────────────────────────────── */}
      <section
        aria-labelledby="approach-heading"
        className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 max-w-6xl mx-auto"
      >
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="mb-4">
              <SectionLabel n={3}>Approach</SectionLabel>
            </div>
            <h2
              id="approach-heading"
              className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-none text-fg"
            >
              How I work
            </h2>
          </div>
          <p className="text-muted leading-relaxed max-w-md lg:justify-self-end">
            Each lab covers one step of the same loop. Click a step to see it done.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {orderedProjects.map((project, i) => {
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
                    <span className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                      {principle.verb}
                    </span>
                    <span className="mt-2 text-sm text-muted leading-relaxed">
                      {principle.text}
                    </span>
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

    </>
  );
}
