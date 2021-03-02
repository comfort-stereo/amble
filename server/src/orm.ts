import { MikroORM } from "mikro-orm"
import { ORMConfig } from "../orm.config"

export async function createORM(config: ORMConfig): Promise<MikroORM> {
  const orm = await MikroORM.init(config)
  const generator = orm.getSchemaGenerator()
  await generator.ensureDatabase()
  await orm.connect()
  await generator.updateSchema()
  return orm
}
