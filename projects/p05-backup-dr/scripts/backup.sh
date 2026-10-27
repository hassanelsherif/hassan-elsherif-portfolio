#!/bin/bash
# P05 backup script — creates a timestamped tarball, generates checksums,
# and uploads to S3 (LocalStack or real AWS).

set -euo pipefail

# ── Configuration ────────────────────────────────────────────────────────────
DATA_DIR="${DATA_DIR:-./test-data}"
BUCKET="${BACKUP_BUCKET:-p05-backup-local}"
S3_ENDPOINT="${S3_ENDPOINT:-http://localhost:4566}"
TIMESTAMP=$(date -u +"%Y-%m-%d_%H-%M-%S")
BACKUP_PREFIX="backups/${TIMESTAMP}"
WORK_DIR="/tmp/p05-backup-${TIMESTAMP}"

echo "=== P05 Backup ==="
echo "Timestamp:  $TIMESTAMP"
echo "Source:     $DATA_DIR"
echo "Bucket:     $BUCKET"
echo "Prefix:     $BACKUP_PREFIX"
echo ""

# ── Create working directory ─────────────────────────────────────────────────
mkdir -p "$WORK_DIR"
trap "rm -rf $WORK_DIR" EXIT

# ── Archive ──────────────────────────────────────────────────────────────────
echo "[1/4] Creating archive..."
ARCHIVE="$WORK_DIR/data.tar.gz"
tar -czf "$ARCHIVE" -C "$(dirname $DATA_DIR)" "$(basename $DATA_DIR)"
echo "Archive size: $(du -sh $ARCHIVE | cut -f1)"

# ── Checksums ────────────────────────────────────────────────────────────────
echo "[2/4] Generating checksums..."
CHECKSUM_FILE="$WORK_DIR/checksums.sha256"
sha256sum "$ARCHIVE" > "$CHECKSUM_FILE"
# Also store individual file checksums for granular restore verification
find "$DATA_DIR" -type f | sort | xargs sha256sum >> "$CHECKSUM_FILE"
echo "Checksums:"
cat "$CHECKSUM_FILE"

# ── Upload to S3 ─────────────────────────────────────────────────────────────
echo ""
echo "[3/4] Uploading to S3..."

AWS_ARGS="--endpoint-url=$S3_ENDPOINT"

aws $AWS_ARGS s3 cp "$ARCHIVE" "s3://${BUCKET}/${BACKUP_PREFIX}/data.tar.gz" \
  --sse AES256
aws $AWS_ARGS s3 cp "$CHECKSUM_FILE" "s3://${BUCKET}/${BACKUP_PREFIX}/checksums.sha256"

# ── Verify upload ─────────────────────────────────────────────────────────────
echo ""
echo "[4/4] Verifying upload..."
aws $AWS_ARGS s3 ls "s3://${BUCKET}/${BACKUP_PREFIX}/" --human-readable

echo ""
echo "=== Backup complete ==="
echo "Backup ID: $TIMESTAMP"
echo "Location:  s3://${BUCKET}/${BACKUP_PREFIX}/"

# Write backup manifest for restore script
echo "$TIMESTAMP" > .last-backup-id
