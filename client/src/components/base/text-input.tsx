import React, { forwardRef, useRef } from "react"
import { TextInput as Base } from "react-native"
import { useFocus } from "react-native-web-hooks"
import { useMergedRef } from "../../common/hooks"
import { useStyles } from "../../common/theme"
import { ComponentProps } from "../../common/types"
import { Text } from "./text"
import { View } from "./view"

type Props = ComponentProps<typeof Base> &
  Readonly<{
    label?: string
  }>

export const TextInput = forwardRef<Base, Props>(function TextInput(
  { style, label, onFocus, onBlur, ...props },
  ref,
) {
  const localRef = useRef(null)
  const isFocused = useFocus(localRef)
  const mergedRef = useMergedRef(ref, localRef)

  const styles = useStyles(
    (theme) => ({
      root: {
        paddingVertical: 4,
      },
      input: {
        padding: 8,
        borderRadius: 3,
        borderColor: isFocused
          ? theme.contentColorFor("surface").string()
          : theme.contentColorFor("surface").alpha(0.75).string(),
        borderStyle: isFocused ? "dashed" : "solid",
        borderWidth: 1,
        width: "100%",
        fontSize: 15,
        color: theme.contentColorFor("surface").string(),
        backgroundColor: theme.colorFor("surface").darken(0.085).string(),
      },
      label: {
        fontSize: 13,
        color: theme.contentColorFor("surface").string(),
        paddingBottom: 3,
      },
    }),
    [isFocused],
  )

  console.log(isFocused)

  return (
    <View style={styles.root}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <Base {...props} ref={mergedRef} style={[styles.input, style]} />
    </View>
  )
})
