import { Field, Mutation, Query, Resolver, ArgsType, Args, FieldResolver, Root } from "type-graphql"
import { Post, PostPage } from "../entities/post.entity"
import { Length } from "class-validator"
import { CommentPage } from "../entities/comment.entity"
import { EntID } from "../common/ent-id"
import { GetManyArgs, GetOneArgs, DeleteOneArgs } from "../common/args"
import { Service } from "typedi"
import { PostStore } from "../stores/post.store"
import { GroupStore } from "../stores/group.store"
import { CommentStore } from "../stores/comment.store"

@ArgsType()
class GetPostArgs extends GetOneArgs {}

@ArgsType()
class GetPostsArgs extends GetManyArgs {}

@ArgsType()
class CreatePostArgs {
  @Field(() => EntID)
  group: EntID

  @Field(() => String)
  @Length(1, 200)
  title: string

  @Field(() => String)
  @Length(0, 10000)
  content: string
}

@ArgsType()
class DeletePostArgs extends DeleteOneArgs {}

@ArgsType()
class GetCommentsArgs extends GetManyArgs {}

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly commentStore: CommentStore,
    private readonly groupStore: GroupStore,
    private readonly postStore: PostStore,
  ) {}

  @Query(() => Post, { nullable: true })
  async post(@Args() args: GetPostArgs): Promise<Post | null> {
    return await this.postStore.get(args.id)
  }

  @Query(() => PostPage)
  async posts(@Args() args: GetPostsArgs): Promise<PostPage> {
    return await this.postStore.getMany(args)
  }

  @Mutation(() => Post)
  async createPost(@Args() args: CreatePostArgs): Promise<Post> {
    return this.postStore.create({
      group: await this.groupStore.getOrFail(args.group),
      title: args.title,
      content: args.content,
    })
  }

  @Mutation(() => Post, { nullable: true })
  async deletePost(@Args() args: DeletePostArgs): Promise<Post | null> {
    return await this.postStore.delete(args.id)
  }

  @FieldResolver(() => CommentPage)
  async comments(@Root() post: Post, @Args() args: GetCommentsArgs): Promise<CommentPage> {
    return await this.commentStore.getMany(args, { post: post.id })
  }
}
