import { gql, useQuery } from "@apollo/client"
import { Link } from "@react-navigation/native"
import React from "react"
import { StyleSheet } from "react-native"
import { environment } from "../../environment"
import { useUser } from "../common/auth-manager"
import { Avatar } from "../components/avatar"
import { Screen, Text } from "../components/base"
import { GetTotalUsersQuery } from "../generated/graphql"

const QUERY_GET_TOTAL_USERS = gql`
  query GetTotalUsers {
    users {
      total
    }
  }
`

export function Home() {
  const user = useUser()
  console.log(user)

  const { data, error } = useQuery<GetTotalUsersQuery>(QUERY_GET_TOTAL_USERS)
  if (error != null) {
    console.log(environment.graphqlURI)
    console.log(error)
  }
  return (
    <Screen style={styles.screen} meta={{ title: "Home" }}>
      <Avatar user={{ username: "maybawefwef" }} size={80} />
      <Text style={styles.text}>Hi {user?.username}!</Text>
      <Text style={styles.text}>Welcome to Amble!</Text>
      <Text style={styles.text}>Number of users: {data?.users.total ?? "?"}</Text>
      <Link to="/login">
        <Text>Navigate</Text>
      </Link>
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
