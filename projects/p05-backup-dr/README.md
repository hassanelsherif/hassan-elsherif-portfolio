# P05 — AWS Backup & Disaster Recovery

**Stack:** AWS S3 (LocalStack) · IAM · Terraform · Bash · Python · Linux

## Problem
Accidental deletion and system failure can destroy application data without a tested recovery path.

## Solution
Automated backup of a small stateful dataset to an encrypted S3 bucket with lifecycle rules,
checksums, a scripted restore, and a timed recovery exercise. RPO/RTO measured against defined
objectives.

## RPO / RTO objectives (defined before testing)

| Objective | Target | Measured |
|---|---|---|
| RPO (Recovery Point Objective) | ≤ 1 hour | Recorded during test |
| RTO (Recovery Time Objective) | ≤ 15 minutes | Recorded during test |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Local system                                           │
│                                                         │
│  /var/app/data/         ← stateful test dataset        │
│        │                                               │
│        ▼  backup.sh (scheduled / manual)               │
│  ┌─────────────────────────────────────────────────┐   │
│  │  S3 Bucket: p05-backup-{account}                │   │
│  │  ├── backups/YYYY-MM-DD_HH-MM-SS/               │   │
│  │  │   ├── data.tar.gz                            │   │
│  │  │   └── checksums.sha256                       │   │
│  │  Lifecycle: expire after 30 days                │   │
│  │  Encryption: SSE-S3                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  restore.py ← downloads latest backup, verifies        │
│               checksum, extracts to restore path       │
└─────────────────────────────────────────────────────────┘
```

## Prerequisites

- Docker (for LocalStack)
- [Terraform](https://developer.hashicorp.com/terraform/downloads) >= 1.5.0
- Python 3.8+
- AWS CLI (for manual inspection)

## Quick start

```bash
cd projects/p05-backup-dr

# 1. Start LocalStack
docker-compose up -d localstack

# 2. Provision S3 bucket with Terraform
cd terraform
terraform init
terraform apply -var-file=environments/local.tfvars -auto-approve
cd ..

# 3. Create test dataset
bash scripts/create-test-data.sh

# 4. Run backup
bash scripts/backup.sh

# 5. Verify backup in S3
aws --endpoint-url=http://localhost:4566 s3 ls s3://p05-backup-local/ --recursive

# 6. Simulate data loss
bash scripts/simulate-loss.sh

# 7. Run restore and measure RTO
time python3 scripts/restore.py

# 8. Verify restored data matches checksums
bash scripts/verify-restore.sh

# 9. Clean up
terraform destroy -var-file=environments/local.tfvars -auto-approve
docker-compose down -v
```

## Security controls
- Least-privilege IAM policy — backup user can only PutObject/GetObject/ListBucket on the specific bucket
- Server-side encryption enabled (SSE-S3)
- No AWS credentials hardcoded — uses environment variables or instance profile
- Lifecycle rule expires old backups automatically

## License
MIT
