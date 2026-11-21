import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { FooterCta } from "@/components/layout/FooterCta";

const currentYear = new Date().getFullYear();

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: profile.github, label: "GitHub profile", Icon: Github, external: true },
  { href: profile.linkedin, label: "LinkedIn profile", Icon: Linkedin, external: true },
  { href: `mailto:${profile.email}`, label: "Send email", Icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="bg-bg mt-auto">
      <FooterCta />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {currentYear} {profile.name}
          </p>

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-accent transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href="#main-content"
              className="mr-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors duration-150"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            {socials.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="p-2 rounded-md text-muted hover:text-fg hover:bg-subtle transition-colors duration-150"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
