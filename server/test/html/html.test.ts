import supertest from "supertest"
import { getTestServer } from "../common/util"

it("renders the home page", async () => {
  const server = await getTestServer({}, { headless: false })
  const response = await supertest(server.app).get("/").send()
  expect(response.ok).toBe(true)
  expect(response.type).toBe("text/html")
})
