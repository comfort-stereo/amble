import { Field, Mutation, Query, Resolver, ArgsType, Args, FieldResolver, Root } from "type-graphql"
import { Length } from "class-validator"
import { Comment, CommentPage } from "../entities/comment.entity"
import { Post } from "../entities/post.entity"
import { UUID } from "../common/uuid"
import { GetManyArgs, GetOneArgs, DeleteOneArgs } from "../common/args"
import { Service } from "typedi"
import { PostStore } from "../stores/post.store"
import { CommentStore } from "../stores/comment.store"

@ArgsType()
class GetCommentArgs extends GetOneArgs {}

@ArgsType()
class GetCommentsArgs extends GetManyArgs {}

@ArgsType()
class CreateCommentArgs {
  @Field(() => UUID)
  post: UUID

  @Field(() => String)
  @Length(0, 2000)
  content: string
}

@ArgsType()
class CreateChildCommentArgs {
  @Field(() => UUID)
  parent: UUID

  @Field(() => String)
  @Length(0, 2000)
  content: string
}

@ArgsType()
class DeleteCommentArgs extends DeleteOneArgs {}

@ArgsType()
class GetChildrenArgs extends GetManyArgs {}

@Service()
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentStore: CommentStore, private readonly postStore: PostStore) {}

  @Query(() => Comment, { nullable: true })
  async comment(@Args() args: GetCommentArgs): Promise<Comment | null> {
    return await this.commentStore.findOne(args.id)
  }

  @Query(() => CommentPage)
  async comments(@Args() args: GetCommentsArgs): Promise<CommentPage> {
    return await this.commentStore.paginate(args)
  }

  @Mutation(() => Comment)
  async createComment(@Args() args: CreateCommentArgs): Promise<Comment> {
    return await this.commentStore.createAndFlush({
      post: await this.postStore.findOneOrFail(args.post),
      content: args.content,
    })
  }

  @Mutation(() => Comment)
  async createChildComment(@Args() args: CreateChildCommentArgs): Promise<Comment> {
    const parent = await this.commentStore.findOneOrFail(args.parent, ["post"])
    const post = parent.post
    const content = args.content
    return await this.commentStore.createAndFlush({
      content,
      post,
      parent,
    })
  }

  @Mutation(() => Comment, { nullable: true })
  async deleteComment(@Args() args: DeleteCommentArgs): Promise<Comment | null> {
    return await this.commentStore.deleteOneAndFlush(args.id)
  }

  @FieldResolver(() => Post)
  async post(@Root() comment: Comment): Promise<Post> {
    return this.postStore.findOneOrFail(comment.post.id)
  }

  @FieldResolver(() => Comment, { nullable: true })
  async parent(@Root() comment: Comment): Promise<Comment | null> {
    return this.commentStore.findOneOrFail(comment.parent.id)
  }

  @FieldResolver(() => CommentPage)
  async children(@Root() comment: Comment, @Args() args: GetChildrenArgs): Promise<CommentPage> {
    return await this.commentStore.paginate(args, { parent: comment.id })
  }
}
