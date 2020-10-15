import { ServerContainer } from "@react-navigation/native"
import _ from "lodash"
import type { AppProps } from "next/app"
import { NextRouter, useRouter } from "next/router"
import React from "react"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
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
