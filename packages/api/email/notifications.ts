import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import type { BulkResponse, Subscriber } from '../types'

export const sendNotificationEmails = async (
  subscribers: Subscriber[],
): Promise<BulkResponse | any> => {
  const mailerSend = new MailerSend({ apiKey: Bun.env.MAIL_API as string })
  const sentFrom = new Sender(`jupify@${process.env.DOMAIN}`, 'JupifyBot')
  const domain = Bun.env.API_DOMAIN

  // loop through each subscriber
  const emails = subscribers.map((subscriber) => {
    const recipient = new Recipient(subscriber.email)
    const personalization = [
      {
        email: `${subscriber.email}`,
        data: {
          unsubscribe_link: `${domain}/subscribers/unsubscribe?unsubscribe_token=${subscriber.unsubscribe_token}`,
        },
      },
    ]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([recipient])
      .setPersonalization(personalization)
      .setSubject('Vote Alert 🚨').setHtml(`
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
                Jupify
              </h1>

              <p
                style="
                  color: #333;
                  font-size: 16px;
                  line-height: 1.2;
                  margin: 10px 0 0 0;
                ">
                This is a notification about a new Jup.ag voting process.
              </p>
              <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 12px 0">
                Go check out the voting page
              </p>

              <div class="button-container" style="margin-top: 20px">
                <a
                  href="https://vote.jup.ag/"
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
                  >Visit Jupiter</a
                >
              </div>

              <p style="font-size: 12px">
                <span style="display: inline-block">
                  <a
                    class="unsubscribe"
                    href="{{ unsubscribe_link }}"
                    style="text-decoration: none; color: #af2b34; cursor: pointer"
                    >unsubscribe</a
                  >
                  to never hear from us again
                </span>
              </p>
            </div>
          </body>
        </html>`)

    return emailParams
  })
  try {
    const res = await mailerSend.email.sendBulk(emails)
    return {
      status: res.statusCode,
      message: res.body.message,
      ...(res.body.bulk_email_id && { bulk_id: res.body.bulk_email_id }),
    }
  } catch (err) {
    return { error: err }
  }
}
