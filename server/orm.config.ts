import isDocker from "is-docker"
import { Options, ReflectMetadataProvider } from "mikro-orm"
import { readEnvironment } from "./environment"

const environment = readEnvironment()

export type ORMConfig = Readonly<Options>

const config: ORMConfig = {
  type: "postgresql",
  host: isDocker() ? "host.docker.internal" : "localhost",
  port: 5432,
  dbName: environment.databaseName,
  user: environment.databaseUser,
  password: environment.databasePassword,
  tsNode: true,
  autoFlush: false,
  baseDir: __dirname,
  entitiesDirs: ["./src/entities"],
  metadataProvider: ReflectMetadataProvider,
  cache: {
    enabled: false,
  },
}

export default config
