import { Service } from "typedi"
import { Store } from "../common/store"
import { Membership } from "../entities/membership.entity"
import { EntityManager } from "mikro-orm"
import { InjectEM } from "../common/di"

@Service()
export class MembershipStore extends Store<Membership> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Membership)
  }
}
