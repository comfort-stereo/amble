import { ApolloProvider } from "@apollo/client"
import React, { ReactNode } from "react"
import { getApolloClient } from "../common/apollo-client"
import { ThemeProvider } from "../common/theme"

type Props = Readonly<{
  children?: ReactNode
}>

export function Root({ children }: Props) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <ThemeProvider theme="dark">{children}</ThemeProvider>
    </ApolloProvider>
  )
}
