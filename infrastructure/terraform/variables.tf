variable "project" {
  description = "Project name"
  type        = string
  default     = "myapp"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "cors_origins" {
  description = "CORS allowed origins"
  type        = list(string)
  default     = ["http://localhost:3000"]
}

variable "rds_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t4g.micro"
}

variable "redis_node_type" {
  description = "ElastiCache node type"
  type        = string
  default     = "cache.t4g.micro"
}

variable "certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
  default     = ""
}
