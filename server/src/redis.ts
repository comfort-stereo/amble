import Redis from "ioredis"
import config from "../redis.config"

export function createRedis(): Redis.Redis {
  return new Redis(config)
}
