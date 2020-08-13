import { Entity, ManyToOne } from "mikro-orm"
import { ObjectType } from "type-graphql"
import { Page, PageEdge } from "../common/page"
import { Ent } from "./ent.entity"
import { Group } from "./group.entity"
import { User } from "./user.entity"

@Entity()
@ObjectType()
export class Membership extends Ent {
  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Group)
  group: Group
}

@ObjectType()
export class MembershipPageEdge extends PageEdge(Membership) {}
@ObjectType()
export class MembershipPage extends Page(Membership, MembershipPageEdge) {}
