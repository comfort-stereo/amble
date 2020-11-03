import { environment } from "../../environment"
import { ClientStorage } from "./client-storage"

const NATIVE_ACCESS_TOKEN_KEY = "access-token"

let isLoaded = false
let globalAccessToken: string | null = null

export class AuthStore {
  static async load(): Promise<void> {
    if (isLoaded) {
      return
    }

    if (environment.isNative) {
      if (globalAccessToken == null) {
        globalAccessToken = await ClientStorage.get(NATIVE_ACCESS_TOKEN_KEY)
      }
    }

    isLoaded = true
  }

  static async clear(): Promise<void> {
    await this.load()
    if (environment.isNative) {
      globalAccessToken = null
      await ClientStorage.delete(NATIVE_ACCESS_TOKEN_KEY)
    }
  }

  static async setNativeAccessToken(accessToken: string): Promise<void> {
    await this.load()
    if (environment.isNative) {
      globalAccessToken = accessToken
      await ClientStorage.set(NATIVE_ACCESS_TOKEN_KEY, globalAccessToken)
    }
  }

  static async getNativeAuthorizationHeader(): Promise<string | null> {
    await this.load()

    if (environment.isNative) {
      if (globalAccessToken == null) {
        return null
      }

      return `Bearer ${globalAccessToken}`
    }

    return null
  }
}
