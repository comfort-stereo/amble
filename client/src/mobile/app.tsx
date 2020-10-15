import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Root } from "../components/root"

export function App() {
  return (
    <Root>
      <View style={styles.container}>
        <Text>Amble</Text>
        <StatusBar style="auto" />
      </View>
    </Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
})
