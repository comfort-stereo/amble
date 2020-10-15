import { gql } from "@apollo/client"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { Text, TextInput, TouchableOpacity, View } from "../components/ui"

const STUB = gql`
  query GetTotalUsers {
    users {
      total
    }
  }
`

type LoggedOutIntent = "login" | "sign-up"

export default function Me() {
  return <LoggedOutView />
}

function LoggedOutView() {
  const [intent, setIntent] = useState<LoggedOutIntent>("login")
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signUpUsername, setSignUpUsername] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("")

  function renderLoginForm() {
    return (
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          accessibilityLabel="Username"
          autoFocus
          value={loginUsername}
          onChangeText={setLoginUsername}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          accessibilityLabel="Password"
          secureTextEntry
          value={loginPassword}
          onChangeText={setLoginPassword}
        />
        <TouchableOpacity onPress={() => setIntent("sign-up")} />
      </View>
    )
  }

  function renderSignUpForm() {
    return (
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          accessibilityLabel="Username"
          autoFocus
          value={signUpUsername}
          onChangeText={setSignUpUsername}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          accessibilityLabel="Email"
          value={signUpEmail}
          onChangeText={setSignUpEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          accessibilityLabel="Password"
          secureTextEntry
          value={signUpPassword}
          onChangeText={setSignUpPassword}
        />
        <Text style={styles.label}>Password Confirm</Text>
        <TextInput
          style={styles.textInput}
          accessibilityLabel="Password Confirm"
          secureTextEntry
          value={signUpPasswordConfirm}
          onChangeText={setSignUpPasswordConfirm}
        />
      </View>
    )
  }

  function renderChangeIntentButton() {
    return (
      <TouchableOpacity onPress={() => setIntent(intent === "login" ? "sign-up" : "login")}>
        <View style={styles.changeIntentButton}>
          <Text style={styles.changeIntentButtonText}>
            {intent === "login" ? "Login" : "Sign Up"}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.loggedOutView}>
      {intent === "login" ? renderLoginForm() : renderSignUpForm()}
      {renderChangeIntentButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  loggedOutView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loggedOutBox: {
    padding: 12,
    backgroundColor: "DDDDDD",
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
  },
  changeIntentButton: {
    backgroundColor: "orange",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  changeIntentButtonText: {
    fontSize: 16,
    backgroundColor: "orange",
  },
  textInput: {
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    margin: 4,
  },
})
