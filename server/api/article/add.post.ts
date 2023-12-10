import { Snowflake } from '~/lib/snow-flake'
import type { ArticleItem } from '~/server/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<ArticleItem | null>(event)

  if (!body || !body.title || !body.content)
    return Err_400(event, 'payload error')

  const snowFlakeId = new Snowflake(1, 1).generateId()
  const articleId = `article:${snowFlakeId}`

  const timeNow = dayjs().format('YYYY-MM-DD HH:mm:ss')

  setStorage<ArticleItem>(articleId, { ...body, id: snowFlakeId, createTime: timeNow, updateTime: timeNow })

  if (await getStorage<ArticleItem>('articles') === null) {
    setStorage<string[]>('articles', [snowFlakeId])
  }
  else {
    const articles = await getStorage<string[]>('articles')
    await setStorage<string[]>('articles', [...articles, snowFlakeId])
  }

  return {
    id: String(snowFlakeId),
    msg: 'success',
  }
})
