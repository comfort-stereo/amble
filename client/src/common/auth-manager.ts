import { UUID } from "@amble/common/uuid"
import { gql, useApolloClient, useQuery } from "@apollo/client"
import { useCallback, useMemo } from "react"
import { LoginMutation, RefreshMutation } from "../generated/graphql"
import { Apollo } from "./apollo"
import { AuthStore } from "./auth-store"
import { useInterval } from "./hooks"

type UserInfo = Readonly<{
  id: UUID
  username: string
  email: string
}>

export type AuthResult = Readonly<
  | {
      type: "success"
      user: UserInfo
    }
  | {
      type: "failed"
    }
  | {
      type: "error"
    }
>

const LOGIN_MUTATION = gql`
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

const REFRESH_MUTATION = gql`
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

const LOGOUT_MUTATION = gql`
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

const AUTH_REFRESH_INTERVAL_MS = 1000 * 60 * 10

export function useAuth(): AuthManager {
  const apollo = useApolloClient()
  return useMemo(() => new AuthManager(apollo), [apollo])
}

export function useAuthRefresh(): void {
  const auth = useAuth()
  const refresh = useCallback(async () => {
    await auth.refresh()
  }, [auth])

  useInterval(refresh, AUTH_REFRESH_INTERVAL_MS, {
    immediate: true,
  })
}

export function useUser(): UserInfo | null {
  const { data } = useQuery(ME_QUERY)
  if (data != null) {
    return data.me
  }

  return null
}

export class AuthManager {
  constructor(private readonly apollo: Apollo) {}

  async login(username: string, password: string): Promise<AuthResult> {
    await this.logout()

    const { data, errors } = await this.apollo.mutate<LoginMutation>({
      errorPolicy: "all",
      mutation: LOGIN_MUTATION,
      variables: {
        username,
        password,
      },
    })

    if (data == null || errors != null) {
      return { type: "error" }
    }

    if (data.login == null) {
      return { type: "failed" }
    }

    const { user, accessToken } = data.login
    await AuthStore.setAccessToken(accessToken)

    return { type: "success", user }
  }

  async refresh(): Promise<AuthResult> {
    const accessToken = await AuthStore.loadAccessToken()
    if (accessToken == null) {
      return { type: "failed" }
    }

    const { data, errors } = await this.apollo.mutate<RefreshMutation>({
      mutation: REFRESH_MUTATION,
      variables: {
        accessToken,
      },
    })

    if (data == null || errors != null) {
      return { type: "error" }
    }

    if (data.refresh == null) {
      return { type: "failed" }
    }

    const { user, accessToken: newAccessToken } = data.refresh
    await AuthStore.setAccessToken(newAccessToken)

    return { type: "success", user }
  }

  async logout(): Promise<void> {
    await this.apollo.resetStore()
    await Promise.all([
      this.apollo.mutate({
        mutation: LOGOUT_MUTATION,
      }),
      AuthStore.deleteAccessToken(),
    ])
  }
}
