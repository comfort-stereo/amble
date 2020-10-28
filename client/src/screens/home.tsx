import { gql } from "@apollo/client"
import React from "react"
import { useUser } from "../common/auth"
import { useStyles } from "../common/theme"
import { Avatar } from "../components/avatar"
import { Link, Text } from "../components/base"
import { Screen } from "../components/screen"

const QUERY_GET_TOTAL_USERS = gql`
  query GetTotalUsers {
    users {
      total
    }
  }
`

export function Home() {
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
    <Screen style={styles.screen} meta={{ title: "Home" }}>
      <Avatar user={user} size={80} />
      {user != null ? (
        <Text style={styles.header}>Hi {user.username}!</Text>
      ) : (
        <Text style={styles.header}>Welcome to Amble!</Text>
      )}
      <Link to="/login">
        <Text>{"Get Started >"}</Text>
      </Link>
    </Screen>
  )
}
