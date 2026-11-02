import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, CheckCircle, Terminal, ShieldCheck, BookOpen, Camera } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProjectBySlug, getAllProjectSlugs, getProjectDetails } from "@/content/projects";

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        All projects
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-[#475569] dark:text-[#94A3B8]">P0{project.order}</span>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-4">
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-[#E5E7EB] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          View repository
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </header>

      {/* Problem */}
      <section aria-labelledby="problem-heading" className="mb-10">
        <h2 id="problem-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-3">
          Problem
        </h2>
        <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">{project.problem}</p>
      </section>

      {/* Scope & approach */}
      <section aria-labelledby="scope-heading" className="mb-10">
        <h2 id="scope-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-3">
          Scope & approach
        </h2>
        <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">{project.description}</p>
      </section>

      {/* Architecture */}
      <section aria-labelledby="arch-heading" className="mb-10">
        <h2 id="arch-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-4">
          Architecture
        </h2>
        <pre className="overflow-x-auto rounded-md bg-gray-950 dark:bg-[#0B1120] border border-gray-800 p-5 text-xs font-mono text-green-400 leading-relaxed whitespace-pre">
          {details.architecture}
        </pre>
      </section>

      {/* Implementation */}
      <section aria-labelledby="impl-heading" className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
          <h2 id="impl-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
            Implementation
          </h2>
        </div>
        <div className="space-y-4">
          {details.implementation.map((step, i) => (
            <div key={i} className="rounded-md bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{step.title}</p>
              </div>
              <pre className="overflow-x-auto p-4 text-xs font-mono text-[#475569] dark:text-[#94A3B8] whitespace-pre">{step.code}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* Security & trade-offs */}
      <section aria-labelledby="security-heading" className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
          <h2 id="security-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
            Security & trade-offs
          </h2>
        </div>
        <ul className="space-y-2">
          {details.securityNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-[#475569] dark:text-[#94A3B8]">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Lessons learned */}
      <section aria-labelledby="lessons-heading" className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
          <h2 id="lessons-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
            Lessons learned
          </h2>
        </div>
        <ul className="space-y-2">
          {details.lessons.map((lesson, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="font-mono text-xs text-[#2563EB] dark:text-[#3B82F6] mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm text-[#475569] dark:text-[#94A3B8]">{lesson}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Evidence gallery — P04 only */}
      {project.slug === "observability-and-incident-response" && (
        <section aria-labelledby="evidence-heading" className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
            <h2 id="evidence-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
              Evidence gallery
            </h2>
          </div>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] mb-5">
            Real screenshots from a live failure simulation. Timestamps visible in Prometheus — 2026-11-02.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { src: "/images/p04/01-grafana-app-up.png", alt: "Grafana dashboard showing App Availability UP with request rate traffic visible", caption: "1 — App healthy: Grafana showing UP status and live request rate" },
              { src: "/images/p04/02-prometheus-appdown-pending.png", alt: "Prometheus alerts page showing AppDown alert in PENDING state", caption: "2 — AppDown alert PENDING after app container stopped" },
              { src: "/images/p04/03-grafana-app-down.png", alt: "Grafana dashboard showing App Availability DOWN in red with request rate dropping to zero", caption: "3 — Grafana showing DOWN — request rate drops to zero" },
              { src: "/images/p04/04-prometheus-resolved.png", alt: "Prometheus alerts page showing all alerts inactive after app recovery", caption: "4 — All alerts resolved after app container restarted" },
            ].map((img) => (
              <figure key={img.src} className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                />
                <figcaption className="px-3 py-2 text-xs text-[#475569] dark:text-[#94A3B8] bg-gray-50 dark:bg-gray-800/60">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-10">
        <h2 id="stack-heading" className="text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-4">
          Full stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-100 dark:bg-gray-800 text-[#475569] dark:text-[#94A3B8] border border-gray-200 dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
