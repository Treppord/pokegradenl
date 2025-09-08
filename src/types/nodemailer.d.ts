declare module 'nodemailer' {
  export interface MailOptions {
    from?: string
    to: string
    subject: string
    html?: string
    text?: string
  }

  export interface Transporter {
    sendMail(mailOptions: MailOptions): Promise<any>
  }

  export function createTransport(config: any): Transporter

  const nodemailer: {
    createTransport(config: any): Transporter
  }

  export default nodemailer
}
