variable "project" { type = string }
variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "alb_target_group_api_arn" { type = string }
variable "alb_target_group_dashboard_arn" { type = string }
variable "api_image" { type = string }
variable "dashboard_image" { type = string }
variable "database_url" {
  type      = string
  sensitive = true
}
variable "redis_url" {
  type      = string
  sensitive = true
}
variable "execution_role_arn" { type = string }
variable "task_role_arn" { type = string }
