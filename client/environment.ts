import Constants from "expo-constants"
import { Platform } from "react-native"

export type EnvironmentMode = "production" | "development" | "test"
export type Environment = Readonly<{
  mode: EnvironmentMode
  isAndroid: boolean
  isIOS: boolean
  isMobile: boolean
  isBrowser: boolean
  isServer: boolean
  isClient: boolean
  rootURI: string
  graphqlURI: string
}>

const mode = process.env.NODE_ENV ?? "development"
if (mode !== "production" && mode !== "development" && mode !== "test") {
  throw new Error(`Unrecognized environment mode: "${mode}"`)
}

const isAndroid = Platform.OS === "android"
const isIOS = Platform.OS === "ios"
const isMobile = isAndroid || isIOS
const isBrowser = typeof window !== "undefined"

const isServer = !isMobile && !isBrowser
const isClient = !isServer

const mobileRootURI = `http://${Constants.manifest.debuggerHost
  ?.split(":")
  ?.shift()
  ?.concat(":5000")}`
const webRootURI = "http://localhost:5000"

const rootURI = isMobile ? mobileRootURI : webRootURI
const graphqlURI = rootURI + "/graphql"

export const environment: Environment = {
  mode,
  isAndroid,
  isIOS,
  isMobile,
  isBrowser,
  isServer,
  isClient,
  rootURI,
  graphqlURI,
}
