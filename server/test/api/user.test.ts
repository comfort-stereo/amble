import { make } from "@amble/common/util"
import { nuuid } from "@amble/common/uuid"
import { gql } from "apollo-server"
import { AmbleServerState } from "../../amble-server"
import { User } from "../../src/entities/user.entity"
import { getTestServer, send } from "../common/util"

const state: AmbleServerState = {
  entities: [
    make(User, {
      id: nuuid(0),
      username: "user",
      email: "user@email.com",
      passwordHash: "hash",
    }),
  ],
}

describe("createUser()", () => {
  it("creates a new user", async () => {
    const server = await getTestServer(state)
    await send(server, {
      query: gql`
        mutation CreateUser {
          createUser(username: "created", email: "created@email.com", password: "password") {
            id
          }
        }
      `,
      check(data) {
        expect(data.createUser).toHaveProperty("id")
      },
    })
  })
})

describe("deleteUser()", () => {
  it("deletes an existing user", async () => {
    const server = await getTestServer(state)
    await send(server, {
      query: gql`
        mutation DeleteUser($id: UUID!) {
          deleteUser(id: $id) {
            id
          }
        }
      `,
      variables: { id: nuuid(0) },
      check(data) {
        expect(data.deleteUser).toHaveProperty("id")
      },
    })

    await send(server, {
      query: gql`
        query GetUser($id: UUID!) {
          user(id: $id) {
            id
          }
        }
      `,
      variables: { id: nuuid(0) },
      check(data) {
        expect(data.user).toBe(null)
      },
    })
  })
})
