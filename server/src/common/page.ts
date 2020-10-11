import { UUID } from "@amble/common/uuid"
import { EntityClass } from "mikro-orm/dist/typings"
import { ClassType, Field, Int, ObjectType } from "type-graphql"
import { Ent } from "../entities/ent.entity"

export interface GenericPage<T extends Ent> {
  total: number
  nodes: T[]
  edges: GenericPageEdge<T>[]
  pageInfo: GenericPageInfo
}

export interface GenericPageEdge<T extends Ent> {
  cursor: UUID
  node: T
}

export interface GenericPageInfo {
  startCursor: UUID | null
  endCursor: UUID | null
  hasNextPage: boolean
}

export function Page<T extends Ent, E extends GenericPageEdge<T>>(
  T: EntityClass<T>,
  E: ClassType<E>,
) {
  @ObjectType(`${T.name}Page`)
  class Page implements GenericPage<T> {
    @Field(() => Int)
    total: number

    @Field(() => [E])
    edges: GenericPageEdge<T>[]

    @Field(() => [T])
    nodes: T[]

    @Field(() => PageInfo)
    pageInfo: GenericPageInfo

    constructor(data: Partial<GenericPage<T>> = {}) {
      Object.assign(this, data)
    }
  }

  return Page
}

export function PageEdge<T extends Ent>(T: EntityClass<T>) {
  @ObjectType(`${T.name}PageEdge`)
  class PageEdge implements GenericPageEdge<T> {
    @Field(() => UUID)
    cursor: UUID

    @Field(() => T)
    node: T

    constructor(data: Partial<GenericPageEdge<T>> = {}) {
      Object.assign(this, data)
    }
  }

  return PageEdge
}

@ObjectType()
export class PageInfo implements GenericPageInfo {
  @Field(() => UUID, { nullable: true })
  startCursor: UUID | null

  @Field(() => UUID, { nullable: true })
  endCursor: UUID | null

  @Field(() => Boolean)
  hasNextPage: boolean

  constructor(data: Partial<GenericPageInfo> = {}) {
    Object.assign(this, data)
  }
}
