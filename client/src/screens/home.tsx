import React from "react"
import { useUser } from "../common/auth"
import { useStyles } from "../common/theme"
import { Avatar } from "../components/avatar"
import { Button, Screen, Text } from "../components/base"

export function HomeScreen() {
  const user = useUser()
  const styles = useStyles(
    () => ({
      screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      header: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
      },
    }),
    [],
  )

  return (
    <Screen style={styles.screen} meta={{ title: "Amble" }}>
      <Avatar user={user} size={80} />
      <Button label="Create Group" to="/home/create-group" />
      {user != null ? (
        <Text style={styles.header}>Hi {user.username}!</Text>
      ) : (
        <Text style={styles.header}>Welcome to Amble!</Text>
      )}
    </Screen>
  )
}
