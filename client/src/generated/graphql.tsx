import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"
import { FieldPolicy, FieldReadFunction, TypePolicies } from "@apollo/client/cache"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
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
  group?: Maybe<Group>
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
  hasPreviousPage: Scalars["Boolean"]
  hasNextPage: Scalars["Boolean"]
}

export type PostPage = {
  __typename?: "PostPage"
  total: Scalars["Int"]
  edges: Array<PostPageEdge>
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
  description: Scalars["String"]
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
  logout?: Maybe<LogoutResult>
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
  description: Scalars["String"]
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

export type LoginResult = {
  __typename?: "LoginResult"
  user: User
  accessToken: Scalars["String"]
}

export type RefreshResult = {
  __typename?: "RefreshResult"
  user: User
  accessToken: Scalars["String"]
}

export type LogoutResult = {
  __typename?: "LogoutResult"
  success: Scalars["Boolean"]
}

export type Subscription = {
  __typename?: "Subscription"
  groupCreated: Group
  groupDeleted: Group
}

export type CreateUserMutationVariables = Exact<{
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & Pick<User, "id" | "username" | "email">
}

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]
  password: Scalars["String"]
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<
    { __typename?: "LoginResult" } & Pick<LoginResult, "accessToken"> & {
        user: { __typename?: "User" } & Pick<User, "id" | "username" | "email">
      }
  >
}

export type RefreshMutationVariables = Exact<{ [key: string]: never }>

export type RefreshMutation = { __typename?: "Mutation" } & {
  refresh?: Maybe<
    { __typename?: "RefreshResult" } & Pick<RefreshResult, "accessToken"> & {
        user: { __typename?: "User" } & Pick<User, "id" | "username" | "email">
      }
  >
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation" } & {
  logout?: Maybe<{ __typename?: "LogoutResult" } & Pick<LogoutResult, "success">>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username" | "email">>
}

export type GetGroupPostsForFeedQueryVariables = Exact<{
  groupID: Scalars["UUID"]
  after?: Maybe<Scalars["UUID"]>
}>

export type GetGroupPostsForFeedQuery = { __typename?: "Query" } & {
  group?: Maybe<
    { __typename?: "Group" } & {
      posts: { __typename?: "PostPage" } & {
        edges: Array<
          { __typename?: "PostPageEdge" } & {
            node: { __typename?: "Post" } & Pick<Post, "id" | "title"> & {
                comments: { __typename?: "CommentPage" } & Pick<CommentPage, "total">
              }
          }
        >
        pageInfo: { __typename?: "PageInfo" } & Pick<
          PageInfo,
          "startCursor" | "endCursor" | "hasPreviousPage" | "hasNextPage"
        >
      }
    }
  >
}

export type CreateGroupMutationVariables = Exact<{
  name: Scalars["String"]
  title: Scalars["String"]
  description: Scalars["String"]
}>

export type CreateGroupMutation = { __typename?: "Mutation" } & {
  createGroup: { __typename?: "Group" } & Pick<Group, "id">
}

export const CreateUserDocument = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    baseOptions,
  )
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
      }
      accessToken
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RefreshDocument = gql`
  mutation Refresh {
    refresh {
      user {
        id
        username
        email
      }
      accessToken
    }
  }
`
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>,
) {
  return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, baseOptions)
}
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>
export type RefreshMutationOptions = Apollo.BaseMutationOptions<
  RefreshMutation,
  RefreshMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      success
    }
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const GetGroupPostsForFeedDocument = gql`
  query GetGroupPostsForFeed($groupID: UUID!, $after: UUID = null) {
    group(id: $groupID) {
      posts(after: $after) {
        edges {
          node {
            id
            title
            comments {
              total
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }
    }
  }
`

/**
 * __useGetGroupPostsForFeedQuery__
 *
 * To run a query within a React component, call `useGetGroupPostsForFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupPostsForFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupPostsForFeedQuery({
 *   variables: {
 *      groupID: // value for 'groupID'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetGroupPostsForFeedQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetGroupPostsForFeedQuery,
    GetGroupPostsForFeedQueryVariables
  >,
) {
  return Apollo.useQuery<GetGroupPostsForFeedQuery, GetGroupPostsForFeedQueryVariables>(
    GetGroupPostsForFeedDocument,
    baseOptions,
  )
}
export function useGetGroupPostsForFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupPostsForFeedQuery,
    GetGroupPostsForFeedQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGroupPostsForFeedQuery, GetGroupPostsForFeedQueryVariables>(
    GetGroupPostsForFeedDocument,
    baseOptions,
  )
}
export type GetGroupPostsForFeedQueryHookResult = ReturnType<typeof useGetGroupPostsForFeedQuery>
export type GetGroupPostsForFeedLazyQueryHookResult = ReturnType<
  typeof useGetGroupPostsForFeedLazyQuery
>
export type GetGroupPostsForFeedQueryResult = Apollo.QueryResult<
  GetGroupPostsForFeedQuery,
  GetGroupPostsForFeedQueryVariables
>
export const CreateGroupDocument = gql`
  mutation CreateGroup($name: String!, $title: String!, $description: String!) {
    createGroup(name: $name, title: $title, description: $description) {
      id
    }
  }
`
export type CreateGroupMutationFn = Apollo.MutationFunction<
  CreateGroupMutation,
  CreateGroupMutationVariables
>

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>,
) {
  return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument,
    baseOptions,
  )
}
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMutation,
  CreateGroupMutationVariables
>
export type QueryKeySpecifier = (
  | "comment"
  | "comments"
  | "group"
  | "groups"
  | "membership"
  | "memberships"
  | "post"
  | "posts"
  | "user"
  | "users"
  | "me"
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  comment?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
  group?: FieldPolicy<any> | FieldReadFunction<any>
  groups?: FieldPolicy<any> | FieldReadFunction<any>
  membership?: FieldPolicy<any> | FieldReadFunction<any>
  memberships?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
  users?: FieldPolicy<any> | FieldReadFunction<any>
  me?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CommentKeySpecifier = (
  | "id"
  | "created"
  | "updated"
  | "content"
  | "user"
  | "post"
  | "parent"
  | "children"
  | CommentKeySpecifier
)[]
export type CommentFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  created?: FieldPolicy<any> | FieldReadFunction<any>
  updated?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  parent?: FieldPolicy<any> | FieldReadFunction<any>
  children?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserKeySpecifier = (
  | "id"
  | "created"
  | "updated"
  | "username"
  | "email"
  | "memberships"
  | "posts"
  | "comments"
  | UserKeySpecifier
)[]
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  created?: FieldPolicy<any> | FieldReadFunction<any>
  updated?: FieldPolicy<any> | FieldReadFunction<any>
  username?: FieldPolicy<any> | FieldReadFunction<any>
  email?: FieldPolicy<any> | FieldReadFunction<any>
  memberships?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipPageKeySpecifier = (
  | "total"
  | "edges"
  | "pageInfo"
  | MembershipPageKeySpecifier
)[]
export type MembershipPageFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>
  edges?: FieldPolicy<any> | FieldReadFunction<any>
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipPageEdgeKeySpecifier = ("cursor" | "node" | MembershipPageEdgeKeySpecifier)[]
export type MembershipPageEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>
  node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipKeySpecifier = ("id" | "created" | "updated" | MembershipKeySpecifier)[]
export type MembershipFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  created?: FieldPolicy<any> | FieldReadFunction<any>
  updated?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PageInfoKeySpecifier = (
  | "startCursor"
  | "endCursor"
  | "hasPreviousPage"
  | "hasNextPage"
  | PageInfoKeySpecifier
)[]
export type PageInfoFieldPolicy = {
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostPageKeySpecifier = ("total" | "edges" | "pageInfo" | PostPageKeySpecifier)[]
export type PostPageFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>
  edges?: FieldPolicy<any> | FieldReadFunction<any>
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostPageEdgeKeySpecifier = ("cursor" | "node" | PostPageEdgeKeySpecifier)[]
export type PostPageEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>
  node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostKeySpecifier = (
  | "id"
  | "created"
  | "updated"
  | "title"
  | "content"
  | "user"
  | "group"
  | "comments"
  | PostKeySpecifier
)[]
export type PostFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  created?: FieldPolicy<any> | FieldReadFunction<any>
  updated?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
  group?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
}
export type GroupKeySpecifier = (
  | "id"
  | "created"
  | "updated"
  | "name"
  | "title"
  | "description"
  | "memberships"
  | "posts"
  | GroupKeySpecifier
)[]
export type GroupFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  created?: FieldPolicy<any> | FieldReadFunction<any>
  updated?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
  description?: FieldPolicy<any> | FieldReadFunction<any>
  memberships?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CommentPageKeySpecifier = ("total" | "edges" | "pageInfo" | CommentPageKeySpecifier)[]
export type CommentPageFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>
  edges?: FieldPolicy<any> | FieldReadFunction<any>
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CommentPageEdgeKeySpecifier = ("cursor" | "node" | CommentPageEdgeKeySpecifier)[]
export type CommentPageEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>
  node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type GroupPageKeySpecifier = ("total" | "edges" | "pageInfo" | GroupPageKeySpecifier)[]
export type GroupPageFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>
  edges?: FieldPolicy<any> | FieldReadFunction<any>
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type GroupPageEdgeKeySpecifier = ("cursor" | "node" | GroupPageEdgeKeySpecifier)[]
export type GroupPageEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>
  node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserPageKeySpecifier = ("total" | "edges" | "pageInfo" | UserPageKeySpecifier)[]
export type UserPageFieldPolicy = {
  total?: FieldPolicy<any> | FieldReadFunction<any>
  edges?: FieldPolicy<any> | FieldReadFunction<any>
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserPageEdgeKeySpecifier = ("cursor" | "node" | UserPageEdgeKeySpecifier)[]
export type UserPageEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>
  node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | "createComment"
  | "createChildComment"
  | "deleteComment"
  | "createGroup"
  | "deleteGroup"
  | "createMembership"
  | "deleteMembership"
  | "createPost"
  | "deletePost"
  | "createUser"
  | "deleteUser"
  | "login"
  | "refresh"
  | "logout"
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  createComment?: FieldPolicy<any> | FieldReadFunction<any>
  createChildComment?: FieldPolicy<any> | FieldReadFunction<any>
  deleteComment?: FieldPolicy<any> | FieldReadFunction<any>
  createGroup?: FieldPolicy<any> | FieldReadFunction<any>
  deleteGroup?: FieldPolicy<any> | FieldReadFunction<any>
  createMembership?: FieldPolicy<any> | FieldReadFunction<any>
  deleteMembership?: FieldPolicy<any> | FieldReadFunction<any>
  createPost?: FieldPolicy<any> | FieldReadFunction<any>
  deletePost?: FieldPolicy<any> | FieldReadFunction<any>
  createUser?: FieldPolicy<any> | FieldReadFunction<any>
  deleteUser?: FieldPolicy<any> | FieldReadFunction<any>
  login?: FieldPolicy<any> | FieldReadFunction<any>
  refresh?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
}
export type LoginResultKeySpecifier = ("user" | "accessToken" | LoginResultKeySpecifier)[]
export type LoginResultFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>
}
export type RefreshResultKeySpecifier = ("user" | "accessToken" | RefreshResultKeySpecifier)[]
export type RefreshResultFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>
}
export type LogoutResultKeySpecifier = ("success" | LogoutResultKeySpecifier)[]
export type LogoutResultFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SubscriptionKeySpecifier = (
  | "groupCreated"
  | "groupDeleted"
  | SubscriptionKeySpecifier
)[]
export type SubscriptionFieldPolicy = {
  groupCreated?: FieldPolicy<any> | FieldReadFunction<any>
  groupDeleted?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TypedTypePolicies = TypePolicies & {
  Query?: {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: QueryFieldPolicy
  }
  Comment?: {
    keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: CommentFieldPolicy
  }
  User?: {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: UserFieldPolicy
  }
  MembershipPage?: {
    keyFields?: false | MembershipPageKeySpecifier | (() => undefined | MembershipPageKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: MembershipPageFieldPolicy
  }
  MembershipPageEdge?: {
    keyFields?:
      | false
      | MembershipPageEdgeKeySpecifier
      | (() => undefined | MembershipPageEdgeKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: MembershipPageEdgeFieldPolicy
  }
  Membership?: {
    keyFields?: false | MembershipKeySpecifier | (() => undefined | MembershipKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: MembershipFieldPolicy
  }
  PageInfo?: {
    keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: PageInfoFieldPolicy
  }
  PostPage?: {
    keyFields?: false | PostPageKeySpecifier | (() => undefined | PostPageKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: PostPageFieldPolicy
  }
  PostPageEdge?: {
    keyFields?: false | PostPageEdgeKeySpecifier | (() => undefined | PostPageEdgeKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: PostPageEdgeFieldPolicy
  }
  Post?: {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: PostFieldPolicy
  }
  Group?: {
    keyFields?: false | GroupKeySpecifier | (() => undefined | GroupKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: GroupFieldPolicy
  }
  CommentPage?: {
    keyFields?: false | CommentPageKeySpecifier | (() => undefined | CommentPageKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: CommentPageFieldPolicy
  }
  CommentPageEdge?: {
    keyFields?:
      | false
      | CommentPageEdgeKeySpecifier
      | (() => undefined | CommentPageEdgeKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: CommentPageEdgeFieldPolicy
  }
  GroupPage?: {
    keyFields?: false | GroupPageKeySpecifier | (() => undefined | GroupPageKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: GroupPageFieldPolicy
  }
  GroupPageEdge?: {
    keyFields?: false | GroupPageEdgeKeySpecifier | (() => undefined | GroupPageEdgeKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: GroupPageEdgeFieldPolicy
  }
  UserPage?: {
    keyFields?: false | UserPageKeySpecifier | (() => undefined | UserPageKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: UserPageFieldPolicy
  }
  UserPageEdge?: {
    keyFields?: false | UserPageEdgeKeySpecifier | (() => undefined | UserPageEdgeKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: UserPageEdgeFieldPolicy
  }
  Mutation?: {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: MutationFieldPolicy
  }
  LoginResult?: {
    keyFields?: false | LoginResultKeySpecifier | (() => undefined | LoginResultKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: LoginResultFieldPolicy
  }
  RefreshResult?: {
    keyFields?: false | RefreshResultKeySpecifier | (() => undefined | RefreshResultKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: RefreshResultFieldPolicy
  }
  LogoutResult?: {
    keyFields?: false | LogoutResultKeySpecifier | (() => undefined | LogoutResultKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: LogoutResultFieldPolicy
  }
  Subscription?: {
    keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier)
    queryType?: true
    mutationType?: true
    subscriptionType?: true
    fields?: SubscriptionFieldPolicy
  }
}
