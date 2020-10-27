import { gql, useQuery } from "@apollo/client"
import React from "react"
import { StyleSheet } from "react-native"
import { useUser } from "../common/auth"
import { Avatar } from "../components/avatar"
import { Link, Screen, Text } from "../components/base"
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
  const { data } = useQuery<GetTotalUsersQuery>(QUERY_GET_TOTAL_USERS)

  return (
    <Screen style={styles.screen} meta={{ title: "Home" }}>
      <Avatar user={user} size={80} />
      {user != null && <Text style={styles.text}>Hi {user.username}!</Text>}
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
