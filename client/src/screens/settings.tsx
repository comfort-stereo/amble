import React from "react"
import { useUser } from "../common/auth"
import { useStyles } from "../common/theme"
import { Avatar } from "../components/avatar"
import { Button } from "../components/base"
import { Container } from "../components/base/container"
import { Screen } from "../components/screen"

export function Settings() {
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
    <Screen style={styles.root} meta={{ title: "Settings" }}>
      <Container>
        <Avatar user={user} size={80} />
        <Button label="Logout" role="secondary" type="no-fill" />
      </Container>
    </Screen>
  )
}
