import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Social preview card (LinkedIn, Slack, X…) — rendered on request; edge runtime avoids a Windows font-path bug in next/og
export const runtime = "edge";
export const alt = `${profile.name} — ${profile.targetRole}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STACK = ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0B1120",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(139,92,246,0.25), transparent 40%)",
          color: "#E5E7EB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#2DD4BF", fontFamily: "monospace" }}>
          hassan@devops:~$
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 44, color: "#2DD4BF", marginTop: 8 }}>
            {profile.targetRole}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#94A3B8", marginTop: 24 }}>
            5 hands-on DevOps labs · architecture · runbooks · evidence
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {STACK.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 24,
                color: "#CBD5E1",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
