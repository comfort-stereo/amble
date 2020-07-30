import { Inject } from "typedi"

export enum ServiceName {
  EM = "em",
  Redis = "redis",
}

export const InjectEM = () => Inject(ServiceName.EM)
export const InjectRedis = () => Inject(ServiceName.Redis)
