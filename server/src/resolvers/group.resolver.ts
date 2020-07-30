import {
  Field,
  Mutation,
  Query,
  Resolver,
  ArgsType,
  Args,
  FieldResolver,
  Root,
  PubSub,
  Publisher,
  Subscription,
} from "type-graphql"
import { Length } from "class-validator"
import { Comment } from "../entities/comment.entity"
import { PostPage } from "../entities/post.entity"
import { Group, GroupPage } from "../entities/group.entity"
import { EntID } from "../common/ent-id"
import { GetManyArgs, GetOneArgs, DeleteOneArgs } from "../common/args"
import { Service } from "typedi"
import { GroupStore } from "../stores/group.store"
import { PostStore } from "../stores/post.store"

enum GroupTopic {
  Created = "group-created",
  Deleted = "group-deleted",
}

@ArgsType()
class GetGroupArgs extends GetOneArgs {}

@ArgsType()
class GetGroupsArgs extends GetManyArgs {}

@ArgsType()
class CreateGroupArgs {
  @Field(() => String)
  name: string

  @Field(() => String)
  @Length(0, 200)
  title: string
}

@ArgsType()
class DeleteGroupArgs extends DeleteOneArgs {
  @Field(() => EntID)
  id: EntID
}

@ArgsType()
class GetPostsArgs extends GetManyArgs {}

@Service()
@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupStore: GroupStore, private readonly postStore: PostStore) {}

  @Query(() => Comment, { nullable: true })
  async group(@Args() args: GetGroupArgs): Promise<Group | null> {
    return await this.groupStore.get(args.id)
  }

  @Query(() => GroupPage)
  async groups(@Args() args: GetGroupsArgs): Promise<GroupPage> {
    return await this.groupStore.getMany(args)
  }

  @Mutation(() => Group)
  async createGroup(
    @Args() args: CreateGroupArgs,
    @PubSub(GroupTopic.Created) notify: Publisher<Group>,
  ): Promise<Group> {
    const created = await this.groupStore.create({
      name: args.name,
      title: args.title,
    })

    notify(created)
    return created
  }

  @Mutation(() => Group, { nullable: true })
  async deleteGroup(
    @Args() args: DeleteGroupArgs,
    @PubSub(GroupTopic.Deleted) notify: Publisher<Group>,
  ): Promise<Group | null> {
    const deleted = await this.groupStore.delete(args.id)
    if (deleted != null) {
      notify(deleted)
    }

    return deleted
  }

  @Subscription(() => Group, { topics: GroupTopic.Created })
  async groupCreated(@Root() group: Group): Promise<Group> {
    return group
  }

  @Subscription(() => Group, { topics: GroupTopic.Deleted })
  async groupDeleted(@Root() group: Group): Promise<Group> {
    return group
  }

  @FieldResolver(() => PostPage)
  async posts(@Root() group: Group, @Args() args: GetPostsArgs): Promise<PostPage> {
    return await this.postStore.getMany(args, { group: group.id })
  }
}
