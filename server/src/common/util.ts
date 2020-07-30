export function make<T, C extends { new (): T }>(constructor: C, properties: T): T {
  return assign(new constructor(), properties)
}

export function assign<T>(object: T, properties: Partial<T>): T {
  return Object.assign(object, properties)
}

export async function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
