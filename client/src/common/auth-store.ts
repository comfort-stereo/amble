import { environment } from "../../environment"
import { ClientStorage } from "./client-storage"

const ACCESS_TOKEN_KEY = "access-token"

let globalAccessToken: string | null = null

export class AuthStore {
  static getAccessToken(): string | null {
    return globalAccessToken
  }

  static async loadAccessToken(): Promise<string | null> {
    if (globalAccessToken != null) {
      return globalAccessToken
    }

    return (globalAccessToken = await ClientStorage.get(ACCESS_TOKEN_KEY))
  }

  static async setAccessToken(accessToken: string): Promise<void> {
    globalAccessToken = accessToken
    if (environment.isClient) {
      await ClientStorage.set(ACCESS_TOKEN_KEY, globalAccessToken)
    }
  }

  static async deleteAccessToken(): Promise<void> {
    globalAccessToken = null
    await ClientStorage.delete(ACCESS_TOKEN_KEY)
  }
}
