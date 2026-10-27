# P02 — Secure CI/CD Pipeline

**Stack:** GitHub Actions · Docker · GHCR · Trivy · Vitest

## Problem
Manual builds and deployments increase human error and release risk without auditability.

## Solution
A GitHub Actions pipeline with four gates: PR validation → unit tests + lint →
Docker image build + vulnerability scan → immutable image push to GHCR → gated deploy.

## Pipeline flow

```
PR opened / push to main
        │
        ▼
┌───────────────┐
│  lint-test    │  ESLint + Vitest unit tests
│  (PR gate)    │  ✗ Fails → blocks merge
└──────┬────────┘
       │ pass
       ▼
┌───────────────┐
│  build-scan   │  Docker build
│               │  Trivy vulnerability scan
│               │  ✗ CRITICAL CVE → fails
└──────┬────────┘
       │ pass
       ▼
┌───────────────┐
│  push-image   │  Push immutable image to GHCR
│               │  Tagged: sha-<commit> + latest
└──────┬────────┘
       │ main branch only
       ▼
┌───────────────┐
│  deploy       │  Pull & run container locally
│               │  Health check  ✓
│               │  Rollback on failure
└───────────────┘
```

## Prerequisites

- Docker
- GitHub account (for Actions + GHCR)
- Push repository to GitHub and enable Actions

## Local development

```bash
cd projects/p02-cicd-pipeline

# Install app dependencies
cd app && npm install && cd ..

# Run tests locally
cd app && npm test && cd ..

# Build Docker image locally
docker build -t p02-app:local ./app

# Run locally
docker run -p 3001:3001 p02-app:local

# Test
curl http://localhost:3001/health
```

## GitHub setup

1. Push this folder to a GitHub repository
2. GHCR uses your GitHub token automatically — no extra secrets needed
3. Push to `main` to trigger the full pipeline

## Security controls
- Pinned action versions (SHA digests in production; tags shown here for readability)
- Least-privilege GitHub token permissions per job
- No secrets in Dockerfile or source code
- Trivy blocks on CRITICAL severity CVEs
- Image tagged with commit SHA for immutability

## Rollback

```bash
# Pull previous image by SHA tag
docker pull ghcr.io/YOUR_USERNAME/p02-app:sha-<previous-sha>
docker stop p02-app && docker rm p02-app
docker run -d --name p02-app -p 3001:3001 ghcr.io/YOUR_USERNAME/p02-app:sha-<previous-sha>
```

## License
MIT
