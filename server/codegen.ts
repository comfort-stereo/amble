import { createSchema } from "./src/schema"
import { join } from "path"
import { printSchema } from "graphql"
import { writeFile } from "promise-fs"

export async function codegen() {
  const schema = await createSchema()
  const content = printSchema(schema)
  await writeFile(join(__dirname, "/../shared/schema.graphql"), content)
}

if (require.main === module) {
  codegen()
}
