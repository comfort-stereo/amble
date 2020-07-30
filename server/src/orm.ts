import { MikroORM } from "mikro-orm"
import config from "../orm.config"

export async function createORM(): Promise<MikroORM> {
  return await MikroORM.init(config)
}
