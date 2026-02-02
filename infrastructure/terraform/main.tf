terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket         = "myapp-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "myapp-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "myapp"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

module "vpc" {
  source = "./modules/vpc"

  project     = var.project
  environment = var.environment
  aws_region  = var.aws_region
}

module "iam" {
  source = "./modules/iam"

  project     = var.project
  environment = var.environment
}

module "s3" {
  source = "./modules/s3"

  project     = var.project
  environment = var.environment
  cors_origins = var.cors_origins
}

module "ecr" {
  source = "./modules/ecr"

  project     = var.project
  environment = var.environment
}

module "rds" {
  source = "./modules/rds"

  project            = var.project
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  instance_class     = var.rds_instance_class
}

module "elasticache" {
  source = "./modules/elasticache"

  project            = var.project
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  node_type          = var.redis_node_type
}

module "alb" {
  source = "./modules/alb"

  project           = var.project
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  certificate_arn   = var.certificate_arn
}

module "ecs" {
  source = "./modules/ecs"

  project            = var.project
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  alb_target_group_api_arn       = module.alb.target_group_api_arn
  alb_target_group_dashboard_arn = module.alb.target_group_dashboard_arn
  api_image          = "${module.ecr.api_repository_url}:latest"
  dashboard_image    = "${module.ecr.dashboard_repository_url}:latest"
  database_url       = module.rds.connection_string
  redis_url          = module.elasticache.connection_string
  execution_role_arn = module.iam.ecs_execution_role_arn
  task_role_arn      = module.iam.ecs_task_role_arn
}

module "lambda" {
  source = "./modules/lambda"

  project            = var.project
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  lambda_role_arn    = module.iam.lambda_role_arn
  database_url       = module.rds.connection_string
  s3_bucket          = module.s3.bucket_name
}

module "step_functions" {
  source = "./modules/step-functions"

  project           = var.project
  environment       = var.environment
  step_functions_role_arn = module.iam.step_functions_role_arn
  ingest_lambda_arn  = module.lambda.ingest_function_arn
  process_lambda_arn = module.lambda.process_function_arn
  store_lambda_arn   = module.lambda.store_function_arn
  notify_lambda_arn  = module.lambda.notify_function_arn
}

module "eventbridge" {
  source = "./modules/eventbridge"

  project                = var.project
  environment            = var.environment
  state_machine_arn      = module.step_functions.state_machine_arn
  eventbridge_role_arn   = module.iam.eventbridge_role_arn
}
