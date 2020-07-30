import { Container } from "typedi"
import { GraphQLRequestContextWillSendResponse } from "apollo-server-types"
import { MikroORM } from "mikro-orm"
import { PluginDefinition } from "apollo-server-core"
import { ServiceName } from "./common/di"

export type Context = Readonly<{
  request: Express.Request
}>

export type ContextConfig = Readonly<{
  request: Express.Request
  orm: MikroORM
}>

export function createContext({ request, orm }: ContextConfig): Context {
  const container = Container.of(request)
  container.set(ServiceName.EM, orm.em.fork())

  return Object.freeze({
    request,
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
