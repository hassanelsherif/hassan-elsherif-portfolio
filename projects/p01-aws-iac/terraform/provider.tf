provider "aws" {
  region = var.aws_region

  # LocalStack endpoint override — only active when use_localstack = true
  dynamic "endpoints" {
    for_each = var.use_localstack ? [1] : []
    content {
      ec2 = "http://localhost:4566"
      iam = "http://localhost:4566"
      ssm = "http://localhost:4566"
      s3  = "http://localhost:4566"
      sts = "http://localhost:4566"
    }
  }

  # LocalStack does not validate real credentials
  skip_credentials_validation = var.use_localstack
  skip_requesting_account_id  = var.use_localstack
  skip_metadata_api_check     = var.use_localstack

  access_key = var.use_localstack ? "test" : null
  secret_key = var.use_localstack ? "test" : null
}
