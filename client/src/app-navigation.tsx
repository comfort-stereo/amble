import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { environment } from "../environment"
import { useStyles, useTheme } from "./common/theme"
import { Icon } from "./components/base"
import { ScreenName } from "./screen-name"
import { AccountScreen } from "./screens/account"
import { HomeScreen } from "./screens/home"
import { LoginScreen } from "./screens/login"
import { MessagesScreen } from "./screens/messages"
import { SearchScreen } from "./screens/search"
import { SettingsScreen } from "./screens/settings"
import { SignUpScreen } from "./screens/sign-up"

const Tabs = createBottomTabNavigator()
const HomeStack = createAppStackNavigator(ScreenName.Home)
const MessagesStack = createAppStackNavigator(ScreenName.Messages)
const AccountStack = createAppStackNavigator(ScreenName.Account)
const SearchStack = createAppStackNavigator(ScreenName.Search)
const SettingsStack = createAppStackNavigator(ScreenName.Settings)

export function AppNavigation() {
  const theme = useTheme()

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
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: theme.background("primary").string(),
          inactiveTintColor: theme.foreground("primary").alpha(0.4).string(),
          showLabel: false,
          allowFontScaling: false,
          tabStyle: {
            minWidth: 80,
          },
          style: {
            alignItems: "center",
            borderTopColor: theme.foreground("neutral").alpha(0.5).string(),
            ...(() => {
              if (environment.isWeb) {
                return {
                  height: 60,
                }
              }
              return {}
            })(),
          },
          adaptive: false,
        }}
      >
        <Tabs.Screen
          name={ScreenName.Home}
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon({ color, size }) {
              return <Icon name="home" color={color} size={size} />
            },
          }}
        />
        <Tabs.Screen
          name={ScreenName.Messages}
          component={MessagesStack}
          options={{
            tabBarLabel: "Messages",
            tabBarIcon({ color, size }) {
              return <Icon name="envelope" color={color} size={size} />
            },
          }}
        />
        <Tabs.Screen
          name={ScreenName.Account}
          component={AccountStack}
          options={{
            tabBarLabel: "Account",
            tabBarIcon({ color, size }) {
              return <Icon name="user" color={color} size={size} />
            },
          }}
        />
        <Tabs.Screen
          name={ScreenName.Search}
          component={SearchStack}
          options={{
            tabBarLabel: "Search",
            tabBarIcon({ color, size }) {
              return <Icon name="magnifier" color={color} size={size} />
            },
          }}
        />
        <Tabs.Screen
          name={ScreenName.Settings}
          component={SettingsStack}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon({ color, size }) {
              return <Icon name="settings" color={color} size={size} />
            },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      [ScreenName.Home]: {
        path: ScreenName.Home,
        initialRouteName: ScreenName.Home,
        screens: {
          [ScreenName.Home]: "",
        },
      },
      [ScreenName.Messages]: {
        path: ScreenName.Messages,
        initialRouteName: ScreenName.Messages,
        screens: {
          [ScreenName.Messages]: "",
        },
      },
      [ScreenName.Account]: {
        path: ScreenName.Account,
        initialRouteName: ScreenName.Account,
        screens: {
          [ScreenName.Account]: "",
          [ScreenName.Login]: ScreenName.Login,
          [ScreenName.SignUp]: ScreenName.SignUp,
        },
      },
      [ScreenName.Search]: {
        path: ScreenName.Search,
        initialRouteName: ScreenName.Search,
        screens: {
          [ScreenName.Search]: "",
        },
      },
      [ScreenName.Settings]: {
        path: ScreenName.Settings,
        initialRouteName: ScreenName.Settings,
        screens: {
          [ScreenName.Settings]: "",
        },
      },
    },
  },
}

function createAppStackNavigator(initialRouteName: string) {
  const Stack = createStackNavigator()

  const AppNavigationStack = function AppNavigationStack() {
    const styles = useStyles(
      (theme) => ({
        header: {
          backgroundColor: theme.background("neutral").string(),
          borderBottomColor: theme.foreground("neutral").alpha(0.25).string(),
        },
        headerTitle: {
          fontWeight: "bold",
        },
      }),
      [],
    )

    return (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen
          name={ScreenName.Account}
          component={AccountScreen}
          options={{ title: "Account" }}
        />
        <Stack.Screen name={ScreenName.Home} component={HomeScreen} options={{ title: "Amble" }} />
        <Stack.Screen
          name={ScreenName.Login}
          component={LoginScreen}
          options={{ title: "Log In" }}
        />
        <Stack.Screen
          name={ScreenName.Messages}
          component={MessagesScreen}
          options={{ title: "Messages" }}
        />
        <Stack.Screen
          name={ScreenName.Search}
          component={SearchScreen}
          options={{ title: "Search" }}
        />
        <Stack.Screen
          name={ScreenName.Settings}
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name={ScreenName.SignUp}
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
      </Stack.Navigator>
    )
  }

  AppNavigationStack.displayName = AppNavigationStack.name + initialRouteName

  return AppNavigationStack
}
