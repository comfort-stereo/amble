import Dataloader from "dataloader"
import { Ent } from "../entities/ent.entity"
import { EntID } from "./ent-id"
import { Repository } from "./repository"

export class Loader<T extends Ent> {
  private readonly dataloader: Dataloader<EntID, T | null>

  constructor(repository: Repository<T>) {
    this.dataloader = this.createDataloader(repository)
  }

  async load(id: EntID): Promise<T | null> {
    return await this.dataloader.load(id)
  }

  add(entity: T): T {
    this.dataloader.prime(entity.id, entity)
    return entity
  }

  addMany<TEnts extends Iterable<T>>(entities: TEnts): TEnts {
    for (const entity of entities) {
      this.add(entity)
    }

    return entities
  }

  remove(entity: T): T {
    this.dataloader.clear(entity.id)
    return entity
  }

  removeMany<TEnts extends Iterable<T>>(entities: TEnts): TEnts {
    for (const entity of entities) {
      this.remove(entity)
    }

    return entities
  }

  clear(): void {
    this.dataloader.clearAll()
  }

  private createDataloader(repository: Repository<T>): Dataloader<EntID, T | null> {
    return new Dataloader(async (ids) => {
      const entities = await repository.find({ id: { $in: [...ids] } })
      const entries = entities.map<[EntID, T]>((entity) => [entity.id, entity])
      const mapping = new Map(entries)
      return ids.map((id) => mapping.get(id) ?? null)
    })
  }
}
