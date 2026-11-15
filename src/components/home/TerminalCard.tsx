type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "ok" | "dim" | "warn" };

// Commands come from the lab runbooks; every output line matches an evidence
// screenshot (P01 apply + idempotency, P04 alert, P05 restore). Nothing invented.
const LINES: Line[] = [
  { kind: "cmd", text: "terraform apply tfplan" },
  { kind: "out", text: "Apply complete! Resources: 11 added, 0 changed, 0 destroyed.", tone: "ok" },
  { kind: "cmd", text: "terraform plan -var-file=environments/local.tfvars" },
  { kind: "out", text: "No changes. Your infrastructure matches the configuration.", tone: "dim" },
  { kind: "cmd", text: "bash scripts/simulate-failure.sh" },
  { kind: "out", text: "AppDown alert: PENDING", tone: "warn" },
  { kind: "cmd", text: "python3 scripts/restore.py" },
  { kind: "out", text: "Checksum OK", tone: "dim" },
  { kind: "out", text: "RTO measured: 0.3 seconds", tone: "ok" },
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
      aria-label="Terminal replaying commands from the labs: Terraform apply and an idempotent re-plan, a simulated outage raising the AppDown alert, and a backup restore with a 0.3 second RTO"
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
