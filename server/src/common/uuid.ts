import { isUUID as isUUIDImpl } from "class-validator"
import { GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { v4 } from "uuid"
import { Opaque } from "./types"

export type UUID = Opaque<string, "UUID">

export const UUID = new GraphQLScalarType({
  name: "UUID",
  description: "A UUID passed in string format.",
  serialize: (value) => value,
  parseValue: (value) => uuid(value),
  parseLiteral: (ast) => {
    if (ast.kind === "StringValue") {
      return uuid(ast.value)
    }

    return null
  },
} as GraphQLScalarTypeConfig<UUID, string>)

export function uuid(value?: any): UUID {
  if (arguments.length === 0) {
    const base = v4()
    const time = new Date().getTime()
    const hex = time.toString(16).padStart(12, "0")
    const prefix = hex.slice(0, 8) + "-" + hex.slice(8, 12)
    return (prefix + base.substring(prefix.length)) as UUID
  }

  if (isUUID(value)) {
    return value
  }

  throw new GraphQLError(`Invalid UUID: ${value}`)
}

export function maybeUUID(value: unknown): UUID | null {
  if (isUUID(value)) {
    return value as UUID
  }

  return null
}

export function isUUID(value: unknown): value is UUID {
  return isUUIDImpl(value)
}
