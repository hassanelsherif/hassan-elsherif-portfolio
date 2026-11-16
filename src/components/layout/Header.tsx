"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

/** "/" only matches itself; other sections also match their sub-pages (/projects/p01-…). */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on any navigation (including back/forward)
  useEffect(() => setMobileOpen(false), [pathname]);

  // Escape closes the menu; lock page scroll while it's open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Border + shadow only once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string, mobile = false) =>
    cn(
      "rounded-md text-sm font-medium transition-colors duration-150",
      mobile ? "block px-3 py-2.5 mb-1" : "px-3 py-2",
      isActive(pathname, href)
        ? "text-accent bg-accent/10"
        : "text-muted hover:text-fg hover:bg-subtle"
    );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-accent-fg focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur-md border-b transition-[background-color,border-color,box-shadow] duration-200",
          scrolled || mobileOpen
            ? "bg-bg/85 border-border shadow-sm shadow-black/5 dark:shadow-black/30"
            : "bg-bg/0 border-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-fg hover:text-accent transition-colors duration-150"
              aria-label="Hassan El-Sherif — home"
            >
              hassan@devops<span className="text-accent">:~$</span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/resume/Hassan-ElSherif-CV.pdf"
                download
                className={buttonVariants({ size: "sm", className: "ml-2 gap-1.5 font-medium" })}
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
                className="p-2 rounded-md text-muted hover:text-fg hover:bg-subtle transition-colors duration-150"
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
            className="md:hidden border-t border-border bg-bg px-4 pb-4 pt-2 animate-fade-in h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={linkClass(link.href, true)}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/resume/Hassan-ElSherif-CV.pdf"
              download
              onClick={() => setMobileOpen(false)}
              className={buttonVariants({ className: "mt-2 w-full" })}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download CV
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
