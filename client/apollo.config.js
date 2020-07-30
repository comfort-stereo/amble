module.exports = {
  client: {
    service: {
      name: "client",
      url: "http://localhost:5000/graphql",
      includes: ["./**/*.ts"],
      localSchemaFile: __dirname + "/../shared/schema.graphql",
    },
  },
}
