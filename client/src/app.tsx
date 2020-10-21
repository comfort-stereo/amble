import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { environment } from "../environment"
import { PrefetchedApolloProvider } from "./common/apollo"
import { ThemeProvider, useTheme } from "./common/theme"
import { Text } from "./components/base"
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
          primary: theme.colorFor("primary").hex(),
          background: theme.colorFor("surface").hex(),
          card: theme.colorFor("surface").hex(),
          text: theme.contentColorFor("surface").hex(),
          border: "transparent",
          notification: theme.colorFor("primary").hex(),
        },
      }}
    >
      <Drawer.Navigator
        screenOptions={{ unmountOnBlur: true }}
        initialRouteName={Home.name}
        openByDefault={false}
        drawerContent={DrawerContent}
        drawerStyle={{
          width: environment.isServer ? 0 : 300,
        }}
        sceneContainerStyle={{
          opacity: 1,
        }}
      >
        <Drawer.Screen name={Home.name} component={Home} />
        <Drawer.Screen name={Login.name} component={Login} />
        <Drawer.Screen name={SignUp.name} component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

function DrawerContent(props: DrawerContentComponentProps) {
  return <Text>Hello</Text>
}
