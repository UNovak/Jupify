import { Hono } from 'hono'
import { sendMail } from './sendMail'

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
