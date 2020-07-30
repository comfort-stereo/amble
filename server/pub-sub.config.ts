import { RedisOptions } from "ioredis"
import { environment } from "./environment"

const config: RedisOptions = {
  host: environment.isDocker ? "host.docker.internal" : "localhost",
  port: 6379,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000)
  },
}

export default config
