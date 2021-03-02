import Constants from "expo-constants"
import Head from "next/head"
import React, { ComponentProps, forwardRef, ReactNode } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"

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
  { meta, children, style, ...props },
  ref,
) {
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
    <>
      <Head>
        {meta?.title != null && <title>{meta.title}</title>}
        {meta?.description != null && <meta name="description" content={meta.description} />}
      </Head>
      <View {...props} ref={ref} style={[styles.root, style]}>
        {children}
      </View>
    </>
  )
})
