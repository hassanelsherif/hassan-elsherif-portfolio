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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        label="Get in touch"
        title="Contact"
        subtitle="Open to mid-level Cloud / DevOps Engineer opportunities. Feel free to reach out about roles, architecture discussions, or anything infrastructure related."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Info column */}
        <aside className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-4">
              Direct contact
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-colors">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </div>
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-colors">
                  <Github className="w-4 h-4" aria-hidden="true" />
                </div>
                GitHub
              </a>
              <div className="flex items-center gap-3 text-sm text-[#475569] dark:text-[#94A3B8]">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                {profile.location}
              </div>
            </div>
          </div>

          {/* Privacy notice */}
          <div className="p-4 rounded-card bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              <strong className="text-[#0F172A] dark:text-[#E5E7EB]">Privacy:</strong> Form messages are
              processed via{" "}
              <a
                href="https://resend.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#2563EB] dark:hover:text-[#3B82F6]"
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
          <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
