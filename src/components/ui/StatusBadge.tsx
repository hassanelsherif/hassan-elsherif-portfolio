import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

const statusConfig: Record<ProjectStatus, { label: string; classes: string; dotClass: string }> = {
  completed: {
    label: "Completed",
    classes:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40",
    dotClass: "bg-emerald-500",
  },
  "in-progress": {
    label: "In Progress",
    classes:
      "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40",
    dotClass: "bg-blue-500 animate-pulse",
  },
  planned: {
    label: "Planned",
    classes:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
    dotClass: "bg-gray-400",
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
        config.classes
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)} aria-hidden="true" />
      {config.label}
    </span>
  );
}
