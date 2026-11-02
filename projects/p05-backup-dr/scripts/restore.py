"""
P05 Restore script — downloads the latest backup from S3, verifies checksums,
extracts to restore path, and measures RTO.
"""
import os
import sys
import time
import hashlib
import tarfile
import tempfile
from pathlib import Path
from datetime import datetime, timezone

BUCKET      = os.environ.get("BACKUP_BUCKET", "p05-backup-local")
S3_ENDPOINT = os.environ.get("S3_ENDPOINT", "http://localhost:4566")
RESTORE_DIR = os.environ.get("RESTORE_PATH", "./restored-data")
BACKUP_ID   = os.environ.get("BACKUP_ID", "")

try:
    import boto3
    from botocore.config import Config
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "boto3", "-q"])
    import boto3
    from botocore.config import Config

def get_s3():
    return boto3.client(
        "s3",
        endpoint_url=S3_ENDPOINT,
        aws_access_key_id="test",
        aws_secret_access_key="test",
        region_name="us-east-1",
        config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
    )

def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def get_latest_backup(s3):
    resp = s3.list_objects_v2(Bucket=BUCKET, Prefix="backups/", Delimiter="/")
    prefixes = [p["Prefix"].rstrip("/").split("/")[-1]
                for p in resp.get("CommonPrefixes", [])]
    if not prefixes:
        raise RuntimeError("No backups found in bucket")
    return sorted(prefixes)[-1]

rto_start = time.time()
print("=== P05 Restore ===")
print(f"Started: {datetime.now(timezone.utc).isoformat()}")
print()

s3 = get_s3()

# Step 1: Find backup
backup_id = BACKUP_ID
if not backup_id:
    manifest = Path(".last-backup-id")
    if manifest.exists():
        backup_id = manifest.read_text().strip()
    else:
        backup_id = get_latest_backup(s3)
print(f"[1/5] Restoring backup: {backup_id}")
prefix = f"backups/{backup_id}"

with tempfile.TemporaryDirectory() as tmp:
    archive_path  = os.path.join(tmp, "data.tar.gz")
    checksum_path = os.path.join(tmp, "checksums.sha256")

    # Step 2: Download
    print(f"[2/5] Downloading from s3://{BUCKET}/{prefix}/...")
    s3.download_file(BUCKET, f"{prefix}/data.tar.gz",       archive_path)
    s3.download_file(BUCKET, f"{prefix}/checksums.sha256",  checksum_path)
    size_kb = os.path.getsize(archive_path) / 1024
    print(f"      Archive size: {size_kb:.1f} KB")

    # Step 3: Verify checksum
    print("[3/5] Verifying archive checksum...")
    actual   = sha256(archive_path)
    expected = open(checksum_path).readline().split()[0]
    if actual != expected:
        print(f"CHECKSUM MISMATCH!\n  Expected: {expected}\n  Actual: {actual}")
        sys.exit(1)
    print(f"      Checksum OK: {actual[:16]}...")

    # Step 4: Extract
    print(f"[4/5] Extracting to {RESTORE_DIR}...")
    os.makedirs(RESTORE_DIR, exist_ok=True)
    with tarfile.open(archive_path, "r:gz") as tar:
        tar.extractall(path=RESTORE_DIR)
    for f in sorted(Path(RESTORE_DIR).rglob("*")):
        if f.is_file():
            print(f"      {f.relative_to(RESTORE_DIR)}")

    # Step 5: Report RTO
    rto = time.time() - rto_start
    print()
    print("[5/5] Restore complete.")
    print(f"      Backup ID:    {backup_id}")
    print(f"      Restore path: {RESTORE_DIR}")
    print(f"      RTO measured: {rto:.1f} seconds")
    print()
    if rto <= 900:
        print(f"✓ RTO target met (≤ 15 minutes): {rto:.1f}s")
    else:
        print(f"✗ RTO target MISSED: {rto:.1f}s")

print("\n=== Restore complete ===")
