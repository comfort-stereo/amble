import React, { forwardRef } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = Readonly<
  ComponentPropsWithChildren<typeof View> & {
    grow?: number
  }
>

export const Spacer = forwardRef<View, Props>(function Divider({ style, grow, ...props }, ref) {
  const styles = useStyles(
    () => ({
      root: {
        flexGrow: grow ?? 1,
      },
    }),
    [grow],
  )

  return <View {...props} style={[styles.root, style]} ref={ref} />
})
