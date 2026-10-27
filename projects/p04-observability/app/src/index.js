const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Prometheus metrics ──────────────────────────────────────────────────────

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [register],
});

const appErrorsTotal = new client.Counter({
  name: "app_errors_total",
  help: "Total number of application errors",
  labelNames: ["type"],
  registers: [register],
});

// ── Middleware: instrument every request ────────────────────────────────────

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({
    method: req.method,
    route: req.path,
  });
  res.on("finish", () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
    end({ status_code: res.statusCode });
  });
  next();
});

// ── Routes ──────────────────────────────────────────────────────────────────

app.get("/health", (req, res) => {
  // Failure mode: if SIMULATE_DOWN env var is set, return 503
  if (process.env.SIMULATE_DOWN === "true") {
    appErrorsTotal.inc({ type: "health_check_failure" });
    return res.status(503).json({ status: "down", reason: "simulated failure" });
  }
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/", (req, res) => {
  res.json({ message: "P04 Observability demo app" });
});

// Simulates slow endpoint — use to trigger latency alerts
app.get("/slow", async (req, res) => {
  const delay = parseInt(req.query.ms || "600", 10);
  await new Promise((r) => setTimeout(r, delay));
  res.json({ message: `Responded after ${delay}ms` });
});

// Simulates error endpoint — use to trigger error rate alerts
app.get("/error", (req, res) => {
  appErrorsTotal.inc({ type: "simulated_error" });
  res.status(500).json({ error: "Simulated application error" });
});

// Prometheus scrape endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`P04 app running on port ${PORT}`);
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});
