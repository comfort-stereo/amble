import { config } from "dotenv"
import { existsSync } from "promise-fs"
import isDocker from "is-docker"
import { join } from "path"

function load(file: string) {
  const path = join(__dirname, file)
  console.log(`Loading environment variables from: ${path}`)
  if (existsSync(path)) {
    config({ path })
  }
}

load(`.env.${process.env.NODE_ENV}.local`)
load(".env.local")
load(`.env.${process.env.NODE_ENV}`)
load(".env")

export const environment = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isDocker: isDocker(),
  port: Number(process.env.PORT ?? 5000),
  accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
  accessTokenExpirySeconds: Number(process.env.ACCESS_TOKEN_EXPIRY_SECONDS),
  refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
  refreshTokenExpirySeconds: Number(process.env.REFRESH_TOKEN_EXPIRY_SECONDS),
}
