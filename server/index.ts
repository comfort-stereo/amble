import "reflect-metadata"

import { createClearContextPlugin, createContext } from "./src/context"

import { ApolloServer } from "apollo-server-express"
import { createClient } from "@amble/client"
import { createORM } from "./src/orm"
import { createPubSub } from "./src/pub-sub"
import { createSchema } from "./src/schema"
import { createServer } from "http"
import { environment } from "./environment"
import express from "express"

export async function run() {
  const client = createClient({
    isProduction: environment.isProduction,
  })
  await client.prepare()

  const app = express()
  const server = createServer(app)
  const orm = await createORM()
  const pubSub = createPubSub()
  const schema = await createSchema({
    pubSub,
  })

  const apollo = new ApolloServer({
    schema,
    context: (request) => {
      return createContext({
        request,
        orm,
      })
    },
    plugins: [createClearContextPlugin()],
  })

  const generator = orm.getSchemaGenerator()
  await generator.ensureDatabase()
  await generator.updateSchema()

  apollo.applyMiddleware({ app })
  apollo.installSubscriptionHandlers(server)

  app.get("*", client.getRequestHandler() as any)

  server.listen(environment.port, () => {
    console.log(`🚀 Server ready at: http://localhost:${environment.port}`)
    console.log(`🚀 - Site => http://localhost:${environment.port}`)
    console.log(`🚀 - API => http://localhost:${environment.port}${apollo.graphqlPath}`)
  })
}

if (require.main === module) {
  run()
}
