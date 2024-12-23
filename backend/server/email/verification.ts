import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'

export const sendVerificationEmail = async (
  recipient: string,
  verification_token: string,
  unsubscribe_token: string,
) => {
  try {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAIL_API as string,
    })

    const confirmLink = `${Bun.env.API_DOMAIN}/subscribers/verify-email?token=${verification_token}`
    const unsubscribeLink = `${Bun.env.API_DOMAIN}/subscribers/unsubscribe?unsubscribe_token=${unsubscribe_token}`

    const sentFrom = new Sender(`jupify@${process.env.DOMAIN}`, 'JupifyBot')
    const recipients = [new Recipient(recipient)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)

      .setSubject('Subscription Verification').setHtml(`
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title></title>
          </head>
          <body>
            <div
              class="container"
              style="
                width: 100%;
                max-width: 580px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                font-family: 'DM Sans', sans-serif;
              ">
              <h1 style="color: #482be7; font-size: 20px; margin-bottom: 30px">
                Hello there,
              </h1>
              <p
                style="
                  color: #333;
                  font-size: 16px;
                  line-height: 1.2;
                  margin: 10px 0 0 0;
                ">
                You have signed-up to
                <a
                  href="${Bun.env.FRONTEND_URL}"
                  class="link"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  style="text-decoration: none; color: #25dac5; cursor: pointer"
                  >Jupify</a
                >
                notifications
              </p>

              <p
                style="
                  color: #333;
                  font-size: 16px;
                  line-height: 1.2;
                  margin: 10px 0 0 0;
                ">
                Confirm your subscription using the button below
              </p>

              <div class="button-container" style="margin: 30px 0 10px 0">
                <a
                  href="${confirmLink}"
                  class="button"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  style="
                    background: linear-gradient(270deg, #16094e 0%, #2a1581 100%);
                    border-radius: 10px;
                    color: #25dac5;
                    display: inline-block;
                    font-size: 17px;
                    font-weight: 900;
                    line-height: 22px;
                    padding: 12px 38px;
                    text-decoration: none;
                    box-shadow:
                      rgba(0, 0, 0, 0.18) 0px 0.301094px 0.301094px -1.25px,
                      rgba(0, 0, 0, 0.16) 0px 1.14427px 1.14427px -2.5px,
                      rgba(0, 0, 0, 0.063) 0px 5px 5px -3.75px;
                  "
                  >Confirm Subscription</a
                >
              </div>

              <p
                class="expiry-text"
                style="color: #666; font-size: 14px; margin: 4px 0">
                The link expires in 30 minutes.
              </p>
              <div style="display: inline-block">
                <a
                  class="unsubscribe"
                  href="${unsubscribeLink}"
                  style="
                    text-decoration: none;
                    color: #af2b34;
                    cursor: pointer;
                    font-size: 12px;
                  "
                  >unsubscribe</a
                >
              </div>
            </div>
          </body>
        </html>`)

    const response = await mailerSend.email.send(emailParams)
    return { success: true, message: 'Email sent', response }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send email', error }
  }
}
