import { gql } from "apollo-server"
import { AmbleServerState } from "../amble-server"
import { make } from "../src/common/util"
import { nuuid } from "../src/common/uuid"
import { User } from "../src/entities/user.entity"
import { getTestServer, send } from "./common/test-util"

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
        mutation {
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
        mutation {
          deleteUser(id: "${nuuid(0)}") {
            id
          }
        }
      `,
      check(data) {
        expect(data.deleteUser).toHaveProperty("id")
      },
    })

    await send(server, {
      query: gql`
        query {
          user(id: "${nuuid(1)}") {
            id
          }
        }
      `,
      check(data) {
        expect(data.user).toBe(null)
      },
    })
  })
})
