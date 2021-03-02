import { IsEmail } from "class-validator"
import { Cascade, Collection, Entity, OneToMany, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"
import { Page, PageEdge } from "../common/page"
import { Comment } from "./comment.entity"
import { Ent } from "./ent.entity"
import { Membership } from "./membership.entity"
import { Post } from "./post.entity"

@Entity()
@ObjectType()
export class User extends Ent {
  @Property({ unique: true })
  @Field(() => String)
  username: string

  @Property()
  @Field(() => String)
  @IsEmail()
  email: string

  @Property()
  passwordHash: string

  @Property({ nullable: true })
  authenticated: Date | null = null

  @OneToMany(() => Membership, (membership) => membership.user, { cascade: [Cascade.ALL] })
  memberships = new Collection<Membership>(this)

  @OneToMany(() => Post, (post) => post.user, { cascade: [Cascade.ALL] })
  posts = new Collection<Post>(this)

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: [Cascade.ALL] })
  comments = new Collection<Comment>(this)
}

@ObjectType()
export class UserPageEdge extends PageEdge(User) {}
@ObjectType()
export class UserPage extends Page(User, UserPageEdge) {}
