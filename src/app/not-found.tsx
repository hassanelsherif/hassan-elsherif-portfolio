import Link from "next/link";
import { Home, FolderOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="font-mono text-6xl font-bold text-accent mb-4">404</p>
      <h1 className="text-2xl font-semibold text-fg mb-3">Page not found</h1>
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
