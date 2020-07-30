import { Entity, PrimaryKey, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"
import { UUID, uuid } from "../common/uuid"

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
