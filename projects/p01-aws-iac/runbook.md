# P01 Runbook — AWS Infrastructure as Code

## Deploy

```bash
cd projects/p01-aws-iac
docker-compose up -d localstack
cd terraform
terraform init
terraform plan -var-file=environments/local.tfvars -out=tfplan
terraform apply tfplan
```

## Validate

```bash
# Check outputs
terraform output

# Hit the app
curl http://$(terraform output -raw instance_public_ip)

# Idempotency — must show 0 to add, 0 to change, 0 to destroy
terraform plan -var-file=environments/local.tfvars

# Review security group — confirm no port 22
aws --endpoint-url=http://localhost:4566 ec2 describe-security-groups \
  --query 'SecurityGroups[*].IpPermissions'
```

## Troubleshoot

| Symptom | Likely cause | Fix |
|---|---|---|
| `connection refused` on port 4566 | LocalStack not ready | Wait 10s, retry `curl http://localhost:4566/_localstack/health` |
| `Error: No valid credential sources` | Not using local.tfvars | Add `-var-file=environments/local.tfvars` |
| `InvalidAMIID` | LocalStack AMI data source | Set `ami_id = "ami-00000000"` in tfvars |

## Roll back
Terraform tracks state — to revert to a previous version, use `terraform apply` with the
previous configuration. For a full rollback, run destroy and re-apply.

## Destroy / clean up

```bash
terraform destroy -var-file=environments/local.tfvars -auto-approve
cd ..
docker-compose down -v
```

Verify no billable resources remain:
```bash
aws --endpoint-url=http://localhost:4566 ec2 describe-instances \
  --query 'Reservations[*].Instances[*].InstanceId'
# Should return []
```
