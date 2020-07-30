import { PubSubEngine, ResolverData, buildSchema } from "type-graphql"

import { CommentResolver } from "./resolvers/comment.resolver"
import { Container } from "typedi"
import { Context } from "./context"
import { GraphQLSchema } from "graphql"
import { GroupResolver } from "./resolvers/group.resolver"
import { PostResolver } from "./resolvers/post.resolver"

export type CreateSchemaConfig = Readonly<{
  pubSub?: PubSubEngine
}>

export async function createSchema({ pubSub }: CreateSchemaConfig = {}): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [CommentResolver, GroupResolver, PostResolver],
    container: ({ context }: ResolverData<Context>) => {
      return Container.of(context.request)
    },
    pubSub,
  })
}
