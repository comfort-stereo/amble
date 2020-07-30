import { Cascade, Collection, Entity, ManyToOne, OneToMany, OneToOne, Property } from "mikro-orm"
import { Field, ObjectType } from "type-graphql"
import { Page, PageEdge } from "../common/page"

import { Comment } from "./comment.entity"
import { Ent } from "./ent.entity"
import { Group } from "./group.entity"
import { User } from "./user.entity"

@Entity()
@ObjectType()
export class Post extends Ent {
  @Property()
  @Field(() => String)
  title: string

  @Property()
  @Field(() => String)
  content: string

  @OneToOne(() => User)
  @Field(() => User)
  user: User

  @ManyToOne(() => Group)
  @Field(() => Group)
  group: Group

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: [Cascade.ALL] })
  comments = new Collection<Comment>(this)
}

@ObjectType()
export class PostPageEdge extends PageEdge(Post) {}
@ObjectType()
export class PostPage extends Page(Post, PostPageEdge) {}
