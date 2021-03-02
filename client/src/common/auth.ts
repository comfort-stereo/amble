import { UUID } from "@amble/common/uuid"
import _ from "lodash"
import { useMeQuery } from "../generated/graphql"

export type UserInfo = Readonly<{
  id: UUID
  username: string
  email: string
}>

export function useUser(): UserInfo | null {
  const { data } = useMeQuery()
  if (data?.me != null) {
    return _.pick(data.me, ["id", "username", "email"])
  }

  return null
}
