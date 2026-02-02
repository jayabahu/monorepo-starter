output "scheduled_rule_arn" {
  value = aws_cloudwatch_event_rule.scheduled_pipeline.arn
}

output "content_rule_arn" {
  value = aws_cloudwatch_event_rule.content_events.arn
}
