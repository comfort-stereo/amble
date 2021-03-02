import { JSXElementConstructor } from "react"

export type ComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = Readonly<React.ComponentPropsWithRef<T>>

export type ComponentPropsWithChildren<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = Readonly<
  React.PropsWithChildren<React.ComponentProps<T>> &
    React.ComponentPropsWithRef<React.ComponentProps<T>>
>
