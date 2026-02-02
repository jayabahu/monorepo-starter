output "vpc_id" {
  value = module.vpc.vpc_id
}

output "alb_dns_name" {
  value = module.alb.dns_name
}

output "rds_endpoint" {
  value     = module.rds.endpoint
  sensitive = true
}

output "redis_endpoint" {
  value     = module.elasticache.endpoint
  sensitive = true
}

output "s3_bucket" {
  value = module.s3.bucket_name
}

output "api_ecr_url" {
  value = module.ecr.api_repository_url
}

output "dashboard_ecr_url" {
  value = module.ecr.dashboard_repository_url
}

output "state_machine_arn" {
  value = module.step_functions.state_machine_arn
}
