import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { NavigationContext, useNavigation } from "@react-navigation/native"
import Constants from "expo-constants"
import React from "react"
import { useUser } from "../common/auth"
import { useStyles, useTheme } from "../common/theme"
import { Avatar } from "./avatar"
import { Divider, Link, Text, View } from "./base"
import { Icon } from "./base/icon"
import { Spacer } from "./base/spacer"
import { getGlobalNavigation } from "./global-navigation"

export function DrawerContent(_: DrawerContentComponentProps) {
  const navigation = getGlobalNavigation()
  if (navigation == null) {
    return <View />
  }

  return (
    <NavigationContext.Provider value={navigation}>
      <Inner />
    </NavigationContext.Provider>
  )
}

function Inner() {
  return (
    <View>
      <UserSection />
      <Divider />
    </View>
  )
}

function UserSection() {
  const navigation = useNavigation()
  const user = useUser()
  const theme = useTheme()

  const styles = useStyles(
    () => ({
      root: {
        minHeight: 70,
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: user == null ? "center" : "flex-start",
      },
      avatar: {
        marginRight: 10,
      },
      username: {
        fontSize: 18,
        fontWeight: "bold",
      },
      loginArrow: {
        marginLeft: 5,
      },
    }),
    [user],
  )

  if (user == null) {
    return (
      <View style={styles.root}>
        <Link to="/login">
          <Text style={styles.username}>Login to Amble</Text>
        </Link>
        <Link to="/login" style={styles.loginArrow}>
          <Icon name="arrow-right" size={20} />
        </Link>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <Link to="/settings" style={styles.avatar}>
        <Avatar user={user} size={35} />
      </Link>
      <Link to="/settings">
        <Text style={styles.username}>{user.username}</Text>
      </Link>
      <Spacer />
      <Icon
        name="settings"
        size={25}
        color={theme.foreground("neutral").string()}
        onPress={() => {
          navigation.navigate("Settings")
        }}
      />
    </View>
  )
}
