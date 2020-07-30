export enum RedisNamespace {
  Session = "session",
}

export function ns(namespace: RedisNamespace, key: string): string {
  return `${namespace}:${key}`
}
