import React from "react"
import { useUser } from "../common/auth"
import { useStyles } from "../common/theme"
import { Avatar } from "../components/avatar"
import { View } from "../components/base"
import { Container } from "../components/base/container"
import { Screen } from "../components/screen"

export function Account() {
  const user = useUser()

  const styles = useStyles(
    () => ({
      root: {},
      thing: {
        backgroundColor: "red",
        height: 200,
        borderColor: "black",
        borderWidth: 2,
      },
    }),
    [],
  )

  return (
    <Screen style={styles.root} meta={{ title: "Home" }}>
      <Container>
        <Avatar user={user} size={80} />
        <View style={styles.thing} />
        <View style={styles.thing} />
        <View style={styles.thing} />
        <View style={styles.thing} />
      </Container>
    </Screen>
  )
}
