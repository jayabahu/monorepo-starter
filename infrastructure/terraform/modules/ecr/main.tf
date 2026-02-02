resource "aws_ecr_repository" "api" {
  name                 = "${var.project}-${var.environment}-api"
  image_tag_mutability = "MUTABLE"
  force_delete         = var.environment != "prod"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project}-${var.environment}-api"
  }
}

resource "aws_ecr_repository" "dashboard" {
  name                 = "${var.project}-${var.environment}-dashboard"
  image_tag_mutability = "MUTABLE"
  force_delete         = var.environment != "prod"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project}-${var.environment}-dashboard"
  }
}

resource "aws_ecr_lifecycle_policy" "api" {
  repository = aws_ecr_repository.api.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = {
        type = "expire"
      }
    }]
  })
}

resource "aws_ecr_lifecycle_policy" "dashboard" {
  repository = aws_ecr_repository.dashboard.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = {
        type = "expire"
      }
    }]
  })
}
