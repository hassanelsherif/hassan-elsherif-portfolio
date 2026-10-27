"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / name */}
          <Link
            href="/"
            className="font-mono text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB] hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-150"
            aria-label="Hassan El-Sherif — home"
          >
            hassan@devops:~$
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  pathname === link.href
                    ? "text-[#2563EB] dark:text-[#3B82F6] bg-blue-50 dark:bg-blue-950/40"
                    : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-gray-800/60"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/resume/Hassan-ElSherif-CV.pdf"
              download
              className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-150"
              aria-label="Download CV PDF"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              CV
            </a>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-md text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-[#F8FAFC] dark:bg-[#0B1120] px-4 pb-4 pt-2 animate-fade-in"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 mb-1",
                pathname === link.href
                  ? "text-[#2563EB] dark:text-[#3B82F6] bg-blue-50 dark:bg-blue-950/40"
                  : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#E5E7EB] hover:bg-gray-100 dark:hover:bg-gray-800/60"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume/Hassan-ElSherif-CV.pdf"
            download
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center gap-1.5 px-3 py-2.5 rounded-md text-sm font-medium bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-150"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
