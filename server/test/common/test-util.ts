import { DocumentNode } from "graphql"
import { print } from "graphql/language/printer"
import { Dictionary } from "mikro-orm"
import supertest from "supertest"
import { AmbleServer, AmbleServerState, bootstrap } from "../../amble-server"
import { readEnvironment } from "../../environment"
import orm from "../../orm.config"
import redis from "../../redis.config"

const environment = readEnvironment()

let server: AmbleServer | null = null
let serverPromise: Promise<AmbleServer> | null = null

export async function send(
  server: AmbleServer,
  {
    query,
    variables,
    check,
  }: {
    query: DocumentNode
    variables?: Dictionary<unknown>
    check?: (data: any) => void
  },
) {
  const response = await supertest(server.app)
    .post("/graphql")
    .send({
      query: print(query),
      variables,
    })

  const data = response.body?.data
  if (check != null) {
    check(data)
  }

  return data
}

export async function getTestServer(data: AmbleServerState = {}): Promise<AmbleServer> {
  if (server == null) {
    server = await (serverPromise ?? createTestServer())
  }

  await server.clear()
  await server.fill(data)
  return server
}

async function createTestServer(): Promise<AmbleServer> {
  return await bootstrap({
    environment,
    service: {
      orm: {
        ...orm,
        dbName: "test",
      },
      redis: {
        ...redis,
        keyPrefix: "test:",
      },
    },
  })
}
