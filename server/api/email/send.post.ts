import type Mail from 'nodemailer/lib/mailer'
import nodemailerInstance from '../../utils/nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody<Mail.Options>(event)

  try {
    const res = await nodemailerInstance.sendMail(body)
    return res
  }
  catch (err) {
    console.error(err)
    throw new Error('Send email failed')
  }
})
