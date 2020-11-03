import { useApolloClient } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useMutation } from "../common/apollo-hooks"
import { LOGOUT_MUTATION } from "../common/auth"
import { AuthStore } from "../common/auth-store"
import { Button, Scroll } from "../components/base"
import { Container } from "../components/base/container"
import { Screen } from "../components/screen"
import { LogoutMutation, LogoutMutationVariables } from "../generated/graphql"

export function Settings() {
  const navigation = useNavigation()
  const apollo = useApolloClient()
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(LOGOUT_MUTATION, {
    fetchPolicy: "no-cache",
    async onCompleted({ logout }) {
      if (logout?.success) {
        await AuthStore.clear()
        await apollo.clearStore()
        await apollo.resetStore()
      }
    },
  })

  return (
    <Screen meta={{ title: "Settings" }}>
      <Container>
        <Scroll>
          <Button
            label="Logout"
            icon="logout"
            type="no-fill"
            role="warning"
            onPress={async () => {
              await logout()
              navigation.navigate("Home")
            }}
          />
        </Scroll>
      </Container>
    </Screen>
  )
}
