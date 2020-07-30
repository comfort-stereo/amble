import isDocker from "is-docker"

export const environment = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isDocker: isDocker(),
  port: process.env.PORT ?? 5000,
}
