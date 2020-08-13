import { createClient } from "@amble/client"
import { ApolloServer } from "apollo-server-express"
import cookieParser from "cookie-parser"
import express from "express"
import { createServer } from "http"
import "reflect-metadata"
import { environment } from "./environment"
import { createClearContextPlugin, createContext } from "./src/context"
import { createORM } from "./src/orm"
import { createPubSub } from "./src/pub-sub"
import { createRedis } from "./src/redis"
import { createSchema } from "./src/schema"

async function bootstrapClient() {
  const client = createClient({
    isProduction: environment.isProduction,
  })

  await client.prepare()
  return client
}

async function bootstrapServer() {
  const app = express()
  app.use(cookieParser())

  const http = createServer(app)
  const redis = createRedis()
  const pubSub = createPubSub()

  const [orm, schema] = await Promise.all([
    createORM(),
    createSchema({
      pubSub,
    }),
  ])

  const apollo = new ApolloServer({
    schema,
    context: async (express) => {
      return await createContext({
        request: express.req,
        response: express.res,
        orm,
        redis,
      })
    },
    plugins: [createClearContextPlugin()],
  })

  const generator = orm.getSchemaGenerator()
  await generator.ensureDatabase()
  await generator.updateSchema()

  apollo.applyMiddleware({ app })
  apollo.installSubscriptionHandlers(http)

  return { http, app, apollo }
}

export async function run() {
  const [client, server] = await Promise.all([bootstrapClient(), bootstrapServer()])

  const handler = client.getRequestHandler()
  server.app.get("*", (request, response) => {
    handler(request, response)
  })

  server.http.listen(environment.port, () => {
    console.log(`🚀 Server ready at: http://localhost:${environment.port}`)
    console.log(`🚀 - Site => http://localhost:${environment.port}`)
    console.log(`🚀 - API => http://localhost:${environment.port}${server.apollo.graphqlPath}`)
  })
}

if (require.main === module) {
  run()
}
