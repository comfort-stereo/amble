import { EntID, eid } from "../common/ent-id"
import { Entity, PrimaryKey, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"

@Entity()
@ObjectType()
export abstract class Ent {
  @PrimaryKey({ type: "string", columnType: "uuid" })
  @Field(() => EntID)
  id: EntID = eid()

  @Property({ columnType: "timestamp" })
  @Field(() => Date)
  created = new Date()

  @Property({ columnType: "timestamp", onUpdate: () => new Date() })
  @Field(() => Date)
  updated = new Date()
}
