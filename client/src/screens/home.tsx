import { gql, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, StyleSheet } from "react-native"
import { environment } from "../../environment"
import { Screen } from "../components/screen"
import { Text } from "../components/ui"
import { GetTotalUsersQuery } from "../generated/graphql"
import { Me } from "./me"

const QUERY_GET_TOTAL_USERS = gql`
  query GetTotalUsers {
    users {
      total
    }
  }
`

export function Home() {
  const navigation = useNavigation()
  const { data, error } = useQuery<GetTotalUsersQuery>(QUERY_GET_TOTAL_USERS)
  if (error != null) {
    console.log(environment.graphqlURI)
    console.log(error)
  }
  return (
    <Screen style={styles.screen} meta={{ title: "Home" }}>
      <Text style={styles.text}>Welcome to Amble!</Text>
      <Text style={styles.text}>Number of users: {data?.users.total ?? "?"}</Text>
      <Button
        title="Navigate"
        onPress={() => {
          navigation.navigate(Me.name)
        }}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
})
