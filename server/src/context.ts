import { PluginDefinition } from "apollo-server-core"
import { GraphQLRequestContextWillSendResponse } from "apollo-server-types"
import { Request, Response } from "express"
import { Redis } from "ioredis"
import { MikroORM } from "mikro-orm"
import "reflect-metadata"
import { Container } from "typedi"
import { ServiceName } from "./common/di"
import { User } from "./entities/user.entity"
import { AuthManager } from "./services/auth-manager"

export type Context = Readonly<{
  request: Request
  response: Response
  user: User | null
}>

export type ContextConfig = Readonly<{
  request: Request
  response: Response
  orm: MikroORM
  redis: Redis
}>

export async function createContext({
  request,
  response,
  orm,
  redis,
}: ContextConfig): Promise<Context> {
  const container = Container.of(request)
  container.set(ServiceName.EM, orm.em.fork())
  container.set(ServiceName.Redis, redis)

  const user = await container.get(AuthManager).getUser(request)

  return Object.freeze({
    request,
    response,
    user,
  })
}

export function createClearContextPlugin(): PluginDefinition {
  return {
    requestDidStart() {
      return {
        willSendResponse({ context }: GraphQLRequestContextWillSendResponse<Context>) {
          Container.reset(context.request)
        },
      }
    },
  }
}
