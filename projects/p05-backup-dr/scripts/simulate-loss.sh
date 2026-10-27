#!/bin/bash
# Simulates accidental data loss by removing the test dataset.
# Run this before restore.py to demonstrate the DR scenario.

set -euo pipefail

DATA_DIR="${DATA_DIR:-./test-data}"

echo "=== Simulating data loss ==="
echo "Removing: $DATA_DIR"

if [ ! -d "$DATA_DIR" ]; then
  echo "ERROR: $DATA_DIR does not exist. Run create-test-data.sh first."
  exit 1
fi

rm -rf "$DATA_DIR"
echo "Data deleted. Run 'python3 scripts/restore.py' to recover."
