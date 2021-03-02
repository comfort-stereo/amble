module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "useStyles",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
