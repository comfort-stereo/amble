import { printSchema } from "graphql"
import { join } from "path"
import { writeFile } from "promise-fs"
import { createSchema } from "./src/schema"

export async function codegen() {
  const schema = await createSchema()
  const content = printSchema(schema)
  await writeFile(join(__dirname, "/../shared/schema.graphql"), content)
}

if (require.main === module) {
  codegen()
}
