"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Terminal-styled code block with a title bar and a copy button. */
export function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked (insecure context or permissions): nothing useful to do
    }
  }

  return (
    <div className="rounded-card overflow-hidden border border-slate-700/60 bg-[#0A0F1C] ring-1 ring-white/5">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-700/60 bg-slate-900/60">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        </span>
        <p className="flex-1 min-w-0 truncate font-mono text-xs text-slate-300">{title}</p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={copied ? "Copied" : `Copy code: ${title}`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed font-mono text-slate-200 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}
