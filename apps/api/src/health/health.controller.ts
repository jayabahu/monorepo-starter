import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
} from "@nestjs/terminus";
import type { HealthCheckResult } from "@nestjs/terminus";
import { RedisHealthIndicator } from "./redis.health";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.redis.isHealthy("redis")]);
  }
}
