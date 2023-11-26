import type { ArticleItem } from '~/server/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<ArticleItem | null>(event)

  if (!body || !body.title || !body.content)
    return Err_400(event, 'payload error')

  if (await getStorage<ArticleItem>('articles') === null) {
    setStorage<ArticleItem[]>('articles', [])
  }
  else {
    const articles = await getStorage<ArticleItem[]>('articles')
    await setStorage<ArticleItem[]>('articles', [...articles, body])
  }

  return 'success'
})
