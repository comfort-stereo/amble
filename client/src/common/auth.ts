import { UUID } from "@amble/common/uuid"
import { FetchResult, gql, useApolloClient, useQuery } from "@apollo/client"
import { useCallback, useMemo, useState } from "react"
import { environment } from "../../environment"
import {
  LoginMutation,
  LoginMutationVariables,
  LogoutMutation,
  LogoutMutationVariables,
  RefreshMutation,
  RefreshMutationVariables,
} from "../generated/graphql"
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

export function useAuth(): Auth {
  const apollo = useApolloClient()
  return useMemo(() => new Auth(apollo), [apollo])
}

export function useAuthRefresh(): boolean {
  const auth = useAuth()
  const [isReady, setIsReady] = useState(false)

  const refresh = useCallback(async () => {
    await auth.refresh()
    setIsReady(true)
  }, [auth])

  useInterval(refresh, AUTH_REFRESH_INTERVAL_MS, {
    immediate: true,
  })

  return isReady
}

export function useUser(): UserInfo | null {
  const { data } = useQuery(ME_QUERY)
  if (data != null) {
    return data.me
  }

  return null
}

export class Auth {
  constructor(private readonly apollo: Apollo) {}

  async login(username: string, password: string): Promise<FetchResult<LoginMutation>> {
    await this.apollo.mutate({ mutation: LOGOUT_MUTATION })
    await this.clear()

    const results = await this.apollo.mutate<LoginMutation, LoginMutationVariables>({
      errorPolicy: "all",
      mutation: LOGIN_MUTATION,
      fetchPolicy: "no-cache",
      variables: {
        username,
        password,
      },
    })

    if (results.data?.login != null) {
      const { accessToken } = results.data.login
      if (environment.isNative) {
        await AuthStore.setNativeAccessToken(accessToken)
      }
    }

    await this.refetch()
    return results
  }

  async refresh(): Promise<FetchResult<RefreshMutation>> {
    await AuthStore.load()
    const results = await this.apollo.mutate<RefreshMutation, RefreshMutationVariables>({
      mutation: REFRESH_MUTATION,
      fetchPolicy: "no-cache",
    })

    if (results.data?.refresh != null) {
      const { accessToken: newAccessToken } = results.data.refresh
      if (environment.isNative) {
        await AuthStore.setNativeAccessToken(newAccessToken)
      }
    }

    await this.refetch()
    return results
  }

  async logout(): Promise<FetchResult<LogoutMutation>> {
    const result = await this.apollo.mutate<LogoutMutation, LogoutMutationVariables>({
      mutation: LOGOUT_MUTATION,
      fetchPolicy: "no-cache",
    })

    await this.clear()
    await this.refetch()
    return result
  }

  private async clear() {
    await AuthStore.clear()
    await this.apollo.resetStore()
    await this.apollo.cache.reset()
  }

  private async refetch() {
    await this.apollo.reFetchObservableQueries(true)
  }
}
