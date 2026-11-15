type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "ok" | "dim" | "warn" };

// Output mirrors the real lab projects (P01 Terraform, P03 Kubernetes, P04 alerting)
const LINES: Line[] = [
  { kind: "cmd", text: "terraform apply -var-file=environments/local.tfvars" },
  { kind: "out", text: "aws_vpc.main: Creation complete after 2s", tone: "dim" },
  { kind: "out", text: "Apply complete! Resources: 11 added, 0 changed, 0 destroyed.", tone: "ok" },
  { kind: "cmd", text: "kubectl get pods -l app=p03-app" },
  { kind: "out", text: "NAME                       READY   STATUS    RESTARTS", tone: "dim" },
  { kind: "out", text: "p03-app-7d9f8c6b5-k2xmq    1/1     Running   0", tone: "ok" },
  { kind: "out", text: "p03-app-7d9f8c6b5-r8tlv    1/1     Running   0", tone: "ok" },
  { kind: "cmd", text: "curl -s :9090/api/v1/alerts | jq '.data.alerts | length'" },
  { kind: "out", text: "0  # all alerts resolved", tone: "ok" },
];

const toneClass = {
  ok: "text-emerald-400",
  dim: "text-slate-400",
  warn: "text-amber-400",
} as const;

export function TerminalCard() {
  return (
    <div
      className="relative w-full rounded-xl border border-slate-700/60 bg-[#0A0F1C] shadow-2xl shadow-accent/10 ring-1 ring-white/5 overflow-hidden"
      role="img"
      aria-label="Terminal showing a successful Terraform apply, healthy Kubernetes pods, and resolved Prometheus alerts"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-slate-900/60">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-400/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-xs text-slate-400">hassan@devops: ~/labs</span>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-[12.5px] leading-relaxed overflow-x-auto" aria-hidden="true">
        {LINES.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre opacity-0 animate-line-in"
            style={{ animationDelay: `${150 + i * 180}ms` }}
          >
            {line.kind === "cmd" ? (
              <>
                <span className="text-accent">$ </span>
                <span className="text-slate-100">{line.text}</span>
              </>
            ) : (
              <span className={toneClass[line.tone ?? "dim"]}>{line.text}</span>
            )}
          </div>
        ))}
        <div
          className="mt-1 opacity-0 animate-line-in"
          style={{ animationDelay: `${150 + LINES.length * 180}ms` }}
        >
          <span className="text-accent">$ </span>
          <span className="inline-block w-2 h-4 align-middle bg-slate-300 animate-blink" />
        </div>
      </div>
    </div>
  );
}
