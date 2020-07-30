import { GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"

import { isUUID } from "class-validator"
import { v4 as uuid4 } from "uuid"

export type EntID = string

export const EntID = new GraphQLScalarType({
  name: "EntID",
  description: "UUID associated with an entity. Passed in string format.",
  serialize: (value) => value,
  parseValue: (value) => eid(value),
  parseLiteral: (ast) => {
    if (ast.kind === "StringValue") {
      return eid(ast.value)
    }

    return null
  },
} as GraphQLScalarTypeConfig<EntID, string>)

export function eid(value?: any): EntID {
  if (arguments.length === 0) {
    const base = uuid4()
    const time = new Date().getTime()
    const hex = time.toString(16).padStart(12, "0")
    const prefix = hex.slice(0, 8) + "-" + hex.slice(8, 12)
    return (prefix + base.substring(prefix.length)) as EntID
  }

  const id = maybeEid(value)
  if (id == null) {
    throw new GraphQLError(`Invalid EntID: ${value}`)
  }

  return id
}

export function maybeEid(value: any): EntID | null {
  if (isEid(value)) {
    return value as EntID
  }

  return null
}

export function isEid(value: any): value is EntID {
  return isUUID(value)
}

export function getEidTime(id: EntID): number {
  const prefix = id.substring(0, 13)
  const left = prefix.substring(0, 8)
  const right = prefix.substring(left.length + 1, prefix.length)
  return parseInt(left + right, 16)
}
