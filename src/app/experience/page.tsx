import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roles, certifications, education } from "@/content/experience";
import { Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Hassan El-Sherif at Shelter Technology — Cloud & Infrastructure Engineer, System Administrator, and IT Support Engineer.",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        label="Career"
        title="Professional Experience"
        subtitle="All experience at Shelter Technology. Dates and accomplishments sourced from verified CV."
      />

      {/* Timeline */}
      <section aria-labelledby="roles-heading" className="mb-16">
        <h2 id="roles-heading" className="sr-only">
          Employment history
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {roles.map((role, idx) => (
              <article
                key={`${role.title}-${role.startDate}`}
                className="sm:pl-12 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[10px] top-5 w-4 h-4 rounded-full border-2 hidden sm:block
                    border-[#2563EB] dark:border-[#3B82F6]
                    bg-white dark:bg-[#0B1120]"
                  aria-hidden="true"
                >
                  {role.current && (
                    <span className="absolute inset-0.5 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]" />
                  )}
                </div>

                <div className="p-6 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                          {role.title}
                        </h3>
                        {role.current && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#475569] dark:text-[#94A3B8]" aria-hidden="true" />
                        <p className="text-sm text-[#475569] dark:text-[#94A3B8]">{role.company}</p>
                      </div>
                    </div>
                    <time className="font-mono text-xs text-[#475569] dark:text-[#94A3B8] whitespace-nowrap">
                      {role.startDate} – {role.current ? "Present" : role.endDate}
                    </time>
                  </div>

                  {/* Accomplishments */}
                  <ul className="space-y-2" aria-label={`Accomplishments at ${role.title}`}>
                    {role.accomplishments.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle
                          className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section aria-labelledby="edu-heading">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
            <h2 id="edu-heading" className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
              Education
            </h2>
          </div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="p-5 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800"
              >
                <p className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">{edu.degree}</p>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">{edu.institution}</p>
                <p className="font-mono text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                  {edu.startYear} – {edu.endYear}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="certs-heading">
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
            <h2 id="certs-heading" className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
              Certifications
            </h2>
          </div>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-5 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800"
              >
                <p className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">{cert.name}</p>
                {cert.issuer && (
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">{cert.issuer}</p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <p className="font-mono text-xs text-[#2563EB] dark:text-[#3B82F6]">{cert.year}</p>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] underline transition-colors"
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
