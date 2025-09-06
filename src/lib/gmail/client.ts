import { google } from 'googleapis'
import nodemailer from 'nodemailer'

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
})

export async function createGmailTransporter() {
  try {
    const accessToken = await oauth2Client.getAccessToken()
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token!,
      },
    })

    return transporter
  } catch (error) {
    console.error('Error creating Gmail transporter:', error)
    throw new Error('Failed to create email service')
  }
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const transporter = await createGmailTransporter()
    
    const mailOptions = {
      from: `PokeGrade Nederland <${process.env.GMAIL_USER_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }

    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}
