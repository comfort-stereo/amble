import { Store } from "../common/store"
import { Post } from "../entities/post.entity"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { EntityManager } from "mikro-orm"

@Service()
export class PostStore extends Store<Post> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Post)
  }
}
