import { createClient } from '@libsql/client'
import type { Subscriber } from '../types'

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
    const { rowsAffected } = await turso.execute({
      sql: 'INSERT INTO subscribers (email,token,unsubscribe_token) VALUES (:email, :token, :unsubscribe_token)',
      args: {
        email: email,
        token: token,
        unsubscribe_token: unsubscribe_token,
      },
    })
    if (rowsAffected === 0) return false
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

// change value of verified to true
export const verify = async (email: string, token: string) => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'UPDATE subscribers SET verified = 1 WHERE email = ? AND token = ?',
      args: [email, token],
    })

    if (rowsAffected === 0) return false
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

// remove a row from subscribers table
export const unsubscribe = async (email: string, unsubscribe_token: string) => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'DELETE FROM subscribers WHERE unsubscribe_token = :unsubscribe_token AND email = :email',
      args: { unsubscribe_token: unsubscribe_token, email: email },
    })

    if (rowsAffected === 0) return false
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

// return all verified subscribers from the database
export const getSubscribers = async () => {
  try {
    const { rows } = await turso.execute(
      'SELECT email,unsubscribe_token FROM subscribers WHERE verified = 1',
    )

    // only take the necessary values from each row
    const res = rows.map((row) => {
      return {
        email: row[0] as string,
        unsubscribe_token: row[1] as string,
      } as Subscriber
    })

    console.log(res)
    return res
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getVote = async (title: string) => {
  try {
    const { rows } = await turso.execute({
      sql: 'SELECT * FROM votes WHERE title = ?',
      args: [title],
    })
    return rows
  } catch (err) {
    console.log(err)
  }
}

export const newVote = async (title: string, start: string, end: string) => {
  try {
    const res = await turso.execute({
      sql: 'INSERT INTO votes (title,start,end) VALUES (?, ?, ?)',
      args: [title, start, end],
    })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}

export const updateVote = async (title: string, count: number) => {
  try {
    const res = await turso.execute({
      sql: 'UPDATE votes SET people_notified = ?, notified = 1 WHERE title = ?',
      args: [count, title],
    })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}
