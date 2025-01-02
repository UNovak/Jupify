import { Hono } from 'hono'
import { sendNotificationEmails } from './email/notifications'
import { sendVerificationEmail } from './email/verification'
import type { ScrapedData } from './types'
import { generateToken, verifyToken } from './utils/token'
import {
  getSubscribers,
  getVote,
  newVote,
  subscribe,
  unsubscribe,
  updateVote,
  verify,
} from './utils/turso'

const app = new Hono()

app.get('/', async (c) => {
  return c.text('Hello Hono!')
})

// Endpoint to receive scrapper data
app.post('/update', async (c) => {
  const { title, start, end, status } = (await c.req.json()) as ScrapedData

  // check if its a completed vote, if yes dont continue
  if (status === 'Completed')
    return c.json({ status: 200, message: 'No vote in progress' })

  // check if the vote already exists and emails were already sent if yes, dont continue
  const voteResponse = await getVote(title)
  if (voteResponse.success)
    return c.json({ status: 200, message: 'Already notified about this vote' })

  // if there is no such vote, make a new entry
  const addVoteResponse = await newVote(title, start, end)
  if (!addVoteResponse.success) return c.json({ status: 500, addVoteResponse })

  // get all verified subscribers from db
  const { success, data, error } = await getSubscribers()
  if (!success) return c.json({ status: 500, error })

  // if there are subscribers
  if (data) {
    const bulkSendResponse = await sendNotificationEmails(data) // send notification emails
    if (bulkSendResponse.status !== 202) return c.json({ bulkSendResponse }) // handle any errors

    // update the people_notified field for this spacific vote, set notified value to 1
    const { success, error } = await updateVote(title, data.length)
    if (!success) return c.json({ status: 400, error })

    // return 202
    return c.json({ status: 202 })
  }
})

// Add email to subscribers database, send verification email
app.post('/subscribers', async (c) => {
  const { email } = await c.req.json()
  const token = await generateToken(email, 30) // create a JWT valid for 30 minutes
  const unsubscribe_token = await generateToken(email) // create a never expiring JWT
  const { success, error } = await subscribe(email, token, unsubscribe_token) // insert into db

  // if insert !ok
  if (!success) return c.json({ status: 500, error })

  // if insert sucessfull
  const mailRes = await sendVerificationEmail(email, token, unsubscribe_token)
  if (!mailRes.success) return c.json({ status: 500, error: mailRes.err })

  // server response
  return c.json({
    success,
    status: 201,
    data: {
      email: email,
      token: token,
      unsubscribe_token: unsubscribe_token,
    },
  })
})

// Verify the subscriber
app.get('/subscribers/verify-email', async (c) => {
  const token = c.req.query('token') as string
  const { email } = await verifyToken(token, Bun.env.SECRET as string)
  console.log('requested virification for: ', email)

  const { success, error } = await verify(email, token)
  if (!success) return c.json({ status: 500, error })
  return c.json({ status: 204 })
})

// Delete from subscribers table and redirects to fronted success || error page
app.get('/subscribers/unsubscribe', async (c) => {
  const token = c.req.query('unsubscribe_token') as string
  console.log(`requested unsubscribe for ${token}`)
  const { email } = await verifyToken(token, Bun.env.INFINITE_SECRET as string)

  // unsubscribe logic with the database
  const { success, error } = await unsubscribe(email, token)
  if (!success) return c.json({ success, status: 500, error })
  return c.json({ status: 204 })
})

export default {
  fetch: app.fetch,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
}
