import { LoginSchema } from '~/server/config/zod/user'
import { checkCodeValid } from '~/server/utils/email-code'
import { generateId } from '~/server/utils/generateId'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => LoginSchema.safeParse(body))

  if (!result.success)
    return Err_400(result.error.format())

  const { code, email } = result.data

  if (await checkCodeValid(code, email) === false)
    return Err_400('code is invalid')

  const res = await UserSchema.findOne({
    email,
  })

  if (!res) {
    await UserSchema.create({
      id: generateId(),
      email,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      isDelete: false,
    })

    logger.info(`${email} login success`)
    return {
      success: true,
      data: 'login success',
    }
  }

  logger.info(`${email} login success`)
  return {
    success: true,
    message: 'login success',
  }
})
