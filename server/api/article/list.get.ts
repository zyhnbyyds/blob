import { emptyListRes } from '~/server/config/common'
import type { ArticleItem, Page } from '~/server/types'
import { hasItem } from '~/server/utils/request/request'

export default defineEventHandler(async (event) => {
  const query = getQuery<Partial<Page>>(event)

  const isHave = await hasItem<boolean>('articles')

  if (!isHave)
    return emptyListRes

  const articleIds = (await getStorage<string[]>('articles')) ?? []

  const articles = await getStorages<ArticleItem[]>(articleIds.map(id => `article:${id}`), { ...query, excludeKeys: ['content'] })

  return articles ?? []
})
