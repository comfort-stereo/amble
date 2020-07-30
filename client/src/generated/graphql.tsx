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
  /** UUID associated with an entity. Passed in string format. */
  EntID: any
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type Query = {
  __typename?: "Query"
  comment?: Maybe<Comment>
  comments: CommentPage
  group?: Maybe<Comment>
  groups: GroupPage
  post?: Maybe<Post>
  posts: PostPage
}

export type QueryCommentArgs = {
  id: Scalars["EntID"]
}

export type QueryCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["EntID"]>
}

export type QueryGroupArgs = {
  id: Scalars["EntID"]
}

export type QueryGroupsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["EntID"]>
}

export type QueryPostArgs = {
  id: Scalars["EntID"]
}

export type QueryPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["EntID"]>
}

export type Comment = {
  __typename?: "Comment"
  id: Scalars["EntID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  content: Scalars["String"]
  post: Post
  parent?: Maybe<Comment>
  children: CommentPage
}

export type CommentChildrenArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["EntID"]>
}

export type Post = {
  __typename?: "Post"
  id: Scalars["EntID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  title: Scalars["String"]
  content: Scalars["String"]
  group: Group
  comments: CommentPage
}

export type PostCommentsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["EntID"]>
}

export type Group = {
  __typename?: "Group"
  id: Scalars["EntID"]
  created: Scalars["DateTime"]
  updated: Scalars["DateTime"]
  name: Scalars["String"]
  title: Scalars["String"]
  posts: PostPage
}

export type GroupPostsArgs = {
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["EntID"]>
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
  cursor: Scalars["EntID"]
  node: Post
}

export type PageInfo = {
  __typename?: "PageInfo"
  startCursor?: Maybe<Scalars["EntID"]>
  endCursor?: Maybe<Scalars["EntID"]>
  hasNextPage: Scalars["Boolean"]
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
  cursor: Scalars["EntID"]
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
  cursor: Scalars["EntID"]
  node: Group
}

export type Mutation = {
  __typename?: "Mutation"
  createComment: Comment
  createChildComment: Comment
  deleteComment?: Maybe<Comment>
  createGroup: Group
  deleteGroup?: Maybe<Group>
  createPost: Post
  deletePost?: Maybe<Post>
}

export type MutationCreateCommentArgs = {
  post: Scalars["EntID"]
  content: Scalars["String"]
}

export type MutationCreateChildCommentArgs = {
  parent: Scalars["EntID"]
  content: Scalars["String"]
}

export type MutationDeleteCommentArgs = {
  id: Scalars["EntID"]
}

export type MutationCreateGroupArgs = {
  name: Scalars["String"]
  title: Scalars["String"]
}

export type MutationDeleteGroupArgs = {
  id: Scalars["EntID"]
}

export type MutationCreatePostArgs = {
  group: Scalars["EntID"]
  title: Scalars["String"]
  content: Scalars["String"]
}

export type MutationDeletePostArgs = {
  id: Scalars["EntID"]
}

export type Subscription = {
  __typename?: "Subscription"
  groupCreated: Group
  groupDeleted: Group
}

export type GetGroupsQueryVariables = Exact<{ [key: string]: never }>

export type GetGroupsQuery = { __typename?: "Query" } & {
  groups: { __typename?: "GroupPage" } & Pick<GroupPage, "total"> & {
      edges: Array<
        { __typename?: "GroupPageEdge" } & Pick<GroupPageEdge, "cursor"> & {
            node: { __typename?: "Group" } & Pick<Group, "id">
          }
      >
    }
}
