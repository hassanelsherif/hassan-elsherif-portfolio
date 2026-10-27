variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "use_localstack" {
  description = "Set to true to target LocalStack instead of real AWS"
  type        = bool
  default     = true
}

variable "environment" {
  description = "Environment name (local, dev, prod)"
  type        = string
  default     = "local"

  validation {
    condition     = contains(["local", "dev", "prod"], var.environment)
    error_message = "environment must be one of: local, dev, prod"
  }
}

variable "project_name" {
  description = "Short project identifier used in resource names"
  type        = string
  default     = "p01-iac"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance (leave empty to use latest Amazon Linux 2 via data source)"
  type        = string
  default     = ""
}
