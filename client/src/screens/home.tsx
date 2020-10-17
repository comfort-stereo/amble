import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, StyleSheet } from "react-native"
import { Screen } from "../components/screen"
import { Text } from "../components/ui"
import { Me } from "./me"

export function Home() {
  const navigation = useNavigation()
  return (
    <Screen style={styles.screen} meta={{ title: "Home" }}>
      <Text style={styles.text}>Welcome to Amble!</Text>
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
