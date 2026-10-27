provider "aws" {
  region = var.aws_region

  dynamic "endpoints" {
    for_each = var.use_localstack ? [1] : []
    content {
      s3  = "http://localhost:4566"
      iam = "http://localhost:4566"
      sts = "http://localhost:4566"
    }
  }

  skip_credentials_validation = var.use_localstack
  skip_requesting_account_id  = var.use_localstack
  skip_metadata_api_check     = var.use_localstack
  access_key                  = var.use_localstack ? "test" : null
  secret_key                  = var.use_localstack ? "test" : null
}

locals {
  bucket_name = "${var.bucket_prefix}-${var.environment}"
  common_tags = {
    Project     = "p05-backup-dr"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# ── S3 Bucket ────────────────────────────────────────────────────────────────

resource "aws_s3_bucket" "backup" {
  bucket        = local.bucket_name
  force_destroy = true # allow destroy with objects during testing

  tags = local.common_tags
}

# Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "backup" {
  bucket = aws_s3_bucket.backup.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block all public access
resource "aws_s3_bucket_public_access_block" "backup" {
  bucket                  = aws_s3_bucket.backup.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Lifecycle: expire backups after 30 days
resource "aws_s3_bucket_lifecycle_configuration" "backup" {
  bucket = aws_s3_bucket.backup.id

  rule {
    id     = "expire-old-backups"
    status = "Enabled"

    filter {
      prefix = "backups/"
    }

    expiration {
      days = 30
    }
  }
}

# ── IAM: least-privilege backup user ────────────────────────────────────────

resource "aws_iam_user" "backup" {
  name = "p05-backup-user-${var.environment}"
  tags = local.common_tags
}

data "aws_iam_policy_document" "backup" {
  statement {
    sid    = "AllowBackupOperations"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject",
    ]
    resources = [
      aws_s3_bucket.backup.arn,
      "${aws_s3_bucket.backup.arn}/*",
    ]
  }
}

resource "aws_iam_user_policy" "backup" {
  name   = "p05-backup-policy"
  user   = aws_iam_user.backup.name
  policy = data.aws_iam_policy_document.backup.json
}

resource "aws_iam_access_key" "backup" {
  user = aws_iam_user.backup.name
}

# ── Outputs ──────────────────────────────────────────────────────────────────

output "bucket_name" {
  value = aws_s3_bucket.backup.id
}

output "bucket_arn" {
  value = aws_s3_bucket.backup.arn
}

output "backup_user_access_key_id" {
  value     = aws_iam_access_key.backup.id
  sensitive = true
}

output "backup_user_secret_access_key" {
  value     = aws_iam_access_key.backup.secret
  sensitive = true
}
