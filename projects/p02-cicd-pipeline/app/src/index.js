const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", version: process.env.APP_VERSION || "local" });
});

// Main endpoint
app.get("/", (req, res) => {
  res.json({
    message: "P02 — Secure CI/CD Pipeline demo app",
    environment: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || "local",
  });
});

// Calculator endpoint — used for unit tests
app.post("/calculate", (req, res) => {
  const { a, b, operation } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "a and b must be numbers" });
  }

  const ops = {
    add: (x, y) => x + y,
    subtract: (x, y) => x - y,
    multiply: (x, y) => x * y,
    divide: (x, y) => {
      if (y === 0) throw new Error("Division by zero");
      return x / y;
    },
  };

  if (!ops[operation]) {
    return res.status(400).json({ error: "operation must be add, subtract, multiply, or divide" });
  }

  try {
    const result = ops[operation](a, b);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Only start listening when run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`P02 app running on port ${PORT}`);
  });
}

module.exports = app;
