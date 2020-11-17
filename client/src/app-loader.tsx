import React, { useState } from "react"
import { environment } from "../environment"
import { AppNavigation } from "./app-navigation"
import { useMutation } from "./common/apollo-hooks"
import { REFRESH_MUTATION } from "./common/auth"
import { AuthStore } from "./common/auth-store"
import { RefreshMutation, RefreshMutationVariables } from "./generated/graphql"

const refreshInterval = 1000 * 60 * 10

export function AppLoader() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [refresh] = useMutation<RefreshMutation, RefreshMutationVariables>(REFRESH_MUTATION, {
    async onCompleted({ refresh }) {
      if (refresh?.accessToken == null) {
        return
      }

      if (environment.isNative) {
        await AuthStore.setNativeAccessToken(refresh.accessToken)
      }

      setIsLoaded(true)
    },
  })

  setInterval(refresh, refreshInterval, {
    immediate: true,
  })

  // if (!isLoaded && environment.isNative) {
  //   return <></>
  // }

  return <AppNavigation />
}
