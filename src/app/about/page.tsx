import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Code2, Lightbulb, MapPin, Target, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { profile, skillCategories } from "@/content/profile";
import { certifications, roles } from "@/content/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional background, skills, and engineering approach of Hassan El-Sherif, Cloud & Infrastructure Engineer.",
};

export default function AboutPage() {
  const currentRole = roles[0];
  const facts = [
    { Icon: Briefcase, label: "Currently", value: `${currentRole.title}, ${currentRole.company}` },
    { Icon: Target, label: "Looking for", value: `${profile.targetRole} roles` },
    { Icon: MapPin, label: "Based in", value: profile.location },
    {
      Icon: Award,
      label: "Certified",
      value: (
        <ul className="space-y-1">
          {certifications.map((c) => (
            <li key={c.name}>{c.name}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SectionHeading label="Background" title="About Hassan" subtitle={profile.experienceSummary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <section aria-labelledby="approach-heading">
            <h2 id="approach-heading" className="flex items-center gap-2 text-lg font-semibold text-fg mb-4">
              <Lightbulb className="w-5 h-5 text-accent" aria-hidden="true" />
              Engineering approach
            </h2>
            <p className="text-muted leading-relaxed">{profile.engineeringApproach}</p>
          </section>

          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="flex items-center gap-2 text-lg font-semibold text-fg mb-5">
              <Code2 className="w-5 h-5 text-accent" aria-hidden="true" />
              Skills & technologies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories.map((cat, i) => (
                <Reveal key={cat.label} delay={(i % 2) * 70}>
                  <Card className="h-full p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">{cat.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <Chip key={skill}>{skill}</Chip>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Quick facts</h2>
            <dl className="space-y-4">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="mt-0.5 w-8 h-8 shrink-0 flex items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="text-sm font-medium text-fg">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>
          <Link
            href="/experience"
            className="group flex items-center justify-between gap-3 p-4 rounded-card border border-border bg-surface hover:border-accent/50 transition-colors"
          >
            <span>
              <span className="block text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                Experience & credentials
              </span>
              <span className="block text-xs text-muted mt-0.5">Roles, education and certifications</span>
            </span>
            <ArrowRight
              className="w-4 h-4 text-accent shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </aside>
      </div>
    </div>
  );
}
