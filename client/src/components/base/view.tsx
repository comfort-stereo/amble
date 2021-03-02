import React, { forwardRef } from "react"
import { View as BaseView } from "react-native"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof BaseView>

export const View = forwardRef<BaseView, Props>(function View(props, ref) {
  return <BaseView {...props} ref={ref} />
})
