import { createClient } from "@amble/client"
import { ApolloServer } from "apollo-server-express"
import cookieParser from "cookie-parser"
import express, { Application } from "express"
import { createServer, Server } from "http"
import { Redis } from "ioredis"
import { AnyEntity, MikroORM } from "mikro-orm"
import "reflect-metadata"
import { Environment } from "./environment"
// import { formatError } from "./error"
import { ORMConfig } from "./orm.config"
import { RedisConfig } from "./redis.config"
import { createClearContextPlugin, createContext } from "./src/context"
import { createORM } from "./src/orm"
import { createRedis, createRedisCache, createRedisPubSub } from "./src/redis"
import { createSchema } from "./src/schema"

export type AmbleServerConfig = {
  environment: Environment
  service: Readonly<{
    redis: Readonly<RedisConfig>
    orm: Readonly<ORMConfig>
  }>
}

export type AmbleServerState = {
  entities?: AnyEntity[]
  redis?: { [key: string]: string }
}

export class AmbleServer {
  constructor(
    public readonly config: AmbleServerConfig,
    private readonly http: Server,
    public readonly app: Application,
    private readonly orm: MikroORM,
    private readonly redis: Redis,
  ) {}

  listen(port: number, callback: () => void): this {
    this.http.listen(port, callback)
    return this
  }

  async stop(): Promise<void> {
    await new Promise((resolve) => this.http.close(() => resolve()))
    await this.orm.close()
    this.redis.disconnect()
    this.redis.quit()
  }

  async clear(): Promise<void> {
    const entities = Object.keys(this.orm.getMetadata().getAll())
    await Promise.all([
      ...entities.map((entity) => this.orm.em.createQueryBuilder(entity).delete().execute()),
      this.redis.flushdb(),
    ])

    this.orm.em.clear()
  }

  async fill(data: AmbleServerState) {
    for (const entity of data.entities ?? []) {
      await this.orm.em.persist(entity)
    }

    await this.orm.em.flush()

    for (const [key, value] of Object.entries(data.redis ?? {})) {
      await this.redis.set(key, value)
    }
  }
}

export async function bootstrap(config: AmbleServerConfig): Promise<AmbleServer> {
  const [client, { http, app, orm, redis }] = await Promise.all([
    bootstrapClient(config),
    bootstrapServer(config),
  ])

  if (client != null) {
    const handler = client.getRequestHandler()
    app.get("*", (request, response) => {
      handler(request, response)
    })
  }

  return new AmbleServer(config, http, app, orm, redis)
}

async function bootstrapClient(config: AmbleServerConfig) {
  if (config.environment.headless) {
    return null
  }

  const client = createClient({
    dev: config.environment.mode !== "production",
  })

  await client.prepare()
  return client
}

async function bootstrapServer(config: AmbleServerConfig) {
  const app = express()
  app.use(cookieParser())

  const http = createServer(app)
  const redis = createRedis(config.service?.redis)
  const cache = createRedisCache(config.service?.redis)
  const pubSub = createRedisPubSub(config.service?.redis)

  const [orm, schema] = await Promise.all([
    createORM(config.service?.orm),
    createSchema({ pubSub }),
  ])

  const apollo = new ApolloServer({
    schema,
    cache,
    context: async (express) => {
      return await createContext({
        request: express.req,
        response: express.res,
        environment: config.environment,
        orm,
        redis,
      })
    },
    plugins: [createClearContextPlugin()],
  })

  apollo.applyMiddleware({ app })
  apollo.installSubscriptionHandlers(http)

  return { http, app, orm, redis }
}
