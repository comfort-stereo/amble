import { DocumentNode } from "graphql"
import { print } from "graphql/language/printer"
import { Dictionary } from "mikro-orm"
import objectHash from "object-hash"
import supertest from "supertest"
import { AmbleServer, AmbleServerState, bootstrap } from "../../amble-server"
import { Environment, readEnvironment } from "../../environment"
import orm from "../../orm.config"
import redis from "../../redis.config"

const defaultEnvironment = readEnvironment()

const servers = new Map<string, AmbleServer>()
const serverPromises = new Map<string, Promise<AmbleServer>>()

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

export async function getTestServer(
  state: AmbleServerState = {},
  environmentOverrides: Partial<Environment> = {},
): Promise<AmbleServer> {
  const environment = { ...defaultEnvironment, ...environmentOverrides }
  const hash = objectHash(environment)

  let server = servers.get(hash) ?? null
  if (server == null) {
    const serverPromise = serverPromises.get(hash) ?? null
    server = await (serverPromise ?? createTestServer(environment))
    servers.set(hash, server)
  }

  await server.clear()
  await server.fill(state)
  return server
}

async function createTestServer(environment: Environment): Promise<AmbleServer> {
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
