import React, { forwardRef } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof View>

export const Container = forwardRef<View, Props>(function Container(
  { style, children, ...props },
  ref,
) {
  const styles = useStyles(
    () => ({
      root: {
        alignItems: "center",
        flexGrow: 1,
        width: "100%",
      },
      content: {
        alignItems: "center",
        flexDirection: "column",
        flexGrow: 1,
        maxWidth: 650,
        paddingHorizontal: 5,
        width: "100%",
      },
    }),
    [],
  )

  return (
    <View {...props} style={[styles.root, style]} ref={ref}>
      <View style={styles.content}>{children}</View>
    </View>
  )
})
