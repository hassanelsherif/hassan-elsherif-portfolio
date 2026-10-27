# P03 Runbook — Kubernetes Application Platform

## Deploy

```bash
cd projects/p03-kubernetes

# Create cluster
kind create cluster --config kind-config.yaml --name p03-cluster

# Install ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

# Add to hosts file (run as Administrator on Windows)
# echo 127.0.0.1 app.localdev >> C:\Windows\System32\drivers\etc\hosts

# Install chart
helm install p03-app ./helm/p03-app --namespace p03 --create-namespace
```

## Validate

```bash
# Check all resources
kubectl get all -n p03

# Check pod status
kubectl describe pods -n p03

# Test ingress
curl http://app.localdev/health

# Check rollout history
kubectl rollout history deployment/p03-app -n p03
```

## Rolling update demonstration

```bash
# Upgrade with new values (simulates new image tag)
helm upgrade p03-app ./helm/p03-app --namespace p03 \
  --set image.tag=sha-abc1234

# Watch rollout
kubectl rollout status deployment/p03-app -n p03

# View history
kubectl rollout history deployment/p03-app -n p03
```

## Scale demonstration

```bash
# Scale up
kubectl scale deployment p03-app --replicas=4 -n p03
kubectl get pods -n p03 -w

# Scale down
kubectl scale deployment p03-app --replicas=2 -n p03
```

## Pod failure & self-healing demonstration

```bash
# Delete a pod — Deployment recreates it automatically
kubectl delete pod -l app=p03-app -n p03 --wait=false

# Watch recovery (should show new pod starting within seconds)
kubectl get pods -n p03 -w
```

## Rollback

```bash
# Roll back to previous release
helm rollback p03-app 1 --namespace p03

# Or using kubectl
kubectl rollout undo deployment/p03-app -n p03
```

## Troubleshoot

```bash
# Pod not starting
kubectl describe pod <pod-name> -n p03
kubectl logs <pod-name> -n p03

# Ingress not routing
kubectl describe ingress p03-app -n p03
kubectl logs -n ingress-nginx deploy/ingress-nginx-controller
```

## Destroy / clean up

```bash
helm uninstall p03-app --namespace p03
kubectl delete namespace p03
kind delete cluster --name p03-cluster
```
