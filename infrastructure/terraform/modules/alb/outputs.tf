output "dns_name" {
  value = aws_lb.main.dns_name
}

output "target_group_api_arn" {
  value = aws_lb_target_group.api.arn
}

output "target_group_dashboard_arn" {
  value = aws_lb_target_group.dashboard.arn
}

output "security_group_id" {
  value = aws_security_group.alb.id
}
