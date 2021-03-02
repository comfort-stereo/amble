const { withExpo } = require("@expo/next-adapter")
const withTM = require("next-transpile-modules")(["@amble/common"])
const withFonts = require("next-fonts")
// @ts-ignore
const withImages = require("next-images")
const withPlugins = require("next-compose-plugins")

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  {
    typescript: {
      ignoreDevErrors: true,
    },
  },
)
