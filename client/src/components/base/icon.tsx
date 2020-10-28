import { Ionicons } from "@expo/vector-icons"
import React, { forwardRef } from "react"

type Props = Readonly<React.ComponentProps<typeof Ionicons>>

export const Icon = forwardRef<typeof Ionicons, Props>(function Icon({ name, ...props }, ref) {
  return <Ionicons {...props} ref={ref as any} name={"md-" + name} />
})
