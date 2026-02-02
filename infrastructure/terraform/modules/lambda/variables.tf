variable "project" { type = string }
variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "lambda_role_arn" { type = string }
variable "database_url" {
  type      = string
  sensitive = true
}
variable "s3_bucket" { type = string }
