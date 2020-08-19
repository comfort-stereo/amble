import { Inject } from "typedi"

export enum ServiceName {
  Environment = "environment",
  EM = "em",
  Redis = "redis",
}

export const InjectEnvironment = () => Inject(ServiceName.Environment)
export const InjectEM = () => Inject(ServiceName.EM)
export const InjectRedis = () => Inject(ServiceName.Redis)
