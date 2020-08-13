import { Collection, Entity, ManyToOne, OneToMany, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"
import { Page, PageEdge } from "../common/page"
import { Ent } from "./ent.entity"
import { Post } from "./post.entity"
import { User } from "./user.entity"

@Entity()
@ObjectType()
export class Comment extends Ent {
  @Property()
  @Field(() => String)
  content: string

  @ManyToOne(() => User)
  @Field(() => User)
  user: User

  @ManyToOne(() => Post)
  @Field(() => Post)
  post: Post

  @ManyToOne(() => Comment, { nullable: true })
  @Field(() => Comment, { nullable: true })
  parent: Comment

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Collection<Comment> = new Collection(this)
}

@ObjectType()
export class CommentPageEdge extends PageEdge(Comment) {}
@ObjectType()
export class CommentPage extends Page(Comment, CommentPageEdge) {}
