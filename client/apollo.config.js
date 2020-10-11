const { join } = require("path")

module.exports = {
  client: {
    service: {
      name: "client",
      url: "http://localhost:5000/graphql",
      includes: ["./**/*.ts", "./**/*.tsx"],
      localSchemaFile: join(__dirname, "../common/generated/schema.graphql"),
    },
  },
}
