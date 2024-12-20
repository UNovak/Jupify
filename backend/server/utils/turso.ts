import { createClient } from '@libsql/client'

export const turso = createClient({
  url: Bun.env.TURSO_DATABASE_URL || 'http://127.0.0.1:8080',
  authToken: Bun.env.TURSO_AUTH_TOKEN,
})

console.log('connected db: ', process.env.TURSO_DATABASE_URL)

// add an email to the database
export const subscribe = async (email: string, token: string) => {
  try {
    await turso.execute({
      sql: 'INSERT INTO subscribers (email,token) VALUES (:email, :token)',
      args: { email: email, token: token },
    })
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}

// return all emails from the database
export const getSubscribers = async () => {
  try {
    const { rows } = await turso.execute('SELECT * FROM subscribers')
    return rows
  } catch (err) {
    console.log(err)
  }
}
