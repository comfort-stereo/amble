import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Constants from "expo-constants"
import Head from "next/head"
import React, { ComponentProps, forwardRef, ReactNode } from "react"
import { View } from "react-native"
import { environment } from "../../environment"
import { useStyles } from "../common/theme"
import { setGlobalNavigation } from "./global-navigation"
import { Nav } from "./nav"

export type ScreenMeta = Readonly<{
  title?: string
  description?: string
}>

type Props = Readonly<
  ComponentProps<typeof View> & {
    meta?: ScreenMeta
    children?: ReactNode
  }
>

export const Screen = forwardRef<View, Props>(function Screen(
  { meta = {}, children, style, ...props },
  ref,
) {
  const navigation = useNavigation()
  useFocusEffect(() => {
    setGlobalNavigation(navigation)
  })

  const styles = useStyles(
    (theme) => ({
      root: {
        backgroundColor: theme.background("neutral").string(),
        flex: 1,
        paddingTop: Constants.statusBarHeight,
      },
    }),
    [],
  )

  return (
    <View {...props} ref={ref} style={[styles.root]}>
      {environment.isWeb && <Nav />}
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>
      <View style={style}>{children}</View>
    </View>
  )
})
