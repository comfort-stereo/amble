import { environment } from "../../environment"
import { ClientStorage } from "./client-storage"

const NATIVE_ACCESS_TOKEN_KEY = "access-token"

let globalAccessToken: string | null = null

export class AuthStore {
  static async load(): Promise<void> {
    if (environment.isNative) {
      if (globalAccessToken == null) {
        globalAccessToken = await ClientStorage.get(NATIVE_ACCESS_TOKEN_KEY)
      }
    }
  }

  static async clear(): Promise<void> {
    if (environment.isNative) {
      globalAccessToken = null
      await ClientStorage.delete(NATIVE_ACCESS_TOKEN_KEY)
    }
  }

  static async setNativeAccessToken(accessToken: string): Promise<void> {
    if (environment.isNative) {
      globalAccessToken = accessToken
      await ClientStorage.set(NATIVE_ACCESS_TOKEN_KEY, globalAccessToken)
    }
  }

  static getNativeAuthorizationHeader(): string | null {
    if (environment.isNative) {
      if (globalAccessToken == null) {
        return null
      }

      return `Bearer ${globalAccessToken}`
    }

    return null
  }
}
