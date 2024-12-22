import { sign, verify } from 'hono/jwt'

export const generateToken = async (email: string, time?: number) => {
  const payload = {
    email: email,
    ...(time && { exp: Math.floor(Date.now() / 1000) + 60 * time }), // Time to expire in minutes
  }

  let secret = Bun.env.INFINITE_SECRET as string
  if (time) secret = Bun.env.SECRET as string
  const token = await sign(payload, secret)
  return token
}

export const verifyToken = async (token: string, secret: string) => {
  const decodedToken = await verify(token, secret)
  return decodedToken
}
