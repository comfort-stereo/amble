import { Options, ReflectMetadataProvider } from "mikro-orm"

import { environment } from "./environment"

const config: Options = {
  type: "postgresql",
  host: environment.isDocker ? "host.docker.internal" : "localhost",
  port: 5432,
  dbName: "amble",
  user: "amble",
  password: "amble",
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
