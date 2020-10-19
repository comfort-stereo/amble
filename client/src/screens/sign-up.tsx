import { Link } from "@react-navigation/native"
import React, { useState } from "react"
import { useStyles } from "../common/theme"
import { Button, Screen, Text, TextInput, View } from "../components/base"

export function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

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
        marginBottom: 6,
      },
      changeIntentSection: {
        alignItems: "flex-start",
        paddingVertical: 10,
      },
      changeIntentText: {
        color: theme.contentColorFor("surface").hex(),
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
        <Text style={styles.header}>Get Started</Text>
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
          label="Email"
          accessibilityLabel="Email"
          value={email}
          onChangeText={setEmail}
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
        <TextInput
          style={styles.input}
          label="Password Confirm"
          accessibilityLabel="Password Confirm"
          secureTextEntry
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          selectTextOnFocus={true}
        />
        <View style={styles.submitSection}>
          <Button label="Sign Up" role="primary" size="large" />
        </View>
        <View style={styles.changeIntentSection}>
          <Link to="/login">
            <Text style={styles.changeIntentText}>{"< Log In"}</Text>
          </Link>
        </View>
      </View>
      <View style={styles.spacer} />
    </Screen>
  )
}
