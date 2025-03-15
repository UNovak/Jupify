import { createClient } from '@libsql/client'
import type { Response, Subscriber, Vote } from '../types'

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
): Promise<Response> => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'INSERT INTO subscribers (email,token,unsubscribe_token) VALUES (:email, :token, :unsubscribe_token)',
      args: {
        email: email,
        token: token,
        unsubscribe_token: unsubscribe_token,
      },
    })
    if (rowsAffected === 0) return { success: false, error: 'inserting failed' }
    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false, error: err as string }
  }
}

// change value of verified to true
export const verify = async (
  email: string,
  token: string,
): Promise<Response> => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'UPDATE subscribers SET verified = 1 WHERE email = ? AND token = ?',
      args: [email, token],
    })

    if (rowsAffected === 0)
      return {
        success: false,
        error: 'No subscriber with these credentials exists',
      }

    return { success: true }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: err as string,
    }
  }
}

// remove a row from subscribers table
export const unsubscribe = async (
  email: string,
  unsubscribe_token: string,
): Promise<Response> => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'DELETE FROM subscribers WHERE unsubscribe_token = :unsubscribe_token AND email = :email',
      args: { unsubscribe_token: unsubscribe_token, email: email },
    })

    if (rowsAffected === 0)
      return { success: false, error: 'No subscriber was removed' }
    return { success: true }
  } catch (err) {
    console.log(err)
    return { success: false, error: err as string }
  }
}

// return all verified subscribers from the database
export const getSubscribers = async (): Promise<Response<Subscriber[]>> => {
  try {
    const { rows } = await turso.execute(
      'SELECT email,unsubscribe_token FROM subscribers WHERE verified = 1',
    )

    if (rows.length === 0) return { success: false, error: 'no subscribers' }

    // only take the necessary values from each row
    const subscribers = rows.map((row) => {
      return {
        email: row[0] as string,
        unsubscribe_token: row[1] as string,
      } as Subscriber
    })

    console.log('subscribers:', subscribers)
    return { success: true, data: subscribers }
  } catch (err) {
    console.log(err)
    return { success: false, error: err as string }
  }
}

export const getVote = async (title: string): Promise<Response<Vote[]>> => {
  try {
    const { rows } = await turso.execute({
      sql: 'SELECT * FROM votes WHERE title = ?',
      args: [title],
    })

    if (rows.length === 0) return { success: false, error: 'No votes found' }

    // Map rows to structured Vote objects
    const votes = rows.map(
      (row): Vote => ({
        id: row[0] as number,
        title: row[1] as string,
        start: row[2] as string,
        end: row[3] as string,
        notified: row[4] as number,
        people_notified: row[5] as number,
      }),
    )

    return { success: true, data: votes }
  } catch (err) {
    console.error('Error in getVote:', err)
    return { success: false, error: err as string }
  }
}

export const newVote = async (
  title: string,
  start: string,
  end: string,
): Promise<Response<unknown>> => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'INSERT INTO votes (title,start,end) VALUES (?, ?, ?)',
      args: [title, start, end],
    })
    if (rowsAffected) return { success: true }
    return { success: false, error: 'Failed to insert a vote' }
  } catch (err) {
    console.log(err)
    return { success: false, error: err as string }
  }
}

export const updateVote = async (
  title: string,
  count: number,
): Promise<Response> => {
  try {
    const { rowsAffected } = await turso.execute({
      sql: 'UPDATE votes SET people_notified = ?, notified = 1 WHERE title = ?',
      args: [count, title],
    })
    console.log('updating vote: ', rowsAffected)
    if (rowsAffected === 1) return { success: true }
    return { success: false, error: `Unable to update vote ${title}` }
  } catch (err) {
    console.log(err)
    return { success: false, error: err as string }
  }
}
