import { GetServerSideProps, NextPage } from "next"
import { createApolloClient, withApolloState } from "../common/apollo-client"

import { GetGroupsQuery } from "../generated/graphql"
import { gql } from "@apollo/client"
import { withApollo } from "../common/apollo-client"

const IndexPage: NextPage = () => <div>Hello</div>

const GET_GROUPS = gql`
  query GetGroups {
    groups {
      total
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps = async () => {
  const apollo = createApolloClient()
  const { data } = await apollo.query<GetGroupsQuery>({
    query: GET_GROUPS,
  })

  if (data != null) {
    console.log("Here:", data.groups)
  }

  return withApolloState(apollo)
}

export default withApollo(IndexPage)
