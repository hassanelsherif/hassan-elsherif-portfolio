# P05 Runbook — AWS Backup & Disaster Recovery

## Deploy infrastructure

```bash
cd projects/p05-backup-dr
docker-compose up -d localstack

cd terraform
terraform init
terraform apply -var-file=environments/local.tfvars -auto-approve
terraform output  # note bucket name
cd ..
```

## Run backup

```bash
# Create test data
bash scripts/create-test-data.sh

# Run backup
BACKUP_BUCKET=p05-backup-local bash scripts/backup.sh

# Verify objects in S3
aws --endpoint-url=http://localhost:4566 s3 ls s3://p05-backup-local/ --recursive --human-readable
```

## Disaster recovery exercise

```bash
# 1. Record start time
echo "DR start: $(date -u)"

# 2. Simulate accidental deletion
bash scripts/simulate-loss.sh

# 3. Restore and measure RTO
time BACKUP_BUCKET=p05-backup-local RESTORE_PATH=./restored-data python3 scripts/restore.py

# 4. Verify integrity
bash scripts/verify-restore.sh

# 5. Record end time and calculate RTO
echo "DR end: $(date -u)"
```

## Validate RPO

RPO is the time between the last backup and the simulated failure.
If backup runs every hour and failure occurs 45 minutes after last backup, RPO = 45 minutes.
Compare against the ≤ 1 hour target.

## Verify encryption

```bash
aws --endpoint-url=http://localhost:4566 s3api head-object \
  --bucket p05-backup-local \
  --key backups/$(cat .last-backup-id)/data.tar.gz \
  --query 'ServerSideEncryption'
# Should return "AES256"
```

## Verify lifecycle rules

```bash
aws --endpoint-url=http://localhost:4566 s3api get-bucket-lifecycle-configuration \
  --bucket p05-backup-local
```

## Destroy / clean up

```bash
terraform destroy -var-file=environments/local.tfvars -auto-approve
docker-compose down -v
rm -rf test-data restored-data .last-backup-id
```
