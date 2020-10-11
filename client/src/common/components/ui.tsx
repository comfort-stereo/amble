import { JSXElementConstructor } from "react"
import {
  Text as BaseText,
  TextInput as BaseTextInput,
  TouchableOpacity as BaseTouchableOpacity,
  View as BaseView,
} from "react-native"

type ComponentProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = React.ComponentProps<T>

type ComponentPropsWithChildren<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = React.PropsWithChildren<React.ComponentProps<T>>

type ButtonProps = React.ComponentProps<typeof BaseTouchableOpacity> & {
  children?: string | null | undefined
}

export function Button(props: ButtonProps) {
  return <BaseTouchableOpacity {...props} />
}

export function Text(props: ComponentPropsWithChildren<typeof BaseText>) {
  return <BaseText {...props} />
}

export function TextInput(props: ComponentProps<typeof BaseTextInput>) {
  return <BaseTextInput {...props} />
}

export function TouchableOpacity(props: ComponentPropsWithChildren<typeof BaseTouchableOpacity>) {
  return <BaseTouchableOpacity {...props} />
}

export function View(props: ComponentPropsWithChildren<typeof BaseView>) {
  return <BaseView {...props} />
}
