import {
  CommonActions,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  NavigationHelpersContext,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native"
import React from "react"
import { environment } from "../environment"
import { useStyles } from "./common/theme"
import { Text, TouchableOpacity, View } from "./components/base"
import { Icon } from "./components/base/icon"

type AppTabNavigationOptions = {
  icon?: string
  label?: string
}

type AppTabNavigationEventMap = {
  tabPress: {
    canPreventDefault: true
  }
}

type Props = DefaultNavigatorOptions<AppTabNavigationOptions> & TabRouterOptions

export function AppTabNavigator({ initialRouteName, screenOptions, children }: Props) {
  const { state, navigation, descriptors } = useNavigationBuilder<
    TabNavigationState,
    TabRouterOptions,
    AppTabNavigationOptions,
    AppTabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  })

  const styles = useStyles(
    (theme) => ({
      grow: {
        flex: 1,
      },
      bar: {
        borderTopColor: theme.foreground("neutral").alpha(0.2).string(),
        borderTopWidth: 1,
        backgroundColor: theme.background("neutral").string(),
        alignItems: "center",
        justifyContent: "center",
        height: environment.isWeb ? 60 : 80,
        // flex: 0,
      },
      tabs: {
        width: "100%",
        maxWidth: 600,
        flexDirection: "row",
      },
    }),
    [],
  )
  console.log("INDEX:", state.index)
  console.log(initialRouteName)
  console.log(state)

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={styles.grow}>
        <View style={styles.grow}>{descriptors[state.routes[state.index].key].render()}</View>
        {/* <View style={styles.grow}>
          {state.routes.map((route, index) => {
            const isSelected = state.index === index
            return (
              <View key={route.key} style={{ display: isSelected ? "flex" : "none" }}>
                {descriptors[route.key].render()}
              </View>
            )
          })}
        </View> */}
        <View style={styles.bar}>
          <View style={styles.tabs}>
            {state.routes.map((route, index) => {
              const options = descriptors[route?.key]?.options ?? {}
              const label = options.label ?? route.name
              const icon = options.icon ?? "info"
              // const isSelected = route.key === state.routes[state.index].key
              const isSelected = state.index === index

              return (
                <Tab
                  key={route.key}
                  icon={icon}
                  label={label}
                  isSelected={isSelected}
                  onPress={() => {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    })

                    if (!isSelected && !event.defaultPrevented) {
                      navigation.dispatch({
                        ...CommonActions.navigate(route.name),
                        target: state.key,
                      })
                    }
                  }}
                />
              )
            })}
          </View>
        </View>
      </View>
    </NavigationHelpersContext.Provider>
  )
}

type TabProps = Readonly<{
  icon: string
  label: string
  isSelected?: boolean
  onPress?: () => void
}>

function Tab({ icon, label, isSelected = false, onPress }: TabProps) {
  const styles = useStyles(
    (theme) => ({
      root: {
        marginHorizontal: 10,
        opacity: isSelected ? 1 : 0.65,
        flex: 1,
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      },
      label: {
        flex: 1,
        alignItems: "center",
        color: theme.foreground("neutral").string(),
        marginTop: 2,
        fontSize: 11,
      },
    }),
    [isSelected],
  )

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Icon name={icon} size={20} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export const createAppTabNavigator = createNavigatorFactory(AppTabNavigator)
