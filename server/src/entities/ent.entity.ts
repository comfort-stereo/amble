import { UUID, uuid } from "@amble/common/uuid"
import { Entity, PrimaryKey, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"

@Entity()
@ObjectType()
export abstract class Ent {
  @PrimaryKey({ type: "string", columnType: "uuid" })
  @Field(() => UUID)
  id: UUID = uuid()

  @Property({ columnType: "timestamp" })
  @Field(() => Date)
  created = new Date()

  @Property({ columnType: "timestamp", onUpdate: () => new Date() })
  @Field(() => Date)
  updated = new Date()
}
