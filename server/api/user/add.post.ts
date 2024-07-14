import dayjs from 'dayjs'
import { CreateUserSchema } from '~/server/config/zod/user'
import { UserSchema } from '~/server/models/user'
import { RoleSchema } from '~/server/models/role'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body =>
    CreateUserSchema.safeParse(body))

  if (!result.success)
    return Err_400(result.error.format())

  const { nick, email, roles } = result.data

  const existingRole = await RoleSchema.findById(roles)
  if (!existingRole)
    return Err_400('Role does not exist')

  const user = await UserSchema.create({
    nick: nick || null,
    id: generateId(),
    createTime: dayjs().toISOString(),
    updateTime: dayjs().toISOString(),
    isDelete: false,
    email,
    roles,
  })

  logger.info(user)

  return {
    success: true,
    data: user,
  }
})
