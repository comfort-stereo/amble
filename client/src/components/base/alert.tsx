import React, { ComponentPropsWithRef, forwardRef } from "react"
import { View } from "react-native"
import { ColorRole, useStyles } from "../../common/theme"
import { Text } from "./text"

type Props = Readonly<
  ComponentPropsWithRef<typeof View> & {
    message: string
    role?: ColorRole
  }
>

export const Alert = forwardRef<View, Props>(function Alert(
  { style, message, role = "danger", ...props },
  ref,
) {
  const styles = useStyles(
    (theme) => ({
      root: {
        padding: 12,
        backgroundColor: theme.background(role).alpha(0.4).string(),
        borderRadius: 7,
      },
      message: {
        color: theme.foreground(role).string(),
        fontSize: 13,
        textAlign: "center",
      },
    }),
    [role],
  )

  return (
    <View {...props} ref={ref} style={[styles.root, style]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
})
