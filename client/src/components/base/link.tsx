import { Link as BaseLink } from "@react-navigation/native"
import React from "react"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof BaseLink>

export function Link({ style, ...props }: Props) {
  const styles = useStyles(
    () => ({
      root: {
        margin: 0,
        padding: 0,
        fontStyle: "normal",
        fontWeight: "normal",
        display: "flex",
        flexDirection: "column",
      },
    }),
    [],
  )
  return <BaseLink {...props} style={[styles.root, style]} />
}
