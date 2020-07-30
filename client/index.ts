import Server from "next/dist/next-server/server/next-server"
import next from "next"

export type ClientConfig = Readonly<{
  isProduction: boolean
}>

export function createClient(config: ClientConfig): Server {
  return next({
    dev: !config.isProduction,
    dir: __dirname,
  })
}
