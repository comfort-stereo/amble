import { UUID } from "@amble/common/uuid"
import { Length } from "class-validator"
import { Args, ArgsType, Field, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { DeleteOneArgs, GetManyArgs, GetOneArgs } from "../common/args"
import { CommentPage } from "../entities/comment.entity"
import { Post, PostPage } from "../entities/post.entity"
import { CommentStore } from "../stores/comment.store"
import { GroupStore } from "../stores/group.store"
import { PostStore } from "../stores/post.store"

@ArgsType()
class GetPostArgs extends GetOneArgs {}

@ArgsType()
class GetPostsArgs extends GetManyArgs {}

@ArgsType()
class CreatePostArgs {
  @Field(() => UUID)
  group: UUID

  @Field(() => String)
  @Length(1, 255)
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
    return await this.postStore.findOne(args.id)
  }

  @Query(() => PostPage)
  async posts(@Args() args: GetPostsArgs): Promise<PostPage> {
    return await this.postStore.paginate(args)
  }

  @Mutation(() => Post)
  async createPost(@Args() args: CreatePostArgs): Promise<Post> {
    return this.postStore.createAndFlush({
      title: args.title,
      content: args.content,
      group: await this.groupStore.findOneOrFail(args.group),
    })
  }

  @Mutation(() => Post, { nullable: true })
  async deletePost(@Args() args: DeletePostArgs): Promise<Post | null> {
    return await this.postStore.deleteOneAndFlush(args.id)
  }

  @FieldResolver(() => CommentPage)
  async comments(@Root() post: Post, @Args() args: GetCommentsArgs): Promise<CommentPage> {
    return await this.commentStore.paginate(args, { post })
  }
}
