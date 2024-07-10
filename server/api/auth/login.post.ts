import { LoginSchema } from '~/server/config/zod/user'
import { checkCodeValid } from '~/server/utils/email-code'
import { generateId } from '~/server/utils/generateId'
import { createToken } from '~/server/utils/request/jwt'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => LoginSchema.safeParse(body))

  if (!result.success)
    return Err_400(result.error.format())

  const { code, email } = result.data

  if (await checkCodeValid(code, email) === false)
    return Err_400('code is invalid')

  const userInfo = await UserSchema.findOne({
    email,
    isDelete: false,
  }).lean().exec()

  if (!userInfo) {
    const newUser = await UserSchema.create({
      id: generateId(),
      email,
      createTime: dayjs(),
      updateTime: dayjs(),
      isDelete: false,
      roles: await RoleSchema.findOne({ roleName: 'user' }).exec(),
    })

    logger.info(newUser)

    logger.info(`${email} login success`)

    return {
      success: true,
      data: 'login success',
    }
  }

  logger.info(`${email} login success`)
  const response = {
    token: createToken({ email, userId: userInfo.id }, 60 * 60 * 24),
    loggedInAt: new Date(),
    refreshToken: createToken({ email, userId: userInfo.id }, 60 * 60 * 48),
    user: userInfo,
  }
  await setUserSession(event, response as any)
  await getUserSession(event)
  return {
    success: true,
    data: response,
    message: 'login success',
  }
})
