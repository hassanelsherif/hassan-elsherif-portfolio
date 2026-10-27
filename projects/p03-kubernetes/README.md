# P03 — Kubernetes Application Platform

**Stack:** Kubernetes · kind · Helm · Docker · Ingress-NGINX

## Problem
Containerized applications need repeatable rollout, self-healing, and safe configuration management.

## Solution
Local kind cluster with a complete Helm chart: Deployment, Service, Ingress, ConfigMap,
Secret references, liveness/readiness probes, resource limits, rolling updates, and
scaling demonstration. Pod failure recovery and rollback tested.

## Architecture

```
  Browser / curl
       │
       ▼
┌──────────────────────────────────────────┐
│  kind cluster                            │
│                                          │
│  ┌─────────────────────────────────┐     │
│  │  Ingress (ingress-nginx)        │     │
│  │  host: app.localdev             │     │
│  └──────────────┬──────────────────┘     │
│                 │                        │
│  ┌──────────────▼──────────────────┐     │
│  │  Service (ClusterIP)            │     │
│  └──────────────┬──────────────────┘     │
│                 │                        │
│  ┌──────────────▼──────────────────┐     │
│  │  Deployment  replicas: 2        │     │
│  │  ┌──────────┐  ┌──────────┐    │     │
│  │  │  Pod 1   │  │  Pod 2   │    │     │
│  │  │ readiness│  │ readiness│    │     │
│  │  │ liveness │  │ liveness │    │     │
│  │  └──────────┘  └──────────┘    │     │
│  └─────────────────────────────────┘     │
│                                          │
│  ConfigMap: app config                   │
│  Secret: app credentials (base64)        │
└──────────────────────────────────────────┘
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/) >= 3.12

## Quick start

```bash
cd projects/p03-kubernetes

# 1. Create kind cluster
kind create cluster --config kind-config.yaml --name p03-cluster

# 2. Install ingress-nginx
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

# 3. Add local DNS (run once)
# Windows: add to C:\Windows\System32\drivers\etc\hosts
# 127.0.0.1 app.localdev

# 4. Install Helm chart
helm install p03-app ./helm/p03-app --namespace p03 --create-namespace

# 5. Verify
kubectl get all -n p03
curl http://app.localdev/health

# 6. Clean up
kind delete cluster --name p03-cluster
```

## Demonstrations included

- Rolling update: `helm upgrade` with new image tag
- Scale up/down: `kubectl scale`
- Pod failure & self-healing: `kubectl delete pod`
- Rollback: `helm rollback`

## Security controls
- Non-root container (runAsNonRoot: true)
- Read-only root filesystem
- Dropped Linux capabilities
- Secrets not stored in plain text in Git
- Resource requests and limits on all containers

## License
MIT
