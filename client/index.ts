import next from "next"
import Server from "next/dist/next-server/server/next-server"

export type ClientOptions = Readonly<{
  isProduction: boolean
}>

export function createClient(config: ClientOptions): Server {
  return next({
    dev: !config.isProduction,
    dir: __dirname,
  })
}
