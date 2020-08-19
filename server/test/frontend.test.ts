import supertest from "supertest"
import { getTestServer } from "./common/test-util"

it("renders the home page", async () => {
  const server = await getTestServer()
  const response = await supertest(server.app).get("/").send()
  expect(response.ok).toBe(true)
}, 1000000)
