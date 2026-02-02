resource "aws_cloudwatch_log_group" "step_functions" {
  name              = "/stepfunctions/${var.project}-${var.environment}-pipeline"
  retention_in_days = 30
}

resource "aws_sfn_state_machine" "pipeline" {
  name     = "${var.project}-${var.environment}-pipeline"
  role_arn = var.step_functions_role_arn

  definition = jsonencode({
    Comment = "MyApp content pipeline"
    StartAt = "Ingest"
    States = {
      Ingest = {
        Type     = "Task"
        Resource = var.ingest_lambda_arn
        Next     = "Process"
        Retry = [{
          ErrorEquals     = ["States.TaskFailed"]
          IntervalSeconds = 5
          MaxAttempts     = 2
          BackoffRate     = 2
        }]
        Catch = [{
          ErrorEquals = ["States.ALL"]
          Next        = "HandleError"
        }]
      }
      Process = {
        Type     = "Task"
        Resource = var.process_lambda_arn
        Next     = "Store"
        Retry = [{
          ErrorEquals     = ["States.TaskFailed"]
          IntervalSeconds = 5
          MaxAttempts     = 2
          BackoffRate     = 2
        }]
        Catch = [{
          ErrorEquals = ["States.ALL"]
          Next        = "HandleError"
        }]
      }
      Store = {
        Type     = "Task"
        Resource = var.store_lambda_arn
        Next     = "Notify"
        Retry = [{
          ErrorEquals     = ["States.TaskFailed"]
          IntervalSeconds = 5
          MaxAttempts     = 2
          BackoffRate     = 2
        }]
        Catch = [{
          ErrorEquals = ["States.ALL"]
          Next        = "HandleError"
        }]
      }
      Notify = {
        Type     = "Task"
        Resource = var.notify_lambda_arn
        End      = true
        Retry = [{
          ErrorEquals     = ["States.TaskFailed"]
          IntervalSeconds = 5
          MaxAttempts     = 2
          BackoffRate     = 2
        }]
        Catch = [{
          ErrorEquals = ["States.ALL"]
          Next        = "HandleError"
        }]
      }
      HandleError = {
        Type  = "Fail"
        Error = "PipelineError"
        Cause = "An error occurred in the pipeline"
      }
    }
  })

  logging_configuration {
    log_destination        = "${aws_cloudwatch_log_group.step_functions.arn}:*"
    include_execution_data = true
    level                  = "ERROR"
  }

  tags = {
    Name = "${var.project}-${var.environment}-pipeline"
  }
}
