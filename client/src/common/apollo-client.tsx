import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { GetServerSidePropsResult } from "next"
import { ComponentClass, ReactNode } from "react"
import { environment } from "../../environment"

const APOLLO_STATE_PROP = "__apolloState__"

type State = NormalizedCacheObject
type Client = ApolloClient<State>

export function createApolloClient(state: State = {}): Client {
  return new ApolloClient({
    ssrMode: environment.isServerSide,
    link: new HttpLink({
      uri: environment.graphqlUri,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache().restore(state),
  })
}

let global: Client | null = null

function initializeApolloClient(state?: State | null): Client {
  state = state ?? {}

  // Always create a new client per request server-side.
  if (environment.isServerSide) {
    return createApolloClient(state)
  }

  // Reuse the client on the client-side.
  if (global == null) {
    global = createApolloClient(state)
  }

  return global
}

export const withApollo = (PageComponent: ComponentClass & any): ReactNode => {
  const WithApollo = ({
    [APOLLO_STATE_PROP]: state,
    ...pageProps
  }: {
    [APOLLO_STATE_PROP]?: State
  }) => {
    const client = initializeApolloClient(state)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct display name in development.
  if (environment.isDevelopment) {
    const displayName = PageComponent.displayName || PageComponent.name || "Component"
    WithApollo.displayName = `withApollo(${displayName})`
  }

  return WithApollo
}

export function withApolloState<P>(client: Client, input?: Partial<GetServerSidePropsResult<P>>) {
  const { props, ...rest } = input ?? {}
  return {
    props: {
      [APOLLO_STATE_PROP]: client.cache.extract(),
      ...props,
    },
    ...rest,
  }
}
