#!/bin/bash
# Creates a small stateful test dataset to back up and restore

set -euo pipefail

DATA_DIR="${DATA_DIR:-./test-data}"

echo "Creating test dataset in $DATA_DIR..."
mkdir -p "$DATA_DIR"

# Simulate an application database dump
cat > "$DATA_DIR/app-db.sql" <<'SQL'
-- P05 Test dataset — simulated PostgreSQL dump
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (name, email) VALUES
  ('Alice Smith', 'alice@example.com'),
  ('Bob Jones', 'bob@example.com'),
  ('Carol White', 'carol@example.com');

CREATE TABLE configs (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT
);

INSERT INTO configs VALUES
  ('app_version', '1.2.3'),
  ('maintenance_mode', 'false');
SQL

# Simulate application config files
cat > "$DATA_DIR/app-config.json" <<'JSON'
{
  "version": "1.2.3",
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "appdb"
  },
  "features": {
    "dark_mode": true,
    "beta_features": false
  }
}
JSON

# Simulate log file
echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Application started" > "$DATA_DIR/app.log"
echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Test dataset created" >> "$DATA_DIR/app.log"

echo "Test dataset created:"
ls -la "$DATA_DIR/"
echo ""
echo "Content checksum:"
find "$DATA_DIR" -type f | sort | xargs sha256sum
