import { Comment } from "../entities/comment.entity"
import { Store } from "../common/store"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { EntityManager } from "mikro-orm"

@Service()
export class CommentStore extends Store<Comment> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Comment)
  }
}
