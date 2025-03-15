import { sql } from 'drizzle-orm'
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const subscribers = sqliteTable('subscribers', {
  id: int().primaryKey({ autoIncrement: true }), // primary key
  email: text().unique().notNull(), // unique email
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`), // when the email was added
  status: text().default('subscribed'), // subscribed || unsubscribed
  token: text(), // JWT token generated from email to verify subscription
  unsubscribe_token: text(), // JWT with no expiration date
  verified: integer({ mode: 'boolean' }).default(false).notNull(),
  last_update: text().default(sql`(CURRENT_TIMESTAMP)`), // date ISO8601 format of last change
})

export const votes = sqliteTable('votes', {
  id: int().primaryKey({ autoIncrement: true }), // primary key
  title: text().notNull(), // the title of the vote as scrapped
  start: text(), // start date in ISO8601 format
  end: text(), // end date in ISO8601 format
  notified: integer({ mode: 'boolean' }).default(false).notNull(), // 0 or 1
  people_notified: integer().default(0).notNull(), // how many emails were sent for this exact vote
})

export const banned = sqliteTable('banned', {
  id: int().primaryKey({ autoIncrement: true }), // primary key
  email: text().unique(), // unique email
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`), // when the email was banned
})
