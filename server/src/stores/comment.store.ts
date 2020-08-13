import { EntityManager } from "mikro-orm"
import { Service } from "typedi"
import { InjectEM } from "../common/di"
import { Store } from "../common/store"
import { Comment } from "../entities/comment.entity"

@Service()
export class CommentStore extends Store<Comment> {
  constructor(@InjectEM() em: EntityManager) {
    super(em, Comment)
  }
}
