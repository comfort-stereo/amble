import { createDrawerNavigator } from "@react-navigation/drawer"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { environment } from "../environment"
import { SafeApolloProvider } from "./common/apollo"
import { useAuthRefresh } from "./common/auth"
import { useIsMounted } from "./common/hooks"
import { ThemeProvider, useTheme } from "./common/theme"
import { DrawerContent } from "./components/drawer-content"
import { Account } from "./screens/account"
import { Home } from "./screens/home"
import { Login } from "./screens/login"
import { SignUp } from "./screens/sign-up"

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <SafeApolloProvider>
      <ThemeProvider theme="light">
        <AppLoader />
      </ThemeProvider>
    </SafeApolloProvider>
  )
}

function AppLoader() {
  const theme = useTheme()
  const isReady = useAuthRefresh()
  if (environment.isNative && !isReady) {
    return null
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
        [Account.name]: "account",
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
          primary: theme.contentColorFor("surface").string(),
          background: theme.colorFor("surface").string(),
          card: theme.colorFor("surface").string(),
          text: theme.contentColorFor("surface").string(),
          border: theme.colorFor("primary").string(),
          notification: theme.colorFor("primary").string(),
        },
      }}
    >
      <Drawer.Navigator
        drawerType="front"
        drawerStyle={{
          borderRightColor: theme.contentColorFor("surface").string(),
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
        <Drawer.Screen name={Account.name} component={Account} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
