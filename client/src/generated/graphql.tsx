export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}
const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
}
export default result

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A UUID passed in string format. */
  UUID: any
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type Query = {
  __typename?: "Query"
  comment?: Maybe<Comment>
  comments: CommentPage
  group?: Maybe<Comment>
  groups: GroupPage
  membership?: Maybe<Membership>
  memberships: MembershipPage
  post?: Maybe<Post>
  posts: PostPage
  user?: Maybe<User>
  users: UserPage
  me?: Maybe<User>
}

export type QueryCommentArgs = {
  id: Scalars["UUID"]
}

export type QueryCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type QueryGroupArgs = {
  id: Scalars["UUID"]
}

export type QueryGroupsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type QueryMembershipArgs = {
  id: Scalars["UUID"]
}

export type QueryMembershipsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type QueryPostArgs = {
  id: Scalars["UUID"]
}

export type QueryPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type QueryUserArgs = {
  id: Scalars["UUID"]
}

export type QueryUsersArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type Comment = {
  __typename?: "Comment"
  id: Scalars["UUID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  content: Scalars["String"]
  user: User
  post: Post
  parent?: Maybe<Comment>
  children: CommentPage
}

export type CommentChildrenArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["UUID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  username: Scalars["String"]
  email: Scalars["String"]
  memberships: MembershipPage
  posts: PostPage
  comments: CommentPage
}

export type UserMembershipsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type UserPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type UserCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type MembershipPage = {
  __typename?: "MembershipPage"
  total: Scalars["Int"]
  edges: Array<MembershipPageEdge>
  nodes: Array<Membership>
  pageInfo: PageInfo
}

export type MembershipPageEdge = {
  __typename?: "MembershipPageEdge"
  cursor: Scalars["UUID"]
  node: Membership
}

export type Membership = {
  __typename?: "Membership"
  id: Scalars["UUID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  startCursor?: Maybe<Scalars["UUID"]>
  endCursor?: Maybe<Scalars["UUID"]>
  hasNextPage: Scalars["Boolean"]
}

export type PostPage = {
  __typename?: "PostPage"
  total: Scalars["Int"]
  edges: Array<PostPageEdge>
  nodes: Array<Post>
  pageInfo: PageInfo
}

export type PostPageEdge = {
  __typename?: "PostPageEdge"
  cursor: Scalars["UUID"]
  node: Post
}

export type Post = {
  __typename?: "Post"
  id: Scalars["UUID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  title: Scalars["String"]
  content: Scalars["String"]
  user: User
  group: Group
  comments: CommentPage
}

export type PostCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type Group = {
  __typename?: "Group"
  id: Scalars["UUID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  name: Scalars["String"]
  title: Scalars["String"]
  memberships: MembershipPage
  posts: PostPage
}

export type GroupMembershipsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type GroupPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["UUID"]>
}

export type CommentPage = {
  __typename?: "CommentPage"
  total: Scalars["Int"]
  edges: Array<CommentPageEdge>
  nodes: Array<Comment>
  pageInfo: PageInfo
}

export type CommentPageEdge = {
  __typename?: "CommentPageEdge"
  cursor: Scalars["UUID"]
  node: Comment
}

export type GroupPage = {
  __typename?: "GroupPage"
  total: Scalars["Int"]
  edges: Array<GroupPageEdge>
  nodes: Array<Group>
  pageInfo: PageInfo
}

export type GroupPageEdge = {
  __typename?: "GroupPageEdge"
  cursor: Scalars["UUID"]
  node: Group
}

export type UserPage = {
  __typename?: "UserPage"
  total: Scalars["Int"]
  edges: Array<UserPageEdge>
  nodes: Array<User>
  pageInfo: PageInfo
}

export type UserPageEdge = {
  __typename?: "UserPageEdge"
  cursor: Scalars["UUID"]
  node: User
}

export type Mutation = {
  __typename?: "Mutation"
  createComment: Comment
  createChildComment: Comment
  deleteComment?: Maybe<Comment>
  createGroup: Group
  deleteGroup?: Maybe<Group>
  createMembership: Membership
  deleteMembership?: Maybe<Membership>
  createPost: Post
  deletePost?: Maybe<Post>
  createUser: User
  deleteUser?: Maybe<User>
  login?: Maybe<LoginResult>
  refresh?: Maybe<RefreshResult>
}

export type MutationCreateCommentArgs = {
  post: Scalars["UUID"]
  content: Scalars["String"]
}

export type MutationCreateChildCommentArgs = {
  parent: Scalars["UUID"]
  content: Scalars["String"]
}

export type MutationDeleteCommentArgs = {
  id: Scalars["UUID"]
}

export type MutationCreateGroupArgs = {
  name: Scalars["String"]
  title: Scalars["String"]
}

export type MutationDeleteGroupArgs = {
  id: Scalars["UUID"]
}

export type MutationCreateMembershipArgs = {
  user: Scalars["UUID"]
  group: Scalars["UUID"]
}

export type MutationDeleteMembershipArgs = {
  id: Scalars["UUID"]
}

export type MutationCreatePostArgs = {
  group: Scalars["UUID"]
  title: Scalars["String"]
  content: Scalars["String"]
}

export type MutationDeletePostArgs = {
  id: Scalars["UUID"]
}

export type MutationCreateUserArgs = {
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationDeleteUserArgs = {
  id: Scalars["UUID"]
}

export type MutationLoginArgs = {
  username: Scalars["String"]
  password: Scalars["String"]
}

export type MutationRefreshArgs = {
  refreshToken?: Maybe<Scalars["String"]>
}

export type LoginResult = {
  __typename?: "LoginResult"
  user: User
  refreshToken: Scalars["String"]
  accessToken: Scalars["String"]
}

export type RefreshResult = {
  __typename?: "RefreshResult"
  user: User
  accessToken: Scalars["String"]
  refreshToken: Scalars["String"]
}

export type Subscription = {
  __typename?: "Subscription"
  groupCreated: Group
  groupDeleted: Group
}

export type GetTotalUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetTotalUsersQuery = { __typename?: "Query" } & {
  users: { __typename?: "UserPage" } & Pick<UserPage, "total">
}

export type CreateUserMutationVariables = Exact<{
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & Pick<User, "id" | "username" | "email">
}
