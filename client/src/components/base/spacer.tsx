import React, { forwardRef } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof View>

export const Spacer = forwardRef<View, Props>(function Divider({ style, ...props }, ref) {
  const styles = useStyles(
    () => ({
      root: {
        flexGrow: 1,
      },
    }),
    [],
  )

  return <View {...props} style={[styles.root, style]} ref={ref} />
})
