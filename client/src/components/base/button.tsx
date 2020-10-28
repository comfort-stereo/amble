import React, { forwardRef, useRef } from "react"
import { TouchableOpacity, View } from "react-native"
import { useFocus, useHover } from "react-native-web-hooks"
import { useMergedRef } from "../../common/hooks"
import { useStyles } from "../../common/theme"
import { Link } from "./link"
import { Text } from "./text"

type ButtonSize = "small" | "medium" | "large"
type ButtonType = "fill" | "no-fill" | "flat"

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  to?: string
  label: string
  role?: "primary" | "secondary"
  size?: ButtonSize
  type?: ButtonType
  isDisabled?: boolean
  onPress?: () => void
}

export const Button = forwardRef<TouchableOpacity, Props>(function Button(
  {
    to,
    label,
    role = "primary",
    size = "medium",
    type = "fill",
    isDisabled = false,
    style,
    onPress,
    ...props
  },
  ref,
) {
  const localRef = useRef(null)
  const isHovered = useHover(localRef)
  const isFocused = useFocus(localRef)
  const mergedRef = useMergedRef(ref, localRef)

  const styles = useStyles(
    (theme) => {
      const color = (() => {
        const result = theme.colorFor(role)
        if (isHovered) {
          return result.darken(0.1)
        }

        return result
      })()

      return {
        inner: {
          marginHorizontal: 5,
          transform: [{ skewX: "-10deg" }],
          borderRadius: 3,
          alignItems: "center",
          backgroundColor: type === "fill" ? color.string() : "transparent",
          borderColor: color.string(),
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
          color:
            type === "fill" ? theme.contentColorFor(role).string() : theme.colorFor(role).string(),
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 16,
        },
      }
    },
    [isDisabled, isFocused, isHovered, role, type],
  )

  let result = <Text style={styles.label}>{label}</Text>

  if (to != null) {
    result = (
      <Link
        style={[styles.inner, styles[size], style]}
        to={to}
        onPress={() => {
          if (onPress != null) {
            onPress()
          }
        }}
      >
        {result}
      </Link>
    )
  } else {
    result = <View style={[styles.inner, styles[size], style]}>{result}</View>
  }

  result = (
    <TouchableOpacity
      {...props}
      ref={mergedRef}
      disabled={isDisabled}
      onPress={() => {
        if (to == null && onPress != null) {
          onPress()
        }
      }}
    >
      {result}
    </TouchableOpacity>
  )

  return result
})
