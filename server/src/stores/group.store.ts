import { Store } from "../common/store"
import { Group } from "../entities/group.entity"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { EntityManager } from "mikro-orm"

@Service()
export class GroupStore extends Store<Group> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Group)
  }
}
