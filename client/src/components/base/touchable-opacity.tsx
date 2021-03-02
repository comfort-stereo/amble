import React, { forwardRef } from "react"
import { TouchableOpacity as Base } from "react-native"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof Base>

export const TouchableOpacity = forwardRef<Base, Props>(function TouchableOpacity(props, ref) {
  return <Base {...props} ref={ref} />
})
