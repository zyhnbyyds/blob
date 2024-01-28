import { Snowflake } from '~/lib/snow-flake'
import { AddSchema } from '~/server/config/zod/article'
import { ArticleSchema } from '~/server/models/article'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => AddSchema.safeParse(body))

  if (!result.success)
    return Err_400(event, result.error.message)

  const snowFlakeId = new Snowflake(1, 1).generateId()

  const timeNow = dayjs().format('YYYY-MM-DD HH:mm:ss')

  await new ArticleSchema({ ...result.data, id: snowFlakeId, createTime: timeNow, updateTime: timeNow, isDelete: false }).save()

  return {
    id: String(snowFlakeId),
    msg: 'success',
  }
})
