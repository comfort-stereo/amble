export type Opaque<T, K extends string> = T & { __type__: K }
export type Maybe<T> = T | null | undefined
