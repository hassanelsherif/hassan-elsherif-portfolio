# P04 Runbook — Observability & Incident Response

## Deploy

```bash
cd projects/p04-observability
docker-compose up -d
docker-compose ps  # all services should show "Up"
```

Services:
| Service | URL |
|---|---|
| Demo app | http://localhost:3001 |
| Prometheus | http://localhost:9090 |
| Alertmanager | http://localhost:9093 |
| Grafana | http://localhost:3000 (admin/admin) |

## Validate

```bash
# App health
curl http://localhost:3001/health

# App metrics (Prometheus format)
curl http://localhost:3001/metrics

# Check Prometheus targets — all should be UP
# http://localhost:9090/targets

# Check alert rules loaded
# http://localhost:9090/rules
```

## Run failure simulation

```bash
bash scripts/simulate-failure.sh
```

Watch in real time:
1. Prometheus → Status → Targets: `p04-app` goes DOWN
2. Prometheus → Alerts: `AppDown` fires after 1 minute
3. Alertmanager: alert appears
4. Grafana dashboard: availability panel turns red
5. After recovery: alert resolves

## Generate test traffic

```bash
# Normal traffic
for i in $(seq 1 100); do curl -s http://localhost:3001/ > /dev/null; sleep 0.5; done

# Trigger error rate alert
for i in $(seq 1 50); do curl -s http://localhost:3001/error > /dev/null; sleep 0.1; done

# Trigger latency alert
for i in $(seq 1 20); do curl -s "http://localhost:3001/slow?ms=700" > /dev/null; done
```

## Incident report template

```
Incident: [title]
Date: [YYYY-MM-DD]
Severity: [critical/warning]
Duration: [start] → [end] = [X minutes]

Timeline:
  HH:MM - Alert fired (AppDown / HighErrorRate / HighLatency)
  HH:MM - Investigation started
  HH:MM - Root cause identified: [description]
  HH:MM - Remediation applied: [action taken]
  HH:MM - Alert resolved, service confirmed healthy

Root cause: [one sentence]
Contributing factors: [list]
Remediation: [what fixed it]
Prevention: [what will stop recurrence]
```

## Destroy / clean up

```bash
docker-compose down -v
# -v removes named volumes (Prometheus + Grafana data)
```
