import { EntityClass, EntityData, Query } from "mikro-orm/dist/typings"
import { EntityManager, QueryBuilder, QueryOrder } from "mikro-orm"
import { GenericPage, Page, PageEdge, PageInfo } from "./page"

import { Ent } from "../entities/ent.entity"
import { EntID } from "./ent-id"
import { GetManyArgs } from "./args"
import { GraphQLError } from "graphql"
import { Loader } from "./loader"
import { Repository } from "./repository"
import { Service } from "typedi"

export type StoreFilter<TEnt extends Ent> = Readonly<Query<TEnt> & {}>
export type EntRelation<TEnt extends Ent> = (keyof TEnt & string) | string
export type EntRelations<TEnt extends Ent> = EntRelation<TEnt>[]

@Service()
export abstract class Store<TEnt extends Ent> {
  protected readonly repository: Repository<TEnt>
  protected readonly loader: Loader<TEnt>

  constructor(
    protected readonly em: EntityManager,
    protected readonly entityClass: EntityClass<TEnt>,
  ) {
    this.repository = new Repository(em, entityClass)
    this.loader = new Loader(this.repository)
  }

  public make(data: EntityData<TEnt>): TEnt {
    return this.repository.create(data)
  }

  public async create(data: EntityData<TEnt>): Promise<TEnt> {
    const created = this.make(data)
    this.loader.add(created)
    await this.repository.persistAndFlush(created)
    return created
  }

  public async delete(id: EntID): Promise<TEnt | null> {
    const deleted = await this.loader.load(id)
    if (deleted == null) {
      return null
    }

    await this.repository.removeAndFlush(this.loader.remove(deleted))
    return deleted
  }

  public async get(id: EntID, relations?: EntRelations<TEnt>): Promise<TEnt | null> {
    if (relations == null || relations.length === 0) {
      return await this.loader.load(id)
    }

    const instance = await this.repository.findOne({ id }, relations)
    if (instance != null) {
      this.loader.add(instance)
    }

    return instance
  }

  public async getOrFail(id: EntID, relations?: EntRelations<TEnt>): Promise<TEnt> {
    const instance = await this.get(id, relations)
    if (instance == null) {
      throw new GraphQLError(`${this.entityClass.name} [${id}] not found.`)
    }

    return instance
  }

  public async getMany(args: GetManyArgs, filter?: StoreFilter<TEnt>): Promise<GenericPage<TEnt>> {
    let query = this.repository.createQueryBuilder()
    if (filter != null) {
      query.where(filter)
    }

    const total = await count(query.clone())

    if (args.after != null) {
      const current = await this.repository.findOneOrFail(args.after)
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

    const PageEdgeType = PageEdge(this.entityClass)
    const PageType = Page(this.entityClass, PageEdgeType)

    return new PageType({
      total,
      nodes,
      edges: nodes.map((entity: TEnt) => {
        return new PageEdgeType({
          cursor: entity.id,
          node: entity,
        })
      }),
      pageInfo: new PageInfo({
        startCursor: nodes[0]?.id,
        endCursor: nodes[nodes.length - 1]?.id,
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
