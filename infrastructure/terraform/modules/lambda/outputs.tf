output "ingest_function_arn" {
  value = aws_lambda_function.handlers["ingest"].arn
}

output "process_function_arn" {
  value = aws_lambda_function.handlers["process"].arn
}

output "store_function_arn" {
  value = aws_lambda_function.handlers["store"].arn
}

output "notify_function_arn" {
  value = aws_lambda_function.handlers["notify"].arn
}
