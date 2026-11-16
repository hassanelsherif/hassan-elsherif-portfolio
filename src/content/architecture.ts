/**
 * Architecture diagrams, one per lab, drawn by <ArchitectureDiagram>.
 * Coordinates are in SVG viewBox units. Every component and port here was checked
 * against the lab's own code (Terraform, workflow, Helm values, docker-compose).
 */

export type DiagramTone = "default" | "accent" | "danger" | "warn" | "ok" | "muted";

export interface DiagramNode {
  id: string;
  x: number;
  y: number;
  w: number;
  title: string;
  lines?: string[];
  icon?: string;
  tone?: DiagramTone;
}

export interface DiagramGroup {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "default" | "accent";
  dashed?: boolean;
}

export interface DiagramEdge {
  points: [number, number][];
  label?: { text: string; x: number; y: number; anchor?: "start" | "middle" | "end"; rotate?: number };
  tone?: "default" | "accent" | "danger";
  dashed?: boolean;
  arrow?: boolean;
}

export interface Diagram {
  width: number;
  height: number;
  /** Plain-language description for screen readers. */
  summary: string;
  groups?: DiagramGroup[];
  nodes: DiagramNode[];
  edges?: DiagramEdge[];
  notes?: { x: number; y: number; text: string }[];
}

export const architectureDiagrams: Record<string, Diagram> = {
  // P01 — main.tf: VPC, IGW, public subnet, route table + association, security group,
  // IAM role + 2 policy attachments + instance profile, EC2 instance (11 resources)
  "aws-infrastructure-as-code": {
    width: 900,
    height: 470,
    summary:
      "Internet traffic on port 80 enters through an Internet Gateway into a VPC (10.0.0.0/16). A route table sends 0.0.0.0/0 to the gateway for the public subnet (10.0.1.0/24). Inside the subnet, an EC2 app server sits behind a security group allowing only inbound 80/tcp; there is no SSH and access is through SSM Session Manager. An IAM role with the SSM core and CloudWatch agent policies is attached to the instance through an instance profile.",
    groups: [
      { label: "VPC · 10.0.0.0/16", x: 190, y: 96, w: 480, h: 360 },
      { label: "Public subnet · 10.0.1.0/24 · AZ-a", x: 210, y: 222, w: 440, h: 214 },
      { label: "Security group · in 80/tcp · out all", x: 230, y: 256, w: 400, h: 162, tone: "accent", dashed: true },
      { label: "IAM (global)", x: 690, y: 96, w: 200, h: 360 },
    ],
    nodes: [
      { id: "internet", x: 470, y: 12, w: 180, title: "Internet", icon: "globe", lines: ["users · HTTP :80"] },
      { id: "igw", x: 470, y: 126, w: 180, title: "Internet Gateway", icon: "router", lines: ["attached to the VPC"] },
      { id: "rt", x: 210, y: 126, w: 240, title: "Route table", icon: "route", lines: ["0.0.0.0/0 → IGW", "associated: public subnet"] },
      {
        id: "ec2",
        x: 250,
        y: 290,
        w: 360,
        title: "EC2 · app server",
        icon: "server",
        tone: "accent",
        lines: ["Amazon Linux 2 · public IP", "port 22 closed, no SSH keys", "shell access via SSM Session Manager"],
      },
      { id: "role", x: 702, y: 130, w: 176, title: "IAM role", icon: "key", lines: ["assumed by EC2 via", "instance profile"] },
      { id: "ssm", x: 702, y: 226, w: 176, title: "SSM core", icon: "scroll", lines: ["AmazonSSMManaged", "InstanceCore"] },
      { id: "cw", x: 702, y: 322, w: 176, title: "CloudWatch agent", icon: "scroll", lines: ["CloudWatchAgent", "ServerPolicy"] },
    ],
    edges: [
      { points: [[560, 72], [560, 126]], label: { text: "HTTP", x: 568, y: 103, anchor: "start" } },
      { points: [[560, 186], [560, 290]], tone: "accent", label: { text: "HTTP :80", x: 568, y: 248, anchor: "start" } },
      { points: [[450, 156], [470, 156]] },
      {
        points: [[702, 168], [680, 168], [680, 336], [610, 336]],
        dashed: true,
        label: { text: "instance profile", x: 675, y: 252, rotate: -90 },
      },
    ],
    notes: [{ x: 702, y: 422, text: "policies attached to role" }],
  },

  // P02 — .github/workflows/ci-cd.yml: lint-test → build-scan → push-image → deploy (main only)
  "secure-cicd-pipeline": {
    width: 910,
    height: 280,
    summary:
      "A GitHub Actions pipeline triggered by a pull request or a push to main runs four gated jobs in order: lint-test (ESLint and Vitest), build-scan (docker build and a Trivy scan), push-image (push to GHCR tagged with the commit SHA) and deploy (main only: pull, run and health-check with three retries). A test failure blocks the merge, a CRITICAL CVE stops the pipeline, and an unhealthy deploy triggers an automatic rollback.",
    nodes: [
      { id: "trigger", x: 10, y: 98, w: 150, title: "Trigger", icon: "gitBranch", lines: ["PR or push", "to main"] },
      { id: "lint", x: 196, y: 98, w: 150, title: "lint-test", icon: "flask", lines: ["ESLint", "Vitest unit tests"] },
      { id: "scan", x: 380, y: 98, w: 150, title: "build-scan", icon: "scan", tone: "accent", lines: ["docker build", "Trivy CVE scan"] },
      { id: "push", x: 564, y: 98, w: 150, title: "push-image", icon: "package", lines: ["push to GHCR", "tag sha-<commit>"] },
      { id: "deploy", x: 748, y: 98, w: 150, title: "deploy", icon: "rocket", lines: ["pull → run", "/health, 3 retries"] },
      { id: "f-lint", x: 196, y: 222, w: 150, title: "merge blocked", icon: "ban", tone: "danger" },
      { id: "f-scan", x: 380, y: 222, w: 150, title: "pipeline stops", icon: "ban", tone: "danger" },
      { id: "f-deploy", x: 748, y: 222, w: 150, title: "auto rollback", icon: "undo", tone: "danger" },
    ],
    edges: [
      { points: [[160, 136], [196, 136]] },
      { points: [[346, 136], [380, 136]], label: { text: "pass", x: 363, y: 128 } },
      { points: [[530, 136], [564, 136]], label: { text: "pass", x: 547, y: 128 } },
      { points: [[714, 136], [748, 136]], label: { text: "main", x: 731, y: 128 } },
      { points: [[271, 174], [271, 222]], tone: "danger", dashed: true, label: { text: "fail", x: 277, y: 202, anchor: "start" } },
      { points: [[455, 174], [455, 222]], tone: "danger", dashed: true, label: { text: "CRITICAL CVE", x: 461, y: 202, anchor: "start" } },
      { points: [[823, 174], [823, 222]], tone: "danger", dashed: true, label: { text: "unhealthy", x: 829, y: 202, anchor: "start" } },
    ],
    notes: [{ x: 10, y: 40, text: "GitHub Actions · each job runs only if the previous one passed" }],
  },

  // P03 — helm/p03-app: Ingress, Service, Deployment (replicaCount 2), ConfigMap, Secret
  "kubernetes-application-platform": {
    width: 900,
    height: 440,
    summary:
      "Inside a local kind cluster, an ingress-nginx Ingress for host app.localdev on port 80 forwards to a ClusterIP Service, which load-balances across two pods managed by a Deployment with rolling updates. Each pod runs non-root with a read-only filesystem and has liveness and readiness probes on /health. A ConfigMap (APP_ENV, LOG_LEVEL) and a Secret (APP_SECRET_KEY) are injected as environment variables.",
    groups: [
      { label: "kind cluster · local Docker nodes", x: 196, y: 16, w: 690, h: 410 },
      { label: "Deployment · 2 replicas · rolling update", x: 220, y: 168, w: 440, h: 236, tone: "accent" },
    ],
    nodes: [
      { id: "client", x: 20, y: 56, w: 150, title: "Client", icon: "globe", lines: ["browser / curl"] },
      { id: "ingress", x: 220, y: 48, w: 200, title: "Ingress", icon: "network", lines: ["ingress-nginx", "host app.localdev :80"] },
      { id: "svc", x: 460, y: 48, w: 200, title: "Service", icon: "split", lines: ["ClusterIP", "targets pods :3001"] },
      { id: "pod1", x: 244, y: 204, w: 190, title: "Pod 1", icon: "box", lines: ["non-root · read-only FS", "liveness  /health", "readiness /health"] },
      { id: "pod2", x: 450, y: 204, w: 190, title: "Pod 2", icon: "box", lines: ["non-root · read-only FS", "liveness  /health", "readiness /health"] },
      { id: "cm", x: 690, y: 48, w: 176, title: "ConfigMap", icon: "settings", lines: ["APP_ENV", "LOG_LEVEL"] },
      { id: "secret", x: 690, y: 148, w: 176, title: "Secret", icon: "lock", lines: ["APP_SECRET_KEY"] },
    ],
    edges: [
      { points: [[170, 86], [220, 86]], label: { text: "HTTP", x: 193, y: 78 } },
      { points: [[420, 86], [460, 86]] },
      { points: [[560, 124], [560, 150], [339, 150], [339, 204]], tone: "accent" },
      { points: [[560, 150], [545, 150], [545, 204]], tone: "accent" },
      { points: [[690, 86], [676, 86], [676, 250], [660, 250]], dashed: true },
      { points: [[690, 178], [676, 178]], dashed: true, arrow: false },
    ],
    notes: [
      { x: 690, y: 236, text: "injected as env vars" },
      { x: 244, y: 330, text: "Deleted pod → recreated automatically" },
      { x: 244, y: 350, text: "CPU / memory limits on every container" },
      { x: 244, y: 370, text: "Released with Helm: upgrade · rollback" },
    ],
  },

  // P04 — docker-compose.yml, prometheus.yml, alertmanager.yml, rules/app-alerts.yml
  "observability-and-incident-response": {
    width: 900,
    height: 400,
    summary:
      "Prometheus on port 9090 scrapes the demo app's /metrics endpoint every 15 seconds and evaluates three alert rules: AppDown (1 minute), HighErrorRate (2 minutes) and HighLatency (5 minutes). Firing alerts go to Alertmanager on 9093, which routes them to a webhook test sink on the app. Grafana on host port 3002 queries Prometheus with PromQL for provisioned dashboards. Node Exporter is defined but disabled in this run.",
    groups: [{ label: "Alert rules (evaluated by Prometheus)", x: 20, y: 290, w: 560, h: 96 }],
    nodes: [
      { id: "app", x: 20, y: 40, w: 220, title: "Demo app :3001", icon: "app", lines: ["/metrics (prom-client)", "/webhook-sink"] },
      { id: "prom", x: 340, y: 40, w: 240, title: "Prometheus :9090", icon: "gauge", tone: "accent", lines: ["scrape every 15s", "evaluates 3 alert rules"] },
      { id: "grafana", x: 660, y: 40, w: 220, title: "Grafana :3002", icon: "chart", lines: ["provisioned dashboards", "Prometheus datasource"] },
      { id: "am", x: 340, y: 196, w: 240, title: "Alertmanager :9093", icon: "bell", lines: ["route → webhook-test"] },
      { id: "node", x: 660, y: 196, w: 220, title: "Node Exporter :9100", icon: "cpu", tone: "muted", lines: ["CPU · memory · disk", "disabled in this run"] },
      { id: "r1", x: 36, y: 322, w: 166, title: "AppDown · 1m", tone: "warn" },
      { id: "r2", x: 214, y: 322, w: 170, title: "HighErrorRate · 2m", tone: "warn" },
      { id: "r3", x: 396, y: 322, w: 170, title: "HighLatency · 5m", tone: "warn" },
    ],
    edges: [
      { points: [[340, 78], [240, 78]], tone: "accent", label: { text: "scrape /metrics", x: 290, y: 70 } },
      { points: [[660, 78], [580, 78]], label: { text: "PromQL", x: 620, y: 70 } },
      { points: [[460, 116], [460, 196]], label: { text: "firing alerts", x: 468, y: 160, anchor: "start" } },
      { points: [[340, 226], [130, 226], [130, 116]], dashed: true, label: { text: "webhook (test sink)", x: 235, y: 218 } },
    ],
    notes: [{ x: 660, y: 300, text: "Thresholds: 10% errors · 500 ms p95" }],
  },

  // P05 — terraform/main.tf (bucket, SSE, public access block, IAM user + policy),
  // scripts/backup.sh, restore.py, verify-restore.sh. Lifecycle block is commented out.
  "aws-backup-and-disaster-recovery": {
    width: 940,
    height: 330,
    summary:
      "backup.sh archives a test dataset (app-db.sql, app-config.json, app.log) into an S3 bucket on LocalStack as data.tar.gz plus SHA-256 checksums under a timestamped prefix. The bucket uses SSE-S3 (AES-256) encryption and blocks all public access. A least-privilege IAM user can only put, get, list and delete in this bucket. After simulate-loss.sh deletes the data, restore.py restores it into restored-data, where checksums match and the measured RTO was 0.3 seconds. A 30-day lifecycle rule is written but currently commented out.",
    groups: [{ label: "S3 · p05-backup-local (LocalStack)", x: 290, y: 16, w: 380, h: 296 }],
    nodes: [
      { id: "src", x: 20, y: 40, w: 200, title: "test-data/", icon: "folder", lines: ["app-db.sql", "app-config.json", "app.log"] },
      { id: "enc", x: 310, y: 48, w: 340, title: "Encryption & access", icon: "lock", lines: ["SSE-S3 (AES-256) at rest", "all public access blocked"] },
      {
        id: "bk",
        x: 310,
        y: 140,
        w: 340,
        title: "backups/<timestamp>/",
        icon: "archive",
        tone: "accent",
        lines: ["data.tar.gz       compressed archive", "checksums.sha256  integrity proof"],
      },
      { id: "lc", x: 310, y: 232, w: 340, title: "Lifecycle: expire after 30 days", icon: "clock", tone: "muted", lines: ["written in main.tf, commented out"] },
      { id: "out", x: 748, y: 140, w: 180, title: "restored-data/", icon: "check", tone: "ok", lines: ["checksums match", "RTO 0.3 s"] },
      { id: "iam", x: 20, y: 232, w: 230, title: "IAM user · backup-user", icon: "key", lines: ["Put/Get/List/Delete", "this bucket only"] },
    ],
    edges: [
      { points: [[220, 86], [260, 86], [260, 178], [310, 178]], tone: "accent", label: { text: "backup.sh", x: 254, y: 132, rotate: -90 } },
      { points: [[650, 178], [748, 178]], tone: "accent", label: { text: "restore.py", x: 678, y: 170, anchor: "start" } },
      { points: [[250, 270], [290, 270]], dashed: true },
    ],
    notes: [
      { x: 20, y: 152, text: "simulate-loss.sh deletes it" },
      { x: 748, y: 236, text: "verify-restore.sh" },
      { x: 748, y: 252, text: "re-checks SHA-256" },
    ],
  },
};
