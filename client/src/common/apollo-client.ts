import { ApolloClient } from "@apollo/client"
import { environment } from "../../environment"
import { ApolloState, createApolloCache } from "./apollo-cache"
import { createApolloLink, Headers } from "./apollo-link"

export function createApolloClient(
  state: ApolloState,
  getAddedHeaders?: () => Headers | Promise<Headers>,
): ApolloClient<ApolloState> {
  const cache = createApolloCache()
  if (state != null) {
    cache.restore(state)
  }
  const link = createApolloLink(getAddedHeaders)

  return new ApolloClient({
    ssrMode: environment.isServer,
    link,
    cache,
  })
}
