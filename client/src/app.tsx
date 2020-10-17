import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { PrefetchedApolloProvider } from "./common/apollo"
import { ThemeProvider } from "./common/theme"
import { Home } from "./screens/home"
import { Me } from "./screens/me"

const Stack = createStackNavigator()

const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      [Home.name]: "/",
      [Me.name]: "me",
    },
  },
}

export default function App() {
  return (
    <PrefetchedApolloProvider>
      <ThemeProvider theme="dark">
        <NavigationContainer linking={linking} documentTitle={{ enabled: false }}>
          <Stack.Navigator initialRouteName={Home.name}>
            <Stack.Screen name={Home.name} component={Home} />
            <Stack.Screen name={Me.name} component={Me} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar />
      </ThemeProvider>
    </PrefetchedApolloProvider>
  )
}
