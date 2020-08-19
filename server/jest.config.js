const { join } = require("path")

module.exports = {
  preset: "ts-jest",
  runner: "jest-serial-runner",
  testEnvironment: "node",
  modulePathIgnorePatterns: [join(__dirname, "build")],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsConfig: join(__dirname, "tsconfig.json"),
    },
  },
}
