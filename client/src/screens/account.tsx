import { useApolloClient } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { UserInfo, useUser } from "../common/auth"
import { AuthStore } from "../common/auth-store"
import { useStyles } from "../common/theme"
import { Avatar } from "../components/avatar"
import { Button, Container, Link, Screen, Scroll, Text } from "../components/base"
import { useLogoutMutation } from "../generated/graphql"
import { ScreenName } from "../screen-name"

export function AccountScreen() {
  const user = useUser()
  return user == null ? <LoggedOut /> : <LoggedIn user={user} />
}

type LoggedInProps = Readonly<{
  user: UserInfo
}>

function LoggedIn({ user }: LoggedInProps) {
  const navigation = useNavigation()
  const apollo = useApolloClient()
  const [logout] = useLogoutMutation({
    fetchPolicy: "no-cache",
    errorPolicy: "all",
    async onCompleted({ logout }) {
      if (logout?.success) {
        await AuthStore.clear()
        await apollo.clearStore()
        await apollo.resetStore()
      }
    },
  })

  return (
    <Screen meta={{ title: "Account" }}>
      <Container>
        <Scroll>
          <Avatar user={user} size={30} />
          <Button
            label="Logout"
            icon="logout"
            type="no-fill"
            role="warning"
            onPress={async () => {
              await logout()
              navigation.navigate(ScreenName.Account)
            }}
          />
        </Scroll>
      </Container>
    </Screen>
  )
}

function LoggedOut() {
  const styles = useStyles(
    () => ({
      root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      scrollContentContainer: {
        flexGrow: 1,
        justifyContent: "center",
      },
      header: {
        fontSize: 30,
        fontWeight: "bold",
      },
      hint: {
        fontSize: 20,
      },
    }),
    [],
  )

  return (
    <Screen meta={{ title: "Account" }} style={styles.root}>
      <Container>
        <Scroll contentContainerStyle={styles.scrollContentContainer}>
          <Link to="/account/login">
            <Text style={styles.header}>{"You're not currently signed in."}</Text>
            <Text style={styles.hint}>Log in to subscribe and interact with communities.</Text>
          </Link>
        </Scroll>
      </Container>
    </Screen>
  )
}
