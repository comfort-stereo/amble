import { EntityManager } from "mikro-orm"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { Store } from "../common/store"
import { User } from "../entities/user.entity"

@Service()
export class UserStore extends Store<User> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, User)
  }
}
