import Server from "next/dist/next-server/server/next-server"
import next from "next"

export type ClientOptions = Readonly<{
  isProduction: boolean
}>

export function createClient(config: ClientOptions): Server {
  return next({
    dev: !config.isProduction,
    dir: __dirname,
  })
}
