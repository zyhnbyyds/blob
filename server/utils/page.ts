import type { Model } from 'mongoose'
import type { H3Event } from 'h3'
import type { Page } from '../types/common'

/**
 * Set page query from event
 * @param model mongoose model
 * @param event h3 event
 * @returns
 */
export async function pageDesc<T>(model: Model<T>, event: H3Event) {
  const { method } = event
  let pageInfo: Page = {
    size: 10,
    page: 1,
  }

  if (method === 'GET' || method === 'DELETE') {
    pageInfo = getQuery<Page>(event)
  }
  else {
    pageInfo = await readBody(event)
  }

  const { size, page } = pageInfo

  return model.find()
    .limit(size)
    .skip((page - 1) * size)
}
