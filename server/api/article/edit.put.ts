import { omit } from 'lodash-es'
import { EditSchema } from '~/server/config/zod/article'
import { ArticleSchema } from '~/server/models/article'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, query =>
    EditSchema.safeParse(query))

  if (!result.success)
    return Err_400(result.error.message)

  await ArticleSchema.findOneAndUpdate(
    {
      id: result.data.id,
    },
    {
      ...omit(result.data, 'id'),
    },
  )
  return {
    success: true,
    message: 'edit article success',
    data: {
      id: String(result.data.id),
    },
  }
})
