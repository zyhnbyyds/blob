import type { ArticleItem } from '~/server/types/article'

export default defineEventHandler(async (event) => {
  const query = getQuery<{ id: string }>(event)

  if (!query.id)
    return Err_400(event, 'id is required')

  const articleId = `article:${query.id}`

  if (!(await hasItem<boolean>(articleId)))
    return Err_400(event, 'articleId not found')

  removeStorage(articleId)

  return 'del success'
})
