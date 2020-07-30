import { Field, Mutation, Query, Resolver, ArgsType, Args } from "type-graphql"
import { UUID } from "../common/uuid"
import { GetManyArgs, GetOneArgs, DeleteOneArgs } from "../common/args"
import { Service } from "typedi"
import { GroupStore } from "../stores/group.store"
import { Membership, MembershipPage } from "../entities/membership.entity"
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
