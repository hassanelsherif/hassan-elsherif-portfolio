"""Simulates accidental data loss by removing the test dataset."""
import os
import shutil

DATA_DIR = os.environ.get("DATA_DIR", "./test-data")

if not os.path.exists(DATA_DIR):
    print(f"ERROR: {DATA_DIR} does not exist. Run create-test-data.py first.")
    exit(1)

shutil.rmtree(DATA_DIR)
print(f"=== Data loss simulated ===")
print(f"Deleted: {DATA_DIR}")
print("Run 'python3 scripts/restore.py' to recover.")
