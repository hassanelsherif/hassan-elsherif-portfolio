# P02 Runbook — Secure CI/CD Pipeline

## Local development

```bash
cd projects/p02-cicd-pipeline/app
npm install
npm test          # run unit tests
npm run lint      # lint check
node src/index.js # start app on port 3001
curl http://localhost:3001/health
```

## Build and run Docker image locally

```bash
cd projects/p02-cicd-pipeline/app
docker build -t p02-app:local .
docker run -d --name p02-app -p 3001:3001 p02-app:local
curl http://localhost:3001/health
```

## Trigger the pipeline

Push to main branch — GitHub Actions runs all four gates automatically.
Pull requests trigger only the lint-test gate (no image push).

## Validate pipeline success

In GitHub → Actions tab:
- lint-test: green ✓
- build-scan: green ✓ (Trivy shows no CRITICAL CVEs)
- push-image: green ✓ (image appears in Packages tab)
- deploy: green ✓ (health check passes)

## Verify image in GHCR

```bash
docker pull ghcr.io/YOUR_USERNAME/p02-app:latest
docker inspect ghcr.io/YOUR_USERNAME/p02-app:latest | grep -i digest
```

## Rollback

```bash
# Replace <sha> with the previous commit SHA
docker pull ghcr.io/YOUR_USERNAME/p02-app:sha-<sha>
docker stop p02-app && docker rm p02-app
docker run -d --name p02-app -p 3001:3001 \
  ghcr.io/YOUR_USERNAME/p02-app:sha-<sha>
curl http://localhost:3001/health
```

## Simulate a failing build

1. Introduce a test failure in `app/src/index.test.js`
2. Push to a branch and open a PR
3. Observe the lint-test job fail and block the PR

## Clean up

```bash
docker stop p02-app && docker rm p02-app
docker rmi p02-app:local
```
