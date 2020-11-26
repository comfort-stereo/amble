import { UUID } from "@amble/common/uuid"
import { Length } from "class-validator"
import {
  Args,
  ArgsType,
  Field,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql"
import { Service } from "typedi"
import { DeleteOneArgs, GetManyArgs, GetOneArgs } from "../common/args"
import { Group, GroupPage } from "../entities/group.entity"
import { MembershipPage } from "../entities/membership.entity"
import { PostPage } from "../entities/post.entity"
import { GroupStore } from "../stores/group.store"
import { MembershipStore } from "../stores/membership.store"
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
class GetMembershipsArgs extends GetManyArgs {}

@ArgsType()
class CreateGroupArgs {
  @Field(() => String)
  @Length(1, 255)
  name: string

  @Field(() => String)
  @Length(1, 255)
  title: string
}

@ArgsType()
class DeleteGroupArgs extends DeleteOneArgs {
  @Field(() => UUID)
  id: UUID
}

@ArgsType()
class GetPostsArgs extends GetManyArgs {}

@Service()
@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly groupStore: GroupStore,
    private readonly membershipStore: MembershipStore,
    private readonly postStore: PostStore,
  ) {}

  @Query(() => Group, { nullable: true })
  async group(@Args() args: GetGroupArgs): Promise<Group | null> {
    return await this.groupStore.findOne(args.id)
  }

  @Query(() => GroupPage)
  async groups(@Args() args: GetGroupsArgs): Promise<GroupPage> {
    return await this.groupStore.paginate(args)
  }

  @FieldResolver(() => MembershipPage)
  async memberships(
    @Root() group: Group,
    @Args() args: GetMembershipsArgs,
  ): Promise<MembershipPage> {
    return await this.membershipStore.paginate(args, { group })
  }

  @Mutation(() => Group)
  async createGroup(
    @Args() args: CreateGroupArgs,
    @PubSub(GroupTopic.Created) notify: Publisher<Group>,
  ): Promise<Group> {
    const created = await this.groupStore.createAndFlush({
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
    const deleted = await this.groupStore.deleteOneAndFlush(args.id)
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
    return await this.postStore.paginate(args, { group })
  }
}
