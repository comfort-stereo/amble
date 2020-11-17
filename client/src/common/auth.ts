import { UUID } from "@amble/common/uuid"
import { gql, useQuery } from "@apollo/client"
import _ from "lodash"
import { MeQuery, MeQueryVariables } from "../generated/graphql"

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`

export const LOGIN_MUTATION = gql`
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
`

export const REFRESH_MUTATION = gql`
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
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`

const ME_QUERY = gql`
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
  const { data } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY)
  if (data?.me != null) {
    return _.pick(data.me, ["id", "username", "email"])
  }

  return null
}
