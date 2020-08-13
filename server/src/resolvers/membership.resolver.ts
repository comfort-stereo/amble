import { Args, ArgsType, Field, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { DeleteOneArgs, GetManyArgs, GetOneArgs } from "../common/args"
import { UUID } from "../common/uuid"
import { Membership, MembershipPage } from "../entities/membership.entity"
import { GroupStore } from "../stores/group.store"
import { MembershipStore } from "../stores/membership.store"
import { UserStore } from "../stores/user.store"

@ArgsType()
class GetMembershipArgs extends GetOneArgs {}

@ArgsType()
class GetMembershipsArgs extends GetManyArgs {}

@ArgsType()
class CreateMembershipArgs {
  @Field(() => UUID)
  user: UUID

  @Field(() => UUID)
  group: UUID
}

@ArgsType()
class DeleteMembershipArgs extends DeleteOneArgs {}

@Service()
@Resolver(() => Membership)
export class MembershipResolver {
  constructor(
    private readonly groupStore: GroupStore,
    private readonly membershipStore: MembershipStore,
    private readonly userStore: UserStore,
  ) {}

  @Query(() => Membership, { nullable: true })
  async membership(@Args() args: GetMembershipArgs): Promise<Membership | null> {
    return await this.membershipStore.findOne(args.id)
  }

  @Query(() => MembershipPage)
  async memberships(@Args() args: GetMembershipsArgs): Promise<MembershipPage> {
    return await this.membershipStore.paginate(args)
  }

  @Mutation(() => Membership)
  async createMembership(@Args() args: CreateMembershipArgs): Promise<Membership> {
    const [user, group] = await Promise.all([
      this.userStore.findOneOrFail(args.user),
      this.groupStore.findOneOrFail(args.group),
    ])

    return this.membershipStore.createAndFlush({
      user,
      group,
    })
  }

  @Mutation(() => Membership, { nullable: true })
  async deleteMembership(@Args() args: DeleteMembershipArgs): Promise<Membership | null> {
    return await this.membershipStore.deleteOneAndFlush(args.id)
  }
}
