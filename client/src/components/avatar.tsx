import React, { useMemo } from "react"
import { useStyles, useTheme } from "../common/theme"
import { ComponentProps } from "../common/types"
import { View } from "./base"
import { Identicon } from "./identicon"

type Props = Readonly<
  ComponentProps<typeof View> & {
    user: Readonly<{ username: string }> | null
    size: number
  }
>

export function Avatar({ style, user, size, ...props }: Props) {
  const theme = useTheme()
  const colors = useMemo(() => {
    const alt = 0.5
    return [
      theme.colorFor("surface").lighten(alt).string(),
      theme.colorFor("surface").string(),
      theme.contentColorFor("surface").lighten(alt).string(),
      theme.contentColorFor("surface").string(),
      theme.colorFor("primary").lighten(alt).string(),
      theme.colorFor("primary").string(),
      theme.colorFor("secondary").lighten(alt).string(),
      theme.colorFor("secondary").string(),
    ]
  }, [theme])

  const styles = useStyles(
    (theme) => ({
      root: {
        borderRadius: size / 4,
        borderWidth: 1,
        borderColor: theme.contentColorFor("surface").string(),
      },
    }),
    [size],
  )

  return (
    <Identicon
      {...props}
      style={[styles.root, style]}
      content={user?.username ?? ""}
      size={size}
      divisions={4}
      colors={colors}
    />
  )
}
