import { Feather as Icon } from "@expo/vector-icons"
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
        width: "100%",
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
        backgroundColor: theme.colorFor("secondary").hex(),
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: theme.contentColorFor("secondary").hex(),
      },
      menuButton: {
        // transform: [{ skewX: "10deg" }],
      },
      menuButtonContainer: {
        marginLeft: 5,
        marginRight: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 2,
        transform: [{ skewX: "-10deg" }],
        borderColor: theme.contentColorFor("secondary").hex(),
        borderWidth: 1,
      },
      logo: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: theme.contentColorFor("secondary").hex(),
        transform: [{ skewX: "-10deg" }],
        borderWidth: 1,
        borderRadius: 2,
      },
      logoText: {
        fontSize: 20,
        color: theme.contentColorFor("secondary").hex(),
        fontWeight: "bold",
        transform: [{ skewX: "10deg" }],
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
          <Icon
            name="menu"
            color={theme.contentColorFor("secondary").hex()}
            size={25}
            style={styles.menuButton}
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
