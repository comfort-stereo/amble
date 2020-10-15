import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, StyleSheet } from "react-native"
import { Text, View } from "../components/ui"
import { Me } from "./me"

export function Home() {
  const routing = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Amble!</Text>
      <Button
        title="Navigate"
        onPress={() => {
          routing.navigate(Me.name)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
})
