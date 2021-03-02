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
      theme.background("neutral").lighten(alt).string(),
      theme.background("neutral").string(),
      theme.foreground("neutral").lighten(alt).string(),
      theme.foreground("neutral").string(),
      theme.background("primary").lighten(alt).string(),
      theme.background("primary").string(),
      theme.background("secondary").lighten(alt).string(),
      theme.background("secondary").string(),
    ]
  }, [theme])

  const styles = useStyles(
    (theme) => ({
      root: {
        borderRadius: size / 8,
        borderWidth: 2,
        borderColor: theme.foreground("neutral").string(),
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
      divisions={5}
      colors={colors}
    />
  )
}
