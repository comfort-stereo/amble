import AsyncStorage from "@react-native-community/async-storage"

export class ClientStorage {
  static async get(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key)
  }

  static async set(key: string, value: string): Promise<void> {
    return await AsyncStorage.setItem(key, value)
  }

  static async delete(key: string): Promise<void> {
    return await AsyncStorage.removeItem(key)
  }
}
