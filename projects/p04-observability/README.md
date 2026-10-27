# P04 — Observability & Incident Response

**Stack:** Prometheus · Grafana · Alertmanager · Docker Compose · Node.js

## Problem
Undetected outages and latency degradation delay diagnosis and extend mean time to recovery.

## Solution
Full observability stack provisioned as code: Prometheus scrapes a demo app, Grafana
dashboards visualise availability/latency/errors/resources, Alertmanager fires on threshold
breach. A controlled failure simulation exercises the full alert → detect → remediate → resolve cycle.

## Architecture

```
  ┌─────────────┐     scrape /metrics      ┌────────────────┐
  │  Demo App   │ ◄────────────────────────│  Prometheus    │
  │  :3001      │                           │  :9090         │
  └─────────────┘                           └───────┬────────┘
                                                    │ query
  ┌─────────────────────────────┐                   ▼
  │  Alertmanager  :9093        │ ◄──── alerts ─── rules
  │  (webhook sink for testing) │                   │
  └─────────────────────────────┘                   ▼
                                           ┌────────────────┐
                                           │  Grafana       │
                                           │  :3000         │
                                           └────────────────┘
  Node Exporter :9100 ──────────────────► Prometheus (system metrics)
```

## Prerequisites

- Docker + Docker Compose

## Quick start

```bash
cd projects/p04-observability

# Start all services
docker-compose up -d

# Open Grafana
# http://localhost:3000  (admin / admin — change on first login)

# Open Prometheus
# http://localhost:9090

# Open demo app
# http://localhost:3001

# Run failure simulation
./scripts/simulate-failure.sh

# Clean up
docker-compose down -v
```

## Metrics tracked

| Metric | Description |
|---|---|
| `http_requests_total` | Request count by status code |
| `http_request_duration_seconds` | Request latency histogram |
| `app_errors_total` | Application error count |
| `up` | Target availability (1 = up, 0 = down) |
| `node_cpu_seconds_total` | CPU usage (Node Exporter) |
| `node_memory_MemAvailable_bytes` | Available memory |

## Alert rules

| Alert | Condition | Severity |
|---|---|---|
| `AppDown` | `up == 0` for 1m | critical |
| `HighErrorRate` | error rate > 10% for 2m | warning |
| `HighLatency` | p95 latency > 500ms for 5m | warning |
| `HighCpuUsage` | CPU > 80% for 5m | warning |

## License
MIT
