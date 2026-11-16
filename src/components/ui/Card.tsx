import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "section" | "li";
}) {
  return <Tag className={cn("rounded-card bg-surface border border-border p-5", className)}>{children}</Tag>;
}
