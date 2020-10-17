import Head from "next/head"
import React, { ComponentProps, ReactNode } from "react"
import { View } from "./ui"

export type ScreenMeta = Readonly<{
  title?: string
  description?: string
}>

type Props = ComponentProps<typeof View> &
  Readonly<{
    meta?: ScreenMeta
    children?: ReactNode
  }>

export function Screen({ meta = {}, children, ...props }: Props) {
  return (
    <View {...props}>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>
      {children}
    </View>
  )
}
