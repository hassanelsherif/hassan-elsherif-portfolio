#!/bin/bash
# Verifies that restored files match original checksums.

set -euo pipefail

RESTORE_PATH="${RESTORE_PATH:-./restored-data}"
BUCKET="${BACKUP_BUCKET:-p05-backup-local}"
S3_ENDPOINT="${S3_ENDPOINT:-http://localhost:4566}"

echo "=== Restore verification ==="

# Get backup ID
if [ -f ".last-backup-id" ]; then
  BACKUP_ID=$(cat .last-backup-id)
else
  echo "ERROR: .last-backup-id not found. Run backup.sh first."
  exit 1
fi

# Download stored checksums
CHECKSUM_FILE="/tmp/p05-verify-checksums.sha256"
aws --endpoint-url="$S3_ENDPOINT" s3 cp \
  "s3://${BUCKET}/backups/${BACKUP_ID}/checksums.sha256" \
  "$CHECKSUM_FILE"

echo "Stored checksums from backup $BACKUP_ID:"
cat "$CHECKSUM_FILE"
echo ""

# Verify each original file exists in restored location
echo "Checking restored files..."
PASS=0
FAIL=0

while IFS= read -r line; do
  CHECKSUM=$(echo "$line" | awk '{print $1}')
  FILEPATH=$(echo "$line" | awk '{print $2}')

  # Skip the archive checksum (first line)
  if [[ "$FILEPATH" == *"data.tar.gz"* ]]; then
    continue
  fi

  # Map original path to restored path
  FILENAME=$(basename "$FILEPATH")
  RESTORED_FILE=$(find "$RESTORE_PATH" -name "$FILENAME" 2>/dev/null | head -1)

  if [ -z "$RESTORED_FILE" ]; then
    echo "  MISSING: $FILENAME"
    ((FAIL++))
    continue
  fi

  ACTUAL=$(sha256sum "$RESTORED_FILE" | awk '{print $1}')
  if [ "$ACTUAL" = "$CHECKSUM" ]; then
    echo "  OK: $FILENAME"
    ((PASS++))
  else
    echo "  MISMATCH: $FILENAME"
    echo "    Expected: $CHECKSUM"
    echo "    Actual:   $ACTUAL"
    ((FAIL++))
  fi
done < "$CHECKSUM_FILE"

echo ""
echo "Results: $PASS passed, $FAIL failed"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ All files restored and verified successfully."
  exit 0
else
  echo "✗ Restore verification FAILED."
  exit 1
fi
