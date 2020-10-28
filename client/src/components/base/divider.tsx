import React, { forwardRef } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof View>

export const Divider = forwardRef<View, Props>(function Divider({ style, ...props }, ref) {
  const styles = useStyles(
    (theme) => ({
      root: {
        height: 1,
        backgroundColor: theme.contentColorFor("surface").string(),
        opacity: 0.25,
      },
    }),
    [],
  )

  return <View {...props} style={[styles.root, style]} ref={ref} />
})
