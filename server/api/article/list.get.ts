import { z } from 'zod'
import { ArticleSchema } from '~/server/models/article'

const schema = z.object({
  page: z.string().default('1').transform(val => Number(val)),
  size: z.string().default('10').transform(val => Number(val)),
})

type Page = z.infer<typeof schema>

export default defineEventHandler<{ query: Page }>(async (event) => {
  const query = getQuery(event)
  const result = schema.safeParse(query)

  if (!result.success)
    return Err_400(event, result.error.message)

  const { page, size } = result.data

  const list = await ArticleSchema.find({ isDelete: false }).skip((page - 1) * size).limit(size).sort({ createTime: -1 })

  const total = await ArticleSchema.find({ isDelete: false }).countDocuments()

  const pages = Math.ceil(total / size)

  return {
    list,
    total,
    page,
    size,
    pages,
  }
})
