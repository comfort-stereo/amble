import Head from "next/head"
import React, { ComponentProps, forwardRef, ReactNode } from "react"
import { View } from "react-native"
import { useStyles } from "../../common/theme"
import { Nav } from "../nav"

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
  const styles = useStyles(
    (theme) => ({
      root: {
        backgroundColor: theme.colorFor("surface").hex(),
        flex: 1,
      },
    }),
    [],
  )

  return (
    <View {...props} ref={ref} style={[styles.root]}>
      <Nav />
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>
      <View style={style}>{children}</View>
    </View>
  )
})
