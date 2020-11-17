const path = require("path")
const { withExpo } = require("@expo/next-adapter")
const withTM = require("next-transpile-modules")([
  // "react-native-screens",
  // "@react-navigation/native",
  // "@react-navigation/bottom-tabs",
  // "@react-navigation/stack",
  "@amble/common",
])
const withFonts = require("next-fonts")
// @ts-ignore
const withImages = require("next-images")
const withPlugins = require("next-compose-plugins")

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  {},
)
