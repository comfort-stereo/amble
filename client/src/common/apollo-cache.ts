import { InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { relayStylePagination } from "@apollo/client/utilities"
import { TypedTypePolicies } from "../generated/graphql"

export type ApolloState = NormalizedCacheObject

const typePolicies: Readonly<TypedTypePolicies> = {
  Query: {
    fields: {
      posts: relayStylePagination(),
    },
  },
  Group: {
    fields: {
      posts: relayStylePagination(),
    },
  },
}

export function createApolloCache() {
  return new InMemoryCache({
    typePolicies,
  })
}
