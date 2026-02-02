output "endpoint" {
  value = aws_elasticache_replication_group.main.primary_endpoint_address
}

output "connection_string" {
  value     = "rediss://${aws_elasticache_replication_group.main.primary_endpoint_address}:6379"
  sensitive = true
}
