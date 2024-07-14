import nodemailer from 'nodemailer'
import { email } from '~/config/env'

class NodeMailerInstance {
  initNodemailer() {
    return nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: email.email,
        pass: email.password,
      },
    })
  }
}

export default (new NodeMailerInstance()).initNodemailer()
