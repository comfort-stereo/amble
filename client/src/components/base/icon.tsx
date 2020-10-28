import { SimpleLineIcons as BaseIcon } from "@expo/vector-icons"
import React, { forwardRef } from "react"
import { useTheme } from "../../common/theme"

type Props = Readonly<React.ComponentProps<typeof BaseIcon>>

export const Icon = forwardRef<typeof BaseIcon, Props>(function Icon(
  { name, color, ...props },
  ref,
) {
  const theme = useTheme()
  return (
    <BaseIcon
      {...props}
      ref={ref as any}
      name={name}
      color={color ?? theme.contentColorFor("surface").string()}
    />
  )
})
