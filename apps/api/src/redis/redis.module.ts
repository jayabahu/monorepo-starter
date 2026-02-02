import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { PubSubService } from "./pubsub.service";
import { REDIS, REDIS_PUB, REDIS_SUB } from "./redis.constants";

@Global()
@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: (config: ConfigService) => {
        const url = config.getOrThrow<string>("REDIS_URL");
        return new Redis(url);
      },
      inject: [ConfigService],
    },
    {
      provide: REDIS_PUB,
      useFactory: (config: ConfigService) => {
        const url = config.getOrThrow<string>("REDIS_URL");
        return new Redis(url);
      },
      inject: [ConfigService],
    },
    {
      provide: REDIS_SUB,
      useFactory: (config: ConfigService) => {
        const url = config.getOrThrow<string>("REDIS_URL");
        return new Redis(url);
      },
      inject: [ConfigService],
    },
    PubSubService,
  ],
  exports: [REDIS, REDIS_PUB, REDIS_SUB, PubSubService],
})
export class RedisModule {}
