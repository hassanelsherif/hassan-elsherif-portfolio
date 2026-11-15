export interface EvidenceImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface EvidenceGallery {
  intro: string;
  images: EvidenceImage[];
}

// Screenshots from real runs of each lab, keyed by project slug.
export const evidence: Record<string, EvidenceGallery> = {
  "aws-infrastructure-as-code": {
    intro:
      "Real Terraform execution against LocalStack. All 11 resources provisioned, idempotency verified, clean destroy confirmed.",
    images: [
      { src: "/images/p01/01-terraform-apply.png", width: 589, height: 206, alt: "Terraform apply complete showing 11 resources added with real resource IDs", caption: "Apply complete: 11 resources created with real IDs" },
      { src: "/images/p01/02-terraform-idempotency.png", width: 498, height: 26, alt: "Terraform plan showing no changes — infrastructure matches configuration", caption: "Idempotency check: 0 changes on second plan" },
      { src: "/images/p01/03-terraform-destroy.png", width: 422, height: 27, alt: "Terraform destroy complete showing 11 resources destroyed", caption: "Destroy complete: 11 resources removed, clean teardown" },
    ],
  },
  "secure-cicd-pipeline": {
    intro:
      "Real GitHub Actions pipeline run — all 4 gates passed. Image pushed to GHCR with commit SHA tag. Trivy detected and blocked a real CRITICAL CVE in the base image npm internals, proving the scanner works.",
    images: [
      { src: "/images/p02/01-pipeline-success.png", width: 1528, height: 248, alt: "GitHub Actions showing both the P02 CI/CD pipeline and portfolio CI workflows passing with green checkmarks", caption: "All 4 gates passed: lint/test → build/scan → push to GHCR → deploy" },
      { src: "/images/p02/02-ghcr-image.png", width: 781, height: 441, alt: "GitHub Container Registry showing p02-app image published with latest and SHA tags", caption: "Immutable image pushed to GHCR: tagged latest + sha-fcf3bc1" },
    ],
  },
  "observability-and-incident-response": {
    intro: "Real screenshots from a live failure simulation. Timestamps visible in Prometheus — 2026-11-02.",
    images: [
      { src: "/images/p04/01-grafana-app-up.png", width: 1919, height: 909, alt: "Grafana dashboard showing App Availability UP with request rate traffic visible", caption: "App healthy: Grafana showing UP status and live request rate" },
      { src: "/images/p04/02-prometheus-appdown-pending.png", width: 1919, height: 907, alt: "Prometheus alerts page showing AppDown alert in PENDING state", caption: "AppDown alert PENDING after app container stopped" },
      { src: "/images/p04/03-grafana-app-down.png", width: 1919, height: 905, alt: "Grafana dashboard showing App Availability DOWN in red with request rate dropping to zero", caption: "Grafana showing DOWN — request rate drops to zero" },
      { src: "/images/p04/04-prometheus-resolved.png", width: 1919, height: 911, alt: "Prometheus alerts page showing all alerts inactive after app recovery", caption: "All alerts resolved after app container restarted" },
    ],
  },
  "aws-backup-and-disaster-recovery": {
    intro:
      "Real backup and restore exercise against LocalStack S3. RTO measured at 0.3 seconds — well within the 15-minute target. Timestamps visible — 2026-11-02.",
    images: [
      { src: "/images/p05/01-terraform-apply.png", width: 643, height: 162, alt: "Terraform apply output showing S3 bucket, encryption, IAM user and policy created", caption: "Infrastructure provisioned: S3 bucket with SSE-AES256, IAM least-privilege user" },
      { src: "/images/p05/02-backup-complete.png", width: 1020, height: 455, alt: "Backup script output showing archive created, checksums generated and uploaded to S3", caption: "Backup complete: archive + SHA-256 checksums uploaded to S3" },
      { src: "/images/p05/03-restore-complete.png", width: 782, height: 363, alt: "Restore script output showing files downloaded, checksum verified, extracted and RTO of 0.3 seconds", caption: "Restore complete: checksum verified, RTO = 0.3s" },
      { src: "/images/p05/04-terraform-destroy.png", width: 845, height: 375, alt: "Terraform destroy output showing all resources destroyed cleanly", caption: "Clean teardown: all resources destroyed" },
    ],
  },
};
