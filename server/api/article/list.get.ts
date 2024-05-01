import { z } from 'zod'
import { ArticleSchema } from '~/server/models/article'

const schema = z.object({
  page: z
    .string()
    .default('1')
    .transform(val => Number(val)),
  size: z
    .string()
    .default('10')
    .transform(val => Number(val)),

  type: z.string()
    .default('normal')
    .transform(val => val === 'normal' ? 'normal' : 'draft'),
})

type Page = z.infer<typeof schema>

export default defineEventHandler<{ query: Page }>(async (event) => {
  const query = getQuery(event)
  const result = schema.safeParse(query)

  if (!result.success)
    return Err_400(result.error.message)

  const { page, size, type } = result.data

  if (type === 'normal') {
    const list = await ArticleSchema.find({ isDelete: false })
      .sort({ createTime: -1 })
      .skip((page - 1) * size)
      .limit(size)
      .select('title createTime id isDelete createTime updateTime')
      .exec()

    const total = await ArticleSchema.find({ isDelete: false }).countDocuments()

    const pages = Math.ceil(total / size)

    return {
      success: true,
      data: {
        list,
        total,
        pages,
      },
    }
  }
  else {
    const aggregation = ArticleSchema.aggregate([
      {
        $match: { isDelete: false },
      },
      {
        $sort: { createTime: -1 },
      },
      {
        $skip: (page - 1) * size,
      },
      {
        $limit: size,
      },
      {
        $project: {
          year: { $year: {
            $dateFromString: {
              dateString: '$createTime',
            },
          } },
          title: 1,
          createTime: 1,
          id: 1,
          isDelete: 1,
          updateTime: 1,
        },
      },
      {
        $group: {
          _id: '$year',
          articles: { $push: '$$ROOT' },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ])

    const list = await aggregation.exec()

    const total = await ArticleSchema.find({ isDelete: false }).countDocuments()

    const pages = Math.ceil(total / size)

    return {
      success: true,
      data: {
        list,
        total,
        pages,
      },
    }
  }
})
