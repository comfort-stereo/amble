import { createDrawerNavigator } from "@react-navigation/drawer"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { PrefetchedApolloProvider } from "./common/apollo"
import { ThemeProvider, useTheme } from "./common/theme"
import { View } from "./components/base"
import { Home } from "./screens/home"
import { Login } from "./screens/login"
import { SignUp } from "./screens/sign-up"

const Drawer = createDrawerNavigator()

const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      [Home.name]: "",
      [Login.name]: "login",
      [SignUp.name]: "sign-up",
    },
  },
}

export default function App() {
  return (
    <PrefetchedApolloProvider>
      <ThemeProvider theme="dark">
        <AppNavigation />
        <StatusBar />
      </ThemeProvider>
    </PrefetchedApolloProvider>
  )
}

function AppNavigation() {
  const theme = useTheme()
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
          // display: environment.isServer ? "none" : "flex",
        }}
        drawerContent={DrawerContent}
        // overlayColor={environment.isServer ? "transparent" : undefined}
        screenOptions={{ unmountOnBlur: true }}
        initialRouteName={Home.name}
      >
        <Drawer.Screen name={Home.name} component={Home} />
        <Drawer.Screen name={Login.name} component={Login} />
        <Drawer.Screen name={SignUp.name} component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

function DrawerContent() {
  return <View />
}
