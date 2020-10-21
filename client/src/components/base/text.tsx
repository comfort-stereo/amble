import React, { forwardRef } from "react"
import { Text as Base } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof Base>

export const Text = forwardRef<Base, Props>(function Text({ style, ...props }, ref) {
  const styles = useStyles(
    (theme) => ({
      root: {
        color: theme.contentColorFor("surface").string(),
      },
    }),
    [],
  )

  return <Base {...props} ref={ref} style={[styles.root, style]} />
})
