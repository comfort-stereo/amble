import { config } from "dotenv"
import { join } from "path"
import { existsSync } from "promise-fs"

export type EnvironmentMode = "production" | "development" | "test"
export type Environment = Readonly<{
  mode: EnvironmentMode
  port: number
  headless: boolean
  databaseUser: string
  databaseName: string
  databasePassword: string
  accessTokenSecret: string
  accessTokenExpirySeconds: number
  refreshTokenSecret: string
  refreshTokenExpirySeconds: number
}>

export function readEnvironment(): Environment {
  function load(file: string) {
    const path = join(__dirname, file)
    if (existsSync(path)) {
      config({ path })
    }
  }

  const mode = process.env.NODE_ENV ?? "development"
  if (mode !== "production" && mode !== "development" && mode !== "test") {
    throw new Error(`Unrecognized environment mode: "${mode}"`)
  }

  load(`.env.${mode}.local`)
  load(".env.local")
  load(`.env.${mode}`)
  load(".env")

  return {
    mode,
    port: Number(process.env.PORT ?? 5000),
    headless: process.env.headless === "true",
    databaseUser: String(process.env.DATABASE_USER),
    databaseName: String(process.env.DATABASE_NAME),
    databasePassword: String(process.env.DATABASE_PASSWORD),
    accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
    accessTokenExpirySeconds: Number(process.env.ACCESS_TOKEN_EXPIRY_SECONDS),
    refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
    refreshTokenExpirySeconds: Number(process.env.REFRESH_TOKEN_EXPIRY_SECONDS),
  }
}
