variable "project" { type = string }
variable "environment" { type = string }
variable "step_functions_role_arn" { type = string }
variable "ingest_lambda_arn" { type = string }
variable "process_lambda_arn" { type = string }
variable "store_lambda_arn" { type = string }
variable "notify_lambda_arn" { type = string }
