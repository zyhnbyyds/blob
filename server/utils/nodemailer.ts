import nodemailer from 'nodemailer'

class NodeMailerInstance {
  initNodemailer() {
    return nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: '19939926438@163.com',
        pass: 'zhang187332',
      },
    })
  }
}

export default (new NodeMailerInstance()).initNodemailer()
