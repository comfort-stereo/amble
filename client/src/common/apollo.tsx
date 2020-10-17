import {
  ApolloClient,
  ApolloProvider as BaseApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { NextPageContext } from "next"
import Head from "next/head"
import React, { ComponentClass, createContext, ReactNode, useContext, useRef } from "react"
import { environment } from "../../environment"

type PrefetchedApolloProviderProps = Readonly<{
  client?: ApolloClient<ApolloState>
  state?: ApolloState
  children: ReactNode
}>

const IsApolloProvidedContext = createContext(false)

export function PrefetchedApolloProvider({
  client,
  state,
  children,
}: PrefetchedApolloProviderProps) {
  const clientRef = useRef<ApolloClient<ApolloState> | null>(client ?? null)
  const isApolloProvided = useContext(IsApolloProvidedContext)

  if (isApolloProvided) {
    return <>{children}</>
  }

  if (clientRef.current == null) {
    clientRef.current = createApolloClient(state)
  }

  return (
    <BaseApolloProvider client={clientRef.current}>
      <IsApolloProvidedContext.Provider value={true}>{children}</IsApolloProvidedContext.Provider>
    </BaseApolloProvider>
  )
}

export const prefetch = (PageComponent: ComponentClass & any): ReactNode => {
  const Prefetch = ({
    __apolloClient__: client, // Defined on the server. The Apollo client for the request. Queries are saved to its cache.
    __apolloState__: state, // Defined on the client. Prefetched cache state from the server.
    ...pageProps
  }: PagePropsWithApolloClientOrState) => {
    return (
      <PrefetchedApolloProvider client={client} state={state}>
        <PageComponent {...pageProps} />
      </PrefetchedApolloProvider>
    )
  }

  if (environment.mode === "development") {
    Prefetch.displayName = PageComponent.displayName || PageComponent.name || "Component"
  }

  Prefetch.getInitialProps = async (context: NextPageContext) => {
    let pageProps = {}
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context)
    }

    const { AppTree } = context

    // Don't do anything client side.
    if (environment.isClient) {
      return pageProps
    }

    // Don't do anything if the response has already been sent.
    if (context.res != null && context.res.writableEnded) {
      return pageProps
    }

    // Create a new Apollo client for the request.
    const client = createApolloClient()

    try {
      // Load all query data into the Apollo client's cache.
      const { getDataFromTree } = await import("@apollo/client/react/ssr")
      await getDataFromTree(
        <AppTree
          pageProps={
            {
              ...pageProps,
              __apolloClient__: client,
            } as PagePropsWithApolloClientOrState
          }
        />,
      )
    } catch (error) {
      console.error("Error while running `getDataFromTree`", error)
    }

    Head.rewind()

    // Pass the Apollo client's state to the frontend as a prop.
    return {
      ...pageProps,
      __apolloState__: client.cache.extract(),
    } as PagePropsWithApolloClientOrState
  }

  return Prefetch
}

type ApolloState = NormalizedCacheObject
type PagePropsWithApolloClientOrState = {
  __apolloClient__?: ApolloClient<ApolloState>
  __apolloState__?: ApolloState
}

function createApolloClient(state?: ApolloState): ApolloClient<ApolloState> {
  const cache = new InMemoryCache()
  if (state != null) {
    cache.restore(state)
  }

  return new ApolloClient({
    ssrMode: environment.isServer,
    link: new HttpLink({
      uri: environment.graphqlURI,
      credentials: "same-origin",
    }),
    cache,
  })
}
