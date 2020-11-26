import { StatusBar } from "expo-status-bar"
import React from "react"
import { environment } from "../environment"
import { AppLoader } from "./app-loader"
import { Apollo } from "./common/apollo"
import { ThemeProvider } from "./common/theme"

export default function App() {
  return (
    <Apollo>
      <ThemeProvider theme="dark">
        <AppLoader />
        {environment.mode === "development" && <StatusBar style="dark" />}
      </ThemeProvider>
    </Apollo>
  )
}
