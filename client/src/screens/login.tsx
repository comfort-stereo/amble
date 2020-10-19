import { Link } from "@react-navigation/native"
import React, { useState } from "react"
import { useStyles } from "../common/theme"
import { Button, Screen, Text, TextInput, View } from "../components/base"

export function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const styles = useStyles(
    (theme) => ({
      container: {
        flex: 1,
        alignItems: "center",
      },
      spacer: {
        flex: 1,
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.contentColorFor("surface").string(),
        textAlign: "center",
        paddingBottom: 10,
      },
      form: {
        padding: 12,
        maxWidth: 375,
        minWidth: 250,
        width: "100%",
      },
      input: {
        marginBottom: 2,
      },
      changeIntentSection: {
        alignItems: "flex-end",
        paddingVertical: 10,
      },
      changeIntentText: {
        color: theme.contentColorFor("surface").string(),
        fontStyle: "italic",
      },
      submitSection: {
        paddingVertical: 20,
      },
    }),
    [],
  )

  return (
    <Screen style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.form}>
        <Text style={styles.header}>Jump In</Text>
        <TextInput
          style={styles.input}
          label="Username"
          accessibilityLabel="Username"
          autoFocus
          value={username}
          onChangeText={setUsername}
          selectTextOnFocus={true}
        />
        <TextInput
          style={styles.input}
          label="Password"
          accessibilityLabel="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          selectTextOnFocus={true}
        />
        <View style={styles.submitSection}>
          <Button label="Login" role="primary" />
        </View>
        <View style={styles.changeIntentSection}>
          <Link to="/sign-up">
            <Text style={styles.changeIntentText}>{"Sign Up >"}</Text>
          </Link>
        </View>
      </View>
      <View style={styles.spacer} />
    </Screen>
  )
}
