import { EntityManager } from "mikro-orm"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { Store } from "../common/store"
import { Post } from "../entities/post.entity"

@Service()
export class PostStore extends Store<Post> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Post)
  }
}
