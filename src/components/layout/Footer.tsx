import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-[#F8FAFC] dark:bg-[#0B1120] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: copyright */}
          <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          {/* Center: nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/experience", label: "Experience" },
              { href: "/projects", label: "Projects" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#475569] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: social links */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded-md text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded-md text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="p-2 rounded-md text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Privacy notice */}
        <p className="mt-4 text-xs text-center text-[#475569] dark:text-[#94A3B8]">
          Contact form messages are processed by{" "}
          <a
            href="https://resend.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#2563EB] dark:hover:text-[#3B82F6]"
          >
            Resend
          </a>
          . No messages are stored in a database. No tracking cookies are used.
        </p>
      </div>
    </footer>
  );
}
