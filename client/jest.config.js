const { join } = require("path")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsConfig: join(__dirname, "tsconfig.json"),
    },
  },
}
