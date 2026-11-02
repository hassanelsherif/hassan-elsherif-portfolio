"""
P05 Backup script — creates a timestamped tarball, generates SHA-256 checksums,
and uploads to S3 via boto3 (LocalStack or real AWS).
"""
import os
import hashlib
import tarfile
import tempfile
import subprocess
from datetime import datetime, timezone
from pathlib import Path

# ── Configuration ─────────────────────────────────────────────────────────────
DATA_DIR    = os.environ.get("DATA_DIR", "./test-data")
BUCKET      = os.environ.get("BACKUP_BUCKET", "p05-backup-local")
S3_ENDPOINT = os.environ.get("S3_ENDPOINT", "http://localhost:4566")
TIMESTAMP   = datetime.now(timezone.utc).strftime("%Y-%m-%d_%H-%M-%S")
PREFIX      = f"backups/{TIMESTAMP}"

try:
    import boto3
    from botocore.config import Config
except ImportError:
    import subprocess, sys
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

print("=== P05 Backup ===")
print(f"Timestamp:  {TIMESTAMP}")
print(f"Source:     {DATA_DIR}")
print(f"Bucket:     {BUCKET}")
print()

s3 = get_s3()

with tempfile.TemporaryDirectory() as tmp:
    archive       = os.path.join(tmp, "data.tar.gz")
    checksum_file = os.path.join(tmp, "checksums.sha256")

    # Step 1: Archive
    print("[1/4] Creating archive...")
    with tarfile.open(archive, "w:gz") as tar:
        tar.add(DATA_DIR, arcname=os.path.basename(DATA_DIR))
    size_kb = os.path.getsize(archive) / 1024
    print(f"      Archive size: {size_kb:.1f} KB")

    # Step 2: Checksums
    print("[2/4] Generating checksums...")
    lines = [f"{sha256(archive)}  data.tar.gz"]
    for fpath in sorted(Path(DATA_DIR).rglob("*")):
        if fpath.is_file():
            lines.append(f"{sha256(fpath)}  {fpath}")
    with open(checksum_file, "w") as f:
        f.write("\n".join(lines))
    for l in lines:
        print(f"      {l}")

    # Step 3: Upload via boto3
    print("\n[3/4] Uploading to S3...")
    s3.upload_file(archive,       BUCKET, f"{PREFIX}/data.tar.gz")
    s3.upload_file(checksum_file, BUCKET, f"{PREFIX}/checksums.sha256")
    print("      Upload complete.")

    # Step 4: Verify
    print("[4/4] Verifying upload...")
    resp = s3.list_objects_v2(Bucket=BUCKET, Prefix=PREFIX)
    for obj in resp.get("Contents", []):
        print(f"      {obj['Key']}  ({obj['Size']} bytes)")

# Save backup ID
Path(".last-backup-id").write_text(TIMESTAMP)

print(f"\n=== Backup complete ===")
print(f"Backup ID: {TIMESTAMP}")
print(f"Location:  s3://{BUCKET}/{PREFIX}/")
