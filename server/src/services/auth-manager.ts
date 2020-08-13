import { RedisNamespace, ns } from "../redis-namespace"
import { Request, Response } from "express"
import { UUID, uuid } from "../common/uuid"

import { AuthenticationError } from "apollo-server"
import { CookieType } from "../common/cookie-type"
import { InjectRedis } from "../common/di"
import { Opaque } from "../common/types"
import { Redis } from "ioredis"
import { Service } from "typedi"
import { TokenManager } from "../common/token-manager"
import { User } from "../entities/user.entity"
import { UserStore } from "../stores/user.store"
import bcrypt from "bcrypt"
import { environment } from "../../environment"

export type AccessToken = Opaque<string, "AccessToken">
export type RefreshToken = Opaque<string, "RefreshToken">

type AccessTokenData = {
  accessTokenID: UUID
  sessionID: UUID
  userID: UUID
}

type RefreshTokenData = {
  refreshTokenID: UUID
  sessionID: UUID
  userID: UUID
}

type Session = {
  sessionID: UUID
  userID: UUID
  refreshToken: RefreshToken
  accessToken: AccessToken
}

const accessTokenManager = new TokenManager<AccessToken, AccessTokenData>(
  environment.accessTokenSecret,
  environment.accessTokenExpirySeconds,
)
const refreshTokenManager = new TokenManager<RefreshToken, RefreshTokenData>(
  environment.refreshTokenSecret,
  environment.refreshTokenExpirySeconds,
)

@Service()
export class AuthManager {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly userStore: UserStore,
  ) {}

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

  async login(username: string, password: string): Promise<Session> {
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
      refreshToken: refreshTokenManager.create({
        refreshTokenID: uuid(),
        sessionID,
        userID,
      }),
      accessToken: accessTokenManager.create({
        accessTokenID: uuid(),
        sessionID,
        userID,
      }),
    }

    await this.setSession(sessionID, session)
    return session
  }

  async logout(possibleAccessToken: string): Promise<boolean> {
    const accessToken = await this.verifyAccessToken(possibleAccessToken)
    if (accessToken == null) {
      return false
    }

    const { sessionID } = this.getAccessTokenData(accessToken)
    return await this.removeSession(sessionID)
  }

  async refresh(possibleRefreshToken: string): Promise<Session | null> {
    const refreshToken = await this.verifyRefreshToken(possibleRefreshToken)
    if (refreshToken == null) {
      return null
    }

    const { userID, sessionID } = this.getRefreshTokenData(refreshToken)
    const previous = await this.getSession(sessionID)
    if (previous == null) {
      return null
    }

    const session = {
      sessionID,
      userID,
      refreshToken: refreshTokenManager.create({
        refreshTokenID: uuid(),
        sessionID,
        userID,
      }),
      accessToken: accessTokenManager.create({
        accessTokenID: uuid(),
        sessionID,
        userID,
      }),
    }

    await this.setSession(sessionID, session)
    return session
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
    if (authorization == null) {
      return null
    }

    const accessToken = authorization.substring("Bearer ".length)
    return await this.verifyAccessToken(accessToken)
  }

  async getRefreshToken(request: Request): Promise<RefreshToken | null> {
    const refreshToken = request.cookies[CookieType.RefreshToken]
    if (refreshToken == null) {
      return null
    }

    return await this.verifyRefreshToken(refreshToken)
  }

  setRefreshToken(response: Response, session: Session): void {
    response.cookie(CookieType.RefreshToken, session.refreshToken)
  }

  private async verifyAccessToken(accessToken: string): Promise<AccessToken | null> {
    if (accessTokenManager.verify(accessToken)) {
      const { sessionID } = accessTokenManager.decode(accessToken)
      const session = await this.getSession(sessionID)
      if (session != null && session.accessToken === accessToken) {
        return accessToken as AccessToken
      }
    }

    return null
  }

  private async verifyRefreshToken(refreshToken: string): Promise<RefreshToken | null> {
    if (refreshTokenManager.verify(refreshToken)) {
      const { sessionID } = refreshTokenManager.decode(refreshToken)
      const session = await this.getSession(sessionID)
      if (session != null && session.refreshToken === refreshToken) {
        return refreshToken as RefreshToken
      }
    }

    return null
  }

  private getAccessTokenData(accessToken: AccessToken): AccessTokenData {
    return accessTokenManager.decode(accessToken)
  }

  private getRefreshTokenData(refreshToken: RefreshToken): RefreshTokenData {
    return refreshTokenManager.decode(refreshToken)
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
      environment.refreshTokenExpirySeconds,
      JSON.stringify(session),
    )
  }

  private async removeSession(sessionID: UUID): Promise<boolean> {
    return (await this.redis.del(ns(RedisNamespace.Session, sessionID))) > 0
  }
}
