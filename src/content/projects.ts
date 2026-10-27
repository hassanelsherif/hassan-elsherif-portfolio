import type { Project } from "@/types";

export interface ProjectDetail {
  slug: string;
  architecture: string;
  implementation: { title: string; code: string }[];
  securityNotes: string[];
  lessons: string[];
}

export const projects: Project[] = [
  {
    slug: "aws-infrastructure-as-code",
    title: "AWS Infrastructure as Code",
    problem:
      "Manual cloud provisioning produces configuration drift and weak reproducibility across environments.",
    description:
      "Modular Terraform project that provisions a complete AWS environment: VPC, subnet/routing topology, security groups, EC2 instance profile, and SSM-based access. Runs locally via LocalStack (no AWS account needed). Demonstrates parameterized environments, least-privilege IAM, safe state outputs, and full teardown.",
    status: "completed",
    technologies: ["Terraform", "AWS", "VPC", "EC2", "IAM", "SSM", "LocalStack", "Docker"],
    techCategories: [
      { label: "Terraform", category: "devops" },
      { label: "AWS EC2", category: "cloud" },
      { label: "AWS VPC", category: "cloud" },
      { label: "AWS IAM", category: "cloud" },
      { label: "LocalStack", category: "infra" },
    ],
    repositoryUrl: "https://github.com/hassanelsherifx/portfolio-website/tree/main/projects/p01-aws-iac",
    featured: true,
    order: 1,
  },
  {
    slug: "secure-cicd-pipeline",
    title: "Secure CI/CD Pipeline",
    problem:
      "Manual builds and deployments increase human error and release risk without auditability.",
    description:
      "GitHub Actions pipeline with four gates: PR validation → unit tests + lint → Docker build + Trivy vulnerability scan → immutable image push to GHCR → gated deploy with health check and rollback. Demonstrates pinned action versions, least-privilege permissions, and rollback procedures.",
    status: "completed",
    technologies: ["GitHub Actions", "Docker", "GHCR", "Trivy", "Node.js", "Vitest"],
    techCategories: [
      { label: "GitHub Actions", category: "devops" },
      { label: "Docker", category: "devops" },
      { label: "GHCR", category: "devops" },
      { label: "Trivy", category: "devops" },
    ],
    repositoryUrl: "https://github.com/hassanelsherifx/portfolio-website/tree/main/projects/p02-cicd-pipeline",
    featured: true,
    order: 2,
  },
  {
    slug: "kubernetes-application-platform",
    title: "Kubernetes Application Platform",
    problem:
      "Containerized applications need repeatable rollout, self-healing, and safe configuration management.",
    description:
      "Local kind cluster with a complete Helm chart: Deployment, Service, Ingress, ConfigMap, Secret references, liveness/readiness probes, resource limits, rolling updates, scaling, and pod failure recovery demonstration. Non-root containers, read-only filesystem, dropped capabilities.",
    status: "completed",
    technologies: ["Kubernetes", "kind", "Helm", "Docker", "Ingress-NGINX"],
    techCategories: [
      { label: "Kubernetes", category: "devops" },
      { label: "Helm", category: "devops" },
      { label: "Docker", category: "devops" },
      { label: "kind", category: "infra" },
    ],
    repositoryUrl: "https://github.com/hassanelsherifx/portfolio-website/tree/main/projects/p03-kubernetes",
    featured: true,
    order: 3,
  },
  {
    slug: "observability-and-incident-response",
    title: "Observability & Incident Response",
    problem:
      "Undetected outages and latency degradation delay diagnosis and extend mean time to recovery.",
    description:
      "Full observability stack via Docker Compose: Prometheus scrapes a demo app, Grafana dashboards visualise availability/latency/errors/CPU, Alertmanager fires on threshold breach. Controlled failure simulation exercises the full alert → detect → remediate → resolve cycle with a written incident report template.",
    status: "completed",
    technologies: ["Prometheus", "Grafana", "Alertmanager", "Docker Compose", "Node.js", "prom-client"],
    techCategories: [
      { label: "Prometheus", category: "monitoring" },
      { label: "Grafana", category: "monitoring" },
      { label: "Alertmanager", category: "monitoring" },
      { label: "Docker", category: "devops" },
    ],
    repositoryUrl: "https://github.com/hassanelsherifx/portfolio-website/tree/main/projects/p04-observability",
    featured: true,
    order: 4,
  },
  {
    slug: "aws-backup-and-disaster-recovery",
    title: "AWS Backup & Disaster Recovery",
    problem:
      "Accidental deletion and system failure can destroy application data without a tested recovery path.",
    description:
      "Automated backup of a stateful test dataset to an encrypted S3 bucket (LocalStack) with lifecycle rules, SHA-256 checksums, a Python restore script, and a timed DR exercise. RPO/RTO objectives defined before testing. Least-privilege IAM, SSE-S3 encryption, 30-day lifecycle, and full teardown documented.",
    status: "completed",
    technologies: ["AWS S3", "IAM", "Terraform", "Bash", "Python", "LocalStack"],
    techCategories: [
      { label: "AWS S3", category: "cloud" },
      { label: "AWS IAM", category: "cloud" },
      { label: "Terraform", category: "devops" },
      { label: "Bash", category: "scripting" },
      { label: "Python", category: "scripting" },
    ],
    repositoryUrl: "https://github.com/hassanelsherifx/portfolio-website/tree/main/projects/p05-backup-dr",
    featured: true,
    order: 5,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

// ── Full case study details ──────────────────────────────────────────────────

const projectDetails: ProjectDetail[] = [
  {
    slug: "aws-infrastructure-as-code",
    architecture: `
  VPC  10.0.0.0/16
  ┌──────────────────────────────────────┐
  │  Public Subnet  10.0.1.0/24  AZ-a   │
  │  ┌─────────────────────────────┐     │
  │  │  EC2 Instance (App Server)  │──►  Internet Gateway
  │  │  IAM Role → SSM Agent       │     │
  │  │  Security Group:            │     │
  │  │    Ingress: 80/tcp only     │     │
  │  │    Egress:  ALL             │     │
  │  └─────────────────────────────┘     │
  └──────────────────────────────────────┘
  IAM: EC2 Instance Profile
    └── AmazonSSMManagedInstanceCore
    └── CloudWatchAgentServerPolicy
    `.trim(),
    implementation: [
      {
        title: "1. Start LocalStack (free AWS emulator)",
        code: `cd projects/p01-aws-iac
docker-compose up -d localstack
# Wait for ready
curl http://localhost:4566/_localstack/health`,
      },
      {
        title: "2. Initialise and plan Terraform",
        code: `cd terraform
terraform init
terraform fmt
terraform validate
terraform plan -var-file=environments/local.tfvars`,
      },
      {
        title: "3. Apply infrastructure",
        code: `terraform apply -var-file=environments/local.tfvars -auto-approve
# Outputs: vpc_id, subnet_id, instance_id, public_ip, app_url`,
      },
      {
        title: "4. Validate — idempotency check (must show 0 changes)",
        code: `terraform plan -var-file=environments/local.tfvars
# Expected: No changes. Infrastructure is up-to-date.`,
      },
      {
        title: "5. Destroy all resources",
        code: `terraform destroy -var-file=environments/local.tfvars -auto-approve
docker-compose down -v`,
      },
    ],
    securityNotes: [
      "No SSH port open — access via SSM Session Manager only, eliminating attack surface from exposed port 22.",
      "Least-privilege IAM role: only SSM core and CloudWatch agent policies attached, no admin or wildcard permissions.",
      "Security group allows inbound HTTP (port 80) only; all other ingress is denied by default.",
      "No secrets in Terraform code or state outputs — sensitive outputs marked sensitive = true.",
      "Version constraints on all providers prevent unexpected upgrades breaking infrastructure.",
      "Trade-off: Public subnet used for simplicity. A production setup would use private subnets with NAT gateway, but that incurs ongoing cost.",
    ],
    lessons: [
      "Modular Terraform structure (separate files per concern) makes it easy to swap provider endpoints between LocalStack and real AWS.",
      "terraform validate catches syntax errors before any AWS API call — fast feedback loop.",
      "Idempotency testing (running plan twice) is essential to confirm no drift was introduced during apply.",
      "SSM-based access removes the need to manage SSH keys entirely, which simplifies the security model significantly.",
      "LocalStack's free tier doesn't emulate all AWS behaviours exactly — test against real AWS before claiming production-readiness.",
    ],
  },
  {
    slug: "secure-cicd-pipeline",
    architecture: `
  PR opened / push to main
          │
          ▼
  ┌───────────────┐
  │  lint-test    │  ESLint + Vitest unit tests
  │               │  FAIL → blocks merge
  └──────┬────────┘
         │ pass
         ▼
  ┌───────────────┐
  │  build-scan   │  docker build
  │               │  Trivy scan (CRITICAL CVE → fail)
  └──────┬────────┘
         │ pass
         ▼
  ┌───────────────┐
  │  push-image   │  Push to GHCR
  │               │  Tag: sha-<commit> + latest
  └──────┬────────┘
         │ main branch only
         ▼
  ┌───────────────┐
  │  deploy       │  docker pull → run → health check
  │               │  FAIL → automatic rollback
  └───────────────┘
    `.trim(),
    implementation: [
      {
        title: "1. Run tests locally",
        code: `cd projects/p02-cicd-pipeline/app
npm install
npm test
# 7 tests: health, root, add, subtract, multiply, divide, edge cases`,
      },
      {
        title: "2. Build Docker image (multi-stage, non-root)",
        code: `docker build -t p02-app:local ./app
docker run -d --name p02-app -p 3001:3001 p02-app:local
curl http://localhost:3001/health
# {"status":"ok","version":"local"}`,
      },
      {
        title: "3. Scan image for vulnerabilities",
        code: `# Trivy runs automatically in CI — to run locally:
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy:latest image --severity CRITICAL p02-app:local`,
      },
      {
        title: "4. Pipeline triggers on push to main",
        code: `git push origin main
# GitHub Actions runs: lint-test → build-scan → push-image → deploy
# Monitor: GitHub → Actions tab`,
      },
      {
        title: "5. Rollback to previous image",
        code: `docker pull ghcr.io/YOUR_USERNAME/p02-app:sha-<prev-sha>
docker stop p02-app && docker rm p02-app
docker run -d --name p02-app -p 3001:3001 \\
  ghcr.io/YOUR_USERNAME/p02-app:sha-<prev-sha>
curl http://localhost:3001/health`,
      },
    ],
    securityNotes: [
      "Pinned action versions prevent supply-chain attacks from malicious action updates.",
      "Per-job least-privilege GitHub token permissions: read-only by default, packages:write only on push job.",
      "Trivy blocks on CRITICAL severity CVEs with ignore-unfixed: true to avoid noise from known-unpatched upstream issues.",
      "Multi-stage Dockerfile: build dependencies never reach the runtime image, reducing attack surface.",
      "Non-root container user (adduser appuser) — if the app is compromised, the attacker has no root access.",
      "Image tagged by commit SHA ensures immutability — a tag cannot be silently overwritten without a new commit.",
      "No secrets in Dockerfile, source code, or workflow files — GITHUB_TOKEN is provided automatically by the runner.",
    ],
    lessons: [
      "Separating lint/test from build/scan into distinct jobs gives faster feedback — a test failure doesn't waste time on a Docker build.",
      "Image layer caching (cache-from: type=gha) cuts build times significantly on repeated pushes.",
      "A health check endpoint in the app is essential for automated deploy validation and rollback decisions.",
      "Trivy's ignore-unfixed flag is important in practice — otherwise CI fails on CVEs that have no available fix yet.",
      "GitHub Actions path filters (paths: [...]) prevent unnecessary CI runs when unrelated files change.",
    ],
  },
  {
    slug: "kubernetes-application-platform",
    architecture: `
  Browser / curl
        │
        ▼
  ┌─────────────────────────────────────┐
  │  kind cluster (local Docker nodes) │
  │                                     │
  │  Ingress (ingress-nginx)            │
  │  host: app.localdev → port 80       │
  │         │                           │
  │  Service (ClusterIP) → port 3001    │
  │         │                           │
  │  Deployment  replicas: 2            │
  │  ┌──────────┐   ┌──────────┐       │
  │  │  Pod 1   │   │  Pod 2   │       │
  │  │ /health  │   │ /health  │       │
  │  │ liveness │   │ liveness │       │
  │  │ readiness│   │ readiness│       │
  │  └──────────┘   └──────────┘       │
  │                                     │
  │  ConfigMap: APP_ENV, LOG_LEVEL      │
  │  Secret:    APP_SECRET_KEY          │
  └─────────────────────────────────────┘
    `.trim(),
    implementation: [
      {
        title: "1. Create kind cluster",
        code: `cd projects/p03-kubernetes
kind create cluster --config kind-config.yaml --name p03-cluster
kubectl cluster-info --context kind-p03-cluster`,
      },
      {
        title: "2. Install ingress-nginx controller",
        code: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/\\
  controller-v1.10.1/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx \\
  --for=condition=ready pod \\
  --selector=app.kubernetes.io/component=controller \\
  --timeout=90s`,
      },
      {
        title: "3. Install Helm chart",
        code: `helm lint ./helm/p03-app
helm install p03-app ./helm/p03-app --namespace p03 --create-namespace
kubectl get all -n p03`,
      },
      {
        title: "4. Rolling update demonstration",
        code: `helm upgrade p03-app ./helm/p03-app --namespace p03 \\
  --set image.tag=sha-abc1234
kubectl rollout status deployment/p03-app -n p03
kubectl rollout history deployment/p03-app -n p03`,
      },
      {
        title: "5. Pod self-healing demonstration",
        code: `# Delete a pod — Deployment recreates it automatically
kubectl delete pod -l app=p03-app -n p03 --wait=false
kubectl get pods -n p03 -w
# New pod appears within seconds`,
      },
      {
        title: "6. Rollback and clean up",
        code: `helm rollback p03-app 1 --namespace p03
# Clean up
helm uninstall p03-app --namespace p03
kind delete cluster --name p03-cluster`,
      },
    ],
    securityNotes: [
      "Non-root containers: runAsNonRoot: true and runAsUser: 1000 prevent privilege escalation inside pods.",
      "Read-only root filesystem prevents runtime file modifications — a compromised container cannot write to disk.",
      "All Linux capabilities dropped (capabilities.drop: [ALL]) — the container has no special kernel privileges.",
      "Secrets stored as Kubernetes Secret objects, not in ConfigMaps or environment variables hardcoded in YAML.",
      "Resource limits (CPU/memory) prevent a single pod from starving other workloads on the node.",
      "Trade-off: kind runs entirely locally — no cloud cost, but does not test cloud-specific behaviours like LoadBalancer services or PersistentVolumeClaims backed by EBS.",
    ],
    lessons: [
      "Helm charts make rolling updates and rollbacks trivial — helm rollback is a single command.",
      "Readiness probes are critical: without them, Kubernetes routes traffic to pods before they are ready, causing request failures during deployments.",
      "kind's extraPortMappings are required to expose ingress to the host machine — easy to miss and hard to debug without understanding the networking.",
      "helm lint catches template errors before deployment — run it in CI to prevent broken charts reaching the cluster.",
      "Separating config (ConfigMap) from secrets follows the principle of least exposure — config can be version-controlled, secrets cannot.",
    ],
  },
  {
    slug: "observability-and-incident-response",
    architecture: `
  ┌──────────────┐  scrape /metrics   ┌─────────────────┐
  │  Demo App    │ ◄──────────────── │  Prometheus     │
  │  :3001       │                    │  :9090          │
  │  prom-client │                    │  15s intervals  │
  └──────────────┘                    └────────┬────────┘
                                               │
                                        alert rules
                                               │
  ┌──────────────────────┐            ┌────────▼────────┐
  │  Alertmanager  :9093 │ ◄─ alerts ─│  Rules engine   │
  │  webhook sink        │            └────────┬────────┘
  └──────────────────────┘                     │ query
                                               ▼
  Node Exporter :9100 ──────────────► ┌─────────────────┐
  (CPU, memory, disk)                 │  Grafana  :3000 │
                                      │  dashboards     │
                                      └─────────────────┘
    `.trim(),
    implementation: [
      {
        title: "1. Start the full observability stack",
        code: `cd projects/p04-observability
docker-compose up -d
docker-compose ps
# All services: Up
# App: http://localhost:3001
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3000  (admin/admin)
# Alertmanager: http://localhost:9093`,
      },
      {
        title: "2. Verify metrics are being scraped",
        code: `curl http://localhost:3001/metrics
# Returns Prometheus text format metrics
# Check targets: http://localhost:9090/targets
# All targets should show state=UP`,
      },
      {
        title: "3. Generate traffic to populate dashboard",
        code: `for i in $(seq 1 50); do
  curl -s http://localhost:3001/ > /dev/null
  curl -s http://localhost:3001/health > /dev/null
  sleep 0.5
done`,
      },
      {
        title: "4. Run failure simulation (triggers AppDown alert)",
        code: `bash scripts/simulate-failure.sh
# Watch alerts fire at: http://localhost:9090/alerts
# Watch Alertmanager: http://localhost:9093/#/alerts
# Grafana availability panel turns red`,
      },
      {
        title: "5. Trigger error rate alert",
        code: `for i in $(seq 1 60); do
  curl -s http://localhost:3001/error > /dev/null
  sleep 0.1
done
# HighErrorRate alert fires after 2 minutes
# Check: http://localhost:9090/alerts`,
      },
      {
        title: "6. Clean up",
        code: `docker-compose down -v
# -v removes Prometheus and Grafana data volumes`,
      },
    ],
    securityNotes: [
      "Alertmanager uses a webhook test sink — no real credentials or external services required for local testing.",
      "Grafana admin password should be changed on first login; GF_SECURITY_ADMIN_PASSWORD is set only for local dev.",
      "Node Exporter mounts the host filesystem read-only (ro,rslave) — it reads metrics without write access.",
      "No application secrets are exposed in metrics — prom-client exports only counters, histograms, and gauges.",
      "Trade-off: Alertmanager uses a webhook to the app itself as a test sink. In production this would be Slack, PagerDuty, or email.",
      "Prometheus retention is set to 7 days locally — tune based on storage and compliance requirements in production.",
    ],
    lessons: [
      "Provisioning dashboards and datasources as code (Grafana provisioning files) means the entire observability setup is reproducible from a git clone.",
      "The SIMULATE_DOWN environment variable pattern lets you test failure scenarios without actually killing the process — useful for controlled drills.",
      "p95 latency is more meaningful than average latency — averages hide tail latency that affects real users.",
      "Alert thresholds need tuning for each environment — the values here (10% error rate, 500ms p95) are starting points, not universal truths.",
      "Node Exporter provides system-level context (CPU, memory) that is essential for correlating application symptoms with infrastructure causes.",
    ],
  },
  {
    slug: "aws-backup-and-disaster-recovery",
    architecture: `
  /test-data/                   ← stateful dataset
  app-db.sql
  app-config.json                    │
  app.log                            │  backup.sh
                                     ▼
  ┌──────────────────────────────────────────────┐
  │  S3 Bucket: p05-backup-local (LocalStack)   │
  │  SSE-AES256 encryption                      │
  │  Block all public access                    │
  │                                             │
  │  backups/YYYY-MM-DD_HH-MM-SS/               │
  │  ├── data.tar.gz       (compressed archive) │
  │  └── checksums.sha256  (integrity proof)    │
  │                                             │
  │  Lifecycle rule: expire after 30 days       │
  └──────────────────────────────────────────────┘
          │
          │  restore.py
          ▼
  /restored-data/                ← verified restore
  ✓ checksum match
  ✓ RTO measured

  IAM: backup-user (least-privilege)
    └── s3:PutObject, GetObject, ListBucket, DeleteObject
    └── Scoped to this bucket only
    `.trim(),
    implementation: [
      {
        title: "1. Start LocalStack and provision S3 bucket",
        code: `cd projects/p05-backup-dr
docker-compose up -d localstack
cd terraform
terraform init
terraform apply -var-file=environments/local.tfvars -auto-approve
terraform output bucket_name
cd ..`,
      },
      {
        title: "2. Create test dataset and run backup",
        code: `bash scripts/create-test-data.sh
BACKUP_BUCKET=p05-backup-local bash scripts/backup.sh
# Outputs: archive size, checksums, S3 upload confirmation`,
      },
      {
        title: "3. Verify backup in S3",
        code: `aws --endpoint-url=http://localhost:4566 \\
  s3 ls s3://p05-backup-local/ --recursive --human-readable
# Verify encryption
aws --endpoint-url=http://localhost:4566 s3api head-object \\
  --bucket p05-backup-local \\
  --key backups/$(cat .last-backup-id)/data.tar.gz`,
      },
      {
        title: "4. Simulate data loss and restore (timed)",
        code: `bash scripts/simulate-loss.sh
# Data is gone. Now restore and measure RTO:
time BACKUP_BUCKET=p05-backup-local \\
     RESTORE_PATH=./restored-data \\
     python3 scripts/restore.py
# Output: RTO measured: X.X seconds
# Target: ≤ 15 minutes (900 seconds)`,
      },
      {
        title: "5. Verify restored data integrity",
        code: `bash scripts/verify-restore.sh
# Compares SHA-256 checksums of restored files
# against checksums stored in S3 at backup time
# Expected: All files restored and verified successfully.`,
      },
      {
        title: "6. Clean up all resources",
        code: `cd terraform
terraform destroy -var-file=environments/local.tfvars -auto-approve
cd ..
docker-compose down -v
rm -rf test-data restored-data .last-backup-id`,
      },
    ],
    securityNotes: [
      "Least-privilege IAM: the backup user can only PutObject/GetObject/ListBucket/DeleteObject on this specific bucket — no other AWS permissions.",
      "Server-side encryption (SSE-S3 / AES-256) encrypts all objects at rest automatically.",
      "S3 public access block prevents any accidental public exposure of backup data.",
      "SHA-256 checksums generated at backup time and verified at restore time — confirms data integrity and detects corruption.",
      "No AWS credentials hardcoded — the backup script reads from environment variables, allowing credential rotation without code changes.",
      "Trade-off: SSE-S3 uses AWS-managed keys. For stronger key control, SSE-KMS with a customer-managed key is recommended in production.",
      "Trade-off: Lifecycle rule deletes backups after 30 days. Adjust retention to match your compliance requirements.",
    ],
    lessons: [
      "Defining RPO and RTO before running the test forces you to think about what 'good enough' recovery looks like for the specific workload.",
      "Checksums must be generated before the backup is uploaded, not after — otherwise you're just verifying the upload, not the original data.",
      "The Python restore script measuring its own RTO (time.time()) gives an objective, reproducible measurement rather than a manual estimate.",
      "LocalStack's S3 emulation is accurate enough for testing backup/restore logic and IAM policies without incurring AWS costs.",
      "Lifecycle rules are easy to forget but critical — without them, old backups accumulate indefinitely and storage costs grow unbounded.",
    ],
  },
];

export function getProjectDetails(slug: string): ProjectDetail {
  const detail = projectDetails.find((d) => d.slug === slug);
  if (!detail) {
    return {
      slug,
      architecture: "Architecture diagram pending.",
      implementation: [],
      securityNotes: [],
      lessons: [],
    };
  }
  return detail;
}
