import { ApolloClient } from "@apollo/client"
import { NextPageContext } from "next"
import Head from "next/head"
import React, { ComponentClass, ReactNode } from "react"
import { environment } from "../../environment"
import { Apollo } from "./apollo"
import { ApolloState } from "./apollo-cache"
import { createApolloClient } from "./apollo-client"
import { useSingleton } from "./hooks"

type PrefetchConfig = Readonly<
  | {
      // If we're on the server, pass the Apollo client for the current request. Queries will be saved to the its cache.
      environment: "server"
      apolloClient: ApolloClient<ApolloState>
    }
  | {
      // If we're on the client we receive the prefetched Apollo cache state and the current access token.
      environment: "client"
      apolloState: ApolloState
    }
>

type PrefetchProps = {
  __prefetch__: PrefetchConfig
}

export const prefetch = (PageComponent: ComponentClass & any): ReactNode => {
  const Prefetch = ({ __prefetch__, ...pageProps }: PrefetchProps) => {
    const client = useSingleton(() => {
      if (__prefetch__.environment === "server") {
        return __prefetch__.apolloClient
      }

      return createApolloClient(__prefetch__.apolloState)
    })

    return (
      <Apollo client={client}>
        <PageComponent {...pageProps} />
      </Apollo>
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

    // Create a new Apollo client for the request. Forward all headers.
    const apolloClient = createApolloClient({}, () => ({
      ...context.req?.headers,
    }))

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
      },
    } as PrefetchProps
  }

  return Prefetch
}
