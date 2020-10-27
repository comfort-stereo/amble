import { Ionicons } from "@expo/vector-icons"
import React, { forwardRef } from "react"
import { environment } from "../../../environment"

type Props = Readonly<React.ComponentProps<typeof Ionicons>>

export const Icon = forwardRef<typeof Ionicons, Props>(function Icon({ name, ...props }, ref) {
  name = (environment.isIOS ? "ios-" : "md-") + name
  return <Ionicons {...props} ref={ref as any} name={name} />
})
