import { createClient } from '@libsql/client'

export const turso = createClient({
  url: Bun.env.TURSO_DATABASE_URL || 'http://127.0.0.1:8080',
  authToken: Bun.env.TURSO_AUTH_TOKEN,
})

console.log('connected db: ', process.env.TURSO_DATABASE_URL)

// add an email to the database
export const subscribe = async (
  email: string,
  token: string,
  unsubscribe_token: string,
) => {
  try {
    await turso.execute({
      sql: 'INSERT INTO subscribers (email,token,unsubscribe_token) VALUES (:email, :token, :unsubscribe_token)',
      args: {
        email: email,
        token: token,
        unsubscribe_token: unsubscribe_token,
      },
    })
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}

export const unsubscribe = async (unsubscribe_token: string, email: string) => {
  try {
    await turso.execute({
      sql: 'DELETE FROM subscribers WHERE unsubscribe_token = :unsubscribe_token AND email = :email',
      args: { unsubscribe_token: unsubscribe_token, email: email },
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
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
