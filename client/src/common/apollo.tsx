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
import { useOnFirstRender, useSingleton } from "./hooks"

function createApolloClient(
  state: ApolloState,
  getAccessToken: () => string | null,
): ApolloClient<ApolloState> {
  const cache = new InMemoryCache()
  if (state != null) {
    cache.restore(state)
  }

  const httpLink = new HttpLink({
    uri: environment.graphqlURI,
    credentials: "same-origin",
  })

  const authLink = setContext((_, { headers }) => {
    const accessToken = getAccessToken != null ? getAccessToken() : null

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

const IsApolloProvidedContext = createContext(false)

type SafeApolloProvider = Readonly<{
  client?: ApolloClient<ApolloState>
  children: ReactNode
}>

export function SafeApolloProvider({ client, children }: SafeApolloProvider) {
  const clientRef = useRef<ApolloClient<ApolloState> | null>(client ?? null)
  const isApolloProvided = useContext(IsApolloProvidedContext)

  if (isApolloProvided) {
    return <>{children}</>
  }

  if (clientRef.current == null) {
    clientRef.current = createApolloClient({}, () => AuthStore.getAccessToken())
  }

  return (
    <BaseApolloProvider client={clientRef.current}>
      <IsApolloProvidedContext.Provider value={true}>{children}</IsApolloProvidedContext.Provider>
    </BaseApolloProvider>
  )
}

type PrefetchConfig = Readonly<
  | {
      // If we're on the server, pass the Apollo client for the current request. Queries will be saved to the its cache.
      environment: "server"
      apolloClient: ApolloClient<ApolloState>
    }
  | {
      // If we're on the client we receive the prefetched Apollo cache state and the current access token.
      environment: "client" // Set if we're on the client.
      apolloState: ApolloState
      accessToken: string | null
    }
>

type PrefetchProps = {
  __prefetch__: PrefetchConfig
}

export const prefetch = (PageComponent: ComponentClass & any): ReactNode => {
  const Prefetch = ({ __prefetch__, ...pageProps }: PrefetchProps) => {
    useOnFirstRender(() => {
      if (__prefetch__.environment === "client" && __prefetch__.accessToken != null) {
        AuthStore.setAccessToken(__prefetch__.accessToken)
      }
    })

    const client = useSingleton(() => {
      if (__prefetch__.environment === "server") {
        return __prefetch__.apolloClient
      }

      return createApolloClient(__prefetch__.apolloState, () => AuthStore.getAccessToken())
    })

    return (
      <SafeApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </SafeApolloProvider>
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
    const apolloClient = createApolloClient({}, () => accessToken)

    try {
      // Load all query data into the Apollo client's cache.
      const { getDataFromTree } = await import("@apollo/client/react/ssr")
      await getDataFromTree(
        <AppTree
          pageProps={
            {
              ...pageProps,
              __prefetch__: {
                environment: "server",
                apolloClient,
              },
            } as PrefetchProps
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
      __prefetch__: {
        environment: "client",
        apolloState: apolloClient.cache.extract(),
        accessToken,
      },
    } as PrefetchProps
  }

  return Prefetch
}
