import { sign, verify } from 'hono/jwt'

export const generateToken = async (mail: string, time: number) => {
  const payload = {
    mail: mail,
    exp: Math.floor(Date.now() / 1000) + 60 * time, // Time to expire in minutes
  }
  const secret = Bun.env.SECRET as string
  const token = await sign(payload, secret)
  return token
}

export const verifyToken = async (token: string) => {
  const secret = Bun.env.SECRET as string

  const decodedToken = await verify(token, secret)
  return decodedToken
}
