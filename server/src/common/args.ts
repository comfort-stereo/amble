import { ArgsType, Field, Int } from "type-graphql"

import { EntID } from "./ent-id"

export interface GenericGetOneArgs {
  id: EntID
}

@ArgsType()
export abstract class GetOneArgs implements GenericGetOneArgs {
  @Field(() => EntID)
  id: EntID
}

export interface GenericGetManyArgs {
  first: number
  after: EntID | null
}

@ArgsType()
export abstract class GetManyArgs implements GenericGetManyArgs {
  @Field(() => Int, { defaultValue: 10 })
  first: number

  @Field(() => EntID, { nullable: true, defaultValue: null })
  after: EntID | null
}

export interface GenericDeleteOneArgs {
  id: EntID
}

@ArgsType()
export abstract class DeleteOneArgs implements GenericDeleteOneArgs {
  @Field(() => EntID)
  id: EntID
}
