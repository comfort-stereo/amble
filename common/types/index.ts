export type Dictionary<T> = { [key: string]: T }
export type Maybe<T> = T | null | undefined
export type Opaque<T, K extends string> = T & { __type__: K }
