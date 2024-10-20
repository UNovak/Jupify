import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'

const sendMail = async (recipient: string) => {
  try {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAIL_API as string,
    })

    const sentFrom = new Sender(`jupify@${process.env.DOMAIN}`, 'JupifyBot')
    const recipients = [new Recipient(recipient)]

    const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setReplyTo(sentFrom).setSubject('🚨 Vote Alert')
      .setHtml(`
          <html>
            <body style="text-align: center;">
              <h1 >Jupify</h1>
                <p>This is a notification about the Jup.ag voting process.</p>
                <p>Check out the voting page: <a href="https://vote.jup.ag/">Vote Now</a></p>
                <div><a href="${process.env.SERVER}/unsubscribe">unsubscribe</a></div>
            </body>
          </html>
        `)

    const response = await mailerSend.email.send(emailParams)
    return { success: true, message: 'Email sent', response }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send email', error }
  }
}

export { sendMail }
