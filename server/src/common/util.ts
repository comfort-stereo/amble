export function make<C extends { new (): any }>(
  constructor: C,
  properties: Partial<InstanceType<C>>,
): InstanceType<C> {
  return assign(new constructor(), properties)
}

export function assign<T>(object: T, properties: Partial<T>): T {
  return Object.assign(object, properties)
}

export async function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
