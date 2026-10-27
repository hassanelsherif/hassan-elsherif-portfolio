import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, skillCategories } from "@/content/profile";
import { certifications, education } from "@/content/experience";
import { GraduationCap, Award, Code2, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional background, skills, certifications, and engineering approach of Hassan El-Sherif, Cloud & Infrastructure Engineer.",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading */}
      <SectionHeading
        label="Background"
        title="About Hassan"
        subtitle={profile.experienceSummary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Engineering approach */}
          <section aria-labelledby="approach-heading">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
              <h2 id="approach-heading" className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                Engineering approach
              </h2>
            </div>
            <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              {profile.engineeringApproach}
            </p>
          </section>

          {/* Skills */}
          <section aria-labelledby="skills-heading">
            <div className="flex items-center gap-2 mb-5">
              <Code2 className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
              <h2 id="skills-heading" className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                Skills & technologies
              </h2>
            </div>
            <div className="space-y-5">
              {skillCategories.map((cat) => (
                <div key={cat.label}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#475569] dark:text-[#94A3B8]">
                      {cat.label}
                    </p>
                    {"note" in cat && cat.note ? (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-normal">
                        — {cat.note}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-gray-100 dark:bg-gray-800 text-[#475569] dark:text-[#94A3B8] border border-gray-200 dark:border-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Education */}
          <section aria-labelledby="education-heading">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
              <h2 id="education-heading" className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                Education
              </h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="p-4 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{edu.degree}</p>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">{edu.institution}</p>
                  <p className="font-mono text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                    {edu.startYear} – {edu.endYear}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section aria-labelledby="certs-heading">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true" />
              <h2 id="certs-heading" className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                Certifications
              </h2>
            </div>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-4 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{cert.name}</p>
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
    </div>
  );
}
