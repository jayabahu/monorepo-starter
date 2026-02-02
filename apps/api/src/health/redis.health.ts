import { Injectable, Inject } from "@nestjs/common";
import type {
  HealthIndicatorResult} from "@nestjs/terminus";
import {
  HealthIndicator,
  HealthCheckError,
} from "@nestjs/terminus";
import type Redis from "ioredis";
import { REDIS } from "../redis/redis.constants";

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(@Inject(REDIS) private readonly redis: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const result = await this.redis.ping();
      if (result === "PONG") {
        return this.getStatus(key, true);
      }
      throw new Error("Redis ping failed");
    } catch {
      throw new HealthCheckError(
        "Redis health check failed",
        this.getStatus(key, false),
      );
    }
  }
}
