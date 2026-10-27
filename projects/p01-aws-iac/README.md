# P01 — AWS Infrastructure as Code

**Stack:** Terraform · AWS (LocalStack) · VPC · EC2 · IAM · SSM · Linux

## Problem
Manual cloud provisioning produces configuration drift and weak reproducibility across environments.

## Solution
Modular Terraform project that provisions a complete AWS environment using LocalStack for local
development and testing. The same code runs against real AWS by switching the provider endpoint.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  VPC  10.0.0.0/16                                   │
│  ┌──────────────────────┐                           │
│  │  Public Subnet       │                           │
│  │  10.0.1.0/24  AZ-a   │                           │
│  │  ┌───────────────┐   │                           │
│  │  │  EC2 Instance │   │──► Internet Gateway       │
│  │  │  (App Server) │   │                           │
│  │  │  SSM Agent    │   │                           │
│  │  └───────────────┘   │                           │
│  │         ▲            │                           │
│  │  Security Group      │                           │
│  │  - Egress: ALL       │                           │
│  │  - Ingress: 80 (HTTP)│                           │
│  └──────────────────────┘                           │
│                                                     │
│  IAM Role → EC2 Instance Profile → SSM Policy       │
└─────────────────────────────────────────────────────┘
```

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/downloads) >= 1.5.0
- [Docker](https://docs.docker.com/get-docker/) (for LocalStack)
- [LocalStack CLI](https://docs.localstack.cloud/getting-started/installation/) or run via Docker Compose

## Quick start (LocalStack — no AWS account needed)

```bash
# 1. Start LocalStack
docker-compose up -d localstack

# 2. Wait for LocalStack to be ready
curl http://localhost:4566/_localstack/health

# 3. Initialise Terraform
cd terraform
terraform init

# 4. Review the plan
terraform plan -var-file=environments/local.tfvars

# 5. Apply
terraform apply -var-file=environments/local.tfvars -auto-approve

# 6. Validate
terraform output
curl http://$(terraform output -raw instance_public_ip)

# 7. Idempotency check — second plan should show no changes
terraform plan -var-file=environments/local.tfvars

# 8. Clean up — destroy all resources
terraform destroy -var-file=environments/local.tfvars -auto-approve
docker-compose down
```

## Real AWS usage

```bash
# Use the aws.tfvars file and set your region/profile
terraform plan -var-file=environments/aws.tfvars
terraform apply -var-file=environments/aws.tfvars
```

## Security controls
- No SSH port open by default (SSM Session Manager used instead)
- Least-privilege IAM role — only SSM and CloudWatch permissions
- No secrets in code or state outputs
- Security group allows inbound HTTP only; all other ingress denied

## Evidence gate checklist
- [ ] `terraform fmt` — no formatting issues
- [ ] `terraform validate` — configuration valid
- [ ] `terraform plan` — reviewed, no unexpected resources
- [ ] `terraform apply` — successful, app reachable on port 80
- [ ] Second `terraform plan` — zero changes (idempotent)
- [ ] `terraform destroy` — all resources removed

## Cost note
LocalStack free tier: $0. Real AWS: EC2 t2.micro is free-tier eligible for 12 months on new accounts.
Always run `terraform destroy` after testing to avoid unexpected charges.

## License
MIT
