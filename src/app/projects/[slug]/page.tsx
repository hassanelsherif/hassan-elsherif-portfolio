import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Github,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { buttonVariants } from "@/components/ui/Button";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { CodeBlock } from "@/components/case-study/CodeBlock";
import { EvidenceGallery } from "@/components/case-study/EvidenceGallery";
import { TableOfContents, type TocItem } from "@/components/case-study/TableOfContents";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectDetails,
  projectResults,
  projects,
} from "@/content/projects";
import { evidence } from "@/content/evidence";
import { architectureDiagrams } from "@/content/architecture";
import { projectCode } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { LineReveal } from "@/components/ui/LineReveal";
import { CountUp } from "@/components/motion/CountUp";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.problem,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const details = getProjectDetails(params.slug);
  const gallery = evidence[project.slug];
  const results = projectResults[project.slug];
  const diagram = architectureDiagrams[project.slug];

  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const pos = ordered.findIndex((p) => p.slug === project.slug);
  const prev = pos > 0 ? ordered[pos - 1] : undefined;
  const next = pos < ordered.length - 1 ? ordered[pos + 1] : undefined;

  const toc: TocItem[] = [
    { id: "problem", label: "Problem" },
    { id: "architecture", label: "Architecture" },
    { id: "implementation", label: "Implementation" },
    { id: "security", label: "Security & trade-offs" },
    { id: "lessons", label: "Lessons learned" },
    ...(gallery ? [{ id: "evidence", label: "Evidence" }] : []),
    { id: "stack", label: "Full stack" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        All projects
      </Link>

      {/* Header */}
      <header className="mb-14">
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Case study <span className="text-muted mx-1">—</span> {projectCode(project.order)}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="font-display font-semibold tracking-[-0.045em] leading-[0.95] text-fg text-[clamp(2.5rem,7vw,5.5rem)] max-w-5xl">
          <LineReveal
            lines={[
              <>
                {project.title}
                <span className="text-accent">.</span>
              </>,
            ]}
          />
        </h1>
        <div className="mt-10 pt-6 border-t border-border animate-slide-up">
        <p className="text-lg text-muted leading-relaxed mb-6 max-w-3xl">{project.problem}</p>
        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies">
          {project.techCategories.map((t) => (
            <Badge key={t.label} label={t.label} variant={t.category} />
          ))}
        </div>
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary" })}
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          View repository
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
        </div>
      </header>

      {/* Results strip */}
      {results && (
        <section aria-label="Results" className="mb-12">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-card border border-border bg-border">
            {results.items.map((r) => (
              <div key={r.label} className="bg-surface p-5">
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <p className="font-display text-3xl font-semibold tracking-tight text-accent break-words">
                    <CountUp value={r.value} />
                  </p>
                  <p className="mt-1 text-sm text-muted">{r.label}</p>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">{results.source}</p>
        </section>
      )}

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_200px]">
        <div className="min-w-0 space-y-16">
          <section aria-labelledby="problem">
            <SectionTitle n={1} id="problem">Problem & approach</SectionTitle>
            <p className="text-muted leading-relaxed">{project.description}</p>
          </section>

          <section aria-labelledby="architecture">
            <SectionTitle n={2} id="architecture">
              Architecture
            </SectionTitle>
            {diagram ? (
              <>
                <ArchitectureDiagram id={`arch-${project.slug}`} diagram={diagram} />
                <p className="mt-2 text-xs text-muted sm:hidden">Scroll sideways to see the full diagram.</p>
                <details className="group mt-3">
                  <summary className="cursor-pointer select-none text-xs text-muted hover:text-accent transition-colors">
                    View as text
                  </summary>
                  <pre className="mt-3 overflow-x-auto rounded-card border border-slate-700/60 bg-[#0A0F1C] p-5 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre">
                    {details.architecture}
                  </pre>
                </details>
              </>
            ) : (
              <pre className="overflow-x-auto rounded-card border border-slate-700/60 bg-[#0A0F1C] p-5 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre">
                {details.architecture}
              </pre>
            )}
          </section>

          <section aria-labelledby="implementation">
            <SectionTitle n={3} id="implementation">
              Implementation
            </SectionTitle>
            <div className="space-y-4">
              {details.implementation.map((step) => (
                <CodeBlock key={step.title} title={step.title} code={step.code} />
              ))}
            </div>
          </section>

          <section aria-labelledby="security">
            <SectionTitle n={4} id="security">
              Security & trade-offs
            </SectionTitle>
            <ul className="space-y-3">
              {details.securityNotes.map((note) => (
                <li key={note} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-muted leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="lessons">
            <SectionTitle n={5} id="lessons">
              Lessons learned
            </SectionTitle>
            <ol className="space-y-3">
              {details.lessons.map((lesson, i) => (
                <li key={lesson} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-accent mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted leading-relaxed">{lesson}</span>
                </li>
              ))}
            </ol>
          </section>

          {gallery && (
            <section aria-labelledby="evidence">
              <SectionTitle n={6} id="evidence">
                Evidence gallery
              </SectionTitle>
              <p className="text-sm text-muted mb-6">{gallery.intro}</p>
              <EvidenceGallery images={gallery.images} />
            </section>
          )}

          <section aria-labelledby="stack">
            <SectionTitle n={gallery ? 7 : 6} id="stack">Full stack</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>

      {/* Prev / next */}
      <nav aria-label="More projects" className="mt-24 grid gap-x-10 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group py-6 sm:py-8 border-t border-border"
          >
            <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted">
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              Previous · {projectCode(prev.order)}
            </span>
            <span className="mt-3 block font-display text-2xl sm:text-4xl font-semibold tracking-[-0.03em] leading-tight text-fg group-hover:text-accent transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group py-6 sm:py-8 border-t border-border sm:text-right"
          >
            <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted sm:justify-end">
              Next · {projectCode(next.order)}
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="mt-3 block font-display text-2xl sm:text-4xl font-semibold tracking-[-0.03em] leading-tight text-fg group-hover:text-accent transition-colors">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}
