import type { Metadata } from "next";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hassan El-Sherif — Cloud & Infrastructure Engineer based in Cairo, Egypt.",
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SectionHeading
        label="Get in touch"
        title="Contact"
        subtitle="Open to mid-level Cloud / DevOps Engineer opportunities. Feel free to reach out about roles, architecture discussions, or anything infrastructure related."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Info column */}
        <aside className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-fg mb-4">
              Direct contact
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-subtle text-accent group-hover:bg-accent/10 transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-subtle text-accent group-hover:bg-accent/10 transition-colors">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </div>
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-subtle text-accent group-hover:bg-accent/10 transition-colors">
                  <Github className="w-4 h-4" aria-hidden="true" />
                </div>
                GitHub
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-subtle text-accent">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                {profile.location}
              </div>
            </div>
          </div>

          {/* Privacy notice */}
          <div className="p-4 rounded-card bg-subtle/60 border border-border">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-fg">Privacy:</strong> Form messages are
              processed via{" "}
              <a
                href="https://resend.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                Resend
              </a>{" "}
              and delivered to my inbox. Messages are not stored in a database. No tracking cookies are used on
              this site.
            </p>
          </div>
        </aside>

        {/* Form column */}
        <div className="lg:col-span-3">
          <div className="p-6 sm:p-8 rounded-card bg-surface border border-border shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
