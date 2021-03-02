import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof KeyboardAwareScrollView>
export function Scroll({
  keyboardOpeningTime = 0,
  extraScrollHeight = 150,
  style,
  contentContainerStyle,
  ...props
}: Props) {
  const styles = useStyles(
    () => ({
      root: {
        width: "100%",
      },
      contentContainer: {
        alignItems: "center",
        paddingVertical: 10,
      },
    }),
    [],
  )
  return (
    <KeyboardAwareScrollView
      {...props}
      style={[styles.root, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardOpeningTime={keyboardOpeningTime}
      extraScrollHeight={extraScrollHeight}
    />
  )
}
