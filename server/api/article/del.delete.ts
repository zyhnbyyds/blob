import { z } from 'zod'
import { ArticleSchema } from '~/server/models/article'

const delValidate = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, query =>
    delValidate.safeParse(query))

  if (!result.success)
    return Err_400(result.error.message)

  await ArticleSchema.findOneAndUpdate(
    { id: result.data.id },
    { isDelete: true },
  )

  return {
    success: true,
    message: 'delete article success',
    data: {
      id: String(result.data.id),
    },
  }
})
