#!/usr/bin/env python3
"""
P05 Restore script
Downloads the latest (or specified) backup from S3, verifies checksums,
and extracts to the restore path. Measures and reports RTO.
"""

import os
import sys
import time
import hashlib
import tarfile
import tempfile
import subprocess
from pathlib import Path
from datetime import datetime, timezone

# ── Configuration ─────────────────────────────────────────────────────────────
BUCKET = os.environ.get("BACKUP_BUCKET", "p05-backup-local")
S3_ENDPOINT = os.environ.get("S3_ENDPOINT", "http://localhost:4566")
RESTORE_PATH = os.environ.get("RESTORE_PATH", "./restored-data")
BACKUP_ID = os.environ.get("BACKUP_ID", "")  # leave empty for latest


def run_aws(args: list[str]) -> str:
    """Run an AWS CLI command against the configured endpoint."""
    cmd = ["aws", "--endpoint-url", S3_ENDPOINT] + args
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return result.stdout.strip()


def get_latest_backup_id() -> str:
    """List backups/ prefix and return the most recent timestamp folder."""
    output = run_aws(["s3", "ls", f"s3://{BUCKET}/backups/"])
    lines = [l.strip() for l in output.splitlines() if l.strip()]
    if not lines:
        raise RuntimeError("No backups found in bucket")
    # Lines look like: "PRE 2024-01-15_12-00-00/"
    folders = [l.split()[-1].rstrip("/") for l in lines if "PRE" in l]
    folders.sort()
    return folders[-1]


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    rto_start = time.time()
    print("=== P05 Restore ===")
    print(f"Started: {datetime.now(timezone.utc).isoformat()}")
    print()

    # ── Step 1: Determine backup ID ──────────────────────────────────────────
    backup_id = BACKUP_ID
    if not backup_id:
        # Try reading from manifest written by backup.sh
        manifest = Path(".last-backup-id")
        if manifest.exists():
            backup_id = manifest.read_text().strip()
        else:
            print("[1/5] Finding latest backup...")
            backup_id = get_latest_backup_id()
    print(f"[1/5] Restoring backup: {backup_id}")
    prefix = f"backups/{backup_id}"

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        archive_path = tmp_path / "data.tar.gz"
        checksum_path = tmp_path / "checksums.sha256"

        # ── Step 2: Download ─────────────────────────────────────────────────
        print(f"[2/5] Downloading from s3://{BUCKET}/{prefix}/...")
        run_aws(["s3", "cp", f"s3://{BUCKET}/{prefix}/data.tar.gz", str(archive_path)])
        run_aws(["s3", "cp", f"s3://{BUCKET}/{prefix}/checksums.sha256", str(checksum_path)])
        print(f"      Archive size: {archive_path.stat().st_size / 1024:.1f} KB")

        # ── Step 3: Verify checksum ──────────────────────────────────────────
        print("[3/5] Verifying archive checksum...")
        actual = sha256_file(archive_path)
        checksum_lines = checksum_path.read_text().splitlines()
        expected = checksum_lines[0].split()[0]  # first line = archive checksum

        if actual != expected:
            print(f"CHECKSUM MISMATCH!")
            print(f"  Expected: {expected}")
            print(f"  Actual:   {actual}")
            sys.exit(1)
        print(f"      Checksum OK: {actual[:16]}...")

        # ── Step 4: Extract ──────────────────────────────────────────────────
        print(f"[4/5] Extracting to {RESTORE_PATH}...")
        restore_path = Path(RESTORE_PATH)
        restore_path.mkdir(parents=True, exist_ok=True)

        with tarfile.open(archive_path, "r:gz") as tar:
            tar.extractall(path=restore_path)

        print(f"      Extracted files:")
        for f in sorted(restore_path.rglob("*")):
            if f.is_file():
                print(f"        {f.relative_to(restore_path)}")

        # ── Step 5: Report RTO ───────────────────────────────────────────────
        rto_seconds = time.time() - rto_start
        print()
        print("[5/5] Restore complete.")
        print(f"      Backup ID:    {backup_id}")
        print(f"      Restore path: {RESTORE_PATH}")
        print(f"      RTO measured: {rto_seconds:.1f} seconds")
        print()

        if rto_seconds <= 900:  # 15 minute target
            print(f"✓ RTO target met (≤ 15 minutes): {rto_seconds:.1f}s")
        else:
            print(f"✗ RTO target MISSED (> 15 minutes): {rto_seconds:.1f}s")

        print()
        print("=== Restore complete ===")


if __name__ == "__main__":
    main()
