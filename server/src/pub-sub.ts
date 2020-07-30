import { PubSubEngine } from "type-graphql"
import { RedisPubSub } from "graphql-redis-subscriptions"
import { createRedis } from "./redis"

export function createPubSub(): PubSubEngine {
  return new RedisPubSub({
    publisher: createRedis(),
    subscriber: createRedis(),
  })
}
