import { Inject } from "typedi"

export enum ServiceName {
  EM = "em",
}

export const InjectEM = () => Inject(ServiceName.EM)
