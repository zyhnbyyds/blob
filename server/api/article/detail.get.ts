import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, query =>
    z
      .object({
        id: z.string(),
      })
      .safeParse(query))

  if (!result.success)
    return Err_400(result.error.message)

  const isArticle = await ArticleSchema.exists({
    id: result.data.id,
    isDelete: false,
  })

  if (!isArticle)
    return Err_400('Article not found')

  const article = await ArticleSchema.findOne({ isDelete: false })
    .where('id')
    .equals(result.data.id)

  return {
    success: true,
    data: article,
  }
})
