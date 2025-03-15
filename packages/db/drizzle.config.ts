import type { Config } from 'drizzle-kit'

export default {
  schema: './schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || 'http://127.0.0.1:8080',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config
