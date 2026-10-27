variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "use_localstack" {
  type    = bool
  default = true
}

variable "environment" {
  type    = string
  default = "local"
}

variable "bucket_prefix" {
  type    = string
  default = "p05-backup"
}
