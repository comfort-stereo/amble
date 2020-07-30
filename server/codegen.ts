import { createSchema } from "./src/schema"
import { promises as fs } from "fs"
import { printSchema } from "graphql"

export async function codegen() {
  const schema = await createSchema()
  const content = printSchema(schema)
  await fs.writeFile(__dirname + "/../shared/schema.graphql", content)
}

if (require.main === module) {
  codegen()
}
