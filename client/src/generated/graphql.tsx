import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"
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
  query ME {
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
