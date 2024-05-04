import jwt from 'jsonwebtoken'
import { auth } from '~/config/env'

export function createToken(payload: Record<string, any>, expiresIn: string | number = '1d') {
  return jwt.sign(payload, auth.jwtSecret, { expiresIn })
}
