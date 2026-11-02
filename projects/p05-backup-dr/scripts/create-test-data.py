"""Creates a small stateful test dataset to back up and restore."""
import os
import json
from datetime import datetime, timezone

DATA_DIR = os.environ.get("DATA_DIR", "./test-data")
os.makedirs(DATA_DIR, exist_ok=True)

# Simulate a database dump
with open(os.path.join(DATA_DIR, "app-db.sql"), "w") as f:
    f.write("""-- P05 Test dataset
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(200));
INSERT INTO users (name, email) VALUES
  ('Alice Smith', 'alice@example.com'),
  ('Bob Jones', 'bob@example.com'),
  ('Carol White', 'carol@example.com');
""")

# Simulate app config
with open(os.path.join(DATA_DIR, "app-config.json"), "w") as f:
    json.dump({"version": "1.2.3", "database": {"host": "localhost", "port": 5432}}, f, indent=2)

# Simulate log file
with open(os.path.join(DATA_DIR, "app.log"), "w") as f:
    f.write(f"[{datetime.now(timezone.utc).isoformat()}] Application started\n")
    f.write(f"[{datetime.now(timezone.utc).isoformat()}] Test dataset created\n")

print(f"Test dataset created in {DATA_DIR}/")
for fname in os.listdir(DATA_DIR):
    fpath = os.path.join(DATA_DIR, fname)
    print(f"  {fname}  ({os.path.getsize(fpath)} bytes)")
