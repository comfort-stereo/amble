import * as SecureStore from "expo-secure-store"

export class ClientStorage {
  static async get(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key)
  }

  static async set(key: string, value: string): Promise<void> {
    return await SecureStore.setItemAsync(key, value)
  }

  static async delete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key)
  }
}
