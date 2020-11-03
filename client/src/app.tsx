import { useMutation } from "@apollo/client"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { environment } from "../environment"
import { SafeApolloProvider } from "./common/apollo"
import { REFRESH_MUTATION } from "./common/auth"
import { AuthStore } from "./common/auth-store"
import { useInterval, useIsMounted } from "./common/hooks"
import { ThemeProvider, useTheme } from "./common/theme"
import { DrawerContent } from "./components/drawer-content"
import { RefreshMutation, RefreshMutationVariables } from "./generated/graphql"
import { Home } from "./screens/home"
import { Login } from "./screens/login"
import { Settings } from "./screens/settings"
import { SignUp } from "./screens/sign-up"

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <SafeApolloProvider>
      <ThemeProvider theme="dark">
        <AppLoader />
      </ThemeProvider>
    </SafeApolloProvider>
  )
}

const AUTH_REFRESH_INTERVAL_MS = 1000 * 60 * 10

function AppLoader() {
  const theme = useTheme()
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

  useInterval(refresh, AUTH_REFRESH_INTERVAL_MS, {
    immediate: true,
  })

  if (!isLoaded && environment.isNative) {
    return <></>
  }

  return (
    <>
      <AppNavigation />
      <StatusBar style={theme.isDark ? "light" : "dark"} />
    </>
  )
}

function AppNavigation() {
  const theme = useTheme()
  const isMounted = useIsMounted()

  const linking: LinkingOptions = {
    prefixes: [],
    config: {
      screens: {
        [Home.name]: "",
        [Login.name]: "login",
        [SignUp.name]: "sign-up",
        [Settings.name]: "settings",
      },
    },
  }

  return (
    <NavigationContainer
      linking={linking}
      documentTitle={{ enabled: false }}
      theme={{
        dark: theme.isDark,
        colors: {
          primary: theme.foreground("neutral").string(),
          background: theme.background("neutral").string(),
          card: theme.background("neutral").string(),
          text: theme.foreground("neutral").string(),
          border: theme.background("primary").string(),
          notification: theme.background("primary").string(),
        },
      }}
    >
      <Drawer.Navigator
        drawerType="front"
        drawerStyle={{
          borderColor: theme.foreground("neutral").alpha(0.5).string(),
          borderRightWidth: 1,
          display: isMounted ? "flex" : "none",
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        overlayColor={isMounted ? undefined : "transparent"}
        screenOptions={{ unmountOnBlur: true }}
        initialRouteName={Home.name}
      >
        <Drawer.Screen name={Home.name} component={Home} />
        <Drawer.Screen name={Login.name} component={Login} />
        <Drawer.Screen name={SignUp.name} component={SignUp} />
        <Drawer.Screen name={Settings.name} component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
