import Link from "next/link";
import { Home, FolderOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">Error · Not found</p>
      <p
        className="font-display font-semibold tracking-[-0.06em] leading-none text-outline text-[clamp(7rem,30vw,16rem)] mb-6"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-fg mb-3">
        Page not found<span className="text-accent">.</span>
      </h1>
      <p className="text-muted mb-8 max-w-sm">
        This page doesn&apos;t exist or may have been moved. Try navigating back to the home or projects page.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className={buttonVariants()}
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          Home
        </Link>
        <Link
          href="/projects"
          className={buttonVariants({ variant: "secondary" })}
        >
          <FolderOpen className="w-4 h-4" aria-hidden="true" />
          Projects
        </Link>
      </div>
    </div>
  );
}
