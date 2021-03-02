import { GraphQLSchema } from "graphql"
import { buildSchema, PubSubEngine, ResolverData } from "type-graphql"
import { Container } from "typedi"
import { Context } from "./context"
import { CommentResolver } from "./resolvers/comment.resolver"
import { GroupResolver } from "./resolvers/group.resolver"
import { MembershipResolver } from "./resolvers/membership.resolver"
import { PostResolver } from "./resolvers/post.resolver"
import { UserResolver } from "./resolvers/user.resolver"

export type CreateSchemaConfig = Readonly<{
  pubSub?: PubSubEngine
}>

export async function createSchema({ pubSub }: CreateSchemaConfig = {}): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [CommentResolver, GroupResolver, PostResolver, MembershipResolver, UserResolver],
    container: ({ context }: ResolverData<Context>) => {
      return Container.of(context.request)
    },
    pubSub,
  })
}
