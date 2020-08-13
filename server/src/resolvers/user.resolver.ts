import { IsEmail, Length } from "class-validator"
import {
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import { Service } from "typedi"
import { DeleteOneArgs, GetManyArgs, GetOneArgs } from "../common/args"
import { make } from "../common/util"
import { UUID } from "../common/uuid"
import { Context } from "../context"
import { CommentPage } from "../entities/comment.entity"
import { MembershipPage } from "../entities/membership.entity"
import { PostPage } from "../entities/post.entity"
import { User, UserPage } from "../entities/user.entity"
import { AccessToken, AuthManager, RefreshToken } from "../services/auth-manager"
import { CommentStore } from "../stores/comment.store"
import { MembershipStore } from "../stores/membership.store"
import { PostStore } from "../stores/post.store"
import { UserStore } from "../stores/user.store"

@ArgsType()
class GetUserArgs extends GetOneArgs {}

@ArgsType()
class GetUsersArgs extends GetManyArgs {}

@ArgsType()
class CreateUserArgs {
  @Field(() => String)
  @Length(1, 255)
  username: string

  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @Length(8, 255)
  password: string
}

@ArgsType()
class DeleteUserArgs extends DeleteOneArgs {
  @Field(() => UUID)
  id: UUID
}

@ArgsType()
class GetMembershipsArgs extends GetManyArgs {}

@ArgsType()
class GetPostsArgs extends GetManyArgs {}

@ArgsType()
class GetCommentsArgs extends GetManyArgs {}

@ArgsType()
class LoginArgs {
  @Field(() => String)
  username: string

  @Field(() => String)
  password: string
}

@ObjectType()
class LoginResult {
  @Field(() => User)
  user: User

  @Field(() => String)
  refreshToken: RefreshToken

  @Field(() => String)
  accessToken: AccessToken
}

@ArgsType()
class RefreshArgs {
  @Field(() => String, { nullable: true })
  refreshToken?: string | null
}

@ObjectType()
class RefreshResult {
  @Field(() => User)
  user: User

  @Field(() => String)
  accessToken: AccessToken

  @Field(() => String)
  refreshToken: RefreshToken
}

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly authManager: AuthManager,
    private readonly commentStore: CommentStore,
    private readonly membershipStore: MembershipStore,
    private readonly postStore: PostStore,
    private readonly userStore: UserStore,
  ) {}

  @Query(() => User, { nullable: true })
  async user(@Args() args: GetUserArgs): Promise<User | null> {
    return await this.userStore.findOne(args.id)
  }

  @Query(() => UserPage)
  async users(@Args() args: GetUsersArgs): Promise<UserPage> {
    return await this.userStore.paginate(args)
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs): Promise<User> {
    return await this.authManager.createUser(args.username, args.email, args.password)
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args() args: DeleteUserArgs): Promise<User | null> {
    const user = await this.userStore.findOne(args.id)
    if (user == null) {
      return null
    }

    return await this.authManager.deleteUser(user)
  }

  @FieldResolver(() => MembershipPage)
  async memberships(@Root() user: User, @Args() args: GetMembershipsArgs): Promise<MembershipPage> {
    return await this.membershipStore.paginate(args, { user })
  }

  @FieldResolver(() => PostPage)
  async posts(@Root() user: User, @Args() args: GetPostsArgs): Promise<PostPage> {
    return await this.postStore.paginate(args, { user })
  }

  @FieldResolver(() => CommentPage)
  async comments(@Root() user: User, @Args() args: GetCommentsArgs): Promise<CommentPage> {
    return await this.commentStore.paginate(args, { user })
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { user }: Context): Promise<User | null> {
    return user
  }

  @Mutation(() => LoginResult, { nullable: true })
  async login(@Args() args: LoginArgs, @Ctx() { response }: Context): Promise<LoginResult> {
    const session = await this.authManager.login(args.username, args.password)
    this.authManager.setRefreshToken(response, session)

    return make(LoginResult, {
      user: await this.userStore.findOneOrFail(session.userID),
      refreshToken: session.refreshToken,
      accessToken: session.accessToken,
    })
  }

  @Mutation(() => RefreshResult, { nullable: true })
  async refresh(
    @Args() args: RefreshArgs,
    @Ctx() { user, request }: Context,
  ): Promise<RefreshResult | null> {
    if (user == null) {
      return null
    }

    const refreshToken = args.refreshToken ?? (await this.authManager.getRefreshToken(request))
    if (refreshToken == null) {
      return null
    }

    const session = await this.authManager.refresh(refreshToken)
    if (session == null) {
      return null
    }

    return make(RefreshResult, {
      user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    })
  }
}
