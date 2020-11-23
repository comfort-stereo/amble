import React, { useState } from "react"
import { environment } from "../environment"
import { AppNavigation } from "./app-navigation"
import { useMutation } from "./common/apollo-hooks"
import { REFRESH_MUTATION } from "./common/auth"
import { AuthStore } from "./common/auth-store"
import { useInterval } from "./common/hooks"
import { useStyles } from "./common/theme"
import { View } from "./components/base"
import { RefreshMutation, RefreshMutationVariables } from "./generated/graphql"

const refreshInterval = 1000 * 60 * 10

export function AppLoader() {
  const [isLoaded, setIsLoaded] = useState(environment.isWeb)
  const [refresh] = useMutation<RefreshMutation, RefreshMutationVariables>(REFRESH_MUTATION, {
    async onCompleted({ refresh }) {
      setIsLoaded(true)
      if (refresh?.accessToken != null) {
        if (environment.isNative) {
          await AuthStore.setNativeAccessToken(refresh.accessToken)
        }
      }
    },
  })

  useInterval(refresh, refreshInterval, {
    immediate: true,
  })

  const styles = useStyles(
    (theme) => ({
      placeholder: {
        flex: 1,
        backgroundColor: theme.background("neutral").string(),
      },
    }),
    [],
  )

  if (!isLoaded && environment.isNative) {
    return <View style={styles.placeholder} />
  }

  return <AppNavigation />
}
