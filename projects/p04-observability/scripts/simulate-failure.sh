#!/bin/bash
# P04 — Failure simulation script
# Simulates an app outage and recovery, demonstrating the full alert cycle.

set -euo pipefail

APP_URL="http://localhost:3001"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "=== P04 Failure Simulation ==="
echo "Started: $TIMESTAMP"
echo ""

# Step 1: Verify app is healthy before simulation
echo "[1/5] Verifying baseline health..."
curl -sf "$APP_URL/health" | python3 -m json.tool
echo ""

# Step 2: Generate some normal traffic
echo "[2/5] Generating baseline traffic (30s)..."
for i in $(seq 1 30); do
  curl -sf "$APP_URL/" > /dev/null
  curl -sf "$APP_URL/health" > /dev/null
  sleep 1
done
echo "Baseline traffic complete."
echo ""

# Step 3: Simulate failure — restart container with SIMULATE_DOWN=true
echo "[3/5] Simulating app failure..."
docker-compose stop app
docker-compose run -d --rm \
  -e SIMULATE_DOWN=true \
  -p 3001:3001 \
  --name p04-app-failing \
  app node src/index.js

echo "App is now returning 503 on /health"
echo "Check Prometheus: http://localhost:9090/alerts"
echo "Check Alertmanager: http://localhost:9093"
echo ""
echo "Waiting 90s for AppDown alert to fire (requires 1m of down status)..."
sleep 90

# Step 4: Confirm alert fired
echo "[4/5] Alert should now be firing. Check:"
echo "  Prometheus Alerts: http://localhost:9090/alerts"
echo "  Alertmanager: http://localhost:9093/#/alerts"
echo ""

# Step 5: Recover
echo "[5/5] Recovering app..."
docker stop p04-app-failing 2>/dev/null || true
docker-compose up -d app

echo "Waiting for recovery..."
sleep 15
curl -sf "$APP_URL/health" | python3 -m json.tool

echo ""
echo "=== Simulation complete ==="
echo "The alert should now show as 'Resolved' in Alertmanager."
echo "Capture timestamps from Grafana dashboard for the incident report."
