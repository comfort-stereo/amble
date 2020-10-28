import React, { forwardRef, useRef, useState } from "react"
import { TextInput as Base } from "react-native"
import { useFocus } from "react-native-web-hooks"
import { useMergedRef } from "../../common/hooks"
import { useStyles, useTheme } from "../../common/theme"
import { ComponentProps } from "../../common/types"
import { Text } from "./text"
import { View } from "./view"

type Props = ComponentProps<typeof Base> &
  Readonly<{
    label?: string
    error?: string
    onEnter?: () => void
  }>

export const TextInput = forwardRef<Base, Props>(function TextInput(
  {
    style,
    label,
    error,
    onEnter,
    onKeyPress,
    onFocus,
    onBlur,
    accessibilityLabel,
    autoCapitalize = "none",
    selectionColor,
    ...props
  },
  ref,
) {
  const localRef = useRef(null)
  const isWebFocused = useFocus(localRef)
  const [isNativeFocused, setIsNativeFocused] = useState(false)
  const isFocused = isWebFocused || isNativeFocused
  const mergedRef = useMergedRef(ref, localRef)

  const theme = useTheme()
  const styles = useStyles(
    (theme) => ({
      root: {
        paddingVertical: 4,
      },
      input: {
        padding: 12,
        borderRadius: 5,
        borderColor:
          error == null
            ? theme.contentColorFor("surface").alpha(0.75).string()
            : theme.colorFor("error").string(),
        borderStyle: isFocused ? "dashed" : "solid",
        borderWidth: 1,
        width: "100%",
        fontSize: 17,
        color: theme.contentColorFor("surface").string(),
      },
      label: {
        fontSize: 13,
        color:
          error == null
            ? theme.contentColorFor("surface").string()
            : theme.colorFor("error").string(),
        marginBottom: 4,
        marginLeft: 3,
      },
      error: {
        fontSize: 12,
        color: theme.colorFor("error").string(),
        fontStyle: "italic",
        paddingTop: 2,
        marginHorizontal: 4,
      },
    }),
    [error, isFocused],
  )

  return (
    <View style={styles.root}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <Base
        {...props}
        ref={mergedRef}
        style={[styles.input, style]}
        accessibilityLabel={accessibilityLabel ?? label}
        autoCapitalize={autoCapitalize}
        selectionColor={
          selectionColor ??
          (error == null
            ? theme.contentColorFor("surface").string()
            : theme.colorFor("error").string())
        }
        onKeyPress={
          onEnter == null
            ? onKeyPress
            : (event) => {
                if (event.nativeEvent.key === "Enter") {
                  onEnter()
                }
                if (onKeyPress != null) {
                  onKeyPress(event)
                }
              }
        }
        onFocus={(event) => {
          setIsNativeFocused(true)
          if (onFocus != null) {
            onFocus(event)
          }
        }}
        onBlur={(event) => {
          setIsNativeFocused(false)
          if (onBlur != null) {
            onBlur(event)
          }
        }}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
    </View>
  )
})
