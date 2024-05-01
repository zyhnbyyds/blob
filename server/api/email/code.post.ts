import nodemailerInstance from '../../utils/nodemailer'
import { useRandom } from '~/server/utils/random'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  const code = useRandom(6)

  // code default expire in 2 minutes
  setStorage(`email:${email}:code`, { code, expire: Date.now() + 2 * 60 * 1000 })

  logger.info(`Generated code: ${code}`)

  try {
    await nodemailerInstance.sendMail({
      from: '19939926438@163.com',
      to: email,
      subject: 'Verification code',
      text: `text - Your verification code is <h3 style="color: red">${code}</h3>`,
    })
  }
  catch (error) {
    logger.error(JSON.stringify(error))
    return {
      code: 400,
      success: false,
      message: 'send email failed',
    }
  }

  return {
    success: true,
    message: 'send email success',
  }
})
