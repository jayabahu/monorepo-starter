import type { OnModuleDestroy } from "@nestjs/common";
import { Injectable, Inject } from "@nestjs/common";
import type Redis from "ioredis";
import { REDIS_PUB, REDIS_SUB } from "./redis.constants";

type MessageHandler = (message: string) => void;

@Injectable()
export class PubSubService implements OnModuleDestroy {
  private handlers = new Map<string, Set<MessageHandler>>();

  constructor(
    @Inject(REDIS_PUB) private readonly pub: Redis,
    @Inject(REDIS_SUB) private readonly sub: Redis,
  ) {
    this.sub.on("message", (channel: string, message: string) => {
      const channelHandlers = this.handlers.get(channel);
      if (channelHandlers) {
        for (const handler of channelHandlers) {
          handler(message);
        }
      }
    });
  }

  async publish(channel: string, payload: unknown): Promise<void> {
    await this.pub.publish(channel, JSON.stringify(payload));
  }

  async subscribe(channel: string, handler: MessageHandler): Promise<void> {
    if (!this.handlers.has(channel)) {
      this.handlers.set(channel, new Set());
      await this.sub.subscribe(channel);
    }
    this.handlers.get(channel)!.add(handler);
  }

  async unsubscribe(channel: string, handler: MessageHandler): Promise<void> {
    const channelHandlers = this.handlers.get(channel);
    if (channelHandlers) {
      channelHandlers.delete(handler);
      if (channelHandlers.size === 0) {
        this.handlers.delete(channel);
        await this.sub.unsubscribe(channel);
      }
    }
  }

  asyncIterator<T>(channel: string): AsyncIterableIterator<T> {
    const pullQueue: ((value: IteratorResult<T>) => void)[] = [];
    const pushQueue: T[] = [];
    let done = false;

    const handler = (message: string) => {
      const value = JSON.parse(message) as T;
      if (pullQueue.length > 0) {
        pullQueue.shift()!({ value, done: false });
      } else {
        pushQueue.push(value);
      }
    };

    this.subscribe(channel, handler);

    return {
      next: () => {
        if (done) return Promise.resolve({ value: undefined as T, done: true });
        if (pushQueue.length > 0) {
          return Promise.resolve({ value: pushQueue.shift()!, done: false });
        }
        return new Promise<IteratorResult<T>>((resolve) => {
          pullQueue.push(resolve);
        });
      },
      return: () => {
        done = true;
        this.unsubscribe(channel, handler);
        return Promise.resolve({ value: undefined as T, done: true });
      },
      throw: (error: unknown) => {
        done = true;
        this.unsubscribe(channel, handler);
        return Promise.reject(error);
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }

  async onModuleDestroy() {
    this.handlers.clear();
  }
}
