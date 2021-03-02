import React, { useState } from "react"
import { environment } from "../environment"
import { AppNavigation } from "./app-navigation"
import { AuthStore } from "./common/auth-store"
import { useInterval } from "./common/hooks"
import { useStyles } from "./common/theme"
import { View } from "./components/base"
import { useRefreshMutation } from "./generated/graphql"

const refreshInterval = 1000 * 60 * 10

export function AppLoader() {
  const [isLoaded, setIsLoaded] = useState(environment.isWeb)
  const [refresh] = useRefreshMutation({
    fetchPolicy: "no-cache",
    errorPolicy: "all",
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
