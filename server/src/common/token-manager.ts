import jwt from "jsonwebtoken"

export class TokenManager<T extends string, D extends {}> {
  constructor(private readonly secret: string, private readonly expirySeconds: number) {}

  verify(input: string): input is T {
    if (typeof input !== "string") {
      return false
    }

    try {
      jwt.verify(input, this.secret)
      return true
    } catch {
      return false
    }
  }

  decode(token: T): D {
    return jwt.decode(token) as D
  }

  create(data: D): T {
    return jwt.sign(data, this.secret, { expiresIn: `${this.expirySeconds}s` }) as T
  }
}
