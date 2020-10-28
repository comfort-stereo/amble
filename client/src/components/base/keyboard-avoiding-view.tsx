import React, { forwardRef } from "react"
import { KeyboardAvoidingView as BaseKeyboardAvoidingView } from "react-native"
import { environment } from "../../../environment"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof BaseKeyboardAvoidingView>

const IOS_DEFAULT_KEYBOARD_VERTICAL_OFFSET = 55
const ANDROID_DEFAULT_KEYBOARD_VERTICAL_OFFSET = 30

export const KeyboardAvoidingView = forwardRef<BaseKeyboardAvoidingView, Props>(
  function KeyboardAvoidingView({ keyboardVerticalOffset, ...props }, ref) {
    function getKeyboardVerticalOffset(): number {
      if (keyboardVerticalOffset != null) {
        return keyboardVerticalOffset
      }

      return environment.isIOS
        ? IOS_DEFAULT_KEYBOARD_VERTICAL_OFFSET
        : ANDROID_DEFAULT_KEYBOARD_VERTICAL_OFFSET
    }

    return (
      <BaseKeyboardAvoidingView
        {...props}
        ref={ref}
        keyboardVerticalOffset={getKeyboardVerticalOffset()}
      />
    )
  },
)
