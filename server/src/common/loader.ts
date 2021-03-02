import { UUID } from "@amble/common/uuid"
import Dataloader from "dataloader"
import { EntityRepository, FilterQuery } from "mikro-orm"
import { Ent } from "../entities/ent.entity"

export class Loader<T extends Ent> {
  private readonly dataloader: Dataloader<UUID, T | null>

  constructor(repository: EntityRepository<T>) {
    this.dataloader = this.createDataloader(repository)
  }

  async load(id: UUID): Promise<T | null> {
    return await this.dataloader.load(id)
  }

  add(entity: T): T
  add<T>(entities: T[]): T[]
  add(input: T | T[]): T | T[]
  add(input: T | T[]): T | T[] {
    if (Array.isArray(input)) {
      for (const entity of input) {
        this.dataloader.prime(entity.id, entity)
      }
    } else {
      this.dataloader.prime(input.id, input)
    }

    return input
  }

  remove(entity: T): T
  remove<T>(entities: T[]): T[]
  remove(input: T | T[]): T | T[]
  remove(input: T | T[]): T | T[] {
    if (Array.isArray(input)) {
      for (const entity of input) {
        this.dataloader.clear(entity.id)
      }
    } else {
      this.dataloader.clear(input.id)
    }

    return input
  }

  clear(): void {
    this.dataloader.clearAll()
  }

  private createDataloader(repository: EntityRepository<T>): Dataloader<UUID, T | null> {
    return new Dataloader(async (ids) => {
      const entities = await repository.find({ id: { $in: [...ids] } } as FilterQuery<T>)
      const entries = entities.map<[UUID, T]>((entity) => [entity.id, entity])
      const mapping = new Map(entries)
      return ids.map((id) => mapping.get(id) ?? null)
    })
  }
}
