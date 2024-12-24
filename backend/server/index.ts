import { Hono } from 'hono'
import { sendNotificationEmails } from './email/notifications'
import { sendVerificationEmail } from './email/verification'
import type { ScrapedData } from './types'
import { generateToken, verifyToken } from './utils/token'
import { getSubscribers, subscribe, unsubscribe, verify } from './utils/turso'

const app = new Hono()

app.get('/', async (c) => {
  return c.text('Hello Hono!')
})

// Endpoint to receive scrapper data
app.post('/update', async (c) => {
  const scrapedData: ScrapedData = await c.req.json()
  if (scrapedData.status === 'Completed') return c.text('No vote in progress')

  const subscribers = await getSubscribers() // get all verified subscribers from db

  // check that there are subscribers
  if (subscribers.length === 0) {
    return c.json({ status: 500, message: 'no subscribers' })
  }

  const res = await sendNotificationEmails(subscribers) // send notification email in bulk
  return c.json(res)
})

// Add email to subscribers database, send verification email
app.post('/subscribers', async (c) => {
  const { email } = await c.req.json()
  const token = await generateToken(email, 30) // create a JWT valid for 30 minutes
  const unsubscribe_token = await generateToken(email) // create a never expiring JWT
  const res = await subscribe(email, token, unsubscribe_token) // insert into db

  // if insert !ok
  if (!res) {
    return c.json({
      status: 500,
      message: 'Something went wrong when inserting',
    })
  }

  // if insert sucessfull
  const mailRes = await sendVerificationEmail(email, token, unsubscribe_token)

  // server response
  return c.json({
    status: 201,
    email: email,
    token: token,
    unsubscribe_token: unsubscribe_token,
  })
})

// Verify the subscriber
app.get('/subscribers/verify-email', async (c) => {
  const token = c.req.query('token') as string
  const { email } = await verifyToken(token, Bun.env.SECRET as string)
  console.log('requested virification for: ', email)

  const res = await verify(email, token)
  if (res) return c.text(`subscription confirmed for ${email}`)
  return c.text(`unable to verify ${email}`)
})

// Delete from subscribers table and redirects to fronted success || error page
app.get('/subscribers/unsubscribe', async (c) => {
  const token = c.req.query('unsubscribe_token') as string
  console.log(`requested unsubscribe for ${token}`)
  const { email } = await verifyToken(token, Bun.env.INFINITE_SECRET as string)

  // unsubscribe logic with the database
  const res = await unsubscribe(email, token)
  if (res) return c.text('unsubscribe success')
  return c.text('unsubscribe error')
})

export default {
  fetch: app.fetch,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
}
