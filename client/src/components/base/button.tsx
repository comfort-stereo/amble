import Color from "color"
import React, { forwardRef, useRef } from "react"
import { TouchableOpacity } from "react-native"
import { useFocus, useHover } from "react-native-web-hooks"
import { useMergedRef } from "../../common/hooks"
import { useStyles, useTheme } from "../../common/theme"
import { Text } from "./text"

type ButtonSize = "small" | "medium" | "large"
type ButtonType = "fill" | "flat"

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  label: string
  role?: "primary" | "secondary"
  size?: ButtonSize
  type?: ButtonType
  isDisabled?: boolean
}

export const Button = forwardRef<TouchableOpacity, Props>(function Button(
  { label, role = "primary", size = "medium", type = "fill", isDisabled = false, style, ...props },
  ref,
) {
  const theme = useTheme()

  const localRef = useRef(null)
  const isHovered = useHover(localRef)
  const isFocused = useFocus(localRef)
  const mergedRef = useMergedRef(ref, localRef)

  const color = (() => {
    const result = theme.colorFor(role)
    if (isHovered) {
      return Color(result).darken(0.1)
    }

    return result
  })()

  const styles = useStyles(
    (theme) => ({
      root: {
        marginHorizontal: 5,
        transform: [{ skewX: "-10deg" }],
        borderRadius: 3,
        alignItems: "center",
        backgroundColor: type === "fill" ? color.string() : "transparent",
        borderColor: isFocused ? theme.contentColorFor("primary").string() : "transparent",
        opacity: isDisabled ? 0.75 : 1,
        borderWidth: 1,
        borderStyle: isFocused ? "dashed" : "solid",
      },
      noFill: {
        borderWidth: 2,
      },
      small: {
        paddingHorizontal: 8,
        paddingVertical: 6,
      },
      medium: {
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      large: {
        paddingHorizontal: 12,
        paddingVertical: 10,
      },
      label: {
        transform: [{ skewX: "10deg" }],
        color: type === "fill" ? theme.contentColorFor(role).hex() : theme.colorFor(role).hex(),
        fontWeight: "bold",
        fontStyle: "italic",
        textTransform: "uppercase",
      },
    }),
    [color, isDisabled],
  )

  return (
    <TouchableOpacity {...props} ref={mergedRef} style={[styles.root, styles[size], style]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
})
