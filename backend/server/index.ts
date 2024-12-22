import { Hono } from 'hono'
import { sendMail } from './sendMail'
import { generateToken, verifyToken } from './utils/token'
import { subscribe, unsubscribe } from './utils/turso'

const app = new Hono()

app.get('/', async (c) => {
  return c.text('Hello Hono!')
})

// Endpoint to receive scrapper data
app.post('/update', async (c) => {
  const jup: ScraperResponse = await c.req.json()
  if (jup.status === 'Completed') return c.text('No vote in progress')
  const res = await sendMail(process.env.MAIL as string)
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

  /*

    implement sending a verification email here

    ) */

  // server response
  return c.json({
    status: 201,
    email: email,
    token: token,
    unsubscribe_token: unsubscribe_token,
  })
})

// Delete from subscribers table and redirects to fronted success || error page
app.get('/subscribers/unsubscribe', async (c) => {
  const token = c.req.query('unsubscribe_token') as string
  console.log(`requested unsubscribe for ${token}`)
  const { email } = await verifyToken(token, Bun.env.INFINITE_SECRET as string)

  // unsubscribe logic with the database
  const res = await unsubscribe(token, email as string)
  if (res) return c.text('unsubscribe success')
  return c.text('unsubscribe error')
})

export default {
  fetch: app.fetch,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
}

type ScraperResponse = {
  title: string
  voted: string
  status: string
  result: string
  start: string
  end: string
}
