import { pageDesc } from '~/server/utils/page'

export default defineEventHandler(async (event) => {
  const roles = await pageDesc(RoleSchema, event)

  return {
    success: true,
    list: roles,
  }
})
