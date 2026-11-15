import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, CheckCircle, Terminal, ShieldCheck, BookOpen, Camera } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProjectBySlug, getAllProjectSlugs, getProjectDetails } from "@/content/projects";
import { evidence } from "@/content/evidence";
import { projectCode } from "@/lib/utils";

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        All projects
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-muted">{projectCode(project.order)}</span>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies">
          {project.techCategories.map((t) => (
            <Badge key={t.label} label={t.label} variant={t.category} />
          ))}
        </div>
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-surface border border-gray-200 dark:border-gray-700 text-fg hover:border-accent transition-colors"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          View repository
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </header>

      {/* Problem */}
      <section aria-labelledby="problem-heading" className="mb-10">
        <h2 id="problem-heading" className="text-xl font-semibold text-fg mb-3">
          Problem
        </h2>
        <p className="text-muted leading-relaxed">{project.problem}</p>
      </section>

      {/* Scope & approach */}
      <section aria-labelledby="scope-heading" className="mb-10">
        <h2 id="scope-heading" className="text-xl font-semibold text-fg mb-3">
          Scope & approach
        </h2>
        <p className="text-muted leading-relaxed">{project.description}</p>
      </section>

      {/* Architecture */}
      <section aria-labelledby="arch-heading" className="mb-10">
        <h2 id="arch-heading" className="text-xl font-semibold text-fg mb-4">
          Architecture
        </h2>
        <pre className="overflow-x-auto rounded-md bg-gray-950 dark:bg-[#0B1120] border border-gray-800 p-5 text-xs font-mono text-green-400 leading-relaxed whitespace-pre">
          {details.architecture}
        </pre>
      </section>

      {/* Implementation */}
      <section aria-labelledby="impl-heading" className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 id="impl-heading" className="text-xl font-semibold text-fg">
            Implementation
          </h2>
        </div>
        <div className="space-y-4">
          {details.implementation.map((step, i) => (
            <div key={i} className="rounded-md bg-surface border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-fg">{step.title}</p>
              </div>
              <pre className="overflow-x-auto p-4 text-xs font-mono text-muted whitespace-pre">{step.code}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* Security & trade-offs */}
      <section aria-labelledby="security-heading" className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 id="security-heading" className="text-xl font-semibold text-fg">
            Security & trade-offs
          </h2>
        </div>
        <ul className="space-y-2">
          {details.securityNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-muted">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Lessons learned */}
      <section aria-labelledby="lessons-heading" className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 id="lessons-heading" className="text-xl font-semibold text-fg">
            Lessons learned
          </h2>
        </div>
        <ul className="space-y-2">
          {details.lessons.map((lesson, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="font-mono text-xs text-accent mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm text-muted">{lesson}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Evidence gallery: screenshots at their real aspect ratio; click to open full size */}
      {gallery && (
        <section aria-labelledby="evidence-heading" className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-accent" aria-hidden="true" />
            <h2 id="evidence-heading" className="text-xl font-semibold text-fg">
              Evidence gallery
            </h2>
          </div>
          <p className="text-sm text-muted mb-6">{gallery.intro}</p>
          <div className="space-y-8">
            {gallery.images.map((img, i) => (
              <figure key={img.src}>
                <a
                  href={img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open full-size screenshot: ${img.caption}`}
                  className="group inline-block max-w-full align-top rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#0A0F1C] hover:border-accent/60 transition-colors"
                >
                  {/* Never upscale: small terminal captures stay at their natural size */}
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes={`(min-width: 896px) ${Math.min(img.width, 832)}px, 100vw`}
                    style={{ width: img.width, maxWidth: "100%", height: "auto" }}
                  />
                </a>
                <figcaption className="mt-2 text-xs text-muted">
                  <span className="font-mono text-accent mr-2">Fig. {i + 1}</span>
                  {img.caption}
                  <span className="ml-2 opacity-70">· click to enlarge</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-10">
        <h2 id="stack-heading" className="text-xl font-semibold text-fg mb-4">
          Full stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-100 dark:bg-gray-800 text-muted border border-gray-200 dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
