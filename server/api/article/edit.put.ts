import omit from 'lodash-es/omit'
import type { ArticleItem } from '~/server/types'
import { hasItem } from '~/server/utils/request/request'

export default defineEventHandler(async (event) => {
  const body = await readBody<ArticleItem | null>(event)

  if (!body || !body.title || !body.content || !body.id)
    return Err_400(event, 'payload error')

  const isHas = await hasItem<boolean>(`article:${body.id}`)

  if (!isHas)
    return Err_400(event, 'articleId not found')

  const timeNow = dayjs().format('YYYY-MM-DD HH:mm:ss')

  await getStorage<ArticleItem>(`article:${body.id}`).then((res) => {
    setStorage<ArticleItem>(`article:${body.id}`, { ...omit(res, ['id']), ...omit(body, ['createTime']), updateTime: timeNow })
  })
  return 'success'
})
