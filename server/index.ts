import "reflect-metadata"
import { bootstrap } from "./amble-server"
import { readEnvironment } from "./environment"
import orm from "./orm.config"
import redis from "./redis.config"

export async function run() {
  const environment = readEnvironment()
  const amble = await bootstrap({
    environment,
    service: {
      orm,
      redis,
    },
  })

  amble.listen(environment.port, () => {
    console.log(`🚀 Server ready at: http://localhost:${environment.port}`)
    console.log(`🚀 - Site => http://localhost:${environment.port}`)
    console.log(`🚀 - API => http://localhost:${environment.port}/graphql`)
  })
}

if (require.main === module) {
  run()
}
