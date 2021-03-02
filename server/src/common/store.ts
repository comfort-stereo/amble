import { isUUID, UUID } from "@amble/common/uuid"
import { GraphQLError } from "graphql"
import {
  EntityData,
  EntityManager,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOneOrFailOptions,
  FindOptions,
  IdentifiedReference,
  QueryBuilder,
  QueryOrder,
  QueryOrderMap,
  Reference,
} from "mikro-orm"
import { EntityClass } from "mikro-orm/dist/typings"
import { Ent } from "../entities/ent.entity"
import { Loader } from "./loader"
import { GenericPage, Page, PageEdge, PageInfo } from "./page"

export type PaginateArgs = {
  first: number
  after: UUID | null
}

export declare type QueryOperatorMap<T, P extends keyof T = never> = {
  $and?: Query<T>[]
  $or?: Query<T>[]
  $eq?: Query<T> | T[P][]
  $ne?: Query<T> | T[P][]
  $in?: Query<T>[] | T[P][]
  $nin?: UUID | T[P]
  $not?: UUID | T[P]
  $gt?: T[P] & (number | Date)
  $gte?: T[P] & (number | Date)
  $lt?: T[P] & (number | Date)
  $lte?: T[P] & (number | Date)
  $like?: T[P] & string
  $re?: T[P] & string
}

type QueryMap<T> = {
  [P in keyof T]?: Query<T[P]> | QueryMap<T[P]> | QueryOperatorMap<T[P], keyof T[P]>
}

export type Query<T> = UUID | T | QueryMap<T>

export class Store<T extends Ent = Ent> {
  private readonly repository: EntityRepository<T>
  private readonly type: EntityClass<T>
  private readonly loader: Loader<T>

  constructor(em: EntityManager, type: EntityClass<T>) {
    this.repository = new EntityRepository<T>(em, type)
    this.type = type
    this.loader = new Loader(this.repository)
  }

  createQueryBuilder(alias?: string): QueryBuilder<T> {
    return this.repository.createQueryBuilder(alias)
  }

  async persist(entity: T, flush?: boolean): Promise<T>
  async persist(entities: T[], flush?: boolean): Promise<T[]>
  async persist(entities: T | T[], flush?: boolean): Promise<T | T[]>
  async persist(entities: T | T[], flush?: boolean): Promise<T | T[]> {
    await this.repository.persist(entities, flush)
    return entities
  }

  async persistAndFlush(entity: T): Promise<T>
  async persistAndFlush(entities: T[]): Promise<T[]>
  async persistAndFlush(entities: T | T[]): Promise<T | T[]>
  async persistAndFlush(entities: T | T[]): Promise<T | T[]> {
    await this.repository.persistAndFlush(entities)
    return entities
  }

  persistLater(entity: T): T
  persistLater(entities: T[]): T[]
  persistLater(entities: T | T[]): T | T[]
  persistLater(entities: T | T[]): T | T[] {
    this.repository.persistLater(entities)
    return entities
  }

  async findOne(
    where: Query<T>,
    populate?: string[] | boolean | FindOneOptions,
    orderBy?: QueryOrderMap,
  ): Promise<T | null> {
    if (isUUID(where) && populate == null) {
      return await this.loader.load(where)
    }

    const entity = await this.repository.findOne(where as FilterQuery<T>, populate as any, orderBy)
    if (entity != null) {
      this.loader.add(entity)
    }

    return entity
  }

  async findOneOrFail(
    where: Query<T>,
    populate?: string[] | boolean | FindOneOrFailOptions,
    orderBy?: QueryOrderMap,
  ): Promise<T> {
    const entity = await this.findOne(where, populate, orderBy)
    if (entity == null) {
      if (isUUID(where)) {
        throw new GraphQLError(`${this.type.name} [${where}] not found.`)
      } else {
        throw new GraphQLError(`${this.type.name} matching query not found.`)
      }
    }

    return entity
  }

  async find(
    where: Query<T>,
    populate?: string[] | boolean | FindOptions,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<T[]> {
    return this.loader.add(
      await this.repository.find(where as FilterQuery<T>, populate as any, orderBy, limit, offset),
    )
  }

  async findAndCount(
    where: Query<T>,
    populate?: string[] | boolean | FindOptions,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<[T[], number]> {
    const [entities, count] = await this.repository.findAndCount(
      where as FilterQuery<T>,
      populate as any,
      orderBy,
      limit,
      offset,
    )

    this.loader.add(entities)
    return [entities, count]
  }

  findAll(options?: FindOptions): Promise<T[]>
  findAll(
    populate?: string[] | boolean | true,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<T[]>
  async findAll(
    first?: string[] | boolean | true | FindOptions,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<T[]> {
    return await this.repository.findAll(first as any, orderBy, limit, offset)
  }

  async delete(where: UUID | T | Query<T>): Promise<number> {
    return (await this.repository.remove(where as FilterQuery<T>)) || 0
  }

  async deleteAndFlush(where: UUID | T | Query<T>): Promise<number> {
    const count = await this.delete(where)
    this.flush()
    return count
  }

  async deleteOne(entity: UUID | T): Promise<T | null> {
    const result = isUUID(entity) ? await this.repository.findOne(entity as any) : entity
    await this.repository.remove(entity as any)
    return result
  }

  async deleteOneAndFlush(entity: UUID | T): Promise<T | null> {
    const result = await this.deleteOne(entity)
    await this.flush()
    return result
  }

  deleteOneLater(entity: T): T {
    this.repository.removeLater(entity)
    return entity
  }

  flush(): Promise<void> {
    return this.repository.flush()
  }

  nativeInsert(data: EntityData<T>): Promise<UUID> {
    return this.repository.nativeInsert(data)
  }

  nativeUpdate(where: Query<T>, data: EntityData<T>): Promise<number> {
    return this.repository.nativeUpdate(where as FilterQuery<T>, data)
  }

  nativeDelete(where: Query<T>): Promise<number> {
    return this.repository.nativeDelete(where as FilterQuery<T>)
  }

  map(result: EntityData<T>): T {
    return this.repository.map(result)
  }

  aggregate(pipeline: any[]): Promise<any[]> {
    return this.repository.aggregate(pipeline)
  }

  getReference<PK extends keyof T>(id: UUID, wrapped: true): IdentifiedReference<T, PK>
  getReference<PK extends keyof T = keyof T>(id: UUID): T
  getReference<PK extends keyof T = keyof T>(id: UUID, wrapped: false): T
  getReference<PK extends keyof T = keyof T>(id: UUID, wrapped: true): Reference<T>
  getReference<PK extends keyof T = keyof T>(
    id: UUID,
    wrapped?: boolean,
  ): IdentifiedReference<T, PK> | T | Reference<T> {
    if (wrapped != null) {
      return this.repository.getReference(id as any, wrapped as any)
    }

    return this.repository.getReference(id as any)
  }

  canPopulate(property: string): boolean {
    return this.repository.canPopulate(property)
  }

  populate<A extends T | T[]>(
    entities: A,
    populate: string | string[] | boolean,
    where?: Query<T>,
    orderBy?: QueryOrderMap,
    refresh?: boolean,
    validate?: boolean,
  ): Promise<A> {
    return this.repository.populate(
      entities,
      populate,
      where as FilterQuery<T>,
      orderBy,
      refresh,
      validate,
    )
  }

  create(data: EntityData<T>): T {
    return this.repository.create(data)
  }

  async createAndFlush(data: EntityData<T>): Promise<T> {
    return this.persistAndFlush(this.repository.create(data))
  }

  count(where?: Query<T>): Promise<number> {
    return this.repository.count(where as FilterQuery<T>)
  }

  public async paginate(args: PaginateArgs, filter?: Query<T> & {}): Promise<GenericPage<T>> {
    const query = this.createQueryBuilder()
    if (filter != null) {
      query.where(filter)
    }

    const total = await count(query.clone())

    if (args.after != null) {
      const current = await this.findOneOrFail(args.after)
      const parameters = { created: { $lt: current.created } }
      if (filter != null) {
        query.andWhere(parameters)
      } else {
        query.where(parameters)
      }
    }

    const remaining = await count(query.clone())

    const nodes = await query
      .select("*")
      .orderBy({ created: QueryOrder.DESC })
      .limit(args.first)
      .execute()

    const PageEdgeType = PageEdge(this.type)
    const PageType = Page(this.type, PageEdgeType)

    return new PageType({
      total,
      edges: nodes.map((entity: T) => {
        return new PageEdgeType({
          cursor: entity.id,
          node: entity,
        })
      }),
      pageInfo: new PageInfo({
        startCursor: nodes[0]?.id,
        endCursor: nodes[nodes.length - 1]?.id,
        hasPreviousPage: false,
        hasNextPage: remaining > nodes.length,
      }),
    })
  }
}

type CountResult = [{ count: number }]

async function count<TEnt extends Ent>(query: QueryBuilder<TEnt>): Promise<number> {
  const result = await query.count().execute<CountResult>()
  return result[0].count
}
