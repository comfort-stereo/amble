import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { NavigationContext } from "@react-navigation/native"
import Constants from "expo-constants"
import React from "react"
import { useAuth, useUser } from "../common/auth"
import { useStyles, useTheme } from "../common/theme"
import { Avatar } from "./avatar"
import { Divider, Link, Text, View } from "./base"
import { Icon } from "./base/icon"
import { Spacer } from "./base/spacer"
import { getGlobalNavigation } from "./global-navigation"

export function DrawerContent(_: DrawerContentComponentProps) {
  const auth = useAuth()
  const user = useUser()
  const theme = useTheme()
  const styles = useStyles(
    () => ({
      root: {},
      userSection: {
        minHeight: 70,
        marginTop: Constants.statusBarHeight,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
      },
      userSectionAvatar: {
        marginRight: 10,
      },
      userSectionUsernameText: {
        fontSize: 18,
        fontWeight: "bold",
      },
      logoutButton: {
        display: user == null ? "none" : "flex",
      },
    }),
    [user],
  )

  const navigation = getGlobalNavigation()
  if (navigation == null) {
    return null
  }

  const route = user == null ? "/login" : "/account"

  return (
    <NavigationContext.Provider value={navigation}>
      <View style={styles.root}>
        <View style={styles.userSection}>
          <Link to={route} style={styles.userSectionAvatar}>
            <Avatar user={user} size={35} />
          </Link>
          <Link to={route}>
            <Text style={styles.userSectionUsernameText}>
              {user == null ? "Login" : user.username}
            </Text>
          </Link>
          <Spacer />
          <Icon
            style={styles.logoutButton}
            name="log-out"
            size={25}
            color={theme.contentColorFor("surface").string()}
            onPress={async () => {
              await auth.logout()
              navigation.navigate("Home")
            }}
          />
        </View>
        <Divider />
      </View>
    </NavigationContext.Provider>
  )
}
