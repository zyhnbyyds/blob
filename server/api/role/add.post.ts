import { CreateRoleSchema } from '~/server/config/zod/role'

// role add
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body =>
    CreateRoleSchema.safeParse(body))

  if (!result.success)
    return Err_400(result.error.format())

  const { roleName, roleDesc, permissions } = result.data

  const role = await RoleSchema.create({
    roleName,
    roleDesc,
    permissions,
    id: generateId(),
    createTime: dayjs(),
    updateTime: dayjs(),
    isDelete: false,
  })

  logger.info(role)

  return {
    success: true,
    data: role,
  }
})
