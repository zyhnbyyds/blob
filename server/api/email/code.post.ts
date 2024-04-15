import nodemailerInstance from '../../utils/nodemailer'
import { useRandom } from '~/server/utils/random'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  const code = useRandom(6)

  // code default expire in 2 minutes
  setStorage(`email:${email}:emailCode`, { code, expire: Date.now() + 2 * 60 * 1000 })

  logger.info(`Generated code: ${code}`)

  const res = await nodemailerInstance.sendMail({
    from: '19939926438@163.com',
    to: email,
    subject: 'Verification code',
    text: `text - Your verification code is <h3 style="color: red">${code}</h3>`,
  })

  return {
    success: true,
    data: res,
  }
})
