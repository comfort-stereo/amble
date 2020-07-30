import {
  EntityData,
  EntityManager,
  EntityName,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOneOrFailOptions,
  FindOptions,
  IdentifiedReference,
  QueryBuilder,
  QueryOrderMap,
  Reference,
} from "mikro-orm"

import { Ent } from "../entities/ent.entity"
import { EntID } from "./ent-id"

export declare type QueryOperatorMap<T, P extends keyof T = never> = {
  $and?: Query<T>[]
  $or?: Query<T>[]
  $eq?: Query<T> | T[P][]
  $ne?: Query<T> | T[P][]
  $in?: Query<T>[] | T[P][]
  $nin?: EntID | T[P]
  $not?: EntID | T[P]
  $gt?: T[P] & (number | Date)
  $gte?: T[P] & (number | Date)
  $lt?: T[P] & (number | Date)
  $lte?: T[P] & (number | Date)
  $like?: T[P] & string
  $re?: T[P] & string
}

type QueryMap<T> = {
  [P in keyof T]?: QueryMap<T[P]> | QueryOperatorMap<T[P], keyof T[P]>
}

export type Query<T> = EntID | T | QueryMap<T>

export class Repository<T extends Ent = Ent> {
  private inner: EntityRepository<T>

  constructor(em: EntityManager, type: EntityName<T>) {
    this.inner = new EntityRepository<T>(em, type)
  }

  createQueryBuilder(alias?: string): QueryBuilder<T> {
    return this.inner.createQueryBuilder(alias)
  }

  async persist(entity: T, flush?: boolean): Promise<T>
  async persist(entities: T[], flush?: boolean): Promise<T[]>
  async persist(entities: T | T[], flush?: boolean): Promise<T | T[]> {
    await this.inner.persist(entities, flush)
    return entities
  }

  async persistAndFlush(entity: T): Promise<T>
  async persistAndFlush(entities: T[]): Promise<T[]>
  async persistAndFlush(entities: T | T[]): Promise<T | T[]> {
    await this.inner.persistAndFlush(entities)
    return entities
  }

  persistLater(entity: T): T
  persistLater(entities: T[]): T[]
  persistLater(entities: T | T[]): T | T[] {
    this.inner.persistLater(entities)
    return entities
  }

  findOne(
    where: Query<T>,
    populate?: string[] | boolean | FindOneOptions,
    orderBy?: QueryOrderMap,
  ): Promise<T | null> {
    return this.inner.findOne(where as FilterQuery<T>, populate as any, orderBy)
  }

  findOneOrFail(
    where: Query<T>,
    populate?: string[] | boolean | FindOneOrFailOptions,
    orderBy?: QueryOrderMap,
  ): Promise<T> {
    return this.inner.findOneOrFail(where as FilterQuery<T>, populate as any, orderBy)
  }

  find(
    where: Query<T>,
    populate?: string[] | boolean | FindOptions,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<T[]> {
    return this.inner.find(where as FilterQuery<T>, populate as any, orderBy, limit, offset)
  }

  findAndCount(
    where: Query<T>,
    populate?: string[] | boolean | FindOptions,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<[T[], number]> {
    return this.inner.findAndCount(where as FilterQuery<T>, populate as any, orderBy, limit, offset)
  }

  findAll(options?: FindOptions): Promise<T[]>
  findAll(
    populate?: string[] | boolean | true,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<T[]>
  findAll(
    first?: string[] | boolean | true | FindOptions,
    orderBy?: QueryOrderMap,
    limit?: number,
    offset?: number,
  ): Promise<T[]> {
    return this.inner.findAll(first as any, orderBy, limit, offset)
  }

  remove(where: T | Query<T>, flush?: boolean): void | Promise<number> {
    return this.inner.remove(where as FilterQuery<T>, flush)
  }

  removeAndFlush(entity: T): Promise<void> {
    return this.inner.removeAndFlush(entity)
  }

  removeLater(entity: T): void {
    return this.inner.removeLater(entity)
  }

  flush(): Promise<void> {
    return this.inner.flush()
  }

  nativeInsert(data: EntityData<T>): Promise<EntID> {
    return this.inner.nativeInsert(data)
  }

  nativeUpdate(where: Query<T>, data: EntityData<T>): Promise<number> {
    return this.inner.nativeUpdate(where as FilterQuery<T>, data)
  }

  nativeDelete(where: Query<T>): Promise<number> {
    return this.inner.nativeDelete(where as FilterQuery<T>)
  }

  map(result: EntityData<T>): T {
    return this.inner.map(result)
  }

  aggregate(pipeline: any[]): Promise<any[]> {
    return this.inner.aggregate(pipeline)
  }

  getReference<PK extends keyof T>(id: EntID, wrapped: true): IdentifiedReference<T, PK>
  getReference<PK extends keyof T = keyof T>(id: EntID): T
  getReference<PK extends keyof T = keyof T>(id: EntID, wrapped: false): T
  getReference<PK extends keyof T = keyof T>(id: EntID, wrapped: true): Reference<T>
  getReference<PK extends keyof T = keyof T>(
    id: EntID,
    wrapped?: boolean,
  ): IdentifiedReference<T, PK> | T | Reference<T> {
    if (wrapped != null) {
      return this.inner.getReference(id as any, wrapped as any)
    }

    return this.inner.getReference(id as any)
  }

  canPopulate(property: string): boolean {
    return this.inner.canPopulate(property)
  }

  populate<A extends T | T[]>(
    entities: A,
    populate: string | string[] | boolean,
    where?: Query<T>,
    orderBy?: QueryOrderMap,
    refresh?: boolean,
    validate?: boolean,
  ): Promise<A> {
    return this.inner.populate(
      entities,
      populate,
      where as FilterQuery<T>,
      orderBy,
      refresh,
      validate,
    )
  }

  create(data: EntityData<T>): T {
    return this.inner.create(data)
  }

  count(where?: Query<T>): Promise<number> {
    return this.inner.count(where as FilterQuery<T>)
  }
}
