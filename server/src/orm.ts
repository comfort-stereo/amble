import { MikroORM } from "mikro-orm"
import config from "../orm.config"
import { wait } from "./common/util"

export async function createORM(): Promise<MikroORM> {
  const orm = await MikroORM.init(config)
  while (true) {
    if (await orm.isConnected()) {
      return orm
    }

    console.log("Could not connect to database. Waiting...")
    await wait(2.5)
  }
}
