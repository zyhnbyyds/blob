import type { ArticleItem } from '~/server/types'

export default defineEventHandler(async () => {
  const articles = await getStorage<ArticleItem>('articles')
  return articles ?? []
})
