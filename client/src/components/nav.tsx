import { AntDesign } from "@expo/vector-icons"
import { DrawerActions, Link, useNavigation } from "@react-navigation/native"
import React from "react"
import { useStyles, useTheme } from "../common/theme"
import { Text, TouchableOpacity, View } from "./base"

export function Nav() {
  const navigation = useNavigation()
  const theme = useTheme()
  const styles = useStyles(
    (theme) => ({
      root: {
        height: 60,
        padding: 10,
        zIndex: 100,
      },
      bar: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 60,
        padding: 10,
        paddingHorizontal: 15,
        alignItems: "center",
        backgroundColor: theme.colorFor("primary").string(),
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: theme.contentColorFor("primary").string(),
      },
      menuButtonContainer: {
        marginLeft: 5,
        marginRight: 5,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 2,
        borderColor: theme.contentColorFor("primary").string(),
      },
      logo: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: theme.contentColorFor("primary").string(),
        borderRadius: 2,
      },
      logoText: {
        fontSize: 20,
        color: theme.contentColorFor("primary").string(),
        fontWeight: "bold",
      },
    }),
    [],
  )

  return (
    <View style={styles.root}>
      <View style={styles.bar}>
        <TouchableOpacity
          style={styles.menuButtonContainer}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer())
          }}
        >
          <AntDesign
            name="menu-fold"
            color={theme.contentColorFor("secondary").string()}
            size={24}
          />
        </TouchableOpacity>
        <Link to="/">
          <View style={styles.logo}>
            <Text style={styles.logoText}>Amble</Text>
          </View>
        </Link>
      </View>
    </View>
  )
}
