import {
  AppWindow,
  Archive,
  Ban,
  Bell,
  Box,
  CheckCircle2,
  Clock,
  Cpu,
  FlaskConical,
  FolderOpen,
  Gauge,
  GitBranch,
  Globe,
  KeyRound,
  LineChart,
  Lock,
  Network,
  Package,
  Rocket,
  Route,
  Router,
  ScanSearch,
  ScrollText,
  Server,
  Settings,
  Split,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Diagram, DiagramTone } from "@/content/architecture";

const ICONS: Record<string, LucideIcon> = {
  app: AppWindow,
  archive: Archive,
  ban: Ban,
  bell: Bell,
  box: Box,
  check: CheckCircle2,
  chart: LineChart,
  clock: Clock,
  cpu: Cpu,
  flask: FlaskConical,
  folder: FolderOpen,
  gauge: Gauge,
  gitBranch: GitBranch,
  globe: Globe,
  key: KeyRound,
  lock: Lock,
  network: Network,
  package: Package,
  rocket: Rocket,
  route: Route,
  router: Router,
  scan: ScanSearch,
  scroll: ScrollText,
  server: Server,
  settings: Settings,
  split: Split,
  undo: Undo2,
};

// Node geometry: title row, then 16px per detail line
const TITLE_Y = 26;
const LINE0_Y = 46;
const LINE_H = 16;
export const nodeHeight = (lines = 0) => (lines ? LINE0_Y + (lines - 1) * LINE_H + 14 : 44);

const nodeTone: Record<DiagramTone, { rect: string; title: string; icon: string }> = {
  default: { rect: "fill-surface stroke-border", title: "fill-fg", icon: "text-accent" },
  accent: { rect: "fill-surface stroke-accent", title: "fill-fg", icon: "text-accent" },
  danger: {
    rect: "fill-red-500/[0.06] stroke-red-500/50",
    title: "fill-red-700 dark:fill-red-300",
    icon: "text-red-500",
  },
  warn: {
    rect: "fill-amber-500/[0.06] stroke-amber-500/50",
    title: "fill-amber-800 dark:fill-amber-200",
    icon: "text-amber-500",
  },
  ok: {
    rect: "fill-emerald-500/[0.06] stroke-emerald-500/50",
    title: "fill-emerald-800 dark:fill-emerald-200",
    icon: "text-emerald-500",
  },
  muted: { rect: "fill-transparent stroke-muted/50", title: "fill-muted", icon: "text-muted" },
};

const edgeTone: Record<"default" | "accent" | "danger", string> = {
  default: "stroke-muted/70",
  accent: "stroke-accent",
  danger: "stroke-red-500/70",
};

/** Halo behind labels so they stay readable where they cross lines. */
const halo = "stroke-surface [stroke-width:4px] [paint-order:stroke] [stroke-linejoin:round]";

export function ArchitectureDiagram({ id, diagram }: { id: string; diagram: Diagram }) {
  const { width, height, groups = [], nodes, edges = [], notes = [], summary } = diagram;
  const marker = (tone: keyof typeof edgeTone) => `${id}-arrow-${tone}`;

  return (
    <div className="relative overflow-x-auto rounded-card border border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="relative block w-full min-w-[680px] h-auto p-2 font-sans"
        // Code-font ligatures would turn "-<" or "->" into arrow glyphs
        style={{ fontVariantLigatures: "none" }}
      >
        <title id={`${id}-title`}>Architecture diagram</title>
        <desc id={`${id}-desc`}>{summary}</desc>

        <defs>
          {(Object.keys(edgeTone) as (keyof typeof edgeTone)[]).map((tone) => (
            <marker
              key={tone}
              id={marker(tone)}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path
                d="M0,1 L9,5 L0,9 z"
                className={cn(
                  tone === "accent" ? "fill-accent" : tone === "danger" ? "fill-red-500/70" : "fill-muted/70"
                )}
              />
            </marker>
          ))}
        </defs>

        {/* Containers (VPC, subnet, cluster…) */}
        {groups.map((g) => (
          <g key={g.label}>
            <rect
              x={g.x}
              y={g.y}
              width={g.w}
              height={g.h}
              rx={14}
              strokeWidth={1.25}
              strokeDasharray={g.dashed ? "6 5" : undefined}
              className={g.tone === "accent" ? "fill-accent/[0.04] stroke-accent/50" : "fill-fg/[0.02] stroke-border"}
            />
            <text
              x={g.x + 14}
              y={g.y + 20}
              className={cn(
                "font-mono text-[11px] font-semibold",
                g.tone === "accent" ? "fill-accent" : "fill-muted"
              )}
            >
              {g.label}
            </text>
          </g>
        ))}

        {/* Connections (drawn under nodes) */}
        {edges.map((e, i) => {
          const tone = e.tone ?? "default";
          return (
            <g key={i}>
              <path
                d={e.points.map(([x, y], j) => `${j ? "L" : "M"}${x},${y}`).join(" ")}
                fill="none"
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeDasharray={e.dashed ? "5 4" : undefined}
                markerEnd={e.arrow === false ? undefined : `url(#${marker(tone)})`}
                className={edgeTone[tone]}
              />
              {e.label && (
                <text
                  x={e.label.x}
                  y={e.label.y}
                  textAnchor={e.label.anchor ?? "middle"}
                  transform={e.label.rotate ? `rotate(${e.label.rotate} ${e.label.x} ${e.label.y})` : undefined}
                  className={cn("font-mono text-[10.5px]", halo, tone === "danger" ? "fill-red-500" : "fill-muted")}
                >
                  {e.label.text}
                </text>
              )}
            </g>
          );
        })}

        {/* Components */}
        {nodes.map((n) => {
          const t = nodeTone[n.tone ?? "default"];
          const Icon = n.icon ? ICONS[n.icon] : undefined;
          const lines = n.lines ?? [];
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={nodeHeight(lines.length)}
                rx={10}
                strokeWidth={n.tone === "accent" ? 1.5 : 1.25}
                strokeDasharray={n.tone === "muted" ? "5 4" : undefined}
                className={t.rect}
              />
              {Icon && <Icon x={n.x + 14} y={n.y + 12} size={18} className={t.icon} aria-hidden="true" />}
              <text
                x={n.x + (Icon ? 40 : 14)}
                y={n.y + TITLE_Y}
                className={cn("text-[13px] font-semibold", t.title)}
              >
                {n.title}
              </text>
              {lines.map((line, j) => (
                <text
                  key={j}
                  x={n.x + 14}
                  y={n.y + LINE0_Y + j * LINE_H}
                  className="font-mono text-[11px] fill-muted"
                  style={{ whiteSpace: "pre" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {notes.map((note, i) => (
          <text key={i} x={note.x} y={note.y} className="font-mono text-[10.5px] fill-muted">
            {note.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
