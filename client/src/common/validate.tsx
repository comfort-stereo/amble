import { zodResolver } from "@hookform/resolvers/zod"
import * as Zod from "zod"

const content = {
  ...Zod,
  resolver: zodResolver,
}

export declare type ValidationSchema<
  T extends {
    _type: any
  }
> = Zod.infer<T>

export const Validate: Readonly<typeof content> = content
