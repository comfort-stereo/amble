import { HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { environment } from "../../environment"
import { AuthStore } from "./auth-store"

export type Headers = Record<string, string | undefined>

export function createApolloLink(getAddedHeaders: () => Headers | Promise<Headers> = () => ({})) {
  const http = new HttpLink({
    uri: environment.graphqlURI,
    // Send cookies, including the access token cookie if present.
    credentials: "same-origin",
  })

  const auth = setContext(async (_, { headers }) => {
    const [defaultHeaders, addedHeaders] = await Promise.all([
      getDefaultHeaders(),
      getAddedHeaders(),
    ])

    return {
      headers: {
        ...headers,
        ...defaultHeaders,
        ...addedHeaders,
      },
    }
  })

  return auth.concat(http)
}

async function getDefaultHeaders(): Promise<Headers> {
  if (environment.isWeb) {
    return {}
  }

  // If we're on not on the server or in a browser, set the authorization header to the stored access token.
  return {
    authorization: (await AuthStore.getNativeAuthorizationHeader()) ?? undefined,
  }
}
