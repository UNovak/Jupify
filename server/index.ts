import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  return c.text('Hello Hono!')
})

export default {
  fetch: app.fetch,
  port: process.env.PORT || 3000,
}
