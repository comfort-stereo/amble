import next from "next"
import Server from "next/dist/next-server/server/next-server"

export type ClientConfig = Readonly<{
  dev: boolean
}>

export function createClient(config: ClientConfig): Server {
  return next({
    dev: config.dev,
    dir: __dirname,
  })
}
