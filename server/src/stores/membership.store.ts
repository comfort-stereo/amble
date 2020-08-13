import { EntityManager } from "mikro-orm"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { Store } from "../common/store"
import { Membership } from "../entities/membership.entity"

@Service()
export class MembershipStore extends Store<Membership> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Membership)
  }
}
