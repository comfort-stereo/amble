import { PubSubEngine } from "type-graphql"
import Redis from "ioredis"
import { RedisPubSub } from "graphql-redis-subscriptions"
import config from "../pub-sub.config"

export function createPubSub(): PubSubEngine {
  return new RedisPubSub({
    publisher: new Redis(config),
    subscriber: new Redis(config),
  })
}
