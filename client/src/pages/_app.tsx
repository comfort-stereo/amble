import { ServerContainer } from "@react-navigation/native"
import _ from "lodash"
import type { AppProps } from "next/app"
import { NextRouter } from "next/router"
import React from "react"
import { environment } from "../../environment"

export default function App({ Component, pageProps, router }: AppProps) {
  if (environment.isClient) {
    return <Component {...pageProps} />
  }

  const pathname = router.pathname
  const search = getQueryString(router)
  return (
    <ServerContainer location={{ pathname, search }}>
      <Component {...pageProps} />
    </ServerContainer>
  )
}

function getQueryString(router: NextRouter) {
  return (
    "?" +
    _(router.query)
      .map((value, key) => `${key}=${value}`)
      .join("&")
  )
}
