import Link from "next/link";
import { Home, FolderOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="font-mono text-6xl font-bold text-[#2563EB] dark:text-[#3B82F6] mb-4">404</p>
      <h1 className="text-2xl font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-3">Page not found</h1>
      <p className="text-[#475569] dark:text-[#94A3B8] mb-8 max-w-sm">
        This page doesn&apos;t exist or may have been moved. Try navigating back to the home or projects page.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-[#E5E7EB] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FolderOpen className="w-4 h-4" aria-hidden="true" />
          Projects
        </Link>
      </div>
    </div>
  );
}
