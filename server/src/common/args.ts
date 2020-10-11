import { UUID } from "@amble/common/uuid"
import { ArgsType, Field, Int } from "type-graphql"

@ArgsType()
export abstract class GetOneArgs {
  @Field(() => UUID)
  id: UUID
}

@ArgsType()
export abstract class GetManyArgs {
  @Field(() => Int, { defaultValue: 10 })
  first: number

  @Field(() => UUID, { nullable: true, defaultValue: null })
  after: UUID | null
}

@ArgsType()
export abstract class DeleteOneArgs {
  @Field(() => UUID)
  id: UUID
}
