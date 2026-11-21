import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, MapPin, Target, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionTitle } from "@/components/ui/SectionLabel";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20">
      <SectionHeading label="About" title="About Hassan" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-20">
          {/* Story replaces the summary subtitle, which repeated the home page word for word */}
          <section aria-labelledby="story-heading">
            <SectionTitle n={1} label="Story" id="story-heading">
              From the support desk to AWS
            </SectionTitle>
            <div className="space-y-5">
              {profile.story.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-xl sm:text-2xl font-medium tracking-tight text-fg leading-snug"
                      : "text-muted leading-relaxed"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="approach-heading">
            <SectionTitle n={2} label="Approach" id="approach-heading">
              Engineering approach
            </SectionTitle>
            <p className="text-muted leading-relaxed border-l-2 border-accent pl-5">
              {profile.engineeringApproach}
            </p>
          </section>

          <section aria-labelledby="skills-heading">
            <SectionTitle n={3} label="Toolkit" id="skills-heading">
              Skills & technologies
            </SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories.map((cat, i) => (
                <Reveal key={cat.label} delay={(i % 2) * 70}>
                  <Card className="h-full p-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
                      <span className="text-accent mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {cat.label}
                    </p>
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
          <Card className="p-0 overflow-hidden">
            <div className="relative aspect-square bg-[#0A0F1C]">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 60vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 text-white">
                <span className="block font-display text-xl font-semibold tracking-tight">{profile.name}</span>
                <span className="block text-sm text-white/80">{profile.targetRole}</span>
              </p>
            </div>
          </Card>
          <Card>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
              Quick facts
            </h2>
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
              <span className="block text-xs text-muted mt-0.5">
                Roles, education and certifications
              </span>
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
