import React, { forwardRef, useRef } from "react"
import { TouchableOpacity, View } from "react-native"
import { useFocus, useHover } from "react-native-web-hooks"
import { useMergedRef } from "../../common/hooks"
import { useStyles, useTheme } from "../../common/theme"
import { Icon } from "./icon"
import { Link } from "./link"
import { Text } from "./text"

type ButtonSize = "small" | "medium" | "large"
type ButtonType = "fill" | "no-fill" | "flat"
type ButtonWidth = "full" | "half" | "standard"

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  to?: string
  label: string
  icon?: string
  role?: "primary" | "secondary" | "warning" | "danger"
  size?: ButtonSize
  type?: ButtonType
  width?: ButtonWidth
  isDisabled?: boolean
  onPress?: () => void
}

export const Button = forwardRef<TouchableOpacity, Props>(function Button(
  {
    to,
    label,
    icon,
    role = "primary",
    size = "medium",
    type = "fill",
    width = "standard",
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

  const theme = useTheme()
  const color = (() => {
    const result = theme.background(role)
    if (isDisabled) {
      return result
    }

    if (isHovered) {
      return result.darken(0.1)
    }

    return result
  })()

  const styles = useStyles(
    (theme) => {
      return {
        root: {
          ...{
            full: { width: "100%" },
            half: { width: "50%" },
            standard: {},
          }[width],
        },
        content: {
          marginHorizontal: 5,
          transform: [{ skewX: "-10deg" }],
          borderRadius: 3,
          alignItems: "center",
          backgroundColor: type === "fill" ? color.string() : "transparent",
          borderColor: type !== "flat" || isFocused ? color.string() : "transparent",
          opacity: isDisabled ? 0.75 : 1,
          borderWidth: 1,
          borderStyle: isFocused ? "dashed" : "solid",
          justifyContent: "center",
          flexDirection: "row",
        },
        inner: {
          alignItems: "center",
          flexDirection: "row",
          paddingRight: icon == null ? 0 : 10,
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
          paddingHorizontal: 14,
          paddingVertical: 12,
        },
        label: {
          transform: [{ skewX: "10deg" }],
          color: type === "fill" ? theme.foreground(role).string() : color.string(),
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 16,
        },
        icon: {
          transform: [{ skewX: "10deg" }],
          marginRight: 8,
          fontStyle: "italic",
        },
      }
    },
    [color, icon, isDisabled, isFocused, role, type, width],
  )

  function renderLabel() {
    return <Text style={styles.label}>{label}</Text>
  }

  function renderIcon() {
    if (icon == null) {
      return null
    }

    return (
      <Icon
        style={styles.icon}
        name={icon}
        size={16}
        color={type === "fill" ? theme.foreground(role).string() : color.string()}
      />
    )
  }

  function renderInner() {
    return (
      <View style={styles.inner}>
        {renderIcon()}
        {renderLabel()}
      </View>
    )
  }

  function renderContent() {
    if (to != null) {
      return (
        <Link
          style={[styles.content, styles[size]]}
          to={to}
          onPress={() => {
            if (onPress != null) {
              onPress()
            }
          }}
        >
          {renderInner()}
        </Link>
      )
    }
    return <View style={[styles.content, styles[size], style]}>{renderInner()}</View>
  }

  return (
    <TouchableOpacity
      {...props}
      ref={mergedRef}
      disabled={isDisabled}
      onPress={() => {
        if (to == null && onPress != null) {
          onPress()
        }
      }}
      style={[styles.root, style]}
    >
      {renderContent()}
    </TouchableOpacity>
  )
})
