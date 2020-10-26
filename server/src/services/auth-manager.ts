import type { Opaque } from "@amble/common/types"
import type { UUID } from "@amble/common/uuid"
import { uuid } from "@amble/common/uuid"
import { AuthenticationError } from "apollo-server"
import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { Redis } from "ioredis"
import { Service } from "typedi"
import { Environment } from "../../environment"
import { CookieType } from "../common/cookie-type"
import { InjectEnvironment, InjectRedis } from "../common/di"
import { TokenManager } from "../common/token-manager"
import { User } from "../entities/user.entity"
import { ns, RedisNamespace } from "../redis"
import { UserStore } from "../stores/user.store"

export type AccessToken = Opaque<string, "AccessToken">

type Session = {
  sessionID: UUID
  userID: UUID
  accessToken: AccessToken
}

type AccessTokenData = {
  accessTokenID: UUID
  sessionID: UUID
  userID: UUID
}

@Service()
export class AuthManager {
  private readonly accessTokenManager: TokenManager<AccessToken, AccessTokenData>

  constructor(
    @InjectEnvironment() private readonly environment: Environment,
    @InjectRedis() private readonly redis: Redis,
    private readonly userStore: UserStore,
  ) {
    this.accessTokenManager = new TokenManager(
      environment.accessTokenSecret,
      environment.accessTokenExpirySeconds,
    )
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    if (await this.userStore.findOne({ username })) {
      throw new AuthenticationError("That username is not available.")
    }

    return await this.userStore.createAndFlush({
      username,
      email,
      passwordHash: await this.hashPassword(password),
    })
  }

  async deleteUser(user: User): Promise<User | null> {
    return await this.userStore.deleteOneAndFlush(user)
  }

  async login(response: Response, username: string, password: string): Promise<Session> {
    const user = await this.userStore.findOne({ username })
    const invalid = user == null || !(await this.comparePassword(password, user.passwordHash))
    if (user == null || invalid) {
      throw new AuthenticationError("Those login credentials are incorrect.")
    }

    const userID = user.id
    const sessionID = uuid()

    const session = {
      sessionID,
      userID,
      accessToken: this.accessTokenManager.create({
        accessTokenID: uuid(),
        sessionID,
        userID,
      }),
    }

    await this.setSession(sessionID, session)
    this.setAccessTokenCookie(response, session.accessToken)

    return session
  }

  async refresh(request: Request, response: Response): Promise<Session | null> {
    const accessToken = await this.getAccessToken(request)
    if (accessToken == null) {
      return null
    }

    const { userID, sessionID } = this.getAccessTokenData(accessToken)
    const previous = await this.getSession(sessionID)
    if (previous == null) {
      return null
    }

    const session = {
      sessionID,
      userID,
      accessToken: this.accessTokenManager.create({
        accessTokenID: uuid(),
        sessionID,
        userID,
      }),
    }

    await this.setSession(sessionID, session)
    this.setAccessTokenCookie(response, session.accessToken)

    return session
  }

  async logout(request: Request, response: Response): Promise<boolean> {
    const accessToken = await this.getAccessToken(request)
    if (accessToken == null) {
      return false
    }

    const { sessionID } = this.getAccessTokenData(accessToken)
    this.deleteAccessTokenCookie(response)

    return await this.removeSession(sessionID)
  }

  async getUserID(request: Request): Promise<UUID | null> {
    const accessToken = await this.getAccessToken(request)
    if (accessToken == null) {
      return null
    }

    return this.getAccessTokenData(accessToken).userID
  }

  async getUser(request: Request): Promise<User | null> {
    const userID = await this.getUserID(request)
    if (userID == null) {
      return null
    }

    return await this.userStore.findOne(userID)
  }

  async getAccessToken(request: Request): Promise<AccessToken | null> {
    const authorization = request.headers.authorization
    const possibleAccessToken =
      authorization != null
        ? authorization.substring("Bearer ".length)
        : request.cookies[CookieType.AccessToken]

    if (possibleAccessToken == null) {
      return null
    }

    return await this.verifyAccessToken(possibleAccessToken)
  }

  private async verifyAccessToken(accessToken: string): Promise<AccessToken | null> {
    if (this.accessTokenManager.verify(accessToken)) {
      const { sessionID } = this.accessTokenManager.decode(accessToken)
      const session = await this.getSession(sessionID)
      if (session != null && session.accessToken === accessToken) {
        return accessToken as AccessToken
      }
    }

    return null
  }

  private getAccessTokenData(accessToken: AccessToken): AccessTokenData {
    return this.accessTokenManager.decode(accessToken)
  }

  private setAccessTokenCookie(response: Response, accessToken: AccessToken): void {
    response.cookie(CookieType.AccessToken, accessToken, {
      secure: this.environment.mode === "production",
      httpOnly: true,
      sameSite: this.environment.mode === "production" ? "strict" : undefined,
      maxAge: this.environment.accessTokenExpirySeconds,
    })
  }

  private deleteAccessTokenCookie(response: Response): void {
    response.clearCookie(CookieType.AccessToken)
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  private async getSession(sessionID: UUID): Promise<Session | null> {
    const data = await this.redis.get(ns(RedisNamespace.Session, sessionID))
    if (data == null) {
      return null
    }

    return JSON.parse(data) as Session
  }

  private async setSession(sessionID: UUID, session: Session): Promise<void> {
    await this.redis.setex(
      ns(RedisNamespace.Session, sessionID),
      this.environment.accessTokenExpirySeconds,
      JSON.stringify(session),
    )
  }

  private async removeSession(sessionID: UUID): Promise<boolean> {
    return (await this.redis.del(ns(RedisNamespace.Session, sessionID))) > 0
  }
}
