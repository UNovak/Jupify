import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sendMail } from './sendMail'

// CORS middleware
const corsMiddleware = cors({
  origin: ['http://localhost:4321'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'DNT', 'User-Agent'],
})

const app = new Hono()

app.get('/', async (c) => {
  return c.text('Hello Hono!')
})

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
