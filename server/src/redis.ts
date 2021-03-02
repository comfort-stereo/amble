import { RedisCache } from "apollo-server-cache-redis"
import { RedisPubSub } from "graphql-redis-subscriptions"
import Redis from "ioredis"
import { RedisConfig } from "../redis.config"

export enum RedisNamespace {
  Session = "session",
}

export function ns(namespace: RedisNamespace, key: string): string {
  return `${namespace}:${key}`
}

export function createRedis(config: RedisConfig): Redis.Redis {
  return new Redis(config)
}

export function createRedisCache(config: RedisConfig): RedisCache {
  return new RedisCache(config)
}

export function createRedisPubSub(config: RedisConfig): RedisPubSub {
  return new RedisPubSub({
    publisher: createRedis(config),
    subscriber: createRedis(config),
  })
}
