import { EntityManager } from "mikro-orm"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { Store } from "../common/store"
import { Group } from "../entities/group.entity"

@Service()
export class GroupStore extends Store<Group> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Group)
  }
}
