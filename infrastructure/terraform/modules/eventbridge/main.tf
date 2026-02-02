resource "aws_cloudwatch_event_rule" "scheduled_pipeline" {
  name                = "${var.project}-${var.environment}-scheduled-pipeline"
  description         = "Trigger pipeline on schedule"
  schedule_expression = "rate(1 hour)"

  tags = {
    Name = "${var.project}-${var.environment}-scheduled-pipeline"
  }
}

resource "aws_cloudwatch_event_target" "step_functions" {
  rule      = aws_cloudwatch_event_rule.scheduled_pipeline.name
  target_id = "TriggerPipeline"
  arn       = var.state_machine_arn
  role_arn  = var.eventbridge_role_arn

  input = jsonencode({
    source  = "scheduled"
    payload = {}
  })
}

resource "aws_cloudwatch_event_rule" "content_events" {
  name        = "${var.project}-${var.environment}-content-events"
  description = "Trigger pipeline on content events"

  event_pattern = jsonencode({
    source      = ["myapp"]
    detail-type = ["ContentCreated", "ContentUpdated"]
  })

  tags = {
    Name = "${var.project}-${var.environment}-content-events"
  }
}

resource "aws_cloudwatch_event_target" "content_step_functions" {
  rule      = aws_cloudwatch_event_rule.content_events.name
  target_id = "TriggerContentPipeline"
  arn       = var.state_machine_arn
  role_arn  = var.eventbridge_role_arn
}
