import React, { forwardRef } from "react"
import { StyleSheet, Text as Base } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = Readonly<
  ComponentPropsWithChildren<typeof Base> & {
    preset?: TextPreset
  }
>

const presets = StyleSheet.create({
  "content-sm": {
    fontSize: 13,
  },
  "content-md": {
    fontSize: 15,
  },
  "content-lg": {
    fontSize: 17,
  },
  "ui-sm": {
    fontSize: 13,
  },
  "ui-md": {
    fontSize: 15,
  },
  "ui-lg": {
    fontSize: 17,
  },
  "header-sm": {
    fontSize: 15,
  },
  "header-md": {
    fontSize: 13,
  },
  "header-lg": {
    fontSize: 17,
  },
})

export type TextPreset = keyof typeof presets

export const Text = forwardRef<Base, Props>(function Text(
  { style, preset = "content-md", ...props },
  ref,
) {
  const styles = useStyles(
    (theme) => ({
      root: {
        color: theme.foreground("neutral").string(),
      },
    }),
    [],
  )

  return <Base {...props} ref={ref} style={[styles.root, presets[preset], style]} />
})
