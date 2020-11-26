import { ApolloClient, ApolloProvider as BaseApolloProvider } from "@apollo/client"
import React, { createContext, ReactNode, useContext, useRef } from "react"
import { ApolloState } from "./apollo-cache"
import { createApolloClient } from "./apollo-client"

const IsProvidedContext = createContext(false)

type Props = Readonly<{
  client?: ApolloClient<ApolloState>
  children: ReactNode
}>

export function Apollo({ client, children }: Props) {
  const clientRef = useRef<ApolloClient<ApolloState> | null>(client ?? null)
  const isApolloProvided = useContext(IsProvidedContext)

  if (isApolloProvided) {
    return <>{children}</>
  }

  if (clientRef.current == null) {
    clientRef.current = createApolloClient({})
  }

  return (
    <BaseApolloProvider client={clientRef.current}>
      <IsProvidedContext.Provider value={true}>{children}</IsProvidedContext.Provider>
    </BaseApolloProvider>
  )
}
