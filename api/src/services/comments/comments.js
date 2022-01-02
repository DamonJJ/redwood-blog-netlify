import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const comments = ({ postId }) => {
  return db.comment.findMany({ where: { postId } })
}

export const comment = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment = ({ input }) => {
  return db.comment.create({
    data: input,
  })
}

export const Comment = {
  post: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).post(),
}

export const deleteComment = ({ id }) => {
  requireAuth({ roles: ['admin', 'moderator'] })
  return db.comment.delete({
    where: { id },
  })
}
