import { UUID } from "@amble/common/uuid"
import { gql } from "@apollo/client"
import _ from "lodash"
import { useMeQuery } from "../generated/graphql"

gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }

  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
      }
      accessToken
    }
  }

  mutation Refresh {
    refresh {
      user {
        id
        username
        email
      }
      accessToken
    }
  }

  mutation Logout {
    logout {
      success
    }
  }

  query ME {
    me {
      id
      username
      email
    }
  }
`

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
