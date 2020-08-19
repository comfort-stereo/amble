import { RedisOptions } from "ioredis"
import isDocker from "is-docker"

export type RedisConfig = Readonly<RedisOptions>

const config: RedisConfig = {
  host: isDocker() ? "host.docker.internal" : "localhost",
  port: 6379,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000)
  },
}

export default config
