resource "aws_security_group" "lambda" {
  name_prefix = "${var.project}-${var.environment}-lambda-"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-${var.environment}-lambda"
  }
}

locals {
  handlers = ["ingest", "process", "store", "notify"]
}

resource "aws_cloudwatch_log_group" "lambda" {
  for_each          = toset(local.handlers)
  name              = "/aws/lambda/${var.project}-${var.environment}-${each.key}"
  retention_in_days = 30
}

resource "aws_lambda_function" "handlers" {
  for_each = toset(local.handlers)

  function_name = "${var.project}-${var.environment}-${each.key}"
  role          = var.lambda_role_arn
  handler       = "handlers/${each.key}.handler"
  runtime       = "nodejs22.x"
  timeout       = 300
  memory_size   = 512

  filename         = "${path.module}/placeholder.zip"
  source_code_hash = filebase64sha256("${path.module}/placeholder.zip")

  vpc_config {
    subnet_ids         = var.private_subnet_ids
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = {
      NODE_ENV     = var.environment
      DATABASE_URL = var.database_url
      S3_BUCKET    = var.s3_bucket
    }
  }

  depends_on = [aws_cloudwatch_log_group.lambda]

  tags = {
    Name = "${var.project}-${var.environment}-${each.key}"
  }
}
