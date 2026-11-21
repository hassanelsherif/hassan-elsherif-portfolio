import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { roles, certifications, education } from "@/content/experience";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Hassan El-Sherif at Shelter Technology — Cloud & Infrastructure Engineer, System Administrator, and IT Support Engineer.",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20">
      <SectionHeading
        label="Career"
        title="Experience"
        subtitle="Three roles at Shelter Technology, from IT support to managing AWS infrastructure for AI-powered computer vision applications."
      />

      {/* Roles: editorial rows, dates on the left, role in display type on the right */}
      <section aria-labelledby="roles-heading" className="mb-24">
        <SectionTitle n={1} label="Roles" id="roles-heading">
          Employment history
        </SectionTitle>

        <ol className="border-t border-border">
          {roles.map((role, idx) => (
            <li key={`${role.title}-${role.startDate}`} className="border-b border-border">
              <Reveal>
                <article className="grid gap-4 py-10 grid-cols-[minmax(0,1fr)] md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
                  <div className="flex md:flex-col items-baseline md:items-start gap-3">
                    <span className="font-mono text-xs text-muted">
                      {String(roles.length - idx).padStart(2, "0")}
                    </span>
                    <time className="font-mono text-sm text-fg whitespace-nowrap">
                      {role.startDate} – {role.current ? "Present" : role.endDate}
                    </time>
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.03em] leading-tight text-fg">
                      {role.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
                      {role.company}
                    </p>
                    <ul
                      className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8"
                      aria-label={`Accomplishments at ${role.title}`}
                    >
                      {role.accomplishments.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 text-sm text-muted leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-px before:bg-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Education + Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
        <section aria-labelledby="edu-heading">
          <SectionTitle n={2} label="Education" id="edu-heading">
            Education
          </SectionTitle>
          <ul className="border-t border-border">
            {education.map((edu) => (
              <li key={edu.degree} className="flex items-start gap-4 py-5 border-b border-border">
                {edu.logo && (
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-lg bg-white border border-border p-2">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold tracking-tight text-fg">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-muted mt-0.5">{edu.institution}</p>
                  <p className="font-mono text-xs text-muted mt-2">
                    {edu.startYear} – {edu.endYear}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="certs-heading">
          <SectionTitle n={3} label="Credentials" id="certs-heading">
            Certifications
          </SectionTitle>
          <ul className="border-t border-border">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-start gap-4 py-5 border-b border-border">
                {cert.badge && (
                  <Image
                    src={cert.badge}
                    alt={`${cert.name} badge`}
                    width={64}
                    height={64}
                    className="shrink-0 w-16 h-16 object-contain"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg font-semibold tracking-tight text-fg">
                    {cert.name}
                  </p>
                  {cert.issuer && <p className="text-sm text-muted mt-0.5">{cert.issuer}</p>}
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-mono text-xs text-accent">{cert.year}</p>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
                      >
                        Verify
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
