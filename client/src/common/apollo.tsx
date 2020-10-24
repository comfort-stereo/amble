import {
  ApolloClient,
  ApolloProvider as BaseApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { NextPageContext } from "next"
import Head from "next/head"
import React, { ComponentClass, createContext, ReactNode, useContext, useRef } from "react"
import Cookies from "universal-cookie"
import { environment } from "../../environment"
import { AuthStore } from "./auth-store"

function createApolloClient(state?: ApolloState): ApolloClient<ApolloState> {
  const cache = new InMemoryCache()
  if (state != null) {
    cache.restore(state)
  }

  const httpLink = new HttpLink({
    uri: environment.graphqlURI,
    credentials: "same-origin",
  })

  const authLink = setContext((_, { headers }) => {
    const accessToken = AuthStore.getAccessToken()

    return {
      headers: {
        ...headers,
        authorization: accessToken != null ? `Bearer ${accessToken}` : undefined,
      },
    }
  })

  return new ApolloClient({
    ssrMode: environment.isServer,
    link: authLink.concat(httpLink),
    cache,
  })
}

export type ApolloState = NormalizedCacheObject
export type Apollo = ApolloClient<object>

type PagePropsWithApolloClientOrState = {
  __apolloClient__?: ApolloClient<ApolloState>
  __apolloState__?: ApolloState
  __accessToken__?: string
}

const IsApolloProvidedContext = createContext(false)

type PrefetchedApolloProviderProps = Readonly<{
  client?: ApolloClient<ApolloState>
  state?: ApolloState
  children: ReactNode
}>

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
    __accessToken__: accessToken, // Defined on the client. Prefetched cache state from the server.
    ...pageProps
  }: PagePropsWithApolloClientOrState) => {
    if (accessToken != null) {
      AuthStore.setAccessToken(accessToken)
    }

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

    const accessToken = new Cookies(context.req?.headers?.cookie).get("access-token")

    // Create a new Apollo client for the request.
    const client = createApolloClient({})

    try {
      // Load all query data into the Apollo client's cache.
      const { getDataFromTree } = await import("@apollo/client/react/ssr")
      await getDataFromTree(
        <AppTree
          pageProps={
            {
              ...pageProps,
              __apolloClient__: client,
              __accessToken__: accessToken,
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
      __accessToken__: accessToken,
    } as PagePropsWithApolloClientOrState
  }

  return Prefetch
}
