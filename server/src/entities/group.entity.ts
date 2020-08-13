import { Cascade, Collection, Entity, OneToMany, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"
import { Page, PageEdge } from "../common/page"
import { Ent } from "./ent.entity"
import { Membership } from "./membership.entity"
import { Post } from "./post.entity"

@Entity()
@ObjectType()
export class Group extends Ent {
  @Property({ unique: true })
  @Field(() => String)
  name: string

  @Property()
  @Field(() => String)
  title: string

  @OneToMany(() => Membership, (membership) => membership.group, { cascade: [Cascade.ALL] })
  memberships = new Collection<Membership>(this)

  @OneToMany(() => Post, (post) => post.group, { cascade: [Cascade.ALL] })
  posts = new Collection<Post>(this)
}

@ObjectType()
export class GroupPageEdge extends PageEdge(Group) {}
@ObjectType()
export class GroupPage extends Page(Group, GroupPageEdge) {}
