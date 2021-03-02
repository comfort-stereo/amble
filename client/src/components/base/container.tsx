import React, { forwardRef } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Width = "compact" | "normal" | "wide"
type Props = Readonly<
  ComponentPropsWithChildren<typeof View> & {
    width?: Width
  }
>

export const Container = forwardRef<View, Props>(function Container(
  { style, width = "normal", children, ...props },
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
        maxWidth: (() => {
          switch (width) {
            case "compact":
              return 400
            case "normal":
              return 650
            case "wide":
              return 800
          }
        })(),
        paddingHorizontal: 5,
        width: "100%",
      },
    }),
    [width],
  )

  return (
    <View {...props} style={[styles.root, style]} ref={ref}>
      <View style={styles.content}>{children}</View>
    </View>
  )
})
